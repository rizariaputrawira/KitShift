---
name: ui-expo-motion
description: "[Emil Kowalski] Build or fix animation and gestures in React Native or Expo, including sheets, transitions, press feedback, or haptics. For web motion use ui-web-motion; also use for animate-expo."
---

Modified adaptation; routing, task boundaries, compatibility, accessibility, and recipe guidance updated locally. See [SOURCES.md](SOURCES.md)
and the complete [MIT notice](LICENSE.emil).

# Building Animations in Expo

## Start with the task

Identify the requested surface, target platforms, and whether the task is review, proposal, or implementation. Reviews and proposals remain read-only; write code or change dependencies only within an authorized implementation scope. If no task is supplied, ask what behavior needs attention rather than delivering a canned introduction.

Inspect the actual Expo SDK, React Native architecture/version, animation and gesture libraries, Router/native-stack versions, project tokens, and component semantics before choosing an API. Reuse compatible existing implementations. The recipes illustrate particular API families; they do not establish the installed project's compatibility.

Touch is common, but supported keyboard, assistive-technology, mouse, and hover input still matter. For Reanimated-based gestures, distinguish React Native work from UI-runtime worklets and avoid unnecessary per-frame React renders or cross-runtime calls. Runtime choice alone does not prove smoothness. Interruption, cancellation, and velocity handoff need explicit behavior and verification.

## Operating Posture

Choose the smallest compatible change that serves the request, state the reason, and preserve the app's conventions. Ask about alternatives only when a material product or compatibility decision cannot be resolved from the project.

Two failure modes, and the first is worse:

1. **Animating something that shouldn't animate.** The gate below exists to produce zero lines of code sometimes.
2. **Using an unsuitable update path.** Per-frame React renders, layout work, or repeated cross-runtime scheduling can cause contention. Inspect the implementation and recordings before attributing dropped frames to a particular API or promising a frame rate.

## Hard Rules

1. **Run the sequence in order.** Steps 1 and 2 gate everything.
2. **Reuse the appropriate installed mechanism.** Core `Animated` can use a native driver, including direct scroll events; `PanResponder` has different native-driver limitations. Prefer Reanimated for requirements that need its compatible worklet/gesture capabilities, not as a compulsory migration.
3. **Existing tokens win.** The tables below are fallback examples, not mandatory curves, timings, springs, or measured interaction frequencies.
4. **Reduced motion ships with the animation**, not as a follow-up.
5. **Separate proof layers.** Source checks, simulator interaction, release-build recordings, and physical-device feel establish different things. Exercise reachable behavior; report unavailable layers. Judge performance/feel on representative supported hardware and release builds before claiming those results.

## The Build Sequence

### 1. Should this animate at all?

Estimate frequency from actual product context and label an estimate as such:

| Frequency | Starting point |
| --- | --- |
| Frequent navigation, scrolling, settings | Preserve platform behavior; favor minimal/no additional motion |
| Frequent press feedback or selection | Immediate state feedback; restrained motion only if useful |
| Occasional sheets, modals, onboarding | Purposeful transitions with coherent interruption and dismissal |
| Rare completion or first-run states | Optional expressive motion when the brief warrants it |

Tabs are usually peers, but that is not a blanket ban on an intentional platform/product transition. Preserve compatible navigation conventions and reduced-motion behavior. If proposed motion adds no task value, recommend immediate state or non-motion feedback rather than writing decorative code.

### 2. What is the purpose?

Name the supported purpose before continuing: feedback, spatial consistency, state indication, preventing an abrupt change, explanation, or brief-appropriate delight.

Can't name it? Don't build it.

### 3. Pick the tool — cheapest that works

Choose the smallest installed, supported mechanism that fits. The examples below are candidates, not an installation plan; check exact APIs and platform limits against the project's versions.

