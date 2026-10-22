# Component craft

Impeccable owns the broad UI workflow. Use this skill for focused component-level decisions: composition, readable type, clear states, and details that make an interaction understandable and dependable. The brief, incumbent components and tokens, accessibility, and authorized scope take precedence over aesthetic preference.

## Work

1. Inspect the target component and nearby usage. Reuse the project's existing primitives, tokens, and dependencies where they fit; do not add a package or redesign surrounding surfaces without a reason in the request.
2. Identify the component's purpose, content hierarchy, states, and input modes. Make essential content and action feedback clear before adding decoration.
3. Improve only the details that support those needs: alignment, spacing, type hierarchy, control affordance, state transitions, focus visibility, or useful edge-case handling.
4. Prefer direct, non-motion feedback when it communicates the state clearly. For requested motion work, read `skill://ui-web-motion/references/principles.md`; apply its guidance in the context of this product and the user's motion preferences.
5. Follow the requested output format. For applicable code recommendations or reviews, use a concise `Before | After | Why` table; do not force a table when the user requests another format or when the comparison does not apply.
6. Report what was actually inspected or changed. Do not claim visual, runtime, device, accessibility, or performance verification that did not occur.

For focused component examples and checks, load [component examples](component-craft/examples.md) as needed. This reference does not grant tool, write, dependency, or execution permission.
