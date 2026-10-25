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
| [skills/write-swift/SKILL.md](https://github.com/emilkowalski/skills/blob/e8a175de22ae1e49370fc144c1f3bb9aeedf988d/skills/write-swift/SKILL.md) | `SKILL.md` | MODIFIED/ADAPTED | Public capability metadata/routing and modification attribution; direct task handling; project-dependent toolchain/build-setting guidance; corrected async-isolation, callback and discarding-task-group guidance; unsupported performance magnitude removed. Native request/permission boundaries preserved. |

Baseline comparison: omp-docflow commit
`e850b6a07a55bc893d97c786928c45906952bbe7`. Modified-file diffs and matching
expression establish the adaptation boundary where stated, not an import date.
No upstream executable, service, generator or model/tool permission is adopted.

## Local guidance corrections

Removed the greeting-only gate. Replaced cached current-release/blanket compilation claims and automatic concurrency-setting changes with checks against the actual compiler, language mode, SDK/platform, feature flags and authorized scope. Remaining upstream version labels are reference leads, not a validated availability matrix.

Corrected nonisolated async execution using [SE-0461](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0461-async-function-isolation.md), including the `NonisolatedNonsendingByDefault` gate and explicit execution annotations. Restricted `MainActor.assumeIsolated` advice to callbacks already guaranteed to execute on that actor. Distinguished throwing and nonthrowing discarding task groups using [SE-0381](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0381-task-group-discard-results.md).

Removed the uncited “100×+ regressions” magnitude while retaining the algorithmic-complexity guidance. These are local adaptations, not host policy. The upstream attribution and full MIT notice remain unchanged. Source/loading checks do not establish compilation of every example or consuming-agent behavior.

## Added-skill source review corrections (2026-10-22)

A complete source read retained the task/toolchain gates, historical version-label uncertainty, source identity, and license. Targeted corrections distinguish value semantics from merely wrapping a reference or another struct; confine `#require` advice to Swift Testing; remove strict actor-priority and stream-ordering guarantees; restore the frozen-public sendability inference exception; separate `Task { }` context inheritance from child-task lifetime/cancellation; and scope cancellation handlers to sources that need a bridge rather than every suspended sequence.

Further corrections make SwiftUI isolation depend on the actual SDK/declaration, avoid treating `@Sendable` as a thread guarantee, distinguish model nonisolation from safe transfer, clarify constrained-existential consuming calls, distinguish `private` from `fileprivate`, avoid a guaranteed OS-context-switch claim for actor hops, preserve legitimate weak-reference absence and local resource cleanup in `deinit`, and replace the obsolete macro conformance role with extension.

Interface evidence: [SE-0302 sendability inference](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0302-concurrent-value-and-concurrent-closures.md), [SE-0304 task inheritance, executors, and cancellation](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0304-structured-concurrency.md), [SE-0306 actor ordering](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0306-actors.md), [SE-0352 existential opening](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0352-implicit-open-existentials.md), [SE-0402 extension macros](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0402-extension-macros.md), [Swift access control](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/accesscontrol/), [Swift ARC](https://docs.swift.org/latest/documentation/the-swift-programming-language/automaticreferencecounting/), and [SwiftUI View](https://developer.apple.com/documentation/swiftui/view). These primary references support the bounded corrections; moving documentation is not a validated release/API inventory.

No compiler, build, test, formatter, native runtime, or consuming-agent check ran in this source-review slice. The long language/API catalog and illustrative snippets were read, not comprehensively compiled or revalidated against every labeled release, SDK, platform, and feature flag. Existing historical verification statements above are not new results from this review.
