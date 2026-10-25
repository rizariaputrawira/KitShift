# Stress-test and interview: ready-frontier rounds

Load for an explicit request to grill/stress-test a decision, plan or idea, or when unresolved consequential choices require clarification. This is a decision dependency procedure, not an interview quota or permission to implement.

## Build the decision tree

1. State the outcome under examination and fixed constraints. Read the proposal and relevant canonical sources. When documentation terminology, relationships or domain decisions are part of the choice, consult [docs-domain-modeling](../../docs-domain-modeling/SKILL.md); use its canonical glossary/ADR ownership and formats, not a parallel modeling procedure.
2. Separate facts to discover, settled choices, and unsettled consequential choices. For each open choice, name prerequisites and downstream decisions it controls. Never ask the user to supply a fact available from repository/tools. Resolve factual prerequisites through authorized inspection; a pending fact blocks dependent questions, not independent ready branches.
3. The frontier contains only choices whose prerequisites are settled. For every ready consequential choice, provide a numbered question, real options/trade-offs and evidence-backed recommendation. Ask the whole independent frontier in one round; dependent questions wait. Use a concise format:
   - **Q1 — Decision:** choice and why it matters.
   - **Recommendation:** preferred option, evidence, and material cost/constraint.
4. Preserve facts and decisions the request already supplies. Do not convert an explicit settled instruction into a question merely to fill a round. After answers, record settled choices, resolve newly relevant facts, prune invalid alternatives and recompute the frontier. Surface contradictions with fixed constraints rather than silently deciding precedence.
5. Stop when no material decision remains unexplored or assumed. Write back the shared outcome, settled choices, constraints, exclusions and remaining uncertainty. A material unavailable source blocks only its dependent decision; name the source and consequence exactly.

An empty frontier is not permission to act; it neither grants new authority nor revokes authority already supplied. The user's direct request authorizes necessary work in its stated scope. Seek a decision only for a remaining material choice, changed scope/consequence, or host approval boundary; do not add a second approval after answers settle authorized scope. Use existing design/document owners for authorized writes. Documentation creation/publishing is authorized only where requested or otherwise within current authority. Host read-only planning modes return proposed content without checkout writes. If the explicit choice includes domain modeling and authoritative records, consult [docs-domain-modeling](../../docs-domain-modeling/SKILL.md) for that branch; do not make a separate interview out of documenting answers.
