---
name: workflow-todo
description: "Structured task tracking with lifecycle states, progress, and verification evidence."
---

# Structured Task Tracking

Break work into discrete tasks, track lifecycle state, and attach actual verification evidence to completed work. Task state does not create execution or mutation authority.

## Track work

1. Identify every scoped task, its acceptance criteria, dependencies and current evidence. Inspect existing task state before updating it; preserve unrelated work and do not reset a board implicitly.
2. Record the tasks using an available permitted tracking surface and its current interface. If no board is available, keep an explicit conversational list; do not create persistent files or install a helper without authority.
3. Update lifecycle state as work proceeds. Name the actual missing prerequisite or retained decision for blocked tasks; block only dependent work and continue independent authorized tasks.
4. Before marking a task complete, inspect evidence against its acceptance criteria; an agent's assertion alone is insufficient. Attach actual command output, a test result or decisive source evidence. Finish with completed work, outstanding tasks and concrete blockers, distinguishing conversational tracking from saved state.

## Harness-specific usage

- **Oh My Pi (`omp`):** Use the available native `todo` tool through its current schema. Bundled CLI subcommands such as `add` are not native tool operations.
- **Antigravity CLI (`agy`):** Before using the bundled task helper, read [agy usage](references/agy-usage.md). It owns installed-script resolution, workspace storage, and CLI examples.

## Task lifecycle

- **`pending`:** Defined and not started.
- **`in_progress`:** Actively worked; keep at most one active task in a sequential plan.
- **`completed`:** Acceptance criteria satisfied with inspectable evidence.
- **`blocked`:** Waiting for a named prerequisite or retained decision.

A persistent board and the host's native task state are separate stores, not synchronized equivalents.
