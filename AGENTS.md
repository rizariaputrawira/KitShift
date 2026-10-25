# Repository Guidelines

## Project Overview

KitShift is a portable personal coding-agent kit: passive skills, working guidance, harness settings, and MCP definitions. omp is the only implemented harness integration; other integrations are prospective. This is not an application or the omp runtime. Edit canonical repository files; installation is a separate, explicit operation.

## Architecture & Data Flow

`scripts/install-omp.mjs` is the executable entrypoint. It builds one installation plan from `harnesses/omp/config.yml` → `config.yml`, `guidance/APPEND_SYSTEM.md` → `APPEND_SYSTEM.md`, the complete `skills/` tree → `skills/`, and rendered `mcp/omp.json` → `mcp.json`. It resolves MCP placeholders with supplied local paths and preflights the complete plan against destination contents and SHA-256 hashes in `.kitshift-manifest.json`.

The installer has no exported API: local helpers feed `main()`, which runs at module load. `collectFiles()` traverses sources deterministically, `renderMcp()` substitutes whole-value placeholders, `loadManifest()` validates management state, and `writeAtomic()` replaces approved files. Exercise it through the CLI rather than importing it.

Conflicts abort before writes. Identical files can be adopted; updates reject unmanaged differing files and locally edited managed files. Approved files use per-file atomic replacement, followed by a private manifest update. Preserve the manifest for managed updates. This is not transactional rollback, a symlink installation, or two-way synchronization; removed source files remain installed unless explicitly migrated.

omp discovers skill metadata from `SKILL.md` and reads procedures/references on demand. Shared procedures have one canonical owner; branch-specific companions are loaded conditionally.

## Key Directories

- `skills/<domain>-<capability>/`: independently packaged guidance, references, provenance, and notices. Some packages contain bundled scripts or third-party payloads; do not assume everything is inert Markdown.
- `harnesses/omp/`: native settings and integration-specific compatibility evidence.
- `guidance/`: personal preferences appended to the native prompt.
- `mcp/`: portable connection templates, not bundled servers or credentials.
- `scripts/`: standalone installer implementation; `tests/`: isolated CLI/filesystem regression scenarios. There is no application `src/` tree.

## Development Commands

Run from the repository root:

```sh
node scripts/install-omp.mjs --help
node --test tests/install-omp.test.mjs
```

Preview installation using existing absolute local paths:

```sh
node scripts/install-omp.mjs --dry-run --target /tmp/kitshift-agent \
  --playwright-cli /absolute/path/to/playwright-mcp/cli.js \
  --browser /absolute/path/to/chromium/chrome \
  --open-design-cli /absolute/path/to/design-daemon/bin/od.mjs
```

All three path arguments are required for previews and updates: readable JavaScript entrypoints for the CLIs and an executable browser. Remove `--dry-run` to apply; preview managed updates with `--update --dry-run`, then apply with `--update`. Omitting `--target` installs into `~/.omp/agent`. Start the separately installed runtime with `omp`; a custom target does not automatically configure its agent directory. For an isolated default-profile launch:

```sh
PI_CODING_AGENT_DIR=/tmp/kitshift-agent omp
```

There is no root build command, lint command, package manifest, or dependency-install step.

## Code Conventions & Common Patterns

- JavaScript uses `.mjs` ESM, `node:` imports, two-space indentation, single-quoted strings, semicolons, and camelCase helpers. Prefer the existing built-in Node APIs rather than introducing a framework.
- Installer filesystem operations are synchronous; tests use async filesystem APIs with `spawnSync` for the CLI. Pass options/paths explicitly. There is no application DI container or frontend state store; installed management state belongs to the hash manifest.
- Validation helpers throw descriptive errors; the CLI boundary prints `kitshift: ...` and sets a nonzero exit code. Preserve deterministic traversal, whole-plan preflight, symlink/path checks, no-follow regular-file reads, and atomic replacement. Config, rendered MCP config, and manifest use mode `0600`.
- Skill directory names must match frontmatter `name` and retain functional prefixes such as `code-`, `docs-`, `ui-`, or `workflow-`. Descriptions are concise selection triggers with verified source tags, e.g. `[Matt Pocock] ...`; retain combined contributor tags when merging.
- Preserve explicit-only exposure metadata such as `disable-model-invocation: true`; metadata is not an authorization boundary. Reuse conditional relative file links rather than duplicating procedures or requiring a private loader URI. Keep shared skill instructions harness- and agent-neutral; place host-specific details in conditional companions and deployment evidence under `harnesses/<name>/`.
- For guidance changes, consult `skills/agent-guidance/SKILL.md` and its `references/authoring.md` and `references/skill-contract.md`. Update affected `SOURCES.md`, pinned source mappings, and full notices with adaptations. Reconcile names, links, README inventory, and changelog when capabilities change.

## Important Files

- `scripts/install-omp.mjs`: argument parsing, MCP rendering, preflight, permission handling, and managed updates.
- `harnesses/omp/config.yml`: native model, approval, privacy, and appearance settings.
- `mcp/omp.json`: JSON template; placeholders are whole string values, not embedded interpolation.
- `guidance/APPEND_SYSTEM.md`: personal preferences appended to omp's native prompt, not a replacement system prompt.
- `harnesses/omp/COMPATIBILITY.md`: integration evidence and pointers to version-specific assessment procedures; historical checks are not current compatibility guarantees.
- `README.md`: setup, maintenance, adoption mappings, and source/license boundaries.
- `SKILL-USAGE.md`: illustrative skill-selection scenarios, not mandatory orchestration or evidence of execution.
- `CHANGELOG.md`: changes and scoped verification records; historical checks are not current guarantees.

## Runtime/Tooling Preferences

Use Node.js 20+; no root package manager is prescribed. Linux/WSL2 is the documented environment; other platforms are unverified. Install omp, Git, GitHub CLI (`gh`), MCP CLIs, Chromium, and authentication separately. The installer does not download dependencies, authenticate accounts, or start services. MCP commands use the Node executable running the installer.

Preserve declared approval/privacy/model settings unless the task changes them. YOLO mode and selected Git prompts are not sandboxing. Keep credentials, `.env` files, databases, backups, and private handoffs out of commits; preserve `.gitignore` exclusions.

### GitHub MCP

`mcp/omp.json` defines a GitHub server using runtime `gh` authentication; do not embed credentials. When its tools are exposed, use them for authorized remote repository, issue, pull-request, review, and release work; use local Git for local state and file changes. Read each selected tool's schema and report observed results. Availability does not authorize remote mutations: require the applicable user request and approval, and never expose credential values or private authentication parameters.

## Testing & QA

Tests use built-in `node:test` and `node:assert/strict`. Fixtures create temporary source/target trees, copy the real installer and MCP template, invoke the CLI with `spawnSync`, assert exit status and resulting files, and clean up with `t.after`. The four scenarios cover no-write dry runs, unmanaged conflict refusal without partial writes, managed updates/local-edit protection, and symlink-ancestor rejection. Extend isolated fixtures for installer changes; do not test against live home configuration.

No coverage threshold is configured. Fixture MCP paths are placeholders and are never executed: installer tests do not prove MCP connectivity, authentication, browser operation, or external helper safety. For skill changes, check frontmatter/name agreement, affected links, provenance/notices, and native loading where available. Discovery or source loading alone does not prove skill behavior; report exercised checks and unverified boundaries separately.
