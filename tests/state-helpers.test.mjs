import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, readdir, rm, stat, chmod } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const todoScript = fileURLToPath(new URL('../skills/workflow-todo/scripts/todo.mjs', import.meta.url));
const notebookScript = fileURLToPath(new URL('../skills/code-python/scripts/notebook.mjs', import.meta.url));

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'kitshift-state-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const workflow = join(root, '.workflow');
  await mkdir(workflow);
  const book = join(root, 'analysis.ipynb');
  const tasks = join(workflow, 'tasks.json');
  const run = (script, args) => spawnSync(process.execPath, [script, ...args], { cwd: root, encoding: 'utf8' });
  const todo = (...args) => run(todoScript, args);
  const notebook = (command, ...args) => run(notebookScript, [command, book, ...args]);
  const success = result => assert.equal(result.status, 0, result.stderr || result.stdout);
  const failure = result => {
    assert.equal(result.status, 1, result.stderr || result.stdout);
    assert.match(result.stderr, /Error:/);
    assert.doesNotMatch(result.stderr, /\n\s+at /);
  };
  return { root, workflow, book, tasks, todo, notebook, success, failure };
}

function validNotebook(minor = 5) {
  const nb = {
    nbformat: 4,
    nbformat_minor: minor,
    metadata: { kernelspec: { display_name: 'Python 3', language: 'python', name: 'python3' }, custom: ['keep'] },
    cells: [
      {
        id: 'existing-code',
        cell_type: 'code',
        metadata: { tags: ['keep-code'] },
        source: 'print("kept")\n',
        execution_count: 2,
        outputs: [
          { output_type: 'stream', name: 'stdout', text: ['kept\n'] },
          { output_type: 'display_data', data: { 'text/plain': ['kept'], 'application/json': { value: 1 } }, metadata: {} },
          { output_type: 'execute_result', execution_count: 2, data: { 'text/plain': '2' }, metadata: {} },
          { output_type: 'error', ename: 'ValueError', evalue: 'example', traceback: ['example traceback'] },
        ],
      },
      {
        id: 'existing-markdown',
        cell_type: 'markdown',
        metadata: { tags: ['keep-markdown'] },
        source: ['# Heading\n', 'Text'],
        attachments: { 'image.png': { 'image/png': 'aGVsbG8=' } },
      },
      { id: 'existing-raw', cell_type: 'raw', metadata: {}, source: '' },
    ],
  };
  if (minor < 5) nb.cells.forEach(cell => delete cell.id);
  return nb;
}

async function writeNotebook(f, nb = validNotebook()) {
  const bytes = JSON.stringify(nb, null, 2) + '\n';
  await writeFile(f.book, bytes);
  return bytes;
}

test('todo initializes an absent store and preserves valid task state', async t => {
  const f = await fixture(t);
  f.success(f.todo('add', 'Keep this task', '--desc', 'Description'));
  const store = JSON.parse(await readFile(f.tasks, 'utf8'));
  assert.equal(store.version, 1);
  assert.equal(store.tasks.length, 1);
  assert.equal(store.tasks[0].id, 1);
  assert.equal(store.tasks[0].title, 'Keep this task');
  f.success(f.todo('update', '1', '--status', 'completed'));
  assert.equal(JSON.parse(await readFile(f.tasks, 'utf8')).tasks[0].status, 'completed');
  f.success(f.todo('clear'));
  assert.deepEqual(JSON.parse(await readFile(f.tasks, 'utf8')), { version: 1, tasks: [] });
});

test('todo rejects malformed JSON and unsupported store structures without overwriting', async t => {
  const f = await fixture(t);
  const task = { id: 1, title: 'Keep', status: 'pending' };
  const contents = [
    '{broken JSON\n',
    'null\n',
    JSON.stringify({ version: 2, tasks: [] }),
    JSON.stringify({ version: 1, tasks: {} }),
    JSON.stringify({ version: 1, tasks: [null] }),
    JSON.stringify({ version: 1, tasks: [{ ...task, id: '1' }] }),
    JSON.stringify({ version: 1, tasks: [{ ...task, status: 'unknown' }] }),
    JSON.stringify({ version: 1, tasks: [task, task] }),
  ];
  for (const bytes of contents) {
    await writeFile(f.tasks, bytes);
    for (const args of [['list'], ['add', 'Do not overwrite'], ['clear']]) {
      f.failure(f.todo(...args));
      assert.equal(await readFile(f.tasks, 'utf8'), bytes);
      assert.deepEqual(await readdir(f.workflow), ['tasks.json']);
    }
  }
});

