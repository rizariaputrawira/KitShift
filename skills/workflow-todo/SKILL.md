---
name: workflow-todo
description: "Structured task tracking with lifecycle states, progress, and verification evidence."
---

# Structured Task Tracking

Break work into discrete tasks, track lifecycle state, and attach actual verification evidence to completed work. Task state does not create execution or mutation authority.

## Harness-specific usage

- **Oh My Pi (`omp`):** Use the available native `todo` tool through its current schema. Bundled CLI subcommands such as `add` are not native tool operations.
- **Antigravity CLI (`agy`):** Before using the bundled task helper, read [agy usage](references/agy-usage.md). It owns installed-script resolution, workspace storage, and CLI examples.

## Task lifecycle

- **`pending`:** Defined and not started.
- **`in_progress`:** Actively worked; keep at most one active task in a sequential plan.
- **`completed`:** Acceptance criteria satisfied with inspectable evidence.
- **`blocked`:** Waiting for a named prerequisite or retained decision.

Never mark work completed based only on an agent's assertion. Record actual command output, a test result, or decisive source-inspection evidence. A persistent board and the host's native task state are separate stores, not synchronized equivalents.
