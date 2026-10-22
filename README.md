# KitShift

One kit. Any harness.

My personal coding-agent setup: reusable skills and guidance, plus harness-specific settings and MCP connections. The initial supported harness is **omp**. Pi, Antigravity CLI, and Claude Code are intended targets, not implemented integrations.

## What's here

- `skills/`: current installed omp skills with their supporting references, scripts, assets, source notes, and license notices. These are a personal collection, not all original KitShift work.
- `guidance/APPEND_SYSTEM.md`: personal preferences appended to omp's native prompt.
- `harnesses/omp/config.yml`: current persisted omp preferences. Unspecified settings follow the installed omp version's defaults.
- `mcp/omp.json`: non-secret MCP template for Playwright, GitHub, and OpenDesign Cloud or Local Codex workflows.
- `scripts/install-omp.mjs`: explicit copy-based installation and update, without linking your live setup to this checkout.

The snapshot was taken with **omp 18.12.6**. It preserves the selected model-role identifiers; availability depends on your provider account and installed omp version.

## Privacy and permissions

This is a public repository. Authentication databases, OAuth tokens, API keys, sessions, caches, old backups, and private handoffs do not belong here. Authenticate separately on each machine. GitHub MCP resolves authentication through your local `gh` login rather than a committed token.

**The omp configuration uses `tools.approvalMode: yolo`.** This preserves my personal preference, not a safe default for everyone. Targeted destructive-Git approval patterns are not OS isolation and do not cover every tool or shell spelling. Review the configuration before installation; change the repository copy if you want different behavior.

The installer does not install omp, Node.js, GitHub CLI, browsers, MCP packages, or design software. Their versions and credentials remain machine-local.

## Install omp

Prerequisites: Node.js 20 or newer, omp, a separately installed Playwright MCP package and Chromium browser, the local design CLI used by OpenDesign Cloud or Local Codex, and GitHub CLI (`gh auth login`).

```bash
git clone https://github.com/rizariaputrawira/kitshift.git
cd kitshift

node scripts/install-omp.mjs --dry-run \
  --playwright-cli /absolute/path/to/playwright-mcp/cli.js \
  --browser /absolute/path/to/chromium/chrome \
  --open-design-cli /absolute/path/to/design-daemon/bin/od.mjs
```

Replace those three paths with existing local files. They are required on every install, dry run, and update; the installer validates them but does not execute them. It records the Node executable used to run the installer in the generated MCP configuration.

Inspect the preview, then rerun without `--dry-run` to install into `~/.omp/agent`. Use `--target /path/to/agent-directory` to select another destination. There is no automatic replacement of conflicting existing configuration; preserve it outside the destination and reconcile it deliberately. Start omp normally after installation and authenticate your model provider separately.

For updates, run `git pull --ff-only`, then the same installation command with `--update` (and optionally `--dry-run` first). Keep the destination's private `.kitshift-manifest.json`: it tracks managed file hashes and protects local edits from replacement.

The design MCP definition expects its local daemon at `http://127.0.0.1:7456`. GitHub MCP uses the account available to `gh` on `PATH`. Browser output goes under the chosen agent directory's `cache/playwright-mcp`. These services are not started or authenticated by installation.

### Deliberate publication exclusions

The installed originals of `stitch-design-input`, `taste-skill`, and `ui-design` are **not included** in this public kit. Their source notices identify unresolved redistribution provenance or bundled-dependency license completeness. This export leaves those originals untouched. Other skills may mention them; those references do not install the excluded skills or establish support for them.

## Verification

Run the conflict/update regression scenarios with:

```bash
node --test tests/install-omp.test.mjs
```

Initial verification on Linux/WSL2 with Node.js 24.20.0 and omp 18.12.6:

- Four installer scenarios passed: no-write preview, unmanaged conflict with no partial writes, explicit updates with local-edit protection, and symlink-ancestor rejection.
- Installed 185 managed files into a temporary agent directory; verified private file modes and all three rendered MCP definitions.
- Native omp RPC startup loaded the personal guidance and discovered installed skills with zero messages. This used a synthetic startup-only model credential and explicit model selection; no inference request was sent.
- MCP servers were disabled only for that startup probe. MCP connectivity, provider authentication, configured model-role availability, other operating systems, and skill behavior were not exercised.

The startup probe reused the existing omp native library through a temporary link; the kit does not distribute that runtime dependency. The installed configuration snapshot is byte-identical to the source; its unspecified defaults can change with omp upgrades.


## Ownership and updates

Edit the repository's canonical files, then explicitly install updates. Installation refuses conflicting existing content. It must not silently replace an independently configured omp installation. Files already identical to the kit can be adopted; subsequent updates replace only previously managed files that have not been modified locally. Resolve local edits deliberately before updating.

Installation is not continuous synchronization. Changes made by omp or by hand in its destination directory are not automatically exported back into this repository. Obsolete files are not automatically deleted.

## Attribution

Keep every skill's `SOURCES.md`, `NOTICE.md`, and `LICENSE*` files with the skill. Licenses and provenance vary across this collection; no repository-wide license grants additional rights over third-party material. Source notes may describe adaptations and unresolved provenance. Inclusion is not a claim of independent authorship or a full security, behavior, or licensing audit.

The organization was informed by [mattpocock/skills](https://github.com/mattpocock/skills). Its installation script was not copied.
