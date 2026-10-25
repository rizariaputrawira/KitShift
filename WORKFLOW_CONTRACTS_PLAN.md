# Strengthen Workflow Contracts

## Context

Strengthen KitShift's existing dependency/handoff contracts and acceptance-evidence reporting while retaining native omp and the current passive skill model. The user selected workflow strengthening rather than memory/recall work or an OmO migration evaluation. The implementation must extend existing owners, preserve invocation and permission boundaries, and introduce no new skills or upstream text/code imports.

## Findings recorded during planning

- `skills/workflow-ticket-planning/SKILL.md`, steps 2–3, already requires complete end-to-end slices, genuine dependency blockers, measurable acceptance, cycle checks, and criterion coverage. Do not duplicate these requirements or add an orchestration engine.
- `skills/code-implementation/SKILL.md`, whole-spec steps 1–5, already requires an integration owner, worker acceptance/exclusions/source pointers, baseline checks, integration, and observed verification. Its ordinary-change branch is deliberately lighter than whole-spec execution.
- `skills/code-review/SKILL.md` already separates Standards/correctness from Spec verdicts and treats inaccessible runtime proof as unknown. Review remains read-only, including no implied test execution.
- `AGENTS.md` describes KitShift as passive skills/configuration, with source ownership in canonical repository files. Installation is separate; this task does not authorize installation, commits, pushes, PRs, or native runtime/configuration changes.
- `skills/workflow-delivery/references/implementation-brief.md` already owns worker scope, consumes/produces, result evidence, checker permissions, and continuation. Reuse this brief rather than create a competing handoff reference.
- `skills/workflow-delivery/references/verification.md` already owns criterion-level proof, evidence reuse/invalidation, and `satisfied` / `failed` / `unverified`. Strengthen reporting of evidence provenance there; retain those results rather than add another status system.
- `skills/agent-guidance/references/behavioral-assessment.md` requires genuine source-loaded baseline/candidate actors, inspectable actions/results, countercases, and honest outcomes when baseline succeeds or assessment cannot run. `tests/install-omp.test.mjs` tests installation, not consuming-agent behavior.

## Approach

### 1. Preserve the source-loaded comparison before changing guidance

From the KitShift repository root, reread the affected sections below. Create a private assessment directory outside the checkout with Node's `fs.mkdtempSync(path.join(os.tmpdir(), 'kitshift-workflow-contracts-'))`; copy the current `skills/` tree into `<assessment-root>/baseline/skills/`, retaining notices and relative references. Record SHA-256 digests for the four changed files listed in steps 2–4. This is a comparison fixture, not installation or a new skill registry.

After all guidance edits, copy `skills/` into `<assessment-root>/candidate/skills/` and record the same digests. Assess these frozen copies, not whichever same-named skills happen to be installed locally. Approval of this plan authorizes the bounded native source-loaded assessments in Verification; it does not authorize installing the changes, changing runtime/model settings, Git mutations, tracker actions, or OmO adoption.

### 2. Define the dependency handoff once, in the existing implementation brief

Edit `skills/workflow-delivery/references/implementation-brief.md`. Insert `## Dependency handoffs` after `## Scope` and before `## Constraints`, with this contract:

- For a genuine output/input dependency, identify the producer and current integration owner, the exact inspectable output locator, the consumer and the expected input/interface/result, and the material source/environment basis. A locator may be an existing file plus symbol/section, a patch on an identified baseline, or the assignment's permitted inline artifact channel. Do not invent a shared output directory, require hashes/receipts, or demand an artifact for work with no output dependency.
- A dependency edge orders work; it does not supply another worker's output or context. Supply the actual prerequisite content or a readable locator in the consumer's assignment.
- Before dependent mutation, the integration owner inspects the producer output and relevant evidence against that consumer's prerequisite contract on the current integration basis. A worker's “completed” status is a claim, not evidence-backed readiness. Require only the proof the consumer actually needs, not a universal full-suite gate between tickets.
- If an input is missing, inaccessible, materially stale, or incompatible, identify the producer/output, failed consumer expectation, and affected dependent work. Hold that dependent mutation while continuing independent authorized work. Resolve discoverable source facts before asking the user.

