# Mobile image-generation procedure

Modified adaptation of Leonxlnx/taste-skill. Copyright (c) 2026 Leonxlnx.
See [source and modifications](../SOURCES.md) and the full [MIT notice](../LICENSE.taste).
This is a lazy platform procedure under ui-image-generation, not a separate public skill.

Use this procedure only for requested mobile app screen/flow images, after reading the [entrypoint](../SKILL.md). The entrypoint owns image-only scope, platform selection, tool/permission checks, and reporting unavailable deliverables. These instructions do not authorize app implementation or project setup.

## 1. Map the requested screens and presentation

Identify the actual app/product context, requested platform, screens, states, supplied content/assets, output count, and presentation. Resolve the brief and references before asking about material missing choices.

Distinguish screen count from image count, and independent screens from a connected flow:

| Request | Output interpretation |
| --- | --- |
| Generate five separate screen images | Five outputs for the specified screens/states, not a single combined board |
| Generate one board showing five supplied screens | One image containing those five screens, not five additional files |
| Generate profile and settings concepts | Two requested screen concepts; do not invent intermediate screens or claim a specified transition between them |
| Make a premium fitness app | This phrase alone establishes neither image-generation authority, screen count, platform, nor phone framing; use the surrounding request and existing product evidence |

For a requested flow, map its supplied order, actions, and state changes. For independent screens, preserve the shared product system without forcing a journey. Do not add onboarding, authentication, permissions, checkout, or success screens merely because a category example suggests them.

Raw screen, framed device, or combined-board presentation follows the request. Orientation, dimensions, crop, visible system chrome, and frame treatment are output decisions—not a universal visible-phone requirement.

**Done:** requested screen/state subjects and image packaging are mapped, with any material unknowns or capability limits explicit.

## 2. Establish platform and product continuity

Use the actual platform/reference evidence: iOS, Android, or an intentionally neutral concept. Do not pick iOS merely because the brief says “premium,” mix incompatible platform conventions accidentally, or claim a generic visual concept is a native implementation.

| Platform consideration | Inspect where relevant |
| --- | --- |
| System regions | Supplied safe-area/status/home-indicator/navigation regions and whether system chrome belongs in the requested image |
| Navigation | Existing tabs/bottom navigation, stack/drill-down relationships, sheets, app bars, segmented controls, and action priority |
| Shared components | Button/field/list/card families, type roles, icon weight, palette, radius, spacing, and surface treatment |
| State continuity | User/content/cart/progress state carried across an actual requested flow; intentional differences for unrelated screens |
| Presentation | Raw versus framed screens, device scale/margins when framed, orientation, and content visibility |

Keep a compact set of established relationships for multi-screen work; an internal “design bible” is not a new project document or authority to invent missing product facts.

Preserve approved screen titles, labels, balances, prices, units, legal/permission wording, and qualifiers. Generated concept names, avatars, testimonials, metrics, charts, product details, and transaction data are not verified facts. Use supplied information or clearly identified hypothetical material only for an authorized concept. Mark unclear text rather than guessing.

**Done:** the known platform/product relationships, authoritative content, and consequential unknowns are explicit without introducing unrequested states or facts.

## 3. Compose the requested mobile concepts

Arrange the required content with readable hierarchy, meaningful grouping, appropriate action emphasis, and awareness of the requested system regions. Preserve real labels and copy; do not impose one-to-three-line headlines, shorten approved wording, or remove useful metadata merely to make the image appear cleaner.

Use the following as optional vocabulary, not required visual treatments or a demand for novelty:

| Dimension | Possible directions when appropriate |
| --- | --- |
| Theme and palette | Light, dark, monochrome, warm neutral, expressive consumer color, wellness, or editorial; follow the actual brand |
| Typography | System-like, grotesk, humanist, or expressive display with readable body/labels and a coherent type hierarchy |
| Structure | List/utility, modular cards, dashboard, media, profile, commerce, chat, or calm journal/habit layout |
| Imagery | Supplied product/profile media, editorial/lifestyle photography, illustration, covers, shelves, or no imagery for a utility screen |
| Background and materials | Flat surfaces, paper, subtle grain, pattern, tonal depth, image haze, or restrained layering |
| Image-backed text | Clear image area, scrim, fade, mask, or compatible surface when needed for readability; none is mandatory |
| Components | Settings cells, tabs, segmented control, action sheet, message bubbles, checkout summary, progress module, mini player, or collection grid when in scope |
| Icons and accents | Existing compatible icon system, product-specific illustrations, line/geometric accents, or no decorative assets |
| Media treatment | Edge-to-edge, bounded hero, repeatable product cards, editorial crops, profile header, or deliberate mixed proportions |
| Rhythm and density | Compact information, spacious editorial, layered media, or consistent repeated structure based on the content |

