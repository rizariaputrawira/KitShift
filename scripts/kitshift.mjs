#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { fail, inspectDestination, loadManifest, readInstallSource, readRegularFile, writeAtomic } from './install-common.mjs';
import { cli, home, namePattern, performCheck, readConfig, repository, saveConfig, shellQuote, sourceState, statusResponse, validateProfile, withLock } from './update-common.mjs';

const help = `Usage: kitshift <command> [options]

  setup [--bin-dir DIR]             Install a private checkout-backed launcher
  profile add NAME [options]        Register an existing managed installation
  profile edit NAME [options]       Change a registration without installing
  profile list                      List registrations
  profile remove NAME               Remove a registration, not installed files
  status [NAME]                    Show installed and cached upstream status
  update [NAME] [--all] [--check] [--yes]
                                   Check or preview and apply updates
  shell-init --shell bash|zsh [--omp NAME] [--agy NAME]
                                   Print opt-in native command shortcuts
  run NAME -- [native arguments]   Launch a registered native executable
  cache clear                      Clear cached check results

Profile values: --harness omp|agy --target DIR --executable ABSOLUTE_PATH
  --playwright-cli PATH --browser PATH --open-design-cli PATH
  --workspace-dir DIRS (required for agy; comma-separated)
  profile edit also accepts --checks on|off.

Setup and registration never modify installed harness content or shell rc files.
Checks fetch Git objects and update a private Git ref and cache, but do not
modify checkout files or installed files.
Applying an update may fast-forward the checkout before preview and confirmation.
Declining or an installation failure does not roll the checkout back.
`;

function options(args, allowed) {
  const values = {};
  const positional = [];
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg.startsWith('-')) { positional.push(arg); continue; }
    if (!allowed.includes(arg)) fail(`Unknown option: ${arg}`);
    if (Object.hasOwn(values, arg)) fail(`Duplicate option: ${arg}`);
    if (i + 1 >= args.length || args[i + 1].startsWith('--')) fail(`Missing value for ${arg}`);
    values[arg] = args[++i];
  }
  return { values, positional };
}

function requireCount(args, count, usage) {
  if (args.length !== count) fail(`Usage: ${usage}`);
}

function check(config) {
  const result = spawnSync(process.execPath, [cli, '_check-lock'], { encoding: 'utf8' });
  if (result.status === 75) return statusResponse(config, 'busy');
  if (result.status !== 0) return statusResponse(config, 'error');
  try { return JSON.parse(result.stdout); } catch { return statusResponse(config, 'error'); }
}

function printStatus(response, selected = null) {
  console.log(`Check: ${response.check.outcome}${response.check.stale ? ' (cached or unknown)' : ''}; last successful check: ${response.check.checkedAt ?? 'unknown'}`);
  for (const profile of response.profiles.filter(item => selected === null || item.name === selected)) {
    console.log(`${profile.name}: ${profile.status}; installed ${profile.installedRevision ?? 'unknown'}; candidate ${profile.candidateRevision ?? 'unknown'}${profile.origin ? ` (${profile.origin})` : ''}`);
  }
}

function prompt(text) {
  process.stdout.write(text);
  const byte = Buffer.alloc(1);
  let line = '';
  while (fs.readSync(0, byte, 0, 1, null) === 1 && byte[0] !== 10) line += byte.toString();
  return line.trim();
}

function selectedProfiles(config, name, all) {
  const names = Object.keys(config.profiles).sort();
  if (name) {
    if (!Object.hasOwn(config.profiles, name)) fail(`Profile not found: ${name}`);
    return [name];
  }
  if (!names.length) fail('No profiles registered.');
  if (all) return names;
  if (!process.stdin.isTTY || !process.stdout.isTTY) fail('Select a profile by NAME or use --all in noninteractive mode.');
  if (names.length === 1) return names;
  names.forEach((item, index) => console.log(`  ${index + 1}. ${item}`));
  const answer = prompt('Select one profile (empty cancels): ');
  if (!answer) return [];
  const index = Number(answer) - 1;
  if (!Number.isInteger(index) || index < 0 || index >= names.length) fail('Invalid profile selection.');
  return [names[index]];
}

