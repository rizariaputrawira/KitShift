---
name: agent-guidance
description: "[Matt+Superpowers] Author or revise agent guidance and skills, or conduct an authorized skill assessment."
---

# Writing for Agents

Write guidance that the actual consuming agent can discover, follow and finish with observable results. Prose review checks the instruction design; only authorized consuming-agent runs demonstrate behavior.

## Establish the consuming contract

1. Identify the actual consumer/role, invocation trigger, source-loading path, current task/tool interface, write/execution permissions and expected result. Guidance describes use of available authority; it cannot add authority, sandbox a role or set a runtime/model profile.
2. Read existing guidance and its canonical owner, relevant code/config/help evidence, and the affected invocation paths. Find duplicate/conflicting rules and material source gaps before adding another instruction layer.
3. Decide whether the need is universal ordered procedure, an on-demand branch, a project convention or shared reference. Extend the owner rather than create aliases/router engines for the same behavior. A new independent skill earns its context cost only with a genuinely distinct trigger and permission contract.

4. For a new skill capability, provide a discoverable entrypoint under the applicable native OMP contract and update its existing capability owner and provenance/licensing records. Reconcile catalogs or deployment inventories only where they are actually maintained and applicable; do not create registries, deployment machinery or project files merely because a skill is being authored. Do not assume an upstream installer satisfies the installed OMP discovery contract.
When authoring instructions, load [authoring](references/authoring.md). When the asset is an OMP skill or routing pointer, also load [OMP skill contract](references/omp-skill-contract.md). When **behavioral assessment is separately authorized**, load [behavioral assessment](references/behavioral-assessment.md); authoring authority alone does not permit spawning/executing test actors.

## Write and prune

Give the core ordered executable steps; each step has a visible finish condition. Put branch-specific detail behind a condition-bearing pointer naming the exact source. Keep a concept's definition, rule and caveat together. Each mutable meaning has one maintained owner; links reuse it, copied paragraphs do not.

Descriptions are concise trigger pointers, not workflow summaries the consumer can mistake for the whole procedure. Include what should cause a load, then require actual reading of the body. Use current native tools/interfaces rather than provider aliases, bundled executables or imagined commands. Resolve what the environment can answer instead of caching its mutable contents in prose.

Remove redundant, stale, irrelevant and conflicting text as part of the authorized change. Use positive recipes for output shape, required fields for omissions, observable conditionals for branches, and firm guardrails only for real forbidden authority/actions. Do not delete unrelated guidance or infer a behavioral improvement merely because the candidate is shorter.

## Evidence and completion

A source review reports the invocation/permission contract, pointer targets, rule ownership, observable done criteria and unresolved gaps. An actual assessment additionally reports source-loaded baseline/candidate actors, observed tools/results and independent judgment; unrun, unknown or baseline success are honest outcomes. Do not fabricate a failing baseline to justify a rewrite.

Update affected call sites/provenance/documentation within the approved boundary and state actual changes. Runtime discovery, loaded-source behavior, schema parsing and OS containment are distinct claims. For upgrade acceptance or safe missing-suite behavior load `skill://docs-engineering/references/omp-compatibility.md` only when that branch is requested/enabled. Authoring never automatically installs, commits, publishes, updates OMP, changes model/approval settings or reactivates disabled guidance.
