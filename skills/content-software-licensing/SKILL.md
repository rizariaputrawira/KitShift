---
name: content-software-licensing
description: "Choose, add, or change software licenses; explain licensing, contributor rights, and release obligations."
---

# Software licensing

For a coding assistant advising a maintainer or implementing an authorized licensing change. Supply an evidence-backed decision or verified local change, not legal advice or a guarantee against infringement. Teaching and selection requests are advisory; editing, relicensing, publishing, or contacting rights holders requires the corresponding task authority.

For a read-only audit of existing source/dependencies or a possible violation, read [content-license-review](../content-license-review/SKILL.md). That skill owns evidence collection and compliance findings; do not duplicate its audit here.

## Procedure

1. **Identify the decision.** Establish whether the user wants an explanation, license selection, license-file setup, a license change, or compliance help. Inspect the supplied project and existing licensing/provenance records. Record intended recipients, commercial/proprietary reuse goals, source/binary/container/browser distribution, and hosted-service use. Resolve available facts before asking about material unknowns; make unaffected advice conditional rather than inventing the owner's preferences.
2. **Establish scope and authority.** Separate original owned/authorized work from contributions, copied snippets, dependencies and non-code assets. Public availability is not a general reuse grant. Repository control and commit authorship alone do not establish copyright ownership or relicensing authority; check employer/client rights and contributor agreements where relevant. If third-party evidence is material, use the review owner above. Finish with the portions the maintainer may license, retained exclusions and missing permissions.
3. **Load the relevant branch.** For explanations, comparisons or choosing terms, read [selection](references/selection.md). For adding license files, contributor policies, dual licensing, custom terms or changing an existing license, read [application and changes](references/application.md). Load both for a selection followed by implementation. Read actual version-applicable license terms before recommending a concrete combination or writing a grant; use authorized primary-source research through [workflow-research](../workflow-research/SKILL.md) when needed. Offline restrictions remain binding; identify unavailable evidence instead of supplying remembered legal text.
4. **Decide before applying.** Compare candidates against the user's goals and known third-party constraints. State a recommendation with its SPDX identifier/version, scope, tradeoff, required retained terms and unresolved questions. If the user already selected a suitable license and authorized setup, proceed without redundant confirmation. If a missing owner choice materially changes reuse or disclosure rights, ask that choice before dependent edits. Do not turn a vague request to “create a license” into invented legal clauses or an unrequested project-wide relicense.
5. **Implement only the authorized branch.** Apply the application reference to approved local paths, preserving existing grants and notices. Advice-only work ends with a concrete file/change plan, not filesystem changes. Do not commit, publish, upload private code, install scanners or contact contributors merely to complete this skill.
6. **Verify the delivered artifact.** For changes, compare the legal text with the inspected authoritative text, allowing only its designated substitutions. Reconcile scope statements, package metadata and headers. Inspect a disposable packaged artifact using the project's established safe packaging path where practical: notices must reach recipients, not merely exist in the checkout. For source offers or network-source features, exercise the recipient path if authorized. Do not execute untrusted packages or trigger publishing/build side effects for a license check. Record absent build artifacts or unperformed runtime checks as limits.

## Result

- Decision/question, intended use, inspected revision and authority/ownership assumptions.
- Recommendation and alternatives when meaningful: exact license/version, rationale, scope/exclusions, obligations and primary evidence links.
- For implementation: changed paths, preserved third-party terms and checks actually exercised; otherwise the proposed changes only.
- Outstanding permissions, legal interpretation and release conditions, with a concrete next action. Never conclude “fully legal,” “cannot violate licenses,” or that a scanner result proves clearance.

Research inputs and original-authorship boundaries: [SOURCES.md](SOURCES.md).
