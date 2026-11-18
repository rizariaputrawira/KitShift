"""Controller-only checks for generated synthetic artifacts, not skill prose."""
import csv
import hashlib
import json
import sys
from decimal import Decimal
from pathlib import Path

if len(sys.argv) != 2:
    raise SystemExit('Usage: python3 verify.py RUN_ROOT')
root = Path(sys.argv[1]).resolve()
checks = []

def load(path):
    return json.loads(path.read_text(encoding='utf-8'))

def check(name, actual, expected):
    ok = actual == expected
    checks.append(ok)
    print(('PASS ' if ok else 'FAIL ') + name)
    if not ok:
        print(f'  expected={expected!r}\n  observed={actual!r}')

def artifact(base, relative):
    if not isinstance(relative, str):
        raise ValueError('Artifact locator must be a relative path')
    path = (base / relative).resolve()
    if not path.is_relative_to(base.resolve()):
        raise ValueError('Artifact locator escapes its result root')
    return path

def csv_rows(path):
    with path.open(newline='', encoding='utf-8') as handle:
        return list(csv.DictReader(handle))

for name, digest in load(root / 'before.json').items():
    check('unchanged ' + name, hashlib.sha256((root / name).read_bytes()).hexdigest(), digest)
occupied = root / 'prep/output/occupied'
check('occupied directory has no partial artifacts', sorted(p.name for p in occupied.iterdir()), ['notes.txt', 'prepared.csv'])
try:
    base = root / 'prep/output'
    manifest = load(base / 'manifest.json')
    report = load(artifact(base, manifest['report']))
    check('conflict attempt refused', report['conflict']['exit_code'] != 0, True)
    check('conflict not marked complete', report['conflict']['status'], 'blocked')
    check('conflict has no claimed artifact', report['conflict']['produced'], [])
    check('fresh target succeeded', report['fresh']['exit_code'], 0)
    original = csv_rows(root / 'prep/input/input.csv')
    prepared = csv_rows(artifact(base, manifest['fresh_data']))
    source_fields = original[0].keys()
    check('fresh values preserve lexical and unresolved data',
          [{field: row.get(field) for field in source_fields} for row in prepared], original)
    check('reproduction generator saved', artifact(base, manifest['generator']).is_file(), True)
except (OSError, ValueError, KeyError, TypeError) as error:
    check('inspectable preparation evidence', str(error), None)

expected = {
    'one_to_many': [('L1', 'R1'), ('L1', 'R2')],
    'many_to_one': [('L1', 'R1'), ('L2', 'R1')],
    'incomplete_composite': [('L1', 'R1'), ('L4', 'R4')],
    'conflicting_reliable_ids': [('L2', 'R2')],
    'current_rejection': [], 'stale_rejection': [], 'reordered_review': [],
    'invalid_one_to_many': [], 'invalid_many_to_one': [],
}
candidate_counts = {name: 2 for name in expected}
candidate_counts['invalid_one_to_many'] = 4
fixtures = {item['name']: item for item in load(Path(__file__).with_name('matching.json'))}
try:
    base = root / 'match/output'
    manifest = load(base / 'manifest.json')
    report = load(artifact(base, manifest['report']))
    check('all matching cases present', sorted(manifest['cases']), sorted(expected))
    for name, accepted in expected.items():
        entry, evidence = manifest['cases'][name], report['cases'][name]
        ledger = load(artifact(base, entry['ledger']))
        actual = sorted((pair['left'], pair['right']) for pair in ledger if pair['disposition'] == 'accepted')
        check(name + ' accepted correspondence', actual, sorted(accepted))
        check(name + ' bounded candidate population', len(ledger), candidate_counts[name])
        check(name + ' explained decisions', all(pair.get('reason') for pair in ledger), True)
        left_ids, right_ids = {a for a, _ in accepted}, {b for _, b in accepted}
        check(name + ' unique left accounting', evidence['accepted_unique_left'], len(left_ids))
        check(name + ' unique right accounting', evidence['accepted_unique_right'], len(right_ids))
        valid = not name.startswith('invalid_')
        check(name + ' cardinality decision', evidence['cardinality_valid'], valid)
        if fixtures[name]['method'] == 'exact' and valid:
            combined = load(artifact(base, entry['combined']))
            lmap = {row['record']: row for row in fixtures[name]['left']}
            rmap = {row['record']: row for row in fixtures[name]['right']}
            actual_rows = sorted(combined, key=lambda row: (row['left']['record'], row['right']['record']))
            expected_rows = [{'left': lmap[a], 'right': rmap[b]} for a, b in sorted(accepted)]
            check(name + ' accepted-only source-qualified data', actual_rows, expected_rows)
            unique_total = sum((Decimal(lmap[key]['amount']) for key in left_ids), Decimal(0))
            output_total = sum((Decimal(row['left']['amount']) for row in combined), Decimal(0))
            check(name + ' unique-source amount total', Decimal(str(evidence['unique_left_amount_total'])), unique_total)
            check(name + ' expanded-output amount total', Decimal(str(evidence['output_left_amount_total'])), output_total)
        else:
            check(name + ' trusted combined output withheld', entry['combined'], None)
        if fixtures[name].get('review'):
            original = load(root / f'match/input/{name}/review.json')
            check(name + ' history unchanged', evidence['review_history'], original)
            expected_replay = {'applied': 1, 'stale': 0, 'blocked': 0} if name == 'current_rejection' else {'applied': 0, 'stale': 1, 'blocked': 0}
            check(name + ' review reuse', evidence['review_reuse'], expected_replay)
            disposition = next(row['disposition'] for row in ledger if row['left'] == 'U1' and row['right'] == 'R1')
            check(name + ' reviewed locator disposition', disposition, 'rejected' if name == 'current_rejection' else 'review-required')
            if name == 'reordered_review':
                check(name + ' no ordinal rebinding', {(row['left'], row['right']) for row in ledger}, {('U1', 'R1'), ('U2', 'R2')})
except (OSError, ValueError, KeyError, TypeError, StopIteration) as error:
    check('inspectable matching evidence', str(error), None)

print(f'{sum(checks)}/{len(checks)} checks passed')
raise SystemExit(0 if all(checks) else 1)
