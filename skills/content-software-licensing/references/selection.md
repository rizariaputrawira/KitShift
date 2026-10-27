# Explain and select software licenses

Load for licensing education, comparisons or selecting terms. This is a decision aid, not a compatibility matrix or substitute for the actual grant.

## Establish the vocabulary

- Copyright and a license are different: a rights holder grants specified permissions without necessarily transferring ownership. A public repository, free download, citation or absence of a fee is not a general license. Absence of a grant is a permission gap; do not assume public domain or invent a fair-use exception. See the supplied [Open Source Guides legal overview](https://opensource.guide/legal/#which-open-source-license-is-appropriate-for-my-project).
- Open source permits commercial use; it is not synonymous with zero price. Restrictions such as noncommercial-only, no competitors or no production use do not meet the [Open Source Definition](https://opensource.org/osd). Source-available and proprietary/custom terms need their own analysis; an SPDX entry alone does not establish OSI approval.
- A project's outbound license covers the specified owned/authorized portions. Dependencies and assets retain their own terms. Permission to combine, sublicense or distribute under additional terms does not erase an upstream grant, copyright or retention condition.
- Software licensing does not settle every patent, trademark, privacy, export, contract or jurisdictional question. An express patent grant has a defined scope; it is not clearance of all patents. Escalate a material legal uncertainty with the facts needed for counsel, not a generic disclaimer in place of analysis.

## Match goals to candidates

First identify whether proprietary downstream redistribution is acceptable, whether distributed improvements should remain available, and whether modified network deployments should provide source. Compare only candidates relevant to that answer.

| Maintainer goal | Candidate | Important boundary to inspect |
|---|---|---|
| Simple permissive reuse, including proprietary redistribution | `MIT`; consider `BSD-2-Clause`, `BSD-3-Clause` or `ISC` when the ecosystem calls for them | Retain each license's required notices; these are different texts, not interchangeable names. BSD-3-Clause includes a non-endorsement condition. |
| Permissive reuse with an express contributor patent grant | `Apache-2.0` | Patent scope/termination, license copy, changed-file notices and applicable upstream NOTICE attribution. No general trademark permission. |
| File-level reciprocity for distributed code | `MPL-2.0` | Covered files/modifications and source availability; inspect secondary-license restrictions before combinations. |
| Library-level reciprocity with applications under other terms | An applicable LGPL version, such as `LGPL-3.0-only` | Modification, reverse-engineering, relinking/replacement and source obligations depend on version and integration. Dynamic linking alone is not a complete compliance argument. |
| Copyleft for distribution of covered/combined works | `GPL-3.0-only` or `GPL-3.0-or-later`, as intentionally selected | Covered-work boundary, exceptions, corresponding source and binary-conveyance conditions; not every use or mere aggregation makes unrelated software GPL. |
| Copyleft including modified software used over a network | `AGPL-3.0-only` or `AGPL-3.0-or-later` | Section 13 concerns modified versions supporting remote interaction; identify the covered program and corresponding source rather than asserting every SaaS component must be disclosed. |
| Restrict commercial use or particular users | Counsel-reviewed source-available or proprietary terms, not a mislabeled open source license | Do not append restrictions to a standard license while retaining its unqualified name or SPDX identity. |

For primary terms and official explanations, use [MIT](https://choosealicense.com/licenses/mit/), [Apache-2.0](https://spdx.org/licenses/Apache-2.0.html), [Mozilla's MPL FAQ](https://www.mozilla.org/en-US/MPL/2.0/FAQ/), [LGPL-3.0](https://spdx.org/licenses/LGPL-3.0-only.html), and [AGPL-3.0 including section 13](https://www.gnu.org/licenses/agpl-3.0.html). Inspect the actual applicable version and any exception before a concrete recommendation. Do not infer GPLv2/GPLv3 or LGPLv2.1/LGPLv3 compatibility from family names.

## Decide the scope

1. List original software, third-party material and separate documentation/media/font/data/model scopes. Do not mechanically apply the software license to everything. Creative Commons generally is not recommended for software; content may instead use appropriate CC terms, fonts may use OFL, and data/model/service terms can introduce separate conditions. Inspect the actual grants, attribution and privacy/database rights. See [non-software and mixed projects](https://choosealicense.com/non-software/).
2. Check dependency obligations against the actual use, distribution and integration. Compatibility is directional and version-specific, not a symmetric yes/no property of license labels. A licensing preference cannot override an incompatible dependency or missing permission.
3. State one recommended candidate with conditions, and a meaningful alternative if it changes a material tradeoff. MIT is a candidate for uncomplicated permissive goals, not an automatic default over unknown ownership, patents or copyleft goals.
4. For a learning-only request, explain with clearly labeled hypothetical examples and conclude with the facts needed to choose. For setup, continue through the entrypoint's application branch only under its mutation authority.
