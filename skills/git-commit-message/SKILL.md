---
name: git-commit-message
description: "Use when asked to suggest, draft, or improve a Git commit message from actual repository changes; this advises only and never commits."
---

# Commit message

Inspect actual changes and propose concise, natural developer-written Git commit message text. This skill advises only; it does not authorize or perform a commit or any other repository mutation.

## Inspect the right evidence

1. Read `git --no-optional-locks status` to establish staged, unstaged, and untracked state without writing Git's optional index refresh, then inspect the staged diff (for example, `git diff --staged`) to determine whether staged changes exist. Use read-only Git inspection only.
2. If anything is staged, treat the staged diff as the complete subject of the proposed message. Do not include unstaged or untracked changes. If staged scope is unclear, inspect only relevant staged paths and ask for clarification when the change's intent cannot be supported by evidence.
3. Only when nothing is staged, inspect relevant unstaged diffs and, where needed, the actual contents of relevant untracked files. Never infer their contents from names. Do not inspect unrelated work.
4. Follow the user's explicit message format first. Otherwise, read recent commit subjects and, when useful, bodies to learn this repository's actual style: capitalization, tense, prefixes, punctuation, length, scope notation, and body usage. History is the default style guide. Use Conventional Commit syntax when explicitly requested or demonstrably consistent with recent history.
5. Ground the message in what the changes do and their evidenced intent, not merely filenames. Distinguish enabling or configuring an existing feature from adding a new one, and retain the changed feature's specific meaning rather than broadening it to nearby functionality. Be conservative when motivation is ambiguous. Do not inflate claims about performance, security, tests, cost, or outcomes beyond the inspected evidence.

## Write the suggestion

Normally provide one concise subject line and nothing else. Prefer plain, specific verbs; avoid marketing, release-note, or pull-request prose and inflated words such as “enhance,” “leverage,” “streamline,” “robust,” or “comprehensive,” unless accurate and established by relevant local usage. Add a short body only when it usefully explains non-obvious rationale, compatibility, migration, or a trade-off that the subject cannot convey. Match observed history where it fits; do not add issue IDs, footers, co-author lines, or other metadata unless requested or established by relevant history.

For genuinely separate, independently committable concerns, use the user's requested response format or, when none is specified, this default:

```text
These changes appear to contain separate concerns.

Suggested commits:

1. First human-style commit message
2. Second human-style commit message
```

Replace the example messages with concise suggestions grounded in each concern. Add path groups only when needed to clarify which changes belong to each commit; they are optional, not headings. Use this only when splitting is supported by actual changes, not incidental file groupings. If there are no changes to describe, say that there are no changes and do not fabricate a message.


## Strict read-only boundary

This is message advice, not repository operation. Never alter source files, the index, refs, configuration, history, branch state, remotes, or worktree. Do not run `git add`, `commit`, `amend`, `reset`, `restore`, `checkout`, `switch`, `rebase`, `merge`, `cherry-pick`, `tag`, `push`, or `clean`, or use any equivalent mutation through another tool. Read-only status, diff, log, and show inspection is allowed. These prose limits guide behavior; they are not technical enforcement or a sandbox.

Requests such as “how should I commit this?”, “what should I write as the commit message?”, or “suggest a commit message” ask for text advice, not execution. Return the suggestion in the permitted response channel without taking action.