function installer(profile, preview) {
  const args = [path.join(repository, 'scripts', `install-${profile.harness}.mjs`), '--update'];
  if (preview) args.push('--dry-run');
  args.push('--target', profile.target, '--playwright-cli', profile.playwrightCli, '--browser', profile.browser, '--open-design-cli', profile.openDesignCli);
  if (profile.harness === 'agy') args.push('--workspace-dir', profile.workspaceDirs.join(','));
  return spawnSync(process.execPath, args, { cwd: repository, stdio: 'inherit' });
}

async function applyUpdate(args) {
  const flags = args.filter(arg => arg.startsWith('-'));
  const names = args.filter(arg => !arg.startsWith('-'));
  if (flags.some(flag => !['--all', '--yes'].includes(flag)) || new Set(flags).size !== flags.length ||
      names.length > 1 || (names.length && flags.includes('--all'))) fail('Usage: kitshift update [NAME] [--all] [--yes]');
  if (!process.stdin.isTTY && !flags.includes('--yes')) fail('Noninteractive apply requires --yes.');
  const config = readConfig();
  const selected = selectedProfiles(config, names[0], flags.includes('--all'));
  if (!selected.length) { console.log('Cancelled; no installations changed.'); return; }
  for (const name of selected) validateProfile({ ...config.profiles[name] });
  const state = sourceState();
  if (state.error) fail(state.detail);
  if (readInstallSource(repository).revision !== state.head) fail('Checkout is dirty or source identity is unknown; clean it before updating.');
  const checked = await performCheck(config);
  if (checked.check.outcome !== 'ok') fail(`Upstream check failed (${checked.check.outcome}); retry before applying.`);
  const candidate = checked.profiles[0]?.candidateRevision;
  if (!candidate) fail('Checkout and upstream histories diverged or are unavailable; resolve manually.');
  if (JSON.stringify(sourceState()) !== JSON.stringify(state) || readInstallSource(repository).revision !== state.head) {
    fail('Checkout or upstream configuration changed during the check; retry before applying.');
  }
  console.log(`Checkout ${state.head}; candidate ${candidate}; branch ${state.branch}; upstream ${state.remote}/${state.merge.slice('refs/heads/'.length)}.`);
  if (candidate !== state.head) {
    console.log('Fast-forwarding checkout before installation preview; this will not be rolled back on cancellation.');
    const merge = spawnSync('git', ['-c', 'core.hooksPath=/dev/null', 'merge', '--ff-only', candidate], { cwd: repository, stdio: 'inherit' });
    if (merge.status !== 0) fail('Checkout fast-forward failed; installations were not modified.');
  }
  const expected = readInstallSource(repository);
  if (expected.revision !== candidate) fail('Checkout changed during synchronization; installations were not modified.');
  let failed = false;
  for (const name of selected) {
    console.log(`Previewing ${name}: ${config.profiles[name].target}`);
    if (installer(config.profiles[name], true).status !== 0) { failed = true; console.error(`Preflight failed: ${name}`); }
  }
  if (failed) fail('Preflight failed; no selected installation was changed. Checkout may already have advanced.');
  console.log(`Apply candidate ${candidate} to:`);
  for (const name of selected) console.log(`  ${name}: ${config.profiles[name].target}`);
  if (!flags.includes('--yes') && !/^y(?:es)?$/i.test(prompt('Apply? [y/N] '))) {
    console.log('Cancelled; installations unchanged. Checkout may already have advanced.');
    return;
  }
  const succeeded = [];
  for (let i = 0; i < selected.length; i++) {
    const name = selected[i];
    try {
      if (JSON.stringify(readConfig()) !== JSON.stringify(config) || readInstallSource(repository).revision !== candidate) throw new Error('Configuration or checkout changed since preview; run a fresh preview.');
      validateProfile({ ...config.profiles[name] });
      if (installer(config.profiles[name], false).status !== 0) throw new Error('Installer failed; target may be partially changed.');
      const manifest = loadManifest(path.join(config.profiles[name].target, '.kitshift-manifest.json'));
      if (manifest.source?.repository !== repository || manifest.source.revision !== candidate) throw new Error('Installed provenance mismatch; target may be partially changed.');
      succeeded.push(name);
    } catch (error) {
      console.error(`Succeeded: ${succeeded.join(', ') || 'none'}; failed/possibly partial: ${name}; not attempted: ${selected.slice(i + 1).join(', ') || 'none'}.`);
      fail(`${error.message} No automatic rollback was attempted.`);
    }
  }
  console.log(`Updated: ${succeeded.join(', ')}. Restart or reload the selected harnesses to use installed changes; existing sessions are not hot-reloaded.`);
}

