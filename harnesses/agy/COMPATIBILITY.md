# Antigravity CLI (agy) integration compatibility

This directory owns Antigravity CLI (`agy`) configuration, deployment guidance, reference settings, subagent definitions, and verification records. Shared skills remain harness-neutral; omp integration is recorded separately under `harnesses/omp/`.

## Contract

- The [shared passive skill contract](../../skills/agent-guidance/references/skill-contract.md) owns packaging, discovery, invocation, and permission rules. This document records integration evidence, not another authoring procedure.
- Installation and managed updates remain separate explicit operations through [`scripts/install-agy.mjs`](../../scripts/install-agy.mjs).
- KitShift packages as a native Antigravity plugin (`plugins/kitshift/`), containing `plugin.json`, `rules/AGENTS.md`, the canonical 59-skill tree, `agents/`, `hooks.json`, rendered `mcp_config.json` with all five definitions, and `.kitshift-manifest.json`.
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
   - The intended bundle contains nine definitions: `kitshift-investigator` (local tracing), `kitshift-researcher` (external research), `kitshift-architect` (advisory architecture and pre-plan gaps), `kitshift-plan-reviewer` (concrete-plan review), `kitshift-reviewer` (source review), `kitshift-qa` (authorized scenarios), `kitshift-data-analyst` (local tabular preparation, matching, and authorized exploration), `kitshift-acceptance-reviewer` (evidence recommendation), and `kitshift-executor` (implementation). Main owns planning, integration and final acceptance; the [responsibility map](../../AGENT-WORKFLOW.md) covers both adapters.
   - Declared models are `inherit` for investigator, researcher, plan reviewer, source reviewer, QA, data analyst and acceptance reviewer; `pro` for architect; and `flash_lite` for executor. Declared tools are `read_file` for investigator, plan reviewer, source reviewer and acceptance reviewer; `read_file` and `search_web` for researcher and architect; `read_file` and `run_command` for QA; and `read_file`, `write_file`, `edit_file` and `run_command` for data analyst and executor.
   - Reviewers do not execute or repair; QA executes only assigned scenarios when native rules also permit it. The data analyst writes only assigned derived artifacts, reports and reproduction scripts/notebooks, not source replacements or application repairs. Architecture implementation uses the executor, not the advisory architect. Result reports use the native result channel and an inspectable locator, not a required report file.
   - Choose these roles only when available and useful to an authorized assignment; no tiered delegation or review chain is mandatory. Definitions and model selectors describe intent, not observed dispatch, effective or additive tools, model performance, enforcement or independence. Static validation alone cannot prove those behaviors.
   - Resolve enabled skill owners through the actual host catalog, with reference links relative to the discovered owner rather than an assumed workspace path.

   **Provenance and scope:** The role responsibilities are original local expression informed by the pinned [OmO Native orchestration guide](https://github.com/code-yeongyu/oh-my-openagent/blob/9afd6e6c307b84a750f2986b69377b050a46c05f/docs/guide/orchestration.md) and [specialist registry](https://github.com/code-yeongyu/oh-my-openagent/blob/9afd6e6c307b84a750f2986b69377b050a46c05f/packages/senpi-task/src/agents/builtin/index.ts), not copied prompts or a source-runtime port. KitShift uses native result channels and gates, conditional review and main-owned acceptance, without upstream commands, storage or model chains. The agy 1.5.0 CLI help and official [subagents](https://antigravity.google/docs/subagents), [plugins](https://antigravity.google/docs/plugins?tab=cli) and [CLI reference](https://antigravity.google/docs/cli/reference) informed the adapter; mutable documentation and prior validation are not proof of current dispatch or enforcement.

   **Current static package check:** Against `agy 1.5.12` executable SHA-256 `94104f028e6962fa2f71d393a7ae27d835ceba1c4898422a103e22c6a5fd6828`, `agy plugin validate` validated a disposable full bundle (370 managed files) with nine agents, 59 skills, one rule, one hook and five MCP definitions: zero errors. It warned that `code-swift-development`, `ui-gesture-design` and `ui-taste-frontend` exceed the 24,000-byte body cap (causing `--strict` to exit `1` on those three warnings), and noted a missing optional logo. No hook, MCP server, agent dispatch or model request was exercised. Prior evidence in isolated scratch HOME/XDG state with `agy 1.5.0` executable SHA-256 `b9043860a06a3bfa70b68f06c3d4527abc16207767f14ae9d1e06e3026081862` validated an eight-agent, 57-skill bundle with zero errors, confirmed preview left the target absent, clean managed update from the original four definitions retained them and delivered the additions, and locally edited managed and differing unmanaged role conflicts left complete target snapshots unchanged.

4. **MCP Configuration (`mcp_config.json`):**
   - Stdio MCP server definitions in `mcp/agy.json` omit `cwd` for portable plugin packaging (earlier `agy` builds rejected `cwd`; `agy 1.5.12` accepts absolute `cwd` values).
   - Dynamic header command expansion (e.g. `!token=$(gh auth token)`) is unsupported in `agy`.
   - Configures local stdio definitions for `playwright`, `open-design`, `lsp`, `codegraph`, and `filesystem`. GitHub MCP is left to host configuration. Successful config validation is not a server handshake or proof that each advertised capability works.
   - The installer always renders these five definitions and neither downloads nor starts servers. Playwright and OpenDesign use the installer Node executable; LSP, Codegraph, and Filesystem resolve `npx` through runtime `PATH`. Their unpinned `npx -y` commands can download and execute packages when the host starts them.
   - `--workspace-dir` records one root or comma-separated roots; omission records the installer's cwd. A later agy session does not rebind those roots, and the Filesystem scope is not a sandbox for other tools. Re-render with all three MCP paths and `--update` to change roots; local MCP edits are still protected.

5. **Lifecycle Hook & Launch Wrapper (`hooks.json`, `scripts/kitshift.mjs`):**
   - `hooks.json` registers `kitshift-update` for `SessionStart`. The rendered command uses absolute paths to Node, the checkout's `scripts/kitshift.mjs`, and the managed target.
   - For an interactive `kitshift run` launch with a cached update, `_agy-notice` emits a `systemMessage` step with `metadata.user_markdown` for the user and empty `systemMessage` text for the model. This replaces the deprecated `ephemeralMessage` step.
   - The launch classifier recognizes `agy 1.5.12` flags including `--settings`, `--remote-agent`, and the boolean `--new-project`, with native one- or two-dash spellings and explicit boolean values. Isolated PTY tests exercise KitShift's classification, not native TUI rendering or model behavior.

## Limits

These records document static validation, schema alignment, and isolated installation verification for the tested `agy` build. They do not constitute a runtime compliance guarantee across unverified platforms, future `agy` binary revisions, or unexercised tool invocations.
