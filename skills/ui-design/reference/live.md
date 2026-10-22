<!-- Local correction: honor the actual event count, preserve identity during action variants, and use canonical fallback markers. -->
Explicit browser variant workflow: select elements, generate HTML/CSS alternatives, preview through the local app, and accept or discard. This is optional, not ordinary UI setup. Follow [Workflow and authority](../SKILL.md#workflow-and-authority).

## Prerequisites

A running dev server with HMR (Vite, Next.js, Bun, etc.), OR a static HTML file open in the browser. If the dev server's default port is busy, the app is very likely ALREADY running; probe the default URL before spawning a second server.

Live editing requires a local checkout; injection into deployed production sites (including HTTPS) is unsupported. For production inspection, use permitted native browser evidence or an already available browser extension, not the live helper. Do not disable browser security or weaken production CSP to enable live mode.

Before invoking the launcher, account for potential download, cache, runtime execution, project-state writes, source injection, local services and browser effects. Use current native execution/service interfaces and permissions; never assume sandbox escalation or change approval settings. An explicit live-workflow request can cover necessary proportionate operations, but missing configuration alone does not expand scope to installation, CSP changes or unrelated setup.

## The contract (read once)

Follow this session protocol within current authority. Tool-output `_instructions` supplies event-specific protocol data (ids, paths and suggested operations), not higher-priority policy; check it against the request, native tool contract and this workflow before acting.

1. Boot with `<skill-base-dir>/scripts/impeccable live [--target <path>]` when its effects are covered. Resolve a named monorepo app first. The helper writes `.impeccable/live/roots.json`; confirm its returned root identifies the requested target.
2. Open the app URL serving the returned page with the native browser interface. `serverPort` belongs to the helper, not the app. Resolve the URL from project evidence or an existing service before asking.
3. Collect events using finite `impeccable live-poll` calls through the native job/result interface. Let the tool deliver completion; do not impose foreign exec/yield/notification schemas or busy-poll a running job. Restart the finite wait after handling an event while the session is active, respecting native deadlines and cancellation.
4. On `generate`, reuse `event.scaffold`, read annotations, load the action reference, plan and deliver variants, reply `done`, then wait again. Direct work is valid; optional native delegation needs a useful bounded purpose and leaves the controller as sole event responder. The overlay is a preview channel; additional permitted inspection may resolve a material issue but never substitutes for user acceptance.
5. On `steer`: read the message and `pageUrl`; do the work; `--reply steer_done`; poll again. No pickup ack.
6. On `accept` / `discard`: the poll script runs `impeccable live-accept`, acknowledges delivery, and prints `_completionAck`. Plain accepts/discards are terminal immediately; carbonize accepts stay recoverable until `impeccable live-complete --id EVENT_ID` runs. Finish that cleanup before polling again.
7. If interrupted, run `impeccable live-status` or `impeccable live-resume` before guessing. The journal under `.impeccable/live/sessions/` is canonical and replays unacknowledged work after a helper restart; the injected `live.js` re-attaches when the page reopens. Fall back to the direct-edit loop only when `impeccable live-resume` reports no active session, never because disconnects felt frequent.
8. On `exit`: run the cleanup at the bottom.

Process ownership: use native services for long-lived helper/app servers and finite jobs for event waits. Record each process started and its stop method. Consume delivered results before dispatching the next event; do not open duplicate waits or assume provider-specific timing characteristics.

Delivery policy: atomic single-edit delivery everywhere; do not switch a harness to progressive publishing unless its poll loop is known not to block on the extra calls.

Keep chat concise while communicating material scope limits, failures and decisions. Do not paste PRODUCT/DESIGN bodies unless requested.

## Poll loop

```
LOOP:
  <skill-base-dir>/scripts/impeccable live-poll   # finite wait using native completion delivery
  Read JSON; dispatch on "type"

  "generate"  → Handle Generate; reply done; LOOP
  "steer"     → Handle Steer; reply steer_done; LOOP
  "accept"    → Handle Accept; complete carbonize cleanup if required; LOOP
  "discard"   → Handle Discard; LOOP
  "prefetch"  → Handle Prefetch; LOOP
  "manual_edit_apply" → Handle Manual Edit Apply; reply done|partial|error; LOOP
  "variant_mount_failed" → Fix the variant files; reply done --file <path>; LOOP
  "timeout"   → LOOP
  "exit"      → break → Cleanup
```

`variant_mount_failed` means the browser could not render what you published (`variant`, module `url`, `error`). The user sees a persistent error card, not variants. Fix the variant files, then `--reply EVENT_ID done --file <manifest or source path>`; the browser retries on its own.

**Stream mode** (`--stream`, experimental) is optional only when the native interface reliably consumes incremental output and controls process lifetime. Finite event waits remain the simpler default.

## Start

```bash
<skill-base-dir>/scripts/impeccable live
```

Output JSON includes `{ ok, serverPort, serverToken, pageFiles, roots, hasProduct, product, productPath, hasDesign, design, designPath, hasSurfaceBrief, surfaceBrief }`. `projectRoot` mirrors `roots.appRoot`; reuse returned context. The current user brief and explicit corrections take precedence. Within that scope, DESIGN.md informs established visual decisions, PRODUCT.md durable product/voice context, and the surface brief surface strategy. Missing documents do not erase incumbent identity: inspect actual tokens, styles and siblings. Departure follows the user's redesign intent, not a helper default.

`serverPort`/`serverToken` belong to the small helper HTTP server (`/live.js`, SSE, `/poll`), not your dev server; the page URL is whatever origin serves a `pageFiles` entry.

For `config_missing` / `config_invalid`, read [live-setup.md](live-setup.md) to identify the effects. Set up only if the current request covers them; otherwise report the prerequisite without writing. Explain relevant `configDrift`; do not auto-expand injection targets beyond scope.

## Recovery commands

The append-only journal under `.impeccable/live/sessions/` is canonical durable state (not project source). When the chat was interrupted, polling was missed, the helper restarted, or the browser reloaded:

```bash
<skill-base-dir>/scripts/impeccable live-status      # helper state, active sessions, queued events; works with the helper down
<skill-base-dir>/scripts/impeccable live-resume --id SESSION_ID   # active snapshot, pending event, next safe action
<skill-base-dir>/scripts/impeccable live-complete --id SESSION_ID # canonical manual final acknowledgement after verified cleanup
```

Server restart rule: start `impeccable live-server` again, then poll; startup requeues unacknowledged events, so never ask the user to click Go again unless `impeccable live-resume` says no active session exists.

## Handle `generate`

**Replace mode** (default): `{id, action, freeformPrompt?, count, pageUrl, element, screenshotPath?, comments?, strokes?}`.

Use the actual `event.count` as `EVENT_COUNT` throughout planning, scaffolding and delivery; the interactive picker and agent-driven helper may expose different ranges. Three is only the request default, never a replacement for the returned count. Report a missing/invalid event count rather than inventing a session contract.

**Insert mode** (`event.mode === "insert"`): `{id, mode: "insert", count, pageUrl, insert: { position, anchor }, placeholder: { width, height }, freeformPrompt?, screenshotPath?, comments?, strokes?}`. No `action`; requires a non-empty `freeformPrompt` **or** annotations. `placeholder` is a soft size hint.

Speed matters; the user is watching the selected element. Reuse preflight metadata, minimize discovery calls.

### Insert mode branch

1. Read the screenshot if present (annotations only).
2. If `event.scaffold` is present, use it and do **not** run the helper again. Otherwise:

```bash
<skill-base-dir>/scripts/impeccable live-insert --id EVENT_ID --count EVENT_COUNT --position after \
  --element-id "ANCHOR_ID" --classes "class1,class2" --tag "section" --text "ANCHOR_TEXT"
```

`--position` ← `event.insert.position`; anchor flags map exactly like wrap's. The scaffold has **no** `data-impeccable-variant="original"`; variants are net-new HTML+CSS at `insertLine`. On source-preview targets the scaffold carries `sourceWritten: false` with `wrapperBlock` and `replaceEndLine < replaceStartLine` (an insertion): splice variants into `wrapperBlock` at the marker and insert at `replaceStartLine` in ONE edit, exactly as the wrap section describes. Decide the visitor mode from the surface and load [craft-floor.md](craft-floor.md) before writing net-new markup. Svelte targets follow the same component flow as wrap below (`mode: "insert"` in the manifest): each variant is a real single-root component under `componentDir` with no `data-impeccable-*` attributes; never edit the route during generation; accept splices the chosen markup into `sourceFile` mechanically. For non-Svelte targets, accept/discard removes the wrapper; the anchor is untouched.

### Replace mode (default)

### 1. Read the screenshot (if present)

`event.screenshotPath` is sent **only when the user annotated before Go**; it is a PNG of the element with annotations baked in. Read it before planning. When absent, start from `element.outerHTML`, computed styles and the prompt rather than adding a capture round by default. Use further permitted visual inspection when needed to resolve a material identity, layout or accessibility question; the requested departure scope, not missing annotations, governs what may change.

Annotation semantics: a comment's `{x, y}` is element-local and binds the text to the child under that point (a comment near the title is about the title). Comments and strokes are independent unless clearly paired. Strokes read by shape: closed loop = "this thing" (emphasis, not a clipping region); arrow = direction or movement; cross/slash = delete; scribble = emphasis or delete by context. If a stroke's intent is genuinely ambiguous and it changes the brief, ask one short question before generating; otherwise state your reading in one sentence.

### 2. Wrap the element

When `event.scaffold` is present, the helper already found the source and computed the wrapper; treat it as the successful output and skip the command. `event.scaffoldAttempted` with `scaffoldError` means preflight could not finish; use the command below.

**On source-preview targets `event.scaffold` carries `sourceWritten: false`.** The helper did NOT write the wrapper; it hands you `scaffold.wrapperBlock` plus the picked element's source range (`replaceStartLine`, `replaceEndLine`, 1-indexed). Write the wrapper **and** all variants in ONE edit: splice your variants into `wrapperBlock` at the "Variants: insert below this line" marker, then replace lines `[replaceStartLine, replaceEndLine]` with the result. A separate scaffold write reloads the framework before your variant write lands and strands the browser at 0/N. (`replaceEndLine < replaceStartLine` means insert mode: insert, remove nothing.) The `svelte-component` path never sets `sourceWritten`.

```bash
<skill-base-dir>/scripts/impeccable live-wrap --id EVENT_ID --count EVENT_COUNT --element-id "ELEMENT_ID" --classes "class1,class2" --tag "div" --text "TEXT_SNIPPET"
```

Flag mapping (keep separate, never collapse into `--query`): `--element-id` ← `event.element.id`; `--classes` ← classes joined with commas; `--tag` ← tagName; `--text` ← first ~80 chars of textContent, **every call**: it disambiguates repeated sibling components, without it wrap lands on the first match. If `event.pageUrl` implies the file, pass `--file PATH`. If `--text` still matches several candidates, wrap exits `{ error: "element_ambiguous", candidates, fallback: "agent-driven" }`: pick the right range from page context and write the wrapper manually per the fallback flow.

Success output: `{ file, insertLine, commentSyntax, styleMode, styleTag, cssSelectorPrefixExamples, cssAuthoring }` (plus the `sourceWritten: false` fields above on source-preview targets). Run directly with no preflight scaffold, it writes the wrapper itself and you splice variants at `insertLine`. `styleMode` controls how preview CSS must be authored. Treat it as a detected capability mode, not a framework guess: `scoped` means `@scope ([data-impeccable-variant="N"])` rules; `astro-global-prefixed` means explicit `[data-impeccable-variant="N"]` prefixes with the exact returned `styleTag`. Use `cssAuthoring` as the source of truth for the current file (styleTag, selector strategy, requirements, forbidden patterns); apply no framework-specific exception unless it says to.

For Svelte/SvelteKit targets, `impeccable live-wrap` returns `previewMode: "svelte-component"` with `file` pointing at a temporary `node_modules/.impeccable-live/<id>/manifest.json`, `componentDir` holding the variant components, and `sourceFile` the real route. The scaffold is AST-based: control-flow blocks (`{#each}`, `{#if}`) survive intact and a free each-collection crosses the contract as ONE structured prop (kind `collection`). The payload includes `componentStubMarkup` (the prop-substituted markup already written into every stub), so do not read the manifest or stubs back. EDIT `v1.svelte`, `v2.svelte`, ... in place; never delete and recreate them; keep the stub's control flow and `propContract` prop names; never flatten a loop into literal items. The stub `<style>` arrives seeded with the source rules that currently style the selection; restyle or delete them freely. On accept, any seeded rule your variant does not re-declare is REMOVED from the source (the preview never applied it, so the user approved a design without it). Use semantic class selectors, no `@scope`, no `data-impeccable-*`. Reply with `--file` set to the manifest path; the browser mounts the compiled components so Svelte HMR does not reset page state. Accept merges the chosen component back mechanically (markup restored to route expressions, CSS reconciled, params baked, indentation preserved); you have no post-accept cleanup on this path. When the selection contains constructs a detached preview cannot support (component tags, `bind:`/`use:`, await blocks, inline scripts, spread attributes), wrap returns the normal source-preview wrapper with `previewFallback: { from: "svelte-component", reason }`; just follow the returned shape.

**Params on component-preview paths go in a sidecar, never as an attribute** (Svelte parses `{` in attribute values as an expression). Declare them in `componentDir/params.json` keyed by variant number, using the schema from section 7:

```json
{ "1": [ {"id":"density","kind":"steps","default":"snug","label":"Density","options":[
    {"value":"airy","label":"Airy"},{"value":"snug","label":"Snug"} ]} ] }
```

Author the component `<style>` against `var(--p-<id>, default)` for `range`/`toggle` and `[data-p-<id>="…"]` for `steps`, wrapped in `:global(...)` so runtime knob values on the mounted root reach your rules.

**Fallback errors.** Wrap refuses to write into non-source files (generated, untracked): accepting into one is silent data loss. Three shapes, all with `fallback: "agent-driven"` (see **Handle fallback**): `file_is_generated` (your `--file` points at a generated file), `element_not_in_source` with `generatedMatch` (element only exists generated), `element_not_found` (likely runtime-injected).

### 3. Load the action's reference

`event.action` is `impeccable` (freeform): work from SKILL.md's design rules plus [craft-floor.md](craft-floor.md); decide the visitor mode from the surface; do not load a sub-command reference. Freeform is not a pass to skip parameters: follow the budget and freeform bias in section 7. Any other action (`bolder`, `quieter`, `distill`, `polish`, `typeset`, `colorize`, `layout`, `adapt`, `animate`, `delight`, `overdrive`): read `reference/<action>.md` before planning; its MUST params layer on top of the section 7 budget.

### 4. Plan EVENT_COUNT variants: identity first, then mode, then axes

Live runs on an existing surface; the brand is already chosen unless the user requested a departure. The job is the requested number of useful alternatives, not an automatic identity replacement. Four phases, in order.

#### Phase A: Extract the identity (non-skippable)

Sources in priority order: DESIGN.md's visual system fields; CSS custom properties (de-facto tokens); computed styles on the picked element and parent; sibling components' visual rhetoric. Write ONE sentence recording what is actually on screen: dominant surface and accent color (real values, not "warm"), the loaded font pairing, layout topology (stacked / side-by-side / grid / asymmetric / overlay), surface treatment (corners, borders, shadows, decoration density), and the voice tone read off the copy. Be specific; skip an axis rather than fabricate; do not name an aesthetic family (a conclusion, not data). This sentence is the **identity lock**: every variant must read as the same brand side by side. Absence of DESIGN.md is never an excuse.

#### Phase B: Pick mode (default vs departure)

**Default** preserves identity and varies expression within it. **Departure** changes identity only when the current request or prompt explicitly asks for that scope ("redesign this", "rebuild from scratch", "something completely different"); a stale critique or old note is not authorization. If the departure scope is materially unresolved, preserve the incumbent while resolving it rather than inventing a new brand.

#### Phase C: Plan the requested variants

**Default mode.** Preserve the identity sentence and vary a meaningful primary axis: **Hierarchy** (what commands the eye), **Layout topology** (stacked / side-by-side / grid / asymmetric / overlay), **Typographic system** (roles, scale, case/weight within available faces), **Color strategy** (roles and dosage using existing tokens), **Density**, or **Structural decomposition** (merge, split, progressive disclosure). For multiple alternatives, use distinct axes or combinations rather than duplicate treatments. New fonts, hues or aesthetic-family signals require the requested departure scope.

**Departure mode.** Derive each requested direction from the actual brand, current brief and product context, including PRODUCT.md when available; its absence does not block the work. Give multiple alternatives genuinely different structures or expressions without a fixed catalog. Name a concrete referent when useful ("a museum exhibition label system", not merely "clean and minimal"), but do not replace a precise user direction merely to force variety.

**In both modes, plan each variant's applicable parameter knobs** using the section 7 budget. Tiny elements may need none; do not force two or three knobs onto a leaf control.

#### Phase D: Squint test

**Default:** compare every variant against the Phase A lock; accidental palette, type-voice or rhetoric drift needs correction. Then compare the requested alternatives for meaningful differences; do not pad the count with duplicates. **Departure:** compare their concrete directions and structures, not only their names. When color or theme is the requested axis, vary the authorized color strategy meaningfully without violating pinned hues or supported themes. A single requested variant needs no invented comparison set.

**Action-specific invocations** must vary along the action's dimension:

- `bolder`: amplify a different dimension per variant (scale / saturation / structural change).
- `quieter`: pull back a different dimension (color / ornament / spacing).
- `distill`: remove a different class of excess (visual noise / redundant content / nested structure).
- `polish`: a different refinement axis (rhythm / hierarchy / micro-details).
- `typeset`: vary scale, hierarchy, role or weight within the available faces; vary pairings only when compatible with the identity and request.
- `colorize`: vary color roles, dosage or contrast strategy within the established palette; introduce different hue families only within requested departure scope.
- `layout`: different structural arrangement, not spacing tweaks.
- `adapt`: different target context per variant (mobile-first / tablet / desktop / print or low-data).
- `animate`: different motion vocabulary (cascade stagger / clip wipe / scale-and-focus / morph / parallax).
- `delight`: different flavor of personality (micro-interaction / typographic surprise / illustrated accent / sonic-or-haptic / easter egg).
- `overdrive`: different convention broken (scale / structure / motion / input model / state transitions); skip its "propose and ask" step, live is non-interactive.

### 5. Apply the freeform prompt (if present)

Apply `event.freeformPrompt` as the user's direction, preserving settled constraints unless the request changes them. Default mode explores within incumbent identity; departure mode explores the requested change. The current brief outranks style defaults and stored context. Ask only when a material conflict cannot be resolved from that authority; do not silently veto an explicit direction because DESIGN.md or a helper says otherwise.

### 6. Deliver variants

Complete HTML replacement of the original element per variant, not a CSS-only patch. Colocate preview CSS as a `<style>` tag inside the wrapper. **Atomic default:** CSS + all variants + parameter manifests in one edit at `insertLine`.

The example below illustrates the three-variant default; publish exactly `EVENT_COUNT` real variants and set the wrapper count accordingly, including for one or more than three.

```html
<!-- Variants: insert below this line -->
<style data-impeccable-css="SESSION_ID">
  /* rules matching cssAuthoring.rulePattern */
</style>
<div data-impeccable-variant="1">
  <!-- variant 1: full element replacement (single top-level element) -->
</div>
<div data-impeccable-variant="2" style="display: none">
  <!-- variant 2 -->
</div>
<div data-impeccable-variant="3" style="display: none">
  <!-- variant 3 -->
</div>
```

Replace the style opening tag with `cssAuthoring.styleTag` when the tool returns a different one. **Each variant div contains exactly one top-level element**, same tag as the original; loose siblings break outline tracking and accept. First variant visible, all others `display: none`. The browser's MutationObserver accepts atomic or progressive arrival; accepting an arrived variant fences the worker, so later publications are rejected.

For `styleMode: "scoped"`, author every `:scope` rule with a descendant combinator: the `@scope` boundary is the variant wrapper div, not your element, so a bare `:scope { ... }` styles a `display: contents` shell. Always step in (`:scope > .card`, `:scope .hero-title`). The fake test agent's CSS in the [repo agent template](https://github.com/pbakaus/impeccable/blob/8dac6ae7e020c43ab10ce9b41939f6fd42627b96/tests/live-e2e/agent.mjs) is a faithful template.

**JSX / TSX targets:** wrap `<style>` content in a template literal (CSS braces would parse as JSX), use `className=` / `style={{…}}`, keep `data-impeccable-*` attributes as plain strings:

```tsx
<style data-impeccable-css="SESSION_ID">{`
  @scope ([data-impeccable-variant="1"]) { ... }
`}</style>
<div data-impeccable-variant="2" style={{ display: 'none' }}>
  {/* variant 2 */}
</div>
```

The wrap script provides a single-rooted JSX wrapper with the marker comments inside; drop the block at the marker and the source stays valid TSX.

### 7. Parameters (composition-sized, 0-4 per variant)

Each variant can expose **coarse** knobs; the browser docks one control per parameter with zero regeneration cost (knobs drive a CSS variable or data attribute your scoped CSS is authored against). Wire an axis as soon as the user could plausibly mutter "a bit tighter" or "a touch more accent" without wanting a regeneration; micro-margins and one-off nudges are not parameters. Freeform bias: you chose the axes, so expose them; a hero with 0 params is almost always a mistake, and 1 is underweight unless the design is a genuine fixed point.

Budget scales with the element's VISUAL weight (count visual children, not DOM depth):

- **Leaf / tiny** (button, icon, bare heading): **0 params.**
- **Small composition** (simple card, labeled input, ≤ ~5 visual children): **0-1**.
- **Medium composition** (section, nav cluster, 6-15 children): **target 2**; 1 if simple.
- **Large composition** (hero, full region, 16+ children or sub-sections): **target 2-3, up to 4** when independent axes are all authored in CSS.

**Hard cap: four** per variant. For named sub-commands, the action reference's MUST params are non-negotiable when expressible; respect the cap, no duplicate knobs.

**Declare** on the HTML/JSX path as a wrapper attribute (component-preview paths use `componentDir/params.json` instead, same schema, keyed by variant number; see the wrap section):

```html
<div data-impeccable-variant="1" data-impeccable-params='[
  {"id":"color-amount","kind":"range","min":0,"max":1,"step":0.05,"default":0.5,"label":"Color amount"},
  {"id":"serif","kind":"toggle","default":false,"label":"Serif display"}
]'>
```

Three kinds: `range` (slider; drives `--p-<id>`; author `var(--p-color-amount, 0.5)`; fields min/max/step/default/label), `steps` (segmented radio; drives `data-p-<id>`; author `:scope[data-p-density="airy"] .grid { ... }`; fields options/default/label), `toggle` (drives both `--p-<id>: 0|1` and attribute presence; fields default/label). Reset on variant switch is a known limitation: each variant starts at its declared defaults.

**On accept**, the browser sends current values and `impeccable live-accept` writes them as a sibling comment: `<!-- impeccable-param-values SESSION_ID: {"color-amount":0.7} -->`. Carbonize cleanup bakes them: keep only the matching `steps`/`toggle` branch, drop the others, collapse `:scope[data-p-…]` to semantic rules; substitute `range` literals or update the var's default.

### 8. Signal done

```bash
<skill-base-dir>/scripts/impeccable live-poll --reply EVENT_ID done --file RELATIVE_PATH
```

`RELATIVE_PATH` is relative to project root; the browser fetches source directly if the dev server lacks HMR. Then poll again immediately.

### Aborting an in-flight session

If wrap or generation fails after the browser flipped to GENERATING, tell the **browser** so its bar resets: `<skill-base-dir>/scripts/impeccable live-poll --reply EVENT_ID error "Short reason"`. Never use `live-accept --discard` for this (pure file mutator, browser never sees it, bar sticks on dots); `--discard` is only source-side cleanup for a discard the browser itself initiated.

## Handle fallback

When wrap returns `fallback: "agent-driven"`, you pick the source file yourself; the goal is unchanged: `EVENT_COUNT` preview variants and the accepted one persisted where the next build cannot wipe it.

1. **Find where the element really lives** from the error payload: `element_not_in_source` + `generatedMatch` means the served HTML is generated, so find the generator's template or partial; `element_not_found` means runtime-injected, so find the rendering component or data source; `file_is_generated` resolves the same way. A purely visual change may belong in a shared stylesheet rather than a template.
2. **Preview in the served file**: manually write the same wrapper scaffold `impeccable live-wrap` produces (`<!-- impeccable-variants-start ID --><div data-impeccable-variants="ID" data-impeccable-variant-count="EVENT_COUNT" style="display: contents">…</div><!-- impeccable-variants-end ID -->`), substituting the actual session id and numeric count, into the file the browser loaded. Insert the requested variants and `--reply EVENT_ID done --file <served file>`. This edit is temporary; acceptance must still update true source.
3. **On accept, write to true source** (accept refuses generated files, so `_acceptResult.handled` is usually `false` here): structural change → template/component source; visual-only → the right stylesheet; content rendered from data → the data source or render logic. Then remove the temporary wrapper from the served file.
4. **On discard**, just remove the temporary wrapper.

## Handle `accept`

Event: `{id, variantId, _acceptResult, _completionAck}`. The poll script already ran `impeccable live-accept` deterministically and acknowledged delivery; the browser DOM is already updated.

- The accept event includes `pageUrl`; the poll script must forward it to `impeccable live-accept --page-url PAGE_URL` so accept-time cleanup only scrubs staged copy edits for the current page.
- `_completionAck.ok !== true`: do not poll yet. Run `impeccable live-status` / `impeccable live-resume`, finish cleanup manually if needed, then `impeccable live-complete --id EVENT_ID`.
- `handled: true, carbonize: false`: nothing to do; poll again.
- `handled: true, carbonize: true`: required cleanup below; `_acceptResult.todo`, `_completionAck.requiresComplete`, and the stderr banner all point at it.
- `handled: false, mode: "fallback"`: the session lived in a generated file; you already wrote true source in fallback Step 3; clean the temporary wrapper and poll.
- `handled: false, mode: "error"`: **do not hand-edit the file.** `source_locked`: rerun the same `impeccable live-accept` command (idempotent) until the publisher releases. `accept_receipt_conflict`: the session already resolved as `priorOperation`; run `impeccable live-status` and tell the user. Anything else: report briefly, run `impeccable live-status` first.
- `handled: false` without `mode`: manual cleanup: read file, find markers, edit.

### Required after accept (carbonize)

`carbonize: true` means the accepted variant is stitched into source with helper markers and inline CSS (so the browser renders with no gap). That stitch-in is temporary; rewrite it into permanent form before anything else, or dead `@scope` rules, wrapper divs, and marker comments accumulate across sessions. Five steps, synchronously, before the next poll:

1. **Locate the carbonize block** in `_acceptResult.file`: bracketed by `<!-- impeccable-carbonize-start/end SESSION_ID -->` with a `<style data-impeccable-css>` element; read the `<!-- impeccable-param-values -->` comment first when present, it drives steps 3 and 4.
2. **Move the CSS rules** into the project's real stylesheet (whichever already owns styling for the surrounding element).
3. **Bake param values while rewriting selectors**: retarget `@scope ([data-impeccable-variant="N"])` to real semantic classes; keep only the `:scope[data-p-<id>="VALUE"]` branch matching the chosen value; substitute `var(--p-<id>)` literals or update the var's default.
4. **Unwrap the accepted content**: delete the inner variant div (and on JSX the outer `data-impeccable-carbonize` div); drop `data-impeccable-params` and all `data-p-*` attributes.
5. **Delete** the inline `<style>` block, the param-values comment, both carbonize markers, and any `@scope` rules for non-accepted variants.

Then run `impeccable live-complete --id SESSION_ID` and verify `phase: "completed"` before polling again. The command is a gate, not a formality: it refuses with `error: "source_dirty"` plus findings while any live-mode leftover remains; fix and rerun (`--force` only for false positives).

## Handle `discard`

Event: `{id, _acceptResult, _completionAck}`. The poll script already restored the original and acknowledged `discarded`. Nothing to do unless `_completionAck.ok !== true`; then `impeccable live-complete --id EVENT_ID --discarded` and poll again.

## Handle `steer`

Event: `{id, message, pageUrl}`: page-level direction from the global bar's Steer control (typed or spoken), no element context, no variant cycling. Read `message`, inspect the page or files as needed, make edits or answer in prose. Reply `<skill-base-dir>/scripts/impeccable live-poll --reply EVENT_ID steer_done ["Optional short toast"]`, or on failure `--reply EVENT_ID error "Short reason"`, then poll immediately. No separate pickup reply; the Steer bar unlocks on `steer_done` or `error`.

## Handle `prefetch`

Event: `{pageUrl}`: fired once per route on first selection; the user is likely about to Go on a page you have not read. Resolve the route to its file (root `/` is usually the boot's `pageFile`; multi-page sites often map `/foo` to `public/foo/index.html`; SPAs map everything to one entry), read it, poll again. No `--reply`. If you cannot resolve it confidently, skip and poll.

## Handle `manual_edit_apply`

Event: `{id, pageUrl, batch: {entries}, evidencePath?, chunk?, repair?, deadlineMs}`.

The user clicked Apply for the event's listed edits; this covers those edits, not arbitrary repair or permission changes. The session controller owns event waits and final replies.

Apply directly, or use justified optional native delegation with [manual-edit-applier.md](degraded/manual-edit-applier.md) as a prompt reference. Pass cwd, target, event id, page URL, batch, evidence, actual deadline and result contract. The reference does not register a role, choose a model or guarantee isolation. A delegated editor must not independently poll or reply.

If `repair` is present, the previous Apply changed source but final validation failed. Fix the current source and return the same canonical JSON result; do not roll files back yourself. The browser will ask the user before any rollback.

After source edits finish, reply exactly once with `<skill-base-dir>/scripts/impeccable live-poll --reply EVENT_ID done --data '{"status":"done","appliedEntryIds":["8hexid"],"failed":[],"files":["src/page.html"],"notes":[]}'`. Use `status:"partial"` or `status:"error"` with `failed[]` when not every entry applied. Then poll again. Never reply without the event id; `--reply done --file ...` is invalid for manual Apply.

## Exit

The user stops live mode by saying so in chat, closing the tab (SSE drops; poll returns `exit` after 8s), or the browser's exit button. On `exit`, kill any still-running background poll, then clean up.

## Cleanup

```bash
<skill-base-dir>/scripts/impeccable live-server stop
```

Stops the helper and runs `impeccable live-inject --remove` to strip the injected script (use `stop --keep-inject` to keep it for a quick restart; `.impeccable/live/config.json` persists as project config). Then search for and remove any leftover `impeccable-variants-start` wrappers and `impeccable-carbonize-start` blocks.

## First-time setup

When configuration is missing/invalid, relevant drift needs resolving, or `cspChecked` is absent, read [live-setup.md](live-setup.md). It describes optional helper formats and effects; missing state is not authority to write configuration, expand injection, weaken CSP, install dependencies or launch services.
