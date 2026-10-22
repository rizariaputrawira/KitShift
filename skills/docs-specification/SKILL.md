---
name: docs-specification
description: "[Matt Pocock] Synthesize an already-discussed request into a source-grounded specification without re-interviewing."
disable-model-invocation: true
---

# Specification
Turn the current request, discussion and repository evidence into a reviewable specification. This is synthesis, not another interview and not permission to publish or implement.
 
1. Read the request, supplied decisions, existing requirements/design owners and relevant project guidance. Explore the affected implementation and consumers only where that evidence is missing. For domain terms and ADRs, read the established canonical records; when unresolved terms or relationships need modeling, use `skill://docs-domain-modeling`.
2. Preserve supplied decisions; separate intended behavior from observed implementation. Identify actor/problem, outcome, constraints, affected boundaries, failure/recovery paths, exclusions and genuinely unknown facts. A material unresolved choice routes to `skill://workflow-brainstorming`; do not ask again about settled context.
3. Prefer the highest existing consumer seam that can prove each criterion. Specify input/preconditions, independently derived expected behavior and relevant negative/error result. Propose a new seam only when existing ones cannot prove acceptance, naming the concrete gap.
4. Synthesize with the canonical owner's format. For substantive acceptance criteria/content structure, read [content contract](references/content-contract.md): cover applicable problem/source basis, solution/observable acceptance, useful actor flows, implementation contracts, testing/evidence, boundaries/errors and exclusions/open facts. Avoid padding and invented extensive stories. Keep stable requirement IDs and link rather than duplicate canonical decisions.
5. Reuse the existing requirements/design owner. In an adopted project resolve exact owner and path through `skill://docs-engineering/references/locations.md` and its manifest. Before adoption preserve existing locations. Do not create a parallel dated-spec tree or silently relocate records.
6. Return proposed content for review. Persist only where requested/authorized, preserving current edits. Publication is separate: publish to a configured tracker only when the user explicitly authorizes publication and a real tracker contract exists; use tracker-native identities/links and label vocabulary. Never infer publication permission from a spec request, filename, label or status.

Done when an independent reader can identify the requested behavior, constraints, errors, exclusions and proof without guessing, and the content's review/persistence/publication status is explicit. A spec does not approve implementation. Documentation-first delivery applies only when selected by the user or required by project policy; otherwise no doc-first gate is added.
