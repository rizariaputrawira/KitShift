<!-- Local correction: typography and palette heuristics are brief-led choices, not authorship tests or compulsory novelty gates. -->
# New visual work

Use this flow for design decisions on a new surface or replacement visual identity under [workflow and authority](../SKILL.md#workflow-and-authority). Read existing product/design records when available; missing files never require init. Ordinary work uses available tools without seeds, decision servers, generated comps, briefs or build-state files. The helper procedures below apply only when that particular persistent workflow is explicitly selected or required within current authority. A shape/planning request returns its direction before persistence or implementation unless those actions are separately authorized.

For a chosen comp’s region map, see [region-map.md](region-map.md) for the command sequence and schema.

## 1. Decide what is already true

Read existing design guidance, representative code, tokens, components and assets. Do not require DESIGN.md or create a missing record just to understand the incumbent.

- **Redesign:** preserve product truth, content, function, constraints, and explicit brand commitments; replace the old visual world rather than polishing it. The old look is evidence of what the subject is, not authority over what it becomes.
- **Established world:** inherit it. A missing DESIGN.md does not erase a coherent identity already in code; describe or document that identity only within the requested output/write scope instead of inventing a replacement.
- **Incomplete brand:** preserve confirmed assets and recognizable traits, then expand the system with the user for this surface.
- **No visual authority:** create a new world with the user.

A section, component, feature, or state inside an established surface inherits that surface. Never turn a local addition into a new identity exercise.

## 2. Ask what will change the work

Resolve only material missing choices before implementation. Use the supplied request and existing project context; ask only when the unresolved answer would materially change purpose, product behavior, direction, scope or consequences. A direct request authorizes implementation of its clear outcome and routine design choices; do not require a compact confirmation round merely to repeat settled direction. DESIGN.md settles the visual world, not this surface's purpose or concept.

- **Persuade:** who must act, what they should believe, which real proof, content, or assets earn that belief.
- **Operate:** the task, information, important states, frequency, constraints.
- **Read:** the reader's question, source material, structure, wayfinding.
- **Experience:** what leads, how exploration unfolds, which interaction or transition matters.

Resolve unanswered success criteria, preservation constraints and meaningful design tradeoffs only when they materially affect the work. Reuse settled answers; batch independent questions through the native interface. Do not ask for CSS values or reopen a pinned aesthetic merely to run an interview.

## 3. Choose the right amount of invention

### Extend an existing surface

Inherit its world and composition. Resolve only the new purpose, content, hierarchy, states, interaction, and how the addition joins the surrounding experience. No concept tournament, and no DESIGN.md change unless the user approves a durable system change.

### Create a whole surface inside an established world

Keep the visual system fixed. Derive meaningfully different structures from the actual content, task and user behavior only when an open structural choice warrants alternatives. A precise brief needs no concept tournament. Present material tradeoffs through the native question interface when the user needs to decide.

For an explicitly selected concept-seed workflow, the helper is:

`<skill-base-dir>/scripts/impeccable concept-seed --scope surface --mode <mode>`

Its dealt structures can be presented through native questions or an authorized decision page. Each option visualizes composition inside the established identity, not a new world. Generate a comp only when image generation and its side effects are authorized; anchor it to actual screenshots/tokens and use [visualize.md](visualize.md). Without that selection, use a clear textual or wireframe proposal. A user's choice settles only the presented choice; it does not implicitly authorize persistence, new facts, image generation or implementation outside the current request.

### Create or replace the visual world

1. Name the product's mechanism, the audience's real scene and what this surface must accomplish. Identify category habits without treating their opposite as automatically better.
2. Derive a proportionate set of complete directions from relevant visual systems, publications, places, rituals or artifacts. Favor genuine structural alternatives over palette swaps; respect the surface's Operate, Read, Persuade or Experience task.
3. Join each proposed visual world to a concrete first-viewport experience, visitor path, interaction and honest risk. Product truth and user-pinned constraints decide viability.
4. If the user selected concept-seed and its execution is permitted, run `<skill-base-dir>/scripts/impeccable concept-seed --scope direction --mode <mode>`. Judge assigned and challenger material by audience identification and product clarity; a roll is an optional creative aid, not native authority or a prerequisite to code.
5. Present the strongest evidence-backed direction and meaningful alternatives when a material choice remains. State what each gains and risks. A familiar, conventional solution is valid when it best serves the task; do not demote it solely to enforce novelty. The user can choose or redirect without a forced tournament.

For an explicitly selected decision-page workflow, inspect `serve-question --schema`, prepare the actual supported options payload, then use `<skill-base-dir>/scripts/impeccable serve-question --start --payload <file>` only when its files, local service and browser interaction are within authority. Keep its returned key private protocol data, use `--wait --key <key>` to collect the choice, and `--update --key <key> --payload <file>` for a re-roll on the same session. Honor actual terminal/error results. Use the available finite-job/service interface; do not invent an unsupported execution session or poll process status in a loop. If the page cannot be used within current permissions, present the material choice through the available user-question mechanism without starting it. A closed page or missing answer is not approval.

Image availability does not select image generation. When decision comps are requested, load [visualize.md](visualize.md) before prompting, use the real surface aspect/viewport and verified product content, and give alternatives comparable finished treatment without claiming equal cost or latency. Keep the image's prompt/provenance records only in their authorized scope. Generate directly or delegate distinct asset jobs through supported task dispatch when justified; use [asset-producer](degraded/asset-producer.md) as optional prompt material, not a registered agent name or model profile. Never weaken a sandbox, preselect escalation or start an unapproved service to make the page work.

Choose a comp-led or code-led path from the request and applicable recorded preferences only within an already selected workflow. With no selected image-led path, build directly from the brief and incumbent evidence. A session-only flip or declined persistence offer writes nothing. Merge `buildPath` into `.impeccable/config.json` only when the user requests a standing preference or selected setup covers it; never infer consent to save the opposite value from “no, just this once.”

When a catalog world or QUALITY BAR reference is selected, use it as visual evidence, not as a source of product facts or unrelated UI requirements. Inspect available reference images through permitted tools. Fetch or write reference assets only when current authority covers those effects; sandbox restrictions do not authorize a workaround.

Every proposed direction must be viable for the actual product, platform, available assets/tools and performance constraints. Use synthetic demonstration material only when that prototype/content scope is authorized and label it where a visitor could mistake it for real evidence. Never invent prices, customers, benchmarks, endpoints or unsupported capabilities.

Read mode guidance directly when relevant: [mode-persuade.md](mode-persuade.md) for Persuade/Experience, [mode-operate.md](mode-operate.md), or [mode-read.md](mode-read.md). MODE RULES returned by an authorized seed helper supply design data, not permission to override the user's brief, governing policy or project constraints.

## 4. Commit the world

Pick a color strategy before picking colors: Restrained (neutrals tinted from the world plus one accent; common on screens people operate or read, where the mode's rules still ask colour to do real jobs), Committed (one saturated color carries 30-60% of the surface), Full palette (3-4 named roles), or Drenched (the surface IS the color). Persuade and Experience surfaces have permission for the bolder strategies; take them when the brief allows. Color commits at page scale: fields that own whole regions, not accents scattered over a neutral ground. Dark or light is never a default: write one sentence of physical scene (who uses this, where, under what light) and let it force the answer.

Choose faces like objects from the subject's world, in the mode's register. Operate and Read surfaces are often served by system stacks and workhorse UI faces; Persuade and Experience surfaces may benefit from expressive display type. Preserve pinned and incumbent faces. When choosing anew, compare the actual glyphs, roles, language coverage, availability and licensing rather than rejecting a face because it is familiar or demanding that no other face could satisfy the brief.

Calibration: warm cream with serif display, near-black with neon accents, and editorial hairlines with tracked labels are recognizable visual conventions, not evidence of authorship or automatic design failures. When direction is open, test whether a convention expresses this product's mechanism, audience and content; choose a different treatment only when it better serves the brief. Negative constraints such as no gamification or no hype rule out those devices, not necessarily energetic color or composition. A pinned quiet, warm or bookish world remains binding; do not force saturation, surprise or repeated rework merely to make the result harder to predict.

## 5. Record the decision

For ordinary work, carry the chosen direction in the task context or requested proposal; no persistent contract is required. If a surface brief is explicitly authorized, record a concise `## Direction contract`: THESIS (purpose), OWN-WORLD (palette/component language), STORY (visitor task/path), FIRST VIEWPORT (composition and primary action), FORM (selected structure and any actual seed key), and FINISH (the checks and deliverables actually agreed). Do not invent a seed key or add documentation, independent review or build-state obligations that were not selected.

Never copy the direction contract into implementation source or any browser-delivered artifact. This includes HTML or framework comments, hidden DOM, `<template>` elements, `data-*` attributes, rendered JSX or TSX output, serialized props or state, React Server Component payloads, client bundles, metadata or JSON-LD, accessibility-only text, and files served beside the artifact. A compiler or optimizer removing development metadata is not a safety boundary. Reviewers and documenters receive the contract from the surface brief.

Write or update DESIGN.md only when documentation is requested or the selected persistent workflow requires it within authority. Use the finished system as evidence; ordinary extensions preserve existing records and report unrelated drift.

For an explicitly selected surface-brief workflow, read before writing:

`<skill-base-dir>/scripts/impeccable surface-brief read <primary-target>`

`<skill-base-dir>/scripts/impeccable surface-brief write <primary-target> <body-file> [related-target ...]`

Verify the authorized brief contains the agreed contract, including a seed key only when one actually exists. Missing optional persistence never blocks ordinary work.

Keep the brief small: scope and visitor mode; audience, job, action/task, proof/content, and constraints; chosen direction and memorable moment; unresolved decisions. Do not copy global product truth or DESIGN.md tokens into it.

On an explicitly selected image-led build, follow [visualize.md](visualize.md) for the requested comp/variation and approval workflow. Do not generate options merely because an image tool exists, claim this path is proven superior, or turn visual approval into authority for new factual copy or behavior. Code-led work uses the brief and existing visual evidence without a mandatory comp round.

For `shape`, return the selected direction to [shape.md](shape.md) and stop before persistence or implementation.

## 6. Build with full commitment

Build the chosen direction within the requested scope. Use its vocabulary for the elements the task actually changes while preserving product facts, working behavior and incumbent constraints. A redesign can replace its authorized visual world; a local refinement does not rebuild every control or add assets and techniques merely to demonstrate commitment.

### Comp-led: the comp is a measured contract

An approved comp is visual evidence for the agreed composition, not a source of new product facts or functionality. Compare the render with it using permitted browser/image capture tools and measured regions where useful; report unavailable evidence honestly. A persistent helper state machine is optional, not a prerequisite to image-to-code work.

For an explicitly selected `build-phase` workflow whose engine, files and generation/capture effects are permitted, start it with `<skill-base-dir>/scripts/impeccable build-phase start --direction <seed key> --kind <assigned|pick|challenger|canon> --artifact <entry file>` when an actual seed exists, or `start --comp <approved comp> --artifact <entry file>`.

Only in that selected helper workflow, follow its supported phases in order and close them with `<skill-base-dir>/scripts/impeccable build-phase advance`. Exit 2 means the helper reported a gate failure: inspect its evidence and actual permitted correction; do not forge state or treat a helper gate as higher-priority authority. The sequence below documents that workflow, not an obligation for ordinary UI work:

0. **comps.** Produce the comps and prompt sidecars agreed in [visualize.md](visualize.md), recording only actual user approval. The helper may require three options; if that workflow is selected, satisfy its real contract rather than fabricate them. A `start --comp` uses the already approved comp. Verify tool and permission prerequisites; no model-tier label establishes capability or justifies changing native routing.

1. **spec.** Measure the comp: `impeccable comp-spec --comp <comp> --grid` writes a coordinate grid over the comp; open it, name every salient region by grid span in a regions file (text and control regions narrow to an ink cluster only when it retains at least 95% of the span’s contrasting pixels; inspect the resulting crop, especially for compound controls and multiline text; `snap: false` keeps the span, and an explicit `box` is taken as drawn) (kind `plate` / `image` / `texture` for anything painted: every illustration, photograph, figure, product object, and material texture; `text` / `control` / `chrome` for what code draws; every region carries a `note` saying what the comp shows there, which the plate prompt and the gate messages read), and run `impeccable comp-spec --comp <comp> --regions <file>`. The spec carries each region's box, sampled palette, and medium; `impeccable comp-spec --print` is the build's reference from here on. Type is measured, not guessed: `impeccable font-match --measure <text region>` reads the comp's cap height, width class, and weight off the pixels, and `impeccable font-match --rank <region> --text "..."` takes its candidates from a fingerprint index of the Google Fonts catalog (the nearest faces to the crop's shape) plus any names you pass with `--candidates`, renders them at that cap height with the region's words, and ranks them by fingerprint distance (its `USE` line is the CSS); with no browser resolvable it records the catalog's nearest face and says the size is estimated, which is still the choice to build on. Do not install a browser to rank, and never write a `chosen` face into the spec by hand: the gate accepts only what font-match wrote. The spec gate refuses to close until the lead text region is measured and ranked. A region note that describes painted material (a diagram, drawing, photograph, texture) under a code kind is refused at the spec: reclassify it as a plate, or reword the note if code really draws it. The script refuses a regions file that leaves comp ink unnamed: what is never named can never be missing. It also refuses a `text` / `control` / `chrome` region larger than a quarter of the comp: that is a column, not an element. Name each element inside it (`container: true` only when it truly is one undivided element). Anything drawn is a plate: an inline SVG past an icon's budget (a diagram, notation, leader lines with arrows, a "quick approximation" of the artwork) is refused at the hero; icon-sized SVG (under 64px, a few paths) is fine, and a chart the page draws from data at runtime is a chart, not an illustration. Callout lines and arrows that annotate a drawing belong to that drawing's plate, with only their labels set as text. Split regions by what varies independently, as [region-map.md](region-map.md) sets out; a framed view is a frame plate over its own image region. A crop of the comp is never a plate (the plates gate refuses a resample of the comp region); the crop is the reference the plate is generated from. A plate region's box has to hold its whole artwork with a margin: the spec measures the artwork's contact with the box edges and refuses a box that cuts through it (`bleed: true` only when the page really crops it there), because a plate placed with `object-fit: cover` on such a box shows the artwork minus the side the box lost. Anything not in the spec does not exist on the page: no borders, rules, containers, or chrome the comp does not show. Only three concessions exist: fonts (the closest obtainable face), icon glyphs (close enough, exact if the user chose an icon library; this covers the pictogram only, never a control's chrome, so a chevron, an arrow, a dropdown's border and fill, a button's shape are the comp's), and genuine defects in the comp such as spelling errors.
Inspect the proposed map before producing assets: `impeccable comp-spec --comp <comp> --regions <file> --inspect-map` writes a numbered overlay, exact crops, foreground-mask previews, and a consolidated report without changing the spec or build state. Inspect boundaries and excluded pixels together; an empty reference needs corrected geometry. `parentId` names an enclosing `container`; it never removes regions or approves assets. The report diagnoses geometry, not semantic completeness.

2. **plates.** Produce the spec's selected raster assets at their intended resolution from their reference crops; a crop of the comp is a reference, not automatically a shipping asset. Use `impeccable comp-spec --crop <id>` and save `impeccable comp-spec --plate-prompt <id> --background transparent` (or `opaque`) to a prompt file. Prefer an available authorized image tool, then record provenance with `impeccable embed-prompt <plate> --prompt-file <prompt.txt>` when that metadata write is selected. The optional API fallback `impeccable generate-image --ref <crop.png> --prompt-file <prompt.txt> --out <plate.png> --size <WxH> --quality high --background transparent` requires its own available service and current network/data/cost authority; do not select it silently. Verify actual alpha, fine edges and visibility on light and dark grounds. Produce directly or use justified task delegation with [asset-producer](degraded/asset-producer.md) as prompt material and bounded output paths. The selected plates gate checks file presence, resolution and correspondence; inspect its actual evidence, preserve required approvals and use [component-review.md](component-review.md) when that human-review protocol is selected. Do not fabricate acceptance or force a state transition to bypass a genuine missing deliverable. A single-file deliverable can inline an authorized produced plate as a data URI. Neither image-tool availability nor a missing plate expands the requested asset scope.

3. **hero.** In the selected helper workflow, `impeccable build-phase scaffold` writes measured CSS properties and `hero-reference.html`; use those as positional evidence, not as the finished semantic page. Build the first viewport at the comp dimensions using verified product copy, accessible controls, actual selected fonts and assets. Visual approval of an image does not verify every word in it. Resolve material deviations from the brief or comp rather than copying false claims. Place the agreed plates at their spec boxes, capture `.impeccable/review/hero-repro.png`, and use `impeccable build-phase record hero` / `advance` as the actual engine contract requires. Inspect `.impeccable/review/diff/hero/` reports and paired crops for missing, contradicted and drifting regions; a score is comparison evidence, not proof of functional correctness or authority to remove required content. Correct source and recapture until the agreed criteria hold, or report the actual unmet prerequisite when correction is blocked. Use [component-review.md](component-review.md) for a selected human review, not as an arbitrary attempt-count exit or a substitute for unresolved material defects.
4. **sections.** Build the rest of the surface inside the spec's system: the same corner language, line weights, and palette, and nothing the comp never shows. Where the comp does not cover a region, it inherits the recorded system.
5. **motion.** The signature interaction, reveals, and motion, orchestrated once rather than scattered.
6. **responsive.** The other viewports, and the first viewport at common desktop widths (1280 to 1600), not only at the comp's exact size: fluid columns, no fixed-pixel grid that wraps a hundred pixels narrower. Capture `desktop.png` (1440 wide, full page) and `mobile.png` (390 wide) into `.impeccable/review/`; the gate diffs the desktop capture against the comp and refuses a first viewport that only held at the comp's width. A comp'd surface that is mobile-first was comped portrait; the plates were produced for that frame.

### Code-led

Build directly from the brief, actual product content, incumbent visual system and chosen direction. Use any supplied decision image only at its stated reference scope. No generated comp, direction-contract file or helper-state file is required.

### Both paths

- **The first viewport is a thesis, not a header.** Demonstrate the mechanism immediately, at the scale the form has in life; do not trap the concept inside a standard hero or card shell. The memory test: if someone left after one viewport, what would they describe an hour later? If the honest answer is a mood, the concept has not committed yet.
- **Prove, don't claim.** Show the subject doing its job: the interface at work, the mechanism dramatized, specifics a competitor could not copy-paste. Demonstration data is design material: author it at full fidelity and label it synthetic; claims stay uninventable.
- **Author assets within scope.** Use real supplied content or authorized illustrative material at appropriate fidelity and label synthetic data. Do not add claims, sections, assets or backend behavior merely because a visual world suggests them; preserve required content and working controls.
- **Build the form's web leverage.** When the chosen world names a technique (canvas, WebGL, view transitions, generative motion), build the technique itself, not a static imitation of it.
- **Pace the scroll like a studio.** Vary density, scale, image, motion, and quiet inside one grammar; a dense passage earns a quiet one, and the page ends anchored by a real close. One spacing rhythm throughout, with more space above a heading than below it.
- **Use real, verified imagery when the brief implies it.** Search for the subject's physical object rather than the category; one decisive photo beats five mediocre ones. Verify stock URLs resolve.
- **Author motion as material.** Give the page the form's native motion once, orchestrated, rather than scattered hover effects. Bound expensive effects and keep content visible by default.

Preserve semantics, accessibility, performance, responsiveness, project conventions, and working behavior.

## 7. Inspect and finish

Inspect relevant rendered sizes and interactions through native permitted tools: desktop/mobile for web, and applicable device classes for native surfaces. Include the user's reported failing viewport. Verify actual copy, controls, accessibility, loading/error/empty states and preservation requirements within scope. Batch independent observations where useful; fix material gaps and exercise the changed path. No fixed round count makes an unfinished result complete.

Validate captures before relying on them: correct target, viewport and loading state, visible content rather than animation-hidden regions, no black/blank artifacts, and document-top/full-page scope when claimed. Compare a comp at its actual dimensions and inspect relevant regions rather than a full-page thumbnail alone. Missing rendering or malformed evidence is a reported limit, never a visual pass.

For an explicitly selected helper comparison, use `comp-diff --comp <approved comp> --build <capture> --spec <spec> --out-dir <authorized output>` and inspect reports and paired crops. Run the web-only detector only when the selected workflow and current engine/execution authority cover it; never bootstrap it just to complete an ordinary UI task. Reuse valid detector evidence, do not report it as native-platform verification, and do not let style findings override the brief.

Review directly or, when justified and permitted, delegate through the available task-dispatch interface with [finish-reviewer](degraded/finish-reviewer.md) as optional prompt material. Supply the original request, acceptance criteria, actual artifact/capture paths, relevant brief/comp evidence and selected helper records only when they exist. Bundled role names do not register agents; do not impose a model, fork parameter, time ceiling, forced retry or separate user-approval gate. Report a direct self-check as such. If independent review is explicitly required but unavailable, disclose the unmet requirement rather than substituting an independent-sounding self-review.

Interpret review outcomes at their evidence scope: **recapture** requires valid evidence; **fix** requires the material correction and re-verification; **rebuild** requires a new full review of materially replaced regions, not merely scoring the old fix list; **ship** is supported only for the inspected acceptance scope with no open material findings. Make authorized corrections without redundant confirmation; ask only for a genuinely changed scope, consequence or unresolved decision. A failed correction does not authorize arbitrary retries or unrelated work.

Preserve actual asset provenance in the agreed workflow. An `embed-prompt --scan <asset-dir...>` result is inspection evidence, not consent to rewrite all pre-existing images or remove metadata. Modify metadata only within authorized asset work; delete only assets made obsolete by that work, not files merely flagged by a scan.

When documentation is part of the authorized deliverable, use [document.md](document.md) and optionally [documenter](degraded/documenter.md) through available task dispatch or direct work. Write DESIGN.md and its sidecar only when that selected documentation contract calls for them. Otherwise preserve existing records and report unrelated drift; no mandatory documenter follows an ordinary UI change.

When the persistent build-phase workflow was actually selected, record its actual disposition with `<skill-base-dir>/scripts/impeccable build-phase finish --disposition <ship|fix|rebuild|recapture>`. Do not claim a helper gate passed when it refused. For every path, return what changed, the checks and interactions actually exercised, and material limits. User-reported failures remain evidence; a fix-list review is not whole-surface certification.
