# Traceability and evidence

## Map contract
Reuse project ID/link conventions first. Stable IDs are necessary for risk-bearing, production, controlled and regulated behavior, not every paragraph. Lean may use durable anchors/inline links; controlled/regulated uses an explicit scoped map. Resolve adopted map/source paths through [locations](locations.md) and the catalog's `traceability-map`, shaped by `templates/traceability.yaml`; before adoption preserve existing ownership. Use the bounded authored YAML subset from [manifest](manifest.md#authored-yaml-subset).

| Field | Type and invariant |
|---|---|
| `version` | Required integer 1 |
| `nodes` | Required mapping keyed by unique nonempty stable string ID; `{}` is valid but establishes no coverage or completeness |
| node `kind` | need/product-requirement/requirement/architecture/decision/design/implementation/threat/control/test/review/evidence/finding |
| node `source` | Required nonempty bounded local path#anchor-or-symbol or reviewed external handle |
| node `scope` | Required string list; empty explicitly project-wide |
| node `security` | Optional boolean only for requirement/product-requirement nodes |
| node `platforms` | Optional list of known platform strings; platform-specific evidence requires this list |
| evidence `result` | Required passed/failed/not-run; not-run is never passing evidence |
| evidence `observed-at` | Required quoted timestamp string identifying actual observation |
| evidence `basis` | Required source/revision string identifying what was checked |
| finding `disposition` | Required confirmed/needs-validation/rejected |
| confirmed finding `status` | Required open/fixed; hypotheses/rejected candidates cannot acquire fixed status |
| `links` | Required list of mappings each with nonempty string `from`, `relation`, `to`; empty permitted for an explicitly incomplete map |

