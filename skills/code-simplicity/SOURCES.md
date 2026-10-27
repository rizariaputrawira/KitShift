# Sources and modifications

Repository: https://github.com/DietrichGebert/ponytail  
Author: DietrichGebert  
Current adaptation baseline: `09c434ab73ca43761c5d8b0c5d341926c2fba710`  
Source reconciliation date: 2026-10-27  
License at that baseline: MIT; Copyright (c) 2026 DietrichGebert. Full retained notice: [LICENSE.ponytail](LICENSE.ponytail).

## Status: resolved for the current package

The official Ponytail repository, its five relevant skill texts, and its MIT notice were inspected at the immutable revision above. The current local procedures were reconciled against those texts; the mapping below records retained upstream mechanisms, intentional local adaptations, and excluded upstream features. No missing procedure or notice requiring a behavioral change was identified. The full local MIT notice matches the pinned upstream notice byte-for-byte.

The source-mapping, missing-ledger dependency, and attribution-pointer issue is **resolved** for the current package: this record is the maintained source owner, and the inspected revision is now the adopted baseline for future updates. Adoption follows direct source reconciliation; it is not a claim that the old files were originally imported from this revision. Current use of this record does not depend on the unavailable ledger.

## Historical import note

KitShift commit `aa740b8f82329a4cbf8943140ee6b6a6b99fd7ec` (2026-10-22) introduced the skill, both references, and the full MIT notice. Its entrypoint already described an adaptation from Ponytail “legacy snapshots” and pointed to `config/SKILL-SOURCES.md`, explicitly not deployed as a skill asset. That ledger is absent from the import tree; searches of available local Git history across all refs found no commits for that path or any nested `SKILL-SOURCES.md`. The README subsequently described it as an Aria-era ledger; that description does not recover its contents or independently establish an Aria source lineage.

Commit `c6fdd6d9ddbf425a3aaab4e31debe77faa38ce83` (2026-10-25) replaced the missing ledger path with a generic “repository provenance record” pointer, without adding that record. This file replaces that unresolved pointer.

The historical upstream import revision was not recovered. The revision above was initially recorded only as a comparison baseline; after direct reconciliation it is adopted as the current adaptation baseline. That resolves the current documentation gap without reconstructing edits before KitShift's first commit or inventing unavailable ledger contents. The old import history remains a historical limitation, not an open prerequisite for the current source mapping.

## Adopted source mapping and local adaptations

All upstream paths below refer to the adopted current baseline. Local adaptations are retained deliberately rather than treated as upstream parity defects; this is a passive KitShift skill, not the full Ponytail plugin.

| Pinned upstream path | Local file | Retained mechanism and intentional local adaptation |
|---|---|---|
| [skills/ponytail/SKILL.md](https://github.com/DietrichGebert/ponytail/blob/09c434ab73ca43761c5d8b0c5d341926c2fba710/skills/ponytail/SKILL.md) | [SKILL.md](SKILL.md) | Lite/full/ultra levels, smallest-complete-change ladder, reuse before new code, caller tracing, root-cause fixes, preserved validation/security/accessibility, and shortcut ceilings/triggers. Local guidance requires all requested acceptance criteria, defaults to task scope, requires explicit selection for ongoing conversational levels, uses symbol-aware tools when available, and binds verification to the authorized execution assignment. It retains `ponytail:` rather than adopting the baseline's newer `shortcut:` marker. |
| [skills/ponytail-help/SKILL.md](https://github.com/DietrichGebert/ponytail/blob/09c434ab73ca43761c5d8b0c5d341926c2fba710/skills/ponytail-help/SKILL.md) | [SKILL.md](SKILL.md) action table | One-shot help and level/action reference. Local help displays the consolidated table; it does not expose upstream host commands, configuration, automatic activation, update flows, or scoreboard controls. |
| [skills/ponytail-review/SKILL.md](https://github.com/DietrichGebert/ponytail/blob/09c434ab73ca43761c5d8b0c5d341926c2fba710/skills/ponytail-review/SKILL.md) | [references/complexity-review.md](references/complexity-review.md), review branch | Actual diff plus caller context, grounded findings, concrete smaller replacements, and report-only scope. The baseline is a broad quality review; the local branch is complexity-only, separates material maintainability regressions from optional simplifications, preserves requested output formats, and makes no correctness/security/performance assurance or unsupported savings claim. |
| [skills/ponytail-audit/SKILL.md](https://github.com/DietrichGebert/ponytail/blob/09c434ab73ca43761c5d8b0c5d341926c2fba710/skills/ponytail-audit/SKILL.md) | [references/complexity-review.md](references/complexity-review.md), audit branch | Repository flow tracing, checking references before declaring code unused, ranked cuts, explicit unexamined areas, and no edits. Local guidance requires an explicit boundary, a complete path inventory with bounded coverage groups, dynamic/config/registration checks, and limited conclusions when coverage is incomplete; it does not adopt the baseline's broad quality verdict or fixed finding cap. |
| [skills/ponytail-debt/SKILL.md](https://github.com/DietrichGebert/ponytail/blob/09c434ab73ca43761c5d8b0c5d341926c2fba710/skills/ponytail-debt/SKILL.md) | [references/debt-ledger.md](references/debt-ledger.md) | Real shortcut comments grouped by file/line, stated ceiling and revisit trigger, `no-trigger` flags, and observed totals. Local guidance scans only `ponytail:` within the requested boundary, rejects prose/sample false positives, does not invent missing fields, defaults to chat output, and requires authorization for an exact save destination. The baseline also supports `shortcut:`, custom marker words, and optional blame attribution; those are not local features. |
| [LICENSE](https://github.com/DietrichGebert/ponytail/blob/09c434ab73ca43761c5d8b0c5d341926c2fba710/LICENSE) | [LICENSE.ponytail](LICENSE.ponytail) | Full MIT copyright, permission, and warranty notice. The pinned upstream tree identifies Git blob `715d483338cea4365f0d91a27799cf61226d6bcf`, also recorded for the notice in the original KitShift import. |

## Scope of this resolution

The 2026-10-27 reconciliation adopts the inspected official source as the current baseline, updates attribution in the entrypoint and both references, and marks the current source-record issue resolved. Skill procedures remain unchanged. It does not install a package or import Ponytail's runtime, integrations, gain scoreboard, configuration, or updater. The retained MIT notice is not replaced by the root KitShift license. Resolution covers these mapped guidance files and their retained notice, not the entire upstream repository, a reconstruction of historical permissions, or legal certification.