function shellInit(args) {
  const { values, positional } = options(args, ['--shell', '--omp', '--agy']);
  if (positional.length || !['bash', 'zsh'].includes(values['--shell']) || (!values['--omp'] && !values['--agy'])) fail('Usage: kitshift shell-init --shell bash|zsh [--omp NAME] [--agy NAME]');
  const config = readConfig();
  for (const harness of ['omp', 'agy']) {
    const name = values[`--${harness}`];
    if (!name) continue;
    const profile = config.profiles[name];
    if (!profile || profile.harness !== harness) fail(`Profile ${name} is not a registered ${harness} installation.`);
    const executable = shellQuote(profile.executable);
    const node = shellQuote(process.execPath);
    const script = shellQuote(cli);
    console.log(`if alias ${harness} >/dev/null 2>&1 || typeset -f ${harness} >/dev/null 2>&1; then
  printf '%s\\n' ${shellQuote(`KitShift: ${harness} alias/function exists; reconcile it before enabling the shortcut.`)} >&2
else
  function ${harness} {
    if [ -x ${node} ] && [ -f ${script} ]; then
      ${node} ${script} run ${shellQuote(name)} --fallback-executable ${executable} -- \"$@\"
    else
      env -u KITSHIFT_LAUNCH_PROFILE -u KITSHIFT_LAUNCH_INTERACTIVE -u KITSHIFT_LAUNCH_NOTICE ${executable} \"$@\"
    fi
  }
fi`);
  }
}

function agyInteractive(args) {
  const noCheck = new Set(['-p', '--print', '--prompt', '--input-format', '--output-format', '--json-schema', '--help', '-h', '--version', '-v', '--print-timeout', '--disable-slash-commands']);
  const valueOptions = new Set(['--add-dir', '--agent', '--conversation', '--effort', '-i', '--prompt-interactive', '--log-file', '--mode', '--model', '--new-project', '--project']);
  const booleanOptions = new Set(['-c', '--continue', '--dangerously-skip-permissions', '--remote-control', '--sandbox']);
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const flag = arg.split('=', 1)[0];
    if (noCheck.has(flag)) return false;
    if (valueOptions.has(flag)) {
      if (!arg.includes('=') && ++i >= args.length) return false;
      continue;
    }
    if (!booleanOptions.has(flag) || arg.includes('=')) return false;
  }
  return true;
}

