# Software, design and user information

## Project composition
Software/CLI/library/desktop/data-platform types compose independently with platforms and capabilities. CLI: existing README/help may own acceptance, safe file/error behavior and run/test instructions; no service runbook absent operation responsibility. Library: compatibility/version/API support and generated reference/tests/release are primary; no fictitious server deployment. Desktop: actual Windows/macOS/Linux support, install/uninstall/config/state/lifecycle/update signing/trust and compatibility evidence. Data platform uses architecture lineage/schema/privacy/access/recovery/quality ownership, not frontend docs. Security triggers still apply to file/process/update/data surfaces.
Before adoption existing README/help may remain the documentation owner. After adoption resolve durable requirements and user documentation through [locations](locations.md); retain project-root introductory usage and native/generated help without treating them as competing requirement owners.

## Product and visual owners
Existing or explicitly required PRODUCT.md owns durable product and design-workflow context, not copied engineering requirements; DESIGN.md owns shared visual language/tokens. Both remain project-root exceptions under [locations](locations.md), but their ownership does not require creating them. A scoped supplied/approved external composition owns its concrete visual/interaction decisions only when selected by the user/project contract, not all engineering design. Requirements own behavior; technical-design owns implementation. Resolve adopted suite owners through the manifest/catalog; compare facts rather than filename priority. Missing required external revision, freshness/approval or availability is a named dependent design blocker, never permission to invent composition or duplicate DESIGN.md. Optional external material is not a prerequisite.

Resolve applicable enabled UI guidance through [the UI owner pointer](../SKILL.md#conditional-references-and-existing-owners), rather than freezing provider or workflow selection here. This instruction-only package never runs UI launchers/hooks/downloads as implicit setup. Only an explicitly selected or project-required documentation-first boundary applies the readiness rule from [workflow delivery](../../workflow-delivery/references/documentation-baseline.md); required unresolved UI baseline blocks that boundary's dependent app implementation, not safe inspection and authorized document/design work. Ordinary UI work does not require an external service or generated artifact, and unrelated host work remains permitted.

## User documentation
Compose getting-started, installation, user/admin guides, how-to, reference, troubleshooting and FAQ at sufficient shared owner anchors when audience/lifecycle fit. Before adoption preserve existing help/README. After adoption use canonical owner/anchor consolidation or catalog standalone paths through [locations](locations.md), with native/generated-help exceptions indexed rather than copied. Create separate files only for actual unmet reader tasks. Instructions describe supported released behavior or explicitly label unreleased behavior.

Prepare relevant reader-task/prerequisite/flow/error/support plans before implementation when needed by the selected baseline. Label them intended and results unobserved. After verification reconcile affected reader owners with actual sources/evidence; no fabricated install, device, signing, store or recovery outcome.

| Concept | Content and validation |
|---|---|
| getting-started | Reader/prerequisites and shortest supported first-use path with observed result |
| installation-guide | Supported package/platform/version, safe install/remove/config steps, permissions and rollback limits; verify actual artifacts |
| user-guide | User workflows, conditions/outcomes/error/recovery and support scope; match observed behavior |
| admin-guide | Distinct privilege/role workflows and safe operational boundaries; compare implemented authorization |
| how-to | One bounded task, preconditions, ordered steps and expected observable result |
| reference-guide | Lookup concepts/options/version/platform support; reuse generated public API reference where canonical |
| troubleshooting | Symptoms, safe diagnostics, confirmed causes versus hypotheses, resolution/escalation and data hazards |
| faq | Actual recurring validated questions linking canonical answers, not copied mutable details |

Changes to public behavior, installation, interface, permissions or support trigger affected guidance review. No fabricated successful command, environment or recovery claim.
