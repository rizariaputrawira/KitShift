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
