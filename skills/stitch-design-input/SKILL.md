---
name: stitch-design-input
description: Create or refine a proposed Google Stitch DESIGN.md from the project brief and observed context, only when requested.
---

# Stitch Design Taste — Semantic Design System Skill

The bundled example and locally adapted procedure are informed by the upstream Stitch skill and sample at [Leonxlnx/taste-skill, revision ce26fc25c0e5e8cab638f883de62d9a86ee5e45b](https://github.com/Leonxlnx/taste-skill/tree/ce26fc25c0e5e8cab638f883de62d9a86ee5e45b/skills/stitch-skill). A Google Labs commit independently corroborates Leonxlnx's contribution of a taste-design skill and DESIGN resource; the exact historical import path into this package is unknown. See [SOURCES.md](SOURCES.md) for the evidence and adaptation record, and [LICENSE.taste](LICENSE.taste) for the full MIT notice. The example and procedure have been locally adapted; no assertion is made that the local files are verbatim upstream copies.

## 1. Establish scope and destination

Identify whether the user requests an inline proposal, a file creation/update, or separately authorized external generation. Confirm the requested screens, relevant project, output location, and existing document owner from available context.

Label the result as a proposed Stitch input/example. It is not canonical project truth and does not supersede existing documentation, design tokens, accessibility requirements, or the actual brief. Update an existing design-system document only when requested and authorized; otherwise use the specifically requested example location or return the requested inline proposal. Do not initialize a project or install dependencies merely to author this input.

**Done:** the requested result, authorized destination, existing owner, and any external-action boundary are identified.

## 2. Inspect the brief and existing owners

Read the actual brief and relevant existing project guidance/implementation before proposing values. Existing compatible tokens and conventions take precedence. Capture only supported visual intent, color/type tokens, components/states, layout/responsive behavior, interactions, motion intent, and exclusions.

Distinguish observed facts, proposals, and unknowns. Do not invent a palette, typeface, component convention, layout, or motion requirement to fill a template. Resolve available evidence first; ask only about material unresolved decisions and batch related questions when useful.

**Done:** relevant project evidence and owners are identified, with consequential unknowns separated from proposed choices.

## 3. Draft the scoped input

Include only sections relevant to the requested screens. Describe function and source precisely; include values only when observed or intentionally proposed with a stated reason. The following guidance governs the draft.

### Color and typography

Record existing values and their roles when available. If the brief requests a new direction and no incumbent system governs it, propose values with a reason and label them as proposals. Do not impose an accent count, saturation ceiling, palette, banned colors, font family, type scale, or serif/sans rule independent of the actual product brief and accessibility needs.

### Composition, components, and responsive behavior

Describe hierarchy, content, component states, and responsive behavior relevant to the requested screens. Preserve actual content and product structure. Do not require a hero, inline imagery, asymmetry, a particular CTA count, card pattern, CSS layout method, viewport breakpoint, touch-target value, or mobile navigation pattern without a brief- or platform-based reason. Record real constraints and verify the requested target contexts when implementation or a visual result is in scope; do not claim verification that was not performed.


### Motion intent

Specify motion only when it serves the interaction and the brief. Motion is optional, not perpetual: do not require looping effects, staggered reveals, spring physics, or animation on every active component. State the purpose and relevant reduced-motion behavior when motion is requested. Do not prescribe an animation engine or assert that a property is universally hardware accelerated.

### Anti-patterns

List only exclusions grounded in the brief, observed product conventions, factual-content requirements, or accessibility. Do not present arbitrary font, color, layout, copy, asset-host, or component bans as universal rules. Never invent factual content or present placeholder assets/data as real.

### Suggested example structure

A Stitch-specific example may use this structure, adapting or omitting sections to fit the actual project:

When a concrete illustration would help, read the bundled [DESIGN.md example](DESIGN.md). Its values and visual direction are sample proposals, not project defaults, observed facts, or mandatory sections.

```markdown
# Stitch Design Input: [Project or screen]

> Example input for Google Stitch. Not canonical project documentation.

## Brief and scope
[Actual requested outcome, audience/context if supplied, and explicit exclusions.]

## Observed project context
[Existing tokens, components, content, and constraints, with source references where useful. Mark unknowns.]

## Visual direction
[Brief-led proposal, clearly distinguished from observed facts.]

## Components and states
[Only the components and states relevant to the request.]

## Layout and responsive behavior
[Requested target contexts and evidence-based constraints.]

## Interaction and motion
[Requested behavior; omit motion if not needed.]

## Open questions
[Only material unresolved decisions.]
```

**Done:** the draft preserves relevant project facts/content, labels proposals and unknowns, and remains a scoped noncanonical Stitch input.

## 4. Check the document and any authorized result

Compare the draft with the actual brief, inspected owners, and authorized destination. Check token/value accuracy, supported content, relevant states/target contexts, labeled assumptions, and unresolved material questions. Do not inherit sample values or style bans as project requirements.

Local document authoring does not require access to [Google Stitch](https://labs.google/stitch). External generation is a separate optional branch: call Stitch or its integration only with explicit authorization and an available permitted interface. Inspect its current contract and applicable asset-sharing authority before sending project material. Do not install/configure an integration or switch services merely because this skill mentions it.

If external access is unavailable, finish the reachable document work and identify the exact missing prerequisite. If generation, implementation, or a rendered result is separately in scope, inspect the actual authorized result and relevant target contexts using available permitted tools; do not initiate implementation just to validate a document.

**Done:** document checks are recorded separately from any exercised external/rendered verification, with missing prerequisites and unverified claims explicit.

## 5. Deliver the requested artifact and evidence

Return the requested inline input or identify the actual created/updated file. State its proposed/noncanonical status, relevant evidence sources, material proposals/open questions, and checks performed. Report separately whether any authorized external generation or rendered verification occurred.

Do not claim that Stitch ran, rendered, or validated anything unless the authorized tool was used and its result inspected. A checked document is not proof of generated UI, working behavior, or accessibility conformance.

**Done:** the requested document/proposal is delivered at the authorized destination, with ownership, unresolved decisions, and verification limits clear.
