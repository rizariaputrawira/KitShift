# Sources and adaptation — code-architecture

## Immutable adopted source

- **M** — `https://github.com/mattpocock/skills` at immutable revision `5beb35b040e3de97e54fa9e386d7e42d15c295c2`; MIT; notice `LICENSE.matt`.

|Exact pinned upstream path|Local repository-relative file|Substantive adopted mechanism|Included notice|
|---|---|---|---|
|[`skills/engineering/codebase-design/SKILL.md`](https://raw.githubusercontent.com/mattpocock/skills/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/codebase-design/SKILL.md)|`skills/code-architecture/SKILL.md`|Deep-module vocabulary, interface depth, seam/test-surface relationship, deletion test, real adapter variation, leverage/locality and testability principles.|`LICENSE.matt`|
|[`skills/engineering/codebase-design/DEEPENING.md`](https://raw.githubusercontent.com/mattpocock/skills/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/codebase-design/DEEPENING.md)|`skills/code-architecture/references/deepening.md`|Dependency categories, seam discipline and replace-obsolete-tests-through-interface reasoning.|`LICENSE.matt`|
|[`skills/engineering/codebase-design/DESIGN-IT-TWICE.md`](https://raw.githubusercontent.com/mattpocock/skills/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/codebase-design/DESIGN-IT-TWICE.md)|`skills/code-architecture/references/design-it-twice.md`|Distinct interface alternatives and comparison by depth, locality and seam, adapted to native role/permission contract.|`LICENSE.matt`|
|[`skills/engineering/improve-codebase-architecture/SKILL.md`](https://raw.githubusercontent.com/mattpocock/skills/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/improve-codebase-architecture/SKILL.md)|`skills/code-architecture/SKILL.md`|Scoped hotspot-led architecture survey, evidence-based deepening candidates, decision awareness and candidate selection before detailed design.|`LICENSE.matt`|
|[`skills/engineering/improve-codebase-architecture/HTML-REPORT.md`](https://raw.githubusercontent.com/mattpocock/skills/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/improve-codebase-architecture/HTML-REPORT.md)|`skills/code-architecture/references/html-report.md`|Evidence-linked visual report shape and before/after diagrams; optional static accessible output replaces mandatory CDN-dependent output.|`LICENSE.matt`|
|[`LICENSE`](https://raw.githubusercontent.com/mattpocock/skills/5beb35b040e3de97e54fa9e386d7e42d15c295c2/LICENSE)|`skills/code-architecture/LICENSE.matt`|Full upstream MIT notice, unmodified.|`LICENSE.matt`|
No further engineering companions were supplied for either architecture candidate. Architecture vocabulary was inspected in full, along with `DEEPENING.md`, `DESIGN-IT-TWICE.md`, `HTML-REPORT.md`, and the architecture-survey body; HTML implementation, design alternatives, and dependency-classification guidance are adapted into the three local references. Upstream HTML's Tailwind/Mermaid CDNs, permissive Mermaid security setting, automatic opener and forced report delivery are intentionally omitted for native, local-first safety.

## Adaptation and boundaries

The upstream codebase-design and architecture-survey skills are merged into one canonical architecture owner. The architecture survey is a discoverable workflow; HTML is generated only when requested or useful, and remains static/local-first rather than relying on CDNs, shell openers or platform-specific commands. Upstream hard-coded Skill invocations, compulsory subagent patterns, provider-specific setup, forced grilling and automatic glossary/ADR writes are not imported. Shared callers conditionally link here; their existing permission and evidence contracts remain authoritative. Suggestions do not authorize implementation, test runs or decisions.

The architecture/design vocabulary and selected process were adapted from the pinned MIT source; the output is not an upstream executable distribution. No upstream agent metadata or scripts are included. No runtime, build, test, lint, format, native discovery or compatibility gate was run while drafting; provenance is not behavioral assurance.
