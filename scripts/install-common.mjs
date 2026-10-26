import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

export const manifestName = '.kitshift-manifest.json';

export function fail(message) {
  throw new Error(message);
}

export function lstatIfPresent(filename) {
  try {
    return fs.lstatSync(filename);
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

// Check every component, including ancestors above the selected target. Never
// resolve destination symlinks: even an otherwise convenient home alias is unsafe.
export function checkDirectoryChain(directory) {
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

export function inspectDestination(filename) {
  checkDirectoryChain(path.dirname(filename));
  const stat = lstatIfPresent(filename);
  if (stat?.isSymbolicLink()) fail(`Symlink destination is not allowed: ${filename}`);
  if (stat && !stat.isFile()) fail(`Expected a regular destination file: ${filename}`);
  return stat;
}

export function readRegularFile(filename) {
  const descriptor = fs.openSync(filename, fs.constants.O_RDONLY | fs.constants.O_NOFOLLOW);
  try {
    if (!fs.fstatSync(descriptor).isFile()) fail(`Expected a regular file: ${filename}`);
    return fs.readFileSync(descriptor);
  } finally {
    fs.closeSync(descriptor);
  }
}

export function hash(content) {
  return crypto.createHash('sha256').update(content).digest('hex');
}

export function validateLocalPath(flag, value, executable = false) {
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

export function collectFiles(source, destination, files) {
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

export function renderMcp(templatePath, replacements) {
  const source = readRegularFile(templatePath).toString('utf8');
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

export function safeManifestPath(relative) {
  return relative.length > 0 && !relative.includes('\\') && !relative.includes('\0') &&
    !path.posix.isAbsolute(relative) && relative.split('/').every(part => part && part !== '.' && part !== '..') &&
    relative !== manifestName;
}

export function loadManifest(filename) {
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

export function ensureDirectory(directory) {
  checkDirectoryChain(directory);
  fs.mkdirSync(directory, { recursive: true, mode: 0o700 });
  checkDirectoryChain(directory);
}

export function writeAtomic(filename, content, mode) {
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

export function installBundle({ target, files, update = false, dryRun = false, warning = null }) {
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
        if (!update) {
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

  console.log(`${dryRun ? 'Dry run' : 'Installing'}: ${target}`);
  if (warning) console.log(warning);
  for (const file of plan) {
    if (file.action !== 'keep') console.log(`  ${file.action}: ${file.relative}`);
  }
  if (!manifestUnchanged) console.log(`  manage: ${manifestName} (0600)`);
  if (dryRun) {
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
