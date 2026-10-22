# Component craft

Use these prompts and examples selectively. They are decision aids, not required visual treatments. The product brief, established component system, accessibility requirements, and requested scope take priority. Prefer existing tokens and behavior; add a detail only when it improves comprehension, usability, or consistency.

## Shape and states

- Start from the component's job and surrounding context. Keep its primary action visually identifiable without making every control prominent.
- Make state changes legible: distinguish default, hover where applicable, keyboard focus, pressed, disabled, loading, success, and error states according to the actual component. Do not invent states or add controls the product does not need.
- Keep labels and essential feedback understandable without color alone. Preserve visible focus and usable target behavior for keyboard, touch, and pointer input as applicable.
- For overlays and anchored menus, preserve the relationship between trigger and content, sensible focus return, dismissal behavior, and viewport fit. Follow the project's chosen component primitive rather than layering a competing implementation on top.
- Prefer a clear state label, icon already in the product's system, or non-motion visual change when that communicates feedback more reliably than animation. Motion is optional, not a definition of polish.

## Small component examples

These are illustrative patterns, not prescriptions. Adapt names and tokens to the actual project.

A control should expose the intended focus state rather than hide the browser outline without replacement:

```css
.action:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}
```

A busy action can preserve its identity while reporting the temporary state:

```jsx
<button type="submit" disabled={submitting}>
  {submitting ? "Saving…" : "Save changes"}
</button>
```

Use the product's real copy and state model; do not use these words when they misstate the operation. Ensure disabled/loading status is exposed through the actual semantics and behavior, not appearance alone.

For a compact menu trigger, the accessible name and expanded state should correspond to the real controlled content; use the project's established menu primitive for focus movement and dismissal rather than inventing a partial interaction.

## Typography and hierarchy

- Treat type as information structure: distinguish page/section title, supporting explanation, metadata, and control labels by their role and context.
- Preserve the incumbent type family and scale unless the request authorizes a system change. Prefer a small number of meaningful hierarchy levels over arbitrary per-component values.
- Keep text comfortable to read at narrow widths and larger text settings. Avoid truncating content that is necessary to understand or complete the task.
- Align numbers, labels, and repeated values when scanning comparison or status is part of the task. Use tabular numerals only when that improves comparison and the existing type system supports it.
- Avoid decorative capitalization, tracking, or contrast reductions that weaken clarity or conflict with product conventions.

## Spacing, alignment, and density

- Reuse spacing tokens. Tune relationships between grouped label, value, help, and action rather than applying uniform padding by habit.
- Make repeated rows and controls align consistently; intentional asymmetry is appropriate only when it clarifies priority or fits the established design.
- Preserve enough room for localization, variable content, and zoom. Check the narrowest relevant layout and long labels before relying on fixed widths.
- Density follows the component's real use: operational tools may need compact scanning, while explanatory content needs room to be read. Neither is a universal style.

## Finish and feedback

- Make boundaries, separators, shadows, and surface changes earn their contrast. Do not add blur, glow, gradients, shadows, decorative icons, or press scaling by default.
- Match feedback to the action: confirmation for a completed change, clear error recovery for a failed one, and immediate acknowledgment for a pending action. Keep the user's input and focus intact where appropriate.
- Check empty, loading, error, long-content, and keyboard-focus conditions when those states exist in scope. A static proposal should name unverified conditions rather than imply they were exercised.
- Motion-specific recommendations belong to [shared motion principles](skill://ui-web-motion/references/principles.md), loaded only when motion is part of the task. Project tokens, reduced-motion preferences, and direct feedback remain relevant.

## Review output

When a Before/After comparison is useful and the user has not requested another format, use:

| Before | After | Why |
| --- | --- | --- |
| Observed implementation | Proposed or applied change | Specific usability, clarity, consistency, or accessibility reason |

Anchor findings to inspected source or visible evidence. Distinguish an example/proposal from a change that was actually made; omit unverifiable outcome claims.