function runNative(args) {
  const delimiter = args.indexOf('--');
  if (delimiter < 1) fail('Usage: kitshift run NAME [--fallback-executable ABS] -- [native arguments]');
  const name = args[0];
  const { values, positional } = options(args.slice(1, delimiter), ['--fallback-executable']);
  if (positional.length) fail('Unexpected run arguments before --.');
  const nativeArgs = args.slice(delimiter + 1);
  let config;
  let profile;
  try { config = readConfig(); profile = config.profiles[name]; } catch { /* Fallback is deliberately independent of the store. */ }
  const executable = profile?.executable ?? values['--fallback-executable'];
  if (!executable || !path.isAbsolute(executable)) fail('Profile is unavailable; register it or provide an absolute fallback executable.');
  try {
    const resolved = fs.realpathSync(executable);
    let launcher = null;
    if (config?.launcher) {
      try { launcher = fs.realpathSync(config.launcher.path); } catch (error) { if (error.code !== 'ENOENT') throw error; }
    }
    if (resolved === fs.realpathSync(cli) || resolved === launcher || executable === config?.launcher?.path) fail('Native executable resolves to the KitShift launcher; recursion refused.');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    fail(`Native executable is unavailable: ${executable}`);
  }
  const env = { ...process.env };
  delete env.KITSHIFT_LAUNCH_PROFILE;
  delete env.KITSHIFT_LAUNCH_INTERACTIVE;
  delete env.KITSHIFT_LAUNCH_NOTICE;
  if (profile?.harness === 'agy' && profile.checks && process.stdin.isTTY && process.stdout.isTTY && process.stderr.isTTY && agyInteractive(nativeArgs)) {
    try {
      env.KITSHIFT_LAUNCH_PROFILE = name;
      env.KITSHIFT_LAUNCH_INTERACTIVE = '1';
      env.KITSHIFT_HOME = home();
      env.KITSHIFT_LAUNCH_NOTICE = JSON.stringify(statusResponse(config, null, profile.target));
      const worker = spawn(process.execPath, [cli, '_check', '--json'], { detached: true, stdio: 'ignore', env });
      worker.on('error', () => {});
      worker.unref();
    } catch {
      delete env.KITSHIFT_LAUNCH_PROFILE;
      delete env.KITSHIFT_LAUNCH_INTERACTIVE;
      delete env.KITSHIFT_LAUNCH_NOTICE;
    }
  }
  // A separate POSIX session keeps terminal-group signals out of the native
  // child: this wrapper is their sole forwarding owner. Inherited TTY streams
  // retain raw input/output, but this does not preserve /dev/tty or job control.
  // Forward only its original process group, not groups the native app creates.
  const child = spawn(executable, nativeArgs, { detached: true, stdio: 'inherit', env });
  const handlers = new Map();
  const cleanup = () => {
    for (const [signal, handler] of handlers) process.removeListener(signal, handler);
  };
  for (const signal of ['SIGINT', 'SIGTERM', 'SIGHUP']) {
    const handler = () => {
      if (!child.pid || child.exitCode !== null || child.signalCode !== null) return;
      try {
        process.kill(-child.pid, signal);
      } catch (error) {
        if (error.code !== 'ESRCH') throw error;
      }
    };
    handlers.set(signal, handler);
    process.on(signal, handler);
  }
  child.on('error', error => {
    cleanup();
    console.error(`kitshift: native launch failed: ${error.message}`);
    process.exitCode = 1;
  });
  child.on('exit', (code, signal) => {
    cleanup();
    if (signal) process.kill(process.pid, signal);
    else process.exitCode = code ?? 1;
  });
}

function agyNotice(args) {
  try {
    const { values, positional } = options(args, ['--target']);
    if (positional.length || !values['--target'] || process.env.KITSHIFT_LAUNCH_INTERACTIVE !== '1') return {};
    JSON.parse(fs.readFileSync(0, 'utf8'));
    const config = readConfig();
    const name = process.env.KITSHIFT_LAUNCH_PROFILE;
    const profile = config.profiles[name];
    const target = path.resolve(values['--target']);
    if (!profile || profile.harness !== 'agy' || !profile.checks || profile.target !== target) return {};
    const frozen = JSON.parse(process.env.KITSHIFT_LAUNCH_NOTICE ?? 'null');
    const record = frozen?.version === 1 && Array.isArray(frozen.profiles) ? frozen.profiles.find(item => item.name === name && item.target === target) : null;
    const manifest = loadManifest(path.join(target, '.kitshift-manifest.json'));
    const installed = manifest.source?.repository === repository ? manifest.source.revision : null;
    const id = /^(?:[a-f0-9]{40}|[a-f0-9]{64})$/;
    if (record?.status !== 'update-available' || !['checkout', 'upstream'].includes(record.origin) ||
        !id.test(record.candidateRevision) || !id.test(installed) || record.installedRevision !== installed ||
        installed === record.candidateRevision) return {};
    const ancestor = spawnSync('git', ['merge-base', '--is-ancestor', installed, record.candidateRevision], { cwd: repository, stdio: 'ignore' });
    if (ancestor.status !== 0) return {};
    const kind = record.origin === 'checkout' ? 'KitShift checkout changes are ready' : 'KitShift update available';
    return { injectSteps: [{ ephemeralMessage: `Cached: ${kind} for ${name}. Run kitshift update ${name} to review and apply.` }] };
  } catch { return {}; }
}

const profileFlags = ['--harness', '--target', '--executable', '--playwright-cli', '--browser', '--open-design-cli', '--workspace-dir'];
const mapping = { '--harness': 'harness', '--target': 'target', '--executable': 'executable', '--playwright-cli': 'playwrightCli', '--browser': 'browser', '--open-design-cli': 'openDesignCli' };

