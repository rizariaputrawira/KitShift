# Quality and lineage

Before transformation, characterize row and field counts, missingness denominators, duplicate full-record and relevant key groups, parsing failures and justified domain-rule violations. Report sampling and its limits. Do not treat repeated events, extreme values or negative adjustments as errors without a rule supported by the assignment. Keep raw evidence for unresolved values and distinguish a missing value from a parse failure.

Produce, as permitted by the assignment:

- Prepared data and schema/type/missing-value and reload notes.
- Profile and issue ledger, including blocked fields and decisions.
- Ordered transformation log with each rule, reason and affected count, including normalization collisions and intentional count/control-total changes.
- Source fingerprints and stable record locators mapped to outputs; reconcile input, retained, quarantined and excluded records without double-counting. Explain any authorized exclusion.
- Reproduction code, parameters, actual environment and invocation, and independent reopened-output counts and relevant control totals.

Keep restricted row-level evidence in the approved destination. Use necessary aggregate evidence in public/chat reports instead of raw personal data. Record measured counts and actual dates; never invent business rules. Repeated runs require fresh output paths or authority to replace existing derived outputs; never overwrite silently.
