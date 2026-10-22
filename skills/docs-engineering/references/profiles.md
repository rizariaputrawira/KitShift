# Classification profiles and canonical ownership

## Classification
Record independent `project.types`, `project.platforms` and `project.capabilities`, never generated combinations. Types: software, web-application, api-service, mobile-application, desktop-application, cli, library, data-platform, game. Platforms: web, android, ios, windows, macos, linux, console. Known capabilities: backend, frontend, offline, cloud, multiplayer, live-service, sensitive-data, authentication, payments, external-integrations, ai-enabled. Additional capability strings require meaning explained in the owning project context/security rationale, not invented taxonomy fields. Record actual criticality, sensitivity/exposure, deployment, lifecycle stage and named client/regulatory obligations. Infer only provisional classification from inspected repository evidence; unknown never means low risk. Revisit when these facts change.

## Profiles
- **lean**: minimum durable requirement/acceptance, maintenance/run and verification information at sufficient owners plus manifest/navigation after adoption. Before adoption existing README sections may suffice; adopted locations follow the shared resolver. No automatic PRD/SRS/ADR/runbook set. Actual file/process/auth/data/update risks still require security invariants, threat consideration, controls and verification.
- **standard**: production product/system/quality behavior, architecture/interfaces, security, tests/release/operations where actual surfaces exist; file split follows owner/audience/lifecycle.
- **controlled**: standard plus named owners, stable IDs, explicit review/approval evidence, baselines, scoped full trace, handover and accountable risk disposition; banking with explicit signoff uses this profile, not assumed certification.
- **regulated**: controlled plus mappings to actual identified obligation sources and required evidence/approvals. Selecting profile is not compliance. Unknown interpretation blocks related assurance claims, not independent safe authoring.

Record applicable selections and relevant omissions with reasons for relevant catalog families, not hundreds of irrelevant entries. Security/risk-bearing omission is never justified solely by profile or YAGNI. Profile hints on registry entries do not require creating files.

## Selection order
Needed information -> existing canonical owner -> extend owner -> recognized concept -> distinct audience/owner/lifecycle -> standalone file only when still necessary. Before adoption preserve existing locations/anchors. After explicit adoption resolve exact catalog paths through [locations](locations.md); root PRODUCT.md/DESIGN.md remain stable and canonical owner/anchor consolidation must have a semantic reason. Wrong legacy locations require authorized normalization, not independent fallback paths. Semantic ownership analysis precedes location reconciliation; overlapping authorities remain conflicts.

## Canonical concept owners
Brief/BRD business context only when justified; PRD product outcomes; SRS formal system behavior and normally functional requirements. NFR can be an SRS section; FSD is optional organization-specific detail. Architecture owns stakeholders/concerns/constraints and selected context/container/component/deployment/data/integration/platform views. ADRs and glossary changes reuse `docs-domain-modeling`, not new governance workflows.

Technical-design owns detailed data/state/sequence/error/dependency/integration/platform implementation choices; TSD/TDD/SDD and game technical design aliases identify that same concept. Artifact TDD never invokes the `code-tdd` testing skill. OpenAPI/AsyncAPI own HTTP/event facts, API-design explains rationale, ICD independent party responsibilities; Postman supporting/generated examples never compete with a formal contract. No automatic installation/generation from names.

