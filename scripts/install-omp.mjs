#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const repository = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifestName = '.kitshift-manifest.json';
const help = `Usage:
  node scripts/install-omp.mjs [--target DIR] [--dry-run] [--update]
    --playwright-cli ABSOLUTE_JS_PATH --browser ABSOLUTE_EXECUTABLE_PATH
    --open-design-cli ABSOLUTE_JS_PATH

Copies this repository's omp config, system guidance, skills, and rendered MCP
configuration. The default target is ~/.omp/agent. No symlinks are installed.

All three MCP paths are required, including for updates and dry runs. Install
Playwright MCP, its Chromium browser, and OpenDesign separately, then pass their
existing local paths. JavaScript entry points must be readable; the browser must
be executable. Node MCP commands use this installer's Node executable. GitHub
keeps native PATH-resolved gh auth; no token is read or exported by this script.

  --target DIR         Install into this agent directory (relative paths allowed).
  --dry-run            Preflight and show planned copies without writing anything.
  --update             Replace only files unchanged since a prior managed install.
  --help               Show this help.

Unmanaged differing files, user-edited managed files, and symlink destinations
are rejected before any changes. Identical files can be adopted. Files absent
from a newer bundle are left in place. The private ${manifestName} tracks hashes;
keep it for safe updates. Config, MCP config, and manifest permissions are 0600.
`;

function fail(message) {
  throw new Error(message);
}

