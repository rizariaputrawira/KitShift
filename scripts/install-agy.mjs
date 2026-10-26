#!/usr/bin/env node
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  manifestName,
  fail,
  checkDirectoryChain,
  validateLocalPath,
  collectFiles,
  readRegularFile,
  renderMcp,
  installBundle,
} from './install-common.mjs';

const repository = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const help = `Usage:
  node scripts/install-agy.mjs [--target DIR] [--dry-run] [--update]
    --playwright-cli ABSOLUTE_JS_PATH --browser ABSOLUTE_EXECUTABLE_PATH --open-design-cli ABSOLUTE_JS_PATH [--workspace-dir DIR]

Copies this repository's skills, plugin rules, subagents, and MCP configuration
into a native Antigravity CLI plugin bundle. The default target is
~/.gemini/config/plugins/kitshift. No symlinks are installed.

Every install, update, and dry run requires existing local paths for the three
MCP flags. JavaScript entry points must be readable; the browser must be
executable. Playwright, OpenDesign, LSP, Codegraph, and Filesystem are always included.

  --target DIR         Install into this plugin directory (relative paths allowed).
  --dry-run            Preflight and show planned copies without writing anything.
  --update             Replace only files unchanged since a prior managed install.
  --playwright-cli P   Required absolute path to Playwright MCP cli.js.
  --browser P          Required absolute path to Chromium browser executable.
  --open-design-cli P  Required absolute path to OpenDesign CLI od.mjs.
  --workspace-dir DIR  Workspace root(s) for filesystem MCP (optional, comma-separated allowed, defaults to cwd).
  --help, -h           Show this help.

Unmanaged differing files, user-edited managed files, and symlink destinations
are rejected before any changes. Identical files can be adopted. Files absent
from a newer bundle are left in place. The private ${manifestName} tracks hashes;
keep it for safe updates. Manifest and MCP config permissions are 0600.
`;

function parseArgs(args) {
  const options = { target: path.join(os.homedir(), '.gemini', 'config', 'plugins', 'kitshift') };
  const values = new Set(['--target', '--playwright-cli', '--browser', '--open-design-cli', '--workspace-dir']);
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

function renderAgyRule(sourcePath) {
  const source = readRegularFile(sourcePath).toString('utf8');
  const bytes = Buffer.byteLength(source, 'utf8');
  if (bytes > 24000) fail(`Rendered rules/AGENTS.md exceeds 24,000-byte cap: ${bytes} bytes`);
  return Buffer.from(source, 'utf8');
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(help);
    return;
  }
  const target = path.resolve(options.target);
  checkDirectoryChain(target);

  const files = new Map();

  const pluginJson = Buffer.from(`${JSON.stringify({
    name: 'kitshift',
    version: '0.1.0',
    description: 'KitShift portable coding-agent skills, working guidance, subagents, and MCP configuration.',
  }, null, 2)}\n`);
  files.set('plugin.json', { content: pluginJson, mode: 0o644 });

  const ruleContent = renderAgyRule(path.join(repository, 'guidance', 'APPEND_SYSTEM.md'));
  files.set('rules/AGENTS.md', { content: ruleContent, mode: 0o644 });

  collectFiles(path.join(repository, 'skills'), 'skills', files);
  collectFiles(path.join(repository, 'harnesses', 'agy', 'agents'), 'agents', files);

  const replacements = {
    '{{NODE}}': process.execPath,
    '{{PLAYWRIGHT_CLI}}': validateLocalPath('--playwright-cli', options['playwright-cli']),
    '{{BROWSER}}': validateLocalPath('--browser', options.browser, true),
    '{{OPEN_DESIGN_CLI}}': validateLocalPath('--open-design-cli', options['open-design-cli']),
    '{{PLAYWRIGHT_OUTPUT_DIR}}': path.join(target, 'cache', 'playwright-mcp'),
    '{{WORKSPACE_DIR}}': options['workspace-dir']
      ? (options['workspace-dir'].includes(',')
          ? options['workspace-dir'].split(',').map(d => d.trim()).filter(Boolean).map(d => validateLocalPath('--workspace-dir', d, false, true))
          : validateLocalPath('--workspace-dir', options['workspace-dir'], false, true))
      : process.cwd(),
  };
  files.set('mcp_config.json', {
    content: renderMcp(path.join(repository, 'mcp', 'agy.json'), replacements),
    mode: 0o600,
  });

  installBundle({
    target,
    files,
    update: options.update,
    dryRun: options['dry-run'],
  });
}

try {
  main();
} catch (error) {
  console.error(`kitshift: ${error.message}`);
  process.exitCode = 1;
}
