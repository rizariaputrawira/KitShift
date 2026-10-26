import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, access, cp, rm, symlink, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const repository = fileURLToPath(new URL('../', import.meta.url));

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'kitshift-agy-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const repo = join(root, 'repo');
  for (const dir of ['scripts', 'guidance', 'harnesses/agy/agents', 'mcp', 'skills/example']) {
    await mkdir(join(repo, dir), { recursive: true });
  }
  await cp(join(repository, 'scripts/install-agy.mjs'), join(repo, 'scripts/install-agy.mjs'));
  await cp(join(repository, 'scripts/install-common.mjs'), join(repo, 'scripts/install-common.mjs'));
  await cp(join(repository, 'mcp/agy.json'), join(repo, 'mcp/agy.json'));
  await cp(join(repository, 'guidance/APPEND_SYSTEM.md'), join(repo, 'guidance/APPEND_SYSTEM.md'));
  await cp(join(repository, 'harnesses/agy/agents/kitshift-reviewer.md'), join(repo, 'harnesses/agy/agents/kitshift-reviewer.md'));
  await cp(join(repository, 'harnesses/agy/agents/kitshift-investigator.md'), join(repo, 'harnesses/agy/agents/kitshift-investigator.md'));
  await writeFile(join(repo, 'skills/example/SKILL.md'), '---\nname: example\ndescription: Example skill\n---\nExample instructions.\n');
  const cli = join(root, 'cli.mjs');
  await writeFile(cli, '// Fixture path; never executed.\n');
  const target = join(root, 'plugin');
  const run = (...args) => spawnSync(process.execPath, [join(repo, 'scripts/install-agy.mjs'), '--target', target, ...args], { encoding: 'utf8' });
  const runWithMcp = (...args) => spawnSync(process.execPath, [join(repo, 'scripts/install-agy.mjs'), '--target', target,
    '--with-mcp', '--playwright-cli', cli, '--browser', process.execPath, '--open-design-cli', cli, ...args], { encoding: 'utf8' });
  const success = result => assert.equal(result.status, 0, result.stderr || result.stdout);
  return { root, repo, target, cli, run, runWithMcp, success };
}

test('dry run leaves a missing target absent', async t => {
  const f = await fixture(t);
  f.success(f.run('--dry-run'));
  await assert.rejects(access(f.target), { code: 'ENOENT' });
});

test('fresh install creates plugin structure without mcp by default', async t => {
  const f = await fixture(t);
  f.success(f.run());

  const pluginStat = await stat(join(f.target, 'plugin.json'));
  assert.equal(pluginStat.mode & 0o777, 0o644);
  const plugin = JSON.parse(await readFile(join(f.target, 'plugin.json'), 'utf8'));
  assert.equal(plugin.name, 'kitshift');

  const ruleStat = await stat(join(f.target, 'rules/AGENTS.md'));
  assert.equal(ruleStat.mode & 0o777, 0o644);
  const rule = await readFile(join(f.target, 'rules/AGENTS.md'), 'utf8');
  assert(rule.includes('These preferences supplement host defaults.'));
  assert(rule.includes('`../skills/git-commit-message/SKILL.md`'));
  assert(!rule.includes('These preferences supplement OMP defaults.'));
  assert(!rule.includes('`skill://git-commit-message`'));

  assert(await readFile(join(f.target, 'skills/example/SKILL.md'), 'utf8'));
  assert(await readFile(join(f.target, 'agents/kitshift-reviewer.md'), 'utf8'));
  assert(await readFile(join(f.target, 'agents/kitshift-investigator.md'), 'utf8'));

  const manifestStat = await stat(join(f.target, '.kitshift-manifest.json'));
  assert.equal(manifestStat.mode & 0o777, 0o600);

  await assert.rejects(access(join(f.target, 'mcp_config.json')), { code: 'ENOENT' });
});

test('an unmanaged conflict prevents every planned write', async t => {
  const f = await fixture(t);
  await mkdir(f.target);
  await writeFile(join(f.target, 'plugin.json'), '{"name":"conflicting"}\n');
  assert.notEqual(f.run().status, 0);
  assert.equal(await readFile(join(f.target, 'plugin.json'), 'utf8'), '{"name":"conflicting"}\n');
  await assert.rejects(access(join(f.target, 'rules/AGENTS.md')), { code: 'ENOENT' });
  await assert.rejects(access(join(f.target, '.kitshift-manifest.json')), { code: 'ENOENT' });
});