test('todo fails on an unreadable store path rather than replacing it', async t => {
  const f = await fixture(t);
  await mkdir(f.tasks);
  const marker = join(f.tasks, 'keep');
  await writeFile(marker, 'unchanged');
  for (const args of [['add', 'Do not overwrite'], ['clear']]) {
    f.failure(f.todo(...args));
    assert.equal(await readFile(marker, 'utf8'), 'unchanged');
    assert.deepEqual(await readdir(f.workflow), ['tasks.json']);
  }
});

test('notebook rejects incomplete, negative, fractional, and out-of-range selectors without writes', async t => {
  const f = await fixture(t);
  const bytes = await writeNotebook(f);
  const invalid = ['banana', '1junk', '1.5', '-1', '1e0', '+1', ' 1', '', '9007199254740993', '4'];
  for (const selector of invalid) {
    for (const [command, args] of [
      ['read', ['--cell', selector]],
      ['edit', ['--cell', selector, '--source', 'changed']],
      ['delete', ['--cell', selector]],
      ['insert', ['--at', selector, '--type', 'code', '--source', 'changed']],
    ]) {
      f.failure(f.notebook(command, ...args));
      assert.equal(await readFile(f.book, 'utf8'), bytes);
      assert.deepEqual((await readdir(f.root)).sort(), ['.workflow', 'analysis.ipynb']);
    }
  }
  for (const command of ['read', 'edit', 'delete']) {
    const args = ['--cell', '3'];
    if (command === 'edit') args.push('--source', 'changed');
    f.failure(f.notebook(command, ...args));
    assert.equal(await readFile(f.book, 'utf8'), bytes);
  }
  for (const [command, args] of [
    ['read', ['--cell']],
    ['edit', ['--cell', '0', '--source']],
    ['delete', ['--cell']],
    ['insert', ['--at']],
  ]) {
    f.failure(f.notebook(command, ...args));
    assert.equal(await readFile(f.book, 'utf8'), bytes);
  }
});

test('notebook rejects unsupported inserted types without writes', async t => {
  const f = await fixture(t);
  const bytes = await writeNotebook(f);
  for (const type of ['raw', 'unknown', 'CODE', '']) {
    f.failure(f.notebook('insert', '--at', '0', '--type', type, '--source', 'changed'));
    assert.equal(await readFile(f.book, 'utf8'), bytes);
  }
});

test('notebook inserts valid unique v4.5 IDs while preserving existing cells, metadata, and permissions', async t => {
  const f = await fixture(t);
  const original = validNotebook();
  await writeNotebook(f, original);
  await chmod(f.book, 0o640);
  f.success(f.notebook('insert', '--at', '0', '--type', 'code', '--source', 'first\nsecond\n'));
  f.success(f.notebook('insert', '--at', '4', '--type', 'markdown', '--source', ''));
  const nb = JSON.parse(await readFile(f.book, 'utf8'));
  assert.equal(nb.nbformat, 4);
  assert.equal(nb.nbformat_minor, 5);
  assert.deepEqual(nb.metadata, original.metadata);
  assert.deepEqual(nb.cells.slice(1, 4), original.cells);
  assert.equal(new Set(nb.cells.map(cell => cell.id)).size, nb.cells.length);
  for (const cell of nb.cells) assert.match(cell.id, /^[A-Za-z0-9_-]{1,64}$/);
  assert.deepEqual(nb.cells[0].source, ['first\n', 'second\n', '']);
  assert.deepEqual(nb.cells[0].metadata, {});
  assert.deepEqual(nb.cells[0].outputs, []);
  assert.equal(nb.cells[0].execution_count, null);
  assert.deepEqual(nb.cells[4].source, ['']);
  assert.deepEqual(nb.cells[4].metadata, {});
  assert.equal(Object.hasOwn(nb.cells[4], 'outputs'), false);
  assert.equal(Object.hasOwn(nb.cells[4], 'execution_count'), false);
  assert.equal((await stat(f.book)).mode & 0o777, 0o640);
  assert.deepEqual((await readdir(f.root)).sort(), ['.workflow', 'analysis.ipynb']);
});

test('notebook empty and multiline edits retain metadata and reset edited code execution state', async t => {
  const f = await fixture(t);
  const original = validNotebook();
  await writeNotebook(f, original);
  f.success(f.notebook('edit', '--cell', '0', '--source', ''));
  let nb = JSON.parse(await readFile(f.book, 'utf8'));
  assert.deepEqual(nb.cells[0].source, ['']);
  assert.deepEqual(nb.cells[0].outputs, []);
  assert.equal(nb.cells[0].execution_count, null);
  assert.deepEqual(nb.cells[0].metadata, original.cells[0].metadata);
  assert.deepEqual(nb.cells.slice(1), original.cells.slice(1));
  f.success(f.notebook('edit', '--cell', '1', '--source', 'alpha\nbeta\n'));
  nb = JSON.parse(await readFile(f.book, 'utf8'));
  assert.deepEqual(nb.cells[1].source, ['alpha\n', 'beta\n', '']);
  assert.deepEqual(nb.cells[1].attachments, original.cells[1].attachments);
  assert.deepEqual(nb.metadata, original.metadata);
  const result = f.notebook('read', '--cell', '1', '--json');
  f.success(result);
  assert.deepEqual(JSON.parse(result.stdout), nb.cells[1]);
});