function parseArgs(args) {
  const options = { target: path.join(os.homedir(), '.omp', 'agent') };
  const values = new Set(['--target', '--playwright-cli', '--browser', '--open-design-cli']);
  const switches = new Set(['--dry-run', '--update', '--help']);
  const seen = new Set();
  for (let index = 0; index < args.length; index++) {
    const argument = args[index];
    if (seen.has(argument)) fail(`Duplicate option: ${argument}`);
    seen.add(argument);
    if (switches.has(argument)) {
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

function lstatIfPresent(filename) {
  try {
    return fs.lstatSync(filename);
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

// Check every component, including ancestors above the selected target. Never
// resolve destination symlinks: even an otherwise convenient home alias is unsafe.
function checkDirectoryChain(directory) {
  const absolute = path.resolve(directory);
  const root = path.parse(absolute).root;
  let current = root;
  for (const component of absolute.slice(root.length).split(path.sep).filter(Boolean)) {
    current = path.join(current, component);
    const stat = lstatIfPresent(current);
    if (!stat) continue;
    if (stat.isSymbolicLink()) fail(`Symlink directory is not allowed: ${current}`);
    if (!stat.isDirectory()) fail(`Expected a directory: ${current}`);
  }
}

function inspectDestination(filename) {
  checkDirectoryChain(path.dirname(filename));
  const stat = lstatIfPresent(filename);
  if (stat?.isSymbolicLink()) fail(`Symlink destination is not allowed: ${filename}`);
  if (stat && !stat.isFile()) fail(`Expected a regular destination file: ${filename}`);
  return stat;
}

function readRegularFile(filename) {
  const descriptor = fs.openSync(filename, fs.constants.O_RDONLY | fs.constants.O_NOFOLLOW);
  try {
    if (!fs.fstatSync(descriptor).isFile()) fail(`Expected a regular file: ${filename}`);
    return fs.readFileSync(descriptor);
  } finally {
    fs.closeSync(descriptor);
  }
}

function hash(content) {
  return crypto.createHash('sha256').update(content).digest('hex');
}

function validateLocalPath(flag, value, executable = false) {
  if (!value) fail(`Required option ${flag} is missing. Use --help for local MCP setup instructions.`);
  if (!path.isAbsolute(value)) fail(`${flag} must be an absolute local path: ${value}`);
  let stat;
  try {
    stat = fs.statSync(value);
    fs.accessSync(value, executable ? fs.constants.R_OK | fs.constants.X_OK : fs.constants.R_OK);
  } catch (error) {
    fail(`${flag} must name an existing ${executable ? 'readable, executable' : 'readable'} local file: ${value} (${error.code ?? error.message})`);
  }
  if (!stat.isFile()) fail(`${flag} must name a regular file: ${value}`);
  return value;
}

function collectFiles(source, destination, files) {
  const stat = fs.lstatSync(source);
  if (stat.isSymbolicLink()) fail(`Source symlinks are not supported: ${source}`);
  if (stat.isDirectory()) {
    for (const entry of fs.readdirSync(source).sort()) {
      collectFiles(path.join(source, entry), path.posix.join(destination, entry), files);
    }
  } else if (stat.isFile()) {
    files.set(destination, {
      content: readRegularFile(source),
      mode: stat.mode & 0o111 ? 0o755 : 0o644,
    });
  } else {
    fail(`Unsupported source file type: ${source}`);
  }
}

function renderMcp(replacements) {
  const source = readRegularFile(path.join(repository, 'mcp', 'omp.json')).toString('utf8');
  const used = new Set();
  const template = JSON.parse(source);
  function render(value) {
    if (typeof value === 'string') {
      if (Object.hasOwn(replacements, value)) {
        used.add(value);
        return replacements[value];
      }
      if (/\{\{[^{}]+\}\}/.test(value)) fail(`Unknown or embedded MCP template placeholder: ${value}`);
      return value;
    }
    if (Array.isArray(value)) return value.map(render);
    if (value && typeof value === 'object') {
      return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, render(item)]));
    }
    return value;
  }
  const rendered = render(template);
  for (const token of Object.keys(replacements)) {
    if (!used.has(token)) fail(`MCP template is missing required placeholder ${token}.`);
  }
  return Buffer.from(`${JSON.stringify(rendered, null, 2)}\n`);
}

function safeManifestPath(relative) {
  return relative.length > 0 && !relative.includes('\\') && !relative.includes('\0') &&
    !path.posix.isAbsolute(relative) && relative.split('/').every(part => part && part !== '.' && part !== '..') &&
    relative !== manifestName;
}

function loadManifest(filename) {
  if (!inspectDestination(filename)) return { version: 1, files: {} };
  let manifest;
  try {
    manifest = JSON.parse(readRegularFile(filename).toString('utf8'));
  } catch (error) {
    fail(`Cannot read private install manifest ${filename}: ${error.message}`);
  }
  if (!manifest || manifest.version !== 1 || !manifest.files ||
      typeof manifest.files !== 'object' || Array.isArray(manifest.files)) {
    fail(`Unsupported or invalid install manifest: ${filename}`);
  }
  for (const [relative, entry] of Object.entries(manifest.files)) {
    if (!safeManifestPath(relative) || !entry || typeof entry !== 'object' ||
        typeof entry.sha256 !== 'string' || !/^[a-f0-9]{64}$/.test(entry.sha256)) {
      fail(`Invalid managed-file entry in ${filename}: ${relative}`);
    }
  }
  return manifest;
}

function ensureDirectory(directory) {
  checkDirectoryChain(directory);
  fs.mkdirSync(directory, { recursive: true, mode: 0o700 });
  checkDirectoryChain(directory);
}

function writeAtomic(filename, content, mode) {
  ensureDirectory(path.dirname(filename));
  inspectDestination(filename);
  const temporary = path.join(path.dirname(filename), `.kitshift-${crypto.randomUUID()}.tmp`);
  let created = false;
  try {
    const descriptor = fs.openSync(temporary, fs.constants.O_WRONLY | fs.constants.O_CREAT |
      fs.constants.O_EXCL | fs.constants.O_NOFOLLOW, mode);
    created = true;
    try {
      fs.writeFileSync(descriptor, content);
      fs.fchmodSync(descriptor, mode);
    } finally {
      fs.closeSync(descriptor);
    }
    inspectDestination(filename);
    fs.renameSync(temporary, filename);
    created = false;
  } finally {
    if (created) fs.unlinkSync(temporary);
  }
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(help);
    return;
  }
  const target = path.resolve(options.target);
  checkDirectoryChain(target);
  const replacements = {
    '{{NODE}}': process.execPath,
    '{{PLAYWRIGHT_CLI}}': validateLocalPath('--playwright-cli', options['playwright-cli']),
    '{{BROWSER}}': validateLocalPath('--browser', options.browser, true),
    '{{OPEN_DESIGN_CLI}}': validateLocalPath('--open-design-cli', options['open-design-cli']),
    '{{PLAYWRIGHT_OUTPUT_DIR}}': path.join(target, 'cache', 'playwright-mcp'),
    '{{TMP_DIR}}': os.tmpdir(),
  };
  const files = new Map();
  collectFiles(path.join(repository, 'harnesses', 'omp', 'config.yml'), 'config.yml', files);
  files.get('config.yml').mode = 0o600;
  collectFiles(path.join(repository, 'guidance', 'APPEND_SYSTEM.md'), 'APPEND_SYSTEM.md', files);
  collectFiles(path.join(repository, 'skills'), 'skills', files);
  files.set('mcp.json', { content: renderMcp(replacements), mode: 0o600 });

  const manifestPath = path.join(target, manifestName);
  const previous = loadManifest(manifestPath);
  const nextFiles = Object.assign(Object.create(null), previous.files);
  const plan = [];
  const conflicts = [];
  // This entire loop is read-only. A conflict anywhere prevents all writes,
  // including directory creation, permission changes, and manifest adoption.
  for (const [relative, file] of files) {
    if (!safeManifestPath(relative)) fail(`Unsafe bundle path: ${relative}`);
    const filename = path.join(target, ...relative.split('/'));
    const desiredHash = hash(file.content);
    let stat;
    try {
      stat = inspectDestination(filename);
    } catch (error) {
      conflicts.push(error.message);
      continue;
    }
    let action = 'create';
    if (stat) {
      const existingHash = hash(readRegularFile(filename));
      if (existingHash === desiredHash) {
        action = (stat.mode & 0o777) === file.mode ? 'keep' : 'permissions';
      } else {
        const managed = Object.hasOwn(previous.files, relative) ? previous.files[relative] : null;
        if (!managed) {
          conflicts.push(`Unmanaged file differs: ${filename}`);
          continue;
        }
        if (existingHash !== managed.sha256) {
          conflicts.push(`Managed file has local edits; preserve or move it before reinstalling: ${filename}`);
          continue;
        }
        if (!options.update) {
          conflicts.push(`Managed file needs --update: ${filename}`);
          continue;
        }
        action = 'update';
      }
    }
    plan.push({ relative, filename, action, ...file });
    nextFiles[relative] = { sha256: desiredHash };
  }
  if (conflicts.length) fail(`Preflight refused installation; no files changed:\n  ${conflicts.join('\n  ')}`);

  const orderedFiles = Object.fromEntries(Object.entries(nextFiles).sort(([a], [b]) => a.localeCompare(b)));
  const manifestContent = Buffer.from(`${JSON.stringify({ version: 1, files: orderedFiles }, null, 2)}\n`);
  const manifestStat = inspectDestination(manifestPath);
  const manifestUnchanged = manifestStat && readRegularFile(manifestPath).equals(manifestContent) &&
    (manifestStat.mode & 0o777) === 0o600;

  console.log(`${options['dry-run'] ? 'Dry run' : 'Installing'}: ${target}`);
  console.log('Warning: this bundle preserves the current YOLO settings; review config.yml before using omp.');
  for (const file of plan) {
    if (file.action !== 'keep') console.log(`  ${file.action}: ${file.relative}`);
  }
  if (!manifestUnchanged) console.log(`  manage: ${manifestName} (0600)`);
  if (options['dry-run']) {
    console.log('Preflight complete. No files or directories written.');
    return;
  }
  for (const file of plan) {
    if (file.action === 'keep') continue;
    // Atomic replacement also applies permission-only changes without following
    // hard links or symlinks to another file. No user file is ever deleted.
    writeAtomic(file.filename, file.content, file.mode);
  }
  if (!manifestUnchanged) writeAtomic(manifestPath, manifestContent, 0o600);
  console.log(`Installed ${plan.length} managed files. No obsolete files removed.`);
}

try {
  main();
} catch (error) {
  console.error(`kitshift: ${error.message}`);
  process.exitCode = 1;
}