function profileMutation(action, args) {
  const { values, positional } = options(args, action === 'edit' ? [...profileFlags, '--checks'] : profileFlags);
  requireCount(positional, 1, `kitshift profile ${action} NAME [options]`);
  const name = positional[0];
  if (!namePattern.test(name)) fail('Profile name must contain lowercase letters or digits separated by single hyphens.');
  const config = readConfig({ optional: action === 'add' });
  if (action === 'add' && Object.hasOwn(config.profiles, name)) fail(`Profile already exists: ${name}`);
  if (action === 'edit' && !Object.hasOwn(config.profiles, name)) fail(`Profile not found: ${name}`);
  const previous = action === 'edit' ? config.profiles[name] : null;
  const profile = previous ? { ...previous } : { workspaceDirs: [], checks: true };
  for (const [flag, key] of Object.entries(mapping)) if (Object.hasOwn(values, flag)) profile[key] = values[flag];
  if (Object.hasOwn(values, '--workspace-dir')) {
    const roots = values['--workspace-dir'].split(',').map(root => root.trim());
    if (roots.some(root => !root)) fail('--workspace-dir contains an empty root.');
    profile.workspaceDirs = roots;
  }
  if (Object.hasOwn(values, '--checks')) {
    if (!['on', 'off'].includes(values['--checks'])) fail('--checks must be on or off.');
    profile.checks = values['--checks'] === 'on';
  }
  validateProfile(profile, previous);
  if (Object.entries(config.profiles).some(([other, p]) => other !== name && p.target === profile.target)) fail(`Target already registered: ${profile.target}`);
  config.profiles[name] = profile;
  saveConfig(config);
  console.log(`${action === 'add' ? 'Registered' : 'Updated'} profile ${name}; installed files unchanged.`);
}

function setup(args) {
  const { values, positional } = options(args, ['--bin-dir']);
  requireCount(positional, 0, 'kitshift setup [--bin-dir DIR]');
  const dir = path.resolve(values['--bin-dir'] ?? path.join(os.homedir(), '.local', 'bin'));
  const launcher = path.join(dir, 'kitshift');
  const contents = Buffer.from(`#!/bin/sh\nexec ${shellQuote(process.execPath)} ${shellQuote(cli)} "$@"\n`);
  const config = readConfig({ optional: true });
  const existing = inspectDestination(launcher);
  if (existing && !readRegularFile(launcher).equals(contents)) fail(`Refusing to overwrite differing launcher: ${launcher}`);
  if (!existing || (existing.mode & 0o777) !== 0o755) writeAtomic(launcher, contents, 0o755);
  config.launcher = { path: launcher };
  saveConfig(config);
  const onPath = (process.env.PATH ?? '').split(path.delimiter).includes(dir);
  console.log(`Launcher: ${launcher}\n${onPath ? 'Directory is on PATH.' : `Directory is not on PATH. Add: export PATH=${shellQuote(dir)}:"$PATH"`}\nShell shortcuts are opt-in; no startup files were edited.`);
}

