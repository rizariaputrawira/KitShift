# Focused change-review procedure

## Establish the change, not a guessed branch

Record the supplied diff locator and base/head identities, worktree/untracked inclusion when supplied, requested change scope and unavailable portions. Read actual diff text and affected source rather than treating filenames as coverage. If a declared base/head is inaccessible, identify the missing comparison basis. Safe surrounding-source inspection may continue, but it cannot become a completed diff review.

Read current owning requirements, threat/security decisions and relevant existing secure patterns. State conflicts between intended behavior and implementation instead of treating code as permission to weaken an approved invariant. Distinguish newly introduced, worsened and pre-existing behavior. Pre-existing issues may be useful context but are labeled separately, never attributed to fictitious changed lines.

## Compare and trace

For each material change:

1. Name the lower-trust actor, starting capability, input/resource selector, protected principal/asset and expected invariant.
2. Trace the input through identity, normalization, authorization, parsing, state transitions and final security-relevant sink. Inspect direct callers, wrappers, middleware and framework defaults at the pinned version where source establishes them.
3. Compare sibling/batch/export/import/retry/error paths to the same effect. A gate's existence is insufficient: check the exact principal, tenant, object, operation and timing it binds.
4. Read the strongest preventing layer before drafting a candidate. Check default-denial, failed dependency, revoked/stale state, partial failure and recovery only where accepted by the interface.
5. Name the consequence supported by the trace. Do not elevate a same-principal operation to privilege gain, a crash to code execution, or a missing best practice to vulnerability.
6. Record unresolved deployment, provider, proxy, framework or runtime facts exactly. No assumed absence/presence of external controls, invented traffic or reproduction results.

Consider query/command/template/path/deserialization and output injection; identity/session/key lifecycle and tenant/object authorization; sensitive disclosure, retention, export and storage; irreversible business transitions; shared resource/cost and release identity. Read [attack classes](../../security-audit/references/attack-classes.md) and only affected companion references for AI, availability or supply chain. Review actual trust use even in Markdown, tests, shell or client code; do not import blanket upstream exclusions or guesses that a language/framework makes defects impossible.

## Challenge and report

Follow the shared [evidence and finding decisions](../../docs-engineering/references/security.md#evidence-and-finding-decisions) and [delegation and challenge](../../docs-engineering/references/security.md#delegation-and-challenge). Keep stable local identifiers and each candidate's attacker capability, invariant, real source/caller trace, preconditions, strongest controls, credible impact, missing facts and scope. Reconstruct decisive source and actively attempt to disprove the proposed consequence against the strongest controls; do not merely accept an author's excerpt. Confirmed requires complete evidence for the bounded source-visible consequence, not runtime exploitation. Retain disproof as rejected and decisive missing facts as needs-validation.

The controller may perform that challenge directly or delegate through actual available native read-only roles when permitted and useful. Separately staffed discovery, challenge and coverage review are conditional on explicit requirements or concrete independence needs. Controller challenge is not independent review; if required independence is unavailable, state the limit. Use actual native role/result contracts and the requested output format rather than custom arrays, identifier keys or identity receipts.

Report scope/source basis and the evaluator/operations actually observed, inspected and deferred paths, new/worsened decisions, separate pre-existing concerns, unresolved candidates and root-cause-specific remediation recommendations. Do not infer exact loaded-file provenance or sandboxing from a role name or report. No automatic code changes, PR posting, CI action, commit or scanner. Confirmed source proof states source method and source-visible consequence, not an observed runtime exploit.

Reviewers remain source-only: no execution, target edits, target/network fetching, credential access, installs or worker delegation. Runtime evidence is a [separately authorized branch](../../docs-engineering/references/security.md#separate-authorization-for-runtime-evidence), never implied by change-review authority. It requires demonstrated OS containment, dummy data, no real credentials/home state, no external/shared network (isolated loopback only if required), read-only target/toolchain, confined writes and resource/time limits. Missing prerequisites leave the review source-only and runtime unverified.
