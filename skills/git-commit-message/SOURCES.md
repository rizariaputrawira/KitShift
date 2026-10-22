# Sources and authorship: commit-message

This skill is original, locally authored guidance for concise commit-message suggestions from repository changes. No upstream skill text, templates, scripts, or other payload were copied or adapted.

The author also inspected these immutable upstream references and their same-revision MIT licenses as conceptual research:

| Reference | Inspected concept | Deliberate divergence |
|---|---|---|
| [GitHub commit-message-storyteller](https://github.com/github/awesome-copilot/blob/252f342650f04b6c79b67c447edecc7a5965b8f7/skills/commit-message-storyteller/SKILL.md) ([LICENSE](https://github.com/github/awesome-copilot/blob/252f342650f04b6c79b67c447edecc7a5965b8f7/LICENSE)) | Diff-based intent and identifying mixed concerns | No fixed Conventional Commit format or story boilerplate |
| [VS Code commit skill](https://github.com/microsoft/vscode/blob/b4317ecbafa742b06fc9dac7b74f1bd5f04739aa/src/vs/sessions/skills/commit/SKILL.md) ([LICENSE.txt](https://github.com/microsoft/vscode/blob/b4317ecbafa742b06fc9dac7b74f1bd5f04739aa/LICENSE.txt)) | Recent history style, relevant diffs, intent, and optional body | No `git add -A`, commit, or execution |

These references informed original guidance only; no prose, templates, or code were copied or adapted. No upstream notice is required for this original work. The procedure also reflects the task requirements and supplied, current description of repository commit-message style. This provenance does not claim runtime behavior.

## Local maintenance

Explicit user formatting takes precedence over inferred repository style and the default split-concern response template. Status inspection uses `git --no-optional-locks status` to avoid the optional index refresh described in [Git's status documentation](https://git-scm.com/docs/git-status#_background_refresh). These are local guidance corrections, not upstream OMP behavior or technical sandbox enforcement.
