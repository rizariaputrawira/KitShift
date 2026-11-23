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
  for (const dir of ['scripts', 'guidance', 'harnesses/omp', 'harnesses/omp/agents', 'harnesses/omp/extensions', 'mcp', 'skills/example']) {
    await mkdir(join(repo, dir), { recursive: true });
  }
  await cp(join(repository, 'LICENSE'), join(repo, 'LICENSE'));
  await cp(join(repository, 'NOTICE'), join(repo, 'NOTICE'));
  await cp(join(repository, 'scripts/install-omp.mjs'), join(repo, 'scripts/install-omp.mjs'));
  await cp(join(repository, 'scripts/install-common.mjs'), join(repo, 'scripts/install-common.mjs'));
  await cp(join(repository, 'mcp/omp.json'), join(repo, 'mcp/omp.json'));
  await cp(join(repository, 'harnesses/omp/agents'), join(repo, 'harnesses/omp/agents'), { recursive: true });
  await cp(join(repository, 'harnesses/omp/extensions/kitshift-update.js'), join(repo, 'harnesses/omp/extensions/kitshift-update.js'));
  await writeFile(join(repo, 'guidance/APPEND_SYSTEM.md'), '# Personal preferences\n');
  await writeFile(join(repo, 'harnesses/omp/config.yml'), 'theme:\n  dark: onyx\n');
  await writeFile(join(repo, 'skills/example/SKILL.md'), '---\nname: example\ndescription: Example skill\n---\nExample instructions.\n');
  const cli = join(root, 'cli.mjs');
  await writeFile(cli, '// Fixture path; never executed.\n');
  const target = join(root, 'agent');
  const raw = (...args) => spawnSync(process.execPath, [join(repo, 'scripts/install-omp.mjs'), '--target', target,
    ...args], { encoding: 'utf8' });
  const run = (...args) => raw('--playwright-cli', cli, '--browser', process.execPath, '--open-design-cli', cli, ...args);
  const success = result => assert.equal(result.status, 0, result.stderr || result.stdout);
  return { root, repo, target, cli, raw, run, success };
}

async function snapshot(target) {
  const names = (await readdir(target, { recursive: true })).sort();
  return Promise.all(names.map(async name => [
    name,
    (await stat(join(target, name))).isFile() ? await readFile(join(target, name)) : null,
  ]));
}

test('manifest records only clean checkout provenance and preserves it on preview and conflict', async t => {
  const f = await fixture(t);
  const git = (...args) => {
    const result = spawnSync('git', args, { cwd: f.repo, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    return result.stdout.trim();
  };
  git('init', '-q');
  git('config', 'user.email', 'fixture@example.invalid');
  git('config', 'user.name', 'Fixture');
  await writeFile(join(f.repo, '.gitignore'), 'skills/example/ignored\n');
  git('add', '.');
  git('commit', '-qm', 'fixture');
  const revision = git('rev-parse', 'HEAD');
  f.success(f.run());
  const manifestPath = join(f.target, '.kitshift-manifest.json');
  const original = await readFile(manifestPath, 'utf8');
  assert.deepEqual(JSON.parse(original).source, {
    repository: f.repo, revision, node: process.execPath,
  });
  await writeFile(join(f.repo, 'skills/example/ignored'), 'ignored source bytes');
  f.success(f.run('--update', '--dry-run'));
  assert.equal(await readFile(manifestPath, 'utf8'), original);
  f.success(f.run('--update'));
  assert.equal(JSON.parse(await readFile(manifestPath, 'utf8')).source.revision, null);
  await writeFile(join(f.target, 'config.yml'), 'local edit');
  await writeFile(join(f.repo, 'harnesses/omp/config.yml'), 'upstream edit');
  const before = await readFile(manifestPath, 'utf8');
  assert.notEqual(f.run('--update').status, 0);
  assert.equal(await readFile(manifestPath, 'utf8'), before);
});

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
  f.success(f.raw('--dry-run'));
  await assert.rejects(access(f.target), { code: 'ENOENT' });
});

