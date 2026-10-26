---
name: code-search
description: "[KitShift] Fast structural code and file search using ripgrep, globbing, and ast-grep patterns."
---

# Code Search: High-Performance Code & File Search

This skill guides agents on conducting fast, precise codebase and file searches without dumping entire file trees into conversation context.

## Cross-Harness Invocation Contract

- **Oh My Pi (`omp`):** Use the native built-in `grep` and `glob` tools directly. OMP handles ripgrep execution and file scanning in-process.
- **Antigravity CLI (`agy`):** AGY does not provide native `grep` or `glob` tools. Use the bundled search script or direct ripgrep via `run_command`:
  ```bash
  node skills/code-search/scripts/search.mjs grep "<pattern>" [--path <dir>] [--glob "*.ts"]
  node skills/code-search/scripts/search.mjs glob "*.json" [--path <dir>]
  ```
  Or use the `filesystem` MCP tool (`search_files`) when configured.

---

## Token Efficiency Best Practices

1. **Target Specific Directories:**
   Never run broad regex searches on repo root if the domain is known (e.g. search `scripts/` or `harnesses/` rather than `.`).
2. **Use File Extension Filters:**
   Always narrow candidate files with `--glob "*.mjs"` or `--glob "*.py"` to eliminate irrelevant file scans.
3. **Inspect Surrounding Lines via Line Ranges:**
   After locating the line with `search grep`, use `read_file` with targeted `StartLine` and `EndLine` rather than reading the entire file.
