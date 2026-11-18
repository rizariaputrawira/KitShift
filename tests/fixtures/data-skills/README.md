# Data-skill edge assessments

These independently authored synthetic fixtures exercise the passive data skills through actual source-loaded actors. They are not a matching engine, native dispatch test, training set, production accuracy benchmark or part of the ordinary installer test suite. No third-party fixtures or dependencies are bundled. Original material is covered by the repository MIT license.

## Prepare one disposable run

From the repository root, using Node.js 20+ and an already-selected Python 3 interpreter with its standard library:

```sh
QA="$(mktemp -d /tmp/kitshift-data-edges-XXXXXX)"
chmod 700 "$QA"
node tests/fixtures/data-skills/setup.mjs "$QA/run"
```

The setup requires a new run-root path; it does not replace an existing run. It copies the CSV, materializes matching cases and historical review bases, and records source/existing-output hashes in `run/before.json`. The approximate-rule digest uses sorted JSON keys, compact separators and SHA-256. `matching.json` is fixture input, not a reusable output API.

Before execution record source digests and the selected Python/runtime versions. Preserve the source basis before any correction. Give two fresh actors the actual `harnesses/omp/agents/kitshift-data-analyst.md` body (or the selected host's equivalent) plus explicit canonical source directories for the two data skills and `code-python`. Require actual reads of relevant entrypoints and references. These are general-purpose source-loaded actors, not evidence of native analyst registration. Do not substitute live installed skills. No installation, network access, repository mutation, recursive delegation or source replacement is authorized.

Actors receive only their assigned `run/prep/input` or `run/match/input`, their output root and permitted candidate sources. Keep this README, `verify.py`, controller hashes and expected results out of actor inputs. They are controller evidence, not instructions for generating a passing report. Inspect actual tool traces; file claims alone do not prove execution or loading.

## Actor assignments

### Output conflict

Use the preparation skill to prepare the three-record CSV. IDs are lexical; only empty is missing. Preserve all values and unresolved amounts; no deletion or imputation is authorized. The requested filename is exactly `prepared.csv`.

1. Save a generator under `run/prep/output`, accepting an input path and output directory. Invoke it against `run/prep/output/occupied`, where `prepared.csv` already exists. Do not authorize replacement or silently choose another filename. Record the actual refusal/status and do not claim successful preparation for this attempt. The occupied directory must retain exactly its original files and bytes; no partial new artifacts are expected for this known conflict. This does not claim transactional rollback against concurrent failures.
2. As a separately assigned positive control, invoke the same generator into new `run/prep/output/fresh`. Reopen the result and preserve raw spelling, including `00123`, `NA` and `bad`.
3. Save `manifest.json` under `run/prep/output` with relative paths `report`, `generator` and `fresh_data`. The report's `conflict` contains numeric `exit_code`, `status: blocked` and `produced: []`; `fresh` contains its actual `exit_code`. Capture the command's real exit status, not a predicted value. Include actual commands and source/validation evidence.

### Matching edges

Use the matching skill on `run/match/input/assignments.json` and its referenced CSV/rule/review files. Inputs are already bounded lexical fixtures. The `record` field is a source locator, not a shared entity ID. Exact keys are trusted within each case's namespace; only empty components are missing. Nonmissing `conflict_fields` are reliable attributes whose disagreement vetoes acceptance. Do not normalize unless supplied rules permit it.

For exact cases, materialize an inner, accepted-only enriched result at correspondence grain if cardinality permits. Preserve both sides' original fields and explain repeated left-side totals. For approximate cases, block on normalized city and use the specified difflib scorer; names alone do not authorize acceptance, and no automatic approximate rule or new review authority is supplied. Recheck historical decisions against current source/rule/relationship evidence.

Save a generator and execute it with explicit input and fresh output roots. Under `run/match/output`, `manifest.json` identifies a relative `report` and `cases` map. Each case identifies relative `ledger` and `combined` JSON paths; `combined` is null when withheld. A ledger is a list of `{left, right, disposition, reason, ...evidence}` using source locators. A combined artifact is a list of `{left: originalLeftRow, right: originalRightRow}`. Report `cases` records `cardinality_valid`, `accepted_unique_left`, `accepted_unique_right`, and exact-case `unique_left_amount_total` and `output_left_amount_total`. Review cases also retain the original `review_history` object and `review_reuse: {applied, stale, blocked}` counts. Include actual evidence, parameters, input hashes, counts and unresolved populations. These small assessment conventions do not define KitShift's general output schema.

## Controller expectations and verification

- Valid one-to-many: L1–R1 and L1–R2; unique accepted left amount 10.00 versus repeated output amount 20.00.
- Valid many-to-one: L1–R1 and L2–R1; unique/output amount 30.00.
- Incomplete composite keys: accept L1–R1 and L4–R4 only; literal `NA` is not missing; amount 18.00.
- Contradictory reliable identifiers: L1–R1 remains unaccepted despite key equality; L2–R2 is accepted; amount 20.00.
- Current reviewer rejection applies to U1–R1. A changed source makes the old rejection stale, not a definitive nonmatch.
- Reordered source bytes make prior approval stale; retain its U1–R1 identity rather than rebinding to the first current row. U2–R2 also remains review-required.
- Invalid one-to-many/many-to-one cases retain candidates and report cardinality failure; no trusted combined artifact or arbitrary deduplication.

After both actors finish, inspect their source reads, commands, generated artifacts and saved scripts, then run once:

```sh
python3 tests/fixtures/data-skills/verify.py "$QA/run"
```

The verifier compares actual derived values and decisions with independent expectations and checks immutable source/existing-output hashes. It does not grade prose or accept report status as sufficient evidence: inspect the refusal trace and correspondence evidence as well. Save its output and any failure. A failed actor run remains evidence; identify the owning guidance, fixture or environment problem before a targeted reassessment, rather than repeatedly running an unchanged failure.

Rerun each saved actor generator into a separate fresh root. For the refusal control, seed a second occupied directory with the same two files before rerunning. Compare semantic prepared/combined values, ledgers, dispositions, totals and original input hashes, ignoring output-root paths and generation timestamps. Keep reproduction scripts, artifacts and traces outside the checkout; do not ship model-generated processing code as a KitShift runtime.

A source-loaded pass is bounded behavioral evidence, not native dispatch, OS confinement, generalized accuracy, performance or comparative improvement. No baseline actor comparison is implied. Do not run an installer or change live host settings to obtain a behavioral pass.
