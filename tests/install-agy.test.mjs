import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, readdir, access, cp, rm, symlink, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const repository = fileURLToPath(new URL('../', import.meta.url));

async function fixture(t, route = 'direct') {
  const root = await mkdtemp(join(tmpdir(), 'kitshift-agy-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const repo = join(root, 'repo');
  for (const dir of ['scripts', 'guidance', 'harnesses/agy/agents', 'mcp', 'skills/example']) {
    await mkdir(join(repo, dir), { recursive: true });
  }
  await cp(join(repository, 'LICENSE'), join(repo, 'LICENSE'));
  await cp(join(repository, 'NOTICE'), join(repo, 'NOTICE'));
  await cp(join(repository, 'scripts/install-agy.mjs'), join(repo, 'scripts/install-agy.mjs'));
  await cp(join(repository, 'scripts/install.mjs'), join(repo, 'scripts/install.mjs'));
  await cp(join(repository, 'scripts/install-common.mjs'), join(repo, 'scripts/install-common.mjs'));
  await cp(join(repository, 'mcp/agy.json'), join(repo, 'mcp/agy.json'));
  await cp(join(repository, 'guidance/APPEND_SYSTEM.md'), join(repo, 'guidance/APPEND_SYSTEM.md'));
  await cp(join(repository, 'harnesses/agy/agents/kitshift-reviewer.md'), join(repo, 'harnesses/agy/agents/kitshift-reviewer.md'));
  await cp(join(repository, 'harnesses/agy/agents/kitshift-investigator.md'), join(repo, 'harnesses/agy/agents/kitshift-investigator.md'));
  await writeFile(join(repo, 'skills/example/SKILL.md'), '---\nname: example\ndescription: Example skill\n---\nExample instructions.\n');
  const cli = join(root, 'cli.mjs');
  await writeFile(cli, '// Fixture path; never executed.\n');
  const target = join(root, 'plugin');
  const entry = route === 'unified'
    ? [join(repo, 'scripts/install.mjs'), 'agy']
    : [join(repo, 'scripts/install-agy.mjs')];
  const requiredArgs = ['--playwright-cli', cli, '--browser', process.execPath, '--open-design-cli', cli];
  const raw = (...args) => spawnSync(process.execPath, [...entry, '--target', target, ...args], { encoding: 'utf8' });
  const run = (...args) => raw(...requiredArgs, ...args);
  const success = result => assert.equal(result.status, 0, result.stderr || result.stdout);
  return { root, repo, target, cli, requiredArgs, raw, run, success };
}

async function snapshot(target) {
  const names = (await readdir(target, { recursive: true })).sort();
  return Promise.all(names.map(async name => [
    name,
    (await stat(join(target, name))).isFile() ? await readFile(join(target, name)) : null,
  ]));
}

for (const route of ['direct', 'unified']) {
  test(`${route} installation and managed updates preserve root license and third-party notices`, async t => {
    const f = await fixture(t, route);
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

  for (const flag of ['--help', '-h']) {
    test(`${route} ${flag} succeeds without MCP paths or writes`, async t => {
      const f = await fixture(t, route);
      f.success(f.raw(flag));
      await assert.rejects(access(f.target), { code: 'ENOENT' });
    });
  }

  test(`${route} valid dry run plans MCP without writing absent or existing targets`, async t => {
    const f = await fixture(t, route);
    f.success(f.run('--dry-run'));
    await assert.rejects(access(f.target), { code: 'ENOENT' });
    f.success(f.run());
    await writeFile(join(f.repo, 'skills/example/SKILL.md'), 'Upstream change\n');
    const before = await snapshot(f.target);
    f.success(f.run('--update', '--dry-run'));
    assert.deepEqual(await snapshot(f.target), before);
  });

  for (const flag of ['--playwright-cli', '--browser', '--open-design-cli']) {
    for (const invalid of ['relative', 'missing', 'directory', ...(flag === '--browser' ? ['nonexecutable'] : [])]) {
      test(`${route} rejects ${invalid} ${flag} without writes`, async t => {
        const f = await fixture(t, route);
        const value = {
          relative: 'relative.mjs',
          missing: join(f.root, 'missing.mjs'),
          directory: f.root,
          nonexecutable: f.cli,
        }[invalid];
        const args = f.requiredArgs.map((argument, index, values) => values[index - 1] === flag ? value : argument);
        assert.notEqual(f.raw(...args).status, 0);
        await assert.rejects(access(f.target), { code: 'ENOENT' });
      });
    }
  }

  for (const missing of ['--playwright-cli', '--browser', '--open-design-cli']) {
    for (const mode of [[], ['--dry-run'], ['--update']]) {
      for (const existing of [false, true]) {
        test(`${route} rejects missing ${missing} in ${mode[0] || 'fresh'} mode with ${existing ? 'existing' : 'absent'} target unchanged`, async t => {
          const f = await fixture(t, route);
          if (existing) f.success(f.run());
          const before = existing ? await snapshot(f.target) : null;
          const args = f.requiredArgs.filter((value, index, values) => value !== missing && values[index - 1] !== missing);
          assert.notEqual(f.raw(...args, ...mode).status, 0);
          if (existing) {
            assert.deepEqual(await snapshot(f.target), before);
          } else {
            await assert.rejects(access(f.target), { code: 'ENOENT' });
          }
        });
      }
    }
  }

  test(`${route} installs and updates all MCP servers`, async t => {
    const f = await fixture(t, route);
    f.success(f.run());
    const mcp = JSON.parse(await readFile(join(f.target, 'mcp_config.json'), 'utf8'));
    assert.deepEqual(Object.keys(mcp.mcpServers).sort(), ['codegraph', 'filesystem', 'lsp', 'open-design', 'playwright']);
    assert.equal(mcp.mcpServers.playwright.command, process.execPath);
    assert.equal(mcp.mcpServers.playwright.args[0], f.cli);
    assert.equal(mcp.mcpServers.playwright.args[mcp.mcpServers.playwright.args.indexOf('--executable-path') + 1], process.execPath);
    assert.equal(mcp.mcpServers.playwright.args.at(-1), join(f.target, 'cache', 'playwright-mcp'));
    assert.deepEqual(mcp.mcpServers['open-design'].args, [f.cli, 'mcp']);
    assert.equal(mcp.mcpServers.filesystem.args.at(-1), process.cwd());
    assert(!('cwd' in mcp.mcpServers.playwright));
    assert(!('cwd' in mcp.mcpServers['open-design']));

    const dir1 = join(f.root, 'dir1');
    const dir2 = join(f.root, 'dir2');
    await mkdir(dir1);
    await mkdir(dir2);
    f.success(f.run('--update', '--workspace-dir', dir1));
    const singleMcp = JSON.parse(await readFile(join(f.target, 'mcp_config.json'), 'utf8'));
    assert.equal(singleMcp.mcpServers.filesystem.args.at(-1), dir1);
    f.success(f.run('--update', '--workspace-dir', `${dir1},${dir2}`));
    const multiMcp = JSON.parse(await readFile(join(f.target, 'mcp_config.json'), 'utf8'));
    assert.deepEqual(multiMcp.mcpServers.filesystem.args.slice(-2), [dir1, dir2]);
    assert.equal((await stat(join(f.target, 'mcp_config.json'))).mode & 0o777, 0o600);
    const manifest = JSON.parse(await readFile(join(f.target, '.kitshift-manifest.json'), 'utf8'));
    assert(manifest.files['mcp_config.json']);
  });

  test(`${route} protects local MCP edits before any update writes`, async t => {
    const f = await fixture(t, route);
    f.success(f.run());
    await writeFile(join(f.target, 'mcp_config.json'), '{"local":true}\n');
    await writeFile(join(f.repo, 'skills/example/SKILL.md'), 'Upstream change\n');
    const before = await snapshot(f.target);
    assert.notEqual(f.run('--update').status, 0);
    assert.deepEqual(await snapshot(f.target), before);
  });

  test(`${route} update adds MCP to an older managed bundle without MCP`, async t => {
    const f = await fixture(t, route);
    f.success(f.run());
    const manifestPath = join(f.target, '.kitshift-manifest.json');
    const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
    delete manifest.files['mcp_config.json'];
    await rm(join(f.target, 'mcp_config.json'));
    await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
    f.success(f.run('--update'));
    const mcp = JSON.parse(await readFile(join(f.target, 'mcp_config.json'), 'utf8'));
    assert.equal(Object.keys(mcp.mcpServers).length, 5);
    const updatedManifest = JSON.parse(await readFile(manifestPath, 'utf8'));
    assert(updatedManifest.files['mcp_config.json']);
  });
}

test('dry run leaves a missing target absent', async t => {
  const f = await fixture(t);
  f.success(f.run('--dry-run'));
  await assert.rejects(access(f.target), { code: 'ENOENT' });
});

test('fresh install creates plugin structure with mandatory MCP', async t => {
  const f = await fixture(t);
  f.success(f.run());

  const pluginStat = await stat(join(f.target, 'plugin.json'));
  assert.equal(pluginStat.mode & 0o777, 0o644);
  const plugin = JSON.parse(await readFile(join(f.target, 'plugin.json'), 'utf8'));
  assert.equal(plugin.name, 'kitshift');

  const ruleStat = await stat(join(f.target, 'rules/AGENTS.md'));
  assert.equal(ruleStat.mode & 0o777, 0o644);

  assert(await readFile(join(f.target, 'skills/example/SKILL.md'), 'utf8'));
  assert(await readFile(join(f.target, 'agents/kitshift-reviewer.md'), 'utf8'));
  assert(await readFile(join(f.target, 'agents/kitshift-investigator.md'), 'utf8'));

  const manifestStat = await stat(join(f.target, '.kitshift-manifest.json'));
  assert.equal(manifestStat.mode & 0o777, 0o600);

  assert.equal((await stat(join(f.target, 'mcp_config.json'))).mode & 0o777, 0o600);
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
  assert.equal(await readFile(join(f.target, 'skills/example/SKILL.md'), 'utf8'), '---\nname: example\ndescription: Updated\n---\nNew\n');

  await writeFile(join(f.target, 'rules/AGENTS.md'), '# Local edit\n');
  await writeFile(join(f.repo, 'skills/example/SKILL.md'), '---\nname: example\ndescription: Updated2\n---\nNew2\n');
  assert.notEqual(f.run('--update').status, 0);
  assert.equal(await readFile(join(f.target, 'rules/AGENTS.md'), 'utf8'), '# Local edit\n');
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