test('notebook supports older v4 notebooks without requiring or upgrading cell IDs', async t => {
  const f = await fixture(t);
  await writeNotebook(f, validNotebook(4));
  f.success(f.notebook('insert', '--at', '3', '--type', 'code', '--source', ''));
  const nb = JSON.parse(await readFile(f.book, 'utf8'));
  assert.equal(nb.nbformat_minor, 4);
  assert.equal(Object.hasOwn(nb.cells[3], 'id'), false);
  assert.deepEqual(nb.cells[3].outputs, []);
  assert.equal(nb.cells[3].execution_count, null);
});

test('notebook rejects unsupported or malformed v4 structures before mutation', async t => {
  const f = await fixture(t);
  const changes = [
    nb => { nb.nbformat = 3; },
    nb => { nb.nbformat_minor = '5'; },
    nb => { nb.cells = {}; },
    nb => { nb.metadata = []; },
    nb => { nb.cells[0] = null; },
    nb => { nb.cells[0].source = [1]; },
    nb => { nb.cells[0].metadata = null; },
    nb => { nb.cells[0].execution_count = '2'; },
    nb => { nb.cells[0].outputs = {}; },
    nb => { nb.cells[0].outputs[0].text = 3; },
    nb => { nb.cells[0].outputs[1].metadata = []; },
    nb => { nb.cells[0].outputs[2].execution_count = null; },
    nb => { nb.cells[0].outputs[3].traceback = 'not an array'; },
    nb => { nb.cells[0].outputs[0].output_type = 'unknown'; },
    nb => { nb.cells[1].cell_type = 'unknown'; },
    nb => { nb.cells[1].attachments = []; },
    nb => { nb.cells[1].outputs = []; },
    nb => { nb.cells[0].attachments = {}; },
    nb => { delete nb.cells[0].id; },
    nb => { nb.cells[0].id = 'bad id'; },
    nb => { nb.cells[1].id = nb.cells[0].id; },
  ];
  for (const change of changes) {
    const nb = validNotebook();
    change(nb);
    const bytes = await writeNotebook(f, nb);
    f.failure(f.notebook('clear-outputs'));
    assert.equal(await readFile(f.book, 'utf8'), bytes);
    assert.deepEqual((await readdir(f.root)).sort(), ['.workflow', 'analysis.ipynb']);
  }
  await writeFile(f.book, '{malformed JSON\n');
  f.failure(f.notebook('insert', '--at', '0', '--source', 'changed'));
  assert.equal(await readFile(f.book, 'utf8'), '{malformed JSON\n');
});

test('todo does not create an invalid store when safe task IDs are exhausted', async t => {
  const f = await fixture(t);
  const bytes = JSON.stringify({
    version: 1,
    tasks: [{ id: Number.MAX_SAFE_INTEGER, title: 'Keep', status: 'pending' }],
  });
  await writeFile(f.tasks, bytes);
  f.failure(f.todo('add', 'Cannot allocate an ID'));
  assert.equal(await readFile(f.tasks, 'utf8'), bytes);
});

test('notebook clears outputs without changing other cells and supports deleting to an empty notebook', async t => {
  const f = await fixture(t);
  const original = validNotebook();
  await writeNotebook(f, original);
  f.success(f.notebook('clear-outputs'));
  let nb = JSON.parse(await readFile(f.book, 'utf8'));
  const expected = structuredClone(original);
  expected.cells[0].outputs = [];
  expected.cells[0].execution_count = null;
  assert.deepEqual(nb, expected);
  for (let index = 2; index >= 0; index--) f.success(f.notebook('delete', '--cell', String(index)));
  nb = JSON.parse(await readFile(f.book, 'utf8'));
  assert.deepEqual(nb.cells, []);
  const bytes = await readFile(f.book, 'utf8');
  f.failure(f.notebook('delete', '--cell', '0'));
  assert.equal(await readFile(f.book, 'utf8'), bytes);
  f.success(f.notebook('insert', '--at', '0', '--source', ''));
  nb = JSON.parse(await readFile(f.book, 'utf8'));
  assert.equal(nb.cells.length, 1);
  assert.match(nb.cells[0].id, /^[A-Za-z0-9_-]{1,64}$/);
});
