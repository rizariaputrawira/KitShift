import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const target = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const started = new Set();

function command(node, cli, args, children) {
  return new Promise(resolve => {
    const child = spawn(node, [cli, ...args], { stdio: ['ignore', 'pipe', 'ignore'], detached: true });
    children.add(child);
    let output = '';
    child.stdout.on('data', chunk => { if (output.length < 65536) output += chunk.toString().slice(0, 65536 - output.length); });
    child.on('error', () => { children.delete(child); resolve(null); });
    child.on('close', code => {
      children.delete(child);
      try { resolve(code === 0 ? JSON.parse(output) : null); } catch { resolve(null); }
    });
  });
}

export default function kitshiftUpdate(pi) {
  let active = true;
  const children = new Set();
  const shown = new Set();
  pi.on('session_start', (_event, ctx) => {
    if (!active || ctx.mode !== 'tui' || !ctx.hasUI || ctx.sessionModes === undefined || started.has(target)) return;
    started.add(target);
    let source;
    try {
      source = JSON.parse(fs.readFileSync(path.join(target, '.kitshift-manifest.json'), 'utf8')).source;
      if (!source || !path.isAbsolute(source.repository) || !path.isAbsolute(source.node)) return;
      fs.accessSync(source.node, fs.constants.X_OK);
      fs.accessSync(path.join(source.repository, 'scripts', 'kitshift.mjs'), fs.constants.R_OK);
    } catch { return; }
    const cli = path.join(source.repository, 'scripts', 'kitshift.mjs');
    const show = (response, cached = false) => {
      const profile = response?.profiles?.find(item => item.target === target);
      if (!active || !profile?.message || !profile.candidateRevision || shown.has(profile.candidateRevision)) return;
      shown.add(profile.candidateRevision);
      ctx.ui.notify(cached && !profile.message.startsWith('Cached: ') ? `Cached: ${profile.message}` : profile.message, 'info');
    };
    void command(source.node, cli, ['_enabled', '--target', target], children).then(enabled => {
      if (!active || enabled !== true) return;
      return command(source.node, cli, ['_status', '--target', target, '--json'], children).then(cached => {
        if (!active) return;
        show(cached, true);
        return command(source.node, cli, ['_check', '--json'], children).then(response => show(response));
      });
    }).catch(() => {});
  });
  pi.on('session_shutdown', () => {
    active = false;
    for (const child of children) {
      try { process.kill(-child.pid, 'SIGTERM'); } catch { /* Child already exited. */ }
    }
    children.clear();
  });
}
