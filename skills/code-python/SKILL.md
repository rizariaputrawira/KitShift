---
name: code-python
description: "Python execution and Jupyter notebook (.ipynb) cell inspection and editing."
---

# Python and Notebook Workflows

Use the selected host's available tools and the current task's execution/write permissions. Do not execute notebook cells merely to inspect or edit their source.

## Harness-specific usage

- **Oh My Pi (`omp`):** Use the available native `python` and `notebook` tools through their current schemas. A bundled CLI command is not native tool syntax.
- **Antigravity CLI (`agy`):** Before using the bundled notebook helper, read [agy usage](references/agy-usage.md). It owns installed-script resolution, command examples, and validation limits.

## Mutation safety

Preserve unrelated cells, metadata, outputs, and notebook format. Inspect the selected cell before mutation and inspect the saved result afterward. Atomic replacement prevents partially written JSON; it does not prove complete notebook-schema validity, Python correctness, or successful cell execution.
