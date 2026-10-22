# Architecture and technical information

## Architecture description and decisions
Describe stakeholders, concerns, constraints, context, selected viewpoints/views, quality/security implications, assumptions, rationale, risks and source basis. Select views answering material concerns; no diagram-per-name policy or mandatory C4/arc42 format. Consequential choices and glossary changes reuse `docs-domain-modeling` and its ADR status/supersession semantics; adopted destinations resolve through [locations](locations.md). Proposal is not accepted decision. Preserve diagram source assets and references, but normalize standalone canonical document owners during authorized adoption; contradictions with requirements/code are owner conflicts or drift, not resolved by filename preference.

## Architecture views
| Concept | Content and validation boundary |
|---|---|
| system-context | Actors, external systems and system/trust edges; reconcile with actual interfaces |
| container-view | Deployables/services, responsibilities, communication; reconcile with build/deployment sources |
| component-view | Internal responsibilities and dependencies where concerns justify detail; inspect code boundary |
| deployment-view | Runtime placement, environments, failure/trust zones; separate proposed from observed topology |
| data-view | Ownership, flows, classification, retention/recovery; inspect schema/interfaces and data policy |
| integration-view | Parties, protocols, responsibility, failure/idempotency semantics; cross-link formal contracts |
| platform-view | Support constraints and architectural deltas; platform-specific evidence, not copies of shared requirements |

Each view identifies scope, concern answered, precise inspected basis and unresolved edges. Filenames alone do not establish topology. Boundary/data/placement/participant changes are review triggers. Views may be sections of one architecture owner.

## Detailed technical design
`technical-design` owns implementation-relevant choices. TSD/TDD/SDD and game technical design refer here; artifact TDD is not invocation of the `code-tdd` testing skill. Record requirement and architecture constraint, decision and alternative rationale where consequential, input/output/error invariants, dependencies and verification route. Native schemas/code can own low-level facts; prose adds rationale rather than copying them.

| Section concept | Required design information and check |
|---|---|
| technical-data-model | Entities/keys/cardinality/constraints, consistency, migration/retention; compare schema/migrations, never guess cardinality |
| technical-state | States, guards, transition/error/terminal/recovery behavior and persistence; compare requirements/code |
| technical-sequence | Participants, ordering/concurrency/handoff, timeout/cancellation/partial failure; compare actual calls/contracts |
| technical-error | Error propagation/mapping, recoverability, retries/idempotency and safe logging; compare contract/data-integrity/security invariants |
| dependency-design | Build/runtime dependency identity/version, compatibility, provenance/license/support and trust; inspect actual lock/source |
| technical-integration | Implementation allocation of boundary responsibilities, serialization, retries, failure/consistency; link formal interface owner |
| technical-platform | OS/device/runtime implementation deltas, lifecycle/resources/update and security mechanisms; link shared/platform requirements |

A change to these inputs or choices triggers scoped design review. Detailed design can proceed in parallel once relevant architecture information exists; it does not wait for every view or release test report.

## Cross-system and data-platform design
ICD captures independently owned parties, responsibilities, boundary agreement, compatibility and change authority not already supplied by formal contracts. It points to OpenAPI/AsyncAPI for facts. Data-platform design captures ingestion/source-to-output lineage, schemas/version evolution, job scheduling/idempotency, access/privacy/retention, quality acceptance and recovery. Validate each pipeline/lineage edge and recovery claim from inspected implementation/contracts/evidence. No frontend owner is implied by a data platform. External/integration or schema/recovery changes trigger review.
