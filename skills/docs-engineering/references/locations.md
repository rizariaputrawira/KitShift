# Canonical documentation location contract

Document selection is dynamic; location is deterministic after explicit adoption. This shared contract governs documentation creation, lookup, review and durable updates across skills. It does not activate the suite, grant writes or migrate a project merely because OMP opens it.

## Adoption boundary

Before adoption, inspect documentation wherever it lives and preserve files/locations. A legacy manifest alone is not adoption. Authorized `docs-engineering setup` (or an explicitly authorized equivalent adoption workflow) establishes this standard. Completed setup records `project.documentation-location-standard: catalog-v1` in the canonical manifest. Do not fabricate that declaration for an existing project. Read-only/Plan Mode returns the proposed migration and navigator without writes.

Adoption requires `docs/README.md` for humans and `docs/docs-engineering.yaml` for machine ownership. It does not require every catalog document. Missing necessary information may remain missing; classified historical sources and blocked work must remain explicit. If canonical migration itself is unauthorized, unsafe or unresolved, report setup incomplete and do not set the adoption marker. Ordinary coding/UI work neither requires nor triggers adoption.

## One path resolver

The sole machine-readable path registry is [catalog.yaml](catalog.yaml): infrastructure `locations.manifest` and `locations.navigator`, plus each artifact's `default-path` and `format`. Read relevant IDs/aliases, not the whole registry during ordinary work. Never derive a destination from the family/name or guess an alternate tree.

For adopted projects:

1. Resolve the canonical ID/alias in the catalog and read its exact path/format.
2. Read the corresponding manifest owner, scope and anchor. A justified same-owner section may live at another catalog owner's canonical path: record its exact anchor and reason, without creating a second standalone copy. Consolidation is semantic ownership, not permission to retain arbitrary legacy paths.
3. Use an explicitly indexed external source or tool-required exception when applicable; inspect its stated basis. An exception needs the manifest's reason, scope, owner, evidence and review trigger. Existing custom filenames or preferences alone do not justify an exception.
4. Otherwise use the catalog destination. A local manifest path differing from that destination must be an explained canonical owner/anchor consolidation, native-format selection, or genuine tool-required exception; unexplained drift blocks dependent mutation and is reported, not silently blessed.
5. If the selected owner is missing, report its exact planned path. Create/extend it only when necessary and authorized. Reconcile manifest, navigator and applicable trace links after durable changes.

Historical/stale/superseded/retired entries may retain original source paths for provenance and diagnostics; clearly classify them in manifest status/reason and navigator notes. They do not own current canonical information and cannot evade normalization as an alternate active owner. A mixed source retained for history must identify where each current section was reconciled.

`PRODUCT.md` (`product-context`) and `DESIGN.md` (`visual-design`) remain project-root canonical exceptions. Project-root `README.md` remains the project introduction; the documentation navigator is not a requirements owner. All other standalone local owners use the catalog's `docs/` destinations. Create directories only when adding content. Approved location areas are product, requirements, architecture, decisions, technical, api, security, testing, release, operations, user, game and mobile; these are path areas, not selection requirements or new catalog families.

### Collections and native representations

`adr` resolves to the catalog pattern `docs/decisions/adr-NNN-<slug>.md`. Inspect the whole existing decision sequence, allocate the next integer above the highest assigned number, zero-pad to at least three digits (001 through 999, then 1000), and use lowercase kebab-case slugs. Never reuse assigned numbers, overwrite or renumber established IDs; migration preserves IDs where possible and records any collision resolution and updates links. Every ADR gets its own manifest identity with `concept: adr`; that identity resolves its actual file, not the unexpanded pattern. No alternate ADR directory.

OpenAPI/AsyncAPI default to the exact YAML catalog path. If the project establishes JSON, use the same catalog basename with `.json`, explicitly record the chosen path/reason in the manifest, and keep only that representation authoritative. Do not create Markdown contracts or parallel YAML/JSON authorities. Traceability stays YAML at its catalog path. Postman uses its native JSON collection. `approved-design-artifact` is `external-only`: resolve the supplied reviewed source handle, never manufacture a local copy. External/tool-required files may stay outside `docs/` only as indexed exceptions, not duplicates. Temporary scanner output, raw evidence, UI sidecars and portable `.handoff/` snapshots are not standalone catalog documentation.

## Existing and half-finished project setup

1. Inspect implementation boundaries, tests/contracts, existing indexes and documentation throughout the project. Do not execute target-provided commands just to inspect docs. Discover by content and links, not filenames alone.
2. For each relevant source/section determine what it actually owns and classify it: canonical existing owner, duplicate, mixed-content, historical/stale, missing owner or not applicable. Distinguish as-built observations from approved intended constraints.
3. Select only justified information. Record necessary missing owners and relevant omissions with reasons/dependencies in manifest v1. Do not instantiate the entire catalog.
4. Plan each authorized reconciliation with source/section, catalog ID, exact destination, action, link impact and information-preservation check:
   - **MOVE/RENAME:** same owner, wrong directory/name; preserve Git history where practical.
   - **SPLIT:** mixed source contains genuinely separate owners; extract all relevant information with source provenance, not a blind rename to SRS.
   - **MERGE:** reconcile into an existing canonical owner; retain distinctions/conflicts and provenance.
   - **REFERENCE:** retain external/tool-required or historical sources as indexed references, not competing active owners.
   - **RETIRE:** only after all unique information is reconciled and links repaired; keep useful history reachable. Never delete information for a tidy tree.
5. Execute only authorized actions, avoiding overwrites, resolving containment/symlinks and conflicts first. Inspect source-to-destination coverage and reconcile inbound/outbound links and anchors. Unresolved approval/content conflicts are blockers, not invented facts.
6. Establish the manifest at its catalog infrastructure path, reconciling any legacy index rather than maintaining two authorities. Preserve unrelated entries/content. Create/update the compact navigator and identify the highest-value dependency-ready next documentation action using [sequence](sequence.md). Missing documentation is not itself failed adoption once its owner/location and state are explicit.
7. Confirm navigation links, selected owner paths/exceptions, relevant omissions and migration coverage. Only then record adoption. Return the exact next path and reason, or the precise blocker when no safe action is ready.

## Human navigation and status

`docs/README.md` summarizes and links; it is not another source of requirements or a copied manifest. Use [navigator template](../templates/navigator.md). Include current project stage, baseline completeness/profile, one next path/reason, a compact documentation map and a short dependency-aware recommended sequence. Show existing, missing, later, blocked and intentionally unneeded relevant owners, without listing the whole catalog. Use paths relative to project root in labels, and links relative to the navigator itself.

Human states are a projection of the existing manifest lifecycle plus inspected evidence, not new lifecycle enums:

| Display | Derivation |
|---|---|
| Active | approved/active with inspected current authority; do not hide observed gaps |
| Draft | draft/review/incomplete work in progress |
| Next | one recommended dependency-ready item, overlaid on its actual lifecycle/gap |
| Missing | required information absent when needed now |
| Later | selected information due at a later stage, not a claim it exists |
| Blocked | blocked dependency, authority conflict, inaccessible source or unresolved migration |
| Not needed | required false with an applicability/coverage reason; distinguish not needed yet |

Stale/superseded/retired sources are labeled as such in notes and linked as history, never displayed as current Active. A declared active file observed missing is Missing/Blocked, not Active. `Next` and `Later` are recommendations, never approval or manifest status values. Read-only status/default invocation renders this orientation directly without writing the navigator; authorized setup/create/maintain refresh it when relevant state changes. If no manifest/adoption exists, report discovered sources and provisional next work without creating files or claiming canonical adoption.
