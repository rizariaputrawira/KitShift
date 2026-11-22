# How Agents Work in KitShift

[README](README.md) · [Skill use-case guide](SKILL-USAGE.md)

## What KitShift supplies

KitShift supplies passive skills, working preferences, harness settings and MCP definitions, with implemented omp and agy integrations; each host supplies its own runtime. [How installation works](README.md#how-it-works) explains the explicit copy/update operation: using agents is separate from installation, and editing a checkout does not synchronize an installed setup. The [omp](harnesses/omp/COMPATIBILITY.md) and [agy](harnesses/agy/COMPATIBILITY.md) compatibility records describe scoped integration evidence, not guarantees for your current runtime. This guide explains existing contracts; it is not another agent policy or runtime registry.

## Daily workflow

These paths describe existing contracts, not a mandatory pipeline.

| When | Route | Finish |
|---|---|---|
| Ordinary change | Work directly within authorization; map genuine prerequisites for multi-part work. Use [code-implementation](skills/code-implementation/SKILL.md#ordinary-change) only when expressly selected. | Exercise the changed consumer and report observed evidence and limits. |
| Explicitly coordinated work | Use current native capabilities. If the `workflow-delivery` owner is enabled and available, use its [Coordinated work](skills/workflow-delivery/references/implementation-brief.md#coordinated-work) reference. Otherwise, [use supported native coordination directly](guidance/APPEND_SYSTEM.md#reasoning-and-execution-strategy) and report that the KitShift-specific contract is unavailable. Execute directly if delegation is unsupported or not useful. Coordination alone does not select a documentation-first baseline. | Integrated proof or a named affected blocker. |
| Explicit or project-required documentation-first delivery | Use [workflow-delivery](skills/workflow-delivery/SKILL.md) for whole-boundary readiness, authorized execution, proof and reconciliation. For the chosen autonomous branch, see [autonomous delivery](skills/workflow-delivery/references/autonomous-delivery.md); on omp, see its [native orchestration path](harnesses/omp/MAGIC-KEYWORDS.md#documentation-first-delivery-with-native-orchestration). | Observed proof and reconciliation, or a named blocker. |
| Consequential merge, release or install | Assess [human acceptance gates](#human-acceptance-gates). | Readiness is not authority for the external action. |

Coordination and documentation-first delivery compose only when both apply. A new app, size, handoff or native shortcut alone does not select a baseline.

## Responsibility to native identity

An assignment defines the current outcome and discretion; an enabled skill provides a reusable procedure; a native capability or model selector is neither an assignment nor a guarantee of behavior. Main retains authorization, integration and final evidence acceptance. The [responsibility and return contract](skills/workflow-delivery/references/implementation-brief.md#responsibility-and-return) owns role and return details.

This is the intended adapter map, not observed dispatch or a model capability guarantee. Actual effective tools may be additive and native enforcement requires observation.

| Responsibility | omp | agy |
|---|---|---|
| Main/planning | Native main session/plan interface | Native main session/plan interface |
| Locate local code | Bundled `scout`; retained `kitshift-investigator` for source/root-cause tracing | `kitshift-investigator` |
| External research | `kitshift-researcher` | `kitshift-researcher` |
| Pre-plan gap consultation | `kitshift-plan-consultant` | Advisory `kitshift-architect` |
| Concrete-plan review | `kitshift-plan-reviewer` | `kitshift-plan-reviewer` |
| Source code review | `kitshift-reviewer`; bundled reviewers remain untouched | `kitshift-reviewer` |
| Authorized scenario execution | `kitshift-qa` only outside modes reserving checks to main; otherwise main | `kitshift-qa` |
| Local tabular preparation, matching and authorized exploration | `kitshift-data-analyst` (analysis requires an enabled method owner) | `kitshift-data-analyst` (analysis requires an enabled method owner) |
| Independent evidence recommendation | `kitshift-acceptance-reviewer` | `kitshift-acceptance-reviewer` |
| Implementation, including architecture implementation | Bundled `task`; `sonic` only for suitable mechanical work under native policy | `kitshift-executor` |

The analyst writes only assigned derived artifacts, reports and reproduction scripts/notebooks, not source replacements or application repairs. Broader analysis uses enabled optional Skillstash `data-analysis` for methods and interpretation plus the shared [local execution/artifact handoff](skills/code-python/references/local-analysis.md). Query-only work and independent analysis review remain with enabled `data-sql-analysis` and `data-analysis-review`; their absence blocks only dependent work, not independent preparation/matching. KitShift does not install those owners or a new analysis runtime.

## Handoffs and review

Inspect current producer output and evidence before dependent mutation under [dependency handoffs](skills/workflow-delivery/references/implementation-brief.md#dependency-handoffs). For a retained decision, use [decision escalation](skills/workflow-delivery/references/implementation-brief.md#decision-escalation); only dependent mutation waits. Use [independent source review](skills/code-review/references/review-brief.md) when requested, required or useful for substantial risk, and [verification](skills/workflow-delivery/references/verification.md) for actual proof. Source review is read-only and does not substitute for execution. See the [skill catalog](SKILL-USAGE.md) for example prompts.

Consider review for multi-boundary changes or changes affecting authorization, credentials/privacy, destructive filesystem behavior, managed updates/conflicts or external effects.

### Human acceptance gates

Before accepting a consequential merge, release or install, assess the intended diff scope, evidence relevant to the current implementation, disposition of actionable review findings, and any required target-environment or manual check. Acceptance does not itself authorize the external action: obtain explicit authorization for the actual merge, release or install.

When a review fix changes a material basis, refresh affected checks and affected-boundary review. Do not reuse an obsolete green result or mechanically rerun unrelated checks. The canonical [acceptance-evidence rules](skills/workflow-delivery/references/verification.md) own evidence relevance and invalidation.

**Recommended GitHub setup for KitShift maintainers — not configured by this change:** after the CI check exists on GitHub, configure a ruleset targeting `main` to require pull requests and the `Regression tests` status check, require the branch to be up to date, block force pushes and branch deletion, and avoid routine bypass. Do not require an approving GitHub review count: a solo maintainer cannot approve their own PR. Independent source-review evidence and the human merge decision remain distinct.

Ruleset availability depends on repository/account support; recommending it creates no remote enforcement. If enforcement is unavailable, use the same acceptance checklist above and label it **manual-only**, not enforced. Creating remote rules, pushing and merging remain outside local implementation authority unless separately authorized.

Merge rules protect the merge boundary, not earlier local execution, credential disclosure or live-system modification. Existing model selectors, YOLO settings and selected Git prompts remain unchanged; those settings are not execution isolation.

## Boundaries and evidence

Actual host-supported roles and tools determine capability. The [passive permission contract](skills/agent-guidance/references/skill-contract.md#consumerpermission-binding) does not turn Markdown instructions, read-only labels or tool lists into role registration or enforced confinement. [MCP definitions](README.md#mcp-integrations) are not proof of connectivity, authentication or successful actions. [Configured model selectors](README.md#configuration) are personal selections, not performance rankings or fixed worker identities.

Read [safety and privacy](README.md#safety-and-privacy) before relying on configured approvals or external tools. The [historical installed-responsibility assessment](harnesses/omp/COMPATIBILITY.md#observed-installed-responsibility-acceptance) records its tested snapshots and limitations; it is not current compatibility acceptance or a universal behavioral guarantee. This guide reports no new consuming-agent experiments or runtime behavior tests.
