---
name: code-simplicity
description: "[Ponytail] Simplify implementation in lite/full/ultra modes, or use one-shot review, audit, debt, or help; never reduce requested acceptance criteria."
homepage: https://github.com/DietrichGebert/ponytail
license: MIT
---

# Ponytail

## Select the action

A bare invocation applies `full` to the current task only. `lite`, `full`, and `ultra` are task-scoped unless the user explicitly requests an ongoing conversational level. Reading, reviewing or automatically loading this skill does not establish an ongoing level. An explicitly ongoing level lasts only in this conversation until changed, stopped with "stop code-simplicity"/"normal mode", or session end. No level modifies system prompts, config or runtime flags. Arguments are guidance, not new CLI commands.

`review`, `audit`, `debt`, and `help` are one-shot and never activate/change a coding level. Native authority, safety and requested output formats always win.

| Argument | Scope and owner |
|---|---|
| `lite` | Fulfill the request; mention a simpler equivalent where useful. |
| `full` | Apply the simplicity ladder to the complete requested behavior. Default task-scoped level. |
| `ultra` | Prefer grounded deletion and smaller implementations, without reducing acceptance or safety. |
| `review` | Real diff, complexity-only findings; [complexity-review.md](references/complexity-review.md). Report-only. |
| `audit` | Explicit repository boundary, ranked complexity cuts; same reference's audit branch. Report-only. |
| `debt` | Shortcut marker/ceiling/trigger ledger; [debt-ledger.md](references/debt-ledger.md). Chat-only unless saving to an authorized exact destination. |
| `help` | Display this table. No level or persistent state changes. |

## Simplicity ladder

Understand the requested outcome and trace the real flow first. Then stop at the first solution that satisfies every criterion:

1. Remove speculative work, not requested requirements.
2. Reuse an existing project implementation or convention.
3. Use the standard library when it supplies the correct behavior.
4. Use a suitable native platform capability.
5. Reuse an already-installed dependency when appropriate.
6. Prefer a direct expression if it stays correct and readable.
7. Otherwise write the smallest maintainable correct implementation.

Fix causes, not symptoms. Use available symbol-aware references to trace callers and ownership; textual discovery is a fallback when symbol tooling is unavailable. Avoid speculative abstractions, duplicate helpers and config for nonexistent variability. Smaller diffs are useful only when they correct the full flow.

Never silently ship a reduced version and invite the user to request the rest. Complete all requested behavior and named acceptance conditions. Preserve trust-boundary validation, data-integrity errors, security, accessibility and meaningful checks. Mark a deliberate shortcut only when it has a real known ceiling and revisit trigger, using a `ponytail:` comment.

Have the authorized verifier exercise the actual changed path; workers without an execution assignment name the needed checks instead of running them. Reuse meaningful existing coverage; add a regression check when it catches a plausible consumer-visible failure, not automatically for every branch. Never delete useful smoke/regression evidence as bloat. Report only observed verification.

Be concise by default, but give requested reports and explanations completely. Simplicity governs the implementation, not permission or output truncation. There is no scoreboard or project-saving claim.

Adapted from DietrichGebert's Ponytail legacy snapshots. Full upstream notice is [LICENSE.ponytail](LICENSE.ponytail); source and modification limits are recorded in the repository provenance record for this skill.

Local adaptations: ongoing conversational levels require explicit user selection; ordinary task use and one-shot actions do not create persistent mode state. Changed-path verification follows the native execution assignment rather than granting workers execution authority.
