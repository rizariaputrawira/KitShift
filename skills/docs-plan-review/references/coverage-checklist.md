# Coverage checklist: outcome, integration, evidence

The plan reviewer reads sources and reports only. Do not run commands, mutate a plan or treat an “approved” label as verified authorization. Apply this checklist proportionately to consequential multi-slice work; no task-count or context-percentage threshold defines correctness.

## 1. Bind the real input

- Identify exact plan content/version and its status as proposed or supported by trusted observed authorization. Read canonical requirements, fixed decisions, relevant design/security constraints and exclusions.
- Missing spec or material decision means unknown coverage, not a fabricated inferred requirement or pass. Resolve discoverable facts by reading actual sources. Quote precise anchors, redacting secrets.
- Compare the current request with the plan's claimed authorization and scope. A copied assertion/digest cannot approve work. Do not re-ask an already verified exact decision merely to create another gate. Only when reviewing an authorized continuation governed by enabled, available `workflow-delivery`, load `skill://workflow-delivery/references/resumption.md#authorization-is-independently-verified` for its continuation-specific rule.
- Only when the task is governed by enabled, available `workflow-delivery` and its documentation-first baseline applies, read the selected canonical baseline owners and their substantive prerequisite/review/gap evidence through `skill://workflow-delivery/references/documentation-baseline.md#before-code-readiness`. Required missing architecture, detailed/error design or planned test intent makes that delivery plan incomplete even if actions cover the happy path. Check due pre-code information separately from later runtime evidence; no filenames/status labels as proof. Otherwise use the task's actual requirements and existing documentation without introducing baseline adoption. Review remains read-only and non-authorizing.

## 2. Trace semantic acceptance

For each canonical criterion create a row with:

`Criterion/source anchor | Deliverable/actions | Actual integration/consumer | Planned observable proof | covered / partial / uncovered / unknown | Evidence/gap`

Ask whether the named actions implement all the criterion's meaning, not whether its ID appears. One criterion may span several slices; several criteria may share a slice. Include guest/denied paths, errors, cleanup/order and negative constraints where required. A successful path cannot stand in for a forbidden path. Preserve requirements omitted from plan-local acceptance. Reject silent “v1,” “static for now,” mock, scaffold or future-work reductions of approved behavior. Do not invent a phase split that weakens final acceptance.

## 3. Validate complete deliverables

- Each slice states concrete allowed paths/artifacts, action, expected behavior, proof and done condition. “Implement auth” or “write appropriate tests” leaves material decisions unspecified.
- Setup/configuration belongs to the deliverable consuming it; a horizontal component forest is not the initial real tracer.
- Trace actual input/entry → enforcement/processing → output/consumer. Identify tasks that connect each link. An isolated API, unused import or hardcoded screen does not deliver the outcome.
- Failure/recovery and documentation updates have actual owners. Required current feedback is executable plan content or has a source-grounded deferral/rejection; no hidden review-only execution contract.

## 4. Challenge prerequisites and shared contracts

- Every dependency names an existing producer, real interface or fixed decision; check missing producers, cycles and scheduling before readiness.
- Check prerequisite sufficiency across the actual planned boundary; a feasible tracer does not permit skipping required app-level decisions. When the selected delivery workflow requires a documentation-first baseline, check its whole-boundary review coverage before the first app slice and plan final affected-owner reconciliation. Ordinary plan review does not impose that workflow or require new documents.
- Compare exact names/signatures/types/errors and data ownership from producer to consumer. Flag conflicting transformations, destructive sanitization before a raw-data consumer and incompatible lifecycle assumptions.
- Find undeclared shared mutable resources and writer/reader ordering. Distinguish concrete causal coupling from vague same-subsystem association. Report impact; do not mechanically classify all undeclared coupling as the same severity.
- Confirm write/integration ownership for shared files/resources. Read-only workers do not acquire execution authority through a task description. Do not require agents, waves or a tracker database to express these constraints.

## 5. Test proof adequacy without execution

- The check names the actual consumer seam, independent expected values, input/environment and observable success/failure result. Could it pass on the original defect, a dummy static return or disconnected implementation? If yes, it does not prove the criterion.
- Distinguish artifact existence, substantive shape, wiring/data flow and exercised behavior. A planned green build is not runtime transition/denial evidence.
- Verify the proposed command/tool/path exists from accessible project evidence and the checker has authorization; do not run it. Unsupported runtime/deployment facts remain unknown.
- Full canonical acceptance controls final proof. A relevant criterion explicitly assigned to a later complete slice is pending, not silently dropped or already satisfied. When reviewing proof for work governed by enabled, available `workflow-delivery`, use `skill://workflow-delivery/references/verification.md`; otherwise assess the task's planned proof directly without loading a delivery workflow. Neither route authorizes check execution.

## 6. Inspect approval and undo cost

- Fixed decisions are delivered exactly; discretionary details are not reclassified as user mandates. Excluded/deferred ideas do not become tasks.
- Identify reversible/local, costly/coordinated and one-way/migration or published-contract choices. Name concrete undo cost rather than difficulty. Unresolved consequential one-way choices must be decided through native approval before dependent mutation.
- New behavior, scope/security changes and a materially changed plan require native proposal/reapproval. Reviewer preferences do not authorize an alternate design.

## Output

Begin with exact inspected scope and the coverage table. Then list blockers/warnings/info:

- **Invariant:** the property that must hold, not a preferred edit.
- **Evidence:** exact criterion/plan/code anchors proving the gap or uncertainty.
- **Consequence:** which outcome, integration, safety or proof cannot be established.
- **Needed decision/evidence:** the specific resolution; a remedy may be one example only.

End with unavailable sources, exclusions and whether the review is complete within its declared scope. Missing material context keeps review incomplete. Never report planned tests as exercised, write the plan, approve it or substitute shape for meaningful coverage.
