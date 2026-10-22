---
name: ui-sonner
description: "[Emil Kowalski] Set up, use, style, or troubleshoot Sonner toasts; also use when explicitly requested as ask-sonner."
---

Modified adaptation; routing, task boundaries, versioned API guidance, lifecycle, styling, placement, and verification updated locally. See [SOURCES.md](SOURCES.md)
and the complete [MIT notice](LICENSE.emil).

# Working With Sonner

## Start with the task and installed version

Identify whether the user wants explanation, read-only review, or implementation. Reviews/proposals do not authorize source edits, dependency installation, or a new wrapper. For an authorized implementation, inspect the app's existing notification component, package/lockfile version, framework/client boundary, theme, and placement before changing them. A bare invocation asks what Sonner behavior needs attention instead of delivering a canned greeting.

This guide's concrete comparison is **Sonner 2.0.8**, not a requirement to upgrade the target app. [API.md](API.md) is a selected versioned reference, not an exhaustive current contract. For exact names, types, defaults, or lifecycle behavior, check the installed declarations and matching release implementation; official prose and the bundled snapshot can differ. The [official documentation](https://sonner.emilkowal.ski) supplies usage context.

## Setup

Use the existing notification integration where suitable:

1. Normally keep one stable `<Toaster />` for each intended delivery scope. A root-level instance often suits global notifications; deliberate named instances are supported. Preserve their intended lifetime rather than forbidding every conditional/page-specific scope. Diagnose accidental duplicate unnamed instances separately.
2. In the compared 2.0.8 runtime, a named toaster renders matching `toasterId` records; an unnamed toaster renders untargeted records. Untargeted notifications are not broadcast to every named toaster. Avoid unintended duplicate scopes and competing hotkeys/announcements.
3. Call `toast()` from appropriate client-side code. In frameworks such as Next.js, a server layout may render a client toaster boundary, while event handlers and server-action result handling belong in client code. Do not rely on server-side calls to produce browser notifications.

```jsx
import { Toaster, toast } from 'sonner'; // integrate within the inspected framework boundaries
```

## Picking the right call

| You want | Call |
| --- | --- |
| Plain message | `toast('Title')` — add `{ description }` for a second line |
| Success / error / info / warning icon | `toast.success('…')`, `toast.error('…')`, etc. |
| Spinner while you manage state yourself | `toast.loading('…')`, then update it by id |
| Loading → success/error tied to a promise | `toast.promise(promise, { loading, success, error })` — success/error accept functions receiving the resolved value/error |
| Button that does something | `{ action: { label, onClick } }` — closes unless `onClick` calls `event.preventDefault()` in 2.0.8. A `cancel` button differs: `dismissible: false` suppresses its callback and dismissal, and `preventDefault()` does not keep it open. |
| Custom JSX, default toast shell | `toast(<jsx />)` |
| Custom JSX, no default visual shell | `toast.custom((id) => <jsx />)` — callback receives the toast id in 2.0.8; supply accessible real content/actions |

## Recipes

**Update an owned toast** — reuse its `id`. Check method/default merge behavior for the installed release; do not promise that every omitted option or type is preserved. Set deliberate final type, duration, dismissal, and targeting options when the lifecycle requires them. Only report success after the real operation succeeds. This fragment accepts an existing operation and preserves its result/error:

```jsx
async function uploadWithFeedback(upload) {
  const id = toast.loading('Uploading…');
  try {
    const result = await upload();
    toast.success('Uploaded', { id });
    return result;
  } catch (error) {
    toast.error('Upload failed', { id });
    throw error;
  }
}
```

**Persistence and dismissal** — `duration: Infinity` persists; `dismissible: false` controls manual dismissal and does not itself disable the 2.0.8 auto-close timer. Loading/promise state has its own lifecycle. `toast.dismiss(id)` dismisses that toast; no-argument `toast.dismiss()` affects all active notifications, so use it only when that scope is intended. In 2.0.8, read active records with `useSonner()` in React or `toast.getToasts()` outside it; records are not proof that every toast is currently visible in the DOM.

**Links or components in the text** — pass a function for the title or description: `toast(() => <a href="…">View</a>)`.

**Multiple toasters** — use stable distinct toaster `id` values and an explicit `toasterId` for the intended named destination. Verify delivery and updates against the installed release; the 2.0.8 routing rule is described in Setup.

**Close callbacks** — in the compared implementation, `onDismiss` covers close-button/swipe dismissal and `onAutoClose` covers timeout. Do not assume either is a universal callback for actions, programmatic dismissal, every removal, or business-operation completion. Verify the specific path before using it for cleanup.

