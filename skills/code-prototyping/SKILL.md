---
name: code-prototyping
description: "[Matt Pocock] Build a throwaway prototype to test a concrete logic or state-model question."
---

# Prototype

A prototype is a disposable artifact that answers a specific question. This owner covers logic/state questions; first identify the hypothesis and what evidence would change the decision, then read [logic/state prototypes](LOGIC.md). Divergent UI variations and picker accessibility belong to explicit-only `ui-prototyping`: read its [body](../ui-prototyping/SKILL.md) and [PICKER.md](../ui-prototyping/PICKER.md) only when the user explicitly requests that UI-prototyping capability. Do not auto-activate it through this model-invokable owner. If the requested branch is materially ambiguous, ask rather than silently switching from logic to UI exploration.

Before building, state the question, hypothesis, artifact shape, and completion evidence. Respect requested scope and actual project conventions. Planning or inspection-only requests produce a proposal without writes or execution. Implementation requires explicit authorization for its scope. Keep artifacts isolated and visibly marked as prototypes; no production integration, external publication, service/account change, dependency installation, commit, branch, or tracker update is implied. Use in-memory data by default; scratch persistence is only for a question explicitly about persistence and within authorized scope.

When implementation is authorized, use proportionate local checks to demonstrate the hypothesis. A UI picker or route guard is not security isolation; never connect a visual prototype to real mutating operations. Preserve pure/in-memory logic and no real database or production mutation. Record actual behavior/evidence and limits, not assumed success. Once answered, report the verdict and user decision needed next; integrate only a selected result within explicit scope and remove throwaway material only when authorized.

Completion: the question and hypothesis are explicit, the user can run and inspect the prototype, relevant evidence is captured honestly, and throwaway/production boundaries are clear. Do not use a prototype to bypass production requirements or expand authorization.

Provenance and notice: [SOURCES.md](SOURCES.md); complete notice: [LICENSE.matt](LICENSE.matt).
