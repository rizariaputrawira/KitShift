# Marketing-site redesign: preserve behavior, improve deliberately

Use for a requested redesign or upgrade of an existing marketing site, landing page, portfolio, or editorial surface. Impeccable remains the workflow/readiness owner. This reference adds a bounded incumbent audit; it is not a duplicate audit mandate for every UI task.

## Establish the actual scope

Determine from the request whether this is a refinement that preserves the established identity and structure, or a broader visual/content overhaul. Do not infer a replacement from a request to polish. Read relevant routes, components, styles, project design guidance, supplied content, and installed dependencies before proposing changes. Record important existing behavior and constraints so a visual change does not silently remove them.

## Inspect the real surface

Use the available authorized means to inspect affected pages and their source. Check only relevant areas, including:

- **URLs and routing:** affected paths, internal destinations, anchors, redirects or route behavior relevant to the change. No dead `#` links or invented destinations.
- **Metadata and discoverability:** page title and description, canonical or social metadata where the project uses them, headings and semantic structure, and existing robots/sitemap conventions if relevant. Do not promise ranking outcomes.
- **Navigation:** destinations, current-location cues where applicable, keyboard access, narrow-screen behavior, and whether menus actually open and close.
- **Analytics and consent:** preserve existing instrumentation and consent boundaries. Do not add tracking, alter event semantics, or claim analytics behavior without evidence and authorization.
- **Content and assets:** preserve accurate claims, names, media rights/provenance, and brand identity. Flag unsupported assertions; do not fabricate replacement proof.
- **Functions and states:** forms, links, search, media controls, and other affected interactions. Check applicable success, empty, loading, error, focus, and disabled states. Preserve working behavior unless the request explicitly changes it.
- **Accessibility and responsive behavior:** semantic landmarks, headings, labels, contrast, focus visibility, keyboard operation, meaningful image alternatives, zoom/text reflow, and narrow viewport content access, as applicable.

## Make and report bounded changes

Prefer targeted improvements that meet the requested outcome while retaining the incumbent stack and functioning routes. Reuse existing assets, components, tokens, and dependencies. A missing external service, asset, or permission is a blocker to that particular proof or change, not a reason to fake it.

After implementation, inspect the changed surface at relevant viewport sizes and exercise affected controls when available. Separate source inspection from browser/runtime checks; list what was actually checked and what remains unverified. Do not claim SEO gains, analytics correctness, accessibility conformance, or preserved behavior solely from reading source.
