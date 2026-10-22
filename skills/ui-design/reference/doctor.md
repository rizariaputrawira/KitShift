Report drift in an explicitly selected project's persistent Impeccable artifacts: PRODUCT.md, DESIGN.md, optional `.impeccable/design.json`, configuration, surface briefs and helper hooks. Ordinary UI work does not require these artifacts.

Follow [Workflow and authority](../SKILL.md#workflow-and-authority). Doctor is report-only unless the current request specifically covers repairs. Do not redesign, update/install tools, initialize missing context, or mutate configuration as a diagnostic side effect. Use native reads when helper execution or its launcher side effects are outside scope.

## What this owns, and what it does not

Three kinds of drift travel under "out of date". Keep them apart:

- **Tool version.** A helper may report `UPDATE_AVAILABLE`; that is an informational claim, not authority to update. Updating the installed skill or runtime is outside this command.
- **Schema drift.** Compare artifact fields and paths with the actual selected helper's supported format. Mechanical repair suggestions remain suggestions until repairs are covered.
- **Truth drift.** The code moved on and the document no longer describes it. No file comparison settles this. `document` owns DESIGN.md, `init` owns PRODUCT.md, and this command's job is to hand them a specific gap rather than a vague suspicion.

## Step 1: Obtain the report

Prefer native reads for a read-only request when the launcher would download/cache/execute an unavailable runtime. Run the helper below only when its actual execution and launcher side effects are covered; missing artifacts do not authorize initialization.

```
<skill-base-dir>/scripts/impeccable doctor --json
```

Add `--target <path>` when the user named a workspace, file, or route in a monorepo. Without it the report describes the repo root, and in a monorepo that is often the wrong project.

The output carries `findings` (each with `id`, `artifact`, `path`, `severity`, `summary`, `fix`) and, in a monorepo, `workspaces` with each app's product and design resolution. `ruleRegistryAvailable: false` means ignored rule ids could not be validated; say so rather than implying that list is clean.

An empty `findings` array is the good outcome. Say so in one line and stop.

## Step 2: Act by severity

Severity is helper classification, not permission:

- **`auto`** identifies a mechanically proposed repair. Report its exact paths and changes; do not run `--fix` solely because of this label.
- **`mention`** is informational. State the finding and its offered remedy.
- **`route`** identifies a different workflow. Name the gap and the relevant reference; execute only if the current request covers that work.

Report all groups together. When repairs are specifically authorized, inspect the proposed changes and run `<skill-base-dir>/scripts/impeccable doctor --fix` only if all of its affected writes fit that scope. If it would also repair unrelated artifacts, do not use a broad fix as a shortcut; apply only the authorized repair through a supported narrower route. Report actual changes and unresolved findings separately.

## Step 3: Interpret retired fields in context

A helper's deprecated-field finding describes that helper's consumption, not the native task's authority. Explain which field is no longer read and why. Do not delete user context or disregard a current explicit requirement merely because a helper does not consume its schema. Removal is a separate authorized repair.

## Step 4: Do not overclaim on truth drift

`design-md-drift` counts commits to the visual source directories since DESIGN.md was last edited. A commit count is not a contradiction. Report the number, say what it measures, and if the user wants to know whether the document is actually wrong, read DESIGN.md against the current tokens and components and answer from that. Never assert that DESIGN.md is stale because the number is large.

The same restraint applies to `workspace-context-inherited`. Inheritance is a designed behavior. Whether one product record truthfully describes several apps is a question for the user, not a defect to fix.

## Monorepo notes

- `workspace-platform-native-evidence` can indicate that helper context inherits a web record despite native build evidence. Load [ios.md](ios.md) / [android.md](android.md) from the actual target; do not withhold native guidance pending PRODUCT.md creation. A child record is an optional persistent-workflow repair.
- `config-project-roots-match-nothing` means no configured root glob matched. Report the patterns and resolve the current task's actual target from repository evidence before asking any material question.
- `config-invalid-build-path` and `config-build-path-unset` concern helper preference `buildPath` (`comp` or `code`) in shared or local Impeccable configuration. Report the actual value and its meaning for that helper. Missing configuration does not select a comp-led native workflow, require image generation, or authorize recording a preference.
- Use the `workspaces` table to show the user which apps carry their own context, which inherit, and which have none, before proposing any change.

## Opting out of the boot check

For a selected persistent workflow, `"stalenessCheck": false` in `.impeccable/config.json` or `IMPECCABLE_NO_STALENESS_CHECK=1` can disable the helper's boot reminder. Explain these options when relevant; change configuration or environment only within the current request. Ordinary native work does not need a boot check.
