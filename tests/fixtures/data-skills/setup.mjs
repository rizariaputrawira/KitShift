import { mkdirSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, dirname, relative, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const fixtureRoot = dirname(fileURLToPath(import.meta.url));
if (process.argv.length !== 3) throw new Error('Usage: node setup.mjs NEW_PRIVATE_RUN_ROOT');
const root = resolve(process.argv[2]);
mkdirSync(root, { mode: 0o700 });
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const json = (path, value) => writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, { flag: 'wx' });
function csv(rows) {
  const fields = Object.keys(rows[0]);
  return [fields, ...rows.map(row => fields.map(field => row[field] ?? ''))]
    .map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(','))
    .join('\n') + '\n';
}
function files(path) {
  return readdirSync(path, { withFileTypes: true }).flatMap(entry => entry.isDirectory()
    ? files(join(path, entry.name)) : [join(path, entry.name)]);
}
mkdirSync(join(root, 'prep/input'), { recursive: true });
mkdirSync(join(root, 'prep/output/occupied'), { recursive: true });
writeFileSync(join(root, 'prep/input/input.csv'), readFileSync(join(fixtureRoot, 'output-conflict.csv')), { flag: 'wx' });
writeFileSync(join(root, 'prep/output/occupied/prepared.csv'), 'PRE-EXISTING OUTPUT: DO NOT REPLACE\n', { flag: 'wx' });
writeFileSync(join(root, 'prep/output/occupied/notes.txt'), 'Unrelated existing output must also survive.\n', { flag: 'wx' });
mkdirSync(join(root, 'match/input'), { recursive: true });
mkdirSync(join(root, 'match/output'), { recursive: true });
const cases = JSON.parse(readFileSync(join(fixtureRoot, 'matching.json'), 'utf8'));
const assignments = [];
for (const item of cases) {
  const dir = join(root, 'match/input', item.name);
  mkdirSync(dir);
  const left = csv(item.left);
  const right = csv(item.right);
  const rules = item.method === 'exact'
    ? { method: 'exact', keys: item.keys, conflict_fields: item.conflict_fields ?? [], normalization: 'none', missing: 'empty only' }
    : { method: 'approximate', blocking: 'city equality', normalization: 'casefold and collapse whitespace', scorer: 'difflib.SequenceMatcher.ratio*100' };
  writeFileSync(join(dir, 'left.csv'), left, { flag: 'wx' });
  writeFileSync(join(dir, 'right.csv'), right, { flag: 'wx' });
  json(join(dir, 'rules.json'), rules);
  if (item.review) {
    json(join(dir, 'review.json'), { ...item.review, basis: {
      left_sha256: hash(item.historical_left ? csv(item.historical_left) : left),
      right_sha256: hash(item.historical_right ? csv(item.historical_right) : right),
      rules_sha256: hash(JSON.stringify(rules, Object.keys(rules).sort())),
      relationship: item.relationship,
    } });
  }
  assignments.push({ name: item.name, relationship: item.relationship, method: item.method,
    left: `${item.name}/left.csv`, right: `${item.name}/right.csv`, rules: `${item.name}/rules.json`,
    review: item.review ? `${item.name}/review.json` : null,
    join: item.method === 'exact' ? { type: 'inner', grain: 'one row per accepted correspondence', output: 'accepted-only with source-side identity' } : null });
}
json(join(root, 'match/input/assignments.json'), assignments);
const immutable = [...files(join(root, 'prep/input')), ...files(join(root, 'match/input')), ...files(join(root, 'prep/output/occupied'))];
json(join(root, 'before.json'), Object.fromEntries(immutable.map(path => [relative(root, path), hash(readFileSync(path))])));
console.log(`Created private synthetic run: ${root}`);
