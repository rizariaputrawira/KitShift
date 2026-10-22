---
name: ui-prototyping
description: "[Matt Pocock+Emil Kowalski] Explicitly explore divergent UI variants and implement an isolated picker when authorized."
disable-model-invocation: true
---

# UI Variations
This is the explicitly invoked UI branch of `code-prototyping`. It explores the UI comparison the user requests: layout, interaction, motion, palette or copy. State meaningful distinctions and tradeoffs, grounded in the brief. For logic/state questions use `skill://code-prototyping/LOGIC.md`; do not duplicate that procedure here.

## Principles

1. **Plan-only means no writes or execution.** Return scoped variant and picker proposals only.
2. **Isolate exploration.** Production integration requires user selection and explicit implementation scope. A route guard or picker is not security isolation.
3. **Use project conventions.** Do not force generic chrome or motion merely to make variants differ.
4. **Accessible picker behavior.** Use [PICKER.md](PICKER.md) as the behavior reference; adapt its appearance to project tokens, retain keyboard operation, semantics, visible focus, accurate selection and URL-state behavior where applicable, and avoid obscuring content on narrow screens.
5. **Cleanup follows authorization.** Do not delete or promote prototype work beyond authorized scope.

## Workflow

1. **Scope:** identify all requested pieces and behaviors. Planning stops at a proposal; never silently omit part of the request.
2. **Recon:** inspect the current host page/flow, surrounding context, data, stack, tokens and responsive constraints. Prefer variants in an existing host so its real density and context remain visible. Use a clearly named throwaway route only if no sensible host exists, following existing routing conventions. Empty workspace grants no initialization, dependency, or server authority.
3. **Directions:** honor the requested number and comparison axes. If unspecified, propose a useful number without imposing an arbitrary cap. Before implementation, name each direction, its axis and rationale. Revise convergent variants rather than quietly dropping requested outputs.
4. **Implement when authorized:** mount variants in the isolated host/route; use a picker whose selection is shareable via URL when appropriate. Render one variant at a time in relevant surrounding context. Do not import prototype-only code into production or connect variants to real mutations. Do proportionate local checks within permissions; broader external exposure, service/account change, or out-of-scope dependency installation needs separate authorization.
5. **Evidence and handoff:** exercise reachable variants and controls with available permitted checks. Report actual checks/results and missing evidence honestly. Identify the actual URL/file only if implemented; for proposals do not imply a live surface. Present each variant's honest tradeoff and stop for user choice.
6. **Promotion:** integrate a selected variant only when specifically requested and authorized; keep remaining prototypes or remove them only as authorized.

**Completion:** requested variants are reachable from the picker when implemented, evidence and limitations are clear, and the user can compare each variant's tradeoff.

Describe variants honestly; do not preselect a winner unless asked. If asked, justify the recommendation from the actual product and requested comparison.

Sources, attribution, and full notices: [SOURCES.md](SOURCES.md), [LICENSE.emil](LICENSE.emil), and [LICENSE.matt](LICENSE.matt).