Optional fields are absent, not null. No additional authored node/link fields. Description, severity, arguments, methods and remediation detail stay in the source record, not an improvised schema. Local source containment/anchor rules reuse [manifest](manifest.md#source-and-path-invariants); inspected external handles are identifiers, never fetch/execute permission. Use existing LSP for code symbols; unavailable resolution is explicit incomplete coverage. Parsed YAML, link existence or correct source syntax is not semantic verification.

## Endpoint compatibility
The table is exhaustive. Let R = product-requirement or requirement. Every endpoint ID resolves, no self-links or duplicate triples are valid. `related-to` can connect any two distinct known kinds but supplies no coverage.

| Relation | From kind | To kind | Meaning |
|---|---|---|---|
| derives-from | R | need, product-requirement, requirement | Downstream behavior traces to originating need/behavior |
| realized-by | R | architecture, design, implementation, control | Allocation/realization, not proof implementation works |
| realized-by | control | implementation | Enforcement location |
| verified-by | R, control | test | Planned verification route, not execution |
| evidenced-by | test, review, finding | evidence | Actual outcome/basis of scoped check |
| mitigated-by | threat | control | Threat's allocated mitigation |
| supersedes | decision | decision | New decision replaces old decision |
| supersedes | design | design | New design replaces old design |
| related-to | any known kind | any known kind | Informational only |

Derivation and supersession directed graphs are separately acyclic. Circular informational references are allowed, never treated as prerequisite or coverage chains. Requirements cannot derive from tests, and evidence cannot verify requirements directly. Supersession can instead live in manifest; choose one canonical owner for each supersession fact. A manifest successor must resolve and its own state/provenance be checked before routing it.

## Coverage and evidence decisions
Inspect linked source content for relevance, actual result, method and current basis; never synthesize nodes that assert unobserved implementation/tests. Scope and platforms must cover the claim: an Android result does not verify iOS, a unit check does not establish store release, and a passed unrelated log does not close an authorization defect. Shared requirements stay singular with distinct platform evidence as needed.

Review forward coverage: need -> product/system requirement -> allocated architecture/design/implementation -> test -> observed evidence where due. Reverse coverage: orphan implementation/tests/controls/evidence without relevant rationale, dangling parent needs and unused sources. A meaningful chain can skip a separate artifact when equivalent owned information exists. Design-only/preimplementation requirements are not yet implemented/verified, not defects solely because implementation is not due. A review can evidence document/design knowledge while runtime acceptance remains not-run.

For security connect requirement to classification/trust/threat source context, allocated control, implementation, security test/review, release disposition and operational monitoring. No special requirement-to-threat coverage relation is invented: the threat context can be a reviewed `related-to` link; control realization and verification provide coverage. Inspect test rationale and independent security review as appropriate.

A confirmed fixed finding requires passed remediation-specific evidence whose source explicitly identifies the finding, corrected boundary, changed implementation basis, method and relevant scope/platforms. If that content/basis is unavailable, report unsupported fixed claim; do not accept a passed evidence node by shape alone. Keep confirmed vulnerabilities, needs-validation hypotheses and rejected candidates distinct. Stale basis triggers review-needed; only inspected mismatch proves irrelevant evidence. Trace completeness does not prove application safety, certification or compliance.

## Full illustrative map
Fictional records demonstrate legal directions and negative evidence; they are not real execution claims. Actual source records must exist and carry the stated facts before equivalent nodes can be authored for a project.

```yaml
version: 1
nodes:
  "NEED-1":
    kind: need
    source: "docs/product/brief.md#account-privacy"
    scope:
      - accounts
  "PRD-1":
    kind: product-requirement
    source: "docs/product/prd.md#private-account-access"
    scope:
      - accounts
  "SEC-1":
    kind: requirement
    source: "docs/requirements/srs.md#sec-1"
    scope:
      - accounts
    security: true
    platforms:
      - android
      - ios
  "THREAT-1":
    kind: threat
    source: "docs/security/threat-model.md#cross-account-read"
    scope:
      - accounts
  "CTRL-1":
    kind: control
    source: "docs/security/security-controls.md#account-scope"
    scope:
      - accounts
  "IMPL-1":
    kind: implementation
    source: "src/account.ts#authorizeAccount"
    scope:
      - accounts
  "TEST-A":
    kind: test
    source: "tests/account.test.ts#crossAccountDenied"
    scope:
      - accounts
    platforms:
      - android
  "TEST-I":
    kind: test
    source: "tests/account-ios.md#cross-account-denial"
    scope:
      - accounts
    platforms:
      - ios
  "EV-A":
    kind: evidence
    source: "evidence/android.txt#account-denial"
    scope:
      - accounts
    platforms:
      - android
    result: passed
    observed-at: "2026-10-03T10:00:00Z"
    basis: "Illustrative Android build revision 7 and crossAccountDenied test revision 2"
  "EV-I":
    kind: evidence
    source: "evidence/ios.md#not-run"
    scope:
      - accounts
    platforms:
      - ios
    result: not-run
    observed-at: "2026-10-03T10:00:00Z"
    basis: "Illustrative planned iOS build revision 7; device validation unavailable"
  "FINDING-1":
    kind: finding
    source: "docs/security/security-findings.md#finding-1"
    scope:
      - accounts
    disposition: confirmed
    status: open
links:
  - from: "PRD-1"
    relation: derives-from
    to: "NEED-1"
  - from: "SEC-1"
    relation: derives-from
    to: "PRD-1"
  - from: "SEC-1"
    relation: related-to
    to: "THREAT-1"
  - from: "THREAT-1"
    relation: mitigated-by
    to: "CTRL-1"
  - from: "SEC-1"
    relation: realized-by
    to: "CTRL-1"
  - from: "CTRL-1"
    relation: realized-by
    to: "IMPL-1"
  - from: "SEC-1"
    relation: verified-by
    to: "TEST-A"
  - from: "SEC-1"
    relation: verified-by
    to: "TEST-I"
  - from: "TEST-A"
    relation: evidenced-by
    to: "EV-A"
  - from: "TEST-I"
    relation: evidenced-by
    to: "EV-I"
  - from: "FINDING-1"
    relation: related-to
    to: "CTRL-1"
```

This map cannot support cross-platform verification: iOS is not-run. FINDING-1 remains open; EV-A has no remediation-specific finding link or demonstrated correction. Such conclusions require source inspection, not solely the graph.
