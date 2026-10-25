# ADR format and decision status

Load only when a consequential architecture/domain decision needs a durable record. After explicit docs-engineering adoption read [documentation locations](../../docs-engineering/references/locations.md) and use its `adr` path and numbering convention, inspecting existing records and avoiding overwrites. Before adoption reuse the existing ADR convention/location; if none exists, propose a project convention under current authorization without adopting or migrating the project implicitly. Create the directory only for a real authorized ADR.

## Minimal record

A title and short context/decision/reason paragraph are enough when they preserve the actual basis. Include considered options, consequences, constraints and source links when they explain non-obvious trade-offs. Avoid ceremony that obscures the decision.

The record must distinguish:

- what problem/constraint forced the choice;
- the decision and its scope, or the proposal still awaiting a decision;
- why the selected option fits, including meaningful rejected alternatives;
- the actual decision basis/authorization locator when available;
- non-obvious consequences and links to related requirements/ADRs.

Do not fabricate a date, approval event or identity. Unknown facts remain unknown. Numbering provides stable identity, not acceptance.

## Status

Preserve the existing project's ADR status vocabulary and required transitions. Interpret its labels using the evidence distinctions below rather than renaming statuses or introducing a second lifecycle. Only when no convention exists, use these four values as a fallback:

|Status|Meaning and required basis|
|---|---|
|`proposed`|A choice under consideration; no approval is implied.|
|`accepted`|An actually settled decision with its real decision/authorization basis recorded or linked.|
|`deprecated`|The decision is no longer recommended; explain the observed decision to retire it and current applicability.|
|`superseded`|A real successor ADR exists; link it and explain the replacement boundary.|

Record supersession using the project's established status and successor-link convention; under the fallback above, use `superseded` with the actual successor link alongside it. Do not invent a “future ADR”. Follow existing reverse links where used. A proposed successor does not establish an accepted replacement; preserve the current decision's actual applicability until the replacement decision occurs.

## When the record earns its place

Record hard-to-reverse ownership/integration choices, surprising deviations with genuine reasons, contested alternatives, lock-in, or non-visible constraints that a future maintainer would otherwise miss. A small reversible local choice needs no ADR merely because this skill ran. If evidence is insufficient, return the proposed decision and missing basis without manufacturing acceptance or a new file.
