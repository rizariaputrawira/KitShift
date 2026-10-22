# The Picker

Use this reference only for an authorized prototype harness under [ui-prototyping](SKILL.md). Equivalent project-native components, markup, classes, and styling are valid; the behavior contract, not this sample's appearance, governs the result.

## Behavior contract

- Every requested variant is reachable by an actual control, with exactly one accessible selected state synchronized to the displayed content.
- Switching to another variant renders it synchronously. Selecting the current variant is a no-op: it does not reset inputs, restart motion, or remount the content.
- If URL selection is used, accept a one-based integer within the actual variant range. Missing, malformed, and out-of-range values initialize the first variant; preserve unrelated query/hash state and synchronize the selected value.
- Show replay only for the current variant when it implements a real replay action. Replay does not change selection or implicitly remount; its implementation owns any necessary reset and respects reduced motion.
- Scope optional character/arrow shortcuts to the picker while it has focus. Ignore editable, modified, composing, or already-handled events. Prevent the default only for a shortcut actually handled; ordinary Enter/Space keep native button behavior.
- Use explicit button types, visible focus, and project-appropriate selected semantics. A group of pressed-state buttons is one option; do not claim full tabs behavior unless implementing that pattern.
- Keep the picker and content reachable at relevant narrow/wide sizes without clipping or occluding important controls. Normal-flow placement is valid; a floating pill, blur, maximum z-index, sliding highlight, or fixed classes are not required.
- On variant change or host teardown, release subscriptions/timers owned by that mounted variant. Do not treat remounting every selection as a universal entrance/replay mechanism.

## Optional standalone example

This example uses normal-flow controls and URL state. In a framework, use idiomatic state, rendering, and effect cleanup instead of copying this DOM wiring. Preserve the contract without requiring this element structure.

### Markup

```html
<div class="proto-picker" role="group" aria-label="Prototype variants">
  <button type="button" class="proto-picker-replay" hidden>Replay animation</button>
</div>
<section id="stage" aria-label="Selected prototype"></section>
```

The script creates one labeled button per variant, not a fixed set of three. The example uses `textContent`/DOM mounting; do not interpolate untrusted content into HTML strings.

### Optional styles

Replace these illustrative values with actual project tokens. This is not a mandatory light theme, spacing scale, or button design.

```css
.proto-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  max-width: 100%;
  margin-block: 1rem;
}
.proto-picker button {
  max-width: 100%;
  overflow-wrap: anywhere;
  padding: 0.65rem 0.9rem;
  border: 1px solid currentColor;
  border-radius: 0.5rem;
  font: inherit;
  color: inherit;
  background: transparent;
  cursor: pointer;
}
.proto-picker button[aria-pressed="true"] {
  border-width: 2px;
  font-weight: 700;
}
.proto-picker button:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 3px;
}
.proto-picker button[hidden] { display: none; }
```

### Reference wiring

Supply a nonempty `variants` array in requested order. Each entry has `label` and `mount(stage)`; mounting creates that variant's actual DOM and may return a cleanup function. An optional `replay(stage)` implements that variant's real motion replay and respects its reduced-motion behavior. Static variants omit it. The host calls `destroyPicker()` on teardown; a framework uses its equivalent lifecycle.

Number shortcuts select the first nine variants; arrows/buttons reach the entire requested set. They work only while focus is within this picker, not across the page.

```js
const stage = document.getElementById('stage');
const picker = document.querySelector('.proto-picker');
const replay = picker.querySelector('.proto-picker-replay');
const events = new AbortController();
const items = variants.map((variant, i) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = variant.label;
  button.setAttribute('aria-pressed', 'false');
  button.addEventListener('click', () => setActive(i), { signal: events.signal });
  picker.insertBefore(button, replay);
  return button;
});
let current = -1;
let unmount;

function setActive(i) {
  if (!Number.isInteger(i) || i < 0 || i >= variants.length || i === current) return;
  unmount?.();
  unmount = undefined;
  stage.replaceChildren();
  current = i;
  unmount = variants[i].mount(stage);
  items.forEach((button, j) => button.setAttribute('aria-pressed', String(j === i)));
  const canReplay = typeof variants[i].replay === 'function';
  if (!canReplay && document.activeElement === replay) items[i].focus();
  replay.hidden = !canReplay;
  const url = new URL(location.href);
  url.searchParams.set('v', String(i + 1));
  history.replaceState(history.state, '', url);
}

function replayActive() {
  if (current >= 0 && !replay.hidden && typeof variants[current].replay === 'function') {
    variants[current].replay(stage);
  }
}
replay.addEventListener('click', replayActive, { signal: events.signal });
picker.addEventListener('keydown', (e) => {
  if (e.defaultPrevented || e.isComposing || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
  if (e.composedPath().some(node => node instanceof HTMLElement &&
      (node.isContentEditable || node.matches('input, textarea, select, [role="textbox"]')))) return;
  let next;
  if (/^[1-9]$/.test(e.key) && Number(e.key) <= variants.length) next = Number(e.key) - 1;
  else if (e.key === 'ArrowRight') next = (current + 1) % variants.length;
  else if (e.key === 'ArrowLeft') next = (current - 1 + variants.length) % variants.length;
  else if ((e.key === 'r' || e.key === 'R') && !replay.hidden) {
    e.preventDefault();
    replayActive();
    return;
  } else return;
  e.preventDefault();
  setActive(next);
  items[next].focus();
}, { signal: events.signal });

const value = new URL(location.href).searchParams.get('v');
const requested = value !== null && /^[1-9]\d*$/.test(value) ? Number(value) - 1 : -1;
setActive(Number.isSafeInteger(requested) && requested >= 0 && requested < variants.length ? requested : 0);

function destroyPicker() {
  events.abort();
  unmount?.();
  unmount = undefined;
  stage.replaceChildren();
  items.forEach(button => button.remove());
  replay.hidden = true;
}
```

## Verification

Exercise the actual implementation, not just this source: valid/invalid URL load and reload, click/keyboard switching, same-selection input preservation, accessible selected state, replay present/absent, modified/editable/composing/handled key events, unrelated URL state, and variant/host cleanup. Check relevant narrow/wide placement and focus visibility.

If variants animate, check their real replay and reduced-motion behavior. A working picker does not prove the variants' actions, accessibility conformance, real-device behavior, or production integration. Report those proof layers separately under the parent workflow.
