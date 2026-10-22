# Source-grounded specification content contract

Load when synthesizing substantive acceptance criteria or implementation/test contracts; the entrypoint owns synthesis and permission to persist/publish.

## Required content, proportionately

Use the canonical requirements owner's format and include applicable sections without padding:

- **Problem and source basis:** affected actor, observed problem, evidence and intended outcome; link canonical anchors.
- **Solution and acceptance:** externally observable behavior with preconditions/input, expected result/state/error and evidence that proves it. Include negative behavior and recovery where relevant; preserve stable requirement IDs.
- **Useful actor flows:** actor → action → result → failure/denial/recovery when flow adds clarity; do not inflate a library change into a long user-story catalog.
- **Implementation decisions/contracts:** responsibilities and public/integration contracts, authorization/enforcement location, data ownership/lifecycle, compatibility/migration. Preserve approved choices; label unresolved choices as unresolved. Include only decision-bearing prototype material with source basis.
- **Testing decisions:** highest existing consumer seam, expected values/results derived independently, prior art, automated/manual evidence and unavailable prerequisites. Do not bind incidental internal calls unless contractual.
- **Boundaries/errors:** authorized mutations, unaffected areas, denied/error/partial-success behavior, security and integration compatibility.
- **Out of scope/open facts:** exclusions, unknowns, conflicting owners and exact missing evidence. Unknown is neither a new requirement nor a waived criterion.

Keep stable product/domain decisions in their canonical owners and exact changing file/symbol steps in an implementation plan. Link instead of repeating requirements; one slice can satisfy multiple criteria and one criterion can span slices.

## Readiness and authority

The spec is ready for planning when an independent reader can identify requested behavior, constraints, failure behavior and proof without guessing. Proposed content is not accepted content. Native approval governs consequential choices and execution; issue labels, status or filenames grant no authority. Return proposed content in Plan Mode without checkout writes. Persist only within current authorization, preserving edits.

Publication is a separate action. It requires explicit authorization and an existing configured tracker contract; use its native identity/link behavior and do not create labels or run setup implicitly. A specification request alone does not authorize tracker mutation. Documentation-first delivery gates apply only when explicitly selected or required by project policy; substantial scope alone does not impose them.
