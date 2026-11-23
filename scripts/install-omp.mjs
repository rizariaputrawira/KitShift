#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  manifestName,
  fail,
  checkDirectoryChain,
  collectFiles,
  mcpBundleFile,
  readInstallSource,
  installBundle,
} from './install-common.mjs';

const repository = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const help = `Usage:
  node scripts/install-omp.mjs [--target DIR] [--dry-run] [--update]
    [--playwright-cli ABSOLUTE_JS_PATH --browser ABSOLUTE_EXECUTABLE_PATH]
    [--open-design-cli ABSOLUTE_JS_PATH]

Copies this repository's omp config, system guidance, skills, subagents, and
rendered MCP configuration. The default target is ~/.omp/agent. No symlinks are installed.

Without optional flags, only GitHub is configured. Select Playwright with both
paths; select local OpenDesign independently. JavaScript entry points must be
readable and the browser executable. Omitted integrations already installed
are retained only from hash-matching managed config. Node MCP commands use this
installer's Node executable. GitHub uses PATH-resolved gh authentication.

  --target DIR         Install into this agent directory (relative paths allowed).
  --dry-run            Preflight and show planned copies without writing anything.
  --update             Replace only files unchanged since a prior managed install.
  --playwright-cli P   Absolute path to Playwright MCP cli.js.
  --browser P          Absolute path to Chromium browser executable.
  --open-design-cli P  Absolute path to OpenDesign CLI od.mjs.
  --help, -h           Show this help.

Unmanaged differing files, user-edited managed files, and symlink destinations
are rejected before any changes. Identical files can be adopted. Files absent
from a newer bundle are left in place. The private ${manifestName} tracks hashes;
keep it for safe updates. Config, MCP config, and manifest permissions are 0600.
`;

function parseArgs(args) {
  const options = { target: path.join(os.homedir(), '.omp', 'agent') };
  const values = new Set(['--target', '--playwright-cli', '--browser', '--open-design-cli']);
  const switches = new Set(['--dry-run', '--update', '--help', '-h']);
  const seen = new Set();
  for (let index = 0; index < args.length; index++) {
    const argument = args[index];
    if (seen.has(argument)) fail(`Duplicate option: ${argument}`);
    seen.add(argument);
    if (argument === '-h') {
      options.help = true;
    } else if (switches.has(argument)) {
      options[argument.slice(2)] = true;
    } else if (values.has(argument)) {
      const value = args[++index];
      if (!value || value.startsWith('--')) fail(`Missing value for ${argument}. Use --help for usage.`);
      options[argument.slice(2)] = value;
    } else {
      fail(`Unknown option: ${argument}. Use --help for usage.`);
    }
  }


  return options;
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(help);
    return;
  }
  const target = path.resolve(options.target);
  checkDirectoryChain(target);
  const source = readInstallSource(repository);

  const files = new Map();
  collectFiles(path.join(repository, 'LICENSE'), 'LICENSE', files);
  files.get('LICENSE').mode = 0o644;
  collectFiles(path.join(repository, 'NOTICE'), 'NOTICE', files);
  files.get('NOTICE').mode = 0o644;
  collectFiles(path.join(repository, 'harnesses', 'omp', 'config.yml'), 'config.yml', files);
  files.get('config.yml').mode = 0o600;
  collectFiles(path.join(repository, 'guidance', 'APPEND_SYSTEM.md'), 'APPEND_SYSTEM.md', files);
  collectFiles(path.join(repository, 'skills'), 'skills', files);
  if (fs.existsSync(path.join(repository, 'harnesses', 'omp', 'agents'))) {
    collectFiles(path.join(repository, 'harnesses', 'omp', 'agents'), 'agents', files);
  }
  collectFiles(path.join(repository, 'harnesses', 'omp', 'extensions', 'kitshift-update.js'), 'extensions/kitshift-update.js', files);

  files.set('mcp.json', mcpBundleFile(path.join(repository, 'mcp', 'omp.json'), options, { target, tmpDir: os.tmpdir() }));
  const afterAssembly = readInstallSource(repository);
  if (source.revision !== afterAssembly.revision) source.revision = null;

  installBundle({
    target,
    files,
    source,
    update: options.update,
    dryRun: options['dry-run'],
    warning: 'Warning: this bundle preserves the current YOLO settings; review config.yml before using omp.',
  });
}

try {
  main();
} catch (error) {
  console.error(`kitshift: ${error.message}`);
  process.exitCode = 1;
}
