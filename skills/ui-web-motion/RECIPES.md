# Animation Recipes

Visual building blocks for existing accessible components, not complete interactive widgets. Select the relevant effect and integrate it with the inspected component's actual state, semantics, focus, keyboard, pointer, and cancellation behavior.

Reuse inspected compatible project tokens. [Shared principles](references/principles.md) supply fallback curves/ranges. These examples are not universal mandates: ordinary UI usually stays under 300ms; longer drawer/toast examples need a task-specific reason and actual verification. Preserve immediate state/focus and non-motion feedback, with useful reduced/no-motion alternatives. Prefer transform/opacity, with verified accordion-height and clipping exceptions. See [SOURCES.md](SOURCES.md) and the retained [MIT notice](LICENSE.emil) for identified derivation and local modifications.

---

## Button press

Any pressable element. Instant feedback that the interface heard the user.

```css
.button {
  transition: transform 160ms var(--ease-out);
}

.button:active {
  transform: scale(0.97);
}
```

`scale()` scales children too — the label and icons come along, which is what makes it read as a physical press.

No hover gating needed here: `:active` is a real press on touch. Gate any `:hover` styling separately.

---

## Dropdown, popover, menu, select

Scales out of its trigger, not out of thin air.

```css
.popover {
  transform-origin: var(--transform-origin); /* Base UI supplies this */
  transition:
    opacity 200ms var(--ease-out),
    transform 200ms var(--ease-out);
}

.popover[data-starting-style],
.popover[data-ending-style] {
  opacity: 0;
  transform: scale(0.95);
}
```

The `transform-origin` is the whole point — the panel should look like it came out of the thing you clicked.

---

## Tooltip

Same shape as a popover, faster, plus the detail most implementations miss.

```css
.tooltip {
  transform-origin: var(--transform-origin);
  transition:
    transform 125ms var(--ease-out),
    opacity 125ms var(--ease-out);
}

.tooltip[data-starting-style],
.tooltip[data-ending-style] {
  opacity: 0;
  transform: scale(0.97);
}

/* Once one tooltip is open, neighbours open instantly */
.tooltip[data-instant] {
  transition-duration: 0ms;
}
```

The initial delay prevents accidental activation. After that, skipping both the delay and the animation makes the whole toolbar feel faster.

---

## Modal

The one popover that stays centered.

```css
.modal {
  transform-origin: center; /* exempt — not anchored to a trigger */
  transition:
    opacity 250ms var(--ease-out),
    transform 250ms var(--ease-out);
}

.modal[data-starting-style],
.modal[data-ending-style] {
  opacity: 0;
  transform: scale(0.96);
}

.backdrop {
  transition: opacity 250ms var(--ease-out);
}
```

Animate the backdrop's opacity alongside it so they read as one surface.

---

## Drawer / sheet

```css
.drawer {
  transform: translateY(0);
  transition: transform 500ms var(--ease-drawer);
}

.drawer[data-closed] {
  transform: translateY(100%);
}
```

This is how Vaul hides a drawer before animating it in.

Add drag and it becomes a gesture problem — see **Drag to dismiss** below.

---

## Toast

```css
.toast {
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 400ms ease,
    transform 400ms ease;

  @starting-style {
    opacity: 0;
    transform: translateY(100%);
  }
}
```

- `ease` rather than `ease-out`, slightly slower than typical UI: Sonner reads as elegant partly because its motion is tuned to the component's personality rather than to the generic UI budget.
- If `@starting-style` isn't available, keep the toast visible without the entrance animation. No mount-state JavaScript is needed merely to preserve notification delivery.

When toasts stack and the list reflows, the opacity change has to work against the height change. There's no formula for that pair — adjust until it feels right, then check it again the next day.

---

## Accordion / collapse

```css
.content {
  overflow: hidden;
  transition:
    height 200ms var(--ease-out),
    opacity 200ms var(--ease-out);
}
```

