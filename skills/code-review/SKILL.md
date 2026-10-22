---
name: code-review
description: "[Matt+Superpowers] Review requested PR, branch, WIP, working-tree, or correction changes for correctness, standards, and spec fidelity."
---

# Code Review

Default to read-only review. A review request does not authorize fixes, checkout/index changes, test execution, publishing or approval. Judge actual consequences against inspected sources, not heuristic smells or implementer confidence.

## Establish the exact review basis

1. Determine the requested comparison from explicit input, PR metadata and accessible branch context. Resolve meaningful base/head or merge-base semantics; do not silently substitute a familiar range. For WIP, include requested staged, unstaged and untracked content, not merely committed `HEAD`. State the included/excluded paths and snapshot basis. Empty scope is reported as no changes; unavailable comparison content is a gap, not an invented diff.
2. Find the originating requirements/spec/current authorized brief and applicable repository standards. Reuse existing owners and supplied context; no issue-tracker installation/setup is required. Missing spec remains **Spec unknown**, never Spec pass. Ask only for an unavailable material basis after using accessible evidence; the Standards/correctness axis may proceed independently.
3. Read changed behavior with enough surrounding implementation, enforcement and real callers to judge it. Trace affected producer/consumer contracts, error paths, data ownership and relevant tests. Diff context is a starting point, not a ban on reading decisive unchanged code. Record material coverage limits rather than claiming whole-repository review.

## Two independent verdicts

- **Standards/correctness:** Compare actual behavior with documented project rules and language/runtime contracts. Inspect errors, state/lifecycle, resource ownership, relevant security/performance risks and consumer-visible test quality. A finding identifies a plausible triggering path, wrong result/consequence, exact source location and minimal actionable remedy. Project conventions win over taste; report no standalone smell or speculative abstraction demand.
- **Spec:** Map each material requested criterion to implementation and evidence. Identify missing, partial, misunderstood or extra behavior. Cite the actual requirement and the decisive implementation/caller evidence. Scope changes and contradictions in the spec are decisions for the current owner, not reviewer authority. A requirement needing inaccessible runtime proof is unknown, not fulfilled because code exists.

Keep the verdicts separate so one pass cannot mask the other's failure. Use pass/issues/unknown within the stated source coverage; observed behavior evidence has its own actual status. Pre-existing unrelated defects are labeled separately. A plausible correctness problem outside explicit spec wording can be a correctness finding, but is not an invented Spec requirement.

For a task/merge review or authorized source-inspecting review worker, load [review brief](references/review-brief.md). Main may split genuinely independent work using available native roles only; reviewers do not delegate or mutate. A diff-only reviewer is not an independent source inspection for claims requiring surrounding controls. No mandatory fleet, model tier or reviewer gate is imposed.

## Correction review

When previous findings and a fix are supplied, load [fix review](references/fix-review.md). Account for every prior finding as **addressed**, **not-addressed**, or **needs-evidence**, inspect newly introduced defects, and distinguish current source correction from exercised remediation proof.

## Report

State scope/basis and reviewed sources; give separate Standards/correctness and Spec verdicts, evidence-backed findings with consequence and severity under the current reporting contract, relevant strengths, coverage gaps/exclusions and actual observed checks. Use the native role's schema when dispatched; do not force a different field dialect. Never claim tests passed from a command recommendation, truncated report or author's assertion. Recommend needed checks to the authorized verifier instead of running them automatically.
