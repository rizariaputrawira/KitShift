"""Controller-only value/artifact checks; not an analysis implementation."""
import csv
import hashlib
import json
import sys
import xml.etree.ElementTree as ET
from decimal import Decimal
from pathlib import Path

if len(sys.argv) != 3:
    raise SystemExit('Usage: python3 verify.py RUN_ROOT SELECTED_KERNEL_PYTHON')
root, selected = Path(sys.argv[1]).resolve(), Path(sys.argv[2]).resolve()
checks = []

def load(p): return json.loads(p.read_text(encoding='utf-8'))
def rows(p):
    with p.open(newline='', encoding='utf-8') as f: return list(csv.DictReader(f))
def check(name, actual, expected):
    ok = actual == expected
    checks.append(ok)
    print(('PASS ' if ok else 'FAIL ') + name)
    if not ok: print(f'  expected={expected!r}; observed={actual!r}')
def artifact(base, relative):
    if not isinstance(relative, str): raise ValueError('Expected relative artifact path')
    p = (base / relative).resolve()
    if not p.is_relative_to(base.resolve()): raise ValueError('Artifact escapes result root')
    return p

for name, digest in load(root / 'before.json').items():
    check('unchanged ' + name, hashlib.sha256((root / name).read_bytes()).hexdigest(), digest)

try:
    base = root / 'analysis/output'
    manifest = load(base / 'manifest.json')
    summary = load(artifact(base, manifest['summary']))
    p, mix, repeated = summary['periods'], summary['mix'], summary['repeated']
    for key, expected in {'prior_full_total':'180','prior_matched_total':'20','current_matched_total':'24','matched_relative_change':'0.20'}.items():
        check(key, Decimal(str(p[key])), Decimal(expected))
    check('current month not complete', p['current_complete'], False)
    for key, expected in {'prior_rate':'0.5','current_rate':'0.36','prior_weighted_current_rate':'0.60','prior_A_rate':'0.8','current_A_rate':'0.9','prior_B_rate':'0.2','current_B_rate':'0.3'}.items():
        check(key, Decimal(str(mix[key])), Decimal(expected))
    check('mix not causal evidence', mix['causal_supported'], False)
    for key, expected in {'records':6,'independent_units':3,'complete_pairs':3}.items(): check(key, repeated[key], expected)
    check('within-unit mean change', Decimal(str(repeated['mean_change'])), Decimal('1'))
    check('paired observations not causal proof', repeated['causal_supported'], False)
    table_values = {r['metric']:r['value'] for name in manifest['tables'] for r in rows(artifact(base,name))}
    for key, value in {**p, **mix, **repeated}.items():
        actual = table_values[key]
        if isinstance(value,bool) and actual.lower() not in ('true','false'):
            raise ValueError('Invalid boolean table value: ' + key)
        parsed = actual.lower() == 'true' if isinstance(value,bool) else Decimal(actual)
        expected = value if isinstance(value,bool) else Decimal(str(value))
        check('table matches checked summary ' + key, parsed, expected)
    data = rows(artifact(base, manifest['chart_data']))
    check('chart source table', {r['period']:Decimal(r['value']) for r in data}, {'prior_matched':Decimal('20'),'current_matched':Decimal('24')})
    svg = ET.parse(artifact(base, manifest['chart'])).getroot()
    bars = {e.attrib['data-period']:e for e in svg.iter() if 'data-period' in e.attrib}
    check('visible comparison marks', set(bars), {'prior_matched','current_matched'})
    ratio = Decimal(bars['prior_matched'].attrib['width']) / Decimal(bars['current_matched'].attrib['width'])
    check('bar geometry matches values', abs(ratio - Decimal(20)/Decimal(24)) < Decimal('0.00001'), True)
    check('bars share zero baseline', bars['prior_matched'].attrib['x'], bars['current_matched'].attrib['x'])
    labels = ' '.join(svg.itertext())
    check('chart includes compared values', all(value in labels for value in ('20','24')), True)
    public = set(manifest['public_artifacts'])
    required = {manifest[k] for k in ('summary','report','chart','chart_data')} | set(manifest['tables'])
    check('public inventory covers result artifacts', required.issubset(public), True)
    secrets = {r[field] for r in rows(root/'analysis/input/transactions.csv') for field in ('person','email')}
    secrets.add('stale-private@example.invalid')
    for relative in public:
        content = artifact(base, relative).read_text(encoding='utf-8')
        check('permitted values only ' + relative, any(s in content for s in secrets), False)
        if relative.endswith('.csv'):
            with artifact(base, relative).open(newline='',encoding='utf-8') as f: headers=next(csv.reader(f))
            check('no raw identity columns ' + relative, bool(set(headers) & {'record','person','email'}), False)
    html = artifact(base, manifest['report']).read_text(encoding='utf-8')
    check('hostile label not executable HTML', '<script>window.__fixture=1</script>' in html, False)
    check('analysis generator retained', artifact(base, manifest['generator']).is_file(), True)
except (OSError, ValueError, KeyError, TypeError, StopIteration, ET.ParseError) as error:
    check('inspectable analysis artifacts', str(error), None)

try:
    base = root/'notebook/output'
    manifest = load(base/'manifest.json')
    executed = load(artifact(base, manifest['executed']))
    partial = load(artifact(base, manifest['partial']))
    report = load(artifact(base, manifest['report']))
    streams = ''.join(''.join(o.get('text',[])) if isinstance(o.get('text',[]),list) else o.get('text','') for o in executed['cells'][0]['outputs'] if o['output_type']=='stream')
    actual = json.loads(streams)
    check('notebook recomputed total', Decimal(actual['current_total']), Decimal('24'))
    check('notebook selected interpreter', Path(actual['interpreter']).resolve(), selected)
    check('notebook source count', actual['row_count'], 6)
    check('notebook fresh execution count', executed['cells'][0]['execution_count'], 1)
    check('notebook successful status', report['fresh']['status'], 'completed')
    check('notebook success exit code', report['fresh']['exit_code'], 0)
    check('notebook failure status', report['failure']['status'], 'failed')
    check('notebook failure exit code', report['failure']['exit_code'] != 0, True)
    errors = [o for o in partial['cells'][0]['outputs'] if o['output_type']=='error']
    check('actual cell failure retained', [(e['ename'],e['evalue']) for e in errors], [('ValueError','synthetic_notebook_failure')])
    check('downstream cached output absent', partial['cells'][1]['outputs'], [])
    check('downstream cell not executed', partial['cells'][1]['execution_count'], None)
    for name, nb in [('executed',executed),('partial',partial)]:
        shared = json.dumps({'metadata':nb['metadata'],'outputs':[c.get('outputs',[]) for c in nb['cells']]})
        check(name+' cached private values absent', 'stale-private@example.invalid' in shared, False)
        check(name+' cached false total absent', 'CACHED_TOTAL=999999' in shared, False)
    check('notebook reproduction script retained', artifact(base,manifest['generator']).is_file(), True)
except (OSError, ValueError, KeyError, TypeError) as error:
    check('inspectable notebook evidence', str(error), None)

print(f'{sum(checks)}/{len(checks)} checks passed')
raise SystemExit(0 if all(checks) else 1)
