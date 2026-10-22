# Shortcut debt ledger

Adapted from DietrichGebert's Ponytail debt snapshot; [full MIT notice](../LICENSE.ponytail). One-shot reporting, not coding-level activation or a general debt tracker.

Search the explicitly requested boundary for actual `ponytail:` shortcut comments. Exclude dependencies, build/generated output and VCS metadata. A quoted marker in documentation or sample string is not automatically a shortcut comment. Preserve each real marker's file/line and group rows by file.

For each row report what was simplified, the stated ceiling/limit, and the upgrade/revisit trigger. Do not invent a ceiling or trigger from vague wording. Flag absent upgrade paths/triggers with `no-trigger`; label missing ceilings separately when useful.

Suggested row shape: `file:line, simplification. ceiling: stated limit or not stated. upgrade: stated trigger or no-trigger.` Finish with actual marker and missing-trigger totals. If none exist, report an honest empty ledger and checked scope; do not create debt to populate the output.

Default output is chat only, respecting the user's requested format. Saving needs current authorization for an exact destination and must preserve unrelated content under the existing owner. No invented tracker, issue creation, mode flags, configuration writes, scoreboard or code corrections.
