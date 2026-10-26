#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

function findWorkspaceRoot(startDir = process.cwd()) {
  let current = path.resolve(startDir);
  while (true) {
    if (fs.existsSync(path.join(current, '.git')) || fs.existsSync(path.join(current, '.workflow'))) {
      return current;
    }
    const parent = path.dirname(current);
    if (parent === current) return process.cwd();
    current = parent;
  }
}

const root = findWorkspaceRoot();
const workflowDir = path.join(root, '.workflow');
const tasksFile = path.join(workflowDir, 'tasks.json');

function ensureStore() {
  if (!fs.existsSync(workflowDir)) {
    fs.mkdirSync(workflowDir, { recursive: true, mode: 0o700 });
  }
  if (!fs.existsSync(tasksFile)) {
    fs.writeFileSync(tasksFile, JSON.stringify({ version: 1, tasks: [] }, null, 2) + '\n', { mode: 0o600 });
  }
}

function loadStore() {
  ensureStore();
  try {
    return JSON.parse(fs.readFileSync(tasksFile, 'utf8'));
  } catch (err) {
    return { version: 1, tasks: [] };
  }
}

function saveStore(store) {
  ensureStore();
  const tmp = `${tasksFile}.${Date.now()}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(store, null, 2) + '\n', { mode: 0o600 });
  fs.renameSync(tmp, tasksFile);
}

const help = `Usage:
  todo <command> [arguments]

Commands:
  list [--json]                        List all tasks and their statuses
  add <title> [--desc <text>]          Add a new task
  update <id> --status <status>        Update task status (pending, in_progress, completed, blocked)
              [--evidence <path>]      Optional evidence path or reference
  remove <id>                          Remove a task
  clear                                Clear all tasks
  help                                 Show this help
`;

const args = process.argv.slice(2);
const command = args[0] || 'list';

switch (command) {
  case 'list': {
    const store = loadStore();
    const asJson = args.includes('--json');
    if (asJson) {
      console.log(JSON.stringify(store.tasks, null, 2));
    } else {
      if (store.tasks.length === 0) {
        console.log('No tasks found. Use "todo add <title>" to create one.');
      } else {
        console.log('\nID   Status         Title');
        console.log('---  -------------  ----------------------------------------');
        for (const t of store.tasks) {
          const statusBadge = t.status === 'completed' ? '✓ completed  ' :
                              t.status === 'in_progress' ? '► in_progress' :
                              t.status === 'blocked' ? '✗ blocked    ' : '○ pending    ';
          console.log(`${String(t.id).padEnd(5)}${statusBadge}  ${t.title}`);
          if (t.evidence) console.log(`     └─ Evidence: ${t.evidence}`);
        }
        console.log('');
      }
    }
    break;
  }
  case 'add': {
    const title = args[1];
    if (!title) {
      console.error('Error: Task title is required. Usage: todo add <title> [--desc <text>]');
      process.exitCode = 1;
      break;
    }
    let description = '';
    const descIdx = args.indexOf('--desc');
    if (descIdx !== -1 && args[descIdx + 1]) {
      description = args[descIdx + 1];
    }
    const store = loadStore();
    const nextId = store.tasks.reduce((max, t) => Math.max(max, t.id), 0) + 1;
    const newTask = {
      id: nextId,
      title,
      description,
      status: 'pending',
      evidence: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    store.tasks.push(newTask);
    saveStore(store);
    console.log(`Task #${nextId} created: "${title}" [pending]`);
    break;
  }
  case 'update': {
    const id = parseInt(args[1], 10);
    if (isNaN(id)) {
      console.error('Error: Valid task ID is required. Usage: todo update <id> --status <status>');
      process.exitCode = 1;
      break;
    }
    const statusIdx = args.indexOf('--status');
    const status = statusIdx !== -1 ? args[statusIdx + 1] : null;
    const validStatuses = ['pending', 'in_progress', 'completed', 'blocked'];
    if (!status || !validStatuses.includes(status)) {
      console.error(`Error: --status must be one of: ${validStatuses.join(', ')}`);
      process.exitCode = 1;
      break;
    }
    const evidenceIdx = args.indexOf('--evidence');
    const evidence = evidenceIdx !== -1 ? args[evidenceIdx + 1] : null;

    const store = loadStore();
    const task = store.tasks.find(t => t.id === id);
    if (!task) {
      console.error(`Error: Task #${id} not found.`);
      process.exitCode = 1;
      break;
    }
    task.status = status;
    task.updated_at = new Date().toISOString();
    if (evidence !== null) task.evidence = evidence;
    saveStore(store);
    console.log(`Task #${id} updated: status=${status}`);
    break;
  }
  case 'remove': {
    const id = parseInt(args[1], 10);
    if (isNaN(id)) {
      console.error('Error: Valid task ID is required.');
      process.exitCode = 1;
      break;
    }
    const store = loadStore();
    const initLen = store.tasks.length;
    store.tasks = store.tasks.filter(t => t.id !== id);
    if (store.tasks.length === initLen) {
      console.error(`Error: Task #${id} not found.`);
      process.exitCode = 1;
      break;
    }
    saveStore(store);
    console.log(`Task #${id} removed.`);
    break;
  }
  case 'clear': {
    saveStore({ version: 1, tasks: [] });
    console.log('Task list cleared.');
    break;
  }
  case 'help':
  case '--help':
  case '-h': {
    console.log(help);
    break;
  }
  default:
    console.error(`Unknown command: ${command}\n\n${help}`);
    process.exitCode = 1;
}
