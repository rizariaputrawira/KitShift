# Coherent source-led hunting

## Assignment

The controller establishes the objective, scope, constraints, expected result and completion criteria, relevant source-grounded architecture, coverage units/paths, selected companion instructions, exclusions and known previous claims. Inspect directly or delegate when allowed and useful through actual available delegation/role interfaces, supplying this context and the actual result contract. Use a source-inspecting role, not an advice-only role, for delegated source investigation. A reviewer never executes, edits targets, fetches targets or network resources, inspects credentials, installs or delegates. Separate discovery and challenge staffing is conditional under [delegation and challenge](../../docs-engineering/references/security.md#delegation-and-challenge), not a prerequisite to source review.

Assign a coherent boundary and its dependent controls, not arbitrary file shards. Prioritize low-trust entry, valuable protected assets, changed-source paths and known coverage gaps. Limited review leaves explicit uninspected/deferred units; it never lowers the evidence bar or becomes whole-app assurance.

## Discovery loop

1. Name the lower-trust actor and starting capability, accepted input/action, protected resource and intended invariant.
2. Read the complete relevant path through parsing, normalization, identity, authorization, state/copies and the final sink. Locate the last trusted decision and compare its guarantee with the consumer's assumption.
3. Inspect sibling, batch, legacy, retry, cancellation, error, migration and restore paths that can reach that boundary. Limit depth to the assigned path and its guarantees; stop when the invariant is settled either way.
4. Test reasoning against accepted sad states: missing/empty/duplicate, stale/revoked, encoding/unit disagreement, partial failure, concurrent check/use, recovery. Do not assume the interface accepts an input merely because it is interesting.
5. Read strongest preventing controls and establish every prerequisite of a chained claim. A failed prerequisite disproves that chain; an unknown decisive runtime fact is named, not guessed.
6. Consolidate one source-derived root cause under one stable local identifier, while evidencing each variant's conditions and impact. Independent missing controls get separate identifiers. Discovered different boundaries outside assignment go to the controller as coverage gaps, not unauthorized work.
7. Return reviewed paths, exact partial/unavailable coverage, source checks and candidates with the evidence required by [evidence and finding decisions](../../docs-engineering/references/security.md#evidence-and-finding-decisions). The native role/result schema and requested output format govern representation; no custom key or empty-array sentinel is required. A meaningful no-candidate result states that outcome with actual inspected evidence. A candidate is not confirmed merely because its discoverer proposes it, and unsupported guesses do not receive severity.

No search match, suspicious name, missing best practice or scanner score alone is a candidate. Establish actor, boundary and possible concrete consequence. Do not execute examples to prove them, invent runtime output or treat read-only prompts as containment.

## Coverage challenge

Challenge the current map/coverage evidence for unmapped surfaces, unchecked parallel paths, missed lifecycle modes, unjustified class exclusions and units closed without actual evidence. Read relevant entry/control source rather than treating the map as authority. The controller may do this directly; obtain a separate source-inspecting reviewer when explicitly required or when a concrete independence need warrants it. Controller challenge is not independent coverage review. If required independence is unavailable, record the limitation rather than infer a clean result.

The controller records each accepted gap and its source basis, preserving earlier attempts and their actual readers/evidence. New work within current authorization may be inspected or assigned; out-of-scope work remains explicitly excluded until approval changes. A bounded partial audit can finish with gaps disclosed, but cannot claim complete coverage. Follow [validation and reporting](validation-and-reporting.md) for candidate decisions.
