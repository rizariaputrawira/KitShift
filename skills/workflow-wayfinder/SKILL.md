---
name: workflow-wayfinder
description: "[Matt Pocock] Chart a large, uncertain effort as a shared decision map and advance its ready frontier."
disable-model-invocation: true
---

# Wayfinding

Wayfinding maps decisions and investigations toward a named destination; it is not implementation planning. The map is complete when the route is clear and no decision remains before execution can begin.

## Chart
1. Name the destination precisely: spec/handoff, decision to settle, or in-place change. Reuse current context and canonical requirements; do not repeat established answers. Use `skill://workflow-brainstorming` for unresolved consequential choices and batch only independent questions. Use `skill://workflow-research` for external/source research when that capability is available; use `skill://code-architecture` for architectural questions and `skill://code-implementation` only after an execution boundary is authorized.
2. Survey breadth-first: list settled decisions, sharp questions that can be ticketed now, and in-scope fog that cannot yet be phrased as a precise question. Separate out-of-scope work. If the route is already clear or small enough for one session, report that no map is needed.
3. Draft a map index: destination, notes (domain, relevant skills, preferences), decisions-so-far (brief gist plus linked resolution), not-yet-specified fog, and out-of-scope boundaries. The map indexes decisions; the detail belongs in one decision ticket.
4. Create decision tickets only for precisely expressible questions, each sized for one focused work session. Classify as research, prototype, grilling, or prerequisite task; mark whether a live human decision is essential. Tickets are not build slices. Add blocking edges only for actual prerequisites, check cycles, then derive the frontier: open, unblocked, unclaimed decisions. Do not pre-slice fog.
5. Persist a shared map/tickets only with explicit authorization and a configured tracker contract. Use tracker-native child/parent and blocking links where available, otherwise explicit local/canonical links and blocker text. Do not assume labels, claims/assignment, branches, agents or concurrent external work. A user's choice/ticket may not be converted to automatic external actions.

## Advance
1. Load the map's low-resolution index and the selected ticket's full context; retrieve related ticket details only as needed. If no ticket is named, propose the earliest genuine frontier decision by title, not bare identifier.
2. Resolve one selected decision at a time; when the user authorizes a larger set or the complete map, continue through its ready frontier without imposing a one-ticket-per-session limit. Claim/assign only if tracker contract and explicit authority allow it. Research requires evidence and source limits; prototype is a low-cost artifact to inform a human decision; grilling requires the user's own decision and never answers on their behalf; a task is allowed only when necessary to unblock a decision, with no scope expansion.
3. Record the outcome once on its ticket, close/resolve only when authorized and tracker rules permit, and add a concise linked gist to Decisions-so-far. Promote newly sharp fog into tickets, remove graduated fog, and revise invalidated/out-of-scope tickets without losing rationale. Recompute blockers/frontier from current tracker state; assume no concurrency behavior unless observed.
4. Stop at the destination when no in-scope decisions or prerequisite investigations remain. Report the remaining execution handoff and authorization boundary; do not start implementation merely because the map is exhausted.