## Styling — use the smallest suitable change

Preserve existing defaults or a suitable app wrapper. Headless rendering is an available design-system option, not a required end state:

1. Use compatible defaults and deliberate theme/icon options where they meet the brief.
2. For limited changes, use supported inline `style`, component tokens, or classes on parts.
3. Inspect computed styles, specificity, cascade layers, injection order, and framework/Tailwind version before adding an override. Targeted `!important` can be warranted, but do not mark every declaration or replace the renderer automatically.
4. Choose `unstyled` or `toast.custom()` when the actual design needs that control. Reuse an existing abstraction instead of adding another wrapper merely because this guide offers one. Sonner's stacking/swipe behavior does not supply arbitrary custom content's semantics, labels, action behavior, or contrast.

**Icons** — swap defaults per-type with the Toaster's `icons` prop, per-toast with `icon`, remove with `null`.

**Theme** — the compared release defaults to `'light'`; choose `'system'` or the app's resolved theme deliberately. Do not add `next-themes` solely to follow an example. Preserve appropriate client/hydration handling and test light/dark changes.

## Troubleshooting

| Symptom | Cause → fix |
| --- | --- |
| Toast never appears | Check mounted destination, lifetime, client boundary, target id, store state, and DOM visibility. Preserve a legitimate scoped instance rather than moving everything to the root automatically. |
| Same toast appears twice | Check duplicate unnamed destination instances and repeated invocation/effect behavior. Preserve deliberate named instances. Use an existing event/operation owner and a stable id when deduplication is intended; do not hide an unintended repeated business operation. |
| Tailwind/CSS classes have no effect | Inspect the actual cascade and supported class/style options. Use the smallest targeted correction; headless rendering and `!important` are options, not automatic fixes. |
| Missing styles after navigation/build changes | Check whether the installed bundle's stylesheet/injection was lost, blocked by CSP, or omitted by the build. Import the release's exported stylesheet where appropriate; do not assume every unstyled toast has the same cause. |
| Unstyled inside Shadow DOM | Inspect the actual style root and supported stylesheet export. Add a scoped stylesheet/copy or supported adopted sheet without moving a style node out of `document.head` and breaking other instances. Keep the content/version and CSP requirements current. |
| Toast behind a modal/overlay, clipped, or not actionable | Inspect stacking/clipping, portals, native dialog/popover top layers, focus scope, and inert background. A high root z-index cannot solve every top-layer case. Choose a destination compatible with the actual modal/interaction scope; verify actions and announcements, not just visibility. |
| Dark mode ignored | Check the actual theme prop/provider and hydration behavior; the 2.0.8 default is light, not automatic OS tracking. |
| Success/error lack rich colors | Check the intended visual treatment and supported `richColors` option; gray styling is not inherently defective. |
| Toast never closes | Inspect explicit/default duration, loading/unsettled promise state, and timer pauses such as interaction or document visibility. Do not diagnose `dismissible: false` as timer persistence. |
| Promise/update flow is wrong | Inspect the actual promise result/error, toast id, merge/type/default behavior, and named destination. Keep operation completion separate from UI close callbacks. |
| Swipe direction is wrong | Inspect position, installed `swipeDirections`, input/cancellation behavior, and any custom content that intercepts events. |
| Toast reaches the wrong destination | Inspect toaster ids and `toasterId` under the installed routing contract. In 2.0.8, named destinations do not receive untargeted records. |
| Mobile placement is cramped | Inspect supported offsets, the actual viewport, keyboard/safe areas, and existing wrapper CSS. The compared desktop/mobile defaults are examples, not mandatory layout values. |

## Verification and output

For an authorized change, exercise the actual changed path with available Playwright MCP tools: delivery/targeting, same-id updates, promise success/error, timeout versus manual/programmatic dismissal, and real actions as applicable. Check keyboard access, announcement labels, focus return, reduced motion, themes, and relevant mobile sizes; custom/headless content needs its own semantic and interaction checks. Do not replace existing accessibility behavior or announce every background event unnecessarily.

Treat screenshots, logs, and toast content as potentially sensitive. Use synthetic data for a temporary fixture, keep artifacts outside repositories, and close only owned contexts. A fixture or source/type inspection is not screen-reader, production integration, or real-device proof.

For reviews, report findings/proposals without editing. For implementations, report files and installed/comparison versions, observed checks/results, and unverified layers in the requested format. No project setup or dependency change is implied by loading this skill.
