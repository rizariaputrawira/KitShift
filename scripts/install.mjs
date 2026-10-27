#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repository = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const help = `Usage:
  node scripts/install.mjs <omp|agy> [options]

One kit. Any harness. Installs KitShift skills, guidance, subagents, and MCP
configurations into your target harness.

Supported harnesses:
  omp     Install into Oh My Pi agent directory (~/.omp/agent)
  agy     Install as native Antigravity CLI plugin (~/.gemini/config/plugins/kitshift)

Examples:
  node scripts/install.mjs omp --help
  node scripts/install.mjs agy --help
  node scripts/install.mjs agy --dry-run --playwright-cli /path/to/cli.js --browser /path/to/chromium --open-design-cli /path/to/od.mjs
  node scripts/install.mjs agy --playwright-cli /path/to/cli.js --browser /path/to/chromium --open-design-cli /path/to/od.mjs
`;

const args = process.argv.slice(2);
const harness = args[0];

if (!harness || harness === '--help' || harness === '-h') {
  console.log(help);
  process.exit(0);
}

const forwardArgs = args.slice(1);
let targetScript;

if (harness === 'omp') {
  targetScript = path.join(repository, 'scripts', 'install-omp.mjs');
} else if (harness === 'agy') {
  targetScript = path.join(repository, 'scripts', 'install-agy.mjs');
} else {
  console.error(`kitshift: Unsupported harness "${harness}". Supported harnesses: omp, agy.`);
  console.error('Use "node scripts/install.mjs --help" for usage.');
  process.exit(1);
}

const child = spawnSync(process.execPath, [targetScript, ...forwardArgs], {
  stdio: 'inherit',
});

process.exit(child.status ?? 1);
