---
name: code-python
description: "Python execution and Jupyter notebook (.ipynb) cell inspection and editing."
---

# Python and Notebook Workflows

Use the selected host's available tools and the current task's execution/write permissions. Do not execute notebook cells merely to inspect or edit their source.

## Execute Python

1. Identify the requested code or file, inputs, working directory, and the project's selected interpreter/environment from available project evidence. Distinguish execution from source inspection or notebook editing; an inspection/edit request does not authorize running cells.
2. Execute through an available authorized interface using that environment and working directory. Use a supported native execution tool or the selected interpreter through a command interface; do not install dependencies or substitute another environment implicitly. If execution is unavailable, report the missing capability and continue only independently authorized source work.
3. Inspect the actual returned value/output, error and completion status. Report the code/input and environment used, observed result, and material limits; saved notebook source or old cell outputs are not proof of this execution.

## Harness-specific usage

- **Oh My Pi (`omp`):** Use the available native `python` and `notebook` tools through their current schemas. A bundled CLI command is not native tool syntax.
- **Antigravity CLI (`agy`):** Before using the bundled notebook helper, read [agy usage](references/agy-usage.md). It owns installed-script resolution, command examples, and validation limits.

## Mutation safety

Preserve unrelated cells, metadata, outputs, and notebook format. Inspect the selected cell before mutation and inspect the saved result afterward. Atomic replacement prevents partially written JSON; it does not prove complete notebook-schema validity, Python correctness, or successful cell execution.
