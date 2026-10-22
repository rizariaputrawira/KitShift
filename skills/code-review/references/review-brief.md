# Source-inspecting review brief

Load for a task-scoped or completed-change review, including an authorized native reviewer dispatch. This consolidates requirements and quality inspection in one brief while retaining independent verdicts. It neither creates a custom runtime role nor authorizes execution.

## Inputs the controller supplies

Use the actual available task interface and role schema. Give the reviewer:

1. **Objective and scope:** capability/change under review, exact base/head or supplied diff/snapshot, requested WIP/untracked inclusion, paths and exclusions.
2. **Requirements:** originating spec/issue/brief locators and relevant binding constraints; identify unavailable owners explicitly.
3. **Standards:** applicable guidance locators and affected interface/invariant owners.
4. **Claims/evidence:** implementer's report locator and accessible actual evidence, labeled as claims until independently inspected.
5. **Permissions and result:** read-only source inspection, allowed tools/paths, no execution/writes/network/delegation, and the exact native output contract plus completion criteria.

Do not substitute a diff-only role for decisive source/caller inspection. A supplied schema alone is not permission. If this is not a dispatched review, apply the same input checks yourself.

## Ordered inspection

1. Pin the comparison and inventory every requested changed path, including WIP. Check that a batch listing a change in several files actually covers each required change—not merely that the overall diff looks tidy.
2. Read the brief/spec and project standards. Treat the author report and rationales as assertions; reconstruct the behavior and requirements relationship from source.
3. Inspect changed functions and relevant controls/callers. State a concrete reason for each wider inspection, such as changed lock order, shared state, producer/consumer contract or denial gate. Avoid unrelated codebase crawling, but do not forbid unchanged sources that determine correctness.
4. On the **Spec** axis inspect missing, extra and misunderstood behavior criterion by criterion. Preserve unknown coverage where a required fact is unavailable. Missing spec does not earn a pass.
5. On the **Standards/correctness** axis inspect actual failure paths, type/state/lifecycle correctness, contract enforcement, meaningful test oracles and integration. Do not equate large files, repeated syntax or style preference with a defect absent an actual consequence/project rule.
6. Read accessible check evidence at its real locator. Illegible/incomplete evidence is a gap; author summaries alone are not a passed check. In this read-only role do not regenerate it by executing tests. Tell the controller the decisive missing check/fact.

## Result

Report each axis independently, with its source-covered pass/issues/unknown verdict. Every finding includes an exact inspected location, trigger, wrong consequence, applicable requirement/rule where relevant, and a technically grounded remedy. Calibrate severity to impact rather than discomfort. Include specific strengths only when evidenced, exclusions/gaps and relevant actual check outcomes. Distinguish a source-correct implementation from observed acceptance proof.

A plan-mandated defect is still a correctness finding, labeled as a plan conflict for the decision owner. Reviewers cannot change scope, weaken security constraints or approve deviations. Behaviors set aside remain explicit exclusions with reasons, not silently discarded acceptance.
