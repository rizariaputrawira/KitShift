---
name: workflow-brainstorming
description: "[Matt+Superpowers] Use before unresolved creative or behavioral design work, or for an explicit decision stress-test."
---

# Brainstorming

Turn uncertainty into an evidence-backed design whose scope the user can recognize and approve. An existing approved design is context, not a reason to repeat the interview. Skill text grants no tools, runtime keywords, reasoning mode or permission.

## Establish intent and evidence

1. Select a provisional path: **spike**, **bounded**, or **architectural**. Bounded requires an existing affected flow that can actually be inspected. Choose the least elaborate path sufficient for the evidenced risk and uncertainty; change paths only when inspection reveals a concrete need. Briefly state the selected path and its reason.
2. Read the current request, relevant project guidance and existing requirement/design owners. Trace the affected flow and real callers. Discover repo/tool-provided facts rather than asking the user. Use source navigation and, for an existing UI, available read-only DOM/screenshot evidence when it resolves a real visual choice. Missing material context blocks dependent decisions, not unrelated safe inspection.
3. Write back the intended outcome, audience/use, constraints and observable success in a short note. Distinguish supplied facts from assumptions; invite correction. Ask only for consequential missing intent. Do not re-interview facts the request already supplies.
4. Carry that understanding into every proposed choice. Use the current native question interface for material user decisions. A small batch of related, independent questions is appropriate when each has settled prerequisites; keep dependent questions sequential and omit already settled or discoverable facts. An explicit **stress-test** loads [ready-frontier rounds](references/stress-test.md) for systematic decision dependency review, not a default interview quota.

## Approval boundary

The user's direct request supplies authority for necessary work and clearly stated outcomes. Do not seek another approval for requested scope or decisions already made, and after native Plan Mode approval do not add a second design-approval ritual. If the request leaves a materially consequential creative/behavioral choice unresolved, use this skill to present the choice and wait for the user's decision before dependent work. Until then, continue safe inspection and independent work; do not commit to the unresolved direction. Documentation writes and external side effects are permitted only when requested or otherwise within existing authority. Plan Mode returns proposed content through an allowed channel and never writes checkout files. A skill is not a second approval engine: use the current native proposal/approval mechanism where it owns the decision.

### Spike

Present a feasibility question and a two- or three-sentence safe probe, including permitted effects and evidence. A directly requested, harmless in-scope inspection may proceed without a confirmation step; pause only for an unrequested external side effect or unresolved material decision. Report the result, uncertainty and recommendation; label any disposable artifacts accurately. Exploration does not permit retaining, shipping or expanding work beyond the request.

### Bounded

Trace the existing path and answer discoverable facts first. Present a compact in-chat design when an unresolved material choice needs the user's decision: outcome/non-goals, behavior and affected boundaries, errors/compatibility, and observable verification. Direct user direction that settles the path and scope authorizes implementation; do not stop for a redundant approval. No new spec or plan file is required solely by this classification. After approval where a material choice remains, use ordinary OMP development; test-first applies only when requested.

### Architectural

Map load-bearing choices, ownership and prerequisite decisions. Offer two or three genuinely viable approaches with trade-offs and a recommendation. Present reviewable sections covering system boundary, interfaces, data/control flow, errors/security/migration where applicable, and acceptance/evidence. If oversized, agree independently deliverable subprojects without silently discarding requested acceptance.

Reuse the existing canonical spec/requirement/design owner. In an adopted project resolve the information's actual canonical ID and exact path through `skill://docs-engineering/references/locations.md` and the manifest; do not create an independent dated-spec tree. Before adoption preserve existing locations and use an authorized project convention only when a separate owner is necessary, without implicit setup. A direct request or native Plan Mode approval authorizes only its stated path, scope and settled choices, not a materially different direction. Write agreed design content within requested scope without another approval ritual; seek a decision only for unresolved material choices or changed scope/consequences before dependent work. Native Plan Mode carries proposal stages without duplicate written-document approval.

When the user explicitly selects documentation-first delivery or the project requires it, load enabled, available `skill://workflow-delivery` for the authorized transition. Otherwise use proportionate native planning and delivery; substantial scope alone does not impose a documentation baseline. Do not load implementation procedures before their boundary is authorized.

## Finish

Restate the selected scope, acceptance, unresolved assumptions and authorized next stage. Completion is a reported spike result or a reviewable design with the actual approval status—not merely presenting options. Changed material requirements or scope require native reapproval. No automatic commits, mandatory delegation, visual-companion service or keyword-trigger assertions are part of this procedure.
