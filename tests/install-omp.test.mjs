import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, access, cp, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const repository = fileURLToPath(new URL('../', import.meta.url));

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'kitshift-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const repo = join(root, 'repo');
  for (const dir of ['scripts', 'guidance', 'harnesses/omp', 'mcp', 'skills/example']) {
    await mkdir(join(repo, dir), { recursive: true });
  }
  await cp(join(repository, 'scripts/install-omp.mjs'), join(repo, 'scripts/install-omp.mjs'));
  await cp(join(repository, 'mcp/omp.json'), join(repo, 'mcp/omp.json'));
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

test('dry run leaves a missing target absent', async t => {
  const f = await fixture(t);
  f.success(f.run('--dry-run'));
  await assert.rejects(access(f.target), { code: 'ENOENT' });
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
