# Antigravity CLI (agy) integration compatibility

This directory owns Antigravity CLI (`agy`) configuration, deployment guidance, reference settings, subagent definitions, and verification records. Shared skills remain harness-neutral; omp integration is recorded separately under `harnesses/omp/`.

## Contract

- The [shared passive skill contract](../../skills/agent-guidance/references/skill-contract.md) owns packaging, discovery, invocation, and permission rules. This document records integration evidence, not another authoring procedure.
- Installation and managed updates remain separate explicit operations through [`scripts/install-agy.mjs`](../../scripts/install-agy.mjs).
- KitShift packages as a native Antigravity plugin (`plugins/kitshift/`), containing `plugin.json`, `rules/AGENTS.md`, the canonical 55-skill tree, `agents/`, rendered `mcp_config.json` with all five definitions, and `.kitshift-manifest.json`.
- Every install, preview, and update requires `--playwright-cli`, `--browser`, and `--open-design-cli`, matching omp's path requirement. `--workspace-dir` remains optional; use explicit existing absolute readable roots for the intended Filesystem scope, otherwise the installer's cwd is recorded.
- Older agy installations made without MCP migrate by supplying all three paths with `--update` (preview first with `--dry-run`). Existing local MCP edits and unmanaged differences remain protected by normal conflict checks. Host settings are not changed.

## Version-specific checks

For a requested `agy` assessment, read the packaged [agy compatibility companion](../../skills/docs-engineering/references/agy-compatibility.md). It selects the shared [harness compatibility procedure](../../skills/docs-engineering/references/harness-compatibility.md) and owns native commands, official version-pinned sources, isolated loading checks, and permission/evidence limits. It is installed with the skills and does not depend on this repository-only document.

## Observed mandatory MCP cutover

On 2026-10-26, Linux/WSL2 and Node.js 24.20.0, all 114 installer/helper tests passed with zero skips. Both direct and unified agy entrypoints rejected missing/invalid required paths without writes, preserved local MCP edits, and supported managed updates from bundles without MCP. Native validation of the full disposable bundle reported 55 skills, four agents, one rule, five MCP definitions and zero errors.

A separate disposable CLI smoke exercised missing-path refusal, no-write preview, five-server installation with private MCP permissions, workspace-root updates, and migration from an actual no-MCP installation created by `ec92364`. The omp installer, configuration and MCP template remained byte-identical to that snapshot. No live installation, host settings, MCP services or model calls were changed or launched; validation does not establish server connectivity or consuming-agent behavior.


## Observed integration baseline

This baseline predates the mandatory-MCP cutover. The optional-MCP installation mode used for these checks is superseded; the observations below are historical, not fresh validation of the current installer.

- **Installed runtime binary:** `/home/personal/.local/bin/agy` (SHA-256 `40349135371a8ed1f1af1e9f8b741de99174ae9fce6380b96c2d1f543480af7a`).
- **Static validation:** `agy plugin validate <target> --json` executed against a candidate KitShift plugin bundle reported `0` errors across all components:
  - `skills`: 55 canonical skills loaded.
  - `agents`: 4 subagents (`kitshift-reviewer`, `kitshift-investigator`, `kitshift-executor`, `kitshift-architect`).
  - `rules`: 1 rule file (`rules/AGENTS.md`).
  - `mcpServers`: 5 local stdio servers (`playwright`, `open-design`, `lsp`, `codegraph`, `filesystem`) in the historical MCP-enabled bundle.
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
   - Copied from the host-neutral `guidance/APPEND_SYSTEM.md`. Commit-message work locates the enabled skill through the host catalog, so lookup does not depend on whether this prompt is installed under `rules/` or at an agent root.
   - Bounded by the 24,000-byte rule cap.

3. **Subagents (`agents/`):**
   - Subagents are defined under `agents/<name>.md` with frontmatter (`name`, `description`, `tools`, `model`).
   - `kitshift-reviewer`: Read-only code reviewer restricting tools to `[read_file, search_web]`, inheriting model, guided by `skills/code-review/references/review-brief.md`.
   - `kitshift-investigator`: Read-only investigator restricting tools to `[read_file, search_web]`, inheriting model, guided by `skills/workflow-delivery/references/implementation-brief.md`.
   - `kitshift-executor`: Implementation role configured with `model: flash_lite` and tools `[read_file, write_file, edit_file, run_command]`; runs only verification explicitly assigned by the coordinator.
   - `kitshift-architect`: Planning role configured with `model: pro` and tools `[read_file, search_web]`.
   - Subagents execute with the user's active workspace as CWD; references resolve via the loaded `<skills>` catalog.
   - Choose these agy-specific roles only when available and useful to an authorized assignment; they do not impose tiered delegation or independent review on every task or on omp. Model selectors are configuration, not measured performance or proof of runtime identity. Native validation alone does not prove executor/architect dispatch or effective write tools.

4. **MCP Configuration (`mcp_config.json`):**
   - Stdio MCP server definitions in `mcp/agy.json` omit `cwd` (unsupported by `agy`).
   - Dynamic header command expansion (e.g. `!token=$(gh auth token)`) is unsupported in `agy`.
   - Configures local stdio definitions for `playwright`, `open-design`, `lsp`, `codegraph`, and `filesystem`. GitHub MCP is left to host configuration. Successful config validation is not a server handshake or proof that each advertised capability works.
   - The installer always renders these five definitions and neither downloads nor starts servers. Playwright and OpenDesign use the installer Node executable; LSP, Codegraph, and Filesystem resolve `npx` through runtime `PATH`. Their unpinned `npx -y` commands can download and execute packages when the host starts them.
   - `--workspace-dir` records one root or comma-separated roots; omission records the installer's cwd. A later agy session does not rebind those roots, and the Filesystem scope is not a sandbox for other tools. Re-render with all three MCP paths and `--update` to change roots; local MCP edits are still protected.

## Limits

These records document static validation, schema alignment, and isolated installation verification for the tested `agy` build. They do not constitute a runtime compliance guarantee across unverified platforms, future `agy` binary revisions, or unexercised tool invocations.
