# Condition-based waiting

Load for asynchronous waits/flaky timing, including from TDD. Wait for the actual observable condition rather than guessing how long completion takes. This reference defines a mechanism, not a new polling helper/library.

## Replace guessed delay with a predicate

1. Identify what the consumer actually needs: a matching event, ready state, completed result, file visibility or a domain-specific count. State the expected payload/value as well as readiness so an unrelated event cannot satisfy the wait.
2. Use the project's existing framework wait/assertion/event primitive and configured timeout/cancellation policy. Prefer an event/promise/completion signal where it exists. Re-evaluate fresh state in a polling predicate rather than capturing a stale result before the wait.
3. Make the predicate exact: `result is present` is not a truthiness check when zero, false or empty data are valid. Distinguish ready state from the result's correctness; observe both through the supported consumer interface.
4. Bound the wait with the existing appropriate timeout. Timeout diagnostics identify the expected condition and safe observed state. Use existing cleanup/unsubscription facilities so the waiting test does not leak handlers or work after failure.
5. Exercise the affected behavior through the authorized executor and retain actual evidence. A longer timeout by itself does not fix a wrong predicate, missing signal or deadlock.

Examples of predicates: a completion event with the requested correlation ID; the UI's accessible ready state; a result available for the correct tenant; the expected number of protocol items. Use the framework's actual syntax, not a invented universal helper.

## When elapsed time is the contract

For debounce, throttling, expiry or timed partial output, time itself may be the behavior. First observe the triggering condition, then use the project's existing controlled clock/timer facility or justified measured timing approach. Derive the interval from the actual contract and explain it; do not turn a guessed sleep into a fixture expectation.

No universal poll interval, five-second budget, retry cap or busy loop is prescribed. Reuse framework defaults/project policy unless actual evidence and authorized scope require a change. If an event or configured timeout cannot be observed in the available environment, name the missing fact rather than declaring the flake repaired from source alone.
