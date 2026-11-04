import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { checkDirectoryChain, ensureDirectory, fail, inspectDestination, loadManifest, lstatIfPresent, manifestName, readRegularFile, validateLocalPath, writeAtomic } from './install-common.mjs';
export { shellQuote } from './install-common.mjs';

export const repository = fs.realpathSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'));
export const cli = path.join(repository, 'scripts', 'kitshift.mjs');
export const namePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function contains(directory, filename) {
  const relative = path.relative(directory, filename);
  return relative === '' || (relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative));
}

function checkStoreLocation(directory, targets = []) {
  if (contains(repository, directory) || contains(directory, repository)) {
    fail('KitShift state must be outside the source checkout; choose a separate KITSHIFT_HOME.');
  }
  for (const target of targets) {
    if (contains(target, directory) || contains(directory, target)) {
      fail('KitShift state and managed targets must not overlap; choose a separate KITSHIFT_HOME or target.');
    }
  }
  checkDirectoryChain(directory);
  // Catch unregistered managed installations before the first state write.
  for (let current = directory; ; current = path.dirname(current)) {
    if (lstatIfPresent(path.join(current, manifestName))) {
      fail('KitShift state must be outside managed installations; choose a separate KITSHIFT_HOME.');
    }
    if (current === path.dirname(current)) break;
  }
}

export function home() {
  const override = process.env.KITSHIFT_HOME;
  const xdg = process.env.XDG_STATE_HOME;
  let directory;
  if (override !== undefined) {
    if (!path.isAbsolute(override)) fail('KITSHIFT_HOME must be an absolute path.');
    directory = path.normalize(override);
  } else if (xdg !== undefined) {
    if (!path.isAbsolute(xdg)) fail('XDG_STATE_HOME must be an absolute path.');
    directory = path.join(xdg, 'kitshift');
  } else {
    directory = path.join(os.homedir(), '.local', 'state', 'kitshift');
  }
  checkStoreLocation(directory);
  const stat = lstatIfPresent(directory);
  if (stat && (stat.uid !== process.getuid() || (stat.mode & 0o7777) !== 0o700)) {
    fail('KitShift state directory must be owned by the current user with mode 0700; repair its ownership/permissions or choose a new KITSHIFT_HOME.');
  }
  return directory;
}

export function emptyConfig() {
  return { version: 1, repository, launcher: null, profiles: {} };
}

function plainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function validProfileShape(profile) {
  return plainObject(profile) && ['omp', 'agy'].includes(profile.harness) &&
    ['target', 'executable', 'playwrightCli', 'browser', 'openDesignCli'].every(key => typeof profile[key] === 'string' && path.isAbsolute(profile[key])) &&
    Array.isArray(profile.workspaceDirs) && profile.workspaceDirs.every(root => typeof root === 'string' && path.isAbsolute(root) && !root.includes(',')) &&
    (profile.harness === 'omp' ? profile.workspaceDirs.length === 0 : profile.workspaceDirs.length > 0) &&
    typeof profile.checks === 'boolean';
}

export function readConfig({ optional = false } = {}) {
  const dir = home();
  checkDirectoryChain(dir);
  const filename = path.join(dir, 'profiles.json');
  if (!inspectDestination(filename)) {
    if (optional) return emptyConfig();
    fail('Profile configuration is missing. Run kitshift setup or register a profile.');
  }
  let config;
  try { config = JSON.parse(readRegularFile(filename).toString('utf8')); }
  catch { fail('Profile configuration is unreadable or invalid JSON. Repair profiles.json or use a new KITSHIFT_HOME.'); }
  if (!plainObject(config) || config.version !== 1 || typeof config.repository !== 'string' ||
      !path.isAbsolute(config.repository) || !plainObject(config.profiles) ||
      !(config.launcher === null || (plainObject(config.launcher) && typeof config.launcher.path === 'string' && path.isAbsolute(config.launcher.path)))) {
    fail('Unsupported or invalid profile configuration; repair profiles.json or use a new KITSHIFT_HOME.');
  }
  if (config.repository !== repository) fail('Profile checkout differs from this CLI or has moved. Repair the private repository path deliberately or register profiles in a new KITSHIFT_HOME.');
  const targets = new Set();
  for (const [name, profile] of Object.entries(config.profiles)) {
    if (!namePattern.test(name) || !validProfileShape(profile) || targets.has(path.normalize(profile.target))) {
      fail(`Invalid profile configuration for ${name}; repair profiles.json.`);
    }
    checkDirectoryChain(profile.target);
    checkStoreLocation(dir, [profile.target]);
    targets.add(path.normalize(profile.target));
  }
  return config;
}

