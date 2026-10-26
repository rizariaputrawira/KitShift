#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const help = `Usage:
  search grep <pattern> [--path <dir-or-file>] [--glob <pattern>] [--json]
  search glob <pattern> [--path <dir-or-file>] [--json]

Globs:
  Patterns without / match basenames at any depth; patterns with / match
  paths relative to --path. * and ? never cross /; ** as a whole path
  segment crosses directories (including zero directories). Character
  classes [a-z], [!a-z] and brace alternatives *.{js,ts} are supported.
  Escape literal glob characters with a backslash. Ripgrep grep searches
  retain its default hidden-file and ignore rules. Glob listing and the
  Node grep fallback exclude .git and node_modules directories but include
  other hidden and ignored files.

Examples:
  search grep "renderMcp" --path scripts/
  search glob "src/**/*.ts" --path .
`;

const args = process.argv.slice(2);
const command = args[0];

if (!command || command === 'help' || command === '--help' || command === '-h') {
  console.log(help);
  process.exit(0);
}

function globMatcher(pattern) {
  pattern = pattern.replace(/^\.\//, '');
  let index = 0;
  const literal = char => char.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');

  function sequence(inBrace = false) {
    let source = '';
    while (index < pattern.length) {
      const char = pattern[index];
      if (inBrace && (char === ',' || char === '}')) break;
      index++;
      if (char === '\\') {
        if (index === pattern.length) throw new Error('Trailing escape in glob pattern');
        source += literal(pattern[index++]);
      } else if (char === '*') {
        const start = index - 1;
        while (pattern[index] === '*') index++;
        const globstar = index - start > 1
          && (start === 0 || pattern[start - 1] === '/')
          && (index === pattern.length || pattern[index] === '/');
        if (globstar && pattern[index] === '/') {
          source += '(?:[^/]+/)*';
          index++;
        } else {
          source += globstar ? '.*' : '[^/]*';
        }
      } else if (char === '?') {
        source += '[^/]';
      } else if (char === '[') {
        let body = '';
        if (pattern[index] === '!' || pattern[index] === '^') {
          body = '^';
          index++;
        }
        if (pattern[index] === ']') {
          body += '\\]';
          index++;
        }
        while (index < pattern.length && pattern[index] !== ']') {
          const member = pattern[index++];
          if (member === '\\') {
            if (index === pattern.length) throw new Error('Trailing escape in glob character class');
            const escaped = pattern[index++];
            body += escaped === '-' ? '\\-' : literal(escaped);
          } else {
            body += member === '[' ? '\\[' : member;
          }
        }
        if (pattern[index] !== ']' || !body || body === '^') {
          throw new Error('Invalid glob character class');
        }
        index++;
        source += `(?!/)[${body}]`;
      } else if (char === '{') {
        const alternatives = [sequence(true)];
        while (pattern[index] === ',') {
          index++;
          alternatives.push(sequence(true));
        }
        if (pattern[index] !== '}' || alternatives.length < 2) {
          throw new Error('Invalid glob brace alternatives');
        }
        index++;
        source += `(?:${alternatives.join('|')})`;
      } else {
        source += literal(char);
      }
    }
    return source;
  }

  const regex = new RegExp(`^${sequence()}$`);
  const matchPath = pattern.includes('/');
  return relative => regex.test(matchPath ? relative.split(path.sep).join('/') : path.basename(relative));
}

function filesUnder(targetPath) {
  const files = [];
  function walk(full) {
    const info = fs.statSync(full);
    if (info.isFile()) {
      files.push(full);
    } else if (info.isDirectory()) {
      for (const entry of fs.readdirSync(full, { withFileTypes: true })) {
        if (entry.isDirectory() && (entry.name === 'node_modules' || entry.name === '.git')) continue;
        if (entry.isDirectory() || entry.isFile()) walk(path.join(full, entry.name));
      }
    } else {
      throw new Error(`Not a regular file or directory: ${full}`);
    }
  }
  walk(targetPath);
  return files;
}

function searchWithRipgrep(pattern, targetPath, matchesFile) {
  const run = spawnSync('rg', [
    '--no-config', '--json',
    '-e', pattern, '--', targetPath,
  ], { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
  if (run.error) {
    if (run.error.code === 'ENOENT') return null;
    throw run.error;
  }
  if (run.status !== 0 && run.status !== 1) {
    throw new Error(run.stderr.trim() || `ripgrep failed (${run.signal || run.status})`);
  }
  if (run.status === 1) return [];

  const decode = value => value.text ?? Buffer.from(value.bytes, 'base64').toString('utf8');
  const results = [];
  for (const line of run.stdout.split('\n').filter(Boolean)) {
    const event = JSON.parse(line);
    if (event.type !== 'match') continue;
    const file = decode(event.data.path);
    if (!matchesFile(file)) continue;
    results.push({
      file: path.relative(process.cwd(), file),
      line: event.data.line_number,
      text: decode(event.data.lines).trim(),
    });
  }
  return results;
}

try {
  if (command !== 'grep' && command !== 'glob') throw new Error(`Unknown command: ${command}\n\n${help}`);
  const pattern = args[1];
  if (!pattern) throw new Error(`${command === 'grep' ? 'Search' : 'Glob'} pattern is required`);
  let targetPath = process.cwd();
  let globFilter;
  let asJson = false;
  for (let index = 2; index < args.length; index++) {
    const option = args[index];
    if (option === '--json') {
      asJson = true;
    } else if (option === '--path' || (command === 'grep' && option === '--glob')) {
      const value = args[++index];
      if (!value || value.startsWith('--')) throw new Error(`Value required for ${option}`);
      if (option === '--path') targetPath = path.resolve(value);
      else globFilter = value;
    } else {
      throw new Error(`Unknown option: ${option}`);
    }
  }

  // Check the target even when the pattern produces no results.
  const targetInfo = fs.statSync(targetPath);
  if (!targetInfo.isFile() && !targetInfo.isDirectory()) {
    throw new Error(`Not a regular file or directory: ${targetPath}`);
  }
  const base = targetInfo.isDirectory() ? targetPath : path.dirname(targetPath);
  const matcher = command === 'glob' ? globMatcher(pattern) : globFilter ? globMatcher(globFilter) : () => true;
  const matchesFile = file => matcher(path.relative(base, file));
  let results;
  if (command === 'glob') {
    results = filesUnder(targetPath).filter(matchesFile).map(file => path.relative(process.cwd(), file));
  } else {
    results = searchWithRipgrep(pattern, targetPath, matchesFile);
    if (results === null) {
      const regex = new RegExp(pattern);
      results = [];
      for (const file of filesUnder(targetPath).filter(matchesFile)) {
        const lines = fs.readFileSync(file, 'utf8').split('\n');
        lines.forEach((text, index) => {
          if (regex.test(text)) {
            results.push({ file: path.relative(process.cwd(), file), line: index + 1, text: text.trim() });
          }
        });
      }
    }
  }

  if (asJson) {
    console.log(JSON.stringify(results, null, 2));
  } else {
    for (const result of results) {
      console.log(command === 'glob' ? result : `${result.file}:${result.line}: ${result.text}`);
    }
    console.log(`\nFound ${results.length} ${command === 'glob' ? 'files' : 'matches'}.`);
  }
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
}
