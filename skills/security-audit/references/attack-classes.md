# Boundary-driven attack classes

Select by reconnaissance evidence, not a mandatory checklist fleet. Every class uses actor → accepted input/action → strongest control → crossed boundary → protected principal/resource → concrete consequence. Read the applicable domain companion alongside ordinary controls; companions do not replace transport, authorization or output review. Unavailable deployment behavior remains a named gap.

## Injection and second-order use

Trace values, keys, headers and metadata through storage and later consumption into queries, shells, templates, path/URL selection, deserialization or output rendering. Compare encoding required by the final sink with what each producer guarantees. A safe storage representation can become unsafe in a new context. Find the actual caller and preventing parser/framework control; a suspicious API name alone is not a finding.

## Access control and capability growth

Verify the right principal has the right operation on the right tenant/object at the final decision. Compare direct, batch, import/export, delegated, queued, refresh and recovery paths. Check request-body overrides, resource reassignment and stale/revoked authority. Authentication is not per-resource authorization. Intended same-principal capability is not automatically escalation; name an action or resource outside legitimate scope.

## Resource and file handling

Follow normalized paths through final filesystem access, symlinks, check/use and archive members. For URL fetching inspect protocol/host/path identity, redirects and resolver disagreement with the trusted network policy. Inspect unsafe deserialization, temporary resources and cleanup. Memory/ABI or platform-specific claims require actual relevant source/control knowledge; do not claim safety solely from language choice or pretend an unshipped specialist reference was inspected.

## Cryptography and secrets

Determine each value's security purpose before judging randomness, derivation, nonce use, authentication, verification or key custody. Follow failure paths for fallback to weaker/no protection and rotation/revocation to actual consumers. Report secret-access or disclosure locations and affected authority with actual values redacted. A public identifier or intentionally nonsecret test marker is not credential theft.

## Business state and recovery

Map allowed transitions and irreversible actions. Inspect skip/replay, concurrent check/act, negative/overflow/unit/coercion disagreements and partially completed work only where accepted by the interface. Check expiry boundaries and rollback/restore against current ownership and authorization. A chain needs evidence for every intermediate output and downstream prerequisite; do not infer takeover from a smaller first effect.

## Feature abuse and data lifecycle

Compare access scopes across search, cache, ordering, previews, revisions, notifications, exports/backups, imports/restores, deletion and retention. Verify that copies and indexes obey the original principal/resource invariant and that bulk operations apply per-item scope. Error/status/timing differences require meaningful disclosure, not generic worry. A source field containing tenant metadata is not a query-level isolation control.

## Cross-component trust and overlooked paths

Compare component A's actual guarantee with B's assumption: canonicalization, units, truncation, identity, copy provenance and resource scope. Read alternate/legacy/debug/fallback entrypoints and tests' uncovered boundaries. A comment explaining safety is a claim to inspect, not proof. Obvious settings such as CORS, cookies, debug gates or missing logs matter only when a reachable path affects a protected principal/resource.

## Companion selection

- Untrusted context/model/memory influences privileged action, retrieval or rendering: [AI and LLM](ai-and-llm.md).
- Input/work can consume shared capacity, quota or operator spend: [availability](availability.md).
- Dependencies, CI, artifacts, signing, updates or plugins cross producer trust: [supply chain](supply-chain.md).

Other actual web, native, cloud, protocol, mobile or data boundaries remain in scope if authorized; use their source-visible controls and report any specialist evidence gap. This package deliberately does not redistribute the upstream's other companions. Do not link nonexistent files, invoke a fixed fleet or substitute a broad assurance claim. Apply [evidence and finding decisions](../../docs-engineering/references/security.md#evidence-and-finding-decisions) before any finding disposition.
