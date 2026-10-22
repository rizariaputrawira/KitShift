# Information sequence and lifecycle actions

## Lifecycle phases
Phases identify information roles, not universal numbered execution gates or a mandated lifecycle. Only explicitly selected or project-required documentation-first delivery uses the reviewed pre-code baseline owned by `skill://workflow-delivery/references/documentation-baseline.md`; native permissions remain authoritative. Its selected boundary must be ready before app implementation. New-app/substantial scope alone does not impose that workflow.

| Phase | Information role |
|---|---|
| 0 | Inspect/classify evidence, owners, obligations, uncertainty, data and trust risk |
| 1 | Business/product/game vision, audience, outcomes, scope and constraints |
| 2 | Behavior, quality/security/platform requirements, stories and acceptance |
| 3 | Architecture concerns, context/views and consequential decisions |
| 4 | Detailed data/state/sequence/error/dependency/integration/platform and interface design |
| 5 | Cross-cutting security formalization: allocated threats/controls/residual-risk ownership |
| 6 | Verification planning and actual execution/evidence when due |
| 7 | Implementation support and source-linked review, without a documentation execution queue |
| 8 | Release/deployment/configuration/migration/rollback/store preparation |
| 9 | Operation/observability/recovery/incident/service information where applicable |
| 10 | Reader-specific user/admin/task/reference information |
| 11 | Release assurance, approvals, risk disposition and scoped observed evidence |
| 12 | Maintenance against verified changes, incidents, source/platform/policy triggers |

Security starts at phases 0 and 2, not phase 5. Behavior/quality/security/story/test-strategy work may proceed in parallel after stable product facts. Detailed/API/data/threat/deployment/platform design may proceed in parallel after sufficient relevant architecture boundary inputs. Iteration feeds update triggers rather than reciprocal prerequisites. Missing inputs permit explicitly provisional drafts, not approval/active constraints or verified completion.

Independent drafts mean safe inspection and authorized document/design work, not permission to start app code before that boundary's complete required baseline. Review consumed prerequisites before downstream commitment. Release/user/recovery plans can be due before code; actual test/release/restore/store reports are due only after observation, regardless of numeric phase.

## Dependency rules
Catalog dependencies are true information prerequisites, not mandatory files. `srs -> brief` means meaningful originating need/scope is required, possibly an existing README purpose or GDD section, not a command to create a brief/PRD. `technical-design -> architecture-description` means relevant structural/constraint information, not every view. Threat analysis needs classification/trust; controls need security invariants/threat assumptions; cases need acceptance; observed reports need actual case/method basis. Design planning does not wait for downstream release test success. Requirements can be approved before implementation verification.

Graph direction is concept -> prerequisite. Known IDs only, no self edges or cycles. Family defaults are not a blanket waterfall: artifact edges carry purpose-specific minimum input. Informational references/downstream evidence/feedback are related links or update triggers, not prerequisites. The selected manifest `depends-on` captures actual necessary owner-entry information; creation graph does not automatically load all references into context. Equivalent existing sections/evidence can satisfy an edge without selecting another file. Report each input as sufficient/missing/provisional and parallel opportunities; do not store current-agent/current-wave/execution-state.

For implementation planning, choose a real production-quality end-to-end tracer through the required producer/consumer boundary and verify its acceptance before expansion. A scaffold, disconnected layer or reduced criterion is not that tracer. Name exact consumes/produces interfaces, necessary prerequisite evidence and unresolved one-way choices; parallelize only genuinely independent work. Sequence here remains an information view, never a GSD executor or manifest task queue. For consequential multi-slice plans load the single `skill://docs-plan-review/references/coverage-checklist.md` before native proposal/reapproval; do not duplicate its checklist or create another approval gate.

For gated delivery, first prepare/review required whole-boundary information through the delivery-owned baseline, then implement its authorized tracer. A slice cannot evade required architecture/design/test intent. `status`, `next` and `sequence` distinguish due pre-code gaps from later runtime evidence.

## Eight native actions
Use `/skill:docs-engineering <action>` arguments, not custom slash commands or a shell CLI. Plan Mode stays read-only and returns proposed writes through native approval.

For each action's procedure, permission boundary and observable completion, read [Native arguments](../SKILL.md#native-arguments); this reference owns information order and prerequisites, not a second action contract.

## Create and maintain boundaries
A requested name without unmet information need is not a creation trigger: explain the existing canonical coverage and leave it intact. Unknown aliases never imply custom concepts; custom concept needs explicit purpose/owner after actual need is established. Required external composition unavailable blocks dependent design content, not unrelated authorized documentation. If facts cannot finish an existing draft, name exact missing inputs and preserve draft/incomplete/blocked state; do not mark it complete.

For a material change resolve context before work, preserve existing approvals, and assess documentation impact after observed verification. Maintain only affected requirements/contracts/design/security/release/test/evidence; keep shared mobile owner singular and distinct platform deltas. A worker completion report or missing runtime evidence supports proposed impact, not verified implementation. Audit changed trace/security scope after authorized updates; this is not a replacement delivery framework or automatic tool/skill installation.