Keep it short — this is one of the few animations that costs layout on every frame, so a long duration is expensive as well as sluggish. Measure the content height in JS (or use a headless primitive that supplies it) rather than animating to `auto`.

---

## Stagger a group entrance

For an occasional list or grid, use a small transform-only entrance when it serves the task. Keep content visible before JavaScript initializes, when animation is unavailable, and under reduced motion.

```css
.item {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: no-preference) {
  .item[data-enter] {
    animation: settleIn 200ms var(--ease-out) backwards;
  }

  .item[data-enter]:nth-child(2) { animation-delay: 50ms; }
  .item[data-enter]:nth-child(3) { animation-delay: 100ms; }
  .item[data-enter]:nth-child(4) { animation-delay: 150ms; }

  @keyframes settleIn {
    from { transform: translateY(8px); }
    to { transform: none; }
  }
}
```

Set `data-enter` only for a requested entrance; absence of the flag leaves the content visible and stationary. Stagger must not delay controls, focus, or availability. Do not fade essential content to zero while waiting for a decorative sequence.

---

## Hold to confirm

This is only the visual progress layer for an existing hold-to-confirm component. CSS `:active` and a two-second transition do not enforce a hold or authorize a destructive action. Do not wire an ordinary short click straight to that action.

```css
.overlay {
  clip-path: inset(0 100% 0 0);
  transition: clip-path 200ms var(--ease-out); /* release: snappy */
}

.button:active .overlay {
  clip-path: inset(0 0 0 0);
  transition: clip-path 2s linear;             /* press: slow and deliberate */
}

.button:active {
  transform: scale(0.97);
}
```

`linear` is correct here — the fill is a progress indicator, and progress shouldn't ease.

The actual component must own the elapsed-time threshold, execute at most once after a valid confirmation, and abort on an early release, cancellation, lost capture, or disabled/unmounted state. Preserve an accessible keyboard path or an equivalent explicit confirmation that does not require a pointer hold. Verify short activation, successful confirmation, cancellation, and repeated activation against the real handler. Under reduced motion, replace the fill movement with useful non-motion progress/state feedback; do not change the confirmation requirement or use CSS transition completion as the action gate.

---

## Tab indicator with a color transition

Clipping is an optional visual treatment, not a reason to replace working color transitions or tab semantics.

Keep exactly one semantic, interactive tab list. If a clipped overlay is needed, render only decorative text/shapes with `aria-hidden="true"` and `inert`; do not clone buttons, links, roles, focus targets, or IDs. Position it over the existing control without intercepting input:

```html
<div class="tabs-active-copy" aria-hidden="true" inert>
  <span>Overview</span>
  <span>Activity</span>
</div>
```

```css
.tabs-active-copy {
  pointer-events: none;
  clip-path: inset(0 60% 0 20%); /* driven by the active tab's position */
  transition: clip-path 250ms var(--ease-in-out);
}

@media (prefers-reduced-motion: reduce) {
  .tabs-active-copy { transition: none; }
}
```

The overlay can reveal coordinated text/background styling, while selection, focus, keyboard navigation, labels, and panel relationships remain owned by the single real tab component. Verify its accessibility tree and tab order, not just the clipped appearance.

---

## Scroll reveal

Optional marketing decoration only. Keep meaningful text, links, and controls visible and actionable; use a transform-only treatment rather than clipping them away.

```css
.reveal {
  clip-path: none;
}

@media (prefers-reduced-motion: no-preference) {
  .reveal[data-visible] {
    animation: revealIn 600ms var(--ease-in-out) both;
  }

  @keyframes revealIn {
    from { transform: translateY(8px); }
    to { transform: none; }
  }
}
```