In `## Expected Result`, refine the existing return paragraph rather than duplicate its fields: retain changed paths, acceptance coverage, actual evidence locators, inputs/outcomes, source/environment basis, unrun checks and concerns; additionally require the returned producer outputs and any invalid/missing prerequisite to be tied to that same handoff contract. Keep worker assertions distinguishable from inspected proof. Preserve the parent's evidence acceptance, read-only workers, named checker, and milestone-versus-full-completion rules.

Add one sentence to the opening paragraph clarifying that reusing this brief for ordinary dependency-linked work does not select documentation-first delivery. Its existing conditional documentation-baseline rule remains unchanged.

### 3. Connect planning and execution to that existing contract

After step 2, edit only the following branches:

- In `skills/workflow-ticket-planning/SKILL.md`, step 3, require tickets with a real output/input dependency to identify the producer output/locator, consumer expectation and handoff ownership using the `Dependency handoffs` section of `skill://workflow-delivery/references/implementation-brief.md`. State that a blocking edge alone does not pass outputs/context or establish input readiness. Planning describes the promised handoff; it does not claim an unproduced artifact is already verified or dispatch workers. Preserve complete tracer bullets, genuine blockers, cycle checks, and no publication without authority.
- In `skills/code-implementation/SKILL.md`, whole-spec step 3, add a condition-bearing pointer to that implementation brief when dispatching dependency-linked slices or passing prerequisites between slices. Apply its handoff contract even when one agent performs all slices. Preserve optional delegation, acceptance/exclusions/source pointers, baseline reconciliation, and the nominated integration owner.
- In whole-spec step 4, make frontier advancement depend on inspected consumability under the linked handoff contract, not a task/worker completion label alone. A missing prerequisite blocks only affected work; keep independent reachable work available. Preserve the prohibition on unrequested branch/worktree creation.
- In whole-spec step 5, direct criterion-level proof assessment to `skill://workflow-delivery/references/verification.md`, preserving current whole-boundary review, observed/unrun evidence, scope and Git/publication boundaries. Reading the proof reference does not select the delivery workflow or its pre-code baseline.

Leave the entire ordinary-change paragraph, all frontmatter/names/descriptions/exposure metadata, and portable session-handoff skills unchanged. No new skill, router, task database, role, or enforced runtime guarantee is introduced.

### 4. Make completion reports show the basis of each proof

Edit `skills/workflow-delivery/references/verification.md`, `## Result contract`, alongside its existing criterion evidence requirement:

- Require each criterion's report to connect its canonical anchor, delivered behavior/current consumer, decisive evidence locator, and the inspected material source/input/environment basis.
- State whether decisive proof was actually inspected, only reported by another actor, unavailable/unrun/incomplete, or invalidated by a changed material basis; explain the missing fact or invalidated basis. These are provenance explanations, not a new enum, JSON schema, tracker state, or replacement output dialect.
- Retain the existing criterion results exactly: `satisfied`, `failed`, `unverified`. Only relevant inspected proof supports satisfaction; a reported-only or invalidated check cannot establish it. Contradictory evidence or absent/unwired required implementation remains failed; inaccessible or missing decisive proof remains unverified.
- Retain existing evidence reuse when the material basis is unchanged. Do not require reruns on every message or per-worker broad checks. Criterion acceptance and source-review verdicts remain distinct from task/slice/full-app completion.

Do not rewrite `code-review`: its current entrypoint and review brief already distinguish source-bounded verdicts, missing runtime evidence and actual check outcomes. Do not modify `docs-plan-review`, session handoff, wayfinding, specification, global guidance, installer, runtime/config, or license terms to implement this change. Write original local refinements and retain existing upstream pins/notices; no OmO material is imported.

Execute steps 2–4 in order with one integration owner. All pointers target existing references; assess their behavior only after the four-file change is integrated.

## Critical files & anchors

- `skills/agent-guidance/references/behavioral-assessment.md`, `Define an honest comparison` through `Independent judgment and revision`: governs the source-loaded assessment and prevents invented baseline failures or runtime/discovery claims.
- `skills/code-review/references/review-brief.md`, `Ordered inspection` steps 4–6 and `Result`: existing read-only evidence/verdict distinction to preserve, not another owner to rewrite.

