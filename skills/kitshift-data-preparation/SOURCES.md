# Sources: kitshift-data-preparation

Independently authored KitShift guidance, MIT licensed under the complete accompanying [LICENSE](LICENSE), Copyright (c) 2026 rizariaputrawira. This grant does not cover linked documentation or Skillstash.

Consulted for technical facts (retrieved 2026-11-18):

- pandas 2.3.3 [`read_csv`](https://pandas.pydata.org/pandas-docs/version/2.3.3/reference/api/pandas.read_csv.html) and [`read_excel`](https://pandas.pydata.org/pandas-docs/version/2.3.3/reference/api/pandas.read_excel.html): parser options and stored values.
- openpyxl [formula documentation](https://openpyxl.readthedocs.io/en/stable/simple_formulae.html) and [3.1 tutorial](https://openpyxl.readthedocs.io/en/3.1/tutorial.html): formulas, cached values and workbook preservation limits.
- [OWASP CSV Injection](https://community.owasp.org/attacks/CSV_Injection): spreadsheet formula risks and limitations of CSV mitigations.

Ownership comparison only: [Skillstash](https://github.com/rizariaputrawira/skillStash) at `3d0d40a28956e52b769a4e9319fd9da00a61eb54`, `data-analysis`, `data-sql-analysis` and `data-analysis-review` entrypoints and profiling reference. Its original skill text has no general license grant in the inspected records; no prose, fixtures or references are incorporated. It is not a dependency.

Arrow documentation retrieval timed out; no universal cross-engine compatibility is claimed. Format preservation depends on actual reader/writer versions and schema.

## Checks — 2026-11-18

On Python 3.14.4, openpyxl 3.1.5 and PyArrow 26.0.1, a source-loaded actor processed disposable CSV/XLSX/Parquet fixtures and reproduced its results into a fresh root. Independent inspection confirmed source hashes, lexical IDs, unresolved values, spreadsheet text-cell type and Parquet schema/values. The first independent verifier reported a false failure because it assumed scalar issue fields instead of the actor's structured evidence; the values were separately inspected. The inspection-only actor made no observed execution or writes. These synthetic observations do not prove generalized model behavior, native analyst dispatch or sandboxing.

## Independent quality refinements — 2026-11-18

Extended `references/quality-and-lineage.md` with conditional integrity, domain, freshness and coverage checks; comparable before/after profiles; restricted field-level change evidence; and generator/output consistency. New wording and procedures were independently authored for KitShift. These pinned sources were consulted as research comparisons, not copied, paraphrased into adaptations, bundled or required at runtime:

- [Nimrod Fisher quality audit](https://github.com/nimrodfisher/data-analytics-skills/blob/9449d363e1ae43cf1706c73bebc16774e339c427/01-data-quality-validation/data-quality-audit/SKILL.md): integrity and freshness check categories.
- [JayRHa cleaning checklist](https://github.com/JayRHa/agent-skills/blob/f9a456bf34c297bd23fb234f410ec9b239ebed14/pandas-data-cleaning/references/cleaning-checklist.md): comparison of initial and final profiles. Its destructive defaults and universal assertions are not adopted.
- [GenOffice cleaning workflow](https://github.com/genspark-ai/genoffice/blob/d8ee8c50611998bac210e89069c996a6047934b3/skills/recommended/data-cleaning/SKILL.md): inspectable change evidence. No workbook template or formula-cleaning procedure is incorporated.
- [Cline artifact management](https://github.com/cline/skills/blob/26378461e978f2b4e2e6d67b57121b86b2a79ba5/skills/data-analyst/skills/artifact-management/SKILL.md): consistency between saved generators and outputs. No ClickHouse workflow, artifact layout or template is incorporated.

Comparison retrieval date: 2026-11-18. Citations establish research provenance, not a grant over linked material or proof of behavior. Existing MIT terms apply to the original KitShift additions.

Refinement verification: a fresh source-loaded actor used Python 3.14.4 standard-library CSV/Decimal/datetime processing with a supplied parent snapshot, calendar, lag criterion, category mapping and two explicit correction inputs. Controller-owned checks inspected an orphan, missing period, 24-hour lag against a 12-hour requirement, cross-field violation, absent domain criterion, before/after categories and exact changed-cell evidence. Both correction versions reproduced into fresh roots with unchanged input hashes. Matching was disabled for this preparation assignment and was not loaded. No baseline actor comparison was run; these observations do not measure generalized improvement, large-data behavior, native role dispatch or enforcement.

## Output-conflict assessment — 2026-11-18

A fresh source-loaded actor actually invoked its saved generator with the requested `prepared.csv` already occupied. The command returned exit 2, reported the attempt blocked and left both existing directory entries byte-identical with no partial artifacts. A separately authorized fresh-path invocation returned exit 0 and preserved the three records' raw fields, lexical IDs and unresolved amount alongside derived annotations. Controller-owned reruns reproduced both refusal and success. Existing instructions were sufficient; no procedure correction was made.

The independently authored, repository-only fixtures and verification recipe are retained under `tests/fixtures/data-skills/`; they are not installed skill dependencies or a data-processing runtime. Python 3.14.4 standard-library execution and the two actors' outputs supported 123 controller assertions across this and the matching edge assessment. Native dispatch, generalized behavior, concurrency failure recovery and OS confinement remain unverified.
