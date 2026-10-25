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
| [emilkowalski/skills@e8a175de22ae1e49370fc144c1f3bb9aeedf988d: `skills/prototype/SKILL.md`](https://github.com/emilkowalski/skills/blob/e8a175de22ae1e49370fc144c1f3bb9aeedf988d/skills/prototype/SKILL.md) | `SKILL.md` | MODIFIED/ADAPTED | Explicit-only exposure, isolation, selection authority, requested-count/comparison boundaries, local checks, and native permission constraints retained. |
| [emilkowalski/skills@e8a175de22ae1e49370fc144c1f3bb9aeedf988d: `skills/prototype/PICKER.md`](https://github.com/emilkowalski/skills/blob/e8a175de22ae1e49370fc144c1f3bb9aeedf988d/skills/prototype/PICKER.md) | `PICKER.md` | MODIFIED/ADAPTED | Picker markup/accessibility mechanics, URL selection, valid fallback, state preservation, focused keyboard guards, optional replay and cleanup retained. |
| [mattpocock/skills@5beb35b040e3de97e54fa9e386d7e42d15c295c2: `skills/engineering/prototype/SKILL.md`](https://raw.githubusercontent.com/mattpocock/skills/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/prototype/SKILL.md) | `../code-prototyping/SKILL.md` | MODIFIED/ADAPTED | Shared question-led prototype contract and non-shipping boundary are owned by `code-prototyping`; this skill covers only UI variations. |
| [mattpocock/skills@5beb35b040e3de97e54fa9e386d7e42d15c295c2: `skills/engineering/prototype/UI.md`](https://raw.githubusercontent.com/mattpocock/skills/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/prototype/UI.md) | `SKILL.md`, `PICKER.md` | MODIFIED/ADAPTED | Host-page-first placement, radical variants, URL selection, accessible switcher, evidence and authorized promotion principles; local authorization replaces broader automatic effects. | `LICENSE.matt` |

Requested counts and comparison axes, including palette/copy-only comparisons, replace the arbitrary five-variant ceiling and silent removal of converged directions. Standalone work still requires implementation scope and plans directions before building. Planning remains no-write/no-execution; implementation includes proportionate local verification under available permissions, not automatic publication, new exposure, integration changes, or dependency installation.

The optional standalone picker reference defines `label` and `mount(stage)` for each example variant; cleanup and `replay(stage)` are optional. All reference wiring uses that contract; the HTML-string render-array and deferred remount mechanism were removed. Invalid initial URL values select the first variant. Selection of the current variant preserves mounted state, and replay exists only for the active variant's implemented action. Character/arrow shortcuts are picker-focus-scoped, with editable/modifier/composition/already-handled guards. Equivalent project-native markup and styling remain valid.

## Local verification

A temporary package smoke preserved exact frontmatter, explicit-only alias routing, the MIT notice, and six local Markdown links, and parsed the actual reference JavaScript. A loopback-only temporary fixture served the actual documented HTML/CSS/JS with six synthetic variant mounts. Playwright MCP exercised eight missing/invalid URL cases; valid selection/reload and unrelated query/hash preservation; synchronous switching; same-selection input preservation; a local variant action; all six controls; selection semantics; focused shortcuts; modifier/composition/handled and editable guards; replay present/absent; fixture replay respecting reduced motion; and variant/host cleanup. No form submission or page error occurred.

At 1280, 390, and 320 CSS-pixel widths, observed document width matched the viewport, picker controls stayed within it, and normal-flow picker bounds did not overlap the preview. Visible focus was checked and the narrow full-page screenshot inspected. This is actual browser proof for the illustrative reference with controlled synthetic mounts—not consuming-agent, production-app integration, accessibility-conformance, screen-reader, physical-keyboard/device, or arbitrary variant-motion proof. Earlier DOM-adapter diagnostics had reproduced the invalid-URL, absent-replay, and Shift-guard defects in the old reference.

The canonical `ui-prototyping` skill remains explicit-only. The locally authored `prototype` compatibility wrapper was subsequently retired by user approval; use the canonical owner directly. The verification above records the earlier package state, not current alias availability. The canonical procedure, picker, metadata, source mappings, and license were retained. No runtime setting was changed and no consuming-agent assessment ran. No project was initialized and no dependencies were installed. The temporary fixture, browser tab, artifacts, and service from that verification were removed.
