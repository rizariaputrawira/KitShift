# Antigravity CLI (agy) integration compatibility

This directory owns Antigravity CLI (`agy`) configuration, deployment guidance, reference settings, subagent definitions, and verification records. Shared skills remain harness-neutral; omp integration is recorded separately under `harnesses/omp/`.

## Contract

- The [shared passive skill contract](../../skills/agent-guidance/references/skill-contract.md) owns packaging, discovery, invocation, and permission rules. This document records integration evidence, not another authoring procedure.
- Installation and managed updates remain separate explicit operations through [`scripts/install-agy.mjs`](../../scripts/install-agy.mjs).
- KitShift packages as a native Antigravity plugin (`plugins/kitshift/`), containing `plugin.json`, `rules/AGENTS.md`, the canonical 52 `skills/` tree, `agents/`, optional rendered `mcp_config.json`, and `.kitshift-manifest.json`.

## Version-specific checks

For a requested `agy` assessment, read the packaged [agy compatibility companion](../../skills/docs-engineering/references/agy-compatibility.md). It selects the shared [harness compatibility procedure](../../skills/docs-engineering/references/harness-compatibility.md) and owns native commands, official version-pinned sources, isolated loading checks, and permission/evidence limits. It is installed with the skills and does not depend on this repository-only document.

## Observed integration baseline

- **Installed runtime binary:** `/home/personal/.local/bin/agy` (SHA-256 `40349135371a8ed1f1af1e9f8b741de99174ae9fce6380b96c2d1f543480af7a`).
- **Static validation:** `agy plugin validate <target> --json` executed against a candidate KitShift plugin bundle reported `0` errors across all components:
  - `skills`: 52 canonical skills loaded.
  - `agents`: 2 subagents (`kitshift-reviewer`, `kitshift-investigator`).
  - `rules`: 1 rule file (`rules/AGENTS.md`).
  - `mcpServers`: 2 local servers (`playwright`, `open-design` when installed with `--with-mcp`).
  - `.kitshift-manifest.json`: safely ignored by the plugin loader and validator.
- **Skill size observations:** Under strict validation (`--strict`), `agy plugin validate` flags 3 canonical skills whose `SKILL.md` bodies exceed the 24,000-byte inline cap:
  - `skills/code-swift-development/SKILL.md` (45,807 bytes)
  - `skills/ui-gesture-design/SKILL.md` (25,459 bytes)
  - `skills/ui-taste-frontend/SKILL.md` (51,057 bytes)
  These are informational warnings in non-strict mode; skills remain discoverable and loadable on demand.

## Harness architectural boundaries

1. **Packaging & Isolation:**
   - KitShift installs cleanly into `~/.gemini/config/plugins/kitshift/` (or a custom target via `--target <dir>`).
   - Toggled natively using `agy plugin enable kitshift` / `agy plugin disable kitshift`.
   - Never writes to the user's host application configuration `~/.gemini/antigravity-cli/settings.json`. Canonical reference settings are provided at `harnesses/agy/settings.json` for optional manual adoption.

2. **Rules System:**
   - Antigravity plugins load rules from `rules/AGENTS.md` (plain Markdown without YAML frontmatter, always on while the plugin is enabled).
   - Rendered from `guidance/APPEND_SYSTEM.md` with OMP-specific references rewritten to host-neutral phrasing and `skill://git-commit-message` rewritten to relative path `(../skills/git-commit-message/SKILL.md)`.
   - Bounded by the 24,000-byte rule cap.

3. **Subagents (`agents/`):**
   - Subagents are defined under `agents/<name>.md` with frontmatter (`name`, `description`, `tools`, `model`).
   - `kitshift-reviewer`: Read-only code reviewer restricting tools to `[read_file, search_web]`, inheriting model, guided by `skills/code-review/references/review-brief.md`.
   - `kitshift-investigator`: Read-only investigator restricting tools to `[read_file, search_web]`, inheriting model, guided by `skills/workflow-delivery/references/implementation-brief.md`.
   - Subagents execute with the user's active workspace as CWD; references resolve via the loaded `<skills>` catalog.

4. **MCP Configuration (`mcp_config.json`):**
   - Stdio MCP server definitions in `mcp/agy.json` omit `cwd` (unsupported by `agy`).
   - Dynamic header command expansion (e.g. `!token=$(gh auth token)`) is unsupported in `agy`.
   - Plugin MCP server keys share a global namespace with the host `~/.gemini/config/mcp_config.json`. To prevent colliding with or shadowing the host's authenticated `github` MCP server, `mcp/agy.json` configures only the local stdio servers (`playwright` and `open-design`), leaving `github` MCP to host configuration.

## Limits

These records document static validation, schema alignment, and isolated installation verification for the tested `agy` build. They do not constitute a runtime compliance guarantee across unverified platforms, future `agy` binary revisions, or unexercised tool invocations.
