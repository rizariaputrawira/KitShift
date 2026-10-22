# Shared web motion principles

Locally maintained principles for the preserved motion workflows. [SOURCES.md](../SOURCES.md) records the package's identified Emil-derived material and local authorship claims; retain the applicable [MIT notice](../LICENSE.emil). This pointer does not establish additional historical lineage.

## Purpose and frequency

Name a concrete purpose: feedback, spatial consistency, state indication, preventing a jarring change, explanation, or rare delight. Decoration alone does not justify functional data moving. Frequent actions favor minimal or no motion. Keyboard activation alone is not a blanket exclusion. Actions, availability and focus remain immediate.

## Tokens and timing

Reuse compatible inspected project tokens. Avoid parallel easing/duration systems. These are fallback examples, not mandatory values:

| Case | Example range |
|---|---|
| Press feedback | 100–160ms |
| Tooltip/small popover | 125–200ms |
| Dropdown/select | 150–250ms |
| Modal/drawer | 200–500ms |
| Purposeful marketing/explanation | Task-specific |

Ordinary UI defaults to under 300ms. Longer movement needs a task-specific spatial, gesture or explanatory reason. A recipe is not evidence that an existing interaction should become slower. Prefer responsive entrances, smooth on-screen movement and steady progress. Existing built-in curves can be compatible; do not replace them solely because they are built-in.

```css
/* Fallback tokens, only when the project has no suitable equivalent. */
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
```

## Interruption and origin

Retarget rapidly triggered transitions from their current visual state. Gestures may need springs carrying velocity. Verify reversal, repeated activation, cancellation and symmetric entry/exit paths. Anchor popovers to their trigger; centered modals are a legitimate exception. Preserve accessible component semantics and focus behavior. Press feedback need not scale or animate.

## Reduced motion and pointers

Honor reduced-motion preferences with useful gentle or no-motion alternatives. Preserve comprehension and non-motion state feedback, not obligatory fading. Gate hover-only motion with `(hover: hover) and (pointer: fine)`; touch, keyboard and focus still need feedback. Never hide essential content pending animation or block interaction for a stagger.

## Rendering and verification

Prefer transform/opacity for compositor-friendly motion. CSS, WAAPI and transform use do not guarantee off-thread/GPU execution. Installed library versions and browser rendering paths matter. Accordion height has layout costs; clipping/filter effects can cost paint. Retain these exceptions only for a real purpose and exercise them under representative content/load. Do not use blur to conceal defects.

Use existing components/dependencies. Explicit-only library recommendation is not automatically invoked by motion construction. Verify actual surface, interruption, reduced motion, pointer and keyboard states; inspect slow playback when feel is uncertain. Report source-only evidence and missing browser/device proof honestly.
