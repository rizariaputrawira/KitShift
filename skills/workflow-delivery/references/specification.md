# Source-grounded specification

Load when a delivery outcome must be synthesized or clarified. The consuming role is the delivery owner; discovery is read-only and document writes require current authorization. This procedure does not publish tickets or approve a design.

## Synthesize before asking

1. Read the current request, supplied decisions and existing canonical requirements/design, domain vocabulary and relevant ADRs. Inspect the affected implementation and consumer/test seam. Treat code as evidence of current behavior, not authority to overwrite approved intended behavior.
2. Enumerate known outcome, affected actors, constraints, failure paths and exclusions. Identify only material unknowns. Repository-discoverable facts are researched; a remaining consequential choice routes to `skill://workflow-brainstorming`. Do not ask again for supplied answers.
3. Reuse an existing sufficient product/requirements owner, extending relevant anchors only. For an adopted project resolve owners and any authorized necessary new standalone file through `skill://docs-engineering/references/locations.md`, not an independent path convention. Before adoption preserve existing locations; explicitly authorized baseline adoption follows docs-engineering setup. Do not create parallel owners or silently change approved scope.
4. Prefer the highest existing consumer seam that can discriminate the requested behavior. Describe the input, independently derived expected result and relevant failure result; introduce a new seam only when the existing ones cannot prove acceptance, explaining the concrete gap.

## Content contract

Use the owner's format. Include these decisions, without padding irrelevant sections:

- **Problem and source basis:** the actor's observed problem; current evidence and intended outcome, with canonical anchors.
- **Solution and acceptance:** precise externally observable behaviors. Keep stable existing requirement IDs. Each criterion states preconditions/input, expected output/state/error and what proves it. Include required negative behavior, not just the happy path.
- **Useful actor flows:** actor → action → result → error/denial/recovery where flow detail adds clarity. Do not manufacture an extensive user-story list for a library change.
- **Implementation decisions:** affected module responsibilities and exact public/integration contracts; authorization/enforcement location, data ownership and lifecycle where relevant. Preserve approved fixed choices; label genuinely discretionary choices and unresolved decisions. Include decision-rich prototype snippets only with their actual source basis, not an executable demo.
- **Testing decisions:** consumer seams, existing test precedent, independently derived expected values, automation/manual evidence and inaccessible prerequisites. Behavior tests do not bind incidental internal calls unless those calls/order are themselves contractual.
- **Boundaries and errors:** authorized mutations, unaffected areas, denied/error/partial-success behavior, security constraints and integrations that must remain compatible.
- **Out of scope and open facts:** explicit exclusions, uncertainties, conflicting owners and exact missing source/evidence. Unknown is not a new requirement or a waived acceptance criterion.

Keep durable product decisions in their existing owners; keep exact changing file/symbol work in the implementation plan. Link rather than repeat the same requirement in multiple documents. Acceptance may map to several slices and one slice may satisfy several criteria.

## Exit and approval

The spec is ready for planning when an independent reader can identify the full requested behavior, errors, constraints and proof without guessing. Proposed content is not accepted content. Native approval governs consequential decisions and execution; a repository label, issue status or spec filename cannot supply it. Return proposed content in Plan Mode without checkout writes; when authorized to persist it, preserve current edits and trace the approved basis. Do not create tracker labels, setup commands, automatic publication or a second spec approval ceremony.

Planning sufficiency is not permission to implement. Only for explicitly selected or project-required documentation-first delivery, require the selected [documentation baseline](documentation-baseline.md#before-code-readiness), including design and planned verification intent, reviewed with the implementation plan. Persist necessary reviewed content within current authority before app code for that workflow. A new app or substantial feature alone does not impose this gate.
