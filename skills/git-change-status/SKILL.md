---
name: git-change-status
description: "Use to report local Git changes and distinguish uncommitted, unpushed, unmerged, unreleased, and released work."
---

# Unpublished changes

Produce a read-only, evidence-qualified status report. Never stage, commit, push, tag, publish a release, merge, or edit a changelog. Do not fetch automatically: fetching changes refs and can change the evidence snapshot. Disclose when remote refs may be stale.

1. Define request scope and current refs. Establish repository, branch, worktree state, and an explicit comparison baseline. If no defensible baseline is selected, report that limitation rather than inventing one. Use `git --no-optional-locks status` to avoid Git's optional index refresh, relevant read-only `git diff` (staged and unstaged), `git log`, and `git rev-list` evidence as needed; inspect untracked paths only within the requested scope.
2. Report dimensions separately: unstaged, staged, untracked, local commits ahead/behind the selected upstream, pushed-but-unmerged work, merged-but-unreleased work, and released work. Missing tracking/upstream means ahead/behind is unknown, not zero. Ahead commits alone do not prove unmerged work. Remote results describe the local snapshot unless fresh authorized evidence exists.
3. For pushed/unmerged claims, inspect available tracking refs and, when available, the relevant open PR's base/head and status. Do not infer PR state solely from hashes: squash merges, cherry-picks, rebases, and equivalent changes can alter ancestry. State unavailable GitHub/API evidence.
4. For unreleased/released comparison, use an explicitly selected release line and ancestry. Optional tags, GitHub releases, and `CHANGELOG` entries are evidence, not guaranteed inventory. Do not select the nearest tag or sort dates blindly; a tag is not proof of deployment. If no defensible release baseline exists, report unknown and why.
5. Finish with the requested-scope evidence, each state marked present/absent/unknown with its baseline/ref, confidence and limitations. Distinguish local/index/untracked content from commits and remote publication; do not equate release tagging with deployed software.
