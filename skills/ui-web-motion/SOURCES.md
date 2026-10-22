# Sources and modifications

Repository: https://github.com/emilkowalski/skills

Compared immutable revision: `e8a175de22ae1e49370fc144c1f3bb9aeedf988d`. This identifies the inspected
comparison snapshot, not the unknown historical import commit. Source and full
MIT notice inspected at that revision. Copyright (c) 2026 Emil Kowalski.
Full unmodified notice: [LICENSE.emil](LICENSE.emil).

Mapped files below are byte-identical or modified/adapted from the compared
source. Local capability names do not change upstream ownership.

| Immutable upstream path | Distributed local file | Baseline relationship | Current modifications |
|---|---|---|---|
| [skills/animate/RECIPES.md](https://github.com/emilkowalski/skills/blob/e8a175de22ae1e49370fc144c1f3bb9aeedf988d/skills/animate/RECIPES.md) | `RECIPES.md` | MODIFIED/ADAPTED | MIT source identified; contextual/reduced-motion caveats retained. Local corrections make stagger/reveal progressively enhanced, keep decorative tab overlays noninteractive, distinguish hold-progress visuals from confirmation logic, replace whole-drag velocity with a guarded directional release predicate, and qualify spring, blur, and rendering claims. |
| [skills/animation-performance/SKILL.md at 2d228630ba1446365f614a108cb8252f1feda202](https://github.com/emilkowalski/skills/blob/2d228630ba1446365f614a108cb8252f1feda202/skills/animation-performance/SKILL.md) | `references/review-standards.md`, performance diagnostic paragraph | Selective adaptation | Correlate busy-main-thread jank and React frame updates with recordings before changing drivers; preserve browser/library conditions, read-only review and measurement limits. No standalone skill or runtime prescription. |

Baseline comparison: omp-docflow commit
`e850b6a07a55bc893d97c786928c45906952bbe7`. Modified-file diffs and matching
expression establish the adaptation boundary where stated, not an import date.
No upstream executable, service, generator or model/tool permission is adopted.

RECIPES.md and the identified performance diagnostic paragraph are Emil-derived.
The rest of the core and local references remain independently authored.
The supplement's candidate MIT notice matches `LICENSE.emil`; it does not adopt
unconditional GPU/thread claims, blur thresholds, greetings or library-version
assumptions from the candidate.

## Local motion correction pass

- `SKILL.md`, `references/build.md`, and `references/principles.md` now point to the deployed provenance/notice instead of an undeployed repository record. The old `PERSONALITY` reference is removed; no new historical lineage is asserted.
- `references/review-standards.md` owns the seven shared dimensions. `references/audit.md` applies those criteria to a surface; `references/existing-motion.md` alone owns its audit/plan/execute lifecycle.
- `references/opportunities.md` preserves suggestions-only boundaries while honoring implementation or planning already authorized by a combined request, without requiring a second request or an exact mode name.
- Recipe changes are local corrections to the mapped adaptation, not a new upstream import or a license grant over unrelated material.

Verification: native `skill://ui-web-motion` loading succeeded. A temporary source/package check followed 34 local Markdown links across 12 active Markdown files and confirmed seven shared dimensions. Twelve cases exercised the revised release predicate, including zero elapsed time, direction, invalid data, recent velocity, and threshold boundaries. A synthetic loopback fixture used the actual revised CSS/overlay snippets through Playwright MCP at 1280×720 and 390×844: unenhanced visibility, normal-motion activation, reduced-motion fallbacks, single semantic tab controls, and keyboard focus order passed; a rendered screenshot was inspected. The fixture did not assess a consuming agent, real-device feel, production hold-confirm logic, or rendering performance. MCP rejected a null media reset despite its advertised schema; the owned test tab was closed, discarding its override without closing the pre-existing tab.

## Added-skill source review corrections

- `RECIPES.md`: the scroll-reveal keyframes now use the promised transform-only treatment instead of clipping the content away on activation. Unenhanced and reduced-motion visibility remain intact.
- The toast recipe now degrades to an immediately visible notification when `@starting-style` is unsupported; the disconnected mount-state fragment was removed rather than introducing another animation state owner.

These corrections received source inspection only in this pass. Earlier verification above is historical evidence, not a run of these revised snippets; browser checks remain pending.
