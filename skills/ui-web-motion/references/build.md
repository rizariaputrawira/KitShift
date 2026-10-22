# Web motion construction

Independently authored replacement procedure. Read [principles](principles.md); consult the relevant [visual recipe](../RECIPES.md) only when constructing that effect. Identified recipe provenance and local modifications are recorded in [SOURCES.md](../SOURCES.md), with the applicable [MIT notice](../LICENSE.emil).

## Construction sequence

1. Inspect the requested surface, actual stack, accessible component behavior, project tokens and user constraints. Estimate how often this interaction occurs. Favor minimal/no motion for frequent actions; keyboard activation is not itself a ban. If motion is unsuitable, explain why and propose immediate state or non-motion feedback.
2. State its purpose: feedback, spatial relationship, state comprehension, explanation, preventing abrupt change, or rare delight. Avoid moving data people are reading for decoration.
3. Choose the smallest existing implementation mechanism: CSS transitions for state changes, supported `@starting-style` for entry, CSS keyframes for independent sequences, WAAPI for programmatic control, or an installed motion library when gestures/layout/exits warrant it. Preserve component semantics, keyboard and focus behavior. Do not invoke explicit-only library selection or install dependencies automatically.
4. Prefer transform/opacity. Anchor popover origins to their trigger; centered modals are different. Relative translations can follow element size. For accordion height, clipping or filters, state the rendering cost and verify actual content/load. CSS/WAAPI and transforms do not universally guarantee GPU/off-thread execution; library versions affect shorthand paths.
5. Reuse suitable project curves, durations and springs. Consult principles for fallback ranges, not mandatory values. Ordinary UI usually stays under 300ms; justify any longer drawer or explanatory movement from the actual task. Avoid delayed entrances that make actions feel unresponsive. Springs may help gestures retain velocity.
6. Handle reversal, repeated activation, cancellation and exit. Retarget from current state rather than restarting at an old endpoint. Keep entry/exit paths coherent. Distinguish deliberate hold progress from the immediate system response. Gestures need pointer capture, extra-pointer handling, boundary resistance and safe distance/velocity decisions.
7. Provide useful reduced/no-motion behavior and gate hover-only effects to appropriate pointers. Keep state, focus and controls immediate. Do not hide content or block interaction for entrance sequences.

## Completion checklist

- Each changed transition has an actual purpose and respects frequency and scope.
- Existing tokens/components/dependencies are reused; exact transition properties are named.
- Relevant origin, repeated activation, interruption and exit states work.
- Reduced-motion, keyboard, focus and touch/pointer alternatives are usable.
- Layout/paint exceptions and rendering claims were checked, not assumed.
- Exercise the changed UI at relevant narrow/wide sizes and representative content; inspect slow playback when uncertain. Use a real device where gesture feel depends on it.

Implement only the currently authorized build scope. Report the gate decision, chosen mechanism/tokens, observed checks and remaining visual/device limits, respecting the requested output format. Source inspection is not runtime or feel proof.
