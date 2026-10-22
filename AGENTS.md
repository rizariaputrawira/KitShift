# Repository Guidelines

## Project Overview

KitShift is a portable personal coding-agent kit: passive skills, working guidance, harness settings, and MCP definitions. omp is the implemented harness; other integrations are prospective. This is not an application or the omp runtime. Edit canonical repository files; installation is a separate, explicit operation.

## Architecture & Data Flow

`scripts/install-omp.mjs` is the executable entrypoint. It collects harness settings, appended guidance, and the skill tree; renders MCP placeholders with supplied local paths; then preflights the complete destination plan against SHA-256 hashes in `.kitshift-manifest.json`.

Conflicts abort before writes. Approved files are copied with per-file atomic replacement, and the private manifest is updated. This is not transactional rollback, a symlink installation, or two-way synchronization. Updates reject unmanaged conflicts and locally edited managed files; removed source files remain installed unless explicitly migrated.

omp discovers skill metadata from `SKILL.md` and reads procedures/references on demand. Shared procedures have one canonical owner; branch-specific companions are loaded conditionally.

## Key Directories

- `skills/<domain>-<capability>/`: independently packaged guidance, references, provenance, and notices. Some packages contain bundled scripts or third-party payloads; do not assume everything is inert Markdown.
- `harnesses/omp/`, `guidance/`, `mcp/`: canonical install inputs, not machine-local configuration dumps.
- `scripts/` and `tests/`: installer implementation and isolated CLI/filesystem regression scenarios.

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

All three path arguments are required for previews and updates. Remove `--dry-run` to apply; add `--update` for managed updates. Omitting `--target` installs into `~/.omp/agent`. Start the separately installed runtime with `omp`; a custom target does not automatically configure its agent directory.

There is no root build command, lint command, package manifest, or dependency-install step.

## Code Conventions & Common Patterns

- JavaScript uses `.mjs` ESM, `node:` imports, two-space indentation, single-quoted strings, semicolons, and camelCase helpers. Prefer the existing built-in Node APIs rather than introducing a framework.
- Installer filesystem operations are synchronous; tests use async filesystem APIs with `spawnSync` for the CLI. Pass options/paths explicitly. There is no application DI container or frontend state store; installed management state belongs to the hash manifest.
- Validation helpers throw descriptive errors; the CLI boundary prints `kitshift: ...` and sets a nonzero exit code. Preserve deterministic traversal, whole-plan preflight, symlink/path checks, atomic replacement, and private file permissions.
- Skill directory names must match frontmatter `name` and retain functional prefixes such as `code-`, `docs-`, `ui-`, or `workflow-`. Descriptions are concise selection triggers with verified source tags, e.g. `[Matt Pocock] ...`; retain combined contributor tags when merging.
- Preserve explicit-only exposure metadata such as `disable-model-invocation: true`; metadata is not an authorization boundary. Reuse conditional relative or `skill://` pointers rather than duplicating procedures.
- For guidance changes, consult `skills/agent-guidance/SKILL.md` and its authoring/omp-contract references. Update affected `SOURCES.md`, pinned source mappings, and full notices with adaptations. Reconcile names, links, README inventory, and changelog when capabilities change.

## Important Files

- `scripts/install-omp.mjs`: argument parsing, MCP rendering, preflight, permission handling, and managed updates.
- `harnesses/omp/config.yml`: native model, approval, privacy, and appearance settings.
- `mcp/omp.json`: JSON template; placeholders are whole string values, not embedded interpolation.
- `guidance/APPEND_SYSTEM.md`: personal preferences appended to omp's native prompt, not a replacement system prompt.
- `README.md` and `CHANGELOG.md`: operator commands, adoption mappings, safety boundaries, and scoped verification records.

## Runtime/Tooling Preferences

Use Node.js 20+; no root package manager is prescribed. Linux/WSL2 is the documented environment. Install omp, MCP CLIs, Chromium, and authentication separately; the installer does not download dependencies, authenticate accounts, or start services. MCP commands use the Node executable running the installer.

Preserve declared approval/privacy/model settings unless the task changes them. YOLO mode and selected Git prompts are not sandboxing. Keep credentials, `.env` files, databases, backups, and private handoffs out of commits; preserve `.gitignore` exclusions.

## Testing & QA

Tests use built-in `node:test` and `node:assert/strict`. Fixtures create temporary source/target trees, invoke the real installer, assert exit status and resulting files, and clean up with `t.after`. Cover no-write dry runs, conflict refusal without partial writes, managed updates/local-edit protection, and symlink-ancestor rejection. Do not test against live home configuration.

No coverage threshold is configured. For skill changes, check frontmatter/name agreement, affected links, provenance/notices, and native loading where available. Installer tests and discovery do not prove skill behavior, MCP connectivity, authentication, or external helper safety; report those verification boundaries explicitly.
