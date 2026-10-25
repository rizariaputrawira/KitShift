---
name: code-implementation
description: "[Matt Pocock] Implement a clear requested change or a spec spanning dependency-linked work items."
disable-model-invocation: true
---

# Implementation

Use the authorized request as the scope; issue references are evidence to fetch only when the user supplies them or asks for tracker work. Resolve ambiguity from available context first. Identify desired behavior, acceptance criteria, exclusions, affected areas, verification evidence and unresolved dependencies. For consequentially unclear behavior, read the [workflow-brainstorming skill](../workflow-brainstorming/SKILL.md); for hard causes, read the [code-debugging skill](../code-debugging/SKILL.md). Respect host policy and do not infer additional publication or Git authority.

## Ordinary change

Explore relevant implementation and project guidance, then make the bounded change using repository conventions. Choose verification proportionate to risk, exercise the changed consumer path, and report checks actually run and remaining limits. Read the [code-tdd skill](../code-tdd/SKILL.md) only when test-first is explicitly requested or project policy requires it; read the [code-review skill](../code-review/SKILL.md) when requested or risk warrants it. Do not make every change documentation-first, require commits, branches, or pushes, or treat a recommendation as authorization.

## Whole-spec task graph

1. Read the complete spec and relevant work items; identify acceptance criteria, exclusions, dependencies, integration owner/branch, and required proof. Ask only about material gaps not resolvable from available sources.
2. Build a dependency graph and identify ready, blocked, and cyclic/missing-dependency items. Resolve inconsistent or cyclic requirements before implementation; report the exact blocker rather than silently omitting scope.
3. Work the ready frontier in dependency order. Delegation through available host interfaces is optional when independent bounded work benefits; give each worker acceptance criteria, exclusions, and source pointers. When dispatching dependency-linked slices or passing prerequisites between slices, read the [implementation brief](../workflow-delivery/references/implementation-brief.md) and apply its `Dependency handoffs` contract, including when one agent performs every slice. Preserve the nominated integration owner; do not assume workers' branch/worktree baseline. Confirm returned work is based on the intended shared state, reconcile conflicts and recheck affected acceptance criteria before integration.
4. Integrate each completed item under the authorized arrangement. Advance dependent work only after inspecting prerequisite consumability under the linked handoff contract, not from a task/worker completion label alone. A missing prerequisite blocks only affected work; continue independent reachable authorized work. Update the frontier and repeat until all items are integrated or an explicit blocker remains. Do not create/switch branches or worktrees unless authorized.
5. Review the entire integrated spec boundary against every acceptance criterion; correct gaps and review resulting changes. For criterion-level proof assessment, read the [verification reference](../workflow-delivery/references/verification.md); reading that reference does not select documentation-first delivery or its pre-code baseline. Report observed evidence, unrun checks, residual blockers and completed scope. Clean up temporary work only when authorized. Commits, pushes, PR/tracker changes and publication require specific authority.