| Need | Tool |
| --- | --- |
| Simple state change, press feedback, or supported scroll linkage | Existing native/component behavior, core `Animated`, or supported Reanimated CSS transitions |
| Loop or multi-stage sequence | Existing animation mechanism; Reanimated CSS animations only where supported |
| Mount/unmount or list reflow | Supported layout animations with identity/recycling and reduced-motion checks |
| Continuous or interruptible gesture | Installed compatible gesture handling and animation integration |
| Screen-to-screen navigation | Existing native-stack/Expo Router options, preserving back gestures and app conventions |
| Sheet presented as a destination | Supported native `formSheet` presentation, with actual platform/content constraints |
| Tabs, context menus, previews, large titles | Existing platform/Router primitives; verify version-specific exports, option names, and platform support |
| Pull to refresh | Existing `RefreshControl` or justified custom behavior |
| Keyboard-following UI | Existing keyboard integration; consider a compatible controller only when necessary |
| Illustration or large custom scene | Existing Lottie/Skia integration only if the brief and rendering needs warrant it |

A shared value may suit continuous or interruptible motion; a two-state change may need only existing component feedback or a transition. Do not add an animation library solely to follow a recipe.

**Dependencies.** Inspect the manifest, lockfile, architecture, and configuration first. Install only missing packages necessary for the authorized implementation. In an Expo project, use its supported `expo install` workflow and verify resolved compatibility; do not copy the whole package list below into every app.

| Need | Package |
| --- | --- |
| Reanimated 4 implementation | Compatible `react-native-reanimated` + `react-native-worklets`; other majors have different requirements |
| Gestures | `react-native-gesture-handler` |
| Navigation, sheets, native tabs, menus | `expo-router` |
| Haptics | `expo-haptics` |
| Keyboard-following UI | `react-native-keyboard-controller` (needs `KeyboardProvider` at the root — see the keyboard recipe) |
| Illustration, celebration | `lottie-react-native` |
| Very large animated scenes, custom drawing | `@shopify/react-native-skia` |

### 4. Pick the properties

- Prefer suitable transform/opacity paths, but neither is free. Layout properties can affect Yoga/layout; other properties can incur paint, compositing, or platform-specific costs. Verify representative load.
- An absolutely positioned indicator may isolate some layout effects, but animating its width still has costs. Choose measured width or transforms according to shape and rendering requirements.
- A small scale/opacity entrance is one option, not a universal rule. Preserve deliberate alternatives and useful zero-motion states.
- Transform order and percentage support depend on the actual React Native/Reanimated APIs; verify the composed result and installed support rather than copying web syntax.
- Shadow, elevation, and blur behavior varies by implementation and platform. A static layer with an opacity transition may be cheaper, but recordings—not a blanket prohibition—should decide.

### 5. Timing or spring

Use springs when their interruption and velocity behavior serves the gesture; timing can suit bounded state changes. Preserve compatible project choices.

For Reanimated versions supporting duration-based springs, these configurations are illustrative. Physics-based mass/stiffness/damping is also valid; choose one supported configuration family and check velocity units.

| Interaction | Config |
| --- | --- |
| Default settle, no overshoot | `{ duration: 400, dampingRatio: 1 }` |
| Reposition / snap back after a drag | `{ duration: 400, dampingRatio: 0.8, velocity }` |
| Sheet, drawer | `{ duration: 300, dampingRatio: 0.8, velocity }` |
| Must not pass a hard edge | add `overshootClamping: true` |

Use overshoot only where it serves the surface and respects boundaries; momentum does not require bounce, and a menu is not automatically forbidden from having it.

**Easing**, for everything without a finger on it:

| Situation | Easing |
| --- | --- |
| Entering or exiting | `ease-out` |
| Moving / morphing on screen | `ease-in-out` |
| Constant motion (progress, marquee) | `linear` |
| Default | `ease-out` |

Reuse appropriate project or built-in easing. If none exists, these are fallback examples; do not replace an established curve merely because it is built-in or uses ease-in.

```js
import { Easing } from 'react-native-reanimated';

const EASE_OUT = Easing.bezier(0.23, 1, 0.32, 1);      // strong ease-out for UI
const EASE_IN_OUT = Easing.bezier(0.77, 0, 0.175, 1);  // on-screen movement
const EASE_SHEET = Easing.bezier(0.32, 0.72, 0, 1);    // iOS sheet curve
```