Stable crops/proportions matter when a repeated component calls for them, not because every image must have a fixed frame. Use visible phone mockups only when they match the requested presentation; if framed, keep their platform, scale, margins, and treatment coherent without obscuring the screen.

Do not ban a compatible icon library, purple/blue palette, glass, flat background, dense list, repeated screen pattern, or nested grouping by category. Judge whether the choice serves the actual product and legibility. Texture, imagery, decorative assets, and screen-to-screen variation are optional, not conditions for completion.

Category hints remain subordinate to the brief: transaction clarity for fintech, supplied progress information for fitness, task hierarchy for productivity, meaningful media for social, and product/checkout clarity for commerce. They do not add metrics, flows, or screens.

If the brief calls for motion-implied art direction, a static frame may suggest the specified state. It does not prove gestures, animation, keyboard handling, native controls, safe-area behavior on hardware, or functional navigation.

**Done:** every requested screen/state has a product/platform-compatible composition traceable to actual content, without mandatory frames, novelty, or extra UI.

## 4. Generate within the established tool contract

Inspect the current permitted tool's supported assets, size/orientation/format, output count, and delivery method. Translate the screen/output mapping, authoritative content, platform evidence, and selected direction into the generation request.

Use the chosen permitted service within applicable asset-sharing authority. Do not invoke OpenDesign unless requested. Do not silently change services or treat access to a supplied file as permission for unrelated publication or sharing.

Generate the specified raw screens, framed screens, or combined board; preserve the requested states and relationships. Do not automatically add mockups, alternate views, detail renders, or screens. Observe actual tool results and map returned images to the requested outputs; report missing deliverables through the entrypoint rather than counting prompts or prose as images.

**Done:** requested outputs have observed generation results, or each unavailable image and exact prerequisite is identified.

## 5. Inspect actual returned screens

View the returned images with an available permitted inspection method. Compare against:

- Screen/state subjects, image count, separate versus combined organization, presentation, and metadata-supported dimensions/format.
- Authoritative text, labels, units, prices/balances, supplied assets, and absence of invented claims or misleading product evidence.
- Visible hierarchy, reading order, wrapping, spacing, action emphasis, apparent system-region placement, contrast concerns, and media crop.
- Platform/component consistency and, for an actual requested flow, supplied order and state continuity.
- Frame/platform/scale/margins only when device frames are part of the requested output; absence of a frame is not a defect for raw screens.

Flag illegible, substituted, or misspelled text and unwanted artifacts. Distinguish visible observations, measurements with their method/coordinate system, and uncertainty. Displayed image pixels are not automatically device points, CSS pixels, or proof of an on-device touch target.

If image inspection is unavailable, identify the uninspected output and limitation. An internal quality checklist is not observed image proof; a visually plausible screen does not establish implemented flow, accessibility conformance, real-device safe areas, app build success, or working controls.

**Done:** every returned output is compared with the requested content/presentation, with mismatches and unverified properties recorded.

## 6. Correct named failures without expanding the brief

When an observed output fails a named requirement and correction is feasible within the authorized generation scope and current tool limits, target that failure while preserving successful screens and shared choices. Reinspect replacements.

Do not run an open-ended regeneration loop until the app feels “premium,” add texture or icons because they seem absent, or reject a requested raw screen for lacking a mockup. Do not fix legibility by rewriting approved copy or adding another screen without applicable authority. Use an in-scope composition adjustment where possible; otherwise identify the unresolved requirement.

Do not invent a flow or additional state to make independent screens feel connected. If a material platform/presentation/service decision changes, obtain the applicable authority before dependent generation.

**Done:** observed in-scope failures are corrected and rechecked where possible; unresolved outputs/requirements remain explicit rather than disguised by extra screens or subjective style claims.

## 7. Deliver the requested images

Return actual images through the tool's supported delivery surface, identifying each screen/state or combined board and the delivered versus requested count. Report presentation, any material revision, remaining defects, unavailable outputs, and inspection limits in the user's requested format.

Identify synthetic concepts as concepts, not screenshots of a working app or real customer/transaction evidence. Do not substitute text or app code for requested images or claim unobserved delivery, implementation, or behavior.

**Done:** the user can identify every delivered image, its subject/presentation, and all missing or materially imperfect requested outputs without confusing artwork with a functional app.
