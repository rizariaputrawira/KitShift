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
| [skills/ask-sonner/SKILL.md](https://github.com/emilkowalski/skills/blob/e8a175de22ae1e49370fc144c1f3bb9aeedf988d/skills/ask-sonner/SKILL.md) | `SKILL.md` | BYTE-IDENTICAL at comparison pin; now MODIFIED/ADAPTED | Metadata/routing and attribution retained. Local changes add task/version boundaries, scoped mounting/routing, actual async result/error handling, persistence versus manual dismissal, minimum-needed styling, build/shadow-root/modal placement diagnostics, and custom-content verification. |
| [skills/ask-sonner/API.md](https://github.com/emilkowalski/skills/blob/e8a175de22ae1e49370fc144c1f3bb9aeedf988d/skills/ask-sonner/API.md) | `API.md` | BYTE-IDENTICAL at comparison pin; now MODIFIED/ADAPTED | Selected Sonner 2.0.8 reference replaces unversioned exactness claims; public active/history getters, callback id, hotkey/id types, option ownership, routing, and lifecycle distinctions are corrected against the comparison declarations/runtime. |

Baseline comparison: omp-docflow commit
`e850b6a07a55bc893d97c786928c45906952bbe7`. Modified-file diffs and matching
expression establish the adaptation boundary where stated, not an import date.
No upstream executable, service, generator or model/tool permission is adopted.

## API comparison basis

The local correction pass compared [official usage](https://sonner.emilkowal.ski/toast), [toaster](https://sonner.emilkowal.ski/toaster), [other](https://sonner.emilkowal.ski/other), and [styling](https://sonner.emilkowal.ski/styling) documentation with the published **Sonner 2.0.8** [declarations](https://unpkg.com/sonner@2.0.8/dist/index.d.ts) and [runtime](https://unpkg.com/sonner@2.0.8/dist/index.mjs). Registry metadata reported source revision `ecce1841c55e4a72dfe139a8992b56498660125e`. This comparison identifies the checked library release, not the unknown historical skill import or a target project's installed version.

Published types/runtime take precedence over conflicting unversioned prose for this comparison: `hotkey` is an array; toast ids can be numeric or string; `toast.custom` receives an id; public active records use `getToasts`; notification labels belong to the toaster; named and unnamed instances filter distinct scopes. Timer persistence is separate from `dismissible`. No dependency upgrade or blanket migration is required by these notes.

## Local verification

The `skills/ui-sonner/SKILL.md` entrypoint loaded successfully through the then-supported skill mechanism. A temporary source/package check preserved metadata, resolved four local Markdown links, and syntax-checked two JSX snippets with Bun.Transpiler 1.4.2.

A synthetic loopback fixture loaded the real published Sonner 2.0.8 module with React 18.3.1 from version-pinned public module URLs, without package installation. Playwright MCP exercised untargeted/named delivery, `getToasts`, nondismissible timeout versus `Infinity`, real promise loading/success/rejection and `unwrap`, same-id updates, the documented operation helper's result/error preservation, custom and built-in keyboard dismissal, scoped toast actions inside a native modal, modal focus return, system light/dark changes, reduced-motion styles, and rendered card bounds at 1280×720 and 390×844. A screenshot was inspected.

Two initial fixture assertions used the wrong theme attribute and invisible wrapper bounds; DOM inspection established `data-sonner-theme` and the actual painted card bounds. Corrected checks passed without a library workaround. The owned tab/server and temporary artifacts were removed; the pre-existing tab was preserved.

This is not consuming-agent behavior, a target-app/framework integration test, a screen-reader audit, Shadow DOM/CSP coverage, real-device/performance proof, or support for every library version. Historical comparison pins and the MIT notice were retained; no project or dependency installation or runtime-setting change was performed.

## Added-skill source review corrections

Read-only comparison with the same published 2.0.8 declarations/runtime confirmed two remaining distinctions: the built-in cancel handler returns before its callback when `dismissible` is false and does not honor `event.preventDefault()` as the action handler does; the mobile-offset stylesheet uses an inclusive `max-width: 600px` breakpoint. `SKILL.md` and `API.md` now preserve those distinctions. No runtime/browser check was run in this pass; earlier fixture results above are historical and do not establish these newly documented paths.