export function saveConfig(config) {
  checkStoreLocation(home(), Object.values(config.profiles).map(profile => profile.target));
  writeAtomic(path.join(home(), 'profiles.json'), Buffer.from(`${JSON.stringify(config, null, 2)}\n`), 0o600);
}

export function validateProfile(profile, previous = null) {
  if (typeof profile.target !== 'string' || !profile.target) fail('--target is required.');
  profile.target = path.resolve(profile.target);
  if (!validProfileShape(profile)) fail('Invalid profile values; provide the required absolute paths and explicit harness workspace roots.');
  checkStoreLocation(home(), [profile.target]);
  checkDirectoryChain(profile.target);
  const changed = key => previous === null || previous.harness !== profile.harness ||
    JSON.stringify(previous[key]) !== JSON.stringify(profile[key]);
  if (changed('target')) {
    const manifestPath = path.join(profile.target, manifestName);
    if (!inspectDestination(manifestPath)) fail(`Target is not a managed installation: ${profile.target}`);
    loadManifest(manifestPath);
  }
  for (const [key, flag, executable] of [
    ['executable', '--executable', true],
    ['playwrightCli', '--playwright-cli', false],
    ['browser', '--browser', true],
    ['openDesignCli', '--open-design-cli', false],
  ]) {
    if (changed(key)) validateLocalPath(flag, profile[key], executable);
  }
  if (changed('workspaceDirs')) {
    profile.workspaceDirs = profile.workspaceDirs.map(root => path.normalize(validateLocalPath('--workspace-dir', root, false, true)));
  }
  return profile;
}

export function withLock(lock, args) {
  const dir = home();
  checkDirectoryChain(dir);
  const config = readConfig({ optional: true });
  const targetIndex = args[0] === '_locked' && ['add', 'edit'].includes(args[1]) ? args.indexOf('--target') : -1;
  const proposedTargets = targetIndex >= 0 && args[targetIndex + 1] ? [path.resolve(args[targetIndex + 1])] : [];
  checkStoreLocation(dir, [...Object.values(config.profiles).map(profile => profile.target), ...proposedTargets]);
  ensureDirectory(dir);
  home();
  const filename = path.join(dir, lock);
  inspectDestination(filename);
  const fd = fs.openSync(filename, fs.constants.O_CREAT | fs.constants.O_RDWR | fs.constants.O_NOFOLLOW, 0o600);
  try { fs.fchmodSync(fd, 0o600); } finally { fs.closeSync(fd); }
  const result = spawnSync('flock', ['--close', '--nonblock', '--conflict-exit-code', '75', filename, process.execPath, cli, ...args], { stdio: 'inherit' });
  if (result.error) fail(`Cannot run flock; install util-linux flock: ${result.error.code ?? result.error.message}`);
  if (result.status === 75) console.error('kitshift: operation busy; retry later.');
  process.exitCode = result.status ?? 1;
}

