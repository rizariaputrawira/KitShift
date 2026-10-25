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
| [skills/animate-expo/SKILL.md](https://github.com/emilkowalski/skills/blob/e8a175de22ae1e49370fc144c1f3bb9aeedf988d/skills/animate-expo/SKILL.md) | `SKILL.md` | MODIFIED/ADAPTED | Metadata/routing and attribution retained; task-first review/implementation boundaries, installed-stack/API/dependency checks, suitable core Animated reuse, contextual motion tokens, semantic activation/cancellation, optional zero motion, deliberate haptic cadence, and separated evidence layers replace blanket mandates and unmeasured guarantees. |
| [skills/animate-expo/RECIPES.md](https://github.com/emilkowalski/skills/blob/e8a175de22ae1e49370fc144c1f3bb9aeedf988d/skills/animate-expo/RECIPES.md) | `RECIPES.md` | BYTE-IDENTICAL at comparison pin; now MODIFIED/ADAPTED | Version-scoped integration fragments replace ready-to-build claims. Local changes cover semantic press feedback, reduced-motion choices, cancellation/unmount handling, current layout inputs, navigation override precedence, and initialization-safe per-interaction threshold feedback. Unsupported universal rendering/setup/timing claims are qualified. |

Baseline comparison: omp-docflow commit
`e850b6a07a55bc893d97c786928c45906952bbe7`. Modified-file diffs and matching
expression establish the adaptation boundary where stated, not an import date.
No upstream executable, service, generator or model/tool permission is adopted.

## Local correction references and verification

Technical corrections were checked against the documented contracts for [React Native Animated](https://reactnative.dev/docs/animations#using-the-native-driver), [Pressable](https://reactnative.dev/docs/pressable), [Reanimated compatibility](https://docs.swmansion.com/react-native-reanimated/docs/guides/compatibility/), [reduced motion](https://docs.swmansion.com/react-native-reanimated/docs/guides/accessibility/), [reaction initialization](https://docs.swmansion.com/react-native-reanimated/docs/advanced/useAnimatedReaction/), and [Expo haptics](https://docs.expo.dev/versions/latest/sdk/haptics/). These are interface references, not verification of an unspecified project's installed versions or measured behavior.

At the recorded verification, the corrected entrypoint at `skills/ui-expo-motion/SKILL.md` loaded through its then-supported skill URI. A temporary package/logic smoke preserved the name/description, resolved five local Markdown links, and syntax-checked 18 JavaScript/JSX snippets with Bun.Transpiler 1.4.2. An 11-step trace of the actual threshold callback/state logic covered initialization, inactive state, first crossing, repeated jitter, cancellation, and a new interaction; two interactions scheduled two cues in that trace. Both reduced/non-reduced settings-option branches passed. Sheet and swipe callback bodies were exercised with a command-recording adapter for current-state capture, failed end, cancelled finalization, interrupted/successful completion, and unmount cancellation.

Those checks establish syntax and ordinary-JavaScript logic only. They do not establish Expo/RN type compatibility, a native build, recognizer/worklet execution, live preference handling, production state-owner integration, device performance, or haptic delivery. No app was initialized and no dependencies or runtime settings were changed. The retained MIT notice and immutable comparison pins were not changed.
