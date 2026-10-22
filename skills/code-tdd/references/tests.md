# Behavior tests and independent oracles

Load when choosing a seam or writing an assertion. A seam is the caller-visible boundary where the actual capability can be exercised without reaching into private structure.

## Select the seam

Trace the real consumer first. Prefer the existing library API, request boundary, CLI result/exit behavior, or user-visible UI interaction appropriate to the contract. Use real internal collaborators. A unit seam is insufficient when the defect requires the adapter, several callers, persistence lifecycle or their interaction. A test for that deeper consumer boundary is preferable to shallow tests that all pass while the user path still fails.

Test what the consumer observes: returned values, accessible state through a supported retrieval API, emitted contract data, denied access, error behavior or owned side effects. Avoid reading a database solely as a side channel when the contract is that a created entity is retrievable through an API. A persistence-format contract itself may legitimately require direct storage evidence; identify it explicitly.

## Derive expectations independently

Known literal example: amounts 10 and 5 total **15**. The expectation is not a second `reduce` copied from the implementation. A tenant-filter test can use fixed mixed-tenant rows and a literal allowed list from the requirement, not another filtering helper that shares the bug.

Keep one logical behavior per test. Several assertions are appropriate when one contract includes a result, exit status and absence of an unsafe side effect. Name the behavior, not a private method or generic “works”. A table can cover several inputs with individually hand-derived expected values.

## Retain useful tests

Before keeping a test, answer:

1. Which plausible wrong branch, argument, missing state transition or missing enforcement would it catch?
2. Does it run production behavior at the actual seam?
3. Could internal refactoring preserve behavior while breaking this test? If yes, is that internal property actually contractual?
4. Is its expected value independent of the tested logic/helpers?

Private-method checks, trivial forwarding assertions, snapshots derived from the implementation and source-text matches often test shape rather than behavior. Remove or redesign them unless an explicit consumer-visible contract justifies the assertion. Call count/order can be correct when retry limits, duplicate delivery, sequencing or protocol behavior is itself contractual—not merely because a mock exposes those counters.

Work vertically: one test, one minimal implementation, then the next behavior. Bulk imaginary tests can freeze an invented interface before the real seam is understood.
