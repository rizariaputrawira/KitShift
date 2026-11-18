# Sources: kitshift-data-matching

Independently authored KitShift guidance, MIT licensed under the complete accompanying [LICENSE](LICENSE), Copyright (c) 2026 rizariaputrawira. This grant does not cover linked documentation or Skillstash.

Consulted for technical facts (retrieved 2026-11-18):

- pandas 2.3.3 [`merge`](https://pandas.pydata.org/pandas-docs/version/2.3.3/reference/api/pandas.merge.html): null keys, cardinality validation and indicators.
- RapidFuzz 3.14.6 [`fuzz`](https://rapidfuzz.github.io/RapidFuzz/Usage/fuzz.html) and [`process`](https://rapidfuzz.github.io/RapidFuzz/Usage/process.html): similarity scale, preprocessing, subset behavior, pair matrices and tie ordering.
- [Splink evaluation tutorial](https://moj-analytical-services.github.io/splink/demos/tutorials/07_Evaluation.html): representative labels, blocking recall and matching error tradeoffs. No engine is bundled or prescribed.

Ownership comparison only: [Skillstash](https://github.com/rizariaputrawira/skillStash) at `3d0d40a28956e52b769a4e9319fd9da00a61eb54`, `data-analysis`, `data-sql-analysis` and `data-analysis-review` entrypoints and profiling reference. Its original skill text has no general license grant in the inspected records; no prose, fixtures or references are incorporated. It is not a dependency. Checks and actual behavior evidence are reported separately with the change, not implied by these sources.

## Checks — 2026-11-18

A source-loaded actor using Python 3.14.4 and RapidFuzz 3.14.6 processed disposable exact, normalization-collision and city-blocked fuzzy fixtures. Independent artifact inspection and fresh-root reproduction confirmed two accepted exact pairs, collision review, three review-only approximate candidates and a separate reviewer decision accepting one pair. This is synthetic behavior evidence, not production accuracy, native analyst dispatch or sandboxing.