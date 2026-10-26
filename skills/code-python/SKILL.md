---
name: code-python
description: "[KitShift] Python workflow and safe Jupyter notebook (.ipynb) cell inspection and editing."
---

# Code Python: Python Workflow & Notebook Editing

This skill provides guidelines and utilities for executing Python code and safely reading, inspecting, and editing Jupyter notebook (`.ipynb`) cells without risking JSON corruption.

## Cross-Harness Invocation Contract

- **Oh My Pi (`omp`):** Use the native built-in `python` (persistent REPL) and `notebook` tools directly.
- **Antigravity CLI (`agy`):** AGY does not provide native REPL or notebook tools.
  - For Python execution: run scripts via `run_command` in an active virtual environment.
  - For Jupyter notebook manipulation: use the bundled `notebook.mjs` CLI tool:
    ```bash
    node skills/code-python/scripts/notebook.mjs <command> <file.ipynb> [options]
    ```

---

## Notebook CLI Operations (AGY)

```bash
# Inspect notebook structure and cell listing
node skills/code-python/scripts/notebook.mjs info notebook.ipynb

# Read cell content
node skills/code-python/scripts/notebook.mjs read notebook.ipynb --cell 0

# Edit a specific cell
node skills/code-python/scripts/notebook.mjs edit notebook.ipynb --cell 1 --source "import numpy as np\nx = np.linspace(0, 10, 100)"

# Insert a new cell
node skills/code-python/scripts/notebook.mjs insert notebook.ipynb --at 2 --type code --source "print(x.mean())"

# Delete a cell
node skills/code-python/scripts/notebook.mjs delete notebook.ipynb --cell 2

# Clear stale outputs before commit
node skills/code-python/scripts/notebook.mjs clear-outputs notebook.ipynb
```

## Atomic Safety

Never perform raw text search-and-replace (`edit_file`) on `.ipynb` files directly, as invalid trailing commas or unescaped newlines will invalidate the notebook JSON schema. Always use `notebook.mjs` which guarantees schema validity and atomic writes.
