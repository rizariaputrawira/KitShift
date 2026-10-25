# Sources and adaptation — tdd

## Immutable adopted sources

- **M** — `https://github.com/mattpocock/skills` at immutable revision `5beb35b040e3de97e54fa9e386d7e42d15c295c2`; MIT; notice `LICENSE.matt`.
- **S** — `https://github.com/obra/superpowers` at immutable revision `8ca22dba9a94f28898bbce59f2537ff4d87c747d`; MIT; notice `LICENSE.superpowers`.

The files below are authored adaptations, not upstream executable distributions. URLs resolve the exact inspected pin, not main/next. License files retain the full upstream MIT text; no scanner, dependency, script, installer, hook, engine or provider configuration is distributed. `SOURCES.md` itself is an original provenance synthesis for these local files.

|Exact pinned upstream path|Local repository-relative file|Substantive adopted mechanism|Included notice|
|---|---|---|---|
|[`skills/engineering/tdd/SKILL.md`](https://raw.githubusercontent.com/mattpocock/skills/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/tdd/SKILL.md)|`skills/code-tdd/SKILL.md`|One vertical RED/minimal GREEN cycle; observed right-reason failure; optional behavior-preserving refactor after green, with independent behavioral test oracles and honest incomplete outcomes.|`LICENSE.matt`|
|[`skills/test-driven-development/SKILL.md`](https://raw.githubusercontent.com/obra/superpowers/8ca22dba9a94f28898bbce59f2537ff4d87c747d/skills/test-driven-development/SKILL.md)|`skills/code-tdd/SKILL.md`|One vertical RED/minimal GREEN cycle; observed right-reason failure; optional behavior-preserving refactor after green.|`LICENSE.superpowers`|
|[`skills/engineering/tdd/tests.md`](https://raw.githubusercontent.com/mattpocock/skills/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/tdd/tests.md)|`skills/code-tdd/references/tests.md`|Consumer seams, independent literal oracles, meaningful behavior tests and avoidance of private/tautological horizontal tests.|`LICENSE.matt`|
|[`skills/engineering/tdd/mocking.md`](https://raw.githubusercontent.com/mattpocock/skills/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/tdd/mocking.md)|`skills/code-tdd/references/mocking.md`|Necessary external boundaries, explicit dependency effects, faithful specific doubles and existing interface reuse.|`LICENSE.matt`|
|[`skills/test-driven-development/writing-good-tests.md`](https://raw.githubusercontent.com/obra/superpowers/8ca22dba9a94f28898bbce59f2537ff4d87c747d/skills/test-driven-development/writing-good-tests.md)|`skills/code-tdd/references/tests.md` and `references/mocking.md`|Name plausible production break, exercise real behavior, independent expectations and mental mutation check; double fidelity and test-only cleanup stay with the mocking owner.|`LICENSE.superpowers`|
|[`LICENSE`](https://raw.githubusercontent.com/mattpocock/skills/5beb35b040e3de97e54fa9e386d7e42d15c295c2/LICENSE)|`skills/code-tdd/LICENSE.matt` (already present)|Full upstream notice, unmodified.|`LICENSE.matt`|
|[`LICENSE`](https://raw.githubusercontent.com/obra/superpowers/8ca22dba9a94f28898bbce59f2537ff4d87c747d/LICENSE)|`skills/code-tdd/LICENSE.superpowers` (already present)|Full upstream notice, unmodified.|`LICENSE.superpowers`|
|[`skills/engineering/codebase-design/SKILL.md`](https://raw.githubusercontent.com/mattpocock/skills/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/codebase-design/SKILL.md)|Shared conditional pointer from `skills/code-tdd/SKILL.md` to [code-architecture](../code-architecture/SKILL.md).|Interface depth, test-surface seam and design vocabulary when seam shape is uncertain; existing native TDD execution/evidence rules remain canonical.|`LICENSE.matt` (architecture owner's notice)|
|[`skills/engineering/codebase-design/DEEPENING.md`](https://raw.githubusercontent.com/mattpocock/skills/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/codebase-design/DEEPENING.md)|Shared conditional pointer to [deepening](../code-architecture/references/deepening.md).|Dependency categories and real seam discipline for a requested module redesign; no duplicate testing workflow.|`LICENSE.matt` (architecture owner's notice)|
|[`skills/engineering/codebase-design/DESIGN-IT-TWICE.md`](https://raw.githubusercontent.com/mattpocock/skills/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/codebase-design/DESIGN-IT-TWICE.md)|Shared conditional pointer to [design-it-twice](../code-architecture/references/design-it-twice.md).|Compare distinct interface alternatives when explicitly requested, using native dispatch permissions.|`LICENSE.matt` (architecture owner's notice)|
|[`LICENSE`](https://raw.githubusercontent.com/mattpocock/skills/5beb35b040e3de97e54fa9e386d7e42d15c295c2/LICENSE)|`skills/code-tdd/LICENSE.matt` (already present)|Full upstream notice, unmodified.|`LICENSE.matt`|

## Local modifications and removed incompatibilities

Removed inspiration-only body, mandatory user confirmation of every seam, upstream all-features/all-functions TDD, destructive delete/restart, provider aliases, universal suite gates and fixed retries/examples. Ordinary regression coverage is not a trigger. Refactor is optional after observed green; necessary boundaries only, interaction assertions only for contractual counts/order. Linked diagnosis condition-waiting instead of copying it. Execution unavailable stays unrun, not TDD complete.
## 2026-10-22 selective adoption

Pinned revision `5beb35b040e3de97e54fa9e386d7e42d15c295c2` contributes the conditional code-architecture link only. The full shared design principles and companion branch behaviors are owned by `skills/code-architecture/`; their copied mechanism is not duplicated here.
The old in-progress candidate mappings for the upstream TDD skill and companions are source-history records only. The pinned revision above is the current source mapping. All upstream TDD companions `tests.md` and `mocking.md` were read and their substantive material is maintained in the local owner references above; no other companion files exist in that candidate directory.
Earlier candidate history remains only for provenance; no such revisions are current active source mappings. Upstream companions in the selected candidate directory are exactly `tests.md` and `mocking.md`; both were read and their behavior is mapped above. Upstream `agents/openai.yaml` is foreign harness metadata and was excluded.

All procedures obey current higher-priority host/user permissions. Their instructions do not create a sandbox, model binding, execution authorization or approval API. References load only for their stated branch; shared owners are linked rather than cloned. Missing material source/evidence remains a gap, not a fabricated pass. These adaptations preserve the approved requested behavior rather than importing upstream engines.

## Testing-reference consolidation — 2026-10-24

Merged the former assertion-quality companion into `references/tests.md`, the canonical seam/oracle/assertion reference. Unique mutation, fixture-independence, consumer-behavior and evidence limits are retained; dependency effects, double fidelity and test-only cleanup remain owned by `references/mocking.md`. The entrypoint now selects one testing reference plus the conditional mocking branch. Both upstream mappings and full notices are retained; invocation metadata and execution permissions are unchanged.

## Evidence limits

Pinned text and full repository LICENSE were retrieved read-only for this adaptation. No target source was executed and no runtime, build, test, lint, format, native discovery or compatibility gate was run while drafting. Source provenance is not behavioral assurance. Historical baseline and later actual verification belong to the integration owner's evidence record.
