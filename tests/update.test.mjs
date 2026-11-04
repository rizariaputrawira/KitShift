import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { shellQuote } from '../scripts/install-common.mjs';

const cli = fileURLToPath(new URL('../scripts/kitshift.mjs', import.meta.url));

test('POSIX shell quoting preserves apostrophes and spaces', () => {
  const value = "fixture path's value";
  const result = spawnSync('sh', ['-c', `printf %s ${shellQuote(value)}`], { encoding: 'utf8' });
  assert.equal(result.status, 0);
  assert.equal(result.stdout, value);
});

test('profile registration, editing, launcher protection and removal', async t => {
  const root = await mkdtemp(path.join(tmpdir(), 'kitshift-profiles-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const store = path.join(root, 'store');
  const target = path.join(root, 'target');
  const entry = path.join(root, 'entry.mjs');
  await mkdir(target);
  await writeFile(path.join(target, '.kitshift-manifest.json'), '{"version":1,"files":{}}\n');
  await writeFile(entry, '');
  const run = (...args) => spawnSync(process.execPath, [cli, ...args], { encoding: 'utf8', env: { ...process.env, KITSHIFT_HOME: store } });
  const ok = result => assert.equal(result.status, 0, result.stderr);
  ok(run('profile', 'add', 'personal', '--harness', 'omp', '--target', target, '--executable', process.execPath,
    '--playwright-cli', entry, '--browser', process.execPath, '--open-design-cli', entry));
  assert.match(run('profile', 'list').stdout, /personal\s+omp.*checks enabled/);
  const configPath = path.join(store, 'profiles.json');
  const before = await readFile(configPath, 'utf8');
  assert.notEqual(run('profile', 'add', 'personal', '--harness', 'omp').status, 0);
  assert.equal(await readFile(configPath, 'utf8'), before);
  ok(run('profile', 'edit', 'personal', '--checks', 'off'));
  assert.match(run('profile', 'list').stdout, /checks disabled/);
  const bin = path.join(root, 'bin');
  ok(run('setup', '--bin-dir', bin));
  assert.equal((await stat(configPath)).mode & 0o777, 0o600);
  assert.equal((await stat(path.join(bin, 'kitshift'))).mode & 0o777, 0o755);
  await writeFile(path.join(bin, 'kitshift'), 'unrelated');
  assert.notEqual(run('setup', '--bin-dir', bin).status, 0);
  assert.equal(await readFile(path.join(bin, 'kitshift'), 'utf8'), 'unrelated');
  ok(run('profile', 'remove', 'personal'));
  assert.equal(await readFile(path.join(target, '.kitshift-manifest.json'), 'utf8'), '{"version":1,"files":{}}\n');
});

test('upstream checks compare installed revision without changing checkout or target', async t => {
  const root = await mkdtemp(path.join(tmpdir(), 'kitshift-check-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const repo = path.join(root, 'repo');
  const remote = path.join(root, 'remote.git');
  const other = path.join(root, 'other');
  const target = path.join(root, 'target');
  const store = path.join(root, 'store');
  await mkdir(path.join(repo, 'scripts'), { recursive: true });
  const source = path.dirname(cli);
  const { copyFile } = await import('node:fs/promises');
  for (const file of ['kitshift.mjs', 'update-common.mjs', 'install-common.mjs']) await copyFile(path.join(source, file), path.join(repo, 'scripts', file));
  const git = (cwd, ...args) => {
    const result = spawnSync('git', args, { cwd, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    return result.stdout.trim();
  };
  git(root, 'init', '--bare', '-q', remote);
  git(repo, 'init', '-q');
  git(repo, 'config', 'user.name', 'Fixture');
  git(repo, 'config', 'user.email', 'fixture@example.invalid');
  git(repo, 'add', '.');
  git(repo, 'commit', '-qm', 'A');
  const a = git(repo, 'rev-parse', 'HEAD');
  git(repo, 'remote', 'add', 'origin', remote);
  git(repo, 'push', '-qu', 'origin', 'HEAD');
  git(root, 'clone', '-q', remote, other);
  git(other, 'config', 'user.name', 'Fixture');
  git(other, 'config', 'user.email', 'fixture@example.invalid');
  await writeFile(path.join(other, 'change'), 'B');
  git(other, 'add', '.');
  git(other, 'commit', '-qm', 'B');
  const b = git(other, 'rev-parse', 'HEAD');
  git(other, 'push', '-q');
  await mkdir(target);
  const manifest = JSON.stringify({ version: 1, files: {}, source: { repository: repo, revision: a, node: process.execPath } });
  await writeFile(path.join(target, '.kitshift-manifest.json'), manifest);
  const entry = path.join(root, 'entry.mjs');
  await writeFile(entry, '');
  const run = (...args) => spawnSync(process.execPath, [path.join(repo, 'scripts', 'kitshift.mjs'), ...args], {
    cwd: root, env: { ...process.env, KITSHIFT_HOME: store }, encoding: 'utf8',
  });
  let result = run('profile', 'add', 'example', '--harness', 'omp', '--target', target, '--executable', process.execPath,
    '--playwright-cli', entry, '--browser', process.execPath, '--open-design-cli', entry);
  assert.equal(result.status, 0, result.stderr);
  result = run('_check', '--json');
  assert.equal(result.status, 0, result.stderr);
  const response = JSON.parse(result.stdout);
  assert.equal(response.check.outcome, 'ok');
  assert.equal(response.profiles[0].status, 'update-available');
  assert.equal(response.profiles[0].candidateRevision, b);
  assert.equal(git(repo, 'rev-parse', 'HEAD'), a);
  assert.equal(await readFile(path.join(target, '.kitshift-manifest.json'), 'utf8'), manifest);
  const fakeBin = path.join(root, 'fake-bin');
  await mkdir(fakeBin);
  const realGit = spawnSync('which', ['git'], { encoding: 'utf8' }).stdout.trim();
  await writeFile(path.join(fakeBin, 'git'), `#!/bin/sh\ncase " $* " in *" fetch "*) sleep 60 & wait ;; *) exec '${realGit}' "$@" ;; esac\n`, { mode: 0o755 });
  const timed = spawnSync(process.execPath, [path.join(repo, 'scripts', 'kitshift.mjs'), '_check', '--json'], {
    cwd: root, env: { ...process.env, KITSHIFT_HOME: store, PATH: `${fakeBin}:${process.env.PATH}` }, encoding: 'utf8', timeout: 15000,
  });
  assert.equal(timed.status, 0, timed.stderr);
  assert.equal(JSON.parse(timed.stdout).check.outcome, 'timeout');
  assert.equal(JSON.parse(timed.stdout).check.stale, true);
  assert.equal(JSON.parse(run('_check', '--json').stdout).check.outcome, 'ok');
});

test('all-target update preflights and applies both harnesses while preserving agy roots', async t => {
  const root = await mkdtemp(path.join(tmpdir(), 'kitshift-apply-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const repo = path.join(root, 'repo');
  const remote = path.join(root, 'remote.git');
  const other = path.join(root, 'other');
  const target = path.join(root, 'target');
  const agyTarget = path.join(root, 'agy-target');
  const roots = [path.join(root, 'one'), path.join(root, 'two')];
  const store = path.join(root, 'store');
  const source = path.dirname(path.dirname(cli));
  const { cp } = await import('node:fs/promises');
  for (const dir of ['scripts', 'mcp', 'guidance', 'harnesses/omp/agents', 'harnesses/omp/extensions', 'harnesses/agy/agents', 'skills/example']) await mkdir(path.join(repo, dir), { recursive: true });
  for (const file of ['install-common.mjs', 'install-omp.mjs', 'install-agy.mjs', 'kitshift.mjs', 'update-common.mjs']) await cp(path.join(source, 'scripts', file), path.join(repo, 'scripts', file));
  for (const file of ['LICENSE', 'NOTICE', 'mcp/omp.json', 'mcp/agy.json', 'harnesses/omp/config.yml']) await cp(path.join(source, file), path.join(repo, file));
  await cp(path.join(source, 'harnesses/omp/extensions/kitshift-update.js'), path.join(repo, 'harnesses/omp/extensions/kitshift-update.js'));
  await writeFile(path.join(repo, 'guidance/APPEND_SYSTEM.md'), 'fixture guidance\n');
  await writeFile(path.join(repo, 'skills/example/SKILL.md'), 'revision A\n');
  const git = (cwd, ...args) => {
    const result = spawnSync('git', args, { cwd, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    return result.stdout.trim();
  };
  git(root, 'init', '--bare', '-q', remote);
  git(repo, 'init', '-q');
  git(repo, 'config', 'user.name', 'Fixture');
  git(repo, 'config', 'user.email', 'fixture@example.invalid');
  git(repo, 'add', '.');
  git(repo, 'commit', '-qm', 'A');
  git(repo, 'remote', 'add', 'origin', remote);
  git(repo, 'push', '-qu', 'origin', 'HEAD');
  const entry = path.join(root, 'entry.mjs');
  await writeFile(entry, '');
  for (const workspace of roots) await mkdir(workspace);
  const run = (script, ...args) => spawnSync(process.execPath, [path.join(repo, 'scripts', script), ...args], {
    cwd: root, env: { ...process.env, KITSHIFT_HOME: store }, encoding: 'utf8',
  });
  const options = ['--target', target, '--playwright-cli', entry, '--browser', process.execPath, '--open-design-cli', entry];
  let result = run('install-omp.mjs', ...options);
  assert.equal(result.status, 0, result.stderr);
  result = run('kitshift.mjs', 'profile', 'add', 'example', '--harness', 'omp', '--executable', process.execPath, ...options);
  assert.equal(result.status, 0, result.stderr);
  const agyOptions = ['--target', agyTarget, '--playwright-cli', entry, '--browser', process.execPath, '--open-design-cli', entry, '--workspace-dir', roots.join(',')];
  result = run('install-agy.mjs', ...agyOptions);
  assert.equal(result.status, 0, result.stderr);
  result = run('kitshift.mjs', 'profile', 'add', 'agy', '--harness', 'agy', '--executable', process.execPath, ...agyOptions);
  assert.equal(result.status, 0, result.stderr);
  git(root, 'clone', '-q', remote, other);
  git(other, 'config', 'user.name', 'Fixture');
  git(other, 'config', 'user.email', 'fixture@example.invalid');
  await writeFile(path.join(other, 'skills/example/SKILL.md'), 'revision B\n');
  git(other, 'add', '.');
  git(other, 'commit', '-qm', 'B');
  const b = git(other, 'rev-parse', 'HEAD');
  git(other, 'push', '-q');
  result = run('kitshift.mjs', 'update', '--all', '--yes');
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  assert.equal(git(repo, 'rev-parse', 'HEAD'), b);
  assert.equal(await readFile(path.join(target, 'skills/example/SKILL.md'), 'utf8'), 'revision B\n');
  assert.equal(JSON.parse(await readFile(path.join(target, '.kitshift-manifest.json'), 'utf8')).source.revision, b);
  assert.equal(await readFile(path.join(agyTarget, 'skills/example/SKILL.md'), 'utf8'), 'revision B\n');
  assert.equal(JSON.parse(await readFile(path.join(agyTarget, '.kitshift-manifest.json'), 'utf8')).source.revision, b);
  assert.deepEqual(JSON.parse(await readFile(path.join(agyTarget, 'mcp_config.json'), 'utf8')).mcpServers.filesystem.args.slice(-2), roots);
  await writeFile(path.join(other, 'skills/example/SKILL.md'), 'revision C\n');
  git(other, 'add', '.');
  git(other, 'commit', '-qm', 'C');
  const c = git(other, 'rev-parse', 'HEAD');
  git(other, 'push', '-q');
  await writeFile(path.join(target, 'skills/example/SKILL.md'), 'local edit\n');
  const before = await readFile(path.join(target, '.kitshift-manifest.json'), 'utf8');
  result = run('kitshift.mjs', 'update', '--all', '--yes');
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Preflight failed/);
  assert.equal(git(repo, 'rev-parse', 'HEAD'), c);
  assert.equal(await readFile(path.join(target, 'skills/example/SKILL.md'), 'utf8'), 'local edit\n');
  assert.equal(await readFile(path.join(target, '.kitshift-manifest.json'), 'utf8'), before);
  assert.equal(await readFile(path.join(agyTarget, 'skills/example/SKILL.md'), 'utf8'), 'revision B\n');
  assert.equal(JSON.parse(await readFile(path.join(agyTarget, '.kitshift-manifest.json'), 'utf8')).source.revision, b);
});

test('run and Bash shortcut forward arguments and fall back with cleared markers', async t => {
  const root = await mkdtemp(path.join(tmpdir(), "kitshift-run-'"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const target = path.join(root, 'target');
  const store = path.join(root, 'store');
  const native = path.join(root, 'native');
  const entry = path.join(root, 'entry');
  await mkdir(target);
  await writeFile(path.join(target, '.kitshift-manifest.json'), '{"version":1,"files":{}}');
  await writeFile(entry, '');
  await writeFile(native, '#!/bin/sh\nprintf "arg=<%s> marker=<%s>\\n" "$1" "${KITSHIFT_LAUNCH_PROFILE-unset}"\nexit 7\n', { mode: 0o755 });
  const env = { ...process.env, KITSHIFT_HOME: store, KITSHIFT_LAUNCH_PROFILE: 'inherited' };
  const run = (...args) => spawnSync(process.execPath, [cli, ...args], { env, encoding: 'utf8' });
  let result = run('profile', 'add', 'local', '--harness', 'omp', '--target', target, '--executable', native,
    '--playwright-cli', entry, '--browser', native, '--open-design-cli', entry);
  assert.equal(result.status, 0, result.stderr);
  result = run('shell-init', '--shell', 'bash', '--omp', 'local');
  assert.equal(result.status, 0, result.stderr);
  const snippet = result.stdout;
  result = spawnSync('bash', ['-c', `${snippet}\nomp "$1"`, 'fixture', "space and ' quote"], { env, encoding: 'utf8' });
  assert.equal(result.status, 7, result.stderr);
  assert.equal(result.stdout, "arg=<space and ' quote> marker=<unset>\n");
  const withoutZsh = { ...env, PATH: root };
  result = spawnSync(process.execPath, [cli, 'shell-init', '--shell', 'zsh', '--omp', 'local'], { env: withoutZsh, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  const zshSnippet = result.stdout;
  result = spawnSync('/bin/bash', ['-c', `${snippet}\nomp "$1"`, 'fixture', 'no-zsh'], { env: withoutZsh, encoding: 'utf8' });
  assert.equal(result.status, 7, result.stderr);
  assert.equal(result.stdout, 'arg=<no-zsh> marker=<unset>\n');
  const probe = spawnSync('zsh', ['--version'], { encoding: 'utf8' });
  await t.test('Zsh shortcut when installed', { skip: probe.error?.code === 'ENOENT' ? 'Zsh is not installed' : false }, () => {
    assert.equal(probe.status, 0, probe.stderr || probe.error?.message);
    const launched = spawnSync('zsh', ['-f', '-c', `${zshSnippet}\nomp "$1"`, 'fixture', "space and ' quote"], { env, encoding: 'utf8' });
    assert.equal(launched.status, 7, launched.stderr);
    assert.equal(launched.stdout, "arg=<space and ' quote> marker=<unset>\n");
  });
  await rm(path.join(store, 'profiles.json'));
  result = spawnSync('bash', ['-c', `${snippet}\nomp "$1"`, 'fixture', 'fallback'], { env, encoding: 'utf8' });
  assert.equal(result.status, 7, result.stderr);
  assert.equal(result.stdout, 'arg=<fallback> marker=<unset>\n');
});