**Duration:**

| Element | Duration |
| --- | --- |
| Press feedback | 100–150ms |
| Toggle, chip, small state change | 150–200ms |
| Sheet, modal, drawer | spring, ~300ms perceived |
| Screen transition | Existing compatible platform/product convention |

Favor responsive ordinary UI, often under 300ms, without treating that heuristic as a universal cap. Navigation and gesture settling can differ; justify timing from the task and verify the result. Do not claim a platform duration or perceived spring duration without an identified basis.

### 6. Keep it off the JS thread

Keep continuous motion off unnecessary React render/cross-runtime paths when the installed stack supports that.

- Avoid per-frame `setState` for motion; discrete press, commit, or threshold state updates are different.
- For Reanimated 4/compatible Worklets, `scheduleOnRN` can schedule discrete RN-runtime work. Other versions may use different APIs, including `runOnJS`; do not migrate them from a table alone. Cross-runtime callbacks are asynchronous, not same-frame guarantees.
- Do not read/write shared values during render. Update through supported worklets, handlers, and effects.
- Use `.get()`/`.set()` when supported and required for React Compiler compatibility; `.value` remains valid in appropriate installed versions/configurations.
- Worklet helpers must be available to the UI runtime. Check automatic workletization and mark custom helpers with `'worklet'` where the installed tooling requires it.
- On a new gesture, cancel a superseded animation before capturing its current value. Finalize failed/cancelled gestures without committing actions, and cancel outstanding animations on unmount. The actual state owner must reject stale queued commits and duplicate destructive actions.

### 7. Press, not hover

Support touch plus the other inputs available on the target platform; do not make essential behavior hover-only.

- Show immediate feedback through `onPressIn`/`onPressOut`; commit successful Pressable activation through `onPress`, not deactivation alone. Preserve cancellation, disabled state, accessibility actions, and keyboard behavior.
- Reuse the component's feedback. A small scale transition is optional; non-motion color/opacity feedback is valid.
- Check the platform's touch-target guidance (commonly 44pt on iOS and 48dp on Android). `hitSlop` can help, but parent bounds and neighboring targets constrain the actual hit region.
- Use `pressRetentionOffset` deliberately; do not prevent intentional cancellation by making it arbitrarily large.
- Preserve suitable Android ripple/platform feedback or an intentional custom alternative rather than forcing one style across platforms.

### 8. Haptics

Use optional haptics for meaningful user-caused events, with independent visual/accessibility feedback. Inspect the existing haptic abstraction, platform support, settings, and failure behavior before adding calls.

| Moment | Call |
| --- | --- |
| A value ticks past a step — picker, slider detent, segmented control | `Haptics.selectionAsync()` |
| Something snaps home, a sheet detent catches, a drag commits | `Haptics.impactAsync(ImpactFeedbackStyle.Light)` |
| A heavy object lands, a destructive action fires | `Haptics.impactAsync(ImpactFeedbackStyle.Medium)` |
| Operation succeeded or failed | `Haptics.notificationAsync(NotificationFeedbackType.Success / Error)` |

Schedule feedback at the intended causal event, not automatically after every animation. RN scheduling, native dispatch, device settings, and hardware can delay or suppress it; do not promise same-frame delivery.

Define a per-interaction cadence, such as at most one arming cue per pull. Ignore initialization, avoid per-frame scheduling, and deliberately handle repeated crossings, cancellation, and the next interaction. Continuous pickers may warrant distinct debounced detent cues rather than a blanket one-per-gesture rule.

Never rely on haptics as the only feedback. Use the installed version's supported API and platform behavior; scheduling `Haptics.selectionAsync` back to RN from a worklet is a compatible-stack example, not a universal dispatch contract.

### 9. Reduced motion and accessibility

```jsx
import { useSharedValue, useReducedMotion, ReduceMotion, withSpring } from 'react-native-reanimated';

const reduced = useReducedMotion();
const y = useSharedValue(reduced ? 0 : SHEET_HEIGHT);

// or let each animation decide
withSpring(0, { duration: 300, dampingRatio: 0.8, reduceMotion: ReduceMotion.System });
```

