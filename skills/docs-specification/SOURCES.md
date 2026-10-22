# Sources and adaptation — specification

## Exact pinned sources

Source repository: [mattpocock/skills](https://github.com/mattpocock/skills), revision `5beb35b040e3de97e54fa9e386d7e42d15c295c2`, MIT, full notice in `LICENSE.matt`.

|Exact upstream path|Local file|Adopted mechanism|Divergence|Notice|
|---|---|---|---|---|
|[`skills/engineering/to-spec/SKILL.md`](https://raw.githubusercontent.com/mattpocock/skills/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/to-spec/SKILL.md)|`skills/docs-specification/SKILL.md`|Conversation/code synthesis without re-interview, domain vocabulary/ADR awareness, consumer test-seam selection, problem/solution/implementation/testing/boundary specification.|No mandatory tracker/labels, excessive story boilerplate or extra seam-approval ritual. Canonical requirements/design owners, source-grounded acceptance, native permissions and user-authorized persistence/publication govern.|`LICENSE.matt`|
|[`LICENSE`](https://raw.githubusercontent.com/mattpocock/skills/5beb35b040e3de97e54fa9e386d7e42d15c295c2/LICENSE)|`skills/docs-specification/LICENSE.matt`|Full upstream MIT notice, unmodified.|None.|`LICENSE.matt`|

Companion coverage: no upstream companion files. Substantive acceptance/content shape is maintained in `references/content-contract.md` and remains linked from the entrypoint. Domain terms/ADRs route to `docs-domain-modeling`; existing source-grounded spec format also informs `workflow-delivery/references/specification.md`, but this skill owns general synthesis and optional publication contract. User-invoked through `disable-model-invocation: true`; no upstream agent metadata imported.