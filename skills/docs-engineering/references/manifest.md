# Manifest v1 contract

## Discovery and ownership
Discover existing manifests through project instructions/indexes; multiple independently authoritative manifests require an explicit ownership decision. Invalid/ambiguous manifests block dependent mutation and authority claims, not safe read-only reconnaissance. An absent manifest produces provisional context, not proof no constraints exist.

Explicit authorized setup adopts [locations](locations.md). Completed adoption records `project.documentation-location-standard: catalog-v1` at the catalog's manifest path and establishes its human navigator. A legacy manifest without this declaration retains pre-adoption semantics; do not migrate it automatically. Normalize authorized existing owners by content, preserving information/links. An unresolved canonical migration means setup is incomplete, not an alternative adopted location convention.

After adoption resolve exact artifact paths/native formats through the catalog and shared location contract; no family-derived fallback. Reuse/extend sufficient information, permitting explained canonical owner/anchor consolidation and indexed external/tool-required exceptions, never arbitrary legacy-tree exceptions. Choose a standalone file only for genuinely distinct ownership/audience/lifecycle. Duplicate ownership is the same concept/overlapping scope asserted by competing sources even at different anchors.

## Authored YAML subset
Use two-space block mappings/sequences, string mapping keys, single-line scalars and empty `[]`/`{}` only. Quote dates, IDs and potentially implicitly typed strings. Contentful flow collections, multiline keys/scalars, tags, anchors, aliases, merge keys and duplicate mapping keys are unsupported by this authored convention. These are validation requirements, not proof of a bundled precheck or parser. When authorized, use an actually available project checker and name its command/source and checks performed; do not install tooling merely because this reference was loaded. Otherwise report manual source checks and unchecked invariants explicitly. Parsing success alone is not schema, duplicate-key or semantic verification. Existing unsupported YAML remains read-only until authorized conversion or an applicable project-supported handling decision resolves dependent edits.

