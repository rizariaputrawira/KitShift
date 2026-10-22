---
name: ui-mobile-web
description: "[Emil Kowalski] Fix mobile web/PWA browser behavior such as touch, viewport, scroll, safe-area, and installed-app feel; also use when explicitly requested as mobile-native."
---

Modified adaptation; routing, task boundaries, accessibility, platform guidance, and verification updated locally. See [SOURCES.md](SOURCES.md)
and the complete [MIT notice](LICENSE.emil).

# Feeling Native On Mobile

## Start with the task

Identify the reported symptom, affected browser/platform, and whether the user requested review or implementation. For a review, report findings and proposed changes without editing files. For an authorized fix, inspect the existing implementation, apply the matching remedy only where its reason applies, and verify the changed path. If no concrete task is supplied, ask what mobile behavior needs attention rather than delivering a canned introduction.

A fix-it skill. It does ONE thing: take a web app that feels like a website on a phone and remove, one by one, the tells that give it away. It does not design motion (that's `ui-web-motion` build), review motion (that's explicit `ui-web-motion` diff review), or build for React Native (that's `ui-expo-motion`). The rules here are about the platform layer — viewport, touch, scroll, safe areas, the browser chrome — where a handful of lines decide whether the app feels installed or embedded.

## Operating Posture

Treat viewport, touch, scroll, safe areas, and browser chrome as platform behavior to investigate, not evidence that the app needs new animation. Inspect the reported behavior before choosing a remedy; desktop device emulation is useful evidence but not a physical phone.

The user's phone is the source of truth. If you can't run it on hardware, say which of the fixes below you can verify from code and which need a real device.

Two failure modes, and the first is worse:

1. **Treating desktop evidence as device proof.** Emulation can check layout, styles, and reproducible interactions, but does not establish real-device touch, browser-chrome, or software-keyboard behavior.
2. **Reaching for JavaScript when CSS or a meta tag does it.** Almost every item here is one declaration. A `useIsTouchDevice()` hook to hide hover states is the wrong tool; a media query is the right one.

## Hard Rules

1. **Every fix ships with the reason.** Each rule below has a *why*. Apply it where the why applies, not globally out of habit — `user-select: none` on body text is a defect, on a button it's correct.
2. **Media queries over device sniffing.** `(hover: hover)`, `(pointer: fine)`, `env()`, `dvh` — the platform tells you what it can do. Never branch on user agent strings or screen width to guess at touch.
3. **Touch and mouse are not exclusive.** iPads with trackpads, laptops with touchscreens, phones with a mouse. Write for both at once; gate by capability, not by device.
4. **Preserve browser zoom.** Do not add `user-scalable=no`, `maximum-scale=1`, or gesture rules that suppress pinch zoom. For input-focus zoom, inspect the computed input font size before changing it.
5. **Match verification to the claim.** Use available Playwright MCP tools for reproducible browser checks. For device-specific claims, test on the affected hardware when available; otherwise report exactly what remains unverified. Code changes can be complete without claiming that unobserved hardware behavior is fixed.

## The Symptom Table

Start here. Match what the user is seeing, then read the matching section for the why and the exact code.

| Problem | Solution |
| --- | --- |
| Hover state stuck after tap | Wrap in `@media (hover: hover) and (pointer: fine)` |
| Gray/blue flash on tap | Replace it only on controls with verified custom press feedback |
| Layout has wrong height | `100dvh` (app) or `100svh` (hero) |
| Page zooms into input | Input font size 16px at the minimum |
| Tap feels laggy | Feedback on pointer-down + `touch-action: manipulation` |
| Pull-to-refresh hijacks an app shell | Scope `overscroll-behavior` to the affected scrolling boundary |
| Content stops at the notch | `viewport-fit=cover` + `env(safe-area-inset-*)` |
| Long-press selects button text | Add `user-select: none` |
| JS carousel competes with page scroll | `touch-action: pan-y pinch-zoom` on its gesture surface |
| Status bar color doesn't match | `theme-color` per color scheme |
| Right in Chrome, wrong on phone | Test on real hardware |

## The Fixes

### 1. Hover state stuck after tap

Touch has no hover, so browsers fake one: the first tap on an element applies `:hover` and leaves it there until the user taps somewhere else. A button that scales up on hover stays scaled up after being tapped. Gate every hover style behind a capability query.

```css
@media (hover: hover) and (pointer: fine) {
  .button:hover {
    background: var(--gray-3);
    transform: scale(1.02);
  }
}
```

`(hover: hover)` describes the primary input's ability to hover; `(pointer: fine)` describes its precision, not a mouse-only device identity. A stylus may also be fine, and hybrid devices can have multiple input types. Check the project's Tailwind version and generated CSS rather than assuming that a `hover:` variant includes the required capability query.

Touch users still need press feedback. Give it to them through `:active` (see §5), which works on every input type.

### 2. Gray/blue flash on tap

Mobile browsers can paint a tap highlight on interactive elements. Keep that feedback unless it conflicts with the component's intended press feedback.

```css
.button-with-press-feedback {
  -webkit-tap-highlight-color: transparent;
}
```

Apply this only after verifying the control's replacement press feedback and visible keyboard focus. Do not remove tap feedback globally as a prerequisite for a mobile-facing app.

### 3. Layout has the wrong height

`100vh` on mobile is the *largest* viewport — the height with the browser chrome collapsed. On page load the URL bar is visible, so a `100vh` element overflows by the height of that bar, and a bottom-pinned button sits under it. Use the dynamic and small units instead:

```css
/* App shell, drawers, anything that should track the visible area as chrome shows/hides */
.app { height: 100dvh; }

/* Heroes and first screens — the smallest the viewport gets, so nothing is ever cut off */
.hero { min-height: 100svh; }
```

`dvh` resizes as the URL bar collapses, which is right for an app shell but causes layout shifts on marketing content mid-scroll. `svh` is stable and never overflows, which is right for a hero. `lvh` is the old `vh` — you almost never want it. Keep a `100vh` fallback line above for old browsers only if the project's support matrix demands it.

### 4. Page zooms into the input

iOS Safari zooms the page when focus lands on an input whose font size is under 16px, and it does not zoom back out on blur. The user is left looking at a cropped, drifted layout. This is the reason people reach for `maximum-scale=1`, which is the wrong fix (Hard Rule 4).

```css
input, textarea, select {
  font-size: 16px; /* the minimum; 1rem at the default root size */
}
```

If the design calls for smaller text with precise pointers, an optional coarse-input enhancement should account for any coarse pointer, not just the primary one:

```css
@media (any-pointer: coarse) {
  input, textarea, select { font-size: 16px; }
}
```

`pointer` describes only the primary input, so a primary mouse/trackpad must not suppress the rule when touch is also available. [`any-pointer`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/any-pointer) covers that hybrid case; it does not detect input-focus zoom or replace checking the affected control's computed font size on the target browser. Preserve larger existing text.

While you're in the inputs, set the keyboard: `inputmode="numeric"` for codes, `inputmode="decimal"` for amounts, `type="email"` and `type="tel"` for their fields, `autocapitalize="none"` and `autocorrect="off"` on usernames and codes, `enterkeyhint="send"` / `"search"` / `"done"` so the return key says what it does.

### 5. Tap feels laggy

Two separate causes stack here.

**The 300ms click delay.** Browsers wait after a tap to see whether a second tap is coming, because double-tap zooms. Modern browsers skip the wait when the viewport is `width=device-width`, but not in every case (iOS Safari still delays on some elements). `touch-action: manipulation` tells the browser this element never double-tap-zooms, so it fires `click` immediately:

```css
button, a, [role="button"], .tappable {
  touch-action: manipulation;
}
```

**Feedback on release instead of press.** Use `:active` for immediate press feedback. If JavaScript is necessary for that feedback or gesture setup, `pointerdown` can start it, but keep activation on the control's semantic `click` path. Prefer native buttons and links; preserve keyboard activation, and clear transient press state on release or `pointercancel`. A press that becomes a scroll or is cancelled must not activate the action.

```css
.button {
  transition: transform 100ms var(--ease-out), background 100ms;
}
.button:active {
  transform: scale(0.97);
  background: var(--gray-4);
}
```

Keep press feedback at 100–160ms and `ease-out`. If the codebase uses the `ui-web-motion` skill's tokens, use them; don't fork a new curve.

### 6. Pull-to-refresh hijacks scroll

If root overscroll demonstrably interferes with an app shell, drawer, or canvas, consider suppressing it at the affected boundary. Keep normal document scrolling and pull-to-refresh where they are useful. The root rule below is an app-shell option, not a default:

```css
html, body {
  overscroll-behavior: none;
}
```

For an inner scrollable where scroll chaining is the reported problem, contain overscroll at that container instead of automatically changing the root:

```css
.sheet-content {
  overflow-y: auto;
  overscroll-behavior: contain;
}
```

`contain` prevents scroll chaining while allowing local overscroll effects where supported; `none` also suppresses those effects. Choose the narrowest boundary that fixes the symptom and verify browser support. Do not use broad `touchmove` cancellation to suppress overscroll; it can block intended scrolling.

### 7. Content stops at the notch

By default the browser letterboxes your page inside the safe area, leaving the notch, Dynamic Island, and home-indicator zones the body's background color. A native app paints edge to edge and pads its *content* away from those zones. Two steps:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
```

```css
.app-header {
  padding-top: env(safe-area-inset-top);
}
.bottom-bar {
  padding-bottom: env(safe-area-inset-bottom);
}
.sheet {
  padding-bottom: calc(1rem + env(safe-area-inset-bottom));
}
```

`viewport-fit=cover` lets the page under the notch; `env(safe-area-inset-*)` gives you the insets to pad back out. Without the meta tag the `env()` values are all `0px`. Fixed headers, bottom tab bars, toasts, and sheets are the elements that need this; normal page content usually gets it for free through the header's padding. Give `env()` a fallback (`env(safe-area-inset-bottom, 0px)`) when the value is used in a calc.

### 8. Long-press selects button text

Where long-press selection interferes with a control's operation, disable selection on that control only. Preserve selection and native link callouts for content, addresses, error messages, and ordinary navigation links.

```css
button, [role="button"], .tab, .chip, .drag-handle {
  user-select: none;
  -webkit-user-select: none;   /* Safari still needs the prefix */
  -webkit-touch-callout: none; /* only where a control's callout demonstrably interferes */
}
```

Never put `user-select: none` on `body`. Users copy addresses, error messages, and order numbers; that is content.

### 9. Carousel scrolls vertically

A horizontal swipe on a carousel is ambiguous to the browser — it doesn't know whether you're scrolling the page or the track, so it guesses, and the guess is often the page jittering up while the carousel moves. Tell it which axes the element owns:

```css
.carousel {
  touch-action: pan-y pinch-zoom; /* JS handles horizontal dragging; browser keeps vertical pan and pinch zoom */
}
.vertical-sheet-handle {
  touch-action: pan-x pinch-zoom; /* JS handles vertical dragging; browser keeps horizontal pan and pinch zoom */
}
```

The values name what the browser may still do. Keep `pinch-zoom` alongside the permitted pan axis; `pan-x` or `pan-y` alone does not preserve pinch zoom. Do not use `touch-action: none` as a generic sheet or slider fix. Ancestor rules also constrain the effective gestures, so inspect the gesture surface and its ancestors. Handle `pointercancel` when the browser takes over a gesture. See [MDN's touch-action reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/touch-action).

If the carousel is native scroll rather than a JS gesture, prefer `scroll-snap-type: x mandatory` on the track and `scroll-snap-align: start` on slides — the browser's own physics beat a hand-rolled spring, and `touch-action` becomes unnecessary.

### 10. Status bar color doesn't match

Where supported, `theme-color` can influence browser chrome; installed-app status bars have additional platform-specific behavior. If the product supports light and dark themes with different chrome colors, use the actual surface colors for each. These values illustrate the metadata shape, not a required palette:

```html
<meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0a0a0a" />
<meta name="color-scheme" content="light dark" />
```

Match the product's intended chrome surface. In Next.js use the supported `viewport` export for the installed version (`themeColor: [{ media, color }]`). If the app switches theme with a class rather than the OS setting, keep the active tag in sync with that choice. For installed PWAs, inspect manifest colors and Apple status-bar metadata separately; they affect different surfaces and are not interchangeable. Verify the relevant browser and standalone modes.

### 11. Right in Chrome, wrong on phone

Use desktop browser checks to verify layout, computed styles, DOM behavior, and reproducible interactions. They do not prove the affected phone's tap handling, browser-chrome resizing, input zoom, overscroll, safe areas, or software-keyboard behavior.

- Use available Playwright MCP tools for browser checks within the authorized task. Inspect current tool schemas and fresh snapshots; record the browser, viewport, actions, and observed result. Do not label a resized desktop viewport as real-device verification.
- For physical-device checks, prefer an existing authorized USB or local forwarding route. Expose the dev server to the LAN only when the test requires it, on the intended trusted network and port, and without exposing sensitive development endpoints. Restore the prior bind/access configuration afterward rather than leaving an unconditional `0.0.0.0` listener.
- iOS: Safari → Develop → the device. Android: `chrome://inspect`.
- Test on a phone that's a few years old, not the newest one on your desk. Test with the keyboard open. Test in landscape once.
- Test as an installed PWA if that's a target; standalone mode changes viewport, safe areas, and status bar behavior.

The Xcode Simulator provides additional platform coverage but not physical touch feel. If hardware is unavailable, finish reachable code/browser checks and name the remaining device-specific checks without claiming they passed.

## Baseline inspection, not a global reset

Inspect the app's existing viewport metadata, document/app-shell scrolling, control feedback, input sizes, and theme handling before changing them. Preserve established behavior unless the reported symptom justifies a change. Do not inject a second viewport tag or a generic set of global CSS rules.

- Keep browser zoom available. Use `width=device-width` for a responsive viewport; add `viewport-fit=cover` only when edge-to-edge rendering is intended, with safe-area padding on affected content.
- For input-focus zoom, verify the affected control's computed font size on the target browser. Do not shrink larger existing text to a blanket 16px reset.
- Remove tap highlights or text selection only on controls that need it, with replacement feedback and keyboard focus intact. Keep content and ordinary links selectable.
- Change root overscroll only for a demonstrated app-shell requirement; otherwise preserve document scrolling and useful pull-to-refresh.
- Choose `dvh` or `svh` for the actual layout requirement; do not assume either makes fixed controls avoid the software keyboard.
- Treat theme colors and installed-PWA metadata as product/platform decisions, not a mandatory light/dark palette.

### Software keyboard and viewport sizing

The layout viewport and visual viewport are distinct. `interactive-widget=resizes-content`, where supported, requests resizing of both when an interactive widget such as the software keyboard opens. `resizes-visual` requests resizing only the visual viewport; `overlays-content` requests neither. Choose deliberately rather than adding `resizes-content` to every app.

Chrome's documented change in version 108 made Android's default resize only the visual viewport, aligning it with the Safari behavior described there; `resizes-content` opts back into layout resizing, not into Safari equivalence. Browser/version support and installed-app modes need checking. Neither this metadata nor `100dvh` alone guarantees keyboard avoidance on every target. Test focus, visibility of the active field/action, scrolling, and dismissal on the affected device when available.

References: [MDN viewport metadata](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport) and [Chrome's viewport/keyboard behavior](https://developer.chrome.com/blog/viewport-resize-behavior/).

## Never Ship

Self-check before you finish.

| Never | Instead |
| --- | --- |
| `user-scalable=no` or `maximum-scale=1` | 16px inputs — fix the cause |
| Ungated `:hover` | `@media (hover: hover) and (pointer: fine)` |
| `100vh` for an app shell or bottom-pinned UI | `100dvh` |
| `100dvh` on a marketing hero | `100svh` (no layout shift on scroll) |
| Delaying press feedback until `click` | `:active` or transient `pointerdown` feedback; keep semantic activation and cancellation intact |
| `touchmove` + `preventDefault()` to stop overscroll | `overscroll-behavior` |
| `user-select: none` on `body` | Only on controls |
| Gesture rules that block intended scrolling or pinch zoom | Scope the handled axis; preserve `pinch-zoom` and inspect ancestor rules |
| `env(safe-area-inset-*)` without `viewport-fit=cover` | Add the meta tag or the value is `0` |
| Chrome colors that conflict with the active supported theme | Match existing product surfaces; vary metadata only when the theme requires it |
| User-agent sniffing to detect touch | `(hover)` / `(pointer)` media queries |
| Claiming desktop emulation proves a device-specific fix | Report browser evidence separately from observed or pending hardware checks |

## Output

For a review, report the symptom, supported findings, proposed changes, and verification gaps; do not apply fixes. For an authorized implementation, report briefly:

- **What was wrong** — the observed symptom and supported cause.
- **What changed** — affected files and declarations, with their reason.
- **What was verified** — browser/tool or device, actions, and observed results.
- **What needs a phone** — specific checks still awaiting the affected hardware.

Match the requested output format. Do not present a proposed fix, source inspection, or desktop emulation result as an observed device fix.

## Tone

Opinionated and brief. Most of these are one line; say the line and the reason and move on. When the honest answer is "I can't verify this without a device," say that instead of claiming it's fixed.
