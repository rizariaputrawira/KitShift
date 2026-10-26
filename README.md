# KitShift

**One kit. Any harness.**

My personal coding-agent kit: skills, working preferences, harness settings, and MCP connections in one repository. Clone it on another machine, review the configuration, and explicitly install the setup you want to use.

[Oh My Pi (omp)](https://github.com/can1357/oh-my-pi) and [Antigravity CLI (agy)](https://github.com/google-deepmind/antigravity) are the supported harnesses. They supply the coding-agent runtimes; KitShift supplies the configuration, reusable guidance, subagents, and skills. Pi and Claude Code are prospective targets.

Use this kit to keep a consistent setup across projects without copying credentials or tying your live configuration to a checkout. It is not a harness binary, an application template, or an installer for external services.

> [!WARNING]
> The omp configuration deliberately uses `tools.approvalMode: yolo`. Selected destructive-Git command patterns still prompt, but they are not a sandbox or complete command coverage. Review [safety and privacy](#safety-and-privacy) before installing.

## In this guide

- [Capabilities](#capabilities)
- [Quick start](#quick-start)
  - [Oh My Pi (omp) setup](#oh-my-pi-omp-setup)
  - [Antigravity CLI (agy) setup](#antigravity-cli-agy-setup)
- [How it works](#how-it-works)
- [Agent collaboration](#agent-collaboration)
- [Skills and workflows](#skills-and-workflows)
- [MCP integrations](#mcp-integrations)
- [Safety and privacy](#safety-and-privacy)
- [Updates and troubleshooting](#updates-and-troubleshooting)
- [Verification and known limits](#verification-and-known-limits)
- [Help and maintenance](#help-and-maintenance)
- [Documentation, sources, and licenses](#documentation-sources-and-licenses)

## Capabilities

- **Reusable procedures:** 55 skills covering engineering, UI, security, Git, documentation, writing, task tracking, notebook editing, and handoffs, with their supporting files and attribution.
- **Personal working preferences:** append-only guidance for evidence, scope, verification, communication, and credential privacy, universally applied across harnesses (`APPEND_SYSTEM.md` for omp, `rules/AGENTS.md` for agy).
- **Native harness configurations:** omp cycling model-role selections (`config.yml`), and Antigravity reference host settings (`harnesses/agy/settings.json`).
- **Dedicated subagents:** `kitshift-reviewer` and `kitshift-investigator` for both harnesses; `kitshift-executor` and `kitshift-architect` additionally packaged for agy. Definitions do not prove effective runtime tools or model selection.
- **Portable MCP definitions:** Playwright and local design tooling for both harnesses, GitHub for omp, and LSP, Codegraph, and Filesystem for agy. Machine-specific local paths are rendered during every installation and managed update.
- **Explicit installation:** unified `scripts/install.mjs` (or direct `install-omp.mjs` / `install-agy.mjs`) to preview changes, copy files, and apply managed updates. Conflicting files and local edits are rejected rather than silently overwritten.

Skills and guidance are instructions for the agent, not guarantees of compliance, isolation, service availability, or lower cost.

## Quick start

### 1. Prepare the prerequisites

The documented shell examples target Linux/WSL2. Other operating systems have not been verified.

Install these separately:

- **Node.js 20 or newer** to run the installer scripts. Initial verification used Node.js 24.20.0.
- **omp** and/or **Antigravity CLI (agy)** depending on your target harness.
  - omp: [official installation instructions](https://github.com/can1357/oh-my-pi#install).
  - agy: [official CLI installation instructions](https://antigravity.google/docs/getting-started?tab=cli#download-and-install).
- **Git** to clone and update the repository.
- **GitHub CLI** (`gh` on `PATH`) for GitHub MCP authentication.
- **Playwright MCP** and a Chromium executable for browser tooling, required for both harness installers.
- The local design CLI used by **OpenDesign Cloud or Local Codex**, required for both harness installers, plus its local daemon when you use that integration.
- **npm / `npx` on `PATH`** for agy's LSP, Codegraph, and Filesystem servers. Their runtime commands may download and execute packages; see [MCP integrations](#mcp-integrations).

### Oh My Pi (omp) setup

Clone and preview:

```sh
git clone https://github.com/rizariaputrawira/kitshift.git
cd kitshift

node scripts/install-omp.mjs --dry-run \
  --playwright-cli /absolute/path/to/playwright-mcp/cli.js \
  --browser /absolute/path/to/chromium/chrome \
  --open-design-cli /absolute/path/to/design-daemon/bin/od.mjs
```

Rerun **without `--dry-run`** to install into `~/.omp/agent`. For managed updates, run `node scripts/install-omp.mjs --update ...`.

All three local MCP path arguments are required for installs, previews, and updates on both harnesses. The agy-specific LSP, Codegraph, and Filesystem definitions are not added to omp's `mcp.json`; its native tools remain the selected path in the three helper skills.

Start omp from your project directory:

```sh
omp
```

### Antigravity CLI (agy) setup

KitShift installs as a native Antigravity plugin under `~/.gemini/config/plugins/kitshift` (or in a project workspace under `<workspace>/.agents/plugins/kitshift` via `--target`).

```sh
node scripts/install-agy.mjs --dry-run \
  --playwright-cli /absolute/path/to/playwright-mcp/cli.js \
  --browser /absolute/path/to/chromium/chrome \
  --open-design-cli /absolute/path/to/design-daemon/bin/od.mjs \
  --workspace-dir /absolute/path/to/your/project
```

Rerun **without `--dry-run`** to install. Every agy install, preview, and update requires all three local MCP paths and renders all five definitions: Playwright, OpenDesign, LSP, Codegraph, and Filesystem. `--workspace-dir` remains optional.

The former `--with-mcp` switch has been removed; omit it from older commands.

Set `--workspace-dir` to the directory the Filesystem server should expose. For multiple roots, use one quoted comma-separated value, such as `--workspace-dir "/absolute/project-one,/absolute/project-two"`. Roots must be existing absolute readable directories. If omitted, the installer records its current working directory; opening agy in another project does not automatically change those configured roots. This filesystem-server scope is not a sandbox for other host tools.

For managed updates and migration from an older installation without MCP, follow [updates and troubleshooting](#updates-and-troubleshooting).

Once installed:
- Verify with `agy plugin list` or `agy plugin validate ~/.gemini/config/plugins/kitshift --json`.
- The plugin is enabled automatically. Toggle with `agy plugin enable kitshift` / `agy plugin disable kitshift`.
- Rules in `rules/AGENTS.md` are active whenever the plugin is enabled.
- All 55 skills are available on demand.
- Native subagents `kitshift-reviewer`, `kitshift-investigator`, `kitshift-executor`, and `kitshift-architect` are packaged for dispatch through the host's supported interface. Validation/discovery does not prove every role's tools or model selection at runtime.
- Reference host settings are available in `harnesses/agy/settings.json` for optional manual adoption; host application settings (`~/.gemini/antigravity-cli/settings.json`) are never modified by the installer.

## How it works

The repository is the source of truth. The installers copy content into the target harness directory or plugin bundle, substitute local paths, and record managed file hashes in a private `.kitshift-manifest.json`. There are no installed symlinks and no automatic two-way synchronization.

| Component | Repository source | omp installed role | agy installed role |
|---|---|---|---|
| Harness settings | [harnesses/omp/config.yml](harnesses/omp/config.yml) / [harnesses/agy/settings.json](harnesses/agy/settings.json) | `config.yml` (model selectors, YOLO mode) | Reference template (never overwrites host settings) |
| Personal guidance | [guidance/APPEND_SYSTEM.md](guidance/APPEND_SYSTEM.md) | `APPEND_SYSTEM.md` appended to prompt | `rules/AGENTS.md` always-on plugin rule |
| Skills | [skills/](skills/) | `skills/` directory | `skills/` directory (55 canonical skills) |
| Subagents | [harnesses/omp/agents/](harnesses/omp/agents/) / [harnesses/agy/agents/](harnesses/agy/agents/) | `agents/` (`kitshift-reviewer`, `kitshift-investigator`) | `agents/` (reviewer, investigator, executor, architect with `kitshift-` prefix) |
| MCP connections | [mcp/omp.json](mcp/omp.json) / [mcp/agy.json](mcp/agy.json) | `mcp.json` (Playwright, GitHub, OpenDesign) | `mcp_config.json` (Playwright, OpenDesign, LSP, Codegraph, Filesystem; GitHub at host level) |
| Installer | [scripts/install.mjs](scripts/install.mjs) | Agent directory preflight and atomic write | Plugin preflight and atomic write |
| Shared core | [scripts/install-common.mjs](scripts/install-common.mjs) | Traversal, manifest validation, atomic writing | Traversal, manifest validation, atomic writing |

### Configuration

Review [the omp configuration](harnesses/omp/config.yml) for its model selectors and other native settings; [the agy settings template](harnesses/agy/settings.json) is available for manual adoption. Model selections are personal configuration, not a performance ranking, entitlement check, or fixed agent-identity policy. Native delegation remains available; KitShift does not impose custom worker routing or a second approval system.

Unspecified settings follow the installed harness version's defaults. Upgrading a harness can change those defaults without changing the repository snapshot.

### Agent collaboration

The selected harness supplies execution and native capabilities; assignments define responsibilities, while skills supply reusable procedures. Neither a skill nor a configured model selector is a fixed worker identity. [How agents work in KitShift](AGENT-WORKFLOW.md) explains direct work, optional delegation, handoffs, conditional independent review and evidence acceptance, with diagrams and hypothetical booking examples.

## Skills and workflows

Ask for the task directly, or name the relevant skill when you want a specific procedure.

The shared skill procedures are harness- and agent-neutral: cross-skill references are relative file links, and instructions use the selected host's available tools, permissions and approval mechanisms. Read linked canonical sources only when enabled and authorized; a link does not bypass deliberate disablement. The [passive skill contract](skills/agent-guidance/references/skill-contract.md) owns packaging, invocation and permission rules. Runtime-specific checks live in the conditional [omp compatibility companion](skills/docs-engineering/references/omp-compatibility.md) and [agy compatibility companion](skills/docs-engineering/references/agy-compatibility.md). Configuration, deployment and recorded runtime evidence remain with the [omp adapter](harnesses/omp/COMPATIBILITY.md) and [agy adapter](harnesses/agy/COMPATIBILITY.md). Source packaging and native validation do not prove consuming-agent behavior or MCP connectivity.

- “Use code-debugging to investigate this failure and verify the fix.”
- “Use code-review on my current changes. Report findings without editing.”
- “Use ui-mobile-web to investigate this mobile scrolling issue.”
- “Use workflow-handoff to capture the current state before I pause.”

See the [complete skill use-case guide](SKILL-USAGE.md) for all 55 skills, invocation labels, example prompts, expected results, and workflow diagrams.

### Skill collection

KitShift includes **55 skills**, listed once below by capability. These groups describe use, not exclusive ownership or source attribution. For invocation rules, example prompts and expected results, use [SKILL-USAGE.md](SKILL-USAGE.md).

| Capability | Skills |
|---|---|
| Engineering and agent guidance | [agent-guidance](skills/agent-guidance/SKILL.md), [code-architecture](skills/code-architecture/SKILL.md), [code-debugging](skills/code-debugging/SKILL.md), [code-implementation](skills/code-implementation/SKILL.md), [code-prototyping](skills/code-prototyping/SKILL.md), [code-python](skills/code-python/SKILL.md), [code-review](skills/code-review/SKILL.md), [code-search](skills/code-search/SKILL.md), [code-simplicity](skills/code-simplicity/SKILL.md), [code-swift-development](skills/code-swift-development/SKILL.md), [code-tdd](skills/code-tdd/SKILL.md) |
| Documentation and domain modeling | [docs-domain-modeling](skills/docs-domain-modeling/SKILL.md), [docs-engineering](skills/docs-engineering/SKILL.md), [docs-plan-review](skills/docs-plan-review/SKILL.md), [docs-specification](skills/docs-specification/SKILL.md) |
| Git and pull requests | [git-change-status](skills/git-change-status/SKILL.md), [git-commit-message](skills/git-commit-message/SKILL.md), [git-pr-work](skills/git-pr-work/SKILL.md), [git-triage](skills/git-triage/SKILL.md) |
| Security | [security-audit](skills/security-audit/SKILL.md), [security-intake](skills/security-intake/SKILL.md), [security-review](skills/security-review/SKILL.md) |
| UI design, assets and inspection | [ui-brand-concepts](skills/ui-brand-concepts/SKILL.md), [ui-browser](skills/ui-browser/SKILL.md), [ui-design](skills/ui-design/SKILL.md), [ui-image-generation](skills/ui-image-generation/SKILL.md), [ui-image-to-code](skills/ui-image-to-code/SKILL.md), [ui-library-selection](skills/ui-library-selection/SKILL.md), [ui-prototyping](skills/ui-prototyping/SKILL.md), [ui-stitch-design-input](skills/ui-stitch-design-input/SKILL.md), [ui-stress-test](skills/ui-stress-test/SKILL.md), [ui-taste-frontend](skills/ui-taste-frontend/SKILL.md) |
| UI platforms, motion and feedback | [ui-expo-motion](skills/ui-expo-motion/SKILL.md), [ui-gesture-design](skills/ui-gesture-design/SKILL.md), [ui-mobile-web](skills/ui-mobile-web/SKILL.md), [ui-sonner](skills/ui-sonner/SKILL.md), [ui-web-motion](skills/ui-web-motion/SKILL.md) |
| Workflow planning and execution | [workflow-brainstorming](skills/workflow-brainstorming/SKILL.md), [workflow-delivery](skills/workflow-delivery/SKILL.md), [workflow-project-setup](skills/workflow-project-setup/SKILL.md), [workflow-questionnaire](skills/workflow-questionnaire/SKILL.md), [workflow-skill-selection](skills/workflow-skill-selection/SKILL.md), [workflow-ticket-planning](skills/workflow-ticket-planning/SKILL.md), [workflow-todo](skills/workflow-todo/SKILL.md), [workflow-wizard](skills/workflow-wizard/SKILL.md) |
| Research, learning and continuity | [workflow-handoff](skills/workflow-handoff/SKILL.md), [workflow-handoff-read](skills/workflow-handoff-read/SKILL.md), [workflow-research](skills/workflow-research/SKILL.md), [workflow-retrospective](skills/workflow-retrospective/SKILL.md), [workflow-teaching](skills/workflow-teaching/SKILL.md), [workflow-upstream-review](skills/workflow-upstream-review/SKILL.md), [workflow-wayfinder](skills/workflow-wayfinder/SKILL.md) |
| Writing and provenance analysis | [content-provenance-audit](skills/content-provenance-audit/SKILL.md), [writing-authenticity](skills/writing-authenticity/SKILL.md), [writing-explanation](skills/writing-explanation/SKILL.md) |

Browse [all installed skill sources](skills/) for the full collection and each procedure's boundaries. Documentation-first delivery is conditional, not a requirement for ordinary work. A review request does not authorize edits, and naming a skill does not grant new tool permissions.

### Skill naming

Canonical skill directory names match their `SKILL.md` names and start with a functional domain: `agent-`, `code-`, `content-`, `docs-`, `git-`, `security-`, `ui-`, `workflow-`, or `writing-`.

Harness-specific companions use `references/<harness>-<topic>.md`, with lowercase harness IDs `omp` and `agy` and kebab-case topics: `omp-compatibility.md`, `agy-compatibility.md`, and `agy-usage.md`. Use **Oh My Pi (`omp`)** and **Antigravity CLI (`agy`)** consistently in host-selection labels. Shared procedures stay in the entrypoint or shared reference; load a companion only for its named host and operation. Do not create empty counterpart files merely for symmetry or rename retained upstream source paths.

The bundled [task](skills/workflow-todo/SKILL.md), [search](skills/code-search/SKILL.md), and [notebook](skills/code-python/SKILL.md) helpers resolve their executables from the loaded skill directory while keeping the consumer workspace as cwd. Their `agy-usage.md` companions own CLI examples and limits; native omp tools use their current schemas, not those CLI subcommands. These helpers provide selected capabilities, not complete behavioral parity with omp.

The domain-prefix migration renames `brand-concepts` to `ui-brand-concepts`, `stitch-design-input` to `ui-stitch-design-input`, `swift-development` to `code-swift-development`, and the `taste-skill` package (previous invocation name `design-taste-frontend`) to `ui-taste-frontend`. Use the new names for `skill://` URIs and `/skill:` commands. Historical verification records and upstream source paths retain their original names.

For an existing installation, do not rename the old directories into the new destinations: the manifest still owns their old paths, so changed files at the new paths are rejected as unmanaged conflicts. Instead:

1. Move each old skill directory to a separate, unused backup location **outside every skill-discovery root**, preserving its contents and local edits. If you already renamed it in place, move that directory to the backup location too. Do not overwrite an existing backup or a separately installed new-name directory.
2. Keep `.kitshift-manifest.json` intact. Preview the normal installer command with `--update --dry-run` and all three local MCP path arguments, then remove `--dry-run` to apply. With the new destinations absent, the installer creates and manages them; other conflicts still require deliberate reconciliation.
3. Compare the backups with the new packages and reconcile any local edits deliberately. Do not copy an old `SKILL.md` back wholesale, because its old frontmatter name would undo the identity migration. Restart omp after migration.

The installer does not remove old paths or obsolete manifest entries. Backups left inside a discovery root can expose duplicate skills; keep them outside those roots until you decide they are no longer needed.

## MCP integrations

These are connection definitions, not bundled servers or proof of a working connection.

| Integration | Harness | Local requirements and behavior |
|---|---|---|
| Playwright | omp; agy | Readable Playwright MCP JavaScript entry point and executable Chromium. Preserves headless, isolated, and sandbox flags; output goes under the destination's `cache/playwright-mcp`. |
| GitHub | omp template; agy host-managed | omp connects to `https://api.githubcopilot.com/mcp/` and resolves authentication through `gh` on `PATH`; no token is committed. The agy plugin does not define GitHub MCP or configure host authentication. |
| OpenDesign Cloud / Local Codex | omp; agy | Readable local design CLI entry point and daemon expected at `http://127.0.0.1:7456`. Preserves the template's process-scoped privacy environment. |
| LSP | agy | `npx -y @theupsider/lsp-mcp`; package availability, language-server setup and runtime capabilities are not established by installation. |
| Codegraph | agy | `npx -y @colbymchenry/codegraph serve --mcp`; indexing and server connectivity were not exercised by installer validation. |
| Filesystem | agy | `npx -y @modelcontextprotocol/server-filesystem` with the roots rendered from `--workspace-dir`; defaults to the installer's cwd, not the future agy session's cwd. |

Playwright and OpenDesign commands use the Node executable that ran the installer; the three additional agy servers resolve `npx` through runtime `PATH`. Their package versions are unpinned, and `npx -y` may download and execute packages when the host starts the servers. The installer itself does not download or launch them.

Moving Node, a CLI, or the browser can require re-rendering MCP configuration. All three local path arguments are required for every install, preview, and update on both harnesses. agy always renders all five definitions; retain the intended workspace roots when updating.

## Safety and privacy

- **Review YOLO mode before use.** Targeted force-push, hard-reset, and Git-clean approval patterns do not provide OS isolation or cover all tools and shell spellings.
- **Keep credentials local.** Authentication databases, OAuth tokens, API keys, sessions, caches, backups, and private handoffs are not part of this public kit. Do not add them when updating your setup or reporting an issue.
- **Know which account is used.** GitHub MCP inherits the account available to `gh`; the kit does not reduce that account's permissions.
- **Keep privacy claims scoped.** The omp configuration disables OTLP telemetry export and AutoQA, denies AutoQA consent, and disables automatic Codex saved-reset redemption. The design MCP has separate process-scoped privacy settings. These are not a guarantee that every external tool sends no telemetry.
- **Preserve local data.** Config, MCP config, and the install manifest use mode `0600`. The installer rejects symlink destinations, does not automatically delete obsolete files, and does not promise transactional rollback after an I/O failure.

## Updates and troubleshooting

Update the checkout, then select the installer for the harness you use:

```sh
git pull --ff-only
node scripts/install.mjs omp --help
node scripts/install.mjs agy --help
```

| Update target | Preview | Apply |
|---|---|---|
| omp | Repeat the omp [setup command](#oh-my-pi-omp-setup) with `--update --dry-run`, retaining all three local MCP paths and any custom `--target`. | Remove `--dry-run`. |
| agy | Repeat the agy [setup command](#antigravity-cli-agy-setup) with `--update --dry-run`, retaining all three local MCP paths, the intended workspace roots, and any custom `--target`. | Remove `--dry-run`. |

Keep `.kitshift-manifest.json` in the destination. Updates can replace previously managed files only when they still match the recorded hash. Identical files can be adopted; locally edited files, including MCP configuration, are protected. Host or manual changes in the destination do not flow back into the repository. Files removed from a newer kit are left in place, so an update is not an exact mirror or uninstaller.

To migrate an older agy installation made without MCP, supply all three local MCP paths and run the setup command with `--update --dry-run`, then remove `--dry-run` to apply. Choose explicit `--workspace-dir` roots if the installer's current directory is not the intended Filesystem scope. Existing local MCP edits or unmanaged conflicts must be reconciled deliberately; the update does not overwrite them.

| Symptom | What to check |
|---|---|
| Required path is missing or unreadable | For either harness, supply all three absolute MCP paths and confirm the browser is executable. The installer does not install dependencies. |
| `Unmanaged file differs` | Compare the named destination with the kit. Preserve the original and reconcile it explicitly; `--update` does not override unmanaged conflicts. |
| `Managed file has local edits` | Preserve your local edits and decide which belong in the canonical repository. The installer will not discard them. |
| `Managed file needs --update` | Preview with `--update --dry-run`, then apply with `--update`. |
| Symlink destination rejected | Choose a real directory path. The installer rejects symlinked files and directory ancestors. |
| omp cannot select a configured model | Authenticate `openai-codex`, check account availability, or change the model selectors. Configured IDs are not proof of access. |
| An MCP connection fails after installation | Check the service, paths, local daemon, and authentication. Successful installation validates files and rendering, not server connectivity. |
| agy's Filesystem server exposes the wrong project | Re-render MCP with `--update`, all three local paths, and explicit `--workspace-dir` roots. The default is the installer's cwd. |
| Updating omp changes behavior | Review upstream changes and effective settings. The kit does not pin every native default or guarantee compatibility with later versions. |

## Verification and known limits

Run the full installer and helper regression suite from the repository root:

```sh
node --test tests/install-omp.test.mjs tests/install-agy.test.mjs tests/state-helpers.test.mjs tests/search-helper.test.mjs
```

### Mandatory MCP verification

On 2026-10-26, the full suite passed **114/114 tests with zero skips**, including required and invalid path handling through both agy installer entrypoints, no-write previews, managed updates, local-edit protection, migration from managed bundles without MCP, and native agy validation of the full five-server bundle.

A separate disposable CLI smoke exercised a five-server install and managed workspace-root update, then upgraded a real no-MCP bundle installed by `ec92364`. The omp installer, configuration and MCP template remained byte-identical to that snapshot. Across this README and the three compatibility documents, 173 local link occurrences and 31 heading fragments resolved. MCP services and model calls were not launched; live installations and settings were untouched.

### Recorded integration verification

The following checks predate the mandatory-agy-MCP cutover and describe that earlier snapshot, not a fresh verification of the current installer. On 2026-10-26, Linux/WSL2, Node.js 24.20.0 and omp 18.12.6:

- **47/47 tests passed with zero skips**, including task/notebook data-preservation regressions, both search engines, installer conflict/update/symlink scenarios, and required omp MCP paths.
- Native agy validation of a disposable bundle reported 55 skills, four agents, one rule, five MCP definitions and zero errors. This establishes packaging validation, not server connectivity or role dispatch.
- A disposable omp upgrade from pre-agy `main` (`7ad7652`) preserved config and rendered MCP bytes, with all 52 existing skill entrypoints unchanged. Its dry-run wrote nothing; installing agy in a separate target changed no omp target paths or bytes.
- Native omp reads from a separate consumer workspace loaded all 55 installed skill bodies with matching canonical content and no inference. Separate CLI smokes exercised the helper corrections.

The [omp compatibility record](harnesses/omp/COMPATIBILITY.md#observed-agy-integration-isolation), [agy compatibility record](harnesses/agy/COMPATIBILITY.md) and [changelog](CHANGELOG.md) retain the scoped evidence. No live installation or host settings were changed by these checks. The native agy validator test skips when its binary is unavailable; set `AGY_BIN` to an installed executable when it is not at the test's documented default path.

### Historical verification

The following records describe earlier snapshots and counts, not the current inventory or a fresh rerun.

Initial verification used **Linux/WSL2, Node.js 24.20.0, and omp 18.12.6**:

- Four scenarios passed: no-write preview, unmanaged conflict with no partial writes, managed updates with local-edit protection, and symlink-ancestor rejection.
- A temporary installation produced 185 managed files; private file modes and all three rendered MCP definitions were checked.
- Native omp RPC startup loaded the personal guidance and discovered installed skills with zero messages. It used an explicit model selection and a synthetic startup-only credential; no inference request was sent.
- The startup probe reused the existing omp native library through a temporary link. That runtime dependency is not distributed by KitShift.

After restoring the three packages, the same installer regression scenarios passed again. An isolated install produced **267 managed files across 39 skill packages**; native omp startup discovered `stitch-design-input`, `ui-design`, and `design-taste-frontend` with zero messages. The restored payloads were compared against the installed originals: procedural/helper content was preserved, with only attribution/source records and the added notices changed. The screenshot helper and its full MIT notice passed exact hash checks. MCP connections, helper engines, and skill-driven task behavior were not exercised.

The active Matt Pocock adoption was checked with Node.js 24.20.0 and omp 18.12.6: all 27 published upstream entries map to 24 local owners with the current pin, contributor-tagged descriptions, and byte-exact MIT notices. All 52 skill directory/frontmatter identities match; 463 relative Markdown links and 199 skill pointers resolve outside fenced examples, with historical provenance names preserved. Every repository skill file matches its installed copy, and fresh `omp read` processes load all 52 canonical skill URIs without inference requests. All four installer regression scenarios pass. A synthetic Bash helper smoke confirms denied commands do not execute, approved commands execute, progress is reported, and the secret-clearing helper unsets its variable; secret-entry TTY behavior and real task-specific wizards were not exercised.

The harness-neutral skill revision preserved all 52 entrypoint frontmatters, exact license files and bundled scripts; 773 relative file links/anchors resolved across skill and affected operator documents. Isolated omp 18.12.6 reads loaded all 52 candidate skill bodies and both renamed shared references with exact source equality and no inference requests. A final browser-safety correction was reloaded separately. Ten source-loaded actor runs covered incompatible handoffs without delegation, lightweight ordinary changes, deliberate skill disablement and browser-interface routing without a CLI, including the corrected browser branch and ordinary countercase. Baseline decisions also succeeded; these bounded observations establish no comparative behavioral improvement or other-harness runtime support. The active installation was not updated.

**Not verified:** MCP connectivity, provider authentication, effective configured tool/model availability or agent dispatch, consuming-agent behavior beyond the recorded synthetic cases, performance/context overhead, other operating systems, prospective harness integrations, or compatibility with other omp versions. The new skill/agent metadata is discoverable in omp; no zero-context-cost claim is made. MCP servers were disabled only for the earlier isolated startup probe. Passing installer tests, agy validation or discovering skills is not proof of end-to-end agent behavior.

## Help and maintenance

Maintained by [@rizariaputrawira](https://github.com/rizariaputrawira) as a personal setup. For KitShift problems or suggestions, [open an issue](https://github.com/rizariaputrawira/kitshift/issues) with the command, relevant versions, and redacted error output. Never attach authentication stores, tokens, or raw session histories.

For omp installation and runtime questions, consult the [omp documentation](https://github.com/can1357/oh-my-pi/tree/main/docs). For agy, consult the [Antigravity project](https://github.com/google-deepmind/antigravity), your installed `agy --help`, and KitShift's [agy compatibility record](harnesses/agy/COMPATIBILITY.md). See the [changelog](CHANGELOG.md) for kit changes. This repository does not promise a support schedule or a compatibility matrix beyond the verification above.

## Documentation, sources, and licenses

### Documentation

| Need | Reference |
|---|---|
| Choose a skill, see use cases, or find the adopted upstream name | [Skill collection](#skill-collection), [complete skill use-case guide](SKILL-USAGE.md), [Matt Pocock adoption mapping](#matt-pocock-adoption-mapping), and the relevant `skills/<name>/SKILL.md` |
| Work on this repository | [Repository Guidelines](AGENTS.md) |
| Preview, install, or update the kit | [Quick start](#quick-start), [updates and troubleshooting](#updates-and-troubleshooting), [unified installer](scripts/install.mjs), [omp installer](scripts/install-omp.mjs), and [agy installer](scripts/install-agy.mjs) |
| Inspect recorded checks and remaining limits | [Verification and known limits](#verification-and-known-limits), [omp tests](tests/install-omp.test.mjs), [agy tests](tests/install-agy.test.mjs), [state-helper tests](tests/state-helpers.test.mjs), [search-helper tests](tests/search-helper.test.mjs), [omp compatibility](harnesses/omp/COMPATIBILITY.md), [agy compatibility](harnesses/agy/COMPATIBILITY.md), and [changelog](CHANGELOG.md) |
| Change agent guidance without duplicating its owners | [Agent guidance](skills/agent-guidance/SKILL.md), [authoring](skills/agent-guidance/references/authoring.md), and [passive skill contract](skills/agent-guidance/references/skill-contract.md) |
| Trace copied/adapted material and retained notices | The source-family table below, each applicable skill's `SOURCES.md`, and its full `LICENSE*` files; [UI design notices](skills/ui-design/NOTICE.md) cover the nested UI payloads |

This navigation follows the approach in [Aria OMP Config](https://github.com/rizariaputrawira/aria-omp-config#documentation-sources-and-licenses), not its deployment layout or licensing conclusions. KitShift has no central `config/SKILL-SOURCES.md`; its available evidence is package-local. Historical source records may retain Aria-era paths or former skill names; those are not proof that the old files or integrations exist here.

### Skill sources and retained notices

KitShift selectively adapts material from multiple upstream projects, merging overlapping capabilities rather than installing duplicate workflows, and includes locally authored procedures. The source families below are not additive skill counts: one KitShift skill may combine several contributors. The [55-skill collection](#skill-collection) is the inventory; this section records provenance, not another catalog.

This is a mixed-source collection, not a claim that every skill is original KitShift work. The table identifies source families and representative full notices. Each applicable package retains its own notices; its source record defines the exact files, revisions, adaptations, and exclusions. A comparison or license-evidence pin is not necessarily the historical import commit.

| Source | Scope in KitShift | Local evidence and bundled license |
|---|---|---|
| [Matt Pocock skills](https://github.com/mattpocock/skills) | The [Matt Pocock adoption mapping](#matt-pocock-adoption-mapping), plus earlier Matt-derived specification/planning material in `workflow-delivery`. Mixed-source owners retain their other notices too. | MIT: [full notice](skills/code-architecture/LICENSE.matt), [current source mapping](skills/code-architecture/SOURCES.md), and [historical delivery mappings](skills/workflow-delivery/SOURCES.md). The active pin does not replace every historical baseline. |
| [Superpowers — obra / Jesse Vincent](https://github.com/obra/superpowers) | `agent-guidance`, `code-debugging`, `code-review`, `code-tdd`, `workflow-brainstorming`, and `workflow-delivery`. Selected procedures, not the upstream plugin. | MIT: [full notice](skills/agent-guidance/LICENSE.superpowers), [guidance source map](skills/agent-guidance/SOURCES.md), and [delivery source map](skills/workflow-delivery/SOURCES.md). |
| [Open GSD](https://github.com/open-gsd/gsd-core) | `docs-engineering`, `docs-plan-review`, `workflow-delivery`, `workflow-handoff`, `workflow-handoff-read`, and `workflow-retrospective`. Adapted documentation, verification, handoff, and learning procedures—not the GSD runtime. | MIT: [full notice](skills/docs-engineering/LICENSE.gsd), [documentation sources](skills/docs-engineering/SOURCES.md), and [retrospective sources](skills/workflow-retrospective/SOURCES.md). |
| [Ponytail — DietrichGebert](https://github.com/DietrichGebert/ponytail) | `code-simplicity` and its review/debt references. | MIT: [full notice](skills/code-simplicity/LICENSE.ponytail) and [inline adaptation record](skills/code-simplicity/SKILL.md). The exact imported revision is not established by the available package record; see the limits below. |
| [Emil Kowalski skills](https://github.com/emilkowalski/skills) | `code-swift-development`, `ui-expo-motion`, `ui-gesture-design`, `ui-library-selection`, `ui-mobile-web`, `ui-prototyping`, `ui-sonner`, `ui-stress-test`, and `ui-web-motion`. | MIT: [full notice](skills/code-swift-development/LICENSE.emil), [Swift sources](skills/code-swift-development/SOURCES.md), and [dual-source UI-prototyping record](skills/ui-prototyping/SOURCES.md). UI prototyping retains both [Emil](skills/ui-prototyping/LICENSE.emil) and [Matt](skills/ui-prototyping/LICENSE.matt) notices. |
| [Taste family — Leonxlnx](https://github.com/Leonxlnx/taste-skill) | `ui-brand-concepts`, `ui-image-generation`, `ui-image-to-code`, `ui-stitch-design-input`, and the expanded baseline for `ui-taste-frontend`. | MIT: [Leonxlnx notice](skills/ui-taste-frontend/LICENSE.leonxlnx), [brand notice](skills/ui-brand-concepts/LICENSE.taste), [image-source mappings](skills/ui-image-generation/SOURCES.md), [Stitch evidence](skills/ui-stitch-design-input/SOURCES.md), and [expanded Taste evidence](skills/ui-taste-frontend/SOURCES.md). |
| [Taste Skill — tasteskill/tasteskill](https://github.com/tasteskill/tasteskill) | Retained shorter-source comparison for `ui-taste-frontend`, not the identified complete expanded baseline. | MIT, copyright jeettrench: [full notice](skills/ui-taste-frontend/LICENSE.taste) and [source distinction](skills/ui-taste-frontend/SOURCES.md). Both Taste notices remain; neither establishes an ownership transfer. |
| [Impeccable — Paul Bakaus](https://github.com/pbakaus/impeccable) | `ui-design`, its command references, and bundled helper material, subject to the nested notices below. | Apache-2.0: [full license](skills/ui-design/LICENSE), [entrypoint comparison pin](skills/ui-design/SKILL.md), and [attribution/modification notices](skills/ui-design/NOTICE.md). |
| [Platform Design Skills — ehmo](https://github.com/ehmo/platform-design-skills) | The iOS/Android references retained inside `ui-design`; separately attributed from Impeccable. | MIT: [full notice](skills/ui-design/LICENSE.platform-design-skills) and [nested attribution](skills/ui-design/NOTICE.md#platform-design-skills). This does not grant rights to all platform documentation, fonts, or trademarks. |
| [modern-screenshot — qq15725/modern-screenshot](https://github.com/qq15725/modern-screenshot) | `ui-design/scripts/modern-screenshot.umd.js`; the local record identifies an exact-byte match to `modern-screenshot@4.7.0`. | MIT, copyright wxm: [full notice](skills/ui-design/LICENSE.modern-screenshot) and [version/hash evidence and limits](skills/ui-design/NOTICE.md#retained-helper-and-data-limits). This is not a dependency-completeness or security verdict. |
| [Cloudflare Security Audit](https://github.com/cloudflare/security-audit-skill) | `security-audit` and its adapted audit references. | MIT: [full notice](skills/security-audit/LICENSE.cloudflare) and [source map](skills/security-audit/SOURCES.md). |
| [NVIDIA SkillSpector](https://github.com/NVIDIA/SkillSpector) | `security-intake` and its source-only checklist; the scanner/install workflow is not included. | Apache-2.0: [full license](skills/security-intake/LICENSE.skillspector) and [attribution/modification record](skills/security-intake/SOURCES.md). |
| [Anthropic Security Review](https://github.com/anthropics/claude-code-security-review) | `security-review` and its adapted review guidance, not the upstream execution pipeline. | MIT: [full notice](skills/security-review/LICENSE.anthropic) and [source map](skills/security-review/SOURCES.md). |

Additional PR-writing attribution is recorded for [Dex Horthy / Humanlayer's `show-me`](https://github.com/humanlayer/skills/blob/main/plugins/show-me/skills/show-me/SKILL.md) in [the PR source record](skills/git-pr-work/SOURCES.md). That record links a moving upstream path rather than a separately pinned downstream license notice. Matt's retained MIT notice alone should not be treated as proof of complete downstream rights or notice coverage.

#### Matt Pocock adoption mapping

This is one source-specific mapping, not the full KitShift inventory. Its **27** counts upstream skills; the [collection](#skill-collection) contains **55** current KitShift skill packages.

<details>
<summary>Expand upstream-to-KitShift mappings and adaptation boundaries</summary>

The 27 active skills declared by [mattpocock/skills at `5beb35b040e3de97e54fa9e386d7e42d15c295c2`](https://github.com/mattpocock/skills/tree/5beb35b040e3de97e54fa9e386d7e42d15c295c2) are selectively adapted into the owners below. Overlapping disciplines are merged rather than installed as duplicate upstream names. The upstream `in-progress/` and `misc/` packages are not part of this active set.

This adoption added 13 skills and merged into 11 existing owners, for 24 adoption owners within the then-52-skill collection. The current 55-skill collection also includes the three cross-harness helper skills. The documentation-first delivery workflow reuses the standalone specification content contract instead of maintaining a duplicate.

| Upstream skill(s) | KitShift owner(s) |
|---|---|
| `ask-matt` | [workflow-skill-selection](skills/workflow-skill-selection/SKILL.md) |
| `code-review` | [code-review](skills/code-review/SKILL.md) |
| `codebase-design`, `improve-codebase-architecture` | [code-architecture](skills/code-architecture/SKILL.md) |
| `diagnosing-bugs` | [code-debugging](skills/code-debugging/SKILL.md) |
| `domain-modeling` | [docs-domain-modeling](skills/docs-domain-modeling/SKILL.md) |
| `grill-with-docs`, `grill-me`, `grilling` | [workflow-brainstorming](skills/workflow-brainstorming/SKILL.md) |
| `implement`, `implement-spec` | [code-implementation](skills/code-implementation/SKILL.md) |
| `pr` | [git-pr-work](skills/git-pr-work/SKILL.md) |
| `prototype` | [code-prototyping](skills/code-prototyping/SKILL.md) for logic/state questions; [ui-prototyping](skills/ui-prototyping/SKILL.md) for UI alternatives |
| `research` | [workflow-research](skills/workflow-research/SKILL.md) |
| `retro` | [workflow-retrospective](skills/workflow-retrospective/SKILL.md) |
| `setup-matt-pocock-skills` | [workflow-project-setup](skills/workflow-project-setup/SKILL.md) |
| `tdd` | [code-tdd](skills/code-tdd/SKILL.md) |
| `to-spec` | [docs-specification](skills/docs-specification/SKILL.md) |
| `to-tickets` | [workflow-ticket-planning](skills/workflow-ticket-planning/SKILL.md) |
| `triage` | [git-triage](skills/git-triage/SKILL.md) |
| `wayfinder` | [workflow-wayfinder](skills/workflow-wayfinder/SKILL.md) |
| `wizard` | [workflow-wizard](skills/workflow-wizard/SKILL.md) |
| `handoff` | [workflow-handoff](skills/workflow-handoff/SKILL.md) |
| `teach` | [workflow-teaching](skills/workflow-teaching/SKILL.md) |
| `to-questionnaire` | [workflow-questionnaire](skills/workflow-questionnaire/SKILL.md) |
| `wait-what` | [writing-explanation](skills/writing-explanation/SKILL.md) |
| `writing-for-agents` | [agent-guidance](skills/agent-guidance/SKILL.md) |

Newly adopted descriptions use a compact `[Matt Pocock]` source tag followed by the capability's trigger. Merged skills retain combined contributor tags. Each adapted owner records its exact source paths, modifications, and full Matt Pocock MIT notice in `SOURCES.md` and `LICENSE.matt`; previous source records and notices remain.

These adopted procedures are passive instructions packaged for both harnesses, not the upstream plugin or its executables. Explicit-only skills retain `disable-model-invocation: true`; merged owners retain their established exposure. Setup is only needed for the tracker/documentation operations that actually depend on it. No automatic commits, pushes, tracker publication, mandatory subagent topology, universal TDD, or implicit documentation-first baseline is adopted. The optional skill selector recommends a path when requested; it is not a global router.

</details>

#### Historical provenance checks

These checks explain earlier source investigations, not additional skills or separate installation steps. All three packages are part of the [skill collection](#skill-collection).

<details>
<summary>Expand historical Stitch, Taste and UI-design evidence</summary>

Three packages were initially excluded while their source records were investigated, then included with scoped attribution and full notices, not a blanket legal or security certification:

| Package | Established evidence and remaining boundary |
|---|---|
| [Stitch input](skills/ui-stitch-design-input/SOURCES.md) | Leonxlnx's MIT source is corroborated by the Google Stitch contribution and an attributed redistribution. The package preserves the locally adapted procedure and illustrative sample; the exact historical import event remains unknown. |
| [Taste frontend](skills/ui-taste-frontend/SOURCES.md) | Aria's original expanded file exactly matches Leonxlnx's pinned expanded Taste source. The earlier shorter-source comparison did not identify that complete baseline. Both full MIT notices are retained; the current local adaptation is preserved rather than importing newer upstream behavior. |
| [UI design](skills/ui-design/NOTICE.md) | Impeccable's Apache-2.0 and nested platform notice remain. The bundled screenshot helper exactly matches `modern-screenshot@4.7.0`, and its full MIT notice is now included. Remaining nested-rights, helper-security, and external-engine limitations are explicitly retained. |

These source comparisons do not prove original authorship, comprehensive rights clearance, or consuming-agent behavior. No expansion is attributed to the kit's owner merely because it appeared in their configuration.

</details>

### Local guidance and research-only references

The records for [Git change status](skills/git-change-status/SOURCES.md), [commit-message guidance](skills/git-commit-message/SOURCES.md), [writing authenticity](skills/writing-authenticity/SOURCES.md), and [content provenance audit](skills/content-provenance-audit/SOURCES.md) describe locally authored procedures and distinguish conceptual research from incorporated material. This is an authorship/provenance statement, not a new license grant.

`ui-browser` and `workflow-upstream-review` currently have no package-level `SOURCES.md` or license notice. Their presence is not evidence of third-party clearance or a project-wide redistribution grant.

Research citations are not bundled dependencies or permission grants. In particular, the [delivery record](skills/workflow-delivery/SOURCES.md#research-only-ownershipfrontier-evidence--no-titus-text-reused) says no Titus text/template was copied because no covering grant was established. The [writing record](skills/writing-authenticity/SOURCES.md#research-only-inputs-and-disposition) separately identifies unlicensed/unknown-grant and GPL-3.0 research/rejection inputs; it does not identify their code or prose as incorporated into KitShift.

### Attribution and redistribution limits

**No project-wide `LICENSE` file is present.** This README does not add one, relicense third-party content, or grant blanket permission over locally authored material. Follow the actual terms and scope attached to each component rather than labeling the whole kit MIT or Apache-2.0.

- Preserve applicable full copyright, permission, license, and attribution notices with copied/adapted material. For Apache-2.0 components, retain the applicable notices and modification records as required by their terms. A source link or picker description is not a substitute for those files.
- Keep mixed-source notices together: for example, Matt/Emil UI prototyping, Matt/Superpowers/GSD delivery, both Taste notices, and Impeccable's separately licensed nested components.
- Preserve unresolved evidence honestly. Ponytail's inline record references an Aria-era ledger absent here and does not establish an immutable import pin. The [UI notice](skills/ui-design/NOTICE.md) does not comprehensively establish historical import permissions or every nested right. The [historical provenance checks](#historical-provenance-checks) record the narrower Taste, Stitch, and screenshot-helper evidence without claiming complete clearance.
- Fonts, external engines, tools, services, and dependencies are not cleared by an adjacent skill's license. The bundled font-index JSON files are metadata, not font licenses or a bundled font collection.
- Before relying on redistribution permission where evidence is incomplete, establish the exact applicable source, terms, and notice obligations, or exclude the affected material. Attribution is not endorsement, and local presence is not permission.

This is a documentation and local-evidence summary, not legal advice, a compliance certification, or an exhaustive rights/security audit. Upstream plugin installers, executable runners, and compulsory orchestration are not imported merely because their procedures are adapted. README navigation and relative links follow [GitHub's README guidance](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes).
