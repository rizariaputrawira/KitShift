# Plan and asset review

For ordinary component review, inspect the requested component directly with permitted tools and report evidence; do not initialize comp-led state, generate plates, start services or require unrelated approval actors. Follow [Workflow and authority](../SKILL.md#workflow-and-authority). The helper protocol below is only for an explicitly selected persistent comp-led build whose current scope covers its writes, capture execution, image generation and services. Its checkpoint compares plates and the production plan against the actual selected comp; it is not a prerequisite for every UI task.

## Plan, capture, serve

Run `<skill-base-dir>/scripts/impeccable component-review plan`. It writes `.impeccable/review/components.json` from the measured spec, the comp and the plate files, and refuses, naming each one, while any raster region lacks its plate. Never write or edit that file for this stage: the packet is derived from the spec, so every change belongs in the regions file.

If an available review tool exposes this protocol, use its current schema rather than assuming a tool name or `manifest_path` field. A suspended request means pending user input, not build failure or approval.

Otherwise, when the effects are covered, run `<skill-base-dir>/scripts/impeccable component-review capture --manifest .impeccable/review/components.json`, start `<skill-base-dir>/scripts/impeccable component-review serve --session <returned session>` through the available service interface, record its stop method, and open the returned URL with permitted browser tools. Consume its finite completion through the current task/job results interface. Read actual decisions with `component-review status --session <id>`; `component-review verify --manifest .impeccable/review/components.json` refuses pending, needs-work or stale inputs. Never submit a decision or fabricate a receipt on the user's behalf. If the needed execution or service is outside scope, report that prerequisite without launching it.

`serve` exits 2 when this session has no browser (the same signal as the decision page) and 4 when it closes after 30 idle minutes without a decision. Either way no one is reviewing: stop waiting, do not approve anything yourself, and do not build past this checkpoint. End the run and report the plan and asset review as pending with its session ID, so the user can resume it. A waiting review is pending work, not a completed build.

## Act on the receipt

Apply the user's decisions as given, never your own favorable verdict in their place.

- **approve**: once every item is approved and the inventory is confirmed, advance to the hero.
- **revise** (a plate): regenerate that plate at the same path with the user's feedback.
- **revise with split** (an asset): replace that region in the regions file with its layers: a frame plate with a transparent opening (kind `plate`, same box), the content as its own `image` region at the opening's box, and each moving part (a shutter, a door) as its own plate. Name each layer after the original region, as `<id>-frame`, `<id>-view` or `<id>-shutter-left`, so the next round shows it as part of the user's request. Rerun `<skill-base-dir>/scripts/impeccable comp-spec --comp <comp.png> --regions <regions.json>` and produce the plates.
- **revise** (a plan item): change the regions file as the feedback says (resize or extend a raster region, split material into its own plate region, or adjust the code region), rerun `<skill-base-dir>/scripts/impeccable comp-spec --comp <comp.png> --regions <regions.json>`, and produce any new plates.
- **reclassify** (a code region): update its actual region kind/note, rerun the selected `comp-spec` workflow, and produce the requested plates directly or with justified task delegation using [asset-producer.md](degraded/asset-producer.md) as prompt material, not a registered role or compulsory actor.
- **missing**: add the region to the regions file, rerun `<skill-base-dir>/scripts/impeccable comp-spec --comp <comp.png> --regions <regions.json>`, and produce its plate if it is raster.

Then run `plan`, `capture` and `serve` again. Unchanged decisions carry over, so the user sees only what changed. Any spec change, or a plate replaced after acceptance, needs a new round; the build-phase gate stays closed until the review of the current spec is accepted.

## Assemble and review

Build the first viewport from the selected plan and plates. When a helper hero gate is selected, use its measurements as evidence, not an arbitrary iteration ceiling or substitute for the user's eye. Present the current viewport when a material decision needs user input; do not force three failed attempts first.

For the selected helper protocol, write the second manifest at `.impeccable/review/hero.json` using its supported versioned shape:

```json
{
  "schemaVersion": 2,
  "stage": "hero",
  "id": "hero",
  "title": "First viewport",
  "comp": {"path": ".impeccable/mocks/comp.png", "width": 1536, "height": 1024},
  "components": [{
    "id": "first-viewport",
    "name": "First viewport",
    "medium": "HTML / CSS",
    "note": "Assembled first viewport",
    "box": {"x": 0, "y": 0, "w": 1, "h": 1},
    "preview": {"kind": "page", "path": "index.html"},
    "dependencies": ["styles.css", "assets/plates/sky.png", "fonts/display.woff2"]
  }]
}
```

- `schemaVersion` is 2. Version 3 is the plan review packet and requires stage `components`. `codeRegions` and `specSha256` exist only in version 3 and are refused here. `reviewGroup` is refused too: version 3 rejects it, and any other version accepts it only on a page preview in a `components`-stage manifest, never in a hero manifest.
- `comp.path` is the `comp` value in `.impeccable/build/spec.json`, and `width` and `height` are that PNG's pixel size.
- Exactly one component, with `box` exactly `{"x": 0, "y": 0, "w": 1, "h": 1}` and `name`, `medium` and `note` as strings.
- `preview.path` is the page entry the build gates (`artifact` in `.impeccable/build/state.json`).
- `dependencies` lists every other file the page loads (stylesheets, scripts, plates, images, fonts) as bare strings. Every path, here and above, is project-relative and plain: no leading `./` or `/`, no `..`, no URL, no `?`, `#`, `%`, `:` or backslash. A request to a file missing from this list, or to another host, fails the capture.

The reference stays the approved comp. Call the same host review tool, or run `capture`, `serve` and `verify` with this manifest. Needs-work feedback starts another assembly round.

Actual acceptance applies to the reviewed inputs and scope. Do not repeatedly request the same approval for unchanged work; preserve the selected direction and honor later explicit user corrections. Scores are advisory to visual judgment but cannot certify missing assets, incorrect content or absent rendered behavior. The user accepting a first viewport has not reviewed the rest of the page. Complete only the authorized remaining page, responsive behavior, checks and documentation; persistent finish records are not automatic. If an explicit checkpoint still lacks a real decision, keep it pending rather than treating tool failure, silence or an agent's favorable verdict as user approval.

Assembled-page capture executes inline and declared local scripts from the pinned inputs. Network APIs, frames and workers are unavailable; the initial viewport must settle before capture. Keep the real page and declare its scripts rather than removing behavior to pass review.