For a justified decorative reveal, add `data-visible` once after `IntersectionObserver` (or the installed library's equivalent) observes it. Without initialization or that flag, the surface stays visible; reduced motion skips the animation. Do not create an initially hidden state that waits for JavaScript, and do not re-trigger on every scroll-by. Verify both the unenhanced and reduced-motion paths.

---

## Drag to dismiss

Use the existing gesture component's direction, capture, cancellation, and settling behavior. The predicate below handles only a downward release decision; it is not a complete gesture controller. Distances are CSS pixels; timestamps come from the same monotonic clock in milliseconds. Capture fresh recent samples, including the release, rather than averaging velocity over the whole drag.

```js
function shouldDismissDown({
  startY, previousY, currentY, previousTimeMs, currentTimeMs,
  distanceThresholdPx, velocityThresholdPxPerMs
}) {
  const values = [
    startY, previousY, currentY, previousTimeMs, currentTimeMs,
    distanceThresholdPx, velocityThresholdPxPerMs
  ];
  if (!values.every(Number.isFinite) ||
      distanceThresholdPx <= 0 || velocityThresholdPxPerMs <= 0) return false;

  const distancePx = currentY - startY;
  const elapsedMs = currentTimeMs - previousTimeMs;
  if (elapsedMs < 0) return false;
  const velocityPxPerMs = elapsedMs > 0 ? (currentY - previousY) / elapsedMs : 0;
  return distancePx > 0 &&
    (distancePx >= distanceThresholdPx || velocityPxPerMs >= velocityThresholdPxPerMs);
}
```

```js
// Use the inspected component's existing transform path.
// Compare actual recordings before replacing a CSS-variable implementation:
// invalidation/compositing depend on inheritance, usage, registration, and browser.
element.style.transform = `translateY(${distance}px)`;
```

Choose distance/velocity thresholds from the existing component and test them on the target interaction; there is no universal flick threshold. A zero-duration sample contributes no velocity, but a valid distance decision still applies. Call the predicate only on an uncancelled release of the active pointer, never on `pointercancel` or lost capture. Preserve browser scrolling and pinch zoom through the gesture surface's `touch-action` rules and its ancestors; see [mobile web guidance](../ui-mobile-web/SKILL.md) when those platform behaviors are the reported problem.

Four details that separate a good drag from a bad one:

- **Pointer capture** once the drag starts, so it continues when the pointer leaves the element's bounds.
- **Multi-touch protection** — `if (isDragging) return` on new touch points, or switching fingers mid-drag makes the element jump.
- **Damping past boundaries** — dragging beyond a natural edge moves the element less the further it goes. Real things slow before they stop.
- **Friction, not a wall** — allow the over-drag with rising resistance rather than refusing it.

When the installed library supports it, settle from the current position and measured release velocity using its documented spring API. This configuration illustrates one library's shape; it does not, by itself, transfer gesture velocity:

```js
{ type: "spring", duration: 0.5, bounce: 0.2 }
```

---

## Optional crossfade blending

First diagnose unresolved overlap: state ownership, stacking, exit lifetime, opacity endpoints, interruption, and reduced-motion behavior. Do not use blur to conceal a broken transition. Only add a deliberate blend when the brief calls for that appearance and the actual surface/load supports its rendering cost:

```css
.content {
  transition:
    filter 200ms ease,
    opacity 200ms ease;
}

.content.transitioning {
  filter: blur(2px);
  opacity: 0.7;
}
```

Blur changes the blend's appearance; its radius is not a universal performance budget. Measure representative content and load on the target browser/device, including repeated activation and reduced motion. Prefer a working non-blurred transition if the effect adds no task value.

---

## Programmatic, without a library

WAAPI provides programmatic control without adding a library; rendering costs depend on the animated properties and browser.

```js
element.animate(
  [{ clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0 0)' }],
  { duration: 1000, fill: 'forwards', easing: 'cubic-bezier(0.77, 0, 0.175, 1)' }
);
```

Verify interruption and representative rendering load. WAAPI and clipping do not guarantee hardware acceleration or off-thread execution.
