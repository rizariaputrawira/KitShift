import test from 'node:test';
import assert from 'node:assert/strict';
import { chmod, copyFile, mkdir, mkdtemp, readFile, readdir, rename, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';

const scripts = fileURLToPath(new URL('../scripts/', import.meta.url));

function git(cwd, ...args) {
  const result = spawnSync('git', args, { cwd, encoding: 'utf8' });
  assert.equal(result.status, 0, `${args.join(' ')}: ${result.stderr || result.error?.message}`);
  return result.stdout.trim();
}

function ok(result) {
  assert.equal(result.status, 0, result.stderr || result.error?.message || result.stdout);
  return result;
}

function json(result) {
  return JSON.parse(ok(result).stdout);
}

async function waitFor(predicate, description, timeout = 8000) {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    const value = await predicate();
    if (value) return value;
    await delay(25);
  }
  assert.fail(`Timed out waiting for ${description}`);
}

async function exists(filename) {
  try { await stat(filename); return true; } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
}

async function alive(pid) {
  try { process.kill(pid, 0); } catch (error) {
    if (error.code === 'ESRCH') return false;
    throw error;
  }
  // A killed orphan can briefly remain a zombie before its new parent reaps it.
  try {
    const record = await readFile(`/proc/${pid}/stat`, 'utf8');
    return !/^[ZX]$/.test(record.slice(record.lastIndexOf(')') + 2).split(' ')[0]);
  } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
}

function killTree(pid) {
  try { process.kill(-pid, 'SIGKILL'); } catch (error) {
    if (error.code !== 'ESRCH') throw error;
  }
  try { process.kill(pid, 'SIGKILL'); } catch (error) {
    if (error.code !== 'ESRCH') throw error;
  }
}

async function fixture(t, { register = true } = {}) {
  const root = await mkdtemp(path.join(tmpdir(), 'kitshift-safety-'));
  const processes = new Set();
  const pidFiles = new Set();
  t.after(async () => {
    for (const filename of pidFiles) {
      try {
        const pid = Number(await readFile(filename, 'utf8'));
        if (Number.isInteger(pid) && pid > 1) processes.add(pid);
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
      }
    }
    for (const pid of processes) killTree(pid);
    await waitFor(async () => !(await Promise.all([...processes].map(alive))).some(Boolean), 'fixture process cleanup', 3000);
    await rm(root, { recursive: true, force: true });
  });
  const seed = path.join(root, 'seed');
  const repo = path.join(root, 'checkout');
  const remote = path.join(root, 'remote.git');
  const store = path.join(root, 'store');
  const target = path.join(root, 'target');
  const entry = path.join(root, 'entry.mjs');
  await mkdir(path.join(seed, 'scripts'), { recursive: true });
  for (const filename of ['kitshift.mjs', 'update-common.mjs', 'install-common.mjs']) {
    await copyFile(path.join(scripts, filename), path.join(seed, 'scripts', filename));
  }
  git(root, 'init', '--bare', '--initial-branch=main', '-q', remote);
  git(seed, 'init', '--initial-branch=main', '-q');
  git(seed, 'config', 'user.name', 'Fixture');
  git(seed, 'config', 'user.email', 'fixture@example.invalid');
  git(seed, 'add', '.');
  git(seed, 'commit', '-qm', 'Initial fixture');
  const revision = git(seed, 'rev-parse', 'HEAD');
  git(seed, 'remote', 'add', 'origin', remote);
  git(seed, 'push', '-qu', 'origin', 'main');
  git(root, 'clone', '-q', remote, repo);
  const cli = path.join(repo, 'scripts', 'kitshift.mjs');
  await mkdir(target);
  await writeFile(path.join(target, '.kitshift-manifest.json'), JSON.stringify({
    version: 1, files: {}, source: { repository: repo, revision, node: process.execPath },
  }));
  await writeFile(entry, '');
  const env = { ...process.env, KITSHIFT_HOME: store, GIT_TERMINAL_PROMPT: '0', GCM_INTERACTIVE: 'Never' };
  const runWith = (overrides, ...args) => spawnSync(process.execPath, [cli, ...args], {
    cwd: root, encoding: 'utf8', env: { ...env, ...overrides }, timeout: 20000,
  });
  const run = (...args) => runWith({}, ...args);
  const addArgs = (name = 'example', managedTarget = target) => ['profile', 'add', name, '--harness', 'omp',
    '--target', managedTarget, '--executable', process.execPath, '--playwright-cli', entry,
    '--browser', process.execPath, '--open-design-cli', entry];
  if (register) ok(run(...addArgs()));
  return { root, seed, repo, remote, store, target, revision, cli, env, run, runWith, addArgs, processes, pidFiles };
}

