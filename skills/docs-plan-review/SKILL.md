---
name: docs-plan-review
description: "[Open GSD] Review consequential multi-slice plans for read-only coverage and integration before proposal or reapproval; trivial edits bypass it."
---

# Plan Review

Input: an accessible proposed/approved plan and relevant canonical requirement/design/decision sources. This procedure reviews the plan's ability to deliver; it does not implement, run verification, write or approve a plan. Review grants no execution authority; follow the current request and native approval boundaries.

For an adopted project resolve relevant IDs/owners through `docs/docs-engineering.yaml` and [documentation locations](../docs-engineering/references/locations.md), then inspect their actual content/anchors. Do not infer alternate locations or require duplicate copies. Adoption is not a prerequisite for ordinary plan review.

1. Read the exact plan, its source basis and relevant current canonical acceptance/constraints. Read affected code/callers only as needed to establish real interfaces, prerequisites and integration routes. A plan title, requirement ID or source-loaded worker advice is not semantic coverage. Missing material sources produce an incomplete review, not a pass.
2. Load [coverage checklist](references/coverage-checklist.md). Work backward from each requested outcome. Produce `criterion → deliverable → integration → observable proof`, with exact anchors and covered/partial/uncovered/unknown status. Include negative/failure behavior and every consumer boundary, not just artifact creation.
3. Test declared and implicit dependencies, producer/consumer contracts, mutable-state ownership and one-way decisions. Compare fixed approved decisions with plan actions, and identify both unapproved additions and silent reductions. Check that current actionable feedback is in the executable plan or has an explicit disposition there.
4. Report blockers, warnings and info with the failed invariant, exact observed evidence and needed decision or proof. Suggested remedies are optional routes, not reviewer-owned scope. A blocker means required delivery/authorization/safety/proof cannot be established; a warning identifies a concrete nonfatal risk; info is advisory preference. Do not soften missing acceptance into a warning to avoid conflict.
5. State inspected/unavailable/out-of-scope sources and what remains unresolved. “No blocker found in inspected scope” is not implementation proof or approval. Do not execute planned checks or infer that a command passes.

The current assistant may delegate useful bounded source inspection through available native task interfaces when permitted by the current task and delegation rules. Load this procedure and bind the assignment to its read-only contract. The parent retains integration ownership; no fixed model, worker, consultation service or independent-review gate is required by this skill. Resolve discoverable facts before raising an unresolved consequential decision through the current native question/approval interface.

When Plan Mode or child-tool restrictions affect the review, establish the actual available interfaces and limits from current schemas/help or version-specific source. Do not assume a fixed excluded-tool list or shared-file behavior. A draft is not approval or an automatic execution handoff. Runtime tool restrictions and read-only instructions do not establish OS isolation. No additional approval interaction, model category, routing registry, fixed review-loop cap or new tracking state is introduced.

Provenance and notice: [SOURCES.md](SOURCES.md).
