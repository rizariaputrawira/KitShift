# Sources and modifications

Repository: https://github.com/anthropics/claude-code-security-review  
Immutable revision: `0c6a49f1fa56a1d472575da86a94dbc1edb78eda`  
License: MIT; Copyright (c) 2025 Anthropic. Full unchanged notice: [LICENSE.anthropic](LICENSE.anthropic).

| Exact pinned upstream path | Local file | Substantive mechanism |
|---|---|---|
| [.claude/commands/security-review.md](https://github.com/anthropics/claude-code-security-review/blob/0c6a49f1fa56a1d472575da86a94dbc1edb78eda/.claude/commands/security-review.md) | `SKILL.md` | Focus on an actual changed boundary; context research, comparative secure-pattern analysis, source-to-sensitive-operation trace and challenge of candidate reasoning. |
| Same pinned `.claude/commands/security-review.md` | `references/change-review.md` | Explicit change basis; relevant security framework/control/caller context; attacker and privilege-boundary assessment; source-grounded refutation and actionable consequence. |
| [LICENSE](https://github.com/anthropics/claude-code-security-review/blob/0c6a49f1fa56a1d472575da86a94dbc1edb78eda/LICENSE) | `LICENSE.anthropic` | Exact full upstream MIT notice. |

Changed for passive OMP native roles/tools and permission boundaries. The controller owns scope and evidence records, inspecting directly or delegating through actual available native read-only roles when permitted and useful. Candidate reasoning is challenged against the strongest actual controls; separate staffing is conditional on explicit requirements or concrete independence needs, with controller challenge never represented as independent review. Added absent-diff handling, dirty/untracked scope when supplied, source-confirmation versus runtime exploit distinction, strongest-control checking, pre-existing issue labeling and explicit coverage gaps. Actual affected AI, availability and supply-chain boundaries select separately owned audit companions.

Removed shell frontmatter/interpolation, git/CLI commands, upstream role/Task aliases, CI/action/install/posting workflow, mandatory parallel subtask pipeline, confidence >80%/>8 filtering, omission of nonsurvivors, markdown-only findings contract and automatic HIGH/MEDIUM-only reporting. Removed blanket exclusions/assumptions for DoS/rate/resource limits, dependencies, AI injection, tests/docs, client code, environment inputs, log sensitivity, Rust safety and framework defaults. Actual concrete attacker path and strongest source-visible controls decide relevance; neither every deviation nor every possible issue becomes a vulnerability.

No CI action, scanner, installer, executable, upstream engine or provider directive is redistributed. No reproduction is claimed merely from a source pattern. The shared source-review guidance is independently authored integration material, not a translation of this command's execution pipeline. Its current native OMP adaptation removes the former custom reviewer-definition, fixed discovery/refutation, identity-acceptance and result-schema prerequisites; actual role/result contracts and requested output govern representation. Observed evaluator/source/operation basis is reported without treating a role name as exact loaded-file provenance or OS containment. Linked companions belong to `security-audit`; their bodies/licenses are not copied here.
