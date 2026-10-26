#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

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
  try {
    return JSON.parse(fs.readFileSync(nbPath, 'utf8'));
  } catch (err) {
    console.error(`Error parsing notebook JSON: ${err.message}`);
    process.exit(1);
  }
}

function saveNotebook(nb) {
  const tmp = `${nbPath}.${Date.now()}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(nb, null, 1) + '\n', 'utf8');
  fs.renameSync(tmp, nbPath);
}

function getOpt(flag) {
  const idx = args.indexOf(flag);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : null;
}

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
      const idx = parseInt(cellIdxStr, 10);
      if (idx < 0 || idx >= cells.length) {
        console.error(`Error: Cell index ${idx} out of range (0-${cells.length - 1})`);
        process.exit(1);
      }
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
    const idx = parseInt(cellIdxStr, 10);
    if (idx < 0 || idx >= cells.length) {
      console.error(`Error: Cell index ${idx} out of range.`);
      process.exit(1);
    }
    const lines = source.split('\n').map((l, i, arr) => i === arr.length - 1 ? l : l + '\n');
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
    const type = getOpt('--type') || 'code';
    const source = getOpt('--source') || '';

    let at = atStr !== null ? parseInt(atStr, 10) : cells.length;
    if (isNaN(at) || at < 0 || at > cells.length) at = cells.length;

    const lines = source.split('\n').map((l, i, arr) => i === arr.length - 1 ? l : l + '\n');
    const newCell = {
      cell_type: type,
      metadata: {},
      source: lines,
    };
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
    const idx = parseInt(cellIdxStr, 10);
    if (idx < 0 || idx >= cells.length) {
      console.error(`Error: Cell index ${idx} out of range.`);
      process.exit(1);
    }
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
