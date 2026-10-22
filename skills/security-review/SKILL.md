---
name: security-review
description: "[Anthropic] Review security risks in a supplied diff or explicit base/head change boundary."
---

# Security change review

Adapted from Anthropic's pinned security-review command; see [SOURCES.md](SOURCES.md) and [LICENSE.anthropic](LICENSE.anthropic). This is passive OMP guidance, not the upstream CLI/CI action.

1. Establish the supplied diff and exact base/head or worktree basis, requested paths, relevant requirements and security invariants. If the diff/change basis is absent, state exactly what is missing and ask scoped questions; do not invent changed lines or quietly replace the request with a whole-codebase audit.
2. Read [change-review.md](references/change-review.md). Inspect every relevant changed path and surrounding callers, enforcement, framework behavior and alternative paths needed to understand its security consequence.
3. Load the shared [source-review procedure](skill://docs-engineering/references/security.md#source-review-procedure), [evidence and finding decisions](skill://docs-engineering/references/security.md#evidence-and-finding-decisions) and [delegation and challenge](skill://docs-engineering/references/security.md#delegation-and-challenge). The controller owns scope and records, and may inspect directly or delegate through actual available native read-only roles when permitted and useful. Use their actual role/result contracts and the user's requested format; a role name is not proof of exact loaded-file provenance or containment.
4. Trace candidates and challenge each against the strongest actual controls. Separate discovery, challenge or coverage staffing is conditional on explicit requirements or concrete independence needs, not a universal pipeline. Controller challenge is not independent review; unavailable required independence is a stated limit, not a pass. Preserve confirmed, needs-validation and rejected decisions with their evidence and decisive gaps.
5. Report the changed boundary, inspected/unavailable/out-of-scope coverage, candidate dispositions and unresolved gaps, pre-existing concerns separately, and precise assurance limits. Source-confirmed is not runtime-exploited. A failed or unusable delegated report is a coverage gap, not evidence that the change is safe.

All target inspection is read-only: no edit, execution, network fetch, credential-location inspection or delegation by reviewers. A simple authorization patch does not trigger a whole-codebase audit. Do not impose numerical confidence gates or universally exclude AI, availability, dependencies, tests, docs or client code; relevance comes from the actual attacker path and invariant.