## Typed fields
All string values below are nonempty unless explicitly described otherwise; lists contain strings unless a record shape is given. Newly authored data uses only these fields. The classification enums are in [profiles](profiles.md#classification).

| Field | Type and requirement |
|---|---|
| `version` | Required integer `1` |
| `project` | Required mapping |
| `project.types` | Required nonempty list of classification type enums |
| `project.platforms` | Required list of platform enums; empty allowed |
| `project.capabilities` | Required list; known capabilities or project-defined strings whose meanings are explained in security rationale or referenced owner context; empty allowed |
| `project.profile` | Required lean/standard/controlled/regulated |
| `project.criticality` | Optional low/normal/high/unknown; default unknown |
| `project.security` | Required mapping with required `data-sensitivity` public/internal/sensitive/unknown, `exposure` offline/internal/internet/unknown and `rationale` string citing inspected basis |
| `project.stage`, `project.deployment` | Optional strings; unknown can be explicitly recorded |
| `project.documentation-location-standard` | Optional exact string `catalog-v1`; set only after explicit authorized completed adoption; absent means legacy/pre-adoption |
| `project.obligations` | Optional list of actual named source/obligation strings; unknown interpretation stays explicit |
| `documents` | Required mapping keyed by canonical catalog ID or explained project-specific ID; an empty map cannot support completeness claims |
| document `required`, `reason` | Required boolean and string for both selection and relevant omission |
| document `concept` | Optional known canonical ID for a project-specific historical identity; not a second active owner |
| custom document `purpose`, `owner` | Required strings for a noncatalog concept, including deliberate omission; inherited historical concepts need no invented custom purpose. An unlocated canonical omission may omit owner; any supplied owner is a nonempty string |
| document `path`, `source` | A required entry has exactly one: project-relative planned path string or external source mapping. A non-required omission has neither unless tracking an existing source; then exactly one |
| document `owner`, `status`, `scope` | Required for selected or existing-source entries: owner string, lifecycle enum, list of feature/platform/component strings; empty scope explicitly means project-wide |
| document `status` | missing/draft/review/approved/active/incomplete/stale/blocked/superseded/retired |
| document `anchor` | Optional local anchor string separate from path; not permitted as a substitute for a path |
| document `use-for` | Optional task-tag list; seeds relevance, never authority |
| document `depends-on` | Optional list of required information-entry IDs; each resolves in this manifest; acyclic; related links do not block |
| document `related` | Optional list of existing entry IDs; nonblocking references |
| document `superseded-by` | Required resolving entry ID for superseded status; distinct successor; supersession graph acyclic |
| document `source` | Mapping with required `kind` and `locator` strings; optional `revision`, `reviewed-at`, `approval-evidence` strings |
| source `kind` | opendesign/https/project-artifact only; locator rules below |
| document `approval` | Optional mapping; when present requires `by`, `at`, `evidence` strings. Required for controlled/regulated approved entries and activation subject to an identified approval obligation |
| document `validation` | Optional mapping; when present requires `checked-at`, `basis`, `evidence` locator list and `result` verified/unverified/failed. Verified requires nonempty inspected evidence; unverified/failed may record `[]` without any verification upgrade |
| document `standards` | Optional list of exact edition/release/source identifiers; applicability rationale remains in owning requirements/obligation record |
| document `update-triggers` | Optional list of observable source/behavior/platform/evidence changes requiring review |
| document `exceptions` | Optional list of mappings each requiring `reason`, `scope` string list (empty means project-wide), `owner`, `evidence` locator list (empty records an evidence gap), `review-trigger`; risk-bearing exceptions cannot waive missing authority or obligations |
| `traceability` | Optional contained local path#anchor to an existing map or a declared planned owner; alternatively a reviewed external handle/HTTPS locator. Adopted local maps resolve the catalog's traceability-map through [locations](locations.md) |

No current-agent/current-wave/execution-state fields. Optional fields are absent, never null. Use exact field types, not arbitrary alternate lists/records. Approval obligations originate in project instructions or named obligations, not an invented approvalRequired flag.

## Source and path invariants
`opendesign` uses the actual supplied opaque project/artifact handle; `https` requires a valid HTTPS URI; `project-artifact` identifies an existing project artifact handle. No commands, arbitrary schemes, inline credentials or credential-bearing query/fragment data. The authored locator convention conservatively rejects fragment assignments/separators (`=`, `&`, including percent-encoded forms), bearer/JWT shapes and malformed percent encoding; ordinary source anchors remain valid. Report how these checks were actually performed and any coverage limits; this instruction-only pack supplies no automatic enforcement. Do not invent MCP tool names, fetch automatically or start services. Missing revision/review evidence means freshness unknown; inspect supplied approval evidence rather than trusting its label.

For local paths reject absolute/drive/UNC, traversal `..`, empty segments, NUL/control characters, leading home shorthand (`~`, `~/`, `~user`) and active-home configuration references. Preserve spaces and ordinary repository Unicode names, including unambiguous literal `./~/...`. Resolve real containment at each read/write, including the existing ancestor for planned missing targets and symlink targets; lexical prefix is insufficient. Anchors must exist when a file exists. Code symbols use available LSP navigation; inaccessible navigation is incomplete coverage, not a fabricated match. Missing file is observed missing; unreadable is a read/coverage error, never missing or clean. Locators are identifiers, not execution or network authorization.

For adopted manifests, additionally validate each catalog owner against [locations](locations.md#one-path-resolver), including expanded ADR identities, supported native JSON selection, explained canonical anchor consolidation and genuine tool-required exceptions. Project-specific IDs must resolve their `concept` where they are instances of a catalog artifact; a custom concept has an explained owner/purpose and a deterministic explicit path within the approved taxonomy. No competing path registry. `approved-design-artifact` uses `source` only. Adoption never relaxes containment or evidence checks.

A traceability external locator must match an existing manifest document source record of a supported kind, with revision and review date plus locally accessible inspected source evidence from verified document validation or source approval evidence. Every locator used by this evidence check is contained and inspected. Unavailable/unreviewed records are blocked; an opaque missing handle is never accepted as a planned local filename. A local trace pointer uses the same containment and locator/anchor rules. An existing map's anchors must resolve; a missing local map is a valid plan only when its path and anchor match a declared local document owner, including an explicit missing state. Plan validity leaves missing/incomplete availability explicit and establishes no inspected authority, coverage or verified result. Actual trace-node source resolution and coverage claims still require available inspected sources; validate the actual map separately. These checks establish source accessibility and recorded review basis, not trace-node correctness, semantic completeness or runtime verification. No fetch is authorized.

## Authority and evidence
Lifecycle status and observed status are separate. A declared active file can be observed missing, stale, incomplete or conflicted. Active/approved can constrain design only with inspected provenance, relevant scope and established source freshness. Draft/review/incomplete are proposals; historical or stale sources retain their risk and diagnostic relevance but are not silently current constraints.

Document validation reviews the engineering knowledge against its stated source basis. It is not runtime verification: an approved requirement can constrain design before implementation and tests exist. Runtime acceptance is evaluated through trace/test/evidence records. Neither a file, timestamp, digest, worker assertion nor approval label proves implementation compliance. A changed digest/revision triggers review, not a contradiction verdict without content inspection. Controlled/regulated approval requires actual identities, dates and evidence; never fabricate them. Lean/standard activation may follow the documented project review convention without signatures.

Setup reruns preserve unrelated entries and user content. Recompute only classification/selection justified by fresh inspected facts; unknowns never become guesses. Maintain changes only affected owners/links after observed change evidence; absent execution evidence permits proposed impact but not verified status.

## Lean local example
These complete examples are fictional schema examples, not observed project approvals or test results. A real invocation substitutes inspected sources and keeps missing facts explicit.
The examples below are legacy/pre-adoption manifests (no adoption declaration); their historical paths illustrate the existing v1 shape, not adopted location defaults. Authorized setup reconciles them through the catalog before recording adoption.

```yaml
version: 1
project:
  types:
    - cli
  platforms:
    - linux
  capabilities:
    - offline
  profile: lean
  criticality: low
  security:
    data-sensitivity: public
    exposure: offline
    rationale: "README and formatter entrypoint describe public text input with no network, accounts or durable sensitive state. File input still requires path/error acceptance."
  stage: maintenance
  deployment: "Local executable"
documents:
  srs:
    required: true
    reason: "Existing README acceptance section owns CLI behavior; no separate SRS file is justified."
    path: README.md
    anchor: acceptance
    owner: "CLI maintainer"
    status: active
    scope: []
    use-for:
      - formatting
    validation:
      checked-at: "2026-10-03"
      basis: "README.md and src/format.go inspected at example-revision-1"
      evidence:
        - "docs/review.md#acceptance-review"
      result: verified
    update-triggers:
      - "Input, output or error semantics change"
  user-documentation:
    required: true
    reason: "Existing usage section covers installation and operation."
    path: README.md
    anchor: usage
    owner: "CLI maintainer"
    status: active
    scope: []
  prd:
    required: false
    reason: "Product outcomes are adequately captured by the existing README purpose section."
  security-strategy:
    required: false
    reason: "Inspected offline scope has no cross-owner security program; applicable file-handling invariants remain in README acceptance and tests."
```

## Controlled and external example
The fictional IDs, approvals and locators below illustrate shapes only. They must never be imported as real evidence. Shared requirements and design-system ownership remain singular; external composition is distinct. A historical document has its own identity and canonical concept.

```yaml
version: 1
project:
  types:
    - mobile-application
  platforms:
    - android
    - ios
  capabilities:
    - authentication
    - sensitive-data
    - offline
  profile: controlled
  criticality: high
  security:
    data-sensitivity: sensitive
    exposure: internet
    rationale: "Example product baseline identifies account credentials, synchronized personal records and internet authentication."
  stage: design
  deployment: "Android and iOS clients with an existing account service"
  obligations:
    - "Example client contract section 4 requires product-owner approval before activation"
documents:
  shared-mobile-requirements:
    required: true
    reason: "One owner governs shared offline behavior and acceptance."
    path: docs/requirements/mobile.md
    anchor: shared-offline
    owner: "Example product owner"
    status: approved
    scope:
      - offline-records
    approval:
      by: "Example owner identity in supplied review record"
      at: "2026-10-02"
      evidence: "docs/reviews/product.md#offline-approval"
    validation:
      checked-at: "2026-10-03"
      basis: "Example product baseline revision 7 and requirements revision 3"
      evidence:
        - "docs/reviews/product.md#requirements-review"
      result: verified
  android-platform-requirements:
    required: true
    reason: "Android interruption and storage deltas need platform-specific acceptance."
    path: docs/requirements/android.md
    owner: "Example Android owner"
    status: draft
    scope:
      - android
      - offline-records
    depends-on:
      - shared-mobile-requirements
  ios-platform-requirements:
    required: true
    reason: "Keychain and iOS interruption deltas differ; common behavior stays in the shared owner."
    path: docs/requirements/ios.md
    owner: "Example iOS owner"
    status: incomplete
    scope:
      - ios
      - offline-records
    depends-on:
      - shared-mobile-requirements
  visual-design:
    required: true
    reason: "Existing root file owns shared tokens."
    path: DESIGN.md
    owner: "Example design-system owner"
    status: review
    scope: []
  approved-design-artifact:
    required: true
    reason: "Account composition must be reviewed at the supplied workflow artifact."
    source:
      kind: opendesign
      locator: "example-workflow-supplied-project/artifact-42"
      revision: "example-revision-8"
      reviewed-at: "2026-10-02"
      approval-evidence: "docs/reviews/design.md#artifact-approval"
    owner: "Example design owner"
    status: approved
    scope:
      - account-screen
    approval:
      by: "Example identity in design review"
      at: "2026-10-02"
      evidence: "docs/reviews/design.md#artifact-approval"
  threat-model:
    required: true
    reason: "Internet accounts and local sensitive data require current boundary analysis."
    path: docs/security/threat-model.md
    owner: "Example security owner"
    status: blocked
    scope: []
    update-triggers:
      - "Local protection or account-service trust boundary changes"
    exceptions:
      - reason: "The example source has unresolved iOS restoration protection; no activation is authorized."
        scope:
          - ios-restoration
        owner: "Example security owner"
        evidence:
          - "docs/reviews/security.md#unresolved-restoration"
        review-trigger: "iOS storage design becomes available"
  threat-model-old:
    concept: threat-model
    required: false
    reason: "Retained diagnostic history only; not a current constraint."
    path: docs/security/threat-model-old.md
    owner: "Example security owner"
    status: superseded
    scope: []
    superseded-by: threat-model
  restoration-handover:
    purpose: "Explain the project's support handover for local record restoration."
    required: true
    reason: "Client support responsibility requires this project-specific information."
    path: docs/operations/restoration.md
    owner: "Example support owner"
    status: missing
    scope:
      - offline-records
traceability: docs/traceability.yaml
```
