# Antigravity CLI (`agy`): task usage

Load only when using this skill in Antigravity CLI (`agy`). Use the currently exposed command tool under the current task's permissions.

## Resolve the installed helper

Locate this skill's canonical `SKILL.md` through the enabled skill catalog. Set `SKILL_DIR` to the absolute directory containing that file, not this reference's directory. Keep the active project as the command's working directory. Resolve `scripts/todo.mjs` under `SKILL_DIR`; do not assume a workspace `skills/` directory, a fixed home installation, or a particular `--target`.

In these Bash examples, `SKILL_DIR` must already hold that resolved absolute directory:

```bash
node "$SKILL_DIR/scripts/todo.mjs" list --json
node "$SKILL_DIR/scripts/todo.mjs" add 'Implement reservation check' --desc 'Reject a full workshop'
node "$SKILL_DIR/scripts/todo.mjs" update 1 --status in_progress
node "$SKILL_DIR/scripts/todo.mjs" update 1 --status completed --evidence 'verification/report.txt'
node "$SKILL_DIR/scripts/todo.mjs" update 2 --status blocked --evidence 'Awaiting capacity policy'
node "$SKILL_DIR/scripts/todo.mjs" remove 1
```

`clear` removes every tracked task; use it only when that reset is authorized.

## Storage and evidence

The helper chooses the nearest ancestor containing `.git` or `.workflow`, otherwise the command's cwd, and stores `.workflow/tasks.json` there. It uses atomic replacement with mode `0600`. Malformed or unreadable existing state must fail rather than being treated as an empty board. Preserve the original store when diagnosing an error.

Attach actual evidence before marking a task complete. The CLI is a persistent task board, not a full implementation of omp's native phase/pointer/blocked-task semantics. Do not assume either store synchronizes with the other or supports concurrent writers.
