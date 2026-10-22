# Logic prototype

Choose this branch when the question concerns behavior, state transitions, data shape, or an API that becomes clear only by trying concrete cases. The artifact is a disposable, self-contained HTML demo for a non-developer to operate.

1. State the question and relevant model in visible introductory text before writing code. Define the hypothesis and evidence that would support or change it. A logic prototype that answers the wrong question has no value.
2. Keep the decision-bearing logic in a small pure module within one script: reducer, explicit state machine, pure transformations, or a clearly bounded stateful module as the question warrants. Keep DOM and handlers outside that logic so the useful decision can be lifted later.
3. Build one inline HTML/CSS/JS file, with no framework, bundler, server, external dependency, or real data connection. Use in-memory state unless persistence itself is the hypothesis; if authorized persistence testing is needed, isolate and clearly mark its scratch data.
4. Use domain language. Render all relevant state after every action. Include free-play controls and guided, repeatable scenario walkthroughs that make normal, awkward, and invalid cases observable. A run should be as simple as opening the file.
5. Compare observed outcomes with the stated hypothesis. Capture evidence and the decision or unresolved question in the authorized project context; distinguish what the demo showed from what remains untested.
6. Keep the artifact disposable. Do not add tests, production error handling, general-purpose abstractions, or production integration. If the user selects a validated logic decision for implementation, integrate only that authorized decision through the normal project workflow; do not ship the HTML shell or keep throwaway prototype code in production. Preserve an authorized prototype only where the user/project requests it; do not commit, branch, publish, or add tracker records by default.

Completion means the question, runnable artifact, observable state, representative scenarios, evidence, and current verdict are clear. If the question needs a framework/server or other broader effect, explain the constraint and obtain the necessary authorization before that effect; do not silently omit a requested behavior.

For UI appearance questions, use the [UI variation branch](../ui-prototyping/SKILL.md) instead.
