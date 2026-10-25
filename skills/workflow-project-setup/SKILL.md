---
name: workflow-project-setup
description: "[Matt Pocock] Configure project tracker, triage vocabulary and domain-document locations when those conventions are needed."
disable-model-invocation: true
---

# Project workflow setup

Configure only the project conventions the user needs. This is optional setup, not a prerequisite for tasks that do not depend on a tracker, labels or domain-document convention. Explore before asking or writing; no foreign harness file or filename is mandatory.

## Discover existing state

Inspect repository instructions, manifests, canonical documentation/location catalog, tracker configuration, remotes and existing labels only as relevant. Look for an established tracker workflow (GitHub, GitLab, local files, or another documented provider), domain glossary/ADR owners and triage conventions. Preserve existing files, identifiers, edits and policy. Distinguish discoverable facts from choices; do not ask for facts tools/repo can establish.

## Decide and configure

Present only unresolved consequential choices, with an evidence-based recommendation; batch independent choices and omit settled facts. Establish the following only when relevant and authorized:

- **Tracker contract:** identify read/create/update/comment/close operations and issue identity; specify parent-child and blocking relationships (native when supported, clear textual representation otherwise); define location/format for local markdown. Preserve user-provided provider/tooling, do not assume a CLI, and do not publish issues during setup.
- **Triage vocabulary:** map only roles the active workflows use to existing tracker labels. Do not create labels or impose a default taxonomy unless explicitly requested and permitted.
- **Domain documents:** point to existing canonical glossary, ADR and requirements/design locations, including context-specific locations where present. Prefer [docs-engineering locations](../docs-engineering/references/locations.md) and the canonical manifest. Do not impose `GLOSSARY.md`, `docs/adr/`, `AGENTS.md`, `CLAUDE.md`, or another foreign fixed layout.

For GitHub, record actual repository identity and available issue/sub-issue/dependency capabilities; distinguish issue number from database IDs for native dependency APIs, and define a text fallback only if native dependencies are unavailable. For GitLab, record project identity, issue conventions, available hierarchy/blocking-link tier and fallback representation. For local tracking, define canonical per-effort map/spec/ticket paths, stable IDs/order, status/claim meaning, blocker syntax and resolution links; use existing repository conventions where possible. For any other provider, describe equivalent supported operations and gaps rather than assuming feature parity. For map-oriented efforts specifically, configure how map/ticket relationships and frontier queries work; do not claim/assign/resolve tickets merely by setting up conventions.

Draft the exact edits first. Persist only with user authorization, through existing canonical owners and preserving surrounding content. Apply provider changes only when specifically authorized and available; then inspect the resulting configuration and validate that referenced files/labels/relationships exist and examples match actual capabilities. Repair discrepancies within authorized scope; otherwise report the precise missing prerequisite. Re-read changed configuration as evidence, not proof of runtime enforcement.

Done when requested conventions are recorded in their canonical locations, references/cross-links resolve, provider capabilities and fallback semantics are explicit, and any unvalidated/unsupported operation is disclosed. No setup is required for unrelated work.
