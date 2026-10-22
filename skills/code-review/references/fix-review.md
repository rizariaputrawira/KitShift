# Review a correction without losing prior findings

Load when a previous review's findings and a correction are supplied. Default read-only. This is scoped re-review, not an automatic new whole-branch review or a test runner.

## Establish the fix basis

Read the original brief/requirements, all prior findings, prior reviewed snapshot, current fix comparison and accessible correction/evidence report. Preserve finding identities and exact original root causes. State missing basis rather than reconstructing a claim from memory. Include WIP/untracked corrections when requested.

For each prior finding, inspect whether the specific defect remains at the real consumer path. Read surrounding controls/callers when decisive; changed lines alone may not establish the fix. Author statements like “addressed” or “tests green” do not disposition the finding.

## Exact dispositions

- **addressed:** current inspected sources correct the particular defect within the original requirement. Cite the correction and decisive consumer/control source. Separately state any required runtime/remediation evidence and its actual result; source correction alone does not imply every acceptance check passed.
- **not-addressed:** the defect remains, the workaround misses the root cause, or a replacement behavior still violates the requirement. Cite the surviving path and consequence.
- **needs-evidence:** a decisive source/runtime fact is unavailable or the evidence does not cover the finding. Name the missing fact and the focused safe check the authorized owner needs; uncertainty is not “addressed”.

Account for **every** prior finding, in the original order or with stable identifiers. “Attempted” is not a disposition and is not addressed. Rejected feedback must have an inspected technical basis, not disappear from the list.

## New defects and exclusions

Inspect the fix and its affected integration boundaries for new breakage: a changed return/error contract, lost denial, altered state/lifecycle, or a weakened test oracle. Report severity and exact source-grounded consequence. A defect entirely outside the fix/affected boundary is an out-of-scope observation, separately labeled; it does not silently expand the correction task or excuse an in-scope failure.

Finish with per-finding dispositions, new breakage, explicit out-of-scope observations and coverage gaps, then a scoped verdict identifying anything still open. No checkout changes, automatic commit, provider/model tier, fixed retry loop or worker execution is introduced. If behavior proof is missing, request it from the authorized integration verifier instead of declaring an all-clear.
