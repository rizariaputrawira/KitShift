---
name: workflow-skill-selection
description: "[Matt Pocock] When explicitly asked which skill or workflow fits, recommend an available canonical skill without dispatching it."
disable-model-invocation: true
---

# Optional skill selection

This is an optional, explicitly invoked selector, not a mandatory router. Do not invoke it automatically or require it before ordinary work. It recommends; it does not execute a skill or grant authority.

1. Clarify the user's immediate goal and where they are in the work, only where that distinction changes the recommendation.
2. Discover the skills actually available to the current runtime through its native skill catalog/help. Read the full canonical body of any candidate before describing it or recommending a step to skip. Do not route to unavailable skills, infer the catalog from this file, or rely on old names.
3. Match the user's situation to the smallest useful current workflow. State the recommended canonical skill name, why its trigger fits, what it will and will not do, and any genuinely relevant alternative or phase-boundary choice. Respect the user's explicit scope and current approval; a recommendation is not authorization to perform the work.
4. If available skills do not cover the need, say so plainly and offer the next direct native action rather than forcing a near-match. End with a recommendation and leave selection to the user.

For a decision about session/phase boundaries, first inspect which native controls and skills are available in this runtime. Consider continuing in the current context when it still holds the task; compacting only when context reduction is useful and preserved details remain recoverable; a fresh context with a handoff when separation benefits the work; or delegation only when the task is genuinely separable and native task dispatch is available. Explain tradeoffs; do not prescribe upstream commands, Skill-tool invocations, host-specific semantics, or a fixed sequence. Do not claim a local control exists without observing it.

Canonical skill names are runtime-dependent. Read currently discoverable candidate bodies and cite their exact names; this skill deliberately contains no static catalog or global routing map.

Provenance and notices: [SOURCES.md](SOURCES.md); complete notice [LICENSE.matt](LICENSE.matt).
