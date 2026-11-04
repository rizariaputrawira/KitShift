import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, cp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const source = fileURLToPath(new URL('../', import.meta.url));

test('notification adapters consume real cached checker data and reject stale launch data', async t => {
  const root = await mkdtemp(path.join(tmpdir(), 'kitshift-notify-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const repo = path.join(root, 'repo');
  const remote = path.join(root, 'remote.git');
  const other = path.join(root, 'other');
  const agy = path.join(root, 'agy');
  const omp = path.join(root, 'omp');
  const store = path.join(root, 'store');
  await mkdir(path.join(repo, 'scripts'), { recursive: true });
  await mkdir(path.join(omp, 'extensions'), { recursive: true });
  await mkdir(agy);
  for (const file of ['kitshift.mjs', 'update-common.mjs', 'install-common.mjs']) await cp(path.join(source, 'scripts', file), path.join(repo, 'scripts', file));
  await cp(path.join(source, 'harnesses/omp/extensions/kitshift-update.js'), path.join(omp, 'extensions/kitshift-update.js'));
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
  const manifest = revision => JSON.stringify({ version: 1, files: {}, source: { repository: repo, revision, node: process.execPath } });
  for (const target of [agy, omp]) await writeFile(path.join(target, '.kitshift-manifest.json'), manifest(a));
  const entry = path.join(root, 'entry');
  await writeFile(entry, '');
  const env = { ...process.env, KITSHIFT_HOME: store };
  const cli = path.join(repo, 'scripts/kitshift.mjs');
  const run = (args, extra = {}) => spawnSync(process.execPath, [cli, ...args], { cwd: root, env: { ...env, ...extra }, input: '{}', encoding: 'utf8' });
  for (const [name, harness, target] of [['alpha', 'agy', agy], ['beta', 'omp', omp]]) {
    const args = ['profile', 'add', name, '--harness', harness, '--target', target, '--executable', process.execPath,
      '--playwright-cli', entry, '--browser', process.execPath, '--open-design-cli', entry];
    if (harness === 'agy') args.push('--workspace-dir', root);
    const result = run(args);
    assert.equal(result.status, 0, result.stderr);
  }
  const check = run(['_check', '--json']);
  assert.equal(check.status, 0, check.stderr);
  const response = JSON.parse(check.stdout);
  assert.equal(response.check.outcome, 'ok');
  const envMarker = { KITSHIFT_LAUNCH_PROFILE: 'alpha', KITSHIFT_LAUNCH_INTERACTIVE: '1', KITSHIFT_LAUNCH_NOTICE: check.stdout };
  let result = run(['_agy-notice', '--target', agy], envMarker);
  assert.match(JSON.parse(result.stdout).injectSteps[0].ephemeralMessage, /^Cached: KitShift update available for alpha\./);
  assert.deepEqual(JSON.parse(run(['_agy-notice', '--target', omp], envMarker).stdout), {});
  assert.deepEqual(JSON.parse(run(['_agy-notice', '--target', agy]).stdout), {});
  await writeFile(path.join(agy, '.kitshift-manifest.json'), manifest(b));
  assert.deepEqual(JSON.parse(run(['_agy-notice', '--target', agy], envMarker).stdout), {});

  const oldHome = process.env.KITSHIFT_HOME;
  process.env.KITSHIFT_HOME = store;
  t.after(() => { if (oldHome === undefined) delete process.env.KITSHIFT_HOME; else process.env.KITSHIFT_HOME = oldHome; });
  const factory = (await import(pathToFileURL(path.join(omp, 'extensions/kitshift-update.js')).href)).default;
  const handlers = {};
  const messages = [];
  factory({ on: (event, handler) => { handlers[event] = handler; } });
  handlers.session_start({}, { mode: 'tui', hasUI: true, sessionModes: {}, ui: { notify: message => messages.push(message) } });
  for (let i = 0; i < 100 && messages.length === 0; i++) await new Promise(resolve => setTimeout(resolve, 50));
  assert.equal(messages.length, 1);
  assert.match(messages[0], /KitShift update available for beta/);
  handlers.session_start({}, { mode: 'tui', hasUI: true, sessionModes: {}, ui: { notify: message => messages.push(message) } });
  await new Promise(resolve => setTimeout(resolve, 250));
  assert.equal(messages.length, 1);
  handlers.session_shutdown();
  assert.equal((await readFile(path.join(omp, '.kitshift-manifest.json'), 'utf8')), manifest(a));
});
