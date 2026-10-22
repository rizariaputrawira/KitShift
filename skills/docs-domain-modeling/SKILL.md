---
name: docs-domain-modeling
description: "[Matt Pocock] Use for active terminology or relationship modeling, ambiguous domain concepts, or consequential ADR work."
---

# Domain Modeling

Actively sharpen the domain language and relationships while designing. Merely reading a glossary for vocabulary does not invoke active modeling.

## Inspect and challenge

1. Discover the glossary/domain-map and ADR owners. For explicitly adopted docs-engineering projects, read `skill://docs-engineering/references/locations.md` and resolve `glossary` and `adr` through the manifest/catalog, not legacy filenames. Before adoption follow existing context links and established owners without relocating files. Read relevant requirements, decisions, code and callers before proposing language changes.
2. Identify overloaded terms and competing meanings. State the precise conflict: for example, “account” may mean an identity, a tenant, or a billing relationship. Compare the user's intent, canonical glossary and implementation rather than treating any one label as proof.
3. Stress-test relationships with concrete counterexamples: Can a user belong to two tenants? Can an order be partly cancelled after shipment? Who owns the retained record after deletion? Choose scenarios that distinguish competing definitions, cardinality, lifecycle, ownership or invariants. Do not invent unsupported business requirements from the examples.
4. Cross-check decisive behavior in actual sources. If code differs from approved intent, report the discrepancy; buggy code does not redefine the approved model. Resolve material conflicting sources through the current decision owner rather than silently picking whichever file was read last.
5. Offer canonical wording and the remaining consequential choice with a recommendation. Ask only when evidence cannot settle it. Completion of discussion means each changed concept has a definition, context, important distinctions and a real decision basis; unresolved concepts stay unresolved.

## Record only settled, authorized changes

When terms settle and documentation mutation is authorized, update the resolved glossary promptly using [glossary format](references/glossary-format.md). Create a separate owner only if no sufficient owner exists and there is a real settled term to record; resolve its destination through the shared location contract after adoption. Keep it domain language, not a spec, implementation diary or scratchpad.

Offer an ADR only for a genuinely consequential choice—hard to reverse, surprising without context, or genuinely contested—with an actual decision/trade-off worth preserving. A trivial reversible naming choice needs glossary wording, not an ADR. Use [ADR format](references/adr-format.md), resolving the adopted project's destination and sequence through the shared location contract; before adoption respect its established convention. Create only for an authorized real need. Do not mark a proposal accepted from numbering, a filename or your own assertion.

Plan Mode/read-only work returns proposed wording and source conflicts without creating files. Domain-modeling neither changes code nor authorizes architecture. Report the resolved definitions/relationships, source basis, actual documentation changes or proposals, and remaining conflicts. Existing approval remains binding; changed material behavior routes to native reapproval.
