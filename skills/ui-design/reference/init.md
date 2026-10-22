# Init flow

`init` captures durable product truth in PRODUCT.md only when that documentation is explicitly requested or required by the selected project workflow. Follow [workflow and authority](../SKILL.md#workflow-and-authority). It does not scaffold an application, install dependencies, configure Live, invent a visual world or write DESIGN.md; [new-work.md](new-work.md) guides visual work and [document.md](document.md) records an incumbent system when authorized.

## Step 1: Load current state

Use the existing authorized PRODUCT.md location, resolved from project evidence or an already permitted context run. Update it instead of creating a competing authority. In a child app inheriting root context, resolve shared versus app-specific scope before writing. A missing file during ordinary UI work is not a reason to enter init.

- **No PRODUCT.md:** explore, interview, and write it.
- **PRODUCT.md exists:** ask what product knowledge is stale or missing; do not reopen confirmed fields without a reason.
- **Legacy PRODUCT.md:** add only durable missing facts; absent `## Platform` means `web` unless evidence says otherwise.
- **Only DESIGN.md exists:** leave it untouched and create PRODUCT.md.
- **Redesign/rebrand request:** preserve confirmed product truth unless the user changes it. Visual replacement happens later in new-work, not here.

Preserve unrelated content in existing files. A direct request to update the product record authorizes its bounded changes; resolve only material ambiguity before writing. If another authorized request explicitly selected init, finish the requested record and resume that request. Shape/planning alone does not select init or persistent files.

## Step 2: Explore the project

Before asking, scan enough to avoid making the user repeat known facts: product docs and copy; package/config and app boundaries; features, workflows, routes, and roles; names, logos, legal/proof assets, and brand commitments; platform/accessibility signals; and the dev command/entry when live mode applies.

Treat repository evidence as a hypothesis, not user approval. Note visual maturity without documenting, extending, or replacing the world.

Form a platform hypothesis: `web`, `ios`, `android`, or `adaptive` (one product that genuinely adapts its design language per OS). Mobile web remains `web`; a native wrapper around a website does not make its design language native.

## Step 3: Interview for product truth

Use the native structured question interface for material gaps the repository and original request do not answer; otherwise proceed from the supplied evidence. Batch independent questions rather than requiring a ceremonial interview or an extra approval round.

Respect actual session authority and interaction availability. Do not probe a question tool merely to challenge an unattended-mode instruction. If a necessary answer is unavailable, mark the decision open and report the dependent limit; do not invent approval or confirmed product facts.

Start with the unknowns that most change future product decisions:

1. Who is the primary user, in what situation, and what job are they doing?
2. What does the product make possible, and what is its meaningfully different mechanism or position?
3. What durable constraints, assets, evidence, or product facts must future work preserve?

Resolve platform or stack only when unknown and consequential to the authorized work. Reuse the existing stack and explicit user choices; when a new stack decision materially changes the result, offer the meaningful alternatives or a recommendation through the native question interface. Record a genuinely delegated choice as such. Do not scaffold a project merely to capture its product record.

Do not ask for an aesthetic direction, emotional feel, visual references, colors, typography, or style during init. If the user volunteers a binding visual constraint, record it without expanding it.

### What belongs here

- users, jobs, workflows, purpose, success, positioning, and operating context;
- capabilities, constraints, terminology, evidence, platform, and accessibility;
- confirmed voice, assets, and brand commitments.

### What does not belong here

- visual worlds, palettes, typography, components, or page concepts;
- visitor mode, narrative, CTA/proof sequence, or other surface strategy;
- invented testimonials, customers, benchmarks, pricing, licensing, or deployment claims;
- a requirement to decide every optional field.

## Step 4: Write PRODUCT.md

Write only confirmed facts and explicitly marked open decisions. Omit irrelevant sections rather than filling them with generic prose.

```markdown
# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
[Greenfield only: the user's answer to the stack question, e.g. "static HTML/CSS", "Astro", or "delegated: <what you chose and why>". Omit the section when an existing codebase already answers it.]

## Users
[Primary users, their situation, and job. Add other audiences only when confirmed.]

## Product Purpose
[What the product does, why it exists, and what success means.]

## Positioning
[The product mechanism or claim a neighboring product could not truthfully copy.]

## Operating Context
[Workflows, environments, tools, documents, materials, and rituals that are factual parts of using or evaluating the product.]

## Capabilities and Constraints
[Confirmed functionality, technical constraints, terminology, and explicitly undecided product facts.]

## Brand Commitments
[Existing name, voice, assets, personality, identity constraints, and references the user explicitly made binding. Omit when none exist.]

## Evidence on Hand
[Real content, data, demonstrations, testimonials, case studies, press, or assets, with paths where applicable. State absences that future work must not fabricate.]

## Product Principles
[Three to five durable strategic principles derived from confirmed answers; no visual recipes.]

## Accessibility & Inclusion
[Known user needs or required standard. Omit when no product-specific requirement was established.]
```

Platform is the bare value `web`, `ios`, `android`, or `adaptive`. Preserve useful legacy headings. For explicitly requested new records, use `PROJECT_ROOT/PRODUCT.md` unless project guidance selects another path; otherwise update the resolved file. This file is not a prerequisite to ordinary visual work.

Copy the `impeccable:product-schema` comment verbatim, including when you update an older file. It records which version of the product record this file follows, so later versions can tell a deliberately short record from one written before a section existed, and never propose an interview the user has already sat through. Update the number only when this reference's template changes it. Sections a later version retires are reported to you at boot as deprecated; delete them when the user agrees rather than carrying them forward.

When actual platform evidence is `ios`, `android`, or `adaptive`, load [ios.md](ios.md), [android.md](android.md), or both for relevant design work. Platform evidence may come from existing source or the request; it does not depend on init or a context run.

### Completion gate

For an authorized init deliverable, verify that PRODUCT.md exists at the resolved path and records confirmed facts and explicit open decisions. Missing output means that documentation task is incomplete, not that ordinary UI work or a read-only shape request must initialize a project.

## Step 5: Record workflow defaults

Record a workflow default only when the user asks to persist that preference or the explicitly selected setup includes it. If the choice is material, explain it through the native question interface: **comp-led** uses an approved generated image as visual reference and needs authorized image-generation tools; **code-led** builds directly from the brief and existing visual evidence. Make no unsupported speed, cost or quality promise.

When a standing preference is actually chosen, merge `"buildPath": "comp"` or `"buildPath": "code"` into the authorized `.impeccable/config.json`, preserving other keys and relevant local overrides. A session-only choice or declined persistence offer writes nothing. Missing configuration or mere image-tool availability does not select comp generation or create a default.

Existing recorded preferences guide only an already selected workflow; they do not opt every UI task into it. Configure Live through [live-setup.md](live-setup.md) only when current authority covers that separate setup and its actual effects. Preserve explicit CSP consent and do not install or start services solely because init completed.

## Step 6: Wrap up or resume

Summarize captured and deliberately undecided facts. Do not offer DESIGN.md merely because it is missing.

Recommend the next action from the actual project state:

- Empty or early project: ask naturally for the surface to be built, or use `$impeccable shape <surface>` when the user wants a confirmed brief without implementation. New-work will establish a visual world only when the requested work needs one.
- Existing coherent interface without DESIGN.md: `$impeccable document` if the user wants the incumbent system recorded independently of a new build.
- Existing surface needing work: name the most relevant scoped command.
- Web project ready for visual iteration: `$impeccable live` when configured.

If an authorized request selected init, resume it from the captured context without rerunning an unnecessary launcher. New-work owns later visual decisions; ordinary UI tasks remain independent of this persistence workflow.
