# <Owned requirements section>

Reusable template; normally extend the canonical SRS/README/product owner at its existing anchor. Separate product outcomes, system behavior and quality/security constraints by their actual owner, not by mandatory filenames.

## Scope and authority
- Owner / audience / state: <actual owner; draft or supported lifecycle state>
- Affected features/platforms and exclusions: <scope>
- Source basis and intended outcomes: <need/product/obligation source + anchor/revision>

## Requirement <existing stable ID or anchor>
- Rationale/source: <why needed; upstream source>
- Behavior: <unambiguous actor/system obligation under stated conditions>
- Inputs, state and outputs: <relevant observable contract>
- Failure/boundary behavior: <invalid input, missing authority, limits, recovery>
- Quality acceptance: <measurable workload/context/threshold or explicitly unresolved threshold>
- Security/privacy acceptance: <asset/trust invariant and negative case; risk assessment is not waived by lean>
- Platform applicability: <shared owner once, bounded platform deltas and evidence>
- Acceptance/verification rationale: <consumer-visible result and method, not merely existence>
- Trace links: <existing design/control/implementation/test/evidence IDs only after inspection>
- Implementation and runtime state: <not yet implemented/not run or scoped observed result>

## Decisions, conflicts and missing facts
<Separate approved intended constraints from code drift; name exact competing owners. Unknown obligations, thresholds or platform behavior block only their dependent claims.>

## Review and update triggers
<Actual review/approval evidence if required; changes to parent need, behavior, interface, security boundary or platform trigger review. Document approval does not prove runtime acceptance.>
