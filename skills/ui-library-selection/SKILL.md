---
name: ui-library-selection
description: "[Emil Kowalski] Pick a frontend library only when explicitly invoked; does not trigger on its own."
disable-model-invocation: true
---

Modified adaptation; public metadata/routing updated locally. See [SOURCES.md](SOURCES.md)
and the complete [MIT notice](LICENSE.emil).

# Picking The Right Library

## 1. Establish the actual task and authority

Answer the supplied question directly. If no task is given, briefly explain the helper's purpose and ask for the missing requirement; do not stop at a fixed greeting. Identify each requested capability and any explicit library, platform, or project constraint.

Respect a question about a named library. Do not silently replace it with a catalog preference; explain a material mismatch with evidence and offer a compatible alternative when useful. Selection/review is read-only. Installing, replacing, or wiring a dependency requires that implementation to be part of the request.

**Done:** the actual task, explicit constraints, and recommendation-versus-implementation boundary are identified.

## 2. Inspect the project and incumbent solution

When a project is relevant, inspect its actual workspace/package boundaries, manifests, lockfile, package manager, installed versions, framework/runtime, rendering model, styling/components, and affected implementation. `package.json` is a starting point, not the complete compatibility contract.

Check whether the incumbent component/library, a platform API, or a small existing implementation already meets the need. Prefer adequate existing owners over gratuitous dependency churn, whether or not they appear in this catalog. A listed library is not automatically suitable for every installed version or target.

If no project is supplied, give a scoped general recommendation with explicit assumptions; do not initialize a project to manufacture context. Resolve available facts before asking about material unknowns.

**Done:** relevant incumbents and compatibility constraints are known, or the limits of a context-free recommendation are explicit.

## 3. Evaluate fit, not catalog membership

Use the curated list below as a taste-driven shortlist, not an exhaustive inventory or a technical requirement. Compare the requested behavior with actual framework/runtime/version support, deployment/rendering constraints, incumbent integration, relevant accessibility needs, and known licensing or project restrictions.

Consult version-appropriate primary documentation when a material compatibility/API claim needs confirmation. Distinguish documented library capabilities from observed project behavior: library choice alone does not prove focus management, keyboard operation, accessibility conformance, no-flash theming, security, or performance.

Consider no new dependency when existing components or native behavior suffice. If a curated option does not fit, say why and identify the alternative as outside the curated list. Do not invent benchmark, maintenance, cost, or capability comparisons; measure relevant performance claims or state their evidence limits.

**Done:** the proposed choice—or no-dependency decision—fits the actual requirements with supported reasons and material uncertainty explicit.

## 4. Recommend with a concrete tradeoff

Give the task, recommended choice, reason it fits, and material tradeoff/limitation. Identify relevant installed/version/documentation evidence and separate source-based advice from runtime-tested compatibility. Recommend one clear choice when justified; present alternatives only when the user must resolve a materially different tradeoff.

Cover every requested capability rather than treating “one recommendation” as permission to discard parts of the task. Do not install anything merely to strengthen a recommendation.

**Done:** the user has an actionable, evidence-bounded recommendation and knows whether any implementation is proposed rather than performed. Recommendation-only work ends here.

## 5. Implement and verify only when requested

For authorized integration, use the project's actual package manager, workspace, version constraints, and existing owners. Update affected callers and relevant dependency/lockfile records within scope; do not migrate an unrelated incumbent or introduce a second competing system.

Run the appropriate project checks and exercise the changed behavior. For a changed UI, inspect it using available permitted Playwright MCP tools and check the relevant interactions, keyboard/focus, states, and supported target contexts. A dependency installation or passing build alone is not integration proof.

Report actual changes, commands/results, exercised behavior, and unresolved prerequisites. If a needed runtime/tool is unavailable, complete independent reachable checks and identify the unverified path; do not call source-based advice a completed integration.

**Done:** the authorized integration and named acceptance criteria are exercised where possible, with remaining gaps explicit and no unsupported capability/conformance claim.

## The list

### UI components & primitives

| Task | Library |
| --- | --- |
| Unstyled UI primitives (dialogs, popovers, menus, selects…) | [base-ui](https://base-ui.com) |
| Command menus (⌘K palettes) | [cmdk](https://cmdk.paco.me) |
| Toasts / notifications | [Sonner](https://sonner.emilkowal.ski) |
| One-time password / verification code inputs | [input-otp](https://input-otp.rodz.dev) |
| Customizable GUIs / control panels | [Leva](https://github.com/pmndrs/leva) — [dialkit](https://joshpuckett.me/dialkit) is an alternative |

### Motion & visuals

| Task | Library |
| --- | --- |
| General-purpose animation (springs, layout animations, enter/exit) | [motion](https://motion.dev) (Framer Motion) |
| Animating numbers (counters, prices, stats) | [NumberFlow](https://number-flow.barvian.me) |
| Animated text components | [torph](https://torph.lochie.me/) |
| 3D globes | [Cobe](https://cobe.vercel.app) |
| Dynamic OG images (HTML/CSS → SVG/PNG) | [Satori](https://github.com/vercel/satori) |
| Syntax highlighting | [shiki](https://shiki.style) |

Motion is a candidate when the requested behavior needs its spring, layout, exit, or gesture facilities and the installed stack supports them. A simple hover or fade may fit existing CSS transitions; do not add a dependency merely because the task involves motion.

### Charts

| Task | Library |
| --- | --- |
| Real-time / streaming charts | [Liveline](https://github.com/benjitaylor/liveline) |
| General charts (static or interactive dashboards) | [recharts](https://recharts.org) |

For a compatible project, Liveline is a curated candidate for time-scrolling live data and Recharts for general charts. Check the actual chart types, data, renderer, and integration constraints; this split does not make every other chart a Recharts task.

### Interaction & performance

| Task | Library |
| --- | --- |
| Drag and drop | [dnd kit](https://dndkit.com) |
| Virtualization (long lists, large tables) | [Virtuoso](https://virtuoso.dev) |

### State & styling

| Task | Library |
| --- | --- |
| State management | [zustand](https://zustand.docs.pmnd.rs) |
| Constructing `className` strings conditionally | [clsx](https://github.com/lukeed/clsx) |
| Type-safe, variant-driven styling for Tailwind | [cva](https://cva.style) |
| Theme switching / dark mode | [next-themes](https://github.com/pacocoursey/next-themes) |

The styling shortlist distinguishes ad-hoc conditional classes (clsx) from deliberate typed component variants (cva). They can be considered together when the actual styling system benefits; verify the installed APIs rather than relying on an internal implementation assumption.

## Conditional investigation prompts

These are reasons to inspect the actual need, not automatic replacement rules:

- For notifications, compare the existing solution with Sonner when its behavior fits; do not replace an adequate incumbent simply because it is custom.
- For dialogs/dropdowns, inspect required semantics, focus, keyboard, and dismissal behavior. A suitable primitive can help, but its presence does not verify the resulting UI.
- For changing numbers, consider NumberFlow only when digit transitions are actually required; ordinary text updates may be correct.
- For long lists/tables, investigate actual rendering cost and interaction needs. Row count alone is not a benchmark; virtualization and pagination solve different requirements.
- For shared state, inspect ownership and update patterns before recommending Zustand. Local state, context, or the existing store may be sufficient.
- For conditional classes, compare clarity and actual variant needs before introducing clsx/cva. A ternary count alone does not establish a dependency requirement.
