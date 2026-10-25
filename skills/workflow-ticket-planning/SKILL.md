---
name: workflow-ticket-planning
description: "[Matt Pocock] Break an approved plan or request into complete tracer-bullet tickets with explicit blockers."
disable-model-invocation: true
---

# Ticket planning

Turn approved scope into a dependency map of independently verifiable end-to-end slices. Planning does not authorize implementation or tracker writes.

1. Gather current request, approved spec/plan and relevant codebase/domain context. Read referenced issue/spec bodies and comments when supplied. Discover existing interfaces and terminology; for domain concepts/ADRs consult canonical records and [docs-domain-modeling](../docs-domain-modeling/SKILL.md) when modeling is needed.
2. Preserve all acceptance criteria. Identify any prerequisite refactoring only when evidence shows it is required to make a slice safely land; do not add speculative work. Prefer narrow complete tracer bullets across relevant layers, each independently demoable/verifiable, over horizontal layer tickets. Default to a clean cutover that migrates all affected callers and removes obsolete paths. Use expand → migrate → contract only when an actual approved compatibility requirement requires a staged migration; name that requirement and the removal condition, not a speculative compatibility layer.
3. Build a directed blocking graph. A ticket lists only genuine prerequisites; no blockers means it can start. For a real output/input dependency, read [implementation brief — Dependency handoffs](../workflow-delivery/references/implementation-brief.md#dependency-handoffs) and use that contract to identify the promised producer output/locator, consumer expectation and handoff ownership. A blocking edge alone does not pass outputs/context or establish input readiness; planning describes the promised handoff, not an already produced or verified artifact, and does not dispatch workers. Check for cycles, missing prerequisite edges, edges that merely express ordering preference, and orphaned acceptance criteria. The planning frontier is open tickets whose blockers are complete, subject to input readiness before execution. Show every ticket's title, end-to-end outcome, measurable acceptance and blockers; explain the dependency rationale where non-obvious.
4. Present the proposed breakdown for user review when granularity or dependency choices remain material. Batch independent decisions; do not re-ask settled scope. Directly authorized settled choices need no redundant approval. Reconcile feedback and recompute the graph; changed scope requires applicable native reapproval.
5. Publish only when explicitly authorized and a configured tracker's real contract is available. Local markdown uses one ticket per file with explicit `Blocked by` names/links. GitHub/GitLab or another configured tracker uses native blocking relationships when supported; otherwise record blockers clearly in each ticket. Create blockers before dependents so references resolve. Use configured label vocabulary only when instructed by that tracker contract; do not assume `ready-for-agent`. Never close or modify a parent issue as part of ticket publication.

Done when every approved criterion is covered, every ticket is a complete verifiable slice, the graph is acyclic and accurately describes genuine blockers, and the draft/published state and authorization are explicit.
