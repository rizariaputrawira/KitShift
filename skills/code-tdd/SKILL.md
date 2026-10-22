---
name: code-tdd
description: "[Matt+Superpowers] Use for requested test-first development, TDD, or red-green-refactor."
---

# Test-Driven Development

Use only when test-first/red-green-refactor is requested or approved. Ordinary regression coverage alone does not select this workflow. Work one complete behavior slice at a time: meaningful **RED**, minimal **GREEN**, optional behavior-preserving **REFACTOR**.

## Choose a meaningful seam

Read the requested contract, affected consumers, existing test framework and relevant glossary/decisions. Infer the public or consumer-visible seam from the actual flow; ask only if it is materially ambiguous, not for permission to test every routine seam. The existing seam must exercise the real bug/behavior, including a multi-caller interaction if that is what fails.

Before writing a test, name a plausible wrong production behavior it must catch and derive the expected result independently from the requirement, a hand-worked example or known-good literal. Load [tests](references/tests.md) for seam/oracle choices and [honest tests](references/honest-tests.md) when writing or changing assertions, fixtures or helpers. If a double is necessary, read [mocking](references/mocking.md) first.

## One vertical cycle

1. **RED:** Write one focused test for the next agreed observable behavior. Use the project's actual runner and native execution authority. Observe and retain the exact failure: the assertion must fail because that behavior is absent/wrong. An import error, typo, unrelated setup failure or missing runtime is not meaningful RED. Repair the harness within scope before relying on it. A test already green has not demonstrated a new RED; determine whether it covers existing behavior or misses the intended break.
2. **GREEN:** Change only the production logic needed to satisfy that behavior within the approved scope. Do not anticipate unused features, batch all tests before implementing, suppress the failure or weaken a correct oracle to match the bug. Exercise the same targeted check when authorized and report its actual output. Address relevant newly observed regressions; do not silently label a failing boundary done.
3. **REFACTOR, optional:** Only after observed green, improve structure/names where warranted without changing behavior or extending scope. Preserve the same checks. Skip gratuitous abstraction or cleanup.
4. Repeat for the next complete behavior informed by the last cycle. Relevant error/denial paths are real behaviors, not afterthoughts; cover them when part of the acceptance contract.

Verification belongs to the authorized integration owner. A worker with no execution assignment writes the test/fix and names the checks; it must not claim to have completed the observed TDD loop. Do not launch duplicate suites or override native tool/approval restrictions. For final evidence routing when delivery is involved, use `skill://workflow-delivery/references/verification.md` rather than importing upstream universal suite gates.

## Honest outcome

Report the tested seam/behavior, independent expectation basis, observed RED cause, minimal correction, observed GREEN/refactor evidence and any unrun relevant checks. If execution is unavailable, say exactly what is unrun and what would establish it: source work may be ready, but **TDD is not observed complete**. Existing code and user changes are not deleted just to stage a red-first story; disclose any test-after work honestly. Preserve actual prior failure reports without replaying them merely for confirmation.

For asynchronous timing failures load `skill://code-debugging/references/condition-based-waiting.md`; reuse existing predicates/timeouts rather than inventing a polling library.
