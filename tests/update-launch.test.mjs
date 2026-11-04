import test from 'node:test';
import assert from 'node:assert/strict';
import { copyFile, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';
import { shellQuote } from '../scripts/install-common.mjs';

const source = fileURLToPath(new URL('../scripts/', import.meta.url));
const recorderSource = `import fs from 'node:fs';
import { spawn } from 'node:child_process';
const [log, mode, ...args] = process.argv.slice(2);
const record = value => fs.appendFileSync(log, JSON.stringify(value) + '\\n');
for (const signal of ['SIGINT', 'SIGTERM', 'SIGHUP']) {
  process.on(signal, () => {
    record({ signal });
    if (signal !== 'SIGINT') process.exit(37);
  });
}
if (mode === 'tree') spawn(process.execPath, [process.argv[1], args[0], 'signals'], { stdio: 'ignore' });
if (mode === 'raw') process.stdin.setRawMode(true);
record({ ready: true, pid: process.pid, parent: process.ppid, args, cwd: process.cwd(),
  sentinel: process.env.KITSHIFT_TEST_SENTINEL,
  launchProfile: process.env.KITSHIFT_LAUNCH_PROFILE ?? null,
  launchInteractive: process.env.KITSHIFT_LAUNCH_INTERACTIVE ?? null,
  launchNotice: process.env.KITSHIFT_LAUNCH_NOTICE ?? null,
  tty: [process.stdin.isTTY === true, process.stdout.isTTY === true, process.stderr.isTTY === true] });
process.stdout.write('native stdout\\n');
process.stderr.write('native stderr\\n');
if (mode === 'exit') process.exit(37);
process.stdin.on('data', data => {
  record({ input: data.toString('hex') });
  if (mode === 'raw' && data.includes(3)) {
    process.stdin.setRawMode(false);
    process.exit(37);
  }
});
process.stdin.resume();
setInterval(() => {}, 1000);
`;

async function fixture(t) {
  const root = await mkdtemp(path.join(tmpdir(), 'kitshift-launch-'));
  const cleanups = [];
  t.after(async () => {
    try {
      for (const cleanup of cleanups) await cleanup();
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
  const repo = path.join(root, 'repo');
  await mkdir(path.join(repo, 'scripts'), { recursive: true });
  for (const file of ['kitshift.mjs', 'update-common.mjs', 'install-common.mjs']) {
    await copyFile(path.join(source, file), path.join(repo, 'scripts', file));
  }
  const target = path.join(root, 'target');
  await mkdir(target);
  await writeFile(path.join(target, '.kitshift-manifest.json'), '{"version":1,"files":{}}\n');
  const entry = path.join(root, 'mcp-entry.mjs');
  await writeFile(entry, '');
  const recorder = path.join(root, 'recorder.mjs');
  await writeFile(recorder, recorderSource);
  const store = path.join(root, 'store');
  const home = path.join(root, 'home');
  await mkdir(home);
  const env = {
    ...process.env, HOME: home, KITSHIFT_HOME: store, BASH_ENV: '/dev/null', ENV: '/dev/null',
    KITSHIFT_TEST_SENTINEL: 'preserved value', KITSHIFT_LAUNCH_PROFILE: 'stale',
    KITSHIFT_LAUNCH_INTERACTIVE: 'stale', KITSHIFT_LAUNCH_NOTICE: 'stale',
  };
  const cli = path.join(repo, 'scripts', 'kitshift.mjs');
  const run = (...args) => spawnSync(process.execPath, [cli, ...args], { cwd: root, env, encoding: 'utf8', timeout: 10000 });
  const add = () => run('profile', 'add', 'example', '--harness', 'omp', '--target', target,
    '--executable', process.execPath, '--playwright-cli', entry, '--browser', process.execPath, '--open-design-cli', entry);
  return { root, cli, env, recorder, entry, store, run, add, cleanups };
}

async function events(log) {
  try {
    return (await readFile(log, 'utf8')).trim().split('\n').filter(Boolean).map(line => JSON.parse(line));
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function until(predicate, description) {
  const deadline = Date.now() + 7000;
  while (Date.now() < deadline) {
    const result = await predicate();
    if (result) return result;
    await delay(10);
  }
  assert.fail(`Timed out waiting for ${description}`);
}

function kill(pid, signal = 'SIGKILL') {
  try { process.kill(pid, signal); } catch (error) { if (error.code !== 'ESRCH') throw error; }
}

function launch(f, executable, args, log) {
  const child = spawn(executable, args, { cwd: f.root, env: f.env, detached: true, stdio: ['pipe', 'pipe', 'pipe'] });
  let stdout = '';
  let stderr = '';
  let spawnError;
  child.stdout.on('data', data => { stdout += data; });
  child.stderr.on('data', data => { stderr += data; });
  child.on('error', error => { spawnError = error; });
  const closed = new Promise(resolve => child.once('close', (code, signal) => resolve({ code, signal })));
  f.cleanups.push(async () => {
    const ready = (await events(log)).find(event => event.ready);
    if (ready) {
      kill(-ready.pid);
      kill(ready.pid);
      if (ready.parent !== child.pid) kill(ready.parent);
    }
    kill(-child.pid);
    kill(child.pid);
    child.stdin.destroy();
    await closed;
  });
  return {
    child,
    ready: () => until(async () => {
      if (spawnError) throw spawnError;
      return (await events(log)).find(event => event.ready);
    }, 'native readiness'),
    result: async () => {
      const result = await until(async () => {
        if (spawnError) throw spawnError;
        if (child.exitCode === null && child.signalCode === null) return false;
        return await closed;
      }, 'wrapper exit');
      return { ...result, stdout, stderr };
    },
  };
}

for (const group of [false, true]) {
  test(`native launch forwards ${group ? 'process-group' : 'direct wrapper'} SIGINT and subsequent SIGTERM exactly once`, async t => {
    const f = await fixture(t);
    const log = path.join(f.root, 'signals.jsonl');
    const args = [f.cli, 'run', 'example', '--fallback-executable', process.execPath, '--', f.recorder, log, 'signals'];
    const running = launch(f, process.execPath, args, log);
    const ready = await running.ready();
    assert.notEqual(ready.pid, running.child.pid);
    const recipient = group ? -running.child.pid : running.child.pid;
    process.kill(recipient, 'SIGINT');
    await until(async () => (await events(log)).some(event => event.signal === 'SIGINT'), 'native SIGINT');
    process.kill(recipient, 'SIGTERM');
    const result = await running.result();
    assert.equal(result.code, 37, result.stderr);
    assert.equal(result.signal, null);
    assert.deepEqual((await events(log)).filter(event => event.signal).map(event => event.signal), ['SIGINT', 'SIGTERM']);
  });
}

test('forwarded terminal signals reach native subprocesses in the original owned group', async t => {
  const f = await fixture(t);
  const log = path.join(f.root, 'native.jsonl');
  const descendantLog = path.join(f.root, 'descendant.jsonl');
  const args = [f.cli, 'run', 'example', '--fallback-executable', process.execPath, '--',
    f.recorder, log, 'tree', descendantLog];
  const running = launch(f, process.execPath, args, log);
  await running.ready();
  await until(async () => (await events(descendantLog)).find(event => event.ready), 'native subprocess readiness');
  process.kill(-running.child.pid, 'SIGINT');
  for (const filename of [log, descendantLog]) {
    await until(async () => (await events(filename)).some(event => event.signal === 'SIGINT'), 'owned-group SIGINT');
  }
  process.kill(-running.child.pid, 'SIGTERM');
  const result = await running.result();
  assert.equal(result.code, 37, result.stderr);
  for (const filename of [log, descendantLog]) {
    await until(async () => (await events(filename)).some(event => event.signal === 'SIGTERM'), 'owned-group SIGTERM');
    assert.deepEqual((await events(filename)).filter(event => event.signal).map(event => event.signal), ['SIGINT', 'SIGTERM']);
  }
});

test('native launch preserves argv, cwd, environment, streams and nonzero exit status', async t => {
  const f = await fixture(t);
  const log = path.join(f.root, 'exit.jsonl');
  const args = ['argument with spaces', "apostrophe's value", '--native-option'];
  const result = f.run('run', 'example', '--fallback-executable', process.execPath, '--', f.recorder, log, 'exit', ...args);
  assert.equal(result.status, 37, result.stderr);
  assert.equal(result.stdout, 'native stdout\n');
  assert.equal(result.stderr, 'native stderr\n');
  const [ready] = await events(log);
  assert.deepEqual(ready.args, args);
  assert.equal(ready.cwd, f.root);
  assert.equal(ready.sentinel, 'preserved value');
  assert.equal(ready.launchProfile, null);
  assert.equal(ready.launchInteractive, null);
  assert.equal(ready.launchNotice, null);
});

test('native launch preserves signal exit and exits cleanly on spawn errors', async t => {
  const f = await fixture(t);
  const signaled = f.run('run', 'example', '--fallback-executable', process.execPath, '--', '-e', "process.kill(process.pid, 'SIGTERM')");
  assert.equal(signaled.status, null);
  assert.equal(signaled.signal, 'SIGTERM');
  const inaccessible = path.join(f.root, 'not-executable');
  await writeFile(inaccessible, '#!/bin/sh\nexit 0\n', { mode: 0o600 });
  const failed = f.run('run', 'example', '--fallback-executable', inaccessible, '--');
  assert.equal(failed.status, 1, failed.stderr);
  assert.match(failed.stderr, /native launch failed:.*EACCES/);
  assert.equal(failed.error, undefined);
});

for (const raw of [false, true]) {
  test(`native launch preserves ${raw ? 'raw PTY input' : 'terminal-generated SIGINT without duplicates'}`, async t => {
    const f = await fixture(t);
    const availability = spawnSync('script', ['--version'], { encoding: 'utf8' });
    if (availability.error?.code === 'ENOENT') { t.skip('util-linux script is unavailable'); return; }
    assert.equal(availability.status, 0, availability.stderr);
    const log = path.join(f.root, 'pty.jsonl');
    const command = [process.execPath, f.cli, 'run', 'example', '--fallback-executable', process.execPath, '--',
      f.recorder, log, raw ? 'raw' : 'signals'].map(shellQuote).join(' ');
    const running = launch(f, 'script', ['-qefc', `exec ${command}`, '/dev/null'], log);
    const ready = await running.ready();
    assert.deepEqual(ready.tty, [true, true, true]);
    if (raw) {
      const input = '\u001b[Ahello\r\u0003';
      running.child.stdin.write(input);
      const result = await running.result();
      assert.equal(result.code, 37, result.stderr);
      assert.match(result.stdout, /native stdout/);
      assert.match(result.stdout, /native stderr/);
      assert.equal((await events(log)).filter(event => event.input).map(event => event.input).join(''), Buffer.from(input).toString('hex'));
      assert.deepEqual((await events(log)).filter(event => event.signal), []);
    } else {
      running.child.stdin.write('\u0003');
      await until(async () => (await events(log)).some(event => event.signal === 'SIGINT'), 'terminal SIGINT');
      process.kill(ready.parent, 'SIGTERM');
      const result = await running.result();
      assert.equal(result.code, 37, result.stderr);
      assert.deepEqual((await events(log)).filter(event => event.signal).map(event => event.signal), ['SIGINT', 'SIGTERM']);
    }
  });
}

for (const shell of ['bash', 'zsh']) {
  for (const conflict of ['alias', 'function']) {
    test(`shell-init preserves an existing ${shell} ${conflict} and emits reconciliation text`, async t => {
      const f = await fixture(t);
      const added = f.add();
      assert.equal(added.status, 0, added.stderr);
      const generated = f.run('shell-init', '--shell', shell, '--omp', 'example');
      assert.equal(generated.status, 0, generated.stderr);
      const init = path.join(f.root, 'shell-init');
      await writeFile(init, generated.stdout);
      const definition = conflict === 'alias' ? "alias omp='printf existing-alias'" : 'function omp { printf existing-function; }';
      const inspect = conflict === 'alias' ? 'alias omp' : 'typeset -f omp';
      const program = `${definition}\nbefore=$(${inspect})\n. ${shellQuote(init)}\nafter=$(${inspect})\n[ "$before" = "$after" ] || exit 91\neval 'omp'\n`;
      const args = shell === 'bash' ? ['--noprofile', '--norc', '-O', 'expand_aliases', '-c', program] : ['-f', '-c', program];
      const result = spawnSync(shell, args, { cwd: f.root, env: f.env, encoding: 'utf8', timeout: 10000 });
      if (shell === 'zsh' && result.error?.code === 'ENOENT') { t.skip('zsh is not installed'); return; }
      assert.equal(result.status, 0, result.stderr);
      assert.equal(result.stdout, `existing-${conflict}`);
      assert.match(result.stderr, /KitShift: omp alias\/function exists; reconcile it before enabling the shortcut\./);
      assert.doesNotMatch(result.stderr, /syntax error|parse error/i);
    });
  }
}

test('checks-only profile edits do not revalidate missing dependencies; changed dependencies fail before writes', async t => {
  const f = await fixture(t);
  const added = f.add();
  assert.equal(added.status, 0, added.stderr);
  await rm(f.entry);
  const edited = f.run('profile', 'edit', 'example', '--checks', 'off');
  assert.equal(edited.status, 0, edited.stderr);
  const filename = path.join(f.store, 'profiles.json');
  const before = await readFile(filename, 'utf8');
  assert.equal(JSON.parse(before).profiles.example.checks, false);
  for (const flag of ['--playwright-cli', '--open-design-cli', '--browser', '--executable']) {
    const invalid = f.run('profile', 'edit', 'example', flag, path.join(f.root, 'missing-dependency'));
    assert.notEqual(invalid.status, 0, `${flag}: ${invalid.stdout}`);
    assert.equal(await readFile(filename, 'utf8'), before, `${flag} must fail before saving`);
  }
  const addedMissing = f.run('profile', 'add', 'missing', '--harness', 'omp', '--target', path.join(f.root, 'target'),
    '--executable', process.execPath, '--playwright-cli', f.entry, '--browser', process.execPath, '--open-design-cli', f.entry);
  assert.notEqual(addedMissing.status, 0);
  assert.match(addedMissing.stderr, /playwright-cli|exist|regular file/i);
  assert.equal(await readFile(filename, 'utf8'), before);
});
