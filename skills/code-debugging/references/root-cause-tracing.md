# Trace the causal origin

Load when a symptom occurs deep in a stack, invalid data appears far from its origin, or several callers may trigger the same defect. Use supplied failure evidence without confirmation-only reruns.

## Backward trace

1. Locate the operation where the reported failure manifests. Identify the immediate bad value/state and the invariant it violates.
2. Find its real caller and inspect the argument/state supplied there. Continue toward the entry point, identifying where each value was produced, transformed, defaulted or consumed.
3. At each hop record inspected file/line, incoming value or source-derived condition, transformation and next caller. Use available read-only navigation; if runtime values are needed, use an authorized debugger rather than inventing them from source.
4. Find the earliest causal operation that creates/accepts the invalid condition or bypasses the necessary contract. Check other callers using that owner. A missing initialization before a lifecycle hook, for example, is not repaired by ignoring the later storage exception.
5. Compare a working route and formulate a discriminating prediction before changing code. Missing dynamic dispatch/deployment evidence keeps the chain partial; report the exact unobserved link.

A useful trace is causal, not merely a stack listing: it explains how the specific symptom follows from the original trigger. For a tenant leak, distinguish the policy function returning wrong rows from a consumer skipping the policy entirely; the second is not fixed by retesting the already-correct function.

## Instrument only the decisive boundary

Where authorized runtime inspection is necessary, prefer a breakpoint with relevant locals/call stack. Otherwise use temporary tagged diagnostics immediately before the failing operation to capture the relevant arguments, lifecycle stage and caller. Collect no credentials or broad environment dumps; redact values and keep the minimum signal. Remove your diagnostics after the investigation/fix.

Unknown test pollution can be isolated with the existing authorized test selection/fixture mechanisms and one-variable comparisons. No upstream bisection script, checkout operation or shell pipeline is shipped or implied.

## Root fix, not blanket defense layers

Correct the owner that establishes the violated invariant within scope. Add a further boundary control only if that boundary independently requires it and the approved design includes it; do not automatically add guards to every layer. Verify the original consumer route and meaningful regression seam through the authorized verifier. A source-derived chain is evidence for a hypothesis; it is not an observed runtime stack or a guarantee that the bug is impossible.
