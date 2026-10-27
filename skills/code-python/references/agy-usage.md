# Antigravity CLI (`agy`): notebook usage

Load only when using this skill in Antigravity CLI (`agy`). Use the currently exposed command tool and the task's execution/write permissions. For Python execution, use the project's selected interpreter and virtual environment; this helper neither executes cells nor provides a persistent Python REPL.

## Resolve the installed helper

Locate this skill's canonical `SKILL.md` through the enabled skill catalog. Set `SKILL_DIR` to the absolute directory containing that file, not this reference's directory. Keep the active project as the command's working directory. Resolve `scripts/notebook.mjs` under `SKILL_DIR`; do not assume a workspace `skills/` directory, a fixed home installation, or a particular `--target`.

In the Bash examples below, `SKILL_DIR` must already hold that resolved absolute directory. Notebook paths remain relative to the active project:

```bash
node "$SKILL_DIR/scripts/notebook.mjs" info notebook.ipynb
node "$SKILL_DIR/scripts/notebook.mjs" read notebook.ipynb --cell 0
node "$SKILL_DIR/scripts/notebook.mjs" edit notebook.ipynb --cell 1 --source $'import numpy as np\nx = np.linspace(0, 10, 100)'
node "$SKILL_DIR/scripts/notebook.mjs" edit notebook.ipynb --cell 1 --source ""
node "$SKILL_DIR/scripts/notebook.mjs" insert notebook.ipynb --at 2 --type code --source 'print(x.mean())'
node "$SKILL_DIR/scripts/notebook.mjs" delete notebook.ipynb --cell 2
node "$SKILL_DIR/scripts/notebook.mjs" clear-outputs notebook.ipynb
```

Bash ANSI-C quoting (`$'...\n...'`) passes an actual newline. Ordinary double-quoted `"...\n..."` does not. Use the current shell's equivalent when not using Bash.

## Validation and limits

Cell indices must be complete nonnegative integers within the operation's bounds. Insert accepts `code` or `markdown`; an empty source is valid. The helper checks supported nbformat 4 structure and generates unique cell IDs for nbformat 4.5 and later. It is not a full external JSON-schema validator or a Python syntax checker. Invalid arguments or unsupported structure must fail without replacing the notebook. Inspect saved cells and use the project's notebook validator when full schema acceptance is required.

`info` and `read` may follow a notebook symlink. Mutations (`edit`, `insert`, `delete`, and `clear-outputs`) reject a symlink notebook path before writing, preserving both the link and its target. Use the regular file path when an authorized mutation is needed; regular-file saves retain permission-preserving atomic replacement.