test('omp refuses an incomplete Playwright selection before writing', async t => {
  const f = await fixture(t);
  for (const [selection, missing] of [
    [['--playwright-cli', f.cli], '--browser'],
    [['--browser', process.execPath], '--playwright-cli'],
  ]) {
    for (const operation of [[], ['--dry-run'], ['--update'], ['--update', '--dry-run']]) {
      const result = f.raw(...selection, ...operation);
      assert.equal(result.status, 1);
      assert.ok(result.stderr.includes(`Required option ${missing} is missing`), result.stderr);
      await assert.rejects(access(f.target), { code: 'ENOENT' });
    }
  }
  f.success(f.raw());
  const before = await snapshot(f.target);
  for (const [selection, missing] of [
    [['--playwright-cli', f.cli], '--browser'],
    [['--browser', process.execPath], '--playwright-cli'],
  ]) {
    for (const operation of [['--update'], ['--update', '--dry-run']]) {
      const result = f.raw(...selection, ...operation);
      assert.equal(result.status, 1);
      assert.ok(result.stderr.includes(`Required option ${missing} is missing`), result.stderr);
      assert.deepEqual(await snapshot(f.target), before);
    }
  }
});

test('core install and incremental integrations retain trusted MCP entries', async t => {
  const f = await fixture(t);
  const mcpPath = join(f.target, 'mcp.json');
  const manifestPath = join(f.target, '.kitshift-manifest.json');
  const servers = async () => JSON.parse(await readFile(mcpPath, 'utf8')).mcpServers;

  f.success(f.raw());
  assert.equal(await readFile(join(f.target, 'APPEND_SYSTEM.md'), 'utf8'), '# Personal preferences\n');
  assert.match(await readFile(join(f.target, 'skills/example/SKILL.md'), 'utf8'), /Example instructions/);
  assert.ok((await readdir(join(f.target, 'agents'))).length > 0);
  assert.deepEqual(Object.keys(await servers()), ['github']);
  assert.equal((await stat(mcpPath)).mode & 0o777, 0o600);

  f.success(f.raw('--update', '--open-design-cli', f.cli));
  const withDesign = await servers();
  assert.deepEqual(Object.keys(withDesign), ['github', 'open-design']);
  assert.equal(withDesign['open-design'].command, process.execPath);
  assert.deepEqual(withDesign['open-design'].args, [f.cli, 'mcp']);

  f.success(f.raw('--update', '--playwright-cli', f.cli, '--browser', process.execPath));
  const withPlaywright = await servers();
  assert.deepEqual(Object.keys(withPlaywright), ['playwright', 'github', 'open-design']);
  assert.deepEqual(withPlaywright['open-design'], withDesign['open-design']);
  assert.equal(withPlaywright.playwright.command, process.execPath);
  assert.equal(withPlaywright.playwright.args[0], f.cli);
  const browserIndex = withPlaywright.playwright.args.indexOf('--executable-path');
  assert.notEqual(browserIndex, -1);
  assert.equal(withPlaywright.playwright.args[browserIndex + 1], process.execPath);

  const previousBytes = await readFile(mcpPath);
  const previousHash = JSON.parse(await readFile(manifestPath, 'utf8')).files['mcp.json'].sha256;
  await rm(f.cli);
  await writeFile(join(f.repo, 'skills/example/SKILL.md'), 'Updated upstream skill\n');
  f.success(f.raw('--update'));
  assert.equal(await readFile(join(f.target, 'skills/example/SKILL.md'), 'utf8'), 'Updated upstream skill\n');
  assert.deepEqual(await readFile(mcpPath), previousBytes);
  assert.equal(JSON.parse(await readFile(manifestPath, 'utf8')).files['mcp.json'].sha256, previousHash);
});

test('unmanaged and locally edited MCP files prevent all planned writes without integration flags', async t => {
  const unmanaged = await fixture(t);
  await mkdir(unmanaged.target);
  await writeFile(join(unmanaged.target, 'mcp.json'), '{"mcpServers":{"custom":{}}}\n');
  await writeFile(join(unmanaged.repo, 'skills/example/SKILL.md'), 'Upstream skill change\n');
  const unmanagedBefore = await snapshot(unmanaged.target);
  assert.notEqual(unmanaged.raw().status, 0);
  assert.deepEqual(await snapshot(unmanaged.target), unmanagedBefore);

  const managed = await fixture(t);
  managed.success(managed.raw());
  await writeFile(join(managed.target, 'mcp.json'), '{"mcpServers":{"custom":{}}}\n');
  await writeFile(join(managed.repo, 'skills/example/SKILL.md'), 'Upstream skill change\n');
  const managedBefore = await snapshot(managed.target);
  assert.notEqual(managed.raw('--update').status, 0);
  assert.deepEqual(await snapshot(managed.target), managedBefore);
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
