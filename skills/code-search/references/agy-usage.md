# Antigravity CLI (`agy`): search usage

Load only when using this skill in Antigravity CLI (`agy`). Use the currently exposed command tool under the current task's permissions. Native or MCP search tools may also be used when actually available; this skill does not register them.

## Resolve the installed helper

Locate this skill's canonical `SKILL.md` through the enabled skill catalog. Set `SKILL_DIR` to the absolute directory containing that file, not this reference's directory. Keep the active project as the command's working directory. Resolve `scripts/search.mjs` under `SKILL_DIR`; do not assume a workspace `skills/` directory, a fixed home installation, or a particular `--target`.

In these Bash examples, `SKILL_DIR` must already hold that resolved absolute directory:

```bash
node "$SKILL_DIR/scripts/search.mjs" grep 'renderMcp' --path scripts --glob '*.mjs'
node "$SKILL_DIR/scripts/search.mjs" grep '--help' --path scripts --json
node "$SKILL_DIR/scripts/search.mjs" glob 'src/**/*.ts' --path . --json
node "$SKILL_DIR/scripts/search.mjs" glob '*.{js,ts}' --path .
```

## Search contract

Quote regex and glob arguments so the shell does not expand them first. Globs without `/` match basenames at any depth; globs containing `/` match paths relative to `--path`. Supported constructs include `*`, `**`, `?`, character classes, and brace alternatives. Regex metacharacters such as `+` are literal in glob filenames.

Grep uses ripgrep when installed and a JavaScript-regex fallback otherwise. Ripgrep first inventories eligible files using its default hidden-file and ignore rules, then applies the shared glob matcher before reading content in bounded file batches. An explicitly targeted file retains ripgrep's exception to those hidden/ignore rules. Excluded files cannot consume the content-search output buffer. Each inventory or content-search process has a 10 MiB output limit; exceeding it is an error, not a partial success.

The fallback excludes `.git` and `node_modules` directories but includes other hidden and ignored files. It searches actual lines: empty files have no lines, a terminal newline does not add a line, and real blank lines remain searchable. The regex engines and ignore behavior are not identical; do not assume full ripgrep parity without ripgrep. A successful no-match search is distinct from a nonzero error. Missing paths, invalid patterns (even when no files are selected), and failed searches must not be treated as proof of absence. The helper is not an AST or semantic search engine.
