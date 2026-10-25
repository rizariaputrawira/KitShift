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
| [skills/mobile-native/SKILL.md](https://github.com/emilkowalski/skills/blob/e8a175de22ae1e49370fc144c1f3bb9aeedf988d/skills/mobile-native/SKILL.md) | `SKILL.md` | MODIFIED/ADAPTED | Public metadata/routing and attribution; task-first review/implementation boundaries instead of a forced greeting or invented experience; pinch-zoom-preserving gesture examples; semantic activation/cancellation; symptom-scoped baseline and theme guidance; corrected keyboard viewport explanation; Playwright MCP versus hardware evidence; conditional trusted-LAN testing with restoration. |

Baseline comparison: omp-docflow commit
`e850b6a07a55bc893d97c786928c45906952bbe7`. Modified-file diffs and matching
expression establish the adaptation boundary where stated, not an import date.
No upstream executable, service, generator or model/tool permission is adopted.

Platform references for the local corrections:
- [MDN: touch-action](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/touch-action) — permitted pan axes and pinch zoom.
- [MDN: viewport metadata](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport) — layout/visual viewport resize options.
- [Chrome: viewport resize behavior](https://developer.chrome.com/blog/viewport-resize-behavior/) — documented Chrome 108 keyboard change and opt-in layout resizing.

Local verification: at the recorded verification, the revised entrypoint at `skills/ui-mobile-web/SKILL.md` loaded through its then-supported skill URI; a temporary source/package smoke check preserved the name/description, resolved three local Markdown links, checked balanced code fences and three pinch-zoom-preserving gesture declarations, and checked removal of seven retired instructions and presence of eight approved boundaries. This is not a consuming-agent assessment or physical-device verification.

## Added-skill source review correction

The optional input-size media query now uses `any-pointer: coarse`, preserving the coarse-input path when a hybrid device's primary pointer is fine. The entrypoint links MDN's primary-versus-any-pointer contract and keeps computed-size/browser checks and larger existing text authoritative. This pass inspected source only; no hybrid-device or input-focus-zoom check was run. Earlier verification above predates this correction.
