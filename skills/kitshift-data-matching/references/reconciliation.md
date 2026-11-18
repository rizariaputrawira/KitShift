# Correspondence and reconciliation

Use [preparation lineage](../../kitshift-data-preparation/references/quality-and-lineage.md) for source provenance and processing evidence. Before a join, retain a correspondence ledger with left/right source-record references, stage/method, rule or scorer and preprocessing, score and scale when applicable, agreement/disagreement/missingness and conflicts, disposition (accepted, review-required or rejected), and reason. Record review decisions separately as reproducible input. Record per-side unmatched and review populations and search truncation separately; a truncated search cannot prove nonmatches.

Reconcile unique source-record counts separately from candidate, accepted-pair and output-row counts, so multi-candidate records are not counted repeatedly. Check declared relationship and actual multiplicities, join type and grain; explain expected expansion and applicable control totals. Preserve both source identities and side-qualified overlapping fields instead of silently coalescing conflicts. On cardinality failure retain valid partial evidence as provisional and withhold a trusted combined dataset.

As authorized, deliver prepared copies, accepted-only combined data when permitted, correspondence/review/unmatched evidence, a count/control-total report and a reproduction script with actual parameters, versions and any review-decision input. Project-specific paths and column names are acceptable; no global output schema is required. Zero matches and empty inputs are valid reportable outcomes, not occasions to invent fallbacks.

## Reusing review decisions

Before consuming an earlier decision, establish its basis: both source snapshot fingerprints, stable source-record references, the relationship contract, and the candidate-generation, normalization and scoring rules that produced the reviewed evidence. Preserve the decision, reason, review authority and decision date separately from generated dispositions; use rule versions or content digests rather than an unexplained label.

Replay only when that basis is available and matches the current assignment. If an input snapshot, relevant rule or relationship changed, or the basis is missing, retain the historical decision as stale evidence, not current acceptance or rejection. Regenerate current candidates and obtain renewed authorized review where needed; do not reconnect decisions by row position, similar names or score alone. A newly computed trusted exact correspondence may qualify independently, but cannot be presented as replayed reviewer approval.

Recheck candidate eligibility, contradictory reliable evidence and relationship constraints against all current accepted pairs, including deterministic matches. A stale decision cannot reserve or reassign a target; a current decision cannot bypass a one-to-one conflict. Report how many decisions were applied, stale or blocked and why, without discarding the historical review input.
