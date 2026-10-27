# Oh My Pi (`omp`): compatibility assessment

Load only when the selected compatibility or upgrade target is Oh My Pi (`omp`). Apply the shared [harness compatibility procedure](harness-compatibility.md) for scope, authorization, evidence layers, safe missing-capability handling and result reporting. This companion supplies `omp`-specific sources and checks, not a second assessment workflow or permission to install, update or execute.

## Establish the actual baseline

For an authorized installed-state assessment, confirm the current interfaces before relying on remembered flags:

```sh
omp --version
omp --help
omp config --help
omp config path
omp read --help
```

`omp config path` locates effective configuration; determine the effective skill/agent directory through supported interfaces and relevant configuration rather than assuming this command returns it. Inspect only relevant non-secret settings, skill sources and prompt/config overlays. Separate defaults from overrides. A detached process does not prove the overlays or loaded sources of an existing session; never dump authentication stores or full secret-bearing configuration.

## Resolve authoritative sources

Use the [official omp repository](https://github.com/can1357/oh-my-pi), the requested official release and version-pinned documentation/source for the scoped contracts. Record the exact version and immutable source revision. Resolve the current stable release only when the request asks for latest; do not substitute a historical observation or unreleased change for that release.

## Select the native check

Distinguish native skill discovery, metadata handling, `skill://` reads, `/skill:` invocation, agent-definition parsing and actual consuming-agent behavior. Hidden invocation metadata is not access control; configured roles/models are not observed identities. For integrations, inspect configuration, connection, tool discovery and action execution as separate claims. Use the current supported task/result schemas rather than fixed agent definitions or model mappings.

When a source-loading check is authorized, use a disposable directory outside the active installation with a candidate `skills/` tree. The agent-directory mechanism exercised in omp 18.12.6 is:

```sh
PI_CODING_AGENT_DIR="$SCRATCH" omp read 'skill://docs-engineering/references/omp-compatibility.md:raw'
```

Confirm support in the selected runtime version. Record candidate source digests and compare actual loaded content with the expected source. This passive loader check sends no inference request; it does not establish invocation behavior, model compliance, service connectivity or OS containment. Do not copy credentials, start services, weaken approval/tool settings or alter the active installation to obtain a pass. Separate authorization is required for consuming-agent assessments or authenticated calls.

## Report within the exercised boundary

Use the shared procedure's result format, retaining the actual omp version, source/configuration basis, permitted checks, observed outputs and unverified surfaces. Previously observed omp 18.12.6 loading is historical evidence, not a standing guarantee. Deliberate filtering remains binding; missing native discovery or an unavailable isolated candidate leaves that claim unverified rather than triggering setup or an in-place upgrade.