Existing or explicitly required PRODUCT.md durable product/design-workflow context, DESIGN.md visual-system tokens, selected scoped external composition, technical-design implementation choices and requirements intended behavior are distinct owners; ownership does not require creating those records or generating an external artifact. Resolve applicable enabled UI guidance through [the UI owner pointer](../SKILL.md#conditional-references-and-existing-owners). Contradictions are resolved at owners through authorized decisions, not filename priority. Existing delivery/workflow-brainstorming/code-tdd/review/diagnosis/handoff/retro/Ponytail workflows remain authoritative within their actual triggers and permissions. Prototype is explicit invocation only.

Game art/audio, economy/progression/balance, playtest plan/report, localization/save/network/live operations retain their distinct purposes/owners; combine sections only when actual shared ownership/lifecycle is evidenced. Shared mobile behavior is singular; platform deltas and platform evidence link rather than copy it.

## Catalog contract
`catalog.yaml` is the sole machine-readable concept/path registry: required `version: 1`, `locations` mapping with exact `manifest` and `navigator` infrastructure paths, and nonempty lower-kebab keyed `families` and `artifacts` mappings. Expand exactly one level of family metadata defaults then artifact overrides; lists replace, never concatenate. No inheritance chains, YAML anchors, executable predicates or expression engine. Family values contain only supported default fields below, not another family/id/creation/path mechanism. Artifact-local id/family/canonical-name/purpose/creation-trigger/format is compulsory; id equals key and family resolves.

| Normalized field | Type/rule |
|---|---|
| id, family, canonical-name, purpose, information-owner, creation-trigger, reference | Required nonempty strings |
| phase | Required integer 0 through 12 |
| aliases, audience, project-types, platforms, capabilities, profiles, dependencies, related-standards, validation-rules, update-triggers, AI-use-cases | Required string lists |
| audience, profiles, validation-rules, update-triggers, AI-use-cases | Nonempty after normalization |
| template | Optional contained path string; absent means reference/native-tool guidance, never null |
| default-path | Required exact safe project-relative canonical destination for every local standalone artifact; `adr` alone uses the shared deterministic collection pattern; forbidden for external-only |
| format | Required artifact-local markdown/yaml/json/native/external-only; only approved-design-artifact is external-only; native representation resolution follows [locations](locations.md) |

Known types/platforms/profiles use classification enums. Other lists can be empty; empty applicability means unrestricted, not mandatory. Type/platform/capability lists identify potential context/applicability, not executable selectors or an AND requirement to possess every listed capability. Actual purpose/creation trigger and risk evidence decide selection. Reject fields outside contract. ID/canonical-name/aliases resolve case-insensitively to one concept: names within the same entry may coincide; cross-entry ambiguity is an error. Fixed IDs brd/prd/srs/nfr/fsd/adr/technical-design/openapi/asyncapi/gdd remain. New canonical concept IDs use lowercase kebab-case.

`reference` is package-relative `references/<file>.md#<existing-heading-anchor>`, not relative to catalog.yaml's containing directory. Split fragment, resolve contained file and verify actual section; heading uses normal lowercase hyphenated Markdown anchor. `template` is package-relative `templates/<file>` with actual containment/existence. Search keyed IDs/aliases and read only family defaults plus selected rows and reference sections, not whole registry. Dependencies name known IDs and form an acyclic information-prerequisite graph; [sequence](sequence.md#dependency-rules) supplies interpretation. Purpose, creation/update/validation rules must be substantively appropriate; equality of a legitimately shared rule is not by itself an error.

## Named coverage
Every requested name resolves through the following entries or genuine same-owner section concepts. These are coverage, not recommended file inventories.

- **product**: `brief`, `brd`, `prd`, `stakeholders`, `scope-assumptions-constraints`, `glossary`, `risk-register`.

- **requirements**: `srs`, `stories`, `use-cases`, `acceptance-criteria`, `nfr`, `traceability-map`, `fsd`.

- **architecture**: `architecture-description`, `system-context`, `container-view`, `component-view`, `deployment-view`, `data-view`, `integration-view`, `platform-view`, `adr`.

- **detailed-design**: `technical-design`, `technical-data-model`, `technical-state`, `technical-sequence`, `technical-error`, `dependency-design`, `technical-integration`, `technical-platform`.

- **interfaces-design**: `api-design-rationale`, `openapi`, `asyncapi`, `icd`, `postman`, `product-context`, `visual-design`, `approved-design-artifact`.

- **security**: `security-requirements`, `data-classification`, `security-trust-boundary`, `threat-model`, `security-controls`, `authentication-authorization`, `key-secret-management`, `secure-storage`, `privacy-requirements`, `security-strategy`, `security-case`, `security-review-evidence`, `security-findings`, `remediation-verification`, `release-security-evidence`.

- **verification**: `test-strategy`, `test-plan`, `test-cases`, `acceptance-tests`, `performance-tests`, `security-tests`, `platform-compatibility`, `verification-report`, `test-summary`, `defect-register`.

- **deployment**: `environment`, `deployment-and-environment`, `configuration`, `migration`, `rollback`, `release-plan`, `platform-release-requirements`, `release-notes`, `changelog`.

- **operations**: `runbook`, `observability`, `backup-restore`, `disaster-recovery`, `incident-response`, `postmortem`, `service-objectives`.

- **users**: `getting-started`, `installation-guide`, `user-guide`, `admin-guide`, `how-to`, `reference-guide`, `troubleshooting`, `faq`.

- **games**: `game-vision`, `gdd`, `core-loop`, `mechanics`, `game-systems`, `technical-design`, `levels`, `narrative-world`, `characters`, `art-direction`, `audio-direction`, `product-context`, `visual-design`, `approved-design-artifact`, `economy`, `progression`, `balance`, `balance-change-log`, `playtest-plan`, `playtest-report`, `telemetry`, `live-ops`, `localization`, `game-platform-requirements`, `save-persistence`, `multiplayer-networking`.

- **mobile**: `shared-mobile-requirements`, `mobile-lifecycle`, `mobile-storage`, `mobile-offline`, `mobile-notifications`, `mobile-deep-links`, `privacy-requirements`, `mobile-accessibility`, `mobile-compatibility`, `security-tests`, `platform-compatibility`, `platform-release-requirements`, `android-platform-requirements`, `android-permissions`, `android-signing`, `android-store`, `ios-platform-requirements`, `ios-entitlements`, `ios-privacy-disclosure`, `ios-keychain`, `ios-signing-release`.

`scope-assumptions-constraints` covers separately explicit scope, assumptions and sourced constraints. Architecture view and technical-design subsections preserve level distinctions. `service-objectives` contains distinct SLA contractual commitments versus SLO internal measurement sections with actual source/owner; one is not proof of the other. Android permissions/manifest/API-level/exported-component concepts can share the Android platform owner; keystore/signing share Android signing custody. iOS OS-device support lives in its platform requirement/support section; entitlements/capabilities share declared capability ownership; signing/provisioning/App Store release share platform release responsibilities only where actual ownership fits. Shared privacy/testing/release link existing security/test/release concepts. No alias collapses PRODUCT.md, DESIGN.md, OpenDesign, Postman, security requirements, controls, evidence or technical ownership.
