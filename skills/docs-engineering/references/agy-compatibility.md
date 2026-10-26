# Antigravity CLI (`agy`): compatibility assessment

Load only when the selected compatibility or upgrade target is Antigravity CLI (`agy`). Apply the shared [harness compatibility procedure](harness-compatibility.md) for scope, authorization, evidence layers, safe missing-capability handling and result reporting. This companion supplies `agy`-specific sources and checks, not a second assessment workflow or permission to install, update or execute.

## Establish the actual baseline

For an authorized installed-state assessment, confirm the current interfaces before relying on remembered flags:

```sh
agy --version
agy --help
agy plugin --help
agy mcp --help
```

Locate effective configuration and plugin trees through supported interfaces (`agy plugin list`, inspection of `~/.gemini/config/plugins/` or workspace `.agents/plugins/`) rather than assuming hardcoded locations. Inspect only relevant non-secret settings, plugin manifests, rule files, and prompt overlays. Separate defaults from overrides. A running session does not prove the overlays or loaded sources of another process; never dump authentication stores or private API keys.

## Resolve authoritative sources

Use official Antigravity documentation, the requested official release, and version-pinned documentation/source for the scoped contracts. Record the exact version, immutable binary digest, and relevant customization specifications (`builtin/skills/agy-customizations/` and `builtin/skills/plugin/SKILL.md`). Resolve the current stable release only when the request asks for latest; do not substitute an unverified build.

## Select the native check

Distinguish native plugin discovery, manifest validation (`plugin.json`), rule merging (`rules/AGENTS.md`), subagent registration (`agents/<name>.md`), MCP configuration (`mcp_config.json`), and consuming-agent behavior.

When a static plugin-loading check is authorized, use a disposable directory outside the active installation. The native plugin validation mechanism exercised in Antigravity CLI is:

```sh
agy plugin validate "$SCRATCH/plugin-root" --json
```

Confirm support in the selected runtime version. Compare validation findings against expected structure: verify 0 errors, expected skill/agent/rule counts, and document known size warnings (such as skills exceeding the 24,000-byte inline cap). This passive validation check sends no inference request and runs no external processes; it does not establish consuming-agent prompt compliance or OS isolation. Do not copy credentials, start background daemons, or alter active user configuration to obtain a pass.

## Report within the exercised boundary

Use the shared procedure's result format, retaining the actual `agy` version, source/configuration basis, permitted checks, observed outputs and unverified surfaces. Previously observed `agy` plugin validation is historical evidence, not a standing guarantee. Missing native discovery or an unavailable candidate leaves that claim unverified rather than triggering automatic repairs.