function git(...args) {
  return spawnSync('git', args, { cwd: repository, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
}

function gitValue(...args) {
  const result = git(...args);
  return result.status === 0 ? result.stdout.trim() : null;
}

export function sourceState() {
  const top = gitValue('rev-parse', '--show-toplevel');
  if (!top) return { error: 'invalid-source', detail: 'Checkout is missing or is not a Git repository; repair the checkout path.' };
  try {
    if (fs.realpathSync(top) !== repository) return { error: 'invalid-source', detail: 'Checkout identity changed; repair the checkout path.' };
  } catch {
    return { error: 'invalid-source', detail: 'Checkout is unavailable; repair the checkout path.' };
  }
  const branch = gitValue('symbolic-ref', '--quiet', '--short', 'HEAD');
  if (!branch) return { error: 'unknown', detail: 'Checkout is detached; select a branch with an upstream.' };
  const remote = gitValue('config', '--get', `branch.${branch}.remote`);
  const merge = gitValue('config', '--get', `branch.${branch}.merge`);
  const head = gitValue('rev-parse', '--verify', 'HEAD^{commit}');
  const destination = remote && !remote.startsWith('-') ? gitValue('remote', 'get-url', remote) : null;
  if (!remote || remote === '.' || remote.startsWith('-') || !merge || !merge.startsWith('refs/heads/') || !head || !destination) {
    return { error: 'unknown', detail: 'Branch has no usable configured remote upstream; configure one and retry.' };
  }
  const upstreamIdentity = createHash('sha256').update(destination).digest('hex');
  return { branch, remote, merge, head, upstreamIdentity };
}

function readCache() {
  try {
    const filename = path.join(home(), 'status.json');
    if (!inspectDestination(filename)) return null;
    const value = JSON.parse(readRegularFile(filename).toString('utf8'));
    if (!plainObject(value) || value.version !== 1 || value.repository !== repository ||
        !['ok', 'offline', 'auth', 'timeout', 'invalid-source', 'unknown', 'error'].includes(value.outcome) ||
        !(value.success === null || (plainObject(value.success) && typeof value.success.branch === 'string' &&
          typeof value.success.remote === 'string' && typeof value.success.merge === 'string' &&
          typeof value.success.upstreamIdentity === 'string' && /^[a-f0-9]{64}$/.test(value.success.upstreamIdentity) &&
          typeof value.success.revision === 'string' && /^(?:[a-f0-9]{40}|[a-f0-9]{64})$/.test(value.success.revision) &&
          typeof value.success.checkedAt === 'string' && Number.isFinite(Date.parse(value.success.checkedAt))))) return null;
    return value;
  } catch { return null; }
}

function ancestor(older, newer) {
  const result = git('merge-base', '--is-ancestor', older, newer);
  return result.status === 0 ? true : result.status === 1 ? false : null;
}

function candidate(state, cache) {
  if (!cache?.success || cache.success.branch !== state.branch || cache.success.remote !== state.remote ||
      cache.success.merge !== state.merge || cache.success.upstreamIdentity !== state.upstreamIdentity) return null;
  const upstream = cache.success.revision;
  if (state.head === upstream) return { revision: upstream, origin: 'upstream' };
  const behind = ancestor(state.head, upstream);
  const ahead = ancestor(upstream, state.head);
  if (behind === null || ahead === null) return { revision: null, origin: null, unavailable: true };
  if (behind) return { revision: upstream, origin: 'upstream' };
  if (ahead) return { revision: state.head, origin: 'checkout' };
  return { revision: null, origin: null, diverged: true };
}

export function statusResponse(config, outcome = null, target = null) {
  const state = sourceState();
  const cache = readCache();
  const choice = state.error ? null : candidate(state, cache);
  const same = !!choice;
  const lastOutcome = choice?.unavailable ? 'unknown'
    : outcome ?? (same ? cache.outcome : state.error ?? (cache?.success === null ? cache.outcome : 'unknown'));
  const stale = lastOutcome !== 'ok';
  const profiles = [];
  for (const [name, profile] of Object.entries(config.profiles).sort(([a], [b]) => a.localeCompare(b))) {
    if (target !== null && profile.target !== target) continue;
    let installed = null;
    try {
      const manifest = loadManifest(path.join(profile.target, '.kitshift-manifest.json'));
      if (manifest.source?.repository === repository) installed = manifest.source.revision;
    } catch { /* Unknown provenance is not an available update. */ }
    let status = 'unknown';
    if (choice?.diverged) status = 'diverged';
    else if (installed && choice?.revision) {
      if (installed === choice.revision) status = 'current';
      else if (ancestor(installed, choice.revision) === true) status = 'update-available';
      else if (ancestor(choice.revision, installed) === true) status = 'ahead';
      else if (ancestor(installed, choice.revision) === false && ancestor(choice.revision, installed) === false) status = 'diverged';
    }
    const message = status === 'update-available' && profile.checks
      ? `${stale ? 'Cached: ' : ''}${choice.origin === 'checkout' ? 'KitShift checkout changes are ready' : 'KitShift update available'} for ${name}. Run kitshift update ${name} to review and apply.`
      : null;
    profiles.push({ name, target: profile.target, status, installedRevision: installed, candidateRevision: choice?.revision ?? null, origin: choice?.origin ?? null, message });
  }
  return { version: 1, check: { outcome: lastOutcome, checkedAt: same ? cache.success.checkedAt : null, stale }, profiles };
}

export async function fetchUpstream(state) {
  return await new Promise(resolve => {
    const child = spawn('git', ['-c', 'core.hooksPath=/dev/null', '-c', 'maintenance.auto=false', '-c', 'gc.auto=0',
      'fetch', '--no-tags', '--no-recurse-submodules', '--no-write-fetch-head', '--', state.remote,
      `+${state.merge}:refs/kitshift/upstream`], {
      cwd: repository, detached: true, stdio: ['ignore', 'ignore', 'pipe'],
      env: { ...process.env, GIT_TERMINAL_PROMPT: '0', GCM_INTERACTIVE: 'Never', GIT_SSH_COMMAND: 'ssh -oBatchMode=yes' },
    });
    let stderr = '';
    let timedOut = false;
    const signals = ['SIGINT', 'SIGTERM', 'SIGHUP'];
    const handlers = new Map();
    const removeHandlers = () => {
      for (const [signal, handler] of handlers) process.removeListener(signal, handler);
    };
    for (const signal of signals) {
      const handler = () => {
        try { process.kill(-child.pid, 'SIGKILL'); } catch { /* Child already exited. */ }
        removeHandlers();
        process.kill(process.pid, signal);
      };
      handlers.set(signal, handler);
      process.on(signal, handler);
    }
    child.stderr?.on('data', data => { if (stderr.length < 8192) stderr += data.toString().slice(0, 8192 - stderr.length); });
    const timer = setTimeout(() => {
      timedOut = true;
      try { process.kill(-child.pid, 'SIGKILL'); } catch { /* Already exited. */ }
    }, 10000);
    child.on('error', () => { clearTimeout(timer); removeHandlers(); resolve('error'); });
    child.on('close', code => {
      clearTimeout(timer);
      removeHandlers();
      if (timedOut) resolve('timeout');
      else if (code === 0) resolve('ok');
      else if (/authentication|permission denied|could not read username|access denied/i.test(stderr)) resolve('auth');
      else resolve('offline');
    });
  });
}

export async function performCheck(config) {
  const state = sourceState();
  let outcome = state.error ?? await fetchUpstream(state);
  const afterFetch = sourceState();
  if (!state.error && (afterFetch.error || state.branch !== afterFetch.branch || state.remote !== afterFetch.remote ||
      state.merge !== afterFetch.merge || state.upstreamIdentity !== afterFetch.upstreamIdentity)) outcome = 'invalid-source';
  let cache = readCache();
  if (outcome === 'ok') {
    const revision = gitValue('rev-parse', '--verify', 'refs/kitshift/upstream^{commit}');
    if (!revision) outcome = 'error';
    else cache = { version: 1, repository, success: { branch: state.branch, remote: state.remote, merge: state.merge, upstreamIdentity: state.upstreamIdentity, revision, checkedAt: new Date().toISOString() }, outcome: 'ok' };
  }
  if (outcome !== 'ok') {
    cache ??= { version: 1, repository, success: null };
    cache.outcome = outcome;
  }
  writeAtomic(path.join(home(), 'status.json'), Buffer.from(`${JSON.stringify(cache, null, 2)}\n`), 0o600);
  return statusResponse(config, outcome);
}