Reduced motion may mean gentler motion or no animation at all. Preserve immediate state, focus, and meaningful feedback without obligatory fades. Reanimated's documented `ReduceMotion.System` can resolve animations immediately; verify how the installed APIs handle live preference changes (`useReducedMotion` alone may reflect startup state). Apply the preference to CSS/layout animations, gestures, and every navigation override, not only one spring.

**Text scales.** `allowFontScaling` is on by default, so any height you measured at default type size is wrong at 200%. Never animate to a hardcoded height — measure with `onLayout`, or animate a transform instead.

## Setup that silently breaks motion

Check these first when "the animation just doesn't run":

- Compare the installed Expo SDK, React Native, Reanimated, Worklets, and Gesture Handler versions and architecture before changing setup. [Reanimated compatibility](https://docs.swmansion.com/react-native-reanimated/docs/guides/compatibility/) documents New Architecture and dependency requirements for version 4; do not apply those packages/configuration blindly to another major.
- Inspect the project's actual Babel preset/plugin configuration and the version-specific installation guide. Do not add a second plugin or assume every Expo/bare project uses the same setup.
- Verify the installed Gesture Handler's root/provider requirements, platform configuration, recognizer composition, and finalization API.
- Use development/simulator checks for reachable correctness, then release-build recordings and representative devices for performance/feel claims. Report which checks actually ran.

## High-refresh verification

High-refresh capability is not an observed frame rate. If it is a target requirement, inspect device support, the installed Expo/RN configuration, applicable platform flags such as `CADisableMinimumFrameDurationOnPhone`, and actual release-build recordings before changing configuration. Do not add a flag merely because a recipe mentions it.

At 120 frames/s the theoretical interval is about 8.33ms; at 60 it is about 16.67ms (`1000 / framesPerSecond`). These are arithmetic intervals, not measured app budgets or evidence that frames meet them.

## Recipes

When a request matches an effect, read the relevant [integration fragment](RECIPES.md) after inspecting the actual stack and component. The examples cover press feedback, sheets, swipe actions, headers, lists, keyboard integration, indicators, navigation, toasts, and threshold feedback. They require stated inputs and real component integration; they are not a ready-to-run app or permission to install packages.

## Never Ship

| Never | Instead |
| --- | --- |
| Replacing a working animation stack merely to match this skill | Inspect requirements, versions, and existing mechanisms first |
| Per-frame React renders or RN callbacks for continuous motion without a reason | Supported native/worklet paths, with discrete state commits |
| Treating a version-specific API as universal | Use the installed version's documented API and compatibility requirements |
| Reading or writing a shared value during render | Supported worklets, handlers, and effects |
| Committing an action from `onPressOut` or a failed/cancelled gesture | Semantic successful activation and explicit lifecycle cleanup |
| Treating transform, opacity, or absolute layout as free | Measure representative rendering/load |
| Forcing one curve, tab transition, scale, or duration everywhere | Compatible project/platform tokens and justified exceptions |
| A child navigation option overriding reduced motion | Apply the chosen preference at every override |
| Threshold feedback on initialization, repeated jitter, or every frame | Deliberate per-interaction cadence with initialization/cancellation handling |
| Haptics as the only feedback or a promised same-frame event | Independent state feedback and honest delivery limits |
| Claiming source or simulator checks prove release-device feel | Report each exercised layer and remaining device checks |

## Output

For a review/proposal, report supported findings and proposed changes without editing. For an authorized implementation, report briefly:

- **Purpose and scope** — the actual interaction and reason for motion or its omission; label estimated frequency.
- **Changes** — files, inspected tool/version, properties, and reused or justified timing.
- **Verification** — checks/actions and observed results, separating source, simulator, release, and physical-device evidence.
- **Remaining limits** — specific gesture, velocity, accessibility, performance, and haptic checks not exercised.

Respect the requested output format. Do not require code for a review or claim device results from source inspection.

## Tone

Opinionated and brief. When the honest answer is "this shouldn't animate," or "this needs a real device before I can tell you if it's right," give it.