function assertUnknown(response, checkedAt = null) {
  assert.equal(response.check.stale, true);
  assert.equal(response.check.checkedAt, checkedAt);
  assert.equal(response.profiles.length, 1);
  assert.equal(response.profiles[0].status, 'unknown');
  assert.equal(response.profiles[0].candidateRevision, null);
  assert.equal(response.profiles[0].origin, null);
  assert.equal(response.profiles[0].message, null);
}

async function fakeGit(f, mode) {
  const bin = path.join(f.root, `fake-${mode}`);
  await mkdir(bin);
  const gitPid = path.join(bin, 'git.pid');
  const descendantPid = path.join(bin, 'descendant.pid');
  f.pidFiles.add(gitPid);
  f.pidFiles.add(descendantPid);
  const probe = spawnSync('which', ['git'], { encoding: 'utf8' });
  const realGit = ok(probe).stdout.trim();
  const descendant = `
    const fs = require('node:fs');
    for (const signal of ['SIGINT', 'SIGHUP', 'SIGTERM']) process.on(signal, () => {});
    fs.writeFileSync(${JSON.stringify(descendantPid)}, String(process.pid));
    setInterval(() => {}, 1000);
  `;
  await writeFile(path.join(bin, 'git'), `#!${process.execPath}
const fs = require('node:fs');
const { spawn, spawnSync } = require('node:child_process');
if (!process.argv.slice(2).includes('fetch')) {
  const result = spawnSync(${JSON.stringify(realGit)}, process.argv.slice(2), { stdio: 'inherit' });
  process.exit(result.status ?? 1);
}
if (${JSON.stringify(mode)} === 'offline') {
  process.stderr.write('fixture remote unavailable\\n');
  process.exit(128);
}
for (const signal of ['SIGINT', 'SIGHUP', 'SIGTERM']) process.on(signal, () => {});
spawn(process.execPath, ['-e', ${JSON.stringify(descendant)}], { stdio: 'ignore' });
fs.writeFileSync(${JSON.stringify(gitPid)}, String(process.pid));
setInterval(() => {}, 1000);
`, { mode: 0o755 });
  const env = { PATH: `${bin}${path.delimiter}${process.env.PATH ?? ''}` };
  return {
    env,
    async pids() {
      await waitFor(async () => await exists(gitPid) && await exists(descendantPid), 'hung Git and descendant PID markers');
      const pids = await Promise.all([gitPid, descendantPid].map(async filename => Number(await readFile(filename, 'utf8'))));
      for (const pid of pids) {
        assert.ok(Number.isInteger(pid) && pid > 1);
        f.processes.add(pid);
        assert.equal(await alive(pid), true, `fixture process ${pid} must be alive before cancellation`);
      }
      return pids;
    },
  };
}

function start(f, overrides, ...args) {
  const child = spawn(process.execPath, [f.cli, ...args], {
    cwd: f.root, env: { ...f.env, ...overrides }, detached: true, stdio: ['ignore', 'pipe', 'pipe'],
  });
  assert.ok(child.pid, 'CLI subprocess must start');
  f.processes.add(child.pid);
  let stdout = '';
  let stderr = '';
  let result;
  child.stdout.on('data', chunk => { stdout += chunk; });
  child.stderr.on('data', chunk => { stderr += chunk; });
  child.on('error', error => { result = { error, stdout, stderr }; });
  child.on('close', (code, signal) => {
    f.processes.delete(child.pid);
    result = { code, signal, stdout, stderr };
  });
  return {
    child,
    finished: (timeout = 8000) => waitFor(() => result, 'CLI subprocess exit', timeout),
  };
}

for (const signal of ['SIGINT', 'SIGHUP']) {
  test(`foreground check ${signal} kills hung Git and its descendant before releasing the check lock`, { timeout: 30000 }, async t => {
    const f = await fixture(t);
    const fake = await fakeGit(f, 'hung');
    const checker = start(f, fake.env, 'update', 'example', '--check');
    const pids = await fake.pids();
    process.kill(-checker.child.pid, signal);
    const result = await checker.finished();
    assert.notEqual(result.code, 0, `${signal} must interrupt the foreground check: ${result.stdout}\n${result.stderr}`);
    for (const pid of pids) {
      assert.equal(await alive(pid), false, `${signal} left owned process ${pid} alive after checker exit`);
    }
    const refreshed = json(f.run('_check', '--json'));
    assert.equal(refreshed.check.outcome, 'ok', 'the interrupted check must release its lock');
    assert.equal(refreshed.profiles[0].status, 'current');
  });
}

