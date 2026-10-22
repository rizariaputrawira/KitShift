# Complexity-only review and audit

Adapted from DietrichGebert's Ponytail review/audit snapshots, with native authority, scope and evidence corrections. See [full MIT notice](../LICENSE.ponytail). Both branches report findings only; no automatic fixes or coding-level changes.

## Review: real diff boundary

Require a supplied or discovered actual diff/base-head boundary. Inspect its changed code and necessary caller context with available symbol-aware tools. If no diff is available, identify the missing input rather than inventing changed lines or silently switching to repository audit.

Anchor each finding to the actual changed file/line: `file:Lline: tag what can be cut; replacement and reason`. Follow the requested output format. Possible line reductions must be supported by a concrete replacement; unknown totals remain unknown. No useful cuts is a valid lean result.

## Structural maintainability standard

Review the changed structure, not a checklist of smells. Look for demonstrated growth in conditional/state complexity, scattered flags or special cases, unnecessary wrappers/layers, duplicated logic where a canonical helper exists, misplaced responsibility or boundary leakage, unclear ownership, and weakened type/contracts that obscure real invariants. Also ask whether a materially smaller behavior-preserving design is apparent and whether a refactor merely relocates the same concepts.

Treat these as investigation prompts, not automatic findings. A proposed abstraction, module split, state machine, typed model, parallel flow, or atomic update must have a concrete benefit in this code and preserve its actual requirements. Do not demand one because it is fashionable. A large cohesive file is not a defect by line count; size can prompt closer inspection, but extraction needs an independent cohesion/readability benefit. Preserve validation, errors, security, accessibility, data-integrity guarantees, and required behavior.

For each consequential finding, state the exact changed source location, observed structural problem, concrete maintainability consequence, and a simpler implementation or ownership model with why it improves the design. Identify relevant behavior-preservation and regression checks; do not imply they were run unless observed. Distinguish a demonstrated **material maintainability regression** from a **simplification opportunity** that is beneficial but not required for correctness. Avoid speculative, cosmetic, arbitrary-abstraction, and refactoring-for-its-own-sake advice. A clean review with no actionable findings is valid.

This remains a report-only structural review. Correctness/specification, security, and implementation authorization retain their separate owners; maintainability suggestions are not correctness blockers.

## Audit: explicit repository boundary

Establish coverage before searching. For a Git checkout, inventory the complete tracked-file set (`git ls-files`) and identify relevant untracked, non-ignored files in scope; otherwise enumerate the requested tree completely. Use the inventory as a path checklist, not a prompt to load every file. State the boundary, inventory basis, included/excluded areas and any untracked/generated/vendor exclusions.

Partition the inventory into bounded path groups. Search each group for likely dependencies, definitions, callers/references, configuration/manifest entries and tests; inspect candidate implementations and their consumers in context. Verify all relevant import, dynamic lookup, registration and external-contract paths before recommending removal, merging or consolidation. Use complete file lists plus targeted searches rather than broad, result-limited Glob output. If search output truncates, partition or paginate until the relevant group is complete; missing/truncated output is unknown, never evidence of absence. For any claim that something is unused, dead or globally absent, coverage of all relevant paths and reference forms is required.

Only rank a cut after its evidence and replacement are grounded; otherwise record the candidate as unresolved, not a finding. Report coverage by the inventory groups actually examined and identify remaining gaps. A repository-wide clean conclusion is valid only when the relevant scope is complete; if not, limit the conclusion to inspected areas and state that repository-wide coverage is incomplete. Rank grounded cuts by impact with source paths, replacement and reason. Give possible line/dependency reductions only where supported; do not convert estimates into measurements. Apply nothing.

## Shared tags and boundaries

- `delete:` dead or unrequested speculative code; replacement may be nothing.
- `stdlib:` a hand-built facility with a correct standard-library equivalent; name the API.
- `native:` code/dependency replaced by a suitable platform feature; name the feature.
- `yagni:` flexibility or abstraction with no demonstrated need.
- `shrink:` equivalent correct logic in a smaller readable form; show the form.

This is unnecessary-complexity review, not correctness/security/performance assurance. Route unrelated defects to a requested appropriate review without expanding this pass or suppressing important caveats. Protect meaningful smoke and regression checks, boundary validation, data-integrity handling and accessibility. Do not count deleting required behavior as simplification. Never claim measured savings or invent a scoreboard.
