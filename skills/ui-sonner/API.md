# Sonner API Reference — selected 2.0.8 contracts

This is a partial comparison reference for **Sonner 2.0.8**, checked against its [published declarations](https://unpkg.com/sonner@2.0.8/dist/index.d.ts) and [runtime](https://unpkg.com/sonner@2.0.8/dist/index.mjs). It is not an exhaustive API, a requirement to upgrade a project, or proof of another installed version's behavior. Use the target app's installed exported types and matching source when precision matters; official prose can lag the release.

Per-toast values can override supported toaster defaults, but `toastOptions` is its declared subset, not every `ExternalToast` field. Same-id updates also interact with method/type/default behavior; verify omitted options rather than assuming a universal unchanged-properties merge.

## `<Toaster />`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `theme` | `'light' \| 'dark' \| 'system'` | `'light'` | Choose OS tracking or the app's resolved theme deliberately. |
| `richColors` | `boolean` | `false` | Makes error and success states more colorful. |
| `expand` | `boolean` | `false` | Toasts expanded by default (otherwise they expand on hover). |
| `visibleToasts` | `number` | `3` | Amount of visible toasts. |
| `id` | `string` | – | Toaster id, targeted by `toast()`'s `toasterId` option. |
| `position` | `string` | `'bottom-right'` | `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`. |
| `closeButton` | `boolean` | `false` | Adds a close button to all toasts. |
| `offset` | `string \| number \| object` | `'32px'` | Offset from screen edges. Object form is per-side: `{ bottom: '24px', right: '16px' }`. |
| `mobileOffset` | `string \| number \| object` | `'16px'` | Offset when viewport width ≤ 600 CSS px (`max-width: 600px`). |
| `swipeDirections` | `('top' \| 'right' \| 'bottom' \| 'left')[]` | based on position | Permitted swipe-to-dismiss directions. |
| `dir` | `'rtl' \| 'ltr' \| 'auto'` | document-derived | Text directionality; inspect the actual document/wrapper. |
| `hotkey` | `string[]` | `['altKey', 'KeyT']` | Keyboard shortcut keys; distinguish intentional destination shortcuts. |
| `invert` | `boolean` | `false` | Dark toasts in light mode and vice versa. |
| `toastOptions` | declared `ToastOptions` subset | – | Supported class/style, duration, close-button, and targeting defaults; not every per-toast option. Inspect `ToasterProps['toastOptions']`. |
| `gap` | `number` | `14` | Gap between toasts when expanded. |
| `icons` | `object` | – | Replace default icons: `{ success, info, warning, error, loading }`; `null` removes one. |
| `duration` | `number` | fallback `4000` ms | Default timeout, with per-toast/loading and pause behavior. |
| `containerAriaLabel` | `string` | `'Notifications'` | Toaster notification-region label; not an `ExternalToast` option. |
| `customAriaLabel` | `string` | – | Overrides the compared runtime's generated section label. |

## `toast()` options

`toast(message, options)` accepts a React node or function returning a React node and returns `string | number`. Use the exported `ExternalToast` type for the actual accepted option set.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `description` | `ReactNode \| (() => ReactNode)` | – | Content beneath the title. |
| `closeButton` | `boolean` | `false` | Adds a close button. |
| `invert` | `boolean` | `false` | Dark toast in light mode and vice versa. |
| `duration` | `number` | `4000` | Milliseconds before auto-close. `Infinity` persists the toast. |
| `position` | `string` | `'bottom-right'` | Position of this toast. |
| `dismissible` | `boolean` | `true` | Controls manual dismissal; does not by itself stop the auto-close timer. |
| `icon` | `ReactNode` | – | Icon in front of the text; `null` removes the default. |
| `action` | `ReactNode \| { label, onClick }` | – | Built-in primary button; clicking closes unless `onClick` calls `event.preventDefault()`. Custom React nodes own their click behavior. |
| `cancel` | `ReactNode \| { label, onClick }` | – | Secondary button. In 2.0.8, `dismissible: false` suppresses its callback and dismissal; otherwise it closes even when the callback calls `event.preventDefault()`. Custom React nodes own their click behavior. |
| `actionButtonStyle` | `object` | `{}` | Styles for the action button. |
| `cancelButtonStyle` | `object` | `{}` | Styles for the cancel button. |
| `id` | `number \| string` | generated | Reuse for an owned update; verify method/default merge behavior. |
| `testId` | `string` | – | Rendered as `data-testid` for e2e tests. |
| `toasterId` | `string` | untargeted | Named destination id. In 2.0.8, named toasters filter matching records and unnamed toasters filter untargeted records. |
| `style` | `object` | – | Inline styles for the toast. |
| `classNames` | `ToastClassnames` | – | Supported per-part classes. Inspect the cascade; overrides do not universally require `!important`. |
| `unstyled` | `boolean` | `false` | Opt out of the default visual styling; retain responsibility for custom visuals/accessibility and inspect retained structural behavior. |
| `onDismiss` | `(toast) => void` | – | Fires when the close button is clicked or the toast is swiped away. |
| `onAutoClose` | `(toast) => void` | – | Fires when the toast closes automatically after `duration`. |

## Functions

| Function | Purpose |
| --- | --- |
| `toast(message, opts?)` | Render a toast; returns its id. |
| `toast.success / .error / .info / .warning(message, opts?)` | Typed toast with matching icon. |
| `toast.loading(message, opts?)` | Toast with a spinner; update it by id. |
| `toast.promise(promise, data)` | Loading/result/error flow; data callbacks can return supported content/options. The 2.0.8 declared return exposes an `unwrap()` handle; do not assume the return is the original promise or an ordinary id in every shape. |
| `toast.custom((id) => jsx, opts?)` | Callback receives `number \| string`, not a full toast object. Custom JSX must supply real semantic content/actions. |
| `toast.dismiss(id?)` | Dismiss one owned toast, or all active records when the no-id scope is intended. |
| `toast.getToasts()` | Active toast records outside React in 2.0.8. |
| `toast.getHistory()` | Stored history, not the active list. Do not assume all records correspond to visible DOM. |
| `useSonner()` | React hook returning `{ toasts }`. |

## Lifecycle and accessibility notes

- `onDismiss` and `onAutoClose` are path-specific UI callbacks, not a universal closed hook or transaction-completion signal.
- A persistent toast, a manually nondismissible toast, and a loading/promise toast are distinct states. Check their update, timeout, and removal paths separately.
- Multiple destination instances need deliberate targeting, lifetime, shortcuts, and announcement labels. Native modal/top-layer placement and inertness can matter more than z-index.
- Built-in notification behavior does not make arbitrary headless JSX accessible; check actual controls, labels, announcements, keyboard/focus, reduced motion, and content timing.
