# Source-grounded specification

Load when a delivery outcome must be synthesized or clarified. The consuming role is the delivery owner; discovery is read-only and document writes require current authorization. This procedure does not publish tickets or approve a design.

## Synthesize before asking

1. Read the current request, supplied decisions and existing canonical requirements/design, domain vocabulary and relevant ADRs. Inspect the affected implementation and consumer/test seam. Treat code as evidence of current behavior, not authority to overwrite approved intended behavior.
2. Enumerate known outcome, affected actors, constraints, failure paths and exclusions. Identify only material unknowns. Repository-discoverable facts are researched; a remaining consequential choice routes to `skill://workflow-brainstorming`. Do not ask again for supplied answers.
3. Reuse an existing sufficient product/requirements owner, extending relevant anchors only. For an adopted project resolve owners and any authorized necessary new standalone file through `skill://docs-engineering/references/locations.md`, not an independent path convention. Before adoption preserve existing locations; explicitly authorized baseline adoption follows docs-engineering setup. Do not create parallel owners or silently change approved scope.
4. Prefer the highest existing consumer seam that can discriminate the requested behavior. Describe the input, independently derived expected result and relevant failure result; introduce a new seam only when the existing ones cannot prove acceptance, explaining the concrete gap.

## Shared content and readiness contract

For the required acceptance/content shape, independently derived evidence, canonical ownership, and planning-readiness criteria, read the shared [specification content contract](skill://docs-specification/references/content-contract.md). This is a passive reference load, not invocation of the explicit-only specification workflow or permission to publish to a tracker. Keep delivery-specific baseline and approval integration here; do not maintain a second specification template.

Planning sufficiency is not permission to implement. Only for explicitly selected or project-required documentation-first delivery, require the selected [documentation baseline](documentation-baseline.md#before-code-readiness), including design and planned verification intent, reviewed with the implementation plan. Persist necessary reviewed content within current authority before app code for that workflow. A new app or substantial feature alone does not impose this gate.
