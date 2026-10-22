<!-- Local correction: a pre-existing CSP variable alone is not evidence that the development-only directive patch is applied. -->
Optional one-time setup for an explicitly selected live helper workflow. Read when configuration is missing/invalid, relevant drift needs handling, or CSP status is unknown. Follow [Workflow and authority](../SKILL.md#workflow-and-authority): a missing file or helper verdict does not itself authorize config writes, injection targets, dependency installation, CSP changes or services. Determine whether the current request covers the needed effects; perform covered operations without redundant approval and report any uncovered prerequisite.

## Write the config

When configuration writes are covered, create or repair the reported path (default `.impeccable/live/config.json`) after confirming it belongs to the requested project:

```json
{
  "files": ["<path-or-glob>", "<path-or-glob>", ...],
  "exclude": ["<optional-glob>", ...],
  "insertBefore": "</body>",
  "commentSyntax": "html",
  "cspChecked": true
}
```

`files` is the inject target: **the HTML files the browser actually loads**, not necessarily source (tracked vs generated does not matter here; wrap has its own generated-file guard). Entries are literal paths or globs. `exclude` (optional) skips files a `files` glob would otherwise include (email templates, demo fixtures). `cspChecked` records that the CSP step below has run; absent on first setup.

**Hard-excluded paths (cannot be overridden):** `**/node_modules/**` and `**/.git/**`; injecting there would instrument third-party code.

**Glob syntax:** `**` matches any number of segments (including zero), `*` matches within a segment, `?` matches one character. Paths are project-root-relative with forward slashes.

| Framework | `files` | `insertBefore` | `commentSyntax` |
|-----------|---------|----------------|-----------------|
| SPA with single shell (Vite / React / Plain HTML) | `["index.html"]` | `</body>` | `html` |
| Next.js (App Router) | `["app/layout.tsx"]` | `</body>` | `jsx` |
| Next.js (Pages) | `["pages/_document.tsx"]` | `</body>` | `jsx` |
| Nuxt | `["app.vue"]` | `</body>` | `html` |
| Svelte / SvelteKit | `["src/app.html"]` | `</body>` | `html` |
| TanStack Router (SPA, Vite) | `["index.html"]` | `</body>` | `html` |
| TanStack Start (SSR) | `["src/routes/__root.tsx"]` | `<Scripts` | `jsx` |
| Astro | `[" <root layout .astro>"]` | `</body>` | `html` |
| Multi-page (separate HTML per route) | `["public/**/*.html"]` glob over the served dir | `</body>` | `html` |

Pick an anchor that exists in every file (`</body>` almost always works); `insertAfter` matches after a line instead. For multi-page sites prefer a glob so new pages are picked up automatically. For sites whose pages are rebuilt by a generator, the inject survives only until the next regeneration: re-run `impeccable live` after each build (accept is unaffected; it writes true source via the fallback flow).

**Framework adapters (auto-detected at inject time).** Every inject records what it wrote in `.impeccable/live/inject-journal.json`; the next inject or remove heals artifacts a crash or wrong-directory stop left behind. SvelteKit, Nuxt, and TanStack Start server-render their document shell, so a raw `<script>` in the entry template will not execute reliably; `impeccable live-inject` detects them and routes to a dedicated adapter (SvelteKit: dev-only root component from `+layout.svelte`; Nuxt: dev-only `.client.ts` plugin; TanStack Start: a generated dev-only `ImpeccableLiveRoot` component in `__root`). The `files` value stays a valid detection/CSP hint but is not the literal insertion site. A plain TanStack Router SPA takes the baseline Vite path.

## Config drift

Boot may report `configDrift.orphans` for HTML files outside the resolved injection list. Explain relevant uncovered files. Extend the config only if the current request covers those targets; unrelated files remain outside scope. Prefer a deliberate bounded list or glob over automatically covering every discovered page.

## CSP detection (first-time only)

Keep all allowances below development-only, including manual middleware and meta-tag edits. Do not change a deployed production site's CSP to load the localhost helper; see [live.md](live.md) for production inspection alternatives.

If `config.cspChecked === true`, use the recorded result only as a past check, not proof the current CSP permits injection. Reassess when evidence shows the policy changed. Run the detector below only when its execution/launcher effects are covered.

```bash
<skill-base-dir>/scripts/impeccable detect-csp
```

Output `{ shape, signals }`; the shape names the *patch mechanism*, so one template covers many frameworks:

- **`null`**: no CSP; write the config with `cspChecked: true` and stop here.
- **`append-arrays`**: CSP as structured directive arrays; auto-patchable (monorepo helpers with `additionalScriptSrc`/`additionalConnectSrc`, SvelteKit `kit.csp.directives`, Nuxt `nuxt-security`).
- **`append-string`**: CSP as a literal value string; auto-patchable (inline `next.config.*` `headers()`, Nuxt `routeRules`).
- **`middleware`** / **`meta-tag`**: detection does not supply an automatic patch. Identify the exact development-only policy source and required local helper allowance. Make a change only within current authority; otherwise report it as a prerequisite.

### Resolve the CSP change

Inspect the actual diff before applying it. The live helper needs its actual local origin in `script-src` and `connect-src`; the examples below use `http://localhost:8400`, so substitute the returned origin when different. Keep allowances development-only and preserve all other policy constraints. Do not claim a change is development-only until its guard and configuration behavior support that claim.

If the current request already specifically covers this necessary CSP edit, apply it without a redundant approval ritual. If it does not, explain the exact file/diff and ask only for that material scope decision. A refusal leaves the policy unchanged and live injection unavailable; do not treat tool failure or silence as consent.

Record `cspChecked: true` only within authorized configuration writes and describe what was actually checked. It is not an approval receipt or a claim that injection succeeded.

### append-arrays

Declare near the top of the file that holds the CSP arrays, then append `...__impeccableLiveDev` to the script-src and connect-src arrays:

```ts
// Dev-only allowance so impeccable live mode can load. Guarded by NODE_ENV.
const __impeccableLiveDev =
  process.env.NODE_ENV === "development" ? ["http://localhost:8400"] : [];
```

Per-framework: Next.js + monorepo helper: edit the *app's* `next.config.*` (not the shared helper), appending to `additionalScriptSrc` / `additionalConnectSrc`. SvelteKit: `svelte.config.js`, `kit.csp.directives['script-src']` and `['connect-src']`. Nuxt + nuxt-security: `nuxt.config.*`, `security.headers.contentSecurityPolicy['script-src']` and `['connect-src']`. Reference outputs: [nextjs-turborepo/expected-after-patch.ts](https://github.com/pbakaus/impeccable/blob/8dac6ae7e020c43ab10ce9b41939f6fd42627b96/tests/framework-fixtures/nextjs-turborepo/expected-after-patch.ts), [sveltekit-csp/expected-after-patch.js](https://github.com/pbakaus/impeccable/blob/8dac6ae7e020c43ab10ce9b41939f6fd42627b96/tests/framework-fixtures/sveltekit-csp/expected-after-patch.js). For idempotency, inspect any existing `__impeccableLiveDev` definition, its development guard and its use in both directives before deciding the patch is applied. Its name alone is not evidence; `cspChecked` records the actual check, not successful injection or approval.

### append-string

Two-point patch: declare a dev-only string, interpolate it into the CSP value at both directives (leading space so it concatenates cleanly; convert literals to template strings as part of the edit):

```ts
// Dev-only allowance so impeccable live mode can load.
const __impeccableLiveDev =
  process.env.NODE_ENV === "development" ? " http://localhost:8400" : "";
```

- `script-src 'self' 'unsafe-inline'` becomes `` `script-src 'self' 'unsafe-inline'${__impeccableLiveDev}` ``
- `connect-src 'self'` becomes `` `connect-src 'self'${__impeccableLiveDev}` ``

Per-framework: Next.js inline `headers()` in `next.config.*`; Nuxt `routeRules['/**'].headers['Content-Security-Policy']` in `nuxt.config.*`. Reference outputs: [nextjs-inline-csp/expected-after-patch.js](https://github.com/pbakaus/impeccable/blob/8dac6ae7e020c43ab10ce9b41939f6fd42627b96/tests/framework-fixtures/nextjs-inline-csp/expected-after-patch.js), [nuxt-csp/expected-after-patch.ts](https://github.com/pbakaus/impeccable/blob/8dac6ae7e020c43ab10ce9b41939f6fd42627b96/tests/framework-fixtures/nuxt-csp/expected-after-patch.ts).

## Troubleshooting

If a declined/missing development allowance blocks injection, report the exact prerequisite; do not delete state or repeat the question automatically. When the user subsequently authorizes the change, inspect current policy and update only the covered development configuration. After authorized setup, resume the live workflow through the native service/result interfaces.
