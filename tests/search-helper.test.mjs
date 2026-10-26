import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const script = fileURLToPath(new URL('../skills/code-search/scripts/search.mjs', import.meta.url));
const rgProbe = spawnSync('rg', ['--no-config', '--version'], { encoding: 'utf8' });
const rgUnavailable = rgProbe.error?.code === 'ENOENT';

async function fixture(t, mode = 'fallback') {
  if (mode === 'rg') {
    assert.ifError(rgProbe.error);
    assert.equal(rgProbe.status, 0, rgProbe.stderr);
  }
  const root = await mkdtemp(path.join(tmpdir(), 'kitshift-search-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const bin = path.join(root, 'bin');
  const workspace = path.join(root, 'workspace');
  await mkdir(bin);
  await mkdir(workspace);
  async function file(name, content = 'needle\n') {
    const full = path.join(workspace, name);
    await mkdir(path.dirname(full), { recursive: true });
    await writeFile(full, content);
  }
  const run = (...args) => spawnSync(process.execPath, [script, ...args, '--json'], {
    cwd: workspace,
    encoding: 'utf8',
    env: {
      ...process.env,
      PATH: mode === 'rg' ? process.env.PATH : bin,
      HOME: root,
      XDG_CONFIG_HOME: root,
      GIT_CONFIG_NOSYSTEM: '1',
      GIT_CONFIG_GLOBAL: path.join(root, 'nonexistent-git-config'),
      // The real rg branch must ignore user configuration.
      RIPGREP_CONFIG_PATH: path.join(root, 'nonexistent-rg-config'),
    },
  });
  function success(result) {
    assert.ifError(result.error);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(result.stderr, '');
    return JSON.parse(result.stdout);
  }
  function failure(result) {
    assert.ifError(result.error);
    assert.notEqual(result.status, 0);
    assert.equal(result.stdout, '');
    assert.match(result.stderr, /Error:/);
  }
  async function fakeRg(body, mode = 0o755) {
    await writeFile(path.join(bin, 'rg'), `#!${process.execPath}\n${body}\n`, { mode });
  }
  return { root, workspace, bin, file, run, success, failure, fakeRg };
}

for (const mode of ['fallback', 'rg']) {
  const options = { skip: mode === 'rg' && rgUnavailable ? 'ripgrep is not installed' : false };

  test(`${mode}: nested globstar matches zero and multiple directories`, options, async t => {
    const f = await fixture(t, mode);
    for (const name of ['src/root.ts', 'src/deep/a.ts', 'src/deep/more/b.ts', 'src/deep/a.js', 'other.ts']) {
      await f.file(name);
    }
    const expected = ['src/root.ts', 'src/deep/a.ts', 'src/deep/more/b.ts'].map(name => path.normalize(name)).sort();
    assert.deepEqual(f.success(f.run('glob', 'src/**/*.ts')).sort(), expected);
    assert.deepEqual(f.success(f.run('grep', 'needle', '--glob', 'src/**/*.ts')).map(row => row.file).sort(), expected);
    assert.deepEqual(f.success(f.run('glob', 'src/*.ts')), [path.join('src', 'root.ts')]);
    assert.deepEqual(f.success(f.run('grep', 'needle', '--glob', 'src/*.ts')).map(row => row.file), [path.join('src', 'root.ts')]);
  });

  test(`${mode}: literal regex metacharacters in filenames stay literal`, options, async t => {
    const f = await fixture(t, mode);
    await f.file('nested/a+b.ts');
    await f.file('nested/aaab.ts');
    const expected = path.join('nested', 'a+b.ts');
    assert.deepEqual(f.success(f.run('glob', 'a+b.ts')), [expected]);
    assert.deepEqual(f.success(f.run('grep', 'needle', '--glob', 'a+b.ts')), [{ file: expected, line: 1, text: 'needle' }]);
  });

  test(`${mode}: braces, stars, questions and character classes filter basenames`, options, async t => {
    const f = await fixture(t, mode);
    for (const name of ['a.js', 'nested/b.ts', 'nested/c.ts', 'nested/a.json', 'nested/aa.js']) await f.file(name);
    const all = ['a.js', 'nested/b.ts', 'nested/c.ts', 'nested/aa.js'].map(name => path.normalize(name)).sort();
    assert.deepEqual(f.success(f.run('glob', '*.{js,ts}')).sort(), all);
    assert.deepEqual(f.success(f.run('grep', 'needle', '--glob', '*.{js,ts}')).map(row => row.file).sort(), all);
    const selected = ['a.js', 'nested/b.ts', 'nested/c.ts'].map(name => path.normalize(name)).sort();
    assert.deepEqual(f.success(f.run('glob', '?.{js,ts}')).sort(), selected);
    assert.deepEqual(f.success(f.run('glob', '[ab].{js,ts}')).sort(), ['a.js', path.join('nested', 'b.ts')].sort());
    assert.deepEqual(f.success(f.run('grep', 'needle', '--glob', '[!ac].ts')).map(row => row.file), [path.join('nested', 'b.ts')]);
    assert.deepEqual(f.success(f.run('glob', 'nested/*.ts')).sort(), [path.join('nested', 'b.ts'), path.join('nested', 'c.ts')].sort());
  });

  test(`${mode}: dash-prefixed patterns and colon filenames preserve actual matching content`, options, async t => {
    const f = await fixture(t, mode);
    await f.file('note:one.txt', 'unrelated\n  -needle: actual content  \n');
    assert.deepEqual(f.success(f.run('grep', '-needle')), [
      { file: 'note:one.txt', line: 2, text: '-needle: actual content' },
    ]);
    assert.deepEqual(f.success(f.run('grep', '-needle', '--path', 'note:one.txt')), [
      { file: 'note:one.txt', line: 2, text: '-needle: actual content' },
    ]);
    assert.deepEqual(f.success(f.run('grep', 'absent')), []);
    assert.deepEqual(f.success(f.run('glob', '*.missing')), []);
  });

  test(`${mode}: invalid regular expressions and missing paths fail without success output`, options, async t => {
    const f = await fixture(t, mode);
    await f.file('file.txt');
    f.failure(f.run('grep', '['));
    f.failure(f.run('grep', 'needle', '--path', 'missing'));
    f.failure(f.run('glob', '*.ts', '--path', 'missing'));
    f.failure(f.run('glob', '[broken'));
    f.failure(f.run('grep', 'needle', '--glob', '*.{js'));
  });

}

test('ripgrep status 1 alone is a successful no-match result', async t => {
  const f = await fixture(t);
  await f.fakeRg('process.exit(1);');
  assert.deepEqual(f.success(f.run('grep', 'needle')), []);
});

test('ripgrep non-match errors, malformed output and spawn errors are not swallowed', async t => {
  const cases = [
    { name: 'status 2', body: "process.stderr.write('invalid regex from rg'); process.exit(2);", message: /invalid regex from rg/ },
    { name: 'invalid JSON', body: "process.stdout.write('not json\\n');", message: /Error:/ },
    { name: 'signal', body: "process.kill(process.pid, 'SIGTERM');", message: /SIGTERM/ },
    { name: 'buffer limit', body: "process.stdout.write('x'.repeat(11 * 1024 * 1024));", message: /ENOBUFS/ },
    { name: 'not executable', body: 'process.exit(0);', mode: 0o644, message: /EACCES/ },
  ];
  for (const entry of cases) {
    await t.test(entry.name, async t => {
      const f = await fixture(t);
      await f.fakeRg(entry.body, entry.mode);
      const result = f.run('grep', 'needle');
      f.failure(result);
      assert.match(result.stderr, entry.message);
    });
  }
});
