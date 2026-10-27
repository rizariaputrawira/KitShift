---
name: code-search
description: "Code and file search using regular expressions and glob patterns."
---

# Code and File Search

Narrow searches to the relevant directory and file types. Distinguish a successful search with no matches from a failed search before drawing conclusions about absent code.

## Harness-specific usage

- **Oh My Pi (`omp`):** Use the available native `grep` and `glob` tools through their current schemas; use structured search rather than shell equivalents when required by the host.
- **Antigravity CLI (`agy`):** Before using the bundled search helper, read [agy usage](references/agy-usage.md). It owns installed-script resolution, grep/glob examples, and fallback limits.

## Inspect results

Read surrounding source at the reported locations before changing code. Use the selected host's supported line-range interface. Regex and filename searches are not AST queries, semantic search, or language-server reference resolution; use code-intelligence tools when those are available and required.
