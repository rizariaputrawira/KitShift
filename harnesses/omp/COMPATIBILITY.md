# omp integration compatibility

This directory owns omp configuration, deployment notes and verification records. Shared skills remain harness-neutral; no other harness integration is established here.

## Contract

- The [shared passive skill contract](../../skills/agent-guidance/references/skill-contract.md) owns packaging, discovery, invocation and permission rules. This document records integration evidence, not another authoring procedure.
- Installation and managed updates remain separate explicit operations through [`scripts/install-omp.mjs`](../../scripts/install-omp.mjs). The installer does not remove retired source paths from an existing installation; renamed references may leave old installed files until an explicitly authorized migration removes them.

## Version-specific checks

For a requested omp assessment, read the packaged [omp compatibility companion](../../skills/docs-engineering/references/omp-compatibility.md). It selects the shared [harness compatibility procedure](../../skills/docs-engineering/references/harness-compatibility.md) and owns native commands, official version-pinned sources, isolated loading checks and permission/evidence limits. It is installed with the skills and does not depend on this repository-only document.

## Observed portability revision

On Linux/WSL2 with Node.js 24.20.0 and omp 18.12.6, isolated native reads matched all 52 candidate skill bodies and the renamed `skill-contract.md` and `harness-compatibility.md` references exactly, without inference. The final browser-safety correction was reloaded separately. All four installer scenarios passed; metadata, licenses and bundled scripts were preserved, and 773 relative links/anchors resolved across skills and affected operator documents.

Ten fresh source-loaded task actors recorded `openai-codex/gpt-6-luna` and read-tool actions only. Four baseline/candidate pairs covered handoffs without delegation, an ordinary typo proposal, deliberate skill disablement and browser routing without shell/CLI support. Source review restored strict session isolation after an intermediate rewrite weakened it; the corrected browser case and ordinary countercase then passed reassessment. No disabled skill body was read. Baseline decisions also succeeded.

## Observed unified authoring contract

After merging the native authoring companion into the shared contract, isolated omp 18.12.6 reads matched the tested `agent-guidance/SKILL.md`, `references/authoring.md` and `references/skill-contract.md` snapshot exactly. All 52 frontmatters and affected full notices were unchanged; 128 relative file links resolved. An installer dry run included the shared sources, excluded the retired companion and left its target absent. All four installer scenarios passed.

Two final source-loaded runs observed `openai-codex/gpt-6.1-sol`, with `medium` thinking requested. The skill-package case followed entrypoint → authoring → shared contract and produced a conditional correction-review draft. The ordinary team-guidance countercase read authoring without loading the packaging contract. Both returned drafts using read tools only, without writes or execution.

## Limits

These are bounded source-loading and synthetic draft/decision observations for their tested snapshots, not guarantees for future revisions or compliance. Neither establishes comparative behavioral improvement, other-runtime compatibility, browser execution, MCP connectivity or OS containment. The unified-authoring checks also do not establish automatic skill selection or interactive invocation.

Neither assessment changed the active installation, configuration, model/approval settings, credentials or services.
