#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const help = `Usage:
  search grep <pattern> [--path <dir>] [--glob <pattern>] [--json]
  search glob <pattern> [--path <dir>] [--json]

Examples:
  search grep "renderMcp" --path scripts/
  search glob "*.mjs" --path scripts/
`;

const args = process.argv.slice(2);
const command = args[0];

if (!command || command === 'help' || command === '--help' || command === '-h') {
  console.log(help);
  process.exit(0);
}

function getOpt(flag) {
  const idx = args.indexOf(flag);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : null;
}

const targetPath = path.resolve(getOpt('--path') || process.cwd());
const asJson = args.includes('--json');

if (command === 'grep') {
  const pattern = args[1];
  if (!pattern) {
    console.error('Error: Search pattern is required. Usage: search grep <pattern>');
    process.exit(1);
  }
  const globFilter = getOpt('--glob');

  // Attempt using ripgrep if installed on host
  const rgCheck = spawnSync('which', ['rg'], { encoding: 'utf8' });
  if (rgCheck.status === 0) {
    const rgArgs = ['-n', '--no-heading', '--color=never'];
    if (globFilter) rgArgs.push('--glob', globFilter);
    rgArgs.push(pattern, targetPath);

    const run = spawnSync('rg', rgArgs, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
    const lines = (run.stdout || '').split('\n').filter(Boolean);
    const results = lines.map(line => {
      const parts = line.split(':');
      const file = parts[0];
      const lineNum = parseInt(parts[1], 10);
      const text = parts.slice(2).join(':');
      return { file: path.relative(process.cwd(), file), line: lineNum, text: text.trim() };
    });

    if (asJson) {
      console.log(JSON.stringify(results, null, 2));
    } else {
      for (const r of results) {
        console.log(`${r.file}:${r.line}: ${r.text}`);
      }
      console.log(`\nFound ${results.length} matches.`);
    }
  } else {
    // Pure Node fallback
    const results = [];
    const regex = new RegExp(pattern);

    function walk(dir) {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (entry.name === 'node_modules' || entry.name === '.git') continue;
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          walk(full);
        } else if (entry.isFile()) {
          if (globFilter && !entry.name.endsWith(globFilter.replace(/^\*/, ''))) continue;
          try {
            const content = fs.readFileSync(full, 'utf8');
            const lines = content.split('\n');
            lines.forEach((l, idx) => {
              if (regex.test(l)) {
                results.push({
                  file: path.relative(process.cwd(), full),
                  line: idx + 1,
                  text: l.trim(),
                });
              }
            });
          } catch {}
        }
      }
    }

    walk(targetPath);
    if (asJson) {
      console.log(JSON.stringify(results, null, 2));
    } else {
      for (const r of results) {
        console.log(`${r.file}:${r.line}: ${r.text}`);
      }
      console.log(`\nFound ${results.length} matches.`);
    }
  }
} else if (command === 'glob') {
  const pattern = args[1];
  if (!pattern) {
    console.error('Error: Glob pattern is required. Usage: search glob <pattern>');
    process.exit(1);
  }
  const regex = new RegExp('^' + pattern.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$');
  const results = [];

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.isFile() && regex.test(entry.name)) {
        results.push(path.relative(process.cwd(), full));
      }
    }
  }

  walk(targetPath);
  if (asJson) {
    console.log(JSON.stringify(results, null, 2));
  } else {
    for (const file of results) {
      console.log(file);
    }
    console.log(`\nFound ${results.length} files.`);
  }
} else {
  console.error(`Unknown command: ${command}\n\n${help}`);
  process.exit(1);
}
