# Oh My Pi (`omp`): optional magic keywords

Use this operator reference only for omp prompt controls. Shared skills remain usable without keywords, supported delegation, or a persistent evaluation kernel. The [shared preferences](../../guidance/APPEND_SYSTEM.md#reasoning-and-execution-strategy) own proportional effort; the [passive skill contract](../../skills/agent-guidance/references/skill-contract.md#real-invocation-and-loading) owns loading and authority boundaries.

## Version and source basis

The following describes **omp 18.17.0**, official revision [`75e7801e247d4e3263439d4cc08ccad60dc64bdd`](https://github.com/can1357/oh-my-pi/tree/75e7801e247d4e3263439d4cc08ccad60dc64bdd). Recheck the installed version and its documentation before relying on these details after an upgrade. This is an original operator explanation based on read-only research, not a copied notice, runtime extension, model profile, or performance claim.

Primary sources:

- [Official magic-keyword documentation](https://github.com/can1357/oh-my-pi/blob/75e7801e247d4e3263439d4cc08ccad60dc64bdd/docs/magic-keywords.md): matching, turn scope, automatic-effort override and configuration.
- [Keyword registry](https://github.com/can1357/oh-my-pi/blob/75e7801e247d4e3263439d4cc08ccad60dc64bdd/packages/coding-agent/src/modes/magic-keywords.ts): exact words, setting IDs and required tools.
- [Skill-prompt handling](https://github.com/can1357/oh-my-pi/blob/75e7801e247d4e3263439d4cc08ccad60dc64bdd/packages/coding-agent/src/session/agent-session.ts) and [skill-argument regression scenario](https://github.com/can1357/oh-my-pi/blob/75e7801e247d4e3263439d4cc08ccad60dc64bdd/packages/coding-agent/test/agent-session-skill-keywords.test.ts): native skill prompts scan user-authored arguments rather than the skill body.

## Choose a shortcut, not a universal mode

| Keyword | Native effect in this version | Appropriate use and limits |
|---|---|---|
| `ultrathink` | Adds a careful-reasoning notice. With automatic thinking active, selects the current model's highest supported effort for the turn, bypassing `providers.autoThinkingMaxEffort`. | Difficult diagnosis or consequential design. Does not itself enable automatic thinking, switch models, or guarantee a better answer. |
| `chillax` | Adds a brief-reasoning notice and, on supported per-message-effort models, lowers effort to the model's minimum; a pinned level remains lowered until changed. | Straightforward work where reduced effort is appropriate. It does not enable thinking or raise effort; with automatic thinking it takes precedence over `ultrathink`. |
| `orchestrate` | Adds a multi-agent decomposition, dispatch, integration and verification contract; requires active `task`. | Substantial independently divisible work. It already supplies coordination; its [native notice](https://github.com/can1357/oh-my-pi/blob/75e7801e247d4e3263439d4cc08ccad60dc64bdd/packages/coding-agent/src/prompts/system/orchestrate-notice.md) reserves gates to main and forbids worker checks. |
| `workflowz` | Adds a structured multi-agent workflow using persistent-kernel helpers; requires active `task` and `eval`. | Broad research, reviews or migrations with explicit work items and result contracts. Not a portable API or a way to create missing tools. |
| `jevify` | Adds rubric-first bulk classification through kernel judge helpers; requires active `eval`. | Homogeneous classification, not cross-item reasoning or proof of exhaustive coverage. Confirm consequential classifications against source evidence. |

The [native classification notice](https://github.com/can1357/oh-my-pi/blob/75e7801e247d4e3263439d4cc08ccad60dc64bdd/packages/coding-agent/src/prompts/system/jevify-notice.md) restricts inspection to flagged items. Do not choose it for an exhaustive security/correctness review requiring inspection of every item: unflagged items can contain false negatives. Errors, skipped items and truncations remain coverage limits, not clean verdicts.

## Invocation and matching

Put an optional keyword in the **user prompt** or user-supplied arguments to a supported native skill invocation. Do not insert keywords into every `SKILL.md`: a file read does not activate this runtime processing.

- Exact lowercase standalone prose matches. Punctuation and quotes may touch the word; identifiers, paths, file extensions and immediate call syntax do not match.
- Inline code, fenced code, XML/HTML comments, tags and enclosed content are ignored.
- Normal prompt matching follows slash-command/template expansion. Synthetic agent-initiated prompts do not trigger notices.
- Enabled matches can add hidden user-attributed notices for that turn; a lowered pinned effort from `chillax` persists until changed. Multiple enabled keywords can add multiple notices; stacking them is not a measured quality improvement.
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
omp config get magicKeywords.chillax
omp config get magicKeywords.orchestrate
omp config get magicKeywords.workflow
omp config get magicKeywords.jevify
```

`workflowz` uses the setting ID `workflow`. In this version the global and five per-keyword switches default to `true`; effective values can differ. The global switch gates hidden notices and editor animation; per-keyword switches gate their notices and the `ultrathink` and `chillax` effort effects. Static highlighting can remain when notices are disabled. The packaged configuration leaves both eval backends disabled; do not enable eval as part of this reference. Inspect the selected host's current controls; this reference does not authorize configuration changes, installation, model calls, remote actions, or expanded permissions.

The keyword mechanisms above were inspected in pinned sources. Enabled settings and source loading do not prove notice injection or compliance. Native highlighting, notice delivery, automatic effort selection, kernel helpers and keyword-triggered model behavior require separate runtime evidence; source inspection and the portable-guidance cases do not prove them. See [integration evidence](COMPATIBILITY.md) for the exact checks actually exercised.

## Documentation-first delivery with native orchestration

This composition is based on **omp 18.18.6**, official revision [`9058ab9d229663e229e2867824ba6df6f21e9e59`](https://github.com/can1357/oh-my-pi/tree/9058ab9d229663e229e2867824ba6df6f21e9e59). The earlier sections retain their separate 18.17.0 source basis; this section does not relabel their historical evidence or claim new runtime testing.

Immutable primary sources:

- [Magic-keyword documentation](https://github.com/can1357/oh-my-pi/blob/9058ab9d229663e229e2867824ba6df6f21e9e59/docs/magic-keywords.md): matching and turn scope.
- [Keyword registry](https://github.com/can1357/oh-my-pi/blob/9058ab9d229663e229e2867824ba6df6f21e9e59/packages/coding-agent/src/modes/magic-keywords.ts): registered words and tool prerequisites.
- [Native orchestration contract](https://github.com/can1357/oh-my-pi/blob/9058ab9d229663e229e2867824ba6df6f21e9e59/packages/coding-agent/src/prompts/system/orchestrate-notice.md): outcome ownership, continuation and main-only gates.

For explicitly selected or project-required documentation-first app delivery, read [workflow-delivery](../../skills/workflow-delivery/SKILL.md); when autonomous delivery is selected, load its [shared delivery policy](../../skills/workflow-delivery/references/autonomous-delivery.md). A keyword alone does not select a documentation baseline. KitShift supplies product/document readiness and acceptance; the host supplies its available execution mechanisms.

`orchestrate` is the recommended native shortcut for this large documented-app workflow when `task` is active and the keyword switches allow notice delivery. It already supplies decomposition, delegation, integration, verification and continued orchestration until completion or a genuine blocker. Follow that native contract rather than adding another autonomy runtime.

- `workflowz` is not a synonym or required upgrade: it requires both `task` and `eval`. The planning inspection recorded `eval.js` and `eval.py` as `false`. Do not enable eval, change approval controls, select models, install OmO or add kernel infrastructure for this path.
- `ultrathink` is optional reasoning control, not delivery autonomy. `ultrawork` is absent from the inspected omp registry; do not import OmO commands into omp prompts.
- Submit exact lowercase standalone keywords as **user prose**, not inline code, fenced payloads, XML/HTML or skill-body text. Reading a skill does not activate a keyword.
- A notice applies to its containing user turn. At a new execution or authorized-resume boundary, include the keyword in that user request when the native contract is wanted; do not infer activation from the old plan. No re-entry is needed between documents or slices inside the active execution turn.
- Under an active native orchestration contract, main integrates and performs its required gates. Implementation workers skip builds, tests, linters and formatters. The native contract owns gate scheduling; this reference does not introduce a competing schedule.
- Current read-only Plan Mode, permissions, required approvals, real blockers and explicit pauses still apply. Enabled settings or highlighting do not prove notice delivery or compliance.

The fences below are documentation: type their contents as the user prompt, not as fenced code.

**Initial baseline-first request**

```text
orchestrate use workflow-delivery for documentation-first delivery of this app. Generate the complete applicable baseline and implementation plan, batch consequential questions, and use the native approval boundary. Once authorized, carry implementation, tests, in-scope fixes, and document reconciliation through verified local ready-to-run delivery without stage-advance prompts. Do not deploy, publish, or commit.
```

**Execution or authorized resume in a new user turn**

```text
orchestrate execute or resume the approved workflow-delivery plan at <plan-path>. Reconcile current authority, existing work, and evidence; continue only the remaining authorized work through verified local readiness. Preserve valid completed work. Do not deploy, publish, or commit.
```

Replace `<plan-path>` with the actual readable plan locator; it is not literal executable syntax. Native plan approval is not repeated for settled exact decisions. These local-ready examples do not waive an existing deployment criterion or grant deployment authority.
