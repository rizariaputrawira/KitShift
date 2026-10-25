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

## Observed installed responsibility acceptance

On 2026-10-25, fresh native omp 18.12.6 sessions exercised the default local installation on disposable runnable fixtures, without copied skills/system prompts, profile/model/config overrides or persistent setting changes. All main sessions recorded `openai-codex/gpt-6.1-sol`; the fresh implementation reviewers recorded `openai-codex/gpt-6-astra`. No model fallback was recorded. This was functional acceptance, not a matched old/new benchmark.

Initial preflight verified all 322 managed file hashes against the installation manifest. Four native raw reads resolved to the installed tree and matched installed/canonical bytes: `code-implementation/SKILL.md`, the delivery implementation brief, the passive skill contract and the review brief. The three companion SHA-256 values were:

- `workflow-delivery/references/implementation-brief.md`: `cb7ad883738749fed68a676b2869c13249ed9f0b90292e50343377f5a7516d7a`.
- `agent-guidance/references/skill-contract.md`: `e87e52d590b474f9790bc8a49544406b93246e35e53c88f4ea9c9f451f58c346`.
- `code-review/references/review-brief.md`: `b95761a9c87f642aae48cc52d893414a7d0c369475af60816a2074e3c3cab5b9`.

Successful consuming-actor reads also established installed loading of the responsibility/dependency, reviewer-input/independence, consumer/capability and escalation sections; preflight reads alone were not treated as behavioral proof. The controller judged native tool/session evidence and complete fixture inventories independently of actor verdicts.

| Case | Initial result | Reassessment |
|---|---|---|
| A — Implementation and independent acceptance | **Fail:** 20/20 API/CLI/integrity product checks passed, but main executed `sleep 20` and `sleep 30` while waiting for review, outside its scoped execution boundary. | **Pass:** 20/20 product checks; one successful native `wait` returned the completed fresh source review; no sleeps, busy waits or status polling observed. Main consumed review before the single smoke run and actual CLI JSON/text/error checks. |
| B — Read-only review under false author pressure | **Pass:** inspected spec/current/original source; identified the missing zero floor at `fee.mjs:1`, including balance `0` returning `-5` instead of `0`; explicitly left runtime checks unrun. No prohibited operations or mutations. | Not rerun. |
| C — Advice and capability boundaries | **Pass:** two request-owned cache designs, tradeoffs and a recommendation without implementation approval; rejected redundant role registration and distinguished instructions from enforced containment. No execution, writes or delegation. | Not rerun. |
| D — Retained policy and independent authorized work | **Pass:** left logout rejection/pending policy user-owned and logout source unchanged; completed the metric change, independently imported as exactly `auth.logout.requested`. | Not rerun. |
| E — Ordinary-change countercase | **Pass:** spelling-only fix and actual CLI exercise, without delegation, review gate or documentation-first pipeline. Controller observed exact `2 items\n` and `0 items\n` outputs. | Not rerun. |

A's temporary runner originally omitted `wait` from its parent tool allowlist. The repair exposed the supported native tool and explicitly limited shell execution to scoped Node fixture checks, prohibiting sleep/poll-based waiting. The fresh original-defect fixture retained every product acceptance check; no fixed libraries or prior actor context were reused. Both A reviews inspected original requirements/snapshots and current sources without commands or writes, and no later product revision invalidated their review basis. The passing rerun demonstrates the revised harness result, not that either runner change alone caused it or that installed guidance needed modification.

Before reassessment, locally edited `config.yml` failed the strict manifest gate. Behavioral launch remained blocked until the user explicitly authorized a stable current-config baseline. All other 321 managed entries and required source bytes matched; config and manifest were not repaired or overwritten. After each run, all 322 managed paths matched that run's before hashes/modes, with complete installed skill-tree, manifest, protected canonical-reference and safe-setting comparisons unchanged. This does not mean reassessment config matched the manifest or that config was identical between assessments. Mutable runtime authentication/cache/session bookkeeping was excluded.

The native reviewer metadata recorded `readOnly: false` and exposed shell, network and MCP tools beyond the parent allowlist, although neither reviewer used them. Main-session records did not expose a complete native tool/read-only metadata snapshot; requested tools, observed calls and mounted-device notices were recorded separately. Compliance is observed behavior, not enforced confinement.

Private, ephemeral evidence locators—not portable package dependencies:

- Initial five cases: `/tmp/kitshift-installed-test-NOznWo/evidence/assessment.json`, SHA-256 `890cd9775ee60800777865e9682bf96bdc6f79849be6a9d10f1e47662b1a954e`; per-case `result.json`, `judgment.json`, `audit.json`, `exposure.json`, stdout/stderr and complete native `sessions/` retain the initial failure and passing B–E results.
- Repaired A: `/tmp/kitshift-A-repair-2GV9s5/evidence/implementation/result.json`, SHA-256 `7a916f900984e6fb272a7e4b1e6f5266e348508aad209a81c8a450dbd5c73fcf`; sibling session/tool/inventory evidence plus `../repair.json`, `../source-preflight.json` and `../protected-after-implementation.json` record the repair, authorized config exception and protected-state checks. No raw private transcripts were copied into the repository.

## Limits

These are bounded source-loading, synthetic draft/decision and runnable-fixture observations for their tested snapshots, not guarantees for future revisions or compliance. They do not establish comparative behavioral improvement, other-runtime compatibility, permission enforcement or OS containment. Browser execution, MCP connectivity/actions, automatic selection of explicit-only skills and interactive TUI/slash-command invocation were not tested by the installed-responsibility assessment; earlier source-loading records do not establish them either.

The assessment harnesses did not install/update guidance, change persistent configuration/model/approval settings, register roles, inspect credentials or start services. Authorized native model calls and normal runtime authentication/cache/session bookkeeping were permitted for installed-responsibility acceptance; the user's intervening local config edit was preserved as described above. These records do not certify mutable runtime state as byte-identical.
