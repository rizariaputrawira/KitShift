---
name: workflow-todo
description: "[KitShift] Structured task and todo board protocol for managing atomic task state, progress, and verification evidence."
---

# Workflow Todo: Structured Task Management

This skill defines the structured task protocol for breaking down work into discrete atomic tasks, tracking task lifecycle states, and binding verification evidence to completed units.

## Cross-Harness Invocation Contract

- **Oh My Pi (`omp`):** Use the native built-in `todo` tool directly (`todo list`, `todo add`, etc.). OMP maintains task state natively in runtime memory and session storage.
- **Antigravity CLI (`agy`):** AGY does not have a native `todo` tool. Use the bundled CLI script:
  ```bash
  node skills/workflow-todo/scripts/todo.mjs <command>
  ```
  or manage structured Markdown task lists in `.workflow/plans/` and `.workflow/tasks.json`.

---

## Task Lifecycle States

Each atomic task progresses through four defined states:

1. **`pending`**: Defined, scoped, but not yet started.
2. **`in_progress`**: Actively being worked on by the agent or subagent. At most ONE task should be `in_progress` at any given time.
3. **`completed`**: Proven complete with verified evidence. Must reference a test run, command output, or evidence artifact.
4. **`blocked`**: Dependent prerequisite missing, external input needed, or invariant broken.

---

## CLI Usage (AGY)

```bash
# List all tasks
node skills/workflow-todo/scripts/todo.mjs list
node skills/workflow-todo/scripts/todo.mjs list --json

# Add a task
node skills/workflow-todo/scripts/todo.mjs add "Implement user authentication" --desc "Add JWT auth route and middleware"

# Update task status
node skills/workflow-todo/scripts/todo.mjs update 1 --status in_progress
node skills/workflow-todo/scripts/todo.mjs update 1 --status completed --evidence ".workflow/executions/evidence/task-1/report.txt"
node skills/workflow-todo/scripts/todo.mjs update 2 --status blocked --evidence "Missing API credentials"

# Remove or clear
node skills/workflow-todo/scripts/todo.mjs remove 1
node skills/workflow-todo/scripts/todo.mjs clear
```

State is persisted atomically to `.workflow/tasks.json` with secure file permissions (`0600`).

---

## Evidence-Bound Rule

Never mark a task `completed` without recording verified evidence:
- A test run output showing 0 failures.
- A terminal execution showing expected exit code and output.
- A file inspection verifying on-disk integrity.
