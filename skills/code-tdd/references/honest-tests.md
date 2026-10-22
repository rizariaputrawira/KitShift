# Honest tests

Load when writing/changing assertions, mock responses or test helpers. The test must catch a plausible break in **real production behavior**, not reward the presence of a mock or mirror the implementation.

## Name the break before the body

State the production mistake that must fail this test: wrong tenant, missing denial, wrong protocol argument, wrong branch, missing state change, incorrect boundary behavior. If the only failure is “source text changed”, exercise the artifact or its consuming agent instead. If only a deliberate redesign can fail it, test the consumer behavior that depends on the choice rather than a constant's spelling or a private arrangement.

Expected values come from independent literals, hand-checked fixtures or the requirement—not the code under test, its query builder, its filter or a copied algorithm. A fixture shared by setup and assertion must not guarantee equality without exercising the real transformation.

## Exercise the real thing

- A mocked UI element's existence proves only that the mock renders. Observe the real component capability instead.
- Learn relevant dependency effects before replacement. Keep required effects real; isolate only the external/slow layer.
- A double that accepts every argument can hide a broken branch. When protocol arguments/count/order are contractual, make that contract observable and assert it.
- Mirror the relevant real response shape, including fields used downstream. Do not pass an invented minimal response that accidentally skips the failing integration.
- Constructors, getters and trivial forwarding earn checks only for actual normalization, defaults, validation, derivation, enforcement or side effects. Test the first meaningful consumer result instead of upstream framework mechanics. A genuinely surprising upstream assumption may warrant one narrow characterization check with its reason recorded.
- Test-only cleanup lives in test utilities; it does not create a production API unless production itself owns that lifecycle.

## Mutation thought experiment

Mentally substitute a wrong argument/constant, take the other branch, remove an owned state change, return empty/default data, or drop a required denial/validation. At least one relevant test should fail for each realistic acceptance-breaking mistake. A surviving mutation identifies an unprotected behavior or tautology, not a reason to add unrelated edge cases.

This thought experiment is a test-design review, not a claim that mutation tooling ran. Preserve meaningful RED/GREEN observations separately. Tests-after may still be useful regression coverage but are not retroactively test-first. Ordinary documentation prose inspection is not a behavioral skill assessment; that separately authorized branch uses `skill://agent-guidance/references/behavioral-assessment.md`.
