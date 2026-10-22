# Acceptance evidence before completion

Load when defining or assessing delivery proof. The integration owner coordinates checks after all workers land. Execute only checks allowed by current native authorization and the assignment; a read-only reviewer or source-only investigation does not become an executor by loading this reference.

## Work backward from full acceptance

1. Read the full canonical requirement/design acceptance and approved plan, including negative constraints and consumer integrations. Plan-local checks may add proof, never remove canonical criteria. An omitted criterion remains required. Explicit later-slice allocation can defer it for this slice, never satisfy final delivery.
2. Create a criterion-by-criterion evidence map naming current implementation basis, actual entry/consumer, independent expected result and success/failure proof. Identify fixtures/environment, required human/external evidence and exact unavailable facts. Do not derive expected values from the code being checked.
3. Inspect distinct proof levels:
   - **Exists:** the required artifact can be read; absence is an observed gap.
   - **Substantive shape:** it implements the contract rather than a placeholder, no-op, static fallback or mock. Compilation/type shape alone is not behavior.
   - **Wiring and data flow:** actual callers invoke it; real inputs/results traverse the intended producer/consumer path. An import, unused export or hardcoded prop is insufficient.
   - **Exercised behavior:** the required transition/output/denial/error/cleanup/order is observed at the relevant seam with its stated inputs. UI interaction/accessibility/responsiveness and external integration require their appropriate real evidence, not source grep.
4. The integration owner runs each needed authorized check, reads complete results and records command/action, input, expected result, actual output/exit/status, code/source basis and limitations. Never count a partially completed, crashed, skipped or unavailable check as passed. A worker report is a lead to evidence, not an authoritative pass; inspect the actual changed boundary and actual tool results.
5. Diagnose actual failure before claiming a fix; user-reported failure is ground truth and is not rerun merely for confirmation. A permanent fix needs meaningful regression coverage and successful original-path evidence when authorized. Genuine TDD completion additionally requires meaningful wrong-before/right-after proof, not a harness error. A source-only diagnosis may yield hypotheses, not fabricated runtime proof.
6. Reuse relevant already observed evidence when its material source, environment and acceptance basis remain unchanged; no gratuitous replay solely because a new message/session started. If implementation, inputs, deployment or requirement basis changed, name what was invalidated and obtain appropriate fresh proof. Run broad integrated checks once when needed after workers land, not repeatedly per criterion or concurrently against half-finished siblings.
   In an optional supported execution mode, milestone reports feed this same evidence map; status alone does not establish acceptance. Honor assigned checker/write boundaries and use available native interfaces for any specialist proof actually required by the task. The current integration owner accepts evidence; no fixed director, model or independent-review role is imposed here.

## Result contract

For each criterion record its canonical anchor, implementation/consumer evidence, observed behavioral evidence, and one of:

- **satisfied:** the required proof is observed and relevant to the current basis;
- **failed:** current evidence contradicts the criterion or required implementation is absent/unwired;
- **unverified:** implementation may be present but decisive evidence is unrun, missing, incomplete or environment-dependent.

Include explicit human/deployment needs and exclusions. A required unverified or failed criterion prevents a full-completion claim. Distinguish “present and wired, behavior unverified” from both absence and pass. Check counts and green builds cannot substitute for full criterion coverage. Never filter away a current acceptance gap because a vague later-phase name sounds related; a deferred slice criterion must have an exact plan mapping and remains open for final acceptance.

Reconcile all materially affected documentation against actual sources and relevant exercised evidence, preserving intended acceptance and honest limits. For explicitly selected or project-required documentation-first delivery, follow [complete affected-owner reconciliation](documentation-baseline.md#as-built-reconciliation); using this proof reference alone does not activate its pre-code gate. Distinguish:

- **slice complete:** this slice's behavior, consumers, documents and proof are supported; other app criteria may remain.
- **code complete, docs pending:** implementation evidence is sufficient but affected owners/links/states remain unreconciled.
- **documents reconciled, runtime unverified:** source-backed documents are accurate but required runtime proof is missing.
- **full app complete:** every required criterion is satisfied and all affected selected documents are reconciled.

Report actual changes, exercised checks/results, source-only observations and unresolved limits. As-built/shipped descriptions state only supported observed behavior; preserve separately labeled intended acceptance, planned behavior and unverified implementation without presenting them as shipped. No GSD tools, status engine, probes, universal timing cap, auto-commit, requirement waiver or fresh-execution mandate on every message is adopted.
