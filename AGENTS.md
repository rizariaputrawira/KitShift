# Repository Guidelines

## Project Overview

KitShift is a portable personal coding-agent kit: passive skills, working guidance, harness settings, and MCP definitions. omp and Antigravity CLI (`agy`) are the implemented harness integrations; other integrations are prospective. This is not an application or an agent runtime. Edit canonical repository files; installation is a separate, explicit operation.

## Architecture & Data Flow

KitShift provides a unified installer (`scripts/install.mjs`) alongside dedicated harness scripts:
- `node scripts/install.mjs omp` (or `scripts/install-omp.mjs`) builds an installation plan into the omp agent directory (`~/.omp/agent` by default) from `harnesses/omp/config.yml` → `config.yml`, `guidance/APPEND_SYSTEM.md` → `APPEND_SYSTEM.md`, the complete `skills/` tree → `skills/`, subagents from `harnesses/omp/agents/` → `agents/`, and rendered `mcp/omp.json` → `mcp.json`.
- `node scripts/install.mjs agy` (or `scripts/install-agy.mjs`) builds a native Antigravity CLI plugin bundle into `~/.gemini/config/plugins/kitshift` (or `<workspace>/.agents/plugins/kitshift` via `--target`), containing `plugin.json`, `rules/AGENTS.md` (from `guidance/APPEND_SYSTEM.md`), all 55 `skills/`, native subagents from `harnesses/agy/agents/` → `agents/`, rendered `mcp/agy.json` → `mcp_config.json` with all five MCP definitions, and `.kitshift-manifest.json`.

All installers share the engine in `scripts/install-common.mjs` (`installBundle()`, `collectFiles()`, `renderMcp()`, `loadManifest()`, `writeAtomic()`). MCP placeholders are substituted with validated local paths, and the complete plan is preflighted against destination contents and SHA-256 hashes in `.kitshift-manifest.json`.

Both harness installers require `--playwright-cli`, `--browser`, and `--open-design-cli` for every install, preview, and update. agy's `--workspace-dir` is optional; supply explicit roots to avoid binding Filesystem MCP to an unintended installer cwd. Older agy installs without MCP migrate with the three paths and `--update`; local MCP edits remain protected by normal conflict checks.

Conflicts abort before writes. Identical files can be adopted; updates reject unmanaged differing files and locally edited managed files. Approved files use per-file atomic replacement, followed by a private manifest update. Preserve the manifest for managed updates. This is not transactional rollback, a symlink installation, or two-way synchronization; removed source files remain installed unless explicitly migrated.

omp discovers skill metadata from `SKILL.md` and reads procedures/references on demand. Shared procedures have one canonical owner; branch-specific companions are loaded conditionally.

## Key Directories

- `skills/<domain>-<capability>/`: independently packaged guidance, references, provenance, and notices. Some packages contain bundled scripts or third-party payloads; do not assume everything is inert Markdown.
- `harnesses/omp/`: native settings and integration-specific compatibility evidence for Oh My Pi.
- `harnesses/agy/`: reference settings, subagent definitions, and integration-specific compatibility evidence for Antigravity CLI.
- `guidance/`: personal preferences appended to native harness prompts.
- `mcp/`: portable connection templates (`omp.json`, `agy.json`), not bundled servers or credentials.
- `scripts/`: installer implementation and shared engine (`install-common.mjs`); `tests/`: isolated CLI/filesystem regression scenarios. There is no application `src/` tree.

## Development Commands

Run from the repository root:

