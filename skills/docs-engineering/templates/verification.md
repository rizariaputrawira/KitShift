# <Scoped verification plan or observed report>

Reusable template. Label planned checks as planned and actual outcomes as observed. No prefilled successful result; a worker report, file, timestamp or approval label is not execution proof.

## Scope and basis
- Owner / lifecycle state: <actual owner and supported state>
- Requirement/control/review objective: <existing ID/anchor and consumer-visible rationale>
- Affected features/platforms and exclusions: <scope>
- Inspected implementation/contract revision or precise file digests: <basis>
- Environment/prerequisites: <actual runtime/platform/permissions; no credentials>

## Checks and results
| Requirement / control | Command or safe method | Platform / environment | Observed result | Evidence locator and basis |
|---|---|---|---|---|
| <ID / anchor> | <planned or actually executed method> | <actual platform> | <passed/failed/not-run; exact relevant output> | <inspected source/revision; no invented log> |

## Coverage, failures and blockers
<Separate forward gaps and orphan/reverse gaps. Name unavailable/uninspected sources, missing platform evidence, stale/irrelevant basis and precise safe next checks. Design-only requirements are not defective solely because implementation is not due.>

## Remediation and release assurance
<If a finding is claimed fixed, cite current successful correction-specific evidence and the challenge actually performed. State whether a separate reviewer was used and disclose any unmet explicit independence requirement; do not impose one solely because this template was loaded. Record unresolved risk/approval obligations; no unrelated passing test substitutes.>

## Update triggers
<Requirement, implementation, contract, threat/control, test method, environment or platform changes require scoped evidence review. Document validation remains separate from runtime acceptance.>
