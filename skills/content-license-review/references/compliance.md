# Use and release compliance checks

Load when reviewing how to avoid license violations, a planned release/hosted deployment, or suspected noncompliance. Apply the entrypoint's evidence-chain procedure first; this checklist does not grant mutation, execution, publication or legal-clearance authority.

## Map the obligation to the actual activity

Record the inspected release/version and recipients. Distinguish private use/modification, delivery of source or binaries, browser code, containers, device firmware and remote interaction. Network use is not automatically distribution, but browser-delivered code is a delivered copy and AGPL/custom terms can impose distinct service obligations. A build-only dependency is not automatically shipped; determine whether its code, runtime or generated content enters the artifact. Do not infer exemptions merely from dev/runtime manifest labels.

For each included component, record `component/path + exact version | applicable grant/clause | triggering activity | required delivery/action | observed artifact evidence | gap/condition`. Inspect direct/transitive dependencies and vendored/snippet/asset/nested payload coverage within the authorized scope. Mark uninspected material explicitly. A scanner or SBOM is inventory evidence, not a license grant or proof that all obligations were met; do not install or run one without authority.

## Check only applicable conditions

| Evidence/terms | Questions to answer from the actual grant and artifact |
|---|---|
| MIT, BSD, ISC or another permissive grant | Do the required copyright, license conditions and disclaimers reach recipients in the required form? A README credit or URL alone is not necessarily enough. Inspect each text separately. |
| Apache-2.0 | Are license copies present; do changed files carry required modification notices; are applicable source notices retained; and, when upstream includes NOTICE, is relevant NOTICE attribution delivered in a section 4(d) permitted location? NOTICE is not an extra license; do not invent an upstream NOTICE requirement where none applies. |
| GPL-covered distribution | What is the covered work, exact version and exception? Are notices, corresponding source (including required build/install material), the chosen source-delivery/offer mechanism and any installation-information requirements met? An upstream homepage or source for a different binary version is not sufficient evidence. |
| LGPL integration | Are library modifications/source obligations, required notices and license texts, reverse-engineering rights, and an applicable relink/replacement mechanism satisfied? Inspect version and combined-work facts; “we dynamically link” alone is insufficient. |
| MPL-covered files | Are covered source files and modifications available under the applicable MPL terms, are notices preserved, and are executable recipients told how to obtain that source? Distinguish covered files from unrelated files and inspect secondary-license exclusions before combinations. |
| Modified AGPL network service | Does section 13 apply to the actual modified program? Is a prominent, no-charge corresponding-source opportunity available to its remote users? Separately inspect any conveying obligations. Do not demand unrelated infrastructure source merely because it is on the same server. |
| Dual/multiple licenses and exceptions | Is `OR` an actual authorized choice, `AND` cumulative, and `WITH` an applicable exception? Record the chosen available grant; do not turn multiple component licenses into alternatives or manufacture permission. |
| Assets, documentation, fonts, datasets and models | What separate attribution, change indication, share-alike, reserved-font-name, redistribution or use restrictions apply? Check applicable terms, not the software root license. |
| Missing, custom, commercial or source-available grant | What evidence and permission are missing or restricted? Do not assume public availability, attribution, purchase or an SPDX identifier grants the proposed use. Surface the exact restriction and owner/legal question. |

Primary lookup anchors: [MIT](https://choosealicense.com/licenses/mit/), [Apache sections 3–6](https://spdx.org/licenses/Apache-2.0.html), [LGPLv3 and incorporated GPLv3 terms](https://spdx.org/licenses/LGPL-3.0-only.html), [MPL official FAQ](https://www.mozilla.org/en-US/MPL/2.0/FAQ/), [AGPLv3](https://www.gnu.org/licenses/agpl-3.0.html), [SPDX expressions](https://spdx.github.io/spdx-spec/v2.3.1/SPDX-license-expressions/) and [mixed/non-software scopes](https://choosealicense.com/non-software/). Read applicable primary terms rather than treating this table or a FAQ as the grant.

## Report and remediation

- Distinguish an observed omission from an uncertain obligation or unknown grant. State which artifact and clause support the finding, what was not inspected and what would resolve it.
- Give a concrete release-condition checklist: retained notices, source access/offers, packaging corrections and unresolved permissions, with relevant component/version locators. Review remains read-only; recommend withholding the affected distribution if necessary permissions or compliance cannot be established rather than silently declaring clearance.
- For suspected past noncompliance, preserve supplied artifacts/evidence and identify affected versions, activities and dates. Flag license-specific termination, cure/reinstatement and recipient remediation for qualified review; adding a notice now does not prove historical cure.
- For explicitly requested fixes, selection, or licensing new work, load [software licensing](../../content-software-licensing/SKILL.md). Its application branch governs authorized changes. No review instruction authorizes removing notices, rewriting upstream terms, deleting releases, contacting claimants or publishing admissions/settlements.