async function main(args) {
  if (!args.length || (args[0] !== 'run' && (args.includes('--help') || args.includes('-h')))) { console.log(help); return; }
  const [command, ...rest] = args;
  if (command === '_agy-notice') { console.log(JSON.stringify(agyNotice(rest))); return; }
  if (command === '_enabled') {
    try {
      const { values, positional } = options(rest, ['--target']);
      const config = readConfig();
      const enabled = !positional.length && values['--target'] && Object.values(config.profiles).some(profile => profile.target === path.resolve(values['--target']) && profile.checks);
      console.log(JSON.stringify(Boolean(enabled)));
    } catch { console.log('false'); }
    return;
  }
  if (command === '_locked') {
    const [action, ...inner] = rest;
    if (action === 'apply') return withLock('check.lock', ['_locked', 'apply-checked', ...inner]);
    if (action === 'apply-checked') return await applyUpdate(inner);
    if (action === 'check') {
      console.log(JSON.stringify(await performCheck(readConfig())));
      return;
    }
    if (action === 'clear-cache') {
      requireCount(inner, 0, 'kitshift cache clear');
      const filename = path.join(home(), 'status.json');
      if (inspectDestination(filename)) fs.unlinkSync(filename);
      console.log('Cached check results cleared; profiles and installations unchanged.');
      return;
    }
    if (action === 'setup') return setup(inner);
    if (action === 'add' || action === 'edit') return profileMutation(action, inner);
    if (action === 'remove') {
      requireCount(inner, 1, 'kitshift profile remove NAME');
      const config = readConfig();
      if (!Object.hasOwn(config.profiles, inner[0])) fail(`Profile not found: ${inner[0]}`);
      delete config.profiles[inner[0]];
      saveConfig(config);
      console.log(`Removed profile ${inner[0]}; installed files unchanged.`);
      return;
    }
    fail('Unknown internal operation.');
  }
  if (command === '_check-lock') return withLock('check.lock', ['_locked', 'check']);
  if (command === '_check') {
    requireCount(rest, 1, 'kitshift _check --json');
    if (rest[0] !== '--json') fail('Expected --json.');
    console.log(JSON.stringify(check(readConfig())));
    return;
  }
  if (command === '_status') {
    const { values, positional } = options(rest.filter(arg => arg !== '--json'), ['--target']);
    if (rest.filter(arg => arg === '--json').length !== 1 || positional.length || !values['--target']) fail('Usage: kitshift _status --target DIR --json');
    console.log(JSON.stringify(statusResponse(readConfig(), null, path.resolve(values['--target']))));
    return;
  }
  if (command === 'status') {
    if (rest.length > 1) fail('Usage: kitshift status [NAME]');
    const config = readConfig();
    if (rest[0] && !Object.hasOwn(config.profiles, rest[0])) fail(`Profile not found: ${rest[0]}`);
    const state = sourceState();
    printStatus(statusResponse(config), rest[0] ?? null);
    if (state.error) console.log(state.detail);
    else console.log('Use kitshift update NAME --check to refresh the cache.');
    return;
  }
  if (command === 'cache') {
    if (rest.length !== 1 || rest[0] !== 'clear') fail('Usage: kitshift cache clear');
    return withLock('check.lock', ['_locked', 'clear-cache']);
  }
  if (command === 'update' && rest.includes('--check')) {
    const config = readConfig();
    const flags = rest.filter(arg => arg.startsWith('-'));
    const names = rest.filter(arg => !arg.startsWith('-'));
    if (flags.some(flag => !['--check', '--all', '--yes'].includes(flag)) || new Set(flags).size !== flags.length ||
        names.length > 1 || (names.length && flags.includes('--all'))) fail('Usage: kitshift update [NAME] [--all] [--check] [--yes]');
    const selected = selectedProfiles(config, names[0], flags.includes('--all'));
    if (!selected.length) { console.log('Cancelled; no installations changed.'); return; }
    const response = check(config);
    response.profiles = response.profiles.filter(profile => selected.includes(profile.name));
    printStatus(response);
    if (response.check.outcome !== 'ok') {
      const state = sourceState();
      if (state.error) console.log(state.detail);
      process.exitCode = response.check.outcome === 'busy' ? 75 : 1;
    }
    return;
  }
  if (command === 'update') return withLock('operation.lock', ['_locked', 'apply', ...rest]);
  if (command === 'shell-init') return shellInit(rest);
  if (command === 'run') return runNative(rest);
  if (command === 'setup') {
    options(rest, ['--bin-dir']);
    return withLock('operation.lock', ['_locked', 'setup', ...rest]);
  }
  if (command === 'profile') {
    const [action, ...inner] = rest;
    if (action === 'list') {
      requireCount(inner, 0, 'kitshift profile list');
      const config = readConfig();
      for (const [name, profile] of Object.entries(config.profiles).sort(([a], [b]) => a.localeCompare(b))) {
        console.log(`${name}\t${profile.harness}\t${profile.target}\tchecks ${profile.checks ? 'enabled' : 'disabled'}`);
      }
      return;
    }
    if (['add', 'edit', 'remove'].includes(action)) return withLock('operation.lock', ['_locked', action, ...inner]);
    fail('Usage: kitshift profile add|edit|list|remove');
  }
  fail(`Unknown command: ${command}`);
}

main(process.argv.slice(2)).catch(error => { console.error(`kitshift: ${error.message}`); process.exitCode = 1; });
