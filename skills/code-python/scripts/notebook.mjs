#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

const help = `Usage:
  notebook info <file.ipynb>
  notebook read <file.ipynb> [--cell <index>] [--json]
  notebook edit <file.ipynb> --cell <index> --source "<text>"
  notebook insert <file.ipynb> --at <index> --type <code|markdown> --source "<text>"
  notebook delete <file.ipynb> --cell <index>
  notebook clear-outputs <file.ipynb>

Examples:
  notebook info analysis.ipynb
  notebook read analysis.ipynb --cell 0
  notebook edit analysis.ipynb --cell 2 --source "import pandas as pd"
`;

const args = process.argv.slice(2);
const command = args[0];

if (!command || command === 'help' || command === '--help' || command === '-h') {
  console.log(help);
  process.exit(0);
}

const fileArg = args[1];
if (!fileArg) {
  console.error('Error: Notebook file path is required.\n\n' + help);
  process.exit(1);
}

const nbPath = path.resolve(fileArg);
if (!fs.existsSync(nbPath)) {
  console.error(`Error: Notebook not found: ${nbPath}`);
  process.exit(1);
}

function loadNotebook() {
  const nb = JSON.parse(fs.readFileSync(nbPath, 'utf8'));
  validateNotebook(nb);
  return nb;
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isText(value) {
  return typeof value === 'string' || (Array.isArray(value) && value.every(line => typeof line === 'string'));
}

function requireValid(condition, message) {
  if (!condition) throw new Error(`Invalid notebook: ${message}`);
}

function validateMimeBundle(data, context) {
  requireValid(isObject(data), `${context} must be an object.`);
  for (const [mime, value] of Object.entries(data)) {
    const jsonMime = /^application\/(?:[^/]+\+)?json$/.test(mime);
    requireValid(jsonMime || isText(value), `${context}.${mime} must contain text or JSON MIME data.`);
  }
}

// Check the supported v4 structures we read and write, not the entire external nbformat schema.
function validateNotebook(nb) {
  requireValid(isObject(nb) && nb.nbformat === 4 &&
    Number.isSafeInteger(nb.nbformat_minor) && nb.nbformat_minor >= 0,
  'expected nbformat 4 with a nonnegative integer minor version.');
  requireValid(isObject(nb.metadata), 'metadata must be an object.');
  requireValid(Array.isArray(nb.cells), 'cells must be an array.');
  const ids = new Set();
  nb.cells.forEach((cell, index) => {
    const context = `cell ${index}`;
    requireValid(isObject(cell) && ['code', 'markdown', 'raw'].includes(cell.cell_type),
      `${context} must have a supported cell_type (code, markdown, or raw).`);
    requireValid(isObject(cell.metadata), `${context} metadata must be an object.`);
    requireValid(isText(cell.source), `${context} source must be a string or an array of strings.`);
    if (nb.nbformat_minor >= 5 || Object.hasOwn(cell, 'id')) {
      requireValid(typeof cell.id === 'string' && /^[A-Za-z0-9_-]{1,64}$/.test(cell.id) && !ids.has(cell.id),
        `${context} requires a unique cell ID of 1-64 letters, digits, hyphens, or underscores.`);
      ids.add(cell.id);
    }
    if (cell.cell_type !== 'code') {
      requireValid(!Object.hasOwn(cell, 'outputs') && !Object.hasOwn(cell, 'execution_count'),
        `${context} ${cell.cell_type} cells cannot have code outputs or execution counts.`);
      if (Object.hasOwn(cell, 'attachments')) {
        requireValid(isObject(cell.attachments), `${context} attachments must be an object.`);
        for (const bundle of Object.values(cell.attachments)) {
          validateMimeBundle(bundle, `${context} attachment`);
        }
      }
      return;
    }
    requireValid(!Object.hasOwn(cell, 'attachments'), `${context} code cells cannot have attachments.`);
    requireValid(cell.execution_count === null ||
      (Number.isSafeInteger(cell.execution_count) && cell.execution_count >= 0),
    `${context} execution_count must be null or a nonnegative integer.`);
    requireValid(Array.isArray(cell.outputs), `${context} outputs must be an array.`);
    cell.outputs.forEach((output, outputIndex) => {
      const label = `${context} output ${outputIndex}`;
      requireValid(isObject(output), `${label} must be an object.`);
      switch (output.output_type) {
        case 'stream':
          requireValid(['stdout', 'stderr'].includes(output.name) && isText(output.text),
            `${label} stream requires a stdout/stderr name and text.`);
          break;
        case 'display_data':
        case 'execute_result':
          validateMimeBundle(output.data, `${label} data`);
          requireValid(isObject(output.metadata), `${label} metadata must be an object.`);
          if (output.output_type === 'execute_result') {
            requireValid(Number.isSafeInteger(output.execution_count) && output.execution_count >= 0,
              `${label} execution_count must be a nonnegative integer.`);
          }
          break;
        case 'error':
          requireValid(typeof output.ename === 'string' && typeof output.evalue === 'string' &&
            Array.isArray(output.traceback) && output.traceback.every(line => typeof line === 'string'),
          `${label} error requires ename, evalue, and a string traceback array.`);
          break;
        default:
          throw new Error(`Invalid notebook: ${label} has an unsupported output_type.`);
      }
    });
  });
}

function saveNotebook(nb) {
  validateNotebook(nb);
  const mode = fs.statSync(nbPath).mode & 0o7777;
  const tmp = `${nbPath}.${randomUUID()}.tmp`;
  try {
    fs.writeFileSync(tmp, JSON.stringify(nb, null, 1) + '\n', { encoding: 'utf8', mode, flag: 'wx' });
    fs.chmodSync(tmp, mode);
    fs.renameSync(tmp, nbPath);
  } finally {
    fs.rmSync(tmp, { force: true });
  }
}

function getOpt(flag) {
  const idx = args.indexOf(flag);
  if (idx === -1) return null;
  if (idx + 1 >= args.length) throw new Error(`${flag} requires a value.`);
  return args[idx + 1];
}

function cellIndex(value, length, allowEnd = false) {
  if (!/^\d+$/.test(value) || !Number.isSafeInteger(Number(value))) {
    throw new Error(`Cell index must be a complete nonnegative integer, received ${JSON.stringify(value)}.`);
  }
  const index = Number(value);
  if (index >= length + (allowEnd ? 1 : 0)) {
    throw new Error(`Cell index ${index} out of range for ${length} cells.`);
  }
  return index;
}

function sourceLines(source) {
  return source.split('\n').map((line, index, lines) => index === lines.length - 1 ? line : line + '\n');
}

function newCellId(cells) {
  const ids = new Set(cells.map(cell => cell.id));
  let id;
  do {
    id = randomUUID();
  } while (ids.has(id));
  return id;
}

try {

switch (command) {
  case 'info': {
    const nb = loadNotebook();
    const cells = nb.cells || [];
    console.log(`Notebook: ${path.relative(process.cwd(), nbPath)}`);
    console.log(`nbformat: v${nb.nbformat}.${nb.nbformat_minor}`);
    console.log(`Kernel: ${nb.metadata?.kernelspec?.display_name || 'default'}`);
    console.log(`Total Cells: ${cells.length}`);
    cells.forEach((cell, idx) => {
      const srcLines = Array.isArray(cell.source) ? cell.source : (cell.source || '').split('\n');
      const snippet = (srcLines[0] || '').slice(0, 50).trim();
      console.log(`  [${String(idx).padStart(2)}] ${cell.cell_type.padEnd(8)}: ${snippet}${snippet.length >= 50 ? '...' : ''}`);
    });
    break;
  }
  case 'read': {
    const nb = loadNotebook();
    const cells = nb.cells || [];
    const cellIdxStr = getOpt('--cell');
    const asJson = args.includes('--json');

    if (cellIdxStr !== null) {
      const idx = cellIndex(cellIdxStr, cells.length);
      const cell = cells[idx];
      if (asJson) {
        console.log(JSON.stringify(cell, null, 2));
      } else {
        const src = Array.isArray(cell.source) ? cell.source.join('') : cell.source;
        console.log(`=== Cell [${idx}] (${cell.cell_type}) ===\n${src}`);
      }
    } else {
      if (asJson) {
        console.log(JSON.stringify(cells, null, 2));
      } else {
        cells.forEach((cell, idx) => {
          const src = Array.isArray(cell.source) ? cell.source.join('') : cell.source;
          console.log(`\n--- Cell [${idx}] (${cell.cell_type}) ---`);
          console.log(src);
        });
      }
    }
    break;
  }
  case 'edit': {
    const nb = loadNotebook();
    const cells = nb.cells || [];
    const cellIdxStr = getOpt('--cell');
    const source = getOpt('--source');

    if (cellIdxStr === null || source === null) {
      console.error('Error: --cell and --source are required for edit.');
      process.exit(1);
    }
    const idx = cellIndex(cellIdxStr, cells.length);
    const lines = sourceLines(source);
    cells[idx].source = lines;
    if (cells[idx].cell_type === 'code') {
      cells[idx].outputs = [];
      cells[idx].execution_count = null;
    }
    saveNotebook(nb);
    console.log(`Cell [${idx}] updated successfully.`);
    break;
  }
  case 'insert': {
    const nb = loadNotebook();
    const cells = nb.cells || [];
    const atStr = getOpt('--at');
    const type = getOpt('--type') ?? 'code';
    const source = getOpt('--source') ?? '';
    if (!['code', 'markdown'].includes(type)) {
      throw new Error(`Unsupported inserted cell type ${JSON.stringify(type)}; expected code or markdown.`);
    }
    const at = atStr !== null ? cellIndex(atStr, cells.length, true) : cells.length;

    const lines = sourceLines(source);
    const newCell = {
      cell_type: type,
      metadata: {},
      source: lines,
    };
    if (nb.nbformat_minor >= 5) newCell.id = newCellId(cells);
    if (type === 'code') {
      newCell.execution_count = null;
      newCell.outputs = [];
    }
    cells.splice(at, 0, newCell);
    saveNotebook(nb);
    console.log(`Cell inserted at index [${at}] (${type}).`);
    break;
  }
  case 'delete': {
    const nb = loadNotebook();
    const cells = nb.cells || [];
    const cellIdxStr = getOpt('--cell');
    if (cellIdxStr === null) {
      console.error('Error: --cell is required for delete.');
      process.exit(1);
    }
    const idx = cellIndex(cellIdxStr, cells.length);
    cells.splice(idx, 1);
    saveNotebook(nb);
    console.log(`Cell [${idx}] deleted.`);
    break;
  }
  case 'clear-outputs': {
    const nb = loadNotebook();
    const cells = nb.cells || [];
    cells.forEach(cell => {
      if (cell.cell_type === 'code') {
        cell.outputs = [];
        cell.execution_count = null;
      }
    });
    saveNotebook(nb);
    console.log(`Outputs cleared for ${cells.length} cells.`);
    break;
  }
  default:
    console.error(`Unknown command: ${command}\n\n${help}`);
    process.exit(1);
}
} catch (err) {
  console.error(`Error: ${err.message}`);
  process.exitCode = 1;
}