test('explicit update applies upstream changes and rejects local edits', async t => {
  const f = await fixture(t);
  f.success(f.run());
  await writeFile(join(f.repo, 'skills/example/SKILL.md'), '---\nname: example\ndescription: Updated\n---\nNew\n');
  assert.notEqual(f.run().status, 0);
  f.success(f.run('--update'));
  assert(await readFile(join(f.target, 'skills/example/SKILL.md'), 'utf8'), 'New\n');

  await writeFile(join(f.target, 'rules/AGENTS.md'), '# Local edit\n');
  await writeFile(join(f.repo, 'skills/example/SKILL.md'), '---\nname: example\ndescription: Updated2\n---\nNew2\n');
  assert.notEqual(f.run('--update').status, 0);
  assert.equal(await readFile(join(f.target, 'rules/AGENTS.md'), 'utf8'), '# Local edit\n');
});

test('--with-mcp renders mcp_config.json and requires all three mcp flags', async t => {
  const f = await fixture(t);
  assert.notEqual(f.run('--playwright-cli', f.cli).status, 0);
  assert.notEqual(f.run('--with-mcp').status, 0);
  assert.notEqual(f.run('--with-mcp', '--playwright-cli', f.cli).status, 0);

  f.success(f.runWithMcp());
  const mcpStat = await stat(join(f.target, 'mcp_config.json'));
  assert.equal(mcpStat.mode & 0o777, 0o600);
  const mcp = JSON.parse(await readFile(join(f.target, 'mcp_config.json'), 'utf8'));
  assert(mcp.mcpServers.playwright);
  assert(!('cwd' in mcp.mcpServers.playwright));
  assert(mcp.mcpServers['open-design']);
  assert(!('cwd' in mcp.mcpServers['open-design']));
  assert(mcp.mcpServers.lsp);
  assert(mcp.mcpServers.codegraph);
  assert(mcp.mcpServers.filesystem);
  assert(!('github' in mcp.mcpServers));

  // Verify that updating without --with-mcp retains previously managed mcp_config.json
  await writeFile(join(f.repo, 'skills/example/SKILL.md'), '---\nname: example\ndescription: Update3\n---\nNew3\n');
  f.success(f.run('--update'));
  assert.equal((await stat(join(f.target, 'mcp_config.json'))).mode & 0o777, 0o600);
  const manifest = JSON.parse(await readFile(join(f.target, '.kitshift-manifest.json'), 'utf8'));
  assert(manifest.files['mcp_config.json']);
});

test('symlinked destination ancestors cannot redirect installation outside target', async t => {
  const f = await fixture(t);
  const outside = join(f.root, 'outside');
  await mkdir(f.target);
  await mkdir(outside);
  await symlink(outside, join(f.target, 'skills'));
  assert.notEqual(f.run().status, 0);
  await assert.rejects(access(join(outside, 'example')), { code: 'ENOENT' });
  await assert.rejects(access(join(f.target, 'plugin.json')), { code: 'ENOENT' });
});

test('native agy plugin validate passes against full installed bundle', async t => {
  const agyBinary = process.env.AGY_BIN || '/home/personal/.local/bin/agy';
  let hasAgy = false;
  try {
    const check = spawnSync(agyBinary, ['--version'], { encoding: 'utf8' });
    hasAgy = check.status === 0;
  } catch {
    hasAgy = false;
  }
  if (!hasAgy) {
    t.skip('agy binary not available on this system');
    return;
  }

  const root = await mkdtemp(join(tmpdir(), 'kitshift-agy-full-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const cli = join(root, 'cli.mjs');
  await writeFile(cli, '// Fixture path; never executed.\n');
  const target = join(root, 'kitshift');

  const install = spawnSync(process.execPath, [
    join(repository, 'scripts/install-agy.mjs'),
    '--target', target,
    '--with-mcp',
    '--playwright-cli', cli,
    '--browser', process.execPath,
    '--open-design-cli', cli,
  ], { encoding: 'utf8' });
  assert.equal(install.status, 0, install.stderr || install.stdout);

  const val = spawnSync(agyBinary, ['plugin', 'validate', target, '--json'], { encoding: 'utf8' });
  assert.equal(val.status, 0, val.stderr || val.stdout);
  const result = JSON.parse(val.stdout);

  assert.equal(result.name, 'kitshift');
  assert.equal(result.components.skills, 55);
  assert.equal(result.components.agents, 4);
  assert.equal(result.components.rules, 1);
  assert.equal(result.components.mcpServers, 5);

  const errors = (result.findings || []).filter(f => f.severity === 'error');
  assert.equal(errors.length, 0, `Expected 0 validation errors, got: ${JSON.stringify(errors)}`);
});
