# Extract useful learning without inventing policy

The consuming role is the workflow-retrospective owner. Default action is read-only analysis and recommendation; persistence/promotion requires explicit authorization and an existing canonical owner. No required `.planning/` tree, state database or memory service.

## Gather the observed basis

Read the requested slice/session's existing requirements/plan and implementation/result evidence. Compare planned acceptance with actual output, correction/refutation and user acceptance where available. A completion summary may point to evidence but cannot establish success alone. Enumerate inspected, unavailable and excluded artifacts. Do not require GSD filenames; an existing README requirement owner and real command result may be sufficient. Missing decisive evidence restricts the claimed lesson, not permission to fabricate it.

## Extract four categories

1. **Decisions:** what was actually decided, why, alternatives/trade-offs and source of the decision. Distinguish proposed from observed accepted choices; never infer acceptance/date from an artifact's numbering or label.
2. **Lessons:** what the work taught beyond prior assumptions. Cite the actual failure/success/discriminator and context, not a plausible story. User-reported errors are ground truth; no confirmation-only rerun.
3. **Candidate patterns:** reusable mechanism, conditions under which it helped, counterexamples and existing owner. One successful use is a candidate, not demonstrated recurrence. Repeated independent observed uses can support a pattern; name each rather than count duplicated reports of the same event.
4. **Surprises:** expected versus actual result, impact and source. Distinguish a source-discovered assumption from measured runtime/performance behavior. Do not fabricate timings, spend, coverage or model mixes.

## Per-item record

Every proposed lesson/pattern/guardrail carries:

- **Claim and category:** specific observation and proposed reusable implication.
- **Evidence:** exact source/action/result locator and relevant observed excerpt; version/basis where material. A bare source URL or author assertion is not proof.
- **Applicability:** actor, boundary, preconditions and situations where it should not apply.
- **Counterevidence/uncertainty:** contradictory cases, missing facts and whether this is one observation or independently repeated evidence.
- **Promotion/revisit condition:** the specific further observation/assessment that would justify adoption or overturn it. No fixed sample count or unsupported confidence score.
- **Suggested owner and smallest change:** the maintained project doc, skill or instruction anchor that would own an authorized change. Link shared procedures instead of copying them.
- **Status:** observed lesson/candidate pattern/proposed guardrail/unsupported claim; actual promotion only when separately authorized and evidenced.

An unsupported “we always fail at X” becomes an explicitly unsupported claim with the exact missing recurrence basis, not a policy recommendation dressed as a fact. If a proposed guardrail duplicates or contradicts a current rule, identify the sole owner and recommend consolidation rather than another rule.

## Synthesis and optional persistence

If a written report is authorized, reuse the project's existing retrospective/report owner or an explicitly authorized destination; do not write the report into the installed skill directory. Summarize what shipped, what worked, what caused observed inefficiency, lessons and unresolved evidence. Cross-session trends require comparable independent observations and actual metrics; no empty model-cost table or automatic calibration file. A successful baseline/control is valid evidence, not a result to hide to manufacture improvement.

Rank recommendations by actual consequence and smallest verifiable change. Agent-guidance proposals needing behavioral proof route to [behavioral assessment](../../agent-guidance/references/behavioral-assessment.md) only when that assessment is explicitly authorized; prose inspection is not behavior proof. Promotion never runs automatically, overwrites policy, updates memory/settings/requirements, starts a service or changes models. Report exactly what was analyzed, what is supported, what is unknown and which owner/authorization would be needed for implementation.