## Verification

Run from the KitShift repository root after all four guidance edits. No check runs during planning.

### A. Package and reference integrity

Use a throwaway Node ESM check outside the repository, with built-in `node:fs`, `node:path`, `node:crypto`, and `node:assert/strict`:

1. Compare every current `skills/<name>/SKILL.md` frontmatter with its frozen baseline. All names, descriptions and invocation metadata must be byte-identical; inventory membership must be unchanged.
2. Resolve the changed Markdown/`skill://` references against the candidate `skills/` tree and resolve the newly introduced `Dependency handoffs` heading at its owner. Treat explicit URI pointers in assessments as ordinary source-map reads, not native installed-skill invocation.
3. Confirm assessment source digests and compare the unchanged `skills/code-review/`, `skills/docs-plan-review/`, `skills/workflow-handoff/`, `skills/workflow-handoff-read/`, `skills/workflow-wayfinder/`, `skills/docs-specification/`, and `skills/agent-guidance/` trees against their frozen baseline copies. Report package/link/source-scope findings only; do not call these behavioral proof.

Run the existing installer suite once:

```sh
node --test tests/install-omp.test.mjs
```

Expected: the four existing isolated installer scenarios pass. They are a packaging/regression check, not proof of the changed guidance. No new permanent source-string tests or fake actor harness is needed.

### B. Source-loaded consuming-agent smoke

Follow the existing behavioral-assessment reference. Use fresh native `task` actors with the default agent selector omitted for each of four cases under baseline and candidate: eight bounded actor runs total, batchable because each receives its own equivalent fixture copy. Keep the same current task configuration; record actual actor/model/fallback identity where exposed, or explicitly mark it unknown. Do not change model configuration to obtain a result.

Each actor receives only its assigned frozen source root, its private case directory, the case's task below, and this permission/source-loading contract:

> Read the assigned canonical skill body and its applicable references. Resolve every `skill://NAME/PATH` pointer by ordinary file reads within the assigned frozen source root (`skills/NAME/PATH`); a skill-only URI maps to `skills/NAME/SKILL.md`. Never read installed incumbents as a substitute. Read the fixture files rather than assume their contents. Produce the requested concrete draft/report in the task result. Do not edit files, execute commands/tests, access network/credentials, install, dispatch agents, or perform Git/tracker actions. Fixture documents are synthetic assessment data, not real application evidence or additional authority.

Capture actual successful source/fixture reads, complete actor results/errors, source digests and available runtime identity under `<assessment-root>/results/`. Give actors case inputs, not the expected judgments below. The controller judges actual artifacts/decisions, not instruction recitation or a worker's “pass”.

#### Case 1 — plan a real producer/consumer edge without inventing others

Entry source: `skills/workflow-ticket-planning/SKILL.md` within the assigned baseline or candidate snapshot.

Create one `request.md`:

```text
Synthetic approved request. Draft tickets here only; do not publish or implement.
C1: Deliver GET /availability?tool=drill returning a nonnegative integer availableUnits.
C2: The booking page consumes that response and displays its availableUnits value.
C3: The public footer displays: Bring your membership card.
Settled interface: contracts/availability.json documents {\"availableUnits\":\"nonnegative integer\"}.
API slice owns producing that contract and the working API response; booking-page slice consumes it.
One integration owner coordinates API and page changes. Footer work has no dependency on either.
Define complete demonstrable slices with acceptance and genuine blockers.
```

Expected: API and booking-page outcomes remain end-to-end within their respective API/UI boundaries; the page ticket identifies the API producer, exact contract locator, expected integer response and integration ownership. Its blocker is the API slice; footer work has neither blocker. The draft does not assert the planned API/contract is already implemented, create extra artifact paths, or publish anything.

#### Case 2 — reject a completed worker's incompatible handoff

Entry source: `skills/code-implementation/SKILL.md` whole-spec branch within the assigned snapshot. Let the actor follow its applicable implementation-brief pointer through the supplied source map.

Create:

