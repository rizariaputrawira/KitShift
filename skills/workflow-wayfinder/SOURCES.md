# Sources and adaptation — wayfinding

## Exact pinned sources

Source repository: [mattpocock/skills](https://github.com/mattpocock/skills), revision `5beb35b040e3de97e54fa9e386d7e42d15c295c2`, MIT, full notice in `LICENSE.matt`.

|Exact upstream path|Local file|Adopted mechanism|Divergence|Notice|
|---|---|---|---|---|
|[`skills/engineering/wayfinder/SKILL.md`](https://raw.githubusercontent.com/mattpocock/skills/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/wayfinder/SKILL.md)|`skills/workflow-wayfinder/SKILL.md`|Named destination, index vs decision detail, fog vs sharp ticket vs out-of-scope, ticket types, map/chart and one-decision advance, frontier recalculation.|No foreign Skill calls, mandatory subagents/branches/pushes, forced tracker map, auto-assignment/claim, label schema or concurrency assumption. Tracker persistence and changes require explicit authority; native approval and canonical owners prevail.|`LICENSE.matt`|
|[`LICENSE`](https://raw.githubusercontent.com/mattpocock/skills/5beb35b040e3de97e54fa9e386d7e42d15c295c2/LICENSE)|`skills/workflow-wayfinder/LICENSE.matt`|Full upstream MIT notice, unmodified.|None.|`LICENSE.matt`|

Companion files: wayfinder upstream has no procedural companions; its GitHub/GitLab/local operations were adapted from the configured tracker companion sources under `workflow-project-setup`, not imported as executable recipes. The research, prototype, domain-modeling, implementation and architecture pointers refer to native local skills. User-invoked with `disable-model-invocation: true`; no upstream agent metadata imported.

Local integration replaces the upstream one-decision-per-session cap with one decision at a time across the user's authorized scope. An explicit whole-map request continues through the ready frontier instead of silently reducing the deliverable to one ticket.