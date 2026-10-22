# KitShift

**One kit. Any harness.**

My personal coding-agent kit: skills, working preferences, harness settings, and MCP connections in one repository. Clone it on another machine, review the configuration, and explicitly install the setup you want to use.

[Oh My Pi (omp)](https://github.com/can1357/oh-my-pi) is the first supported harness. It supplies the coding-agent runtime; KitShift supplies the configuration and reusable guidance. Pi, Antigravity CLI, and Claude Code are intended targets, **not implemented integrations**.

Use this kit to keep a consistent setup across projects without copying credentials or tying your live configuration to a checkout. It is not a harness binary, an application template, or an installer for external services.

> [!WARNING]
> The omp configuration deliberately uses `tools.approvalMode: yolo`. Selected destructive-Git command patterns still prompt, but they are not a sandbox or complete command coverage. Review [safety and privacy](#safety-and-privacy) before installing.

## In this guide

- [Capabilities](#capabilities)
- [Quick start](#quick-start)
- [How it works](#how-it-works)
- [Skills and workflows](#skills-and-workflows)
- [MCP integrations](#mcp-integrations)
- [Safety and privacy](#safety-and-privacy)
- [Updates and troubleshooting](#updates-and-troubleshooting)
- [Verification and known limits](#verification-and-known-limits)
- [Help and maintenance](#help-and-maintenance)
- [Sources and licenses](#sources-and-licenses)

## Capabilities

- **Reusable procedures:** 39 skills covering engineering, UI, security, Git, documentation, writing, and handoffs, with their supporting files and attribution.
- **Personal working preferences:** append-only guidance for evidence, scope, verification, communication, and credential privacy, retaining omp's native base prompt.
- **Native omp configuration:** three model-role selections, appearance preferences, native planning, and selected privacy/resource settings—without restoring custom director/worker orchestration.
- **Portable MCP definitions:** Playwright, GitHub, and local design tooling, with machine-specific executable paths supplied during installation.
- **Explicit installation:** preview changes, copy files, and apply managed updates. Conflicting files and local edits are rejected rather than silently overwritten.

Skills and guidance are instructions for the agent, not guarantees of compliance, isolation, service availability, or lower cost.

## Quick start

### 1. Prepare the prerequisites

The documented shell examples target Linux/WSL2. Other operating systems have not been verified.

Install these separately:

- **Node.js 20 or newer** to run the installer. Initial verification used Node.js 24.20.0.
- **omp** using its [official installation instructions](https://github.com/can1357/oh-my-pi#install). The exported configuration and initial runtime check used omp 18.12.6; this is not a minimum-version guarantee.
- **Git** to clone and update the repository.
- **GitHub CLI** (`gh` on `PATH`) for GitHub MCP authentication.
- **Playwright MCP** and a Chromium executable for browser tooling.
- The local design CLI used by **OpenDesign Cloud or Local Codex**, plus its local daemon when you use that integration.

All three MCP executable paths are currently required by the installer, even if you do not plan to use every integration. Installation does not download dependencies, authenticate accounts, or start services.

Authenticate separately on each machine:

```sh
omp login openai-codex
gh auth login
```

The omp configuration uses the `openai-codex` provider. An OpenAI API key does not automatically authenticate that separate provider. Your account must have access to the configured model IDs, or you must select alternatives. See omp's [provider documentation](https://github.com/can1357/oh-my-pi/blob/v18.12.6/docs/providers.md).

### 2. Clone and preview

```sh
git clone https://github.com/rizariaputrawira/kitshift.git
cd kitshift

node scripts/install-omp.mjs --dry-run \
  --playwright-cli /absolute/path/to/playwright-mcp/cli.js \
  --browser /absolute/path/to/chromium/chrome \
  --open-design-cli /absolute/path/to/design-daemon/bin/od.mjs
```

Replace the example paths with existing local files: readable JavaScript entry points for the two CLIs and an executable Chromium browser. They are path examples, not files supplied by this repository.

Review [the omp settings](harnesses/omp/config.yml) and [personal guidance](guidance/APPEND_SYSTEM.md), then inspect the preview. Dry run creates no destination directories or files.

### 3. Install and start omp

Rerun the preview command **without `--dry-run`** to install into `~/.omp/agent`. Use `--target /path/to/agent-directory` if you want a different destination; that option does not automatically configure omp to use it. For an isolated default-profile launch, set `PI_CODING_AGENT_DIR` to that directory when starting omp.

If existing content differs, installation stops before writing. Preserve your existing configuration separately and reconcile the differences deliberately; do not delete your whole omp directory to resolve a conflict.

Start `omp` from the project you want to work on and describe the outcome. No separate KitShift service or mandatory documentation setup is required.

## How it works

The repository is the source of truth. The installer copies its content into the selected omp agent directory, renders local MCP paths, and records managed file hashes in a private `.kitshift-manifest.json`. There are no installed symlinks and no automatic two-way synchronization.

| Component | Repository source | Installed responsibility |
|---|---|---|
| Harness settings | [harnesses/omp/config.yml](harnesses/omp/config.yml) | omp preferences and model-role selectors |
| Personal guidance | [guidance/APPEND_SYSTEM.md](guidance/APPEND_SYSTEM.md) | Preferences appended to omp's native prompt |
| Skills | [skills/](skills/) | On-demand procedures and supporting files |
| MCP connections | [mcp/omp.json](mcp/omp.json) | Connection definitions rendered with local executable paths |
| Installer | [scripts/install-omp.mjs](scripts/install-omp.mjs) | Preflight, explicit copying, permissions, and managed updates |

Unspecified settings follow the installed omp version's defaults. Upgrading omp can change those defaults without changing the repository snapshot.

### Model selections

| Native role | Configured selector |
|---|---|
| `smol` | `openai-codex/gpt-6-luna:low` |
| `default` | `openai-codex/gpt-6.1-sol:medium` |
| `slow` | `openai-codex/gpt-6-astra:high` |

These are personal selections, not a performance ranking, entitlement check, or fixed agent-identity policy. Native delegation remains available; KitShift does not impose custom worker routing or a second approval system.

## Skills and workflows

Ask for the task directly, or name the relevant skill when you want a specific procedure. Examples:

- “Use code-debugging to investigate this failure and verify the fix.”
- “Use code-review on my current changes. Report findings without editing.”
- “Use ui-mobile-web to investigate this mobile scrolling issue.”
- “Use workflow-handoff to capture the current state before I pause.”

| Area | Example skills |
|---|---|
| Engineering | [Debugging](skills/code-debugging/SKILL.md), [code review](skills/code-review/SKILL.md), [TDD](skills/code-tdd/SKILL.md), [simplification](skills/code-simplicity/SKILL.md) |
| Planning and documentation | [Brainstorming](skills/workflow-brainstorming/SKILL.md), [domain modeling](skills/docs-domain-modeling/SKILL.md), [documentation-first delivery](skills/workflow-delivery/SKILL.md) |
| UI and motion | [UI design / Impeccable](skills/ui-design/SKILL.md), [Taste frontend](skills/taste-skill/SKILL.md), [Stitch input](skills/stitch-design-input/SKILL.md), [mobile web](skills/ui-mobile-web/SKILL.md), [web motion](skills/ui-web-motion/SKILL.md), [Expo motion](skills/ui-expo-motion/SKILL.md), [UI stress testing](skills/ui-stress-test/SKILL.md) |
| Security | [Security review](skills/security-review/SKILL.md), [security audit](skills/security-audit/SKILL.md), [dependency intake](skills/security-intake/SKILL.md) |
| Git | [Change status](skills/git-change-status/SKILL.md), [commit messages](skills/git-commit-message/SKILL.md), [PR work](skills/git-pr-work/SKILL.md) |
| Writing and continuity | [Writing review](skills/writing-authenticity/SKILL.md), [provenance review](skills/content-provenance-audit/SKILL.md), [handoffs](skills/workflow-handoff/SKILL.md) |

Browse [all installed skill sources](skills/) for the full collection and each procedure's boundaries. Documentation-first delivery is conditional, not a requirement for ordinary work. A review request does not authorize edits, and naming a skill does not grant new tool permissions.

## MCP integrations

These are connection definitions, not bundled servers or proof of a working connection.

| Integration | Local requirements and behavior |
|---|---|
| Playwright | Playwright MCP JavaScript entry point and Chromium executable. Preserves headless, isolated, and sandbox flags; output goes under the destination's `cache/playwright-mcp`. |
| GitHub | Connects to `https://api.githubcopilot.com/mcp/`. Resolves authentication at runtime through the `gh` account on `PATH`; no token is committed. |
| OpenDesign Cloud / Local Codex | Local design CLI entry point and daemon expected at `http://127.0.0.1:7456`. Preserves the template's process-scoped privacy environment. |

The generated MCP configuration uses the Node executable that ran the installer. Moving Node, a CLI, or the browser can require reinstalling with updated paths. The three path arguments are required for previews and updates as well as initial installation.

## Safety and privacy

- **Review YOLO mode before use.** Targeted force-push, hard-reset, and Git-clean approval patterns do not provide OS isolation or cover all tools and shell spellings.
- **Keep credentials local.** Authentication databases, OAuth tokens, API keys, sessions, caches, backups, and private handoffs are not part of this public kit. Do not add them when updating your setup or reporting an issue.
- **Know which account is used.** GitHub MCP inherits the account available to `gh`; the kit does not reduce that account's permissions.
- **Keep privacy claims scoped.** The omp configuration disables OTLP telemetry export and AutoQA, denies AutoQA consent, and disables automatic Codex saved-reset redemption. The design MCP has separate process-scoped privacy settings. These are not a guarantee that every external tool sends no telemetry.
- **Preserve local data.** Config, MCP config, and the install manifest use mode `0600`. The installer rejects symlink destinations, does not automatically delete obsolete files, and does not promise transactional rollback after an I/O failure.

### Restored skill provenance

Three packages were initially excluded while their source records were investigated. They are now included with scoped attribution and full notices, not a blanket legal or security certification:

| Package | Established evidence and remaining boundary |
|---|---|
| [Stitch input](skills/stitch-design-input/SOURCES.md) | Leonxlnx's MIT source is corroborated by the Google Stitch contribution and an attributed redistribution. The package preserves the locally adapted procedure and illustrative sample; the exact historical import event remains unknown. |
| [Taste frontend](skills/taste-skill/SOURCES.md) | Aria's original expanded file exactly matches Leonxlnx's pinned expanded Taste source. The earlier shorter-source comparison did not identify that complete baseline. Both full MIT notices are retained; the current local adaptation is preserved rather than importing newer upstream behavior. |
| [UI design](skills/ui-design/NOTICE.md) | Impeccable's Apache-2.0 and nested platform notice remain. The bundled screenshot helper exactly matches `modern-screenshot@4.7.0`, and its full MIT notice is now included. Remaining nested-rights, helper-security, and external-engine limitations are explicitly retained. |

These source comparisons do not prove original authorship, comprehensive rights clearance, or consuming-agent behavior. No expansion is attributed to the kit's owner merely because it appeared in their configuration.

## Updates and troubleshooting

Edit the repository's canonical files, then explicitly apply the changes:

```sh
git pull --ff-only
node scripts/install-omp.mjs --help
```

Use the installation command from [quick start](#quick-start) with `--update --dry-run`, retaining your three local path arguments. Inspect the preview, then remove `--dry-run` to apply it.

Keep `.kitshift-manifest.json` in the destination. Updates can replace previously managed files only when they still match the recorded hash. Identical files can be adopted; locally edited files are protected. omp or manual changes in the destination do not flow back into the repository. Files removed from a newer kit are left in place, so an update is not an exact mirror or uninstaller.

| Symptom | What to check |
|---|---|
| Required path is missing or unreadable | Supply all three absolute MCP paths; confirm the browser is executable. The installer does not install dependencies. |
| `Unmanaged file differs` | Compare the named destination with the kit. Preserve the original and reconcile it explicitly; `--update` does not override unmanaged conflicts. |
| `Managed file has local edits` | Preserve your local edits and decide which belong in the canonical repository. The installer will not discard them. |
| `Managed file needs --update` | Preview with `--update --dry-run`, then apply with `--update`. |
| Symlink destination rejected | Choose a real directory path. The installer rejects symlinked files and directory ancestors. |
| omp cannot select a configured model | Authenticate `openai-codex`, check account availability, or change the model selectors. Configured IDs are not proof of access. |
| An MCP connection fails after installation | Check the service, paths, local daemon, and authentication. Successful installation validates files and rendering, not server connectivity. |
| Updating omp changes behavior | Review upstream changes and effective settings. The kit does not pin every native default or guarantee compatibility with later versions. |

## Verification and known limits

Run the installer regression scenarios from the repository root:

```sh
node --test tests/install-omp.test.mjs
```

Initial verification used **Linux/WSL2, Node.js 24.20.0, and omp 18.12.6**:

- Four scenarios passed: no-write preview, unmanaged conflict with no partial writes, managed updates with local-edit protection, and symlink-ancestor rejection.
- A temporary installation produced 185 managed files; private file modes and all three rendered MCP definitions were checked.
- Native omp RPC startup loaded the personal guidance and discovered installed skills with zero messages. It used an explicit model selection and a synthetic startup-only credential; no inference request was sent.
- The startup probe reused the existing omp native library through a temporary link. That runtime dependency is not distributed by KitShift.

After restoring the three packages, the same installer regression scenarios passed again. An isolated install produced **267 managed files across 39 skill packages**; native omp startup discovered `stitch-design-input`, `ui-design`, and `design-taste-frontend` with zero messages. The restored payloads were compared against the installed originals: procedural/helper content was preserved, with only attribution/source records and the added notices changed. The screenshot helper and its full MIT notice passed exact hash checks. MCP connections, helper engines, and skill-driven task behavior were not exercised.

**Not verified:** MCP connectivity, provider authentication, configured model-role availability, skill behavior, other operating systems, or compatibility with other omp versions. MCP servers were disabled only for the isolated startup probe. Passing installer tests or discovering skills is not proof of end-to-end agent behavior.

## Help and maintenance

Maintained by [@rizariaputrawira](https://github.com/rizariaputrawira) as a personal setup. For KitShift problems or suggestions, [open an issue](https://github.com/rizariaputrawira/kitshift/issues) with the command, relevant versions, and redacted error output. Never attach authentication stores, tokens, or raw session histories.

For harness installation and runtime questions, consult the [omp documentation](https://github.com/can1357/oh-my-pi/tree/main/docs). See the [changelog](CHANGELOG.md) for kit changes. This repository does not promise a support schedule or a compatibility matrix beyond the verification above.

## Sources and licenses

This is a personal collection, not a claim that every skill is original KitShift work. Preserve each skill's `SOURCES.md`, `NOTICE.md`, and `LICENSE*` files where present. Licenses and provenance vary; no repository-wide license grants additional rights over third-party material. Inclusion is not a complete legal, security, or behavioral audit.

The guide structure draws on [Aria OMP Config](https://github.com/rizariaputrawira/aria-omp-config), while the shared-skill organization was informed by [mattpocock/skills](https://github.com/mattpocock/skills). Their old orchestration machinery and installation scripts were not imported. README navigation and relative links follow [GitHub's README guidance](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes).