test('fetch timeout kills hung Git descendants and leaves the check lock reusable', { timeout: 35000 }, async t => {
  const f = await fixture(t);
  const fake = await fakeGit(f, 'hung');
  const checker = start(f, fake.env, '_check', '--json');
  const pids = await fake.pids();
  const result = await checker.finished(20000);
  assert.equal(result.code, 0, result.stderr);
  const response = JSON.parse(result.stdout);
  assert.equal(response.check.outcome, 'timeout');
  assertUnknown(response);
  for (const pid of pids) {
    assert.equal(await alive(pid), false, `timeout left owned process ${pid} alive after checker exit`);
  }
  assert.equal(json(f.run('_check', '--json')).check.outcome, 'ok');
});

test('changing the effective URL of the same origin invalidates cached candidates until a fresh success', async t => {
  const f = await fixture(t);
  await writeFile(path.join(f.seed, 'new-revision'), 'upstream change\n');
  git(f.seed, 'add', '.');
  git(f.seed, 'commit', '-qm', 'Upstream fixture change');
  const upstream = git(f.seed, 'rev-parse', 'HEAD');
  git(f.seed, 'push', '-q');
  const initial = json(f.run('_check', '--json'));
  assert.equal(initial.check.outcome, 'ok');
  assert.equal(initial.profiles[0].status, 'update-available');
  assert.equal(initial.profiles[0].candidateRevision, upstream);

  const replacement = path.join(f.root, 'replacement.git');
  git(f.root, 'init', '--bare', '--initial-branch=main', '-q', replacement);
  git(f.repo, 'push', '-q', replacement, 'HEAD:refs/heads/main');
  git(f.repo, 'remote', 'set-url', 'origin', replacement);
  const status = () => json(f.run('_status', '--target', f.target, '--json'));
  const changed = status();
  assert.equal(changed.check.outcome, 'unknown');
  assertUnknown(changed);

  const offline = await fakeGit(f, 'offline');
  const failed = json(f.runWith(offline.env, '_check', '--json'));
  assert.equal(failed.check.outcome, 'offline');
  assertUnknown(failed);
  assertUnknown(status());
  const refreshed = json(f.run('_check', '--json'));
  assert.equal(refreshed.check.outcome, 'ok');
  assert.equal(refreshed.profiles[0].status, 'current');
  assert.equal(refreshed.profiles[0].candidateRevision, f.revision);

  // URL rewriting changes the effective destination without changing origin's configured value.
  git(f.repo, 'config', `url.${f.remote}.insteadOf`, replacement);
  assert.equal(git(f.repo, 'remote', 'get-url', 'origin'), f.remote);
  const rewritten = status();
  assert.equal(rewritten.check.outcome, 'unknown');
  assertUnknown(rewritten);
  const rewrittenFresh = json(f.run('_check', '--json'));
  assert.equal(rewrittenFresh.check.outcome, 'ok');
  assert.equal(rewrittenFresh.profiles[0].candidateRevision, upstream);
  const cache = await readFile(path.join(f.store, 'status.json'), 'utf8');
  assert.equal(cache.includes(f.remote), false, 'cache must not persist the raw remote URL');
  assert.equal(cache.includes(replacement), false, 'cache must not persist an earlier raw remote URL');
});

test('an existing world-writable state store is refused without creating files or changing its mode', async t => {
  const f = await fixture(t, { register: false });
  await mkdir(f.store);
  await chmod(f.store, 0o777);
  const result = f.run(...f.addArgs());
  assert.notEqual(result.status, 0, result.stdout);
  assert.deepEqual(await readdir(f.store), []);
  assert.equal((await stat(f.store)).mode & 0o777, 0o777);
});

test('an existing private state store works without tightening arbitrary ancestors', async t => {
  const f = await fixture(t, { register: false });
  const parent = path.join(f.root, 'shared-parent');
  const store = path.join(parent, 'private-state');
  await mkdir(parent);
  await chmod(parent, 0o755);
  await mkdir(store);
  await chmod(store, 0o700);
  ok(f.runWith({ KITSHIFT_HOME: store }, ...f.addArgs()));
  assert.match(ok(f.runWith({ KITSHIFT_HOME: store }, 'profile', 'list')).stdout, /example\s+omp/);
  assert.equal((await stat(store)).mode & 0o777, 0o700);
  assert.equal((await stat(path.join(store, 'profiles.json'))).mode & 0o777, 0o600);
  assert.equal((await stat(parent)).mode & 0o777, 0o755);
});

