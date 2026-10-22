# Command guidance

## Workflow questions

Give advice without executing commands; the menu below is only for bare invocations. Consult relevant command references as needed for prerequisites and scope. Link to the [docs](https://impeccable.style/docs/) for the broader workflow guide. If the user also requests execution, follow that request.

## No-argument routing: the context-aware menu

Read this when the user invokes `$impeccable` with no argument. They are asking "what should I do?" Make the menu context-aware instead of static.

Use the request and existing project/visual evidence to lead with **2–3 useful next commands**, each with a concrete reason, then offer the Commands-table menu. Missing PRODUCT.md is not evidence that the project needs initialization. Do not run context, signals or a detector merely to produce a menu. An already authorized helper result can inform suggestions; do not bootstrap an engine to obtain one. **Never auto-run the suggested command.**

Reason over the signals; there is no score to obey:

- Existing coherent code with no DESIGN.md → offer `document` only when capturing the system would help the user's goal; the missing file alone is not a blocker.
- `critique.latest` is `null` → the project has never been critiqued; for a set-up project with a real surface, offering `$impeccable critique <surface>` is a strong default.
- An existing critique's material findings → suggest scoped `polish` when still supported by the current surface; using a snapshot does not authorize rewriting or closing it.
- `git.changedFiles` pointing at one surface → scope `audit` or `polish` to those files specifically, naming them.
- `devServer.running` true → `live` is available for in-browser iteration, and `generate` for one-shot variant runs on a named element; if false, don't lead with either. **`live`, `generate`, and the bundled `impeccable detect` are web-only.** If `setup.platform` is `ios`, `android`, or `adaptive`, don't lead with any of them; the browser overlay and the HTML rule engine don't apply to native app code.
- Otherwise group by intent (build new / improve what's there / iterate visually), tailored to the current surface and `setup.platform`.

If an applicable detector result is already available from an authorized run, use its actual scope, rule locations and limits in the recommendations. Do not run a scan, start a server or attempt launcher bootstrap merely because scan targets can be inferred. Native platform work skips the web-only detector.

Keep it to 2-3 pointed picks with the exact command to type. The menu stays the fallback; the recommendation is the lede.