```sh
node scripts/install.mjs --help
node scripts/install.mjs omp --help
node scripts/install.mjs agy --help
node --test tests/install-omp.test.mjs tests/install-agy.test.mjs tests/state-helpers.test.mjs tests/search-helper.test.mjs
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
- Follow the [harness companion naming convention](README.md#skill-naming) for host labels and conditional reference filenames.
- For guidance changes, consult `skills/agent-guidance/SKILL.md` and its `references/authoring.md` and `references/skill-contract.md`. Update affected `SOURCES.md`, pinned source mappings, and full notices with adaptations. Reconcile names, links, README inventory, and changelog when capabilities change.

## Important Files

- `scripts/install-common.mjs`: shared installer core (traversal, validation, hash manifest, atomic replacement, MCP rendering).
- `scripts/install-omp.mjs`: omp installer argument parsing, preflight, permission handling, and managed updates.
- `scripts/install-agy.mjs`: Antigravity CLI plugin installer, rule renderer, subagent bundling, and managed updates.
- `harnesses/omp/config.yml`: native omp model, approval, privacy, and appearance settings.
- `harnesses/agy/settings.json`: reference host settings template for Antigravity CLI.
- `harnesses/agy/agents/`: native subagent definitions (`kitshift-reviewer.md`, `kitshift-investigator.md`, `kitshift-executor.md`, `kitshift-architect.md`).
- `mcp/omp.json`: JSON template for omp MCP connections.
- `mcp/agy.json`: JSON template for Antigravity MCP connections (omitting unsupported stdio `cwd`).
- `guidance/APPEND_SYSTEM.md`: personal preferences appended to native prompts.
- `harnesses/omp/COMPATIBILITY.md`: omp integration evidence and assessment records.
- `harnesses/agy/COMPATIBILITY.md`: Antigravity CLI integration evidence, native validator checks, and architecture boundaries.
- `skills/docs-engineering/references/agy-compatibility.md`: packaged `agy` assessment companion.
- `tests/install-omp.test.mjs`: isolated omp installer regression scenarios.
- `tests/install-agy.test.mjs`: isolated Antigravity CLI plugin installer and native validator scenarios.
- `tests/state-helpers.test.mjs`, `tests/search-helper.test.mjs`: isolated helper CLI regressions for data preservation, notebook mutation, search errors, and glob behavior.
- `README.md`: setup, maintenance, adoption mappings, and source/license boundaries.
- `SKILL-USAGE.md`: illustrative skill-selection scenarios across supported harnesses.
- `CHANGELOG.md`: changes and scoped verification records.

## Runtime/Tooling Preferences

Use Node.js 20+; no root package manager is prescribed. Linux/WSL2 is the documented environment; other platforms are unverified. Install omp, Git, GitHub CLI (`gh`), MCP CLIs, Chromium, and authentication separately. The installer does not download dependencies, authenticate accounts, or start services. MCP commands use the Node executable running the installer.

Preserve declared approval/privacy/model settings unless the task changes them. YOLO mode and selected Git prompts are not sandboxing. Keep credentials, `.env` files, databases, backups, and private handoffs out of commits; preserve `.gitignore` exclusions.

### GitHub MCP

`mcp/omp.json` defines a GitHub server using runtime `gh` authentication; do not embed credentials. When its tools are exposed, use them for authorized remote repository, issue, pull-request, review, and release work; use local Git for local state and file changes. Read each selected tool's schema and report observed results. Availability does not authorize remote mutations: require the applicable user request and approval, and never expose credential values or private authentication parameters.

## Testing & QA

Tests use built-in `node:test` and `node:assert/strict`. Fixtures create temporary source/target trees, copy the real installer and MCP template, invoke the CLI with `spawnSync`, assert exit status and resulting files, and clean up with `t.after`. The four scenarios cover no-write dry runs, unmanaged conflict refusal without partial writes, managed updates/local-edit protection, and symlink-ancestor rejection. Extend isolated fixtures for installer changes; do not test against live home configuration.

No coverage threshold is configured. Fixture MCP paths are placeholders and are never executed: installer tests do not prove MCP connectivity, authentication, browser operation, or external helper safety. For skill changes, check frontmatter/name agreement, affected links, provenance/notices, and native loading where available. Discovery or source loading alone does not prove skill behavior; report exercised checks and unverified boundaries separately.
