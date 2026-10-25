---
name: ui-gesture-design
description: "[Emil Kowalski] Design or review gesture-driven web UI, spring motion, drag/swipe/sheets, reduced motion, translucent materials, or Apple-style interface foundations; also use for apple-design."
---

Modified adaptation; routing, task boundaries, spring/API distinctions, gesture lifecycle, accessibility, and source attribution updated locally. See [SOURCES.md](SOURCES.md)
and the complete [MIT notice](LICENSE.emil).

# Apple Design

## Start with the task

Identify the requested interaction, product conventions, target inputs/platforms, and whether the user wants review, proposals, or implementation. Reviews/proposals remain read-only. Build a prototype, change dependencies, or implement only within the current authorization; a bare invocation asks what needs attention rather than delivering a canned greeting.

Use this skill as a gesture-interaction and optional Apple-influenced design lens, not a mandatory visual system. When constructing web motion, read [web motion guidance](../ui-web-motion/SKILL.md) for the matching implementation procedure. When the problem concerns mobile browser touch, scrolling, keyboard, or viewport behavior, read [mobile web guidance](../ui-mobile-web/SKILL.md). Preserve compatible existing components, libraries, tokens, and semantics.

The retained ideas draw on [Designing Fluid Interfaces, WWDC18](https://developer.apple.com/videos/play/wwdc2018/803/) and the other primary references in [SOURCES.md](SOURCES.md). The prose below is a local web interpretation, not verbatim Apple quotations, current Apple product defaults, or a guarantee that browser APIs reproduce native behavior.

Aim for immediate feedback, current-state interruption, deliberate velocity/snap behavior, and useful accessible alternatives. Springs can help, but only the chosen API's actual configuration and tested behavior establish position/velocity continuity.

## The Core Idea

Local summary: coherent feedback, spatial relationships, and predictable control can make direct manipulation easier to understand. Physical metaphors are tools, not requirements to add motion.

Use safety/predictability, understanding, achievement, and joy as design considerations rather than claiming that every rule below follows universally from one platform.

## 1. Response — kill latency

Responsiveness supports directness; inspect the actual input path rather than assuming a particular latency cause.

- Show immediate press feedback, but commit ordinary button/link actions through successful semantic activation (`click`), preserving keyboard and assistive-technology behavior. `pointerup` alone does not establish an uncancelled activation.
- Inspect unnecessary timers, waits, and debounce behavior only where they affect the task. Tap delay varies by browser/configuration; do not report a historical 300ms delay as an observed problem.
- **Feedback must be continuous *during* the interaction, not just at the end.** For a drag, slider, or drawer, update the UI 1:1 with the pointer the whole way through — never animate only when the gesture completes.

```css
/* Optional press feedback; preserve the component's existing feedback and focus. */
.button:active { background: var(--button-pressed-bg); }
```

## 2. Direct manipulation — 1:1 tracking

Direct manipulation should preserve the relationship between the contact point and the component's current presentation value, rather than snapping its center to the pointer.

Use the existing gesture primitive when it meets the requirements. For a custom Pointer Events integration, implement the full lifecycle:

1. Accept the intended primary pointer/button and keep one active `pointerId`; ignore unrelated pointers. Preserve native control activation and coordinate nested scrolling/recognizers.
2. On a valid start, stop only the component's superseded motion and capture its current presentation position plus the pointer's start position. Apply a task-appropriate intent threshold rather than moving a component on every incidental touch.
3. Capture the active pointer where needed and process only its moves. Track the presentation offset from the grab point and a short recent position/timestamp history using one clock; do not compute flick velocity from the whole gesture.
4. On an uncancelled active `pointerup`, include the release sample, use positive elapsed intervals for velocity, and choose the component's bounded release policy. Clear active state before intentionally releasing capture so the resulting capture-loss event cannot cancel a completed release.
5. On `pointercancel`, unexpected `lostpointercapture`, or disabling/removing the component, clear ownership and transient feedback without committing the action. Stop owned animation/frame callbacks and remove listeners on disposal.
6. Preserve browser scrolling and pinch zoom through the effective `touch-action` of the surface and ancestors. Provide a keyboard/semantic non-drag alternative, such as a close button or increment/decrement control, with appropriate focus behavior.

This CSS is an axis-policy example for a custom vertical drag handle, not a complete gesture controller:

```css
.vertical-drag-handle {
  touch-action: pan-x pinch-zoom; /* browser keeps horizontal pan and pinch zoom */
}
```

## 3. Interruptibility — the single most important principle

Allow redirection where it serves the interaction. A new drag should not jump to a stale logical endpoint or accidentally finish a cancelled close/delete.

- Keep useful controls available during transitions, while preserving deliberate disabled/transaction states.
- Stop/retarget the component's actual animation mechanism from its current presentation value. A DOM transform read, library motion value, CSS transition, or WAAPI animation may have different ownership and interruption APIs.
- CSS transitions/timing animations are not categorically uninterruptible. Direct tracking may need transitions suspended during the drag; settling can use timing or springs according to the required retargeting and velocity behavior.
- Distinguish position continuity from velocity continuity. Verify the installed library/configuration's velocity support and explicit handoff; do not assume every spring carries it.
- Use independent axis state where useful, but do not replace a correct coupled 2D model merely to satisfy a universal rule. Exercise reversal, repeated activation, cancellation, and stale completion callbacks.

## 4. Behavior over animation — use springs

A behavior model can respond to new input instead of playing a fixed sequence. Springs are useful for some direct-manipulation settling; other existing native/CSS/WAAPI/timing mechanisms can also fit. Reuse the smallest compatible implementation.

Apple-style ratio/response concepts and a web library's parameter names are not interchangeable:

- **Damping ratio** — controls overshoot. `1.0` = critically damped, no bounce, smooth settle. `< 1.0` = overshoots and oscillates. Lower = bouncier.
- **Response** describes a platform spring parameter, not automatically a web library's `duration`. Check the API's actual definition and units.

Use restrained/no overshoot when the task benefits; momentum does not mandate bounce. Preserve compatible existing tokens.

**Retained ratio/response illustrations from the adaptation, not verified current Apple product defaults:**

| Interaction illustration | Damping ratio | Response (seconds) |
| --- | --- | --- |
| Move / reposition | `1.0` | `0.4` |
| Rotation | `0.8` | `0.4` |
| Drawer / sheet | `0.8` | `0.3` |

**Motion mapping:** Motion's `damping` is a coefficient, not Apple's damping ratio. Its documented duration/bounce springs do not incorporate gesture velocity; physics-based stiffness/damping/mass springs do. See [Motion transitions](https://motion.dev/docs/react-transitions) and verify the installed version. These fragments assume an existing compatible Motion dependency; their values are illustrative, not an Apple conversion or house-style mandate.

```js
import { animate } from 'motion';

// Time-oriented spring shape: do not promise gesture-velocity inheritance.
animate(el, { y: 0 }, { type: 'spring', bounce: 0, duration: 0.4 });

// Physics-based settling when the actual interaction requires velocity handoff.
animate(el, { y: target }, {
  type: 'spring', stiffness: 300, damping: 30, mass: 1, velocity: releaseVelocity,
});
```

## 5. Velocity handoff — the seam between drag and animation

When velocity continuity serves the gesture, hand off the signed recent release velocity in the units required by the actual spring API. Reduced motion, hard boundaries, and state changes may intentionally require another settling policy.

Some APIs use relative velocity; Motion's physics-based option uses absolute units for the animated value (CSS pixels/second for a pixel translation). Do not pass a normalized value into an absolute-velocity API. For an API that explicitly requires normalization, this helper chooses no relative handoff when the target is effectively the current position:

```js
function relativeVelocity(gestureVelocity, currentValue, targetValue, epsilon = 0.001) {
  const remaining = targetValue - currentValue;
  return Math.abs(remaining) <= epsilon ? 0 : gestureVelocity / remaining;
}
```

Inputs use consistent finite units and a nonnegative distance tolerance. The tolerance above is an illustrative numerical policy, not a dismissal threshold. If momentum should select a different target, choose that valid snap point instead of dividing by zero or manufacturing an infinite velocity. For example, `50px/s / (150px - 50px) = 0.5/s`; negative remaining distance changes the sign.

## 6. Momentum projection — animate to where the gesture is *going*

Projection can express intent from a short flick. It is one release policy, not a requirement to ignore position, bounds, accessibility actions, or cancellation.

The retained exponential-decay model below is an illustrative adaptation associated with the historical fluid-interface material. It is not proof that every current Apple surface, Vaul version, or carousel uses this exact model. Use the component's inspected finite snap points and documented units:

```js
// Illustrative coefficient per millisecond; require 0 < decelerationRate < 1.
function project(initialVelocity /* px/s */, decelerationRate = 0.998) {
  return (initialVelocity / 1000) * decelerationRate / (1 - decelerationRate);
}

const projectedEndpoint = currentPosition + project(releaseVelocity);
// The real component chooses a valid bounded snap target from this endpoint
// and settles through its installed animation API, with explicit velocity units.
```

Choose distance/velocity/projection rules for the actual component, including reversal and boundary cases. A velocity sign alone is not a universal commit decision. Label estimates and tuning parameters; do not present the model as measured native parity.

## 7. Spatial consistency — symmetric paths, anchored origins

Keep entry/exit relationships understandable rather than imposing one physical path on every component.

- Reuse coherent existing entry/exit paths, with justified exceptions for the actual task.
- Anchor source-connected popovers where useful; centered modals and screen-attached sheets can have different legitimate origins.
- Reverse/retarget according to the installed mechanism; do not force inverse easing curves where a compatible existing transition or velocity-aware spring already supplies the intended behavior.

## 8. Hint in the direction of the gesture

Humans predict a final state from a trajectory. Intermediate motion should telegraph where things are going — Control Center modules "grow up and out toward your finger." Make the in-between frames point at the outcome, not just interpolate blindly to it.

## 9. Rubber-banding — soft boundaries

At an edge, resist progressively instead of stopping hard. A hard stop reads as "frozen"; continuous resistance reads as "responsive, but there's nothing more here." Apply damping that increases the further past the boundary the user drags.

```js
// The further past the bound, the less the element follows — real things slow before they stop
function rubberband(overshoot, dimension, constant = 0.55) {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}
```

## 10. Gesture design details (the "feel" checklist)

- **Tap:** immediate feedback, successful semantic activation, and intentional cancellation. Choose hit regions from the component/platform requirements rather than a universal 10px allowance.
- **Drag/swipe:** choose an intent threshold and axis policy that preserve the surrounding scroll and accessibility behavior; then track the intended presentation value.
- **Recognizer composition:** coordinate the actual plausible gestures, pointer ownership, cancellation, and browser defaults instead of installing every recognizer or assuming final-state events can supply continuous tracking.
- **Disambiguation:** pay any double-tap or long-press delay only where that interaction is genuinely supported, while preserving ordinary activation.

## 11. Frame-level smoothness

Smoothness is about *what's in the frames*, not just the frame rate.

- Inspect actual playback and recordings for strobing or abrupt coordination; do not claim an unspecified perception threshold.
- Blur/stretch is optional rendering work, not a fix for an unresolved state/transition defect.
- Prefer suitable transform/opacity paths, but they do not guarantee compositor-only or off-thread execution. `requestAnimationFrame` is a scheduling mechanism, not performance proof.
- Add `will-change` only for an evidenced problem where measurement supports it, scope it narrowly, and remove it when no longer useful. It can increase memory/rendering cost or alter stacking; see [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/will-change).

## 12. Materials & depth — translucency conveys hierarchy

When the brief calls for Apple-influenced materials, a supported `backdrop-filter` treatment is one option. Keep suitable opaque surfaces and existing product tokens; do not automatically redesign navigation, sheets, borders, or depth.

- Choose material weight, opacity, border, shadow, and layering from actual hierarchy and contrast over representative backgrounds. Nested translucency is not categorically forbidden, but needs verification.
- Use scrims and background treatment according to modal versus parallel interaction semantics. Preserve focus, dismissal, and readable background/foreground state.
- Test text/icon contrast, theme changes, zoom, and supported contrast/transparency preferences. Heavier text or letter spacing is not a substitute for sufficient contrast.
- Prefer an appropriate existing divider/edge treatment; blur masks and animated blur are optional effects with rendering and reduced-motion costs, not required improvements.

The token names below represent roles to map to the existing theme, not a new global token system. Use an opaque foreground/background by default; opt into translucent styling only when requested and supported:

```css
.toolbar {
  color: var(--toolbar-fg);
  background: var(--toolbar-bg);
  border-top: 1px solid var(--toolbar-border);
}

@supports (backdrop-filter: blur(1px)) {
  .toolbar[data-translucent] {
    background: var(--toolbar-translucent-bg);
    backdrop-filter: blur(20px) saturate(180%);
  }
}
```

## 13. Multimodal feedback — motion + sound + haptics

Local web interpretation of the ideas in [Designing Audio-Haptic Experiences, WWDC19](https://developer.apple.com/videos/play/wwdc2019/810/):

1. **Causality** — it must be obvious what caused the feedback. Trigger it on the actual causal event (the toggle flipping, the item snapping home), and match its character to the action's physicality.
2. **Coordination** — request feedback at the intended causal event, but do not promise same-frame audio, animation, and vibration delivery. Browser support, user activation, permissions/settings, scheduling, and hardware vary. Capability-check optional audio/vibration, honor preferences, and preserve independent visual/semantic feedback; see the [Vibration API](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API).
3. **Utility** — add feedback only where it earns its place. Reserve haptics/sound for meaningful moments (success, error, commit, snap). Over-feedback trains users to ignore all of it.

## 14. Reduced motion & accessibility

Reduced motion may mean gentle motion or none. Keep feedback, state, controls, and focus useful without forcing fades. Respond to the independent supported signals:

- **`prefers-reduced-motion: reduce`** — remove unnecessary movement and preserve the actual open/closed, selected, and dismissed state. Cancel/settle owned JS/library motion through its actual API; a CSS rule alone does not stop every animation mechanism.
- **`prefers-reduced-transparency: reduce`** — use theme-appropriate opaque foreground/background tokens and drop the blur. Treat support as an enhancement, not the only way to achieve legibility.
- **`prefers-contrast: more`** — use verified foreground/background contrast and a discernible boundary; preserve suitable forced-colors behavior.

Avoid distracting large/looping motion where it conflicts with the task or preferences. Do not automatically fade or make content translucent during repositioning, and do not prescribe a universal oscillation threshold. Test preference changes during an interaction, not only startup.

```css
@media (prefers-reduced-motion: reduce) {
  .sheet { transition: none; animation: none; }
}
@media (prefers-reduced-transparency: reduce) {
  .toolbar,
  .toolbar[data-translucent] {
    color: var(--toolbar-fg);
    background: var(--toolbar-bg);
    backdrop-filter: none;
  }
}
@media (prefers-contrast: more) {
  .toolbar,
  .toolbar[data-translucent] {
    color: var(--toolbar-fg);
    background: var(--toolbar-bg);
    backdrop-filter: none;
    border-color: currentColor;
  }
}
```

The `.sheet` rule deliberately does not reset `transform`, visibility, inertness, or semantic state. If those properties represent a closed panel, changing them can reveal or reactivate it. The real component remains responsible for state, focus, keyboard dismissal, and non-drag alternatives.

## 15. Typography — optical sizing, tracking, leading

For an explicitly Apple-influenced typography task, [The details of UI typography, WWDC20](https://developer.apple.com/videos/play/wwdc2020/10175/) provides platform context. The web interpretation must still fit the product, font, language/script, and user's settings:

- Reuse appropriate font and type tokens; system fonts are an option, not a compulsory replacement for an existing face.
- Choose tracking and leading from the actual font, size, script, and content. Negative display tracking and tight line height are not universal improvements.
- Build hierarchy from compatible weight, size, and leading while checking wrapping and contrast.
- Support browser zoom/text enlargement and reflow; web relative units do not automatically reproduce native Dynamic Type.

This display treatment is illustrative, not a root font reset or a required type scale:

```css
.display {
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.05;        /* tight leading for large text */
  letter-spacing: -0.02em;  /* negative tracking as it grows */
  font-optical-sizing: auto;
}
```

## 16. Design foundations — the eight principles

For an Apple-influenced design brief, these retained summaries correspond to the eight chapters in [Principles of great design, WWDC26](https://developer.apple.com/videos/play/wwdc2026/250/). They are design considerations, not universal web implementation rules or a reason to override the product:

1. **Purpose.** Make with intention; decide what *not* to build. Every feature asks for the user's time, attention, and trust — spend that budget only where it pays off.
2. **Agency.** Keep people in control: offer choices, don't force a single path. Back it with forgiveness — easy undo for slips, a confirmation dialog only for genuinely destructive, irreversible actions (use sparingly; overusing it trains people to click through).
3. **Responsibility.** Act in the user's interest. Privacy: ask at the right moment, only for what's needed, transparently. Safety: anticipate misuse and harm — especially with AI (an allergy-aware recipe app must not suggest a harmful ingredient). Add previews, confirmations, disclaimers; cut a feature whose risk outweighs its value.
4. **Familiarity.** Build on what people already know. Use metaphors that are neither too literal nor too abstract (a trash can means delete), and honor their physics. Be consistent: things that look the same must behave the same and live in the same place (close is always top-left on macOS) so people can predict what happens next. Only break a familiar pattern if you can prove it's better — then test it, don't assume.
5. **Flexibility.** Design for different contexts, devices, and the full range of abilities. Adapt to the platform (iPhone = quick touch; desktop = deep workflows with precise pointer control) and to the situation. Design inclusively (age, language, expertise, accessibility). When no single layout fits everyone, let people personalize — rearrange controls, hide what they don't use.
6. **Simplicity — not minimalism.** Strip the unnecessary so the core purpose shines; burying everything in one place looks minimal but isn't simple. Be concise (plain language, no jargon, fewer steps) and clear (use hierarchy — order, spacing, contrast — so the most important thing is the most obvious). Every element earns its place; sometimes *adding* context simplifies (a video scrubber that shows time remaining). Show the common path first, advanced options one level deeper.
7. **Craft.** Uncompromising attention to detail builds trust. Beautiful typography, colors that adapt to light/dark, clear iconography, and responsive animations that give immediate, natural feedback. Nothing is random — every spacing, timing, and alignment value is a deliberate choice you can defend. Jittery scroll, misaligned icons, and layouts that break on rotation read as carelessness. Craft needs iteration and longevity — keep evolving the design as features and hardware change.
8. **Delight.** The result of getting the other seven right, not confetti tacked on top. Decide the emotion you want people to feel (calm, confident, excited) and reinforce it in every decision.

Conditional tactics that can serve those principles:

- **Feedback:** communicate meaningful status, completion, warning, and errors through accessible state and announcements appropriate to the task.
- **Wayfinding:** make location, available actions, and dismissal understandable; do not trap focus or navigation.
- **Grouping and labels:** keep controls near what they affect, but do not infer that needing an accessible label means the design is weak. Preserve explicit labels.
- **Naming:** choose specific understandable labels for the actual content; established labels such as “Home” are not inherently wrong.

## 17. Process

- In a review/proposal, inspect and report without writing prototypes or changing dependencies. An authorized implementation may use an interactive prototype only when it serves the requested scope.
- Design the interaction and visuals together while preserving the actual component's semantics and product conventions.
- For authorized implementation, exercise the changed browser surface with available Playwright MCP tools: normal/reduced motion, open/closed states, interruption/reversal, keyboard/focus, pointer cancellation, and relevant viewport sizes. Use real devices/user studies only when available and appropriate; report each unverified layer rather than claiming it ran.
- Report the supported finding/proposal or actual changes, observed checks, and remaining limits in the user's requested format. Source inspection and a synthetic fixture are not consuming-agent, production feel, or real-device proof.

## Quick Reference

| Need | Technique | Concrete value |
| --- | --- | --- |
| Default spring | Reuse compatible project parameters | Do not confuse a damping ratio with Motion's coefficient |
| Velocity-aware settle | Supported physics-based spring | Signed release velocity in documented units |
| Relative velocity API | Normalize only when required | Handle zero/near-zero remaining distance explicitly |
| Flick target | Component-specific distance/velocity/projection policy | Finite valid snap targets and actual bounds |
| Interrupt cleanly | Stop/retarget current presentation state | Preserve useful position and, when required, velocity continuity |
| Reverse vs. commit | Deliberate component policy | Not velocity sign alone |
| Drag tracking | Active pointer, capture, recent samples | Cancellation/lost-capture/disposal cleanup and accessible alternatives |
| Press feedback | Immediate state feedback | Successful semantic activation, not raw release alone |
| Boundary | Suitable resistance or constraint | Match actual scrolling and component behavior |
| Translucent chrome | Optional supported treatment | Theme/contrast-safe opaque fallback |
| Typography | Actual font/script/product tokens | Verify zoom, wrapping, and reflow |
| Reduced motion | Useful gentle or zero-motion behavior | Preserve logical/semantic state; settle each animation mechanism |
