# Explicit generated design artifacts

Locally authored guidance. Use OpenDesign Cloud or Local Codex only when the user requests that capability, not merely because a generated image/artifact would be useful. Ordinary UI work and Impeccable's named-element live variants do not select this path. Follow [workflow and authority](../SKILL.md#workflow-and-authority).

## Ordered workflow

1. **Establish intent and scope.** Distinguish exploration, refinement of an existing artifact, and authorized implementation. Carry preservation constraints forward. A generated artifact or its acceptance does not grant implementation, project-creation or publication authority.

2. **Inspect the owning interface.** Read the currently mounted tool schemas and server instructions before use; distinguish discovery, authentication, project access, dispatch and execution from the actual error evidence. Use bounded, permitted read-only diagnostics. Do not assume an endpoint, CLI entrypoint, environment variable, daemon version or service lifecycle from this reference. Do not install, start, reconnect or provision anything without current authority. Runtime discovery for generation does not establish task-agent availability on the current host.

3. **Resolve project/file context.** Honor an explicit project or file. For “this file” or the design the user has open, use the supported active-context defaults of `get_artifact`, `get_project` or `get_active_context`; do not force a repository-name mapping or list every project first. Retain the resolved identity when consistency across later calls matters; if context expires, re-resolve rather than silently switching. For a different or ambiguous target, use permitted project discovery and ask only if evidence cannot resolve the material choice. An explicitly missing target is not permission to choose another or create one. Create a project only when the requested generation/setup actually authorizes creation.

4. **Prepare the brief.** For a new artifact, use the current brief-card/confirmation flow unless the user explicitly requests skipping questions. Reuse known answers and the readable confirmed brief, not internal correlation values. For refinement, name the existing artifact and preservation constraints. Include the objective, audience, actual product content, incumbent tokens/components, platform/viewports, accessibility, exclusions and source evidence that the external tool can actually access. Separate facts, requirements, proposed direction and unknowns; never transmit secrets. Documentation-first records remain conditional on their existing owners and actual project requirements, not a new prerequisite.

5. **Select the requested execution mode.** Honor the chosen OpenDesign Cloud or Local Codex mode and current server workflow. For Cloud generation, check the owning login interface and complete its sign-in flow only when needed; expose only the intended activation URL/code, never credentials or private authentication parameters. Discover installed agents before supplying an agent override. Leave model, tier, plugin and recipe overrides unset unless the request or established configuration selects them; do not alter host routing or settings.

6. **Commission and observe.** Use the actual `start_run` schema with the resolved project context, evidence-backed prompt and one canonical UUID/ULID `requestId` for the confirmed action. Reuse the identical payload and identifier after a lost response; do not submit a second run while the original is in flight. Observe `get_run` through its documented terminal states. On a recharge response, show the intended recharge link; only after the user confirms top-up resume the original action using the same payload/identifier and supported resume field. Report other failures rather than automatically commissioning replacements.

7. **Inspect the delivered result.** A successful run that only asks a question is not a finished artifact. Use the returned Preview/Studio delivery and permitted rendered inspection. When source context is needed, prefer `get_artifact` with supported project/entry/include/byte-cap fields, then inspect relevant omitted context before claiming completeness; page `get_file` when necessary. Text extraction cannot prove binary appearance. Missing rendered access means source-only inspection. Keep internal run/project identifiers as technical evidence, not user-facing product names or permanent mappings.

8. **Reconcile and return.** Compare the artifact with the brief, product truth, preserved behavior, incumbent system, accessibility and target platform. Unsupported claims, navigation, pricing, metrics, customer evidence, backend behavior and states are not authorized merely because generation supplied them. Exploration returns a reviewed proposal. Already-authorized implementation resumes the normal native UI workflow and relevant rendered/interaction verification; only material scope or consequence changes require further user resolution.

## Historical interface research

The records below describe earlier source inspection, not installed configuration, current readiness or a version requirement. No service, project or run is created by loading this reference.

Interface/lifecycle evidence was inspected against official OpenDesign 0.23.1 source at immutable commit `5b19dfa4351b3eed33826ee72746a7c653c23a54`:

- [MCP tools](https://github.com/nexu-io/open-design/blob/5b19dfa4351b3eed33826ee72746a7c653c23a54/apps/daemon/src/mcp.ts)
- [CLI and lifecycle](https://github.com/nexu-io/open-design/blob/5b19dfa4351b3eed33826ee72746a7c653c23a54/apps/daemon/src/cli.ts)
- [WSL setup](https://github.com/nexu-io/open-design/blob/5b19dfa4351b3eed33826ee72746a7c653c23a54/docs/wsl-setup.md)

The earlier integration review recorded checkout/remote revision `f239d2f6b863dcf3e4214f51f5fa52b569f28de2` and separately inspected release `open-design-v0.24.1` at `89e64d813bb1c7a11519b3f668f011f7017637d7`. These are historical research identifiers, not current/latest or installed-version claims. Health/version output alone cannot prove running-byte identity. No upstream executable or prose payload is redistributed by this reference.
