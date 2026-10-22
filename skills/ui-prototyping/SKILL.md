---
name: ui-prototyping
description: "[Emil Kowalski] Explicit-only divergent UI exploration; build isolated variants behind a picker only when implementation is requested."
disable-model-invocation: true
---

Modified adaptation; public metadata/routing updated locally. See [SOURCES.md](SOURCES.md)
and the complete [MIT notice](LICENSE.emil).

# Prototyping Variants

## Initial Response

When invoked without a specific question, briefly explain that this explicitly invoked skill can either plan divergent variants or implement an isolated picker when authorized. Do not send a greeting-only response.

A divergence skill for planning or implementing comparable versions of the requested UI behind an isolated picker. It does not review existing motion (that's explicit `ui-web-motion` diff review), plan motion fixes (that's `ui-web-motion` existing-motion planning), or choose dependencies (that's `ui-library-selection`).

## Operating Posture

Explore the comparison the user actually requests. State each variant's meaningful distinction and tradeoff. Layout, interaction, motion, palette, and copy are all valid axes when relevant to the brief; a requested color/copy comparison is not an excuse to substitute unrelated redesigns.

## Hard Rules

1. **Plan-only means no writes or execution.** For inspection, ideation, or planning-only requests, return scoped variant and picker proposals. Do not create files, launch a server/launcher, or call external tools.
2. **Keep exploration isolated.** When implementation is authorized, variants live in an isolated prototype surface; production integration requires the user's selection and explicit implementation scope.
3. **Variants diverge on a named axis.** State each direction's distinction and keep it grounded in the brief and actual project context.
4. **Use the project's real conventions.** Inspect existing stack and tokens; reuse them where appropriate. Do not force generic chrome or motion to make variants appear distinct.
5. **The picker is functional interface, not immutable styling.** Use [PICKER.md](PICKER.md) as a behavior and accessibility reference. Adapt its presentation to project tokens and context; keep it legible and non-obscuring, especially on narrow screens.
6. **Every implemented variant and picker control works.** Preserve keyboard operation, accessible semantics, visible focus, accurate selection state, and URL-state behavior where the picker uses URL state.
7. **Cleanup follows authorization.** Do not delete or promote prototype work beyond the requested selection and authorized scope.

## Workflow

### Phase 1 — Scope

Respect the requested scope. If a request names several pieces, cover each within scope or state a concrete constraint and ask which to prioritize; never silently select one and discard the others. Restate the requested pieces, their context, and required behavior. Planning requests stop at a proposal without writes or execution.

### Phase 2 — Recon

Before designing anything, map the ground the variants must stand on:

- **Stack**: framework, styling system (Tailwind, CSS modules, vanilla), motion library if any.
- **Tokens**: colors, radii, spacing, fonts, easing/duration variables. Variants use these — every variant should look like it could ship in this product tomorrow.
- **Personality**: playful consumer app or crisp dashboard? This bounds how far the boldest variant may go.
- **Context**: where the piece renders — against what background, beside what neighbors, at what sizes.

If no project exists, use the supplied brief/assets to plan directions in Phase 3 before any build. An empty directory grants no initialization, dependency, or server authority. An authorized standalone exploration may use a self-contained file; label any reversible visual assumptions rather than imposing a neutral-gray default.

### Phase 3 — Choose directions

Honor the requested count and axes. When the count is unspecified, three variants can be a practical proposal, not a minimum or ceiling. If a material constraint affects delivery, explain it and resolve the scope rather than silently imposing a five-variant cap or dropping a direction.

Before writing code, list the set with a descriptive name, comparison axis, and reason for each direction. If unintended convergence defeats the requested comparison, revise the directions; do not remove a requested output without agreement.

**Completion criterion:** every requested variant has an identified name and meaningful position on the requested comparison axes, including palette/copy-only axes when asked for.

### Phase 4 — Build an authorized picker harness

Only when implementation is requested and authorized, use an isolated route or file consistent with the project, without importing prototype code into production. For a standalone exploration, create a self-contained file only within the authorized scope. Consult [PICKER.md](PICKER.md) for behavior, not mandatory appearance; adapt to incumbent tokens and avoid covering important content or controls at narrow sizes. An implementation request covers necessary proportionate local runtime/browser checks under native permissions; ask before materially broader effects such as external publication, new exposure, service/account changes, or dependency installation outside the agreed scope. Planning remains no-write/no-execution.

Render one variant at a time in relevant surrounding context. Switching variants remains immediate unless the brief asks otherwise.

### Phase 5 — Verify and hand off

For an authorized implementation, exercise every variant and picker control through the available permitted runtime and Playwright MCP tools. Check keyboard/focus and selection, valid/invalid URL initialization when URL state is used, same-selection state preservation, relevant replay behavior, cleanup, and narrow-screen placement/occlusion. Report actual project checks and observed browser results separately; if a prerequisite is unavailable, finish reachable checks and name the missing proof. A plan-only response performs no runtime verification and makes no runtime or visual claim.

Then present the set and **stop — the choice belongs to the user**:

| # | Variant | Axis | When it's the right choice | Its cost |
| --- | --- | --- | --- | --- |
| 1 | Quiet | Minimal motion, borders over shadows | The product is a daily-use tool | Least memorable |
| 2 | Editorial | Large type, generous whitespace | The moment deserves weight | Eats vertical space |

For implemented work, identify the actual running URL or file and available controls/shortcut scope; do not invent a live surface for a proposal.

**Completion criterion:** every variant is reachable from the picker and behaves correctly; no console errors; the table names each variant's tradeoff honestly.

### Phase 6 — Promote on selection

Promote a selected variant only when requested and authorized, preserving the project's conventions and keeping any remaining prototype surface within the authorized scope. Do not assume that selection authorizes unrelated cleanup.

## Invocation Variants

| Invocation | Behavior |
| --- | --- |
| `<description>` | Plan or implement only as authorized; planning alone creates no files or running surface. |
| `<description> xN` | Propose or build the requested count within authorization; resolve material delivery constraints rather than imposing an arbitrary cap. |
| `riff <variant>` | Propose a new round without writes unless implementation is authorized. |
| `keep <variant>` | Promote only with explicit authorization for integration. |
| `keep <variant>, leave the picker` | Promote and retain the picker only if both actions are authorized. |

## Tone

Describe each variant honestly: when it wins and what it costs. Do not preselect a winner unless asked; then explain the recommendation using the actual product and requested comparison. If variants converge unintentionally, correct that comparison or report the unresolved issue without silently cutting requested deliverables.
