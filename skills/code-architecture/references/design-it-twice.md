# Compare alternative interfaces

Load when the user chooses a candidate and asks to explore substantially different interface designs. This reference informs a native collaborative design process; it does not require parallel agents. Use available roles only when independently useful and authorized. Do not assign model tiers or treat a role label as sandboxing.

1. Frame constraints, affected callers, important invariants and dependencies (using [deepening](deepening.md)); distinguish sourced constraints from assumptions. Give a small illustrative sketch only to clarify constraints, not to preselect a design.
2. Develop materially different interface shapes under distinct constraints, for example: minimal surface, flexibility, common-caller simplicity, or explicit ports/adapters when multiple real implementations justify them. Work independently only when authorized and beneficial; a single thoughtful comparison is preferable to forced dispatch.
3. For every option, specify entry points/types and relevant invariants, ordering, errors/config/performance; show a caller example; identify hidden implementation behavior and dependency/adapters; assess leverage, locality, test surface and migration/tradeoffs.
4. Compare designs on depth (behavior per interface burden), caller simplicity, locality, seam placement, genuine variation, compatibility and operational consequences. Recommend the strongest fit, or a hybrid only when parts compose without undermining clarity.
5. Present unresolved decisions and ask only for material choices evidence cannot settle. Do not implement, mutate records, or claim validation unless separately authorized and actually done.
