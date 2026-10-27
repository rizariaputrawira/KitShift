import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, readdir, access, cp, rm, symlink, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const repository = fileURLToPath(new URL('../', import.meta.url));

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'kitshift-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const repo = join(root, 'repo');
  for (const dir of ['scripts', 'guidance', 'harnesses/omp', 'harnesses/omp/agents', 'mcp', 'skills/example']) {
    await mkdir(join(repo, dir), { recursive: true });
  }
  await cp(join(repository, 'LICENSE'), join(repo, 'LICENSE'));
  await cp(join(repository, 'NOTICE'), join(repo, 'NOTICE'));
  await cp(join(repository, 'scripts/install-omp.mjs'), join(repo, 'scripts/install-omp.mjs'));
  await cp(join(repository, 'scripts/install-common.mjs'), join(repo, 'scripts/install-common.mjs'));
  await cp(join(repository, 'mcp/omp.json'), join(repo, 'mcp/omp.json'));
  await cp(join(repository, 'harnesses/omp/agents/kitshift-reviewer.md'), join(repo, 'harnesses/omp/agents/kitshift-reviewer.md'));
  await cp(join(repository, 'harnesses/omp/agents/kitshift-investigator.md'), join(repo, 'harnesses/omp/agents/kitshift-investigator.md'));
  await writeFile(join(repo, 'guidance/APPEND_SYSTEM.md'), '# Personal preferences\n');
  await writeFile(join(repo, 'harnesses/omp/config.yml'), 'theme:\n  dark: onyx\n');
  await writeFile(join(repo, 'skills/example/SKILL.md'), '---\nname: example\ndescription: Example skill\n---\nExample instructions.\n');
  const cli = join(root, 'cli.mjs');
  await writeFile(cli, '// Fixture path; never executed.\n');
  const target = join(root, 'agent');
  const run = (...args) => spawnSync(process.execPath, [join(repo, 'scripts/install-omp.mjs'), '--target', target,
    '--playwright-cli', cli, '--browser', process.execPath, '--open-design-cli', cli, ...args], { encoding: 'utf8' });
  const success = result => assert.equal(result.status, 0, result.stderr || result.stdout);
  return { root, repo, target, run, success };
}

async function snapshot(target) {
  const names = (await readdir(target, { recursive: true })).sort();
  return Promise.all(names.map(async name => [
    name,
    (await stat(join(target, name))).isFile() ? await readFile(join(target, name)) : null,
  ]));
}

test('installation and managed updates preserve root license and third-party notices', async t => {
  const f = await fixture(t);
  const license = await readFile(join(repository, 'LICENSE'));
  const scopeNotice = await readFile(join(repository, 'NOTICE'));
  const notices = {
    'LICENSE.txt': Buffer.from('Third-party license\r\nCopyright upstream\r\n'),
    NOTICE: Buffer.from('Upstream attribution\nKeep this notice.\n'),
  };
  for (const [name, bytes] of Object.entries(notices)) {
    await writeFile(join(f.repo, 'skills/example', name), bytes);
  }
  f.success(f.run());
  assert.deepEqual(await readFile(join(f.target, 'LICENSE')), license);
  assert.equal((await stat(join(f.target, 'LICENSE'))).mode & 0o777, 0o644);
  assert.deepEqual(await readFile(join(f.target, 'NOTICE')), scopeNotice);
  for (const [name, bytes] of Object.entries(notices)) {
    assert.deepEqual(await readFile(join(f.target, 'skills/example', name)), bytes);
  }

  const manifestPath = join(f.target, '.kitshift-manifest.json');
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  delete manifest.files.LICENSE;
  await rm(join(f.target, 'LICENSE'));
  delete manifest.files.NOTICE;
  await rm(join(f.target, 'NOTICE'));
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  await writeFile(join(f.repo, 'skills/example/SKILL.md'), 'Updated instructions\n');
  f.success(f.run('--update'));
  assert.deepEqual(await readFile(join(f.target, 'LICENSE')), license);
  assert.deepEqual(await readFile(join(f.target, 'NOTICE')), scopeNotice);
  for (const [name, bytes] of Object.entries(notices)) {
    assert.deepEqual(await readFile(join(f.target, 'skills/example', name)), bytes);
  }

  await writeFile(join(f.target, 'LICENSE'), 'Local license edit\n');
  await writeFile(join(f.repo, 'skills/example/SKILL.md'), 'Another upstream change\n');
  const before = await snapshot(f.target);
  assert.notEqual(f.run('--update').status, 0);
  assert.deepEqual(await snapshot(f.target), before);
});

test('dry run leaves a missing target absent', async t => {
  const f = await fixture(t);
  f.success(f.run('--dry-run'));
  await assert.rejects(access(f.target), { code: 'ENOENT' });
});

test('omp refuses missing MCP paths before writing on install, preview, and update', async t => {
  const f = await fixture(t);
  for (const args of [[], ['--dry-run'], ['--update'], ['--playwright-cli', join(f.root, 'cli.mjs')]]) {
    const result = spawnSync(process.execPath, [
      join(f.repo, 'scripts/install-omp.mjs'), '--target', f.target, ...args,
    ], { encoding: 'utf8' });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Required option --(?:playwright-cli|browser) is missing/);
    await assert.rejects(access(f.target), { code: 'ENOENT' });
  }
});

test('an unmanaged conflict prevents every planned write', async t => {
  const f = await fixture(t);
  await mkdir(f.target);
  await writeFile(join(f.target, 'config.yml'), 'my: preferences\n');
  assert.notEqual(f.run().status, 0);
  assert.equal(await readFile(join(f.target, 'config.yml'), 'utf8'), 'my: preferences\n');
  await assert.rejects(access(join(f.target, 'APPEND_SYSTEM.md')), { code: 'ENOENT' });
  await assert.rejects(access(join(f.target, '.kitshift-manifest.json')), { code: 'ENOENT' });
});

test('explicit update applies upstream changes but refuses locally edited files', async t => {
  const f = await fixture(t);
  f.success(f.run());
  await writeFile(join(f.repo, 'harnesses/omp/config.yml'), 'theme:\n  dark: light\n');
  assert.notEqual(f.run().status, 0);
  f.success(f.run('--update'));
  assert.equal(await readFile(join(f.target, 'config.yml'), 'utf8'), 'theme:\n  dark: light\n');
  await writeFile(join(f.target, 'config.yml'), 'my: local-edit\n');
  await writeFile(join(f.repo, 'guidance/APPEND_SYSTEM.md'), '# New shared preferences\n');
  assert.notEqual(f.run('--update').status, 0);
  assert.equal(await readFile(join(f.target, 'config.yml'), 'utf8'), 'my: local-edit\n');
  assert.equal(await readFile(join(f.target, 'APPEND_SYSTEM.md'), 'utf8'), '# Personal preferences\n');
});

test('symlinked destination ancestors cannot redirect installation outside the target', async t => {
  const f = await fixture(t);
  const outside = join(f.root, 'outside');
  await mkdir(f.target);
  await mkdir(outside);
  await symlink(outside, join(f.target, 'skills'));
  assert.notEqual(f.run().status, 0);
  await assert.rejects(access(join(outside, 'example')), { code: 'ENOENT' });
  await assert.rejects(access(join(f.target, 'config.yml')), { code: 'ENOENT' });
});