test('a state store inside the source checkout is rejected before any writes', async t => {
  const f = await fixture(t, { register: false });
  const store = path.join(f.repo, 'private-state');
  const before = git(f.repo, 'status', '--porcelain', '--untracked-files=all');
  const result = f.runWith({ KITSHIFT_HOME: store }, ...f.addArgs());
  assert.notEqual(result.status, 0, result.stdout);
  assert.equal(await exists(store), false);
  assert.equal(git(f.repo, 'status', '--porcelain', '--untracked-files=all'), before);
});

test('a state store inside a managed target is rejected before creating lock or configuration files', async t => {
  const f = await fixture(t, { register: false });
  const store = path.join(f.target, 'private-state');
  const before = await readFile(path.join(f.target, '.kitshift-manifest.json'), 'utf8');
  const result = f.runWith({ KITSHIFT_HOME: store }, ...f.addArgs());
  assert.notEqual(result.status, 0, result.stdout);
  assert.equal(await exists(store), false);
  assert.deepEqual(await readdir(f.target), ['.kitshift-manifest.json']);
  assert.equal(await readFile(path.join(f.target, '.kitshift-manifest.json'), 'utf8'), before);
});

test('registering a target that contains an existing store is rejected without changing the store', async t => {
  const f = await fixture(t, { register: false });
  const enclosing = path.join(f.root, 'enclosing-target');
  const store = path.join(enclosing, 'private-state');
  await mkdir(enclosing);
  ok(f.runWith({ KITSHIFT_HOME: store }, ...f.addArgs()));
  await writeFile(path.join(enclosing, '.kitshift-manifest.json'), '{"version":1,"files":{}}\n');
  const config = await readFile(path.join(store, 'profiles.json'), 'utf8');
  const files = await readdir(store);
  const result = f.runWith({ KITSHIFT_HOME: store }, ...f.addArgs('enclosing', enclosing));
  assert.notEqual(result.status, 0, result.stdout);
  assert.equal(await readFile(path.join(store, 'profiles.json'), 'utf8'), config);
  assert.deepEqual(await readdir(store), files);
  assert.deepEqual(await readdir(enclosing), ['.kitshift-manifest.json', 'private-state']);
});

test('reading a registered store relocated inside its managed target is refused without writes', async t => {
  const f = await fixture(t);
  const store = path.join(f.target, 'private-state');
  await rename(f.store, store);
  const config = await readFile(path.join(store, 'profiles.json'), 'utf8');
  const files = await readdir(store);
  const result = f.runWith({ KITSHIFT_HOME: store }, '_status', '--target', f.target, '--json');
  assert.notEqual(result.status, 0, result.stdout);
  assert.equal(await readFile(path.join(store, 'profiles.json'), 'utf8'), config);
  assert.deepEqual(await readdir(store), files);
});

test('a missing cached upstream commit yields unknown rather than a false divergence', async t => {
  const f = await fixture(t);
  assert.equal(json(f.run('_check', '--json')).check.outcome, 'ok');
  const filename = path.join(f.store, 'status.json');
  const cache = JSON.parse(await readFile(filename, 'utf8'));
  const missing = 'f'.repeat(40);
  const probe = spawnSync('git', ['cat-file', '-e', `${missing}^{commit}`], { cwd: f.repo, encoding: 'utf8' });
  assert.notEqual(probe.status, 0, 'the cached commit must genuinely be absent from the checkout');
  cache.success.revision = missing;
  await writeFile(filename, `${JSON.stringify(cache)}\n`);
  const response = json(f.run('_status', '--target', f.target, '--json'));
  assert.equal(response.check.outcome, 'unknown');
  assertUnknown(response, cache.success.checkedAt);
});

test('a cache without upstream identity is ignored instead of reusing its candidate', async t => {
  const f = await fixture(t);
  assert.equal(json(f.run('_check', '--json')).check.outcome, 'ok');
  const filename = path.join(f.store, 'status.json');
  const cache = JSON.parse(await readFile(filename, 'utf8'));
  assert.equal(typeof cache.success.upstreamIdentity, 'string');
  delete cache.success.upstreamIdentity;
  await writeFile(filename, `${JSON.stringify(cache)}\n`);
  const response = json(f.run('_status', '--target', f.target, '--json'));
  assert.equal(response.check.outcome, 'unknown');
  assertUnknown(response);
});
