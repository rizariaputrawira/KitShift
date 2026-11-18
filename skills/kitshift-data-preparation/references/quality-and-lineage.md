# Quality and lineage

Before transformation, characterize row and field counts, missingness denominators, duplicate full-record and relevant key groups, parsing failures and justified domain-rule violations. Report sampling and its limits. Do not treat repeated events, extreme values or negative adjustments as errors without a rule supported by the assignment. Keep raw evidence for unresolved values and distinguish a missing value from a parse failure.

## Assignment-specific checks

Derive checks from the supplied schema, field definitions and intended use, not universal quality thresholds. For each applicable check record the criterion and its source, population/denominator, expected and observed result, consequence and disposition. Distinguish a passed check, a failed check and a check not assessed because its definition or evidence is unavailable. A successful parse does not establish completeness or accuracy.

- When a parent relationship is supplied, test eligible child keys against the assigned parent snapshot. Report orphans and missing-key records separately, with the null policy and counts; an incomplete parent snapshot limits the conclusion.
- When allowed categories, value bounds or cross-field rules are supplied, test them without inventing exceptions or correcting violations merely to make the check pass.
- When freshness matters, identify the relevant event/extraction timestamp, timezone, explicit as-of time and permitted lag. Report observed lag against that criterion; file modification time is not a substitute. Without a lag requirement, report what is observed without declaring the data fresh or stale.
- When the expected population or calendar is known, compare coverage with that expectation. Recent records do not prove that earlier periods or other required populations are present. Without an expected calendar, a gap is an observation, not proof of missing data.

## Transformation evidence

Compare the initial profile with a profile of the reopened output on a comparable basis: row/field counts, types, missingness, relevant key multiplicities, category counts and ranges. Explain changes against the authorized rules, including intended schema changes. Use bounded summaries for large or sensitive domains and disclose sampling; do not infer exact full-population results from samples. Empty valid datasets have zero counts, not invented percentages.

For changed values, retain an inspectable mapping from source snapshot/record and field to original value, derived value, rule and reason. Keep this field-level evidence within the approved restricted destination; do not duplicate unchanged sensitive fields merely to fill a log. Use schema-aware comparison so missing values and exact numeric types are not confused with changes in display spelling. Reconcile changed-record counts separately from changed-cell counts.

Produce, as permitted by the assignment:

- Prepared data and schema/type/missing-value and reload notes.
- Before/after profile, check results and issue ledger, including blocked fields and decisions.
- Ordered transformation log with each rule, reason and affected count, including normalization collisions and intentional count/control-total changes.
- Source fingerprints and stable record locators mapped to outputs; reconcile input, retained, quarantined and excluded records without double-counting. Explain any authorized exclusion.
- Reproduction code, parameters, actual environment and invocation, and independent reopened-output counts and relevant control totals.

Keep restricted row-level evidence in the approved destination. Use necessary aggregate evidence in public/chat reports instead of raw personal data. Record measured counts and actual dates; never invent business rules. Repeated runs require fresh output paths or authority to replace existing derived outputs; never overwrite silently.

## Reproduction maintenance

Keep the saved generator and its derived outputs aligned. To correct generated data or reports, change the authorized generator/rule inputs and regenerate into a fresh destination, then repeat the relevant checks. Do not repair only an output while claiming that the old generator reproduces it. If an authorized manual correction cannot be regenerated, preserve it as explicit correction input or disclose the unreproduced change and affected artifacts. Record the actual command, inputs and rule versions; compare semantic values, schema and counts across fresh-root runs rather than requiring byte identity for formats with variable metadata.
