# Behavior tests and independent oracles

Load when choosing a seam or writing/changing assertions, fixtures or test helpers. A seam is the caller-visible boundary where the actual capability can be exercised without reaching into private structure.

## Select the seam

Trace the real consumer first. Prefer the existing library API, request boundary, CLI result/exit behavior, or user-visible UI interaction appropriate to the contract. Use real internal collaborators. A unit seam is insufficient when the defect requires the adapter, several callers, persistence lifecycle or their interaction. A test for that deeper consumer boundary is preferable to shallow tests that all pass while the user path still fails.

Test what the consumer observes: returned values, accessible state through a supported retrieval API, emitted contract data, denied access, error behavior or owned side effects. Avoid reading a database solely as a side channel when the contract is that a created entity is retrievable through an API. A persistence-format contract itself may legitimately require direct storage evidence; identify it explicitly.

A mocked UI element's existence proves only that the mock renders; observe the real component capability instead. Constructors, getters and trivial forwarding earn checks only for actual normalization, defaults, validation, derivation, enforcement or side effects. Test the first meaningful consumer result instead of upstream framework mechanics. A genuinely surprising upstream assumption may warrant one narrow characterization check with its reason recorded.

When adding or changing doubles, read [mocking](mocking.md) for dependency effects, faithful protocol/response shapes and test-only cleanup ownership.

## Derive expectations independently

Known literal example: amounts 10 and 5 total **15**. The expectation is not a second `reduce` copied from the implementation. A tenant-filter test can use fixed mixed-tenant rows and a literal allowed list from the requirement, not another filtering helper that shares the bug.

Expected values come from independent literals, hand-checked fixtures or the requirement—not the code under test, its query builder, its filter or a copied algorithm. A fixture shared by setup and assertion must not guarantee equality without exercising the real transformation.

Keep one logical behavior per test. Several assertions are appropriate when one contract includes a result, exit status and absence of an unsafe side effect. Name the behavior, not a private method or generic “works”. A table can cover several inputs with individually hand-derived expected values.

## Retain useful tests

Before keeping a test, answer:

1. Which plausible wrong branch, argument, missing state transition or missing enforcement would it catch? Name the production mistake before writing the test.
2. Does it run production behavior at the actual seam?
3. Could internal refactoring preserve behavior while breaking this test? If yes, is that internal property actually contractual?
4. Is its expected value independent of the tested logic/helpers?

Private-method checks, trivial forwarding assertions, snapshots derived from the implementation and source-text matches often test shape rather than behavior. Remove or redesign them unless an explicit consumer-visible contract justifies the assertion. Call count/order can be correct when retry limits, duplicate delivery, sequencing or protocol behavior is itself contractual—not merely because a mock exposes those counters.

If the only failure is “source text changed”, exercise the artifact or its consuming agent instead. If only a deliberate redesign can fail it, test the consumer behavior that depends on the choice rather than a constant's spelling or a private arrangement.

Work vertically: one test, one minimal implementation, then the next behavior. Bulk imaginary tests can freeze an invented interface before the real seam is understood.

## Mutation thought experiment

Mentally substitute a wrong argument/constant, take the other branch, remove an owned state change, return empty/default data, or drop a required denial/validation. At least one relevant test should fail for each realistic acceptance-breaking mistake. A surviving mutation identifies an unprotected behavior or tautology, not a reason to add unrelated edge cases.

This thought experiment is a test-design review, not a claim that mutation tooling ran. Preserve meaningful RED/GREEN observations separately. Tests-after may still be useful regression coverage but are not retroactively test-first. Ordinary documentation prose inspection is not a behavioral skill assessment; that separately authorized branch uses [behavioral assessment](../../agent-guidance/references/behavioral-assessment.md).
