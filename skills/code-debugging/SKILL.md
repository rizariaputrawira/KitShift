---
name: code-debugging
description: "[Matt+Superpowers] Diagnose difficult bugs, flaky failures, or performance regressions before a root-cause fix."
---

# Diagnosing Bugs

Treat the user's reported failure as ground truth. Do not rerun merely to confirm their observation. Diagnose with discriminating evidence, fix the causal defect within the authorized boundary, and distinguish source hypotheses from runtime proof.

## Build the signal

1. Extract the exact reported symptom, affected consumer path, supplied inputs, environment facts and existing observed evidence. Read relevant constraints/glossary/decisions and trace code/callers before choosing the next probe.
2. Define a **red-capable** signal: the precise assertion/output/state that distinguishes this failure from success at the original boundary. Reuse supplied observations. A new execution is justified only for a missing causal fact, a differentiating experiment or remediation evidence—not confirmation of the report.
3. Prefer the cheapest authorized real boundary: existing failing test, request/CLI fixture, captured trace or UI interaction. Pin relevant sources/time/randomness when feasible. State unavailable execution/artifacts explicitly. A source-only investigation may proceed with labeled hypotheses; it cannot invent a reproduced loop or successful runtime result.

## Minimize and discriminate

Compare a working case with the failing case, preserving known reports. Minimize inputs, callers/config and steps only as needed to isolate cause, varying **one causal element at a time**. Preserve the original scenario for remediation proof; do not replace it with an easier symptom.

State plausible falsifiable hypotheses with predictions: “If this adapter bypasses the library denial, calling the library follows the contract but this CLI path does not.” Rank by available evidence, not a forced hypothesis count. Each probe must distinguish predictions. Prefer `debug` for program state, stack, breakpoints and stepping where available and authorized; otherwise targeted source/call tracing or temporary instrumentation. Redact secret values and quote only needed signal.

For deep invalid-data/call-chain failures load [root-cause tracing](references/root-cause-tracing.md). For async timing/flakiness load [condition-based waiting](references/condition-based-waiting.md). Measure actual reproduction rates only when authorized and needed; no fixed repeat counts, stress fleet or retries is implied.

## Performance branch

Define the user-relevant slow operation/workload and available baseline. Use actual authorized timing/profile/query-plan evidence to locate the bottleneck before optimizing. Compare representative, equivalent inputs and change one causal element. Before trusting a comparison, confirm the measured work completed and its outputs/errors are valid; compare production-relevant settings and include end-to-end impact when a microbenchmark informs a user-facing choice. Repeat and alternate measurements when needed to distinguish a real difference from run-to-run variation; report run count, observed spread and material environmental limits. A quick estimate may use one run if clearly labeled and not used to choose between options. No fixed run count or statistical test is required. Source suspicion is not a measured bottleneck; report unmeasured costs and unavailable environment facts honestly. Do not fabricate elapsed times or speedups.

## Root correction and evidence

Once the causal explanation is supported, change the root source/invariant within the user's requested scope and applicable native constraints. Inspect affected callers so the correction is not a one-path workaround. Preserve unrelated user changes. Add meaningful regression coverage at the seam that exercises the real pattern; ordinary regression work does not automatically invoke TDD. If test-first is requested, load `skill://code-tdd`.

If you deliberately force a test red by mutating code or a fixture, compare it with a pristine copy and verify the intended mutation landed before treating the failure as evidence.

For a requested permanent fix, report original consumer-path proof and finding-specific regression evidence, not only a shallow helper test. Execution belongs to the assigned executor/integration owner; workers do not duplicate gates. Remove temporary instrumentation/artifacts you introduced, update applicable permanent documentation, and report exact changes and observed checks. If source correction is complete but the original path cannot be exercised, mark that proof unverified and name the precise missing evidence.

Finish with symptom/source basis, hypothesis dispositions, root cause or remaining uncertainty, correction boundary, actual original-path/regression evidence and limitations. Investigation alone needs no new tests/docs.
