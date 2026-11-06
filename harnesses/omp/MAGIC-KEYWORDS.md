# Oh My Pi (`omp`): optional magic keywords

Use this operator reference only for omp prompt controls. Shared skills remain usable without keywords, supported delegation, or a persistent evaluation kernel. The [shared preferences](../../guidance/APPEND_SYSTEM.md#reasoning-and-execution-strategy) own proportional effort; the [passive skill contract](../../skills/agent-guidance/references/skill-contract.md#real-invocation-and-loading) owns loading and authority boundaries.

## Version and source basis

The following describes **omp 18.16.0**, official revision [`650f3a108229ee11bf68ba3377f4e8c3391cd424`](https://github.com/can1357/oh-my-pi/tree/650f3a108229ee11bf68ba3377f4e8c3391cd424). Recheck the installed version and its documentation before relying on these details after an upgrade. This is an original operator explanation based on read-only research, not a copied notice, runtime extension, model profile, or performance claim.

Primary sources:

- [Official magic-keyword documentation](https://github.com/can1357/oh-my-pi/blob/650f3a108229ee11bf68ba3377f4e8c3391cd424/docs/magic-keywords.md): matching, turn scope, automatic-effort override and configuration.
- [Keyword registry](https://github.com/can1357/oh-my-pi/blob/650f3a108229ee11bf68ba3377f4e8c3391cd424/packages/coding-agent/src/modes/magic-keywords.ts): exact words, setting IDs and required tools.
- [Skill-prompt handling](https://github.com/can1357/oh-my-pi/blob/650f3a108229ee11bf68ba3377f4e8c3391cd424/packages/coding-agent/src/session/agent-session.ts#L8544-L8550) and [skill-argument regression scenario](https://github.com/can1357/oh-my-pi/blob/650f3a108229ee11bf68ba3377f4e8c3391cd424/packages/coding-agent/test/agent-session-skill-keywords.test.ts): native skill prompts scan user-authored arguments rather than the skill body.

## Choose a shortcut, not a universal mode

| Keyword | Native effect in this version | Appropriate use and limits |
|---|---|---|
| `ultrathink` | Adds a careful-reasoning notice. With automatic thinking active, selects the current model's highest supported effort for the turn, bypassing `providers.autoThinkingMaxEffort`. | Difficult diagnosis or consequential design. Does not itself enable automatic thinking, switch models, or guarantee a better answer. |
| `orchestrate` | Adds a multi-agent decomposition, dispatch, integration and verification contract; requires active `task`. | Substantial independently divisible work. Not a default for a small correction; the native notice has its own execution rules, not just an effort hint. |
| `workflowz` | Adds a structured multi-agent workflow using persistent-kernel helpers; requires active `task` and `eval`. | Broad research, reviews or migrations with explicit work items and result contracts. Not a portable API or a way to create missing tools. |
| `jevify` | Adds rubric-first bulk classification through kernel judge helpers; requires active `eval`. | Homogeneous classification, not cross-item reasoning or proof of exhaustive coverage. Confirm consequential classifications against source evidence. |

The [native classification notice](https://github.com/can1357/oh-my-pi/blob/650f3a108229ee11bf68ba3377f4e8c3391cd424/packages/coding-agent/src/prompts/system/jevify-notice.md) restricts inspection to flagged items. Do not choose it for an exhaustive security/correctness review requiring inspection of every item: unflagged items can contain false negatives. Errors, skipped items and truncations remain coverage limits, not clean verdicts.

## Invocation and matching

Put an optional keyword in the **user prompt** or user-supplied arguments to a supported native skill invocation. Do not insert keywords into every `SKILL.md`: a file read does not activate this runtime processing.

- Exact lowercase standalone prose matches. Punctuation and quotes may touch the word; identifiers, paths, file extensions and immediate call syntax do not match.
- Inline code, fenced code, XML/HTML comments, tags and enclosed content are ignored.
- Normal prompt matching follows slash-command/template expansion. Synthetic agent-initiated prompts do not trigger notices.
- Enabled matches add hidden user-attributed notices for that turn. Multiple enabled keywords can add multiple notices; stacking them is not a measured quality improvement.
- Tool-dependent notices are skipped when required tools are inactive. A glowing word or enabled setting does not prove notice delivery, tool availability or successful execution.

Example prompt to type into omp (the fence here is documentation, not the submitted prompt):

```text
ultrathink use code-debugging to diagnose this failure. Compare plausible causes,
choose discriminating probes, and verify the correction at the original boundary.
```

On another harness, omit the keyword and keep the explicit task/procedure. For independent work, request bounded parallel slices only if supported; otherwise execute them directly in dependency order. For classification, state the rubric, unit, exclusions and escalation criteria explicitly and use only available authorized interfaces. Missing optional acceleration does not block ordinary work; missing evidence still limits the conclusion.

## Inspect configuration without changing it

```sh
omp --version
omp config get magicKeywords.enabled
omp config get magicKeywords.ultrathink
omp config get magicKeywords.orchestrate
omp config get magicKeywords.workflow
omp config get magicKeywords.jevify
```

`workflowz` uses the setting ID `workflow`. In this version the global and four per-keyword switches default to `true`; effective values can differ. The global switch gates hidden notices and editor animation; per-keyword switches gate their notices and the `ultrathink` automatic-effort override. Static highlighting can remain when notices are disabled. Inspect the selected host's current controls; this reference does not authorize configuration changes, installation, model calls, remote actions, or expanded permissions.

The keyword mechanisms above were inspected in pinned sources. Native highlighting, notice delivery, automatic effort selection, kernel helpers and keyword-triggered model behavior require separate runtime evidence; source inspection and the portable-guidance cases do not prove them. See [integration evidence](COMPATIBILITY.md) for the exact checks actually exercised.