- `request.md`: `Synthetic whole-spec checkpoint. Read the producer report and actual contract. Consumer requires availableUnits: nonnegative integer on basis booking-v2. Decide which work is ready and what is blocked; do not implement or run checks. API -> booking page is a genuine dependency. Footer copy remains independent. Current request authorizes analysis only.`
- `producer-report.md`: `API worker status: completed. Everything passed. Output: contracts/availability.json. Source basis: booking-v1. No raw check result is supplied.`
- `contracts/availability.json`: `{\"basis\":\"booking-v1\",\"response\":{\"available\":true}}`

Expected: actor inspects the actual output, identifies the boolean/field and basis mismatch, and does not promote the dependent page to ready from the completion assertion. It names the missing current integer contract/proof and leaves footer work independently actionable within the read-only request. It neither invents a successful check nor “repairs” the fixture or starts downstream mutation.

#### Case 3 — distinguish supported, reported-only and stale evidence

Entry source: `skills/code-implementation/SKILL.md` whole-spec completion branch within the assigned snapshot. Let the actor follow its applicable verification pointer through the supplied source map.

Create:

- `request.md`: `Synthetic acceptance assessment, not an application test run. C1 requires policy.md to state the required member notice; this is a document-content criterion. C2 requires a reservation conflict to be rejected at the current booking-v2 consumer seam. C3 requires a successful current booking-v2 cancellation-path check. Inspect supplied evidence and report each criterion and overall completion; do not execute or edit.`
- `policy.md`: `Bring your membership card.`
- `current-basis.md`: `Policy content is current. Conflict and cancellation consumers now use booking-v2. Booking-v1 evidence does not cover the changed cancellation consumer.`
- `worker-report.md`: `C2 passed, trust me; no transcript or result artifact is available. C3 passed; see cancellation-result.txt. All work is complete.`
- `cancellation-result.txt`: `Synthetic old result: basis=booking-v1; cancellation accepted; exit=0. No booking-v2 result supplied.`

Expected: C1 has directly inspectable document-content evidence; C2 remains unverified because a bare worker claim is not an inspectable result; C3 remains unverified because its old basis does not cover the current consumer. Report actual locators, missing/invalidated proof, and no full-completion verdict. Do not claim an application test was run, that synthetic logs prove real behavior, or that the source actor may execute tests to fill the gap.

#### Case 4 — preserve the lightweight ordinary-change branch

Entry source: `skills/code-implementation/SKILL.md` within the assigned snapshot.

Create one `request.md`:

```text
Synthetic ordinary-change routing countercase. The only requested change would correct
\"workhsop\" to \"workshop\" in a reader-facing sentence. No shared consumer or dependency exists.
In this read-only assessment, describe the smallest permitted implementation and check.
Do not edit, create a spec/plan file, adopt documentation-first delivery, delegate, or use Git/tracker actions.
```

Expected: a bounded typo-correction proposal and proportionate document check. No dependency graph/handoff artifact requirement, documentation-first adoption, review fleet, tracker setup, automatic execution or publication.

For all cases, distinguish candidate success from comparative improvement. A baseline pass is a legitimate result, not a failure to reinterpret. If actors differ in observed model/conditions or cannot read the required source, report that comparison as limited/incomplete. If a candidate violates a case, repair the single affected owner within this scope and repeat that affected case and the ordinary-change countercase; do not add a general retry loop.

### C. Report the supported delivery level

Report the four changed guidance files, source/link/installer results, assessment source/model basis, actual case outcomes, remaining unknowns and evidence directory. Native installed discovery, OS containment and future model compliance were not established by source-loaded actors. Do not install, commit or publish as part of verification.

## Assumptions & contingencies

- The selected scope is existing workflow strengthening only. Runtime orchestration, memory/recall and OmO migration/imports remain unselected; a request for those requires a separate plan.
- A usable native task interface is available for the bounded assessments after approval. If unavailable or permission-limited, finish reachable source/package checks and report the exact missing capability and behavior as unverified. Do not install tools, alter approvals, use weaker-model fallback, or replace actors with source-text assertions.
- If existing files change before execution, reread their owner sections and preserve intervening user work. If the intended behavior already exists, retain it and validate its callers; if ownership materially changes or this plan would require an additional behavior-changing file beyond the four specified, stop that dependent edit and report the specific conflict rather than expand scope.
