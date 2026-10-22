# Standards and external reference baselines

## Applicability and evidence limits
Standards are source guidance, not automatic obligations or proof of compliance. This reference carries the required status, access and license limitations from primary-source research dated **2026-10-03**. The staging-only research register (`reports/research-reuse.md`) is implementation evidence, not a production dependency; it is deliberately excluded from production-only assets. The dated observations below do not establish perpetual currency. Use the current official publication page at actual project use; retain exact selected version and inspected scope. Distinguish voluntary guidance, client contract, regulation, organizational framework and certification scheme.

ISO official public metadata/abstracts were accessible; normative bodies were not accessed and remain copyrighted/access-restricted. Published editions, linked draft revisions and amendments are identified below, not inferred from a series label. Never copy clauses or claim clause-level assessment without legitimate access and actual scoped assessment evidence. Public status metadata establishes neither normative conformance nor certification.

Standards guidance here is originally authored; no normative standard clauses or standard templates are vendored. This adopted package separately adapts pinned licensed skill procedures documented in SOURCES.md; that is not standards certification. NIST SSDF is a U.S. government publication, but publication attribution and any third-party terms still apply. OWASP ASVS, MASVS and MASTG use CC BY-SA 4.0; OpenAPI and AsyncAPI specifications use Apache 2.0. Linking or recording a license is not project adoption, permission to ignore its terms, an immutable source pin or a security clearance.

## Lifecycle and information
- [ISO/IEC/IEEE 12207:2026](https://www.iso.org/standard/90219.html), published Edition 2, replaces withdrawn 2017: software lifecycle processes and concurrent/iterative information roles, not a fixed document schema or process waterfall.
- [15289:2019](https://www.iso.org/standard/74909.html), published Edition 4, confirmed 2025, replaces 2017: purpose/audience/process-fit information items. [CD revision](https://www.iso.org/standard/94699.html), Edition 5 under development, is not a published replacement.
  Edition boundary: the public 15289:2019 abstract maps information items to 12207:2017 and 15288:2015. Selecting 12207:2026 as lifecycle guidance does not establish a normative updated crosswalk; full normative texts were not assessed.
- [29148:2018](https://www.iso.org/standard/72089.html), published Edition 2, confirmed 2024: requirements source/scope/quality and verifiability. [DIS revision](https://www.iso.org/standard/94091.html), Edition 3 under development, remains draft. Do not impose draft provisions as current baseline.

## Architecture and quality
- [42010:2022](https://www.iso.org/standard/74393.html), published Edition 2, replaces 2011: stakeholder/concern-driven architecture description; selected views, not mandatory diagram inventory.
- [25010:2023](https://www.iso.org/standard/78176.html), published Edition 2, replaces 2011, and [25030:2019](https://www.iso.org/standard/72116.html), published Edition 2, confirmed 2025, replaces 2007: product-specific quality properties and measurable quality requirements. Workloads/boundaries/thresholds need actual product evidence, not generic scorecards.
- [ISO/IEC/IEEE 90003:2018](https://www.iso.org/standard/74348.html), published Edition 1, confirmed 2025, replaces ISO/IEC 90003:2014: relevant where actual organization-adopted quality-management scope exists; not certification criteria or a project certification claim.
- [arc42](https://arc42.org/overview/) and [C4](https://c4model.com/) are optional structuring/view lenses. [MADR](https://github.com/adr/madr/blob/main/template/adr-template.md) informs consequential decisions through existing docs-domain-modeling. No mandatory template, view count or new decision process.

Practical-source license/access limits from the same dated research: the arc42 overview states free/open-source use, including commercial use, but the exact template license was not established there; no template is reproduced. The inspected C4 page did not state a specific prose/template license; no whole-site license assessment or reproduction is claimed. MADR's separately inspected default `develop` branch license is MIT OR CC0-1.0, while the template reference above is mutable `main`; this is not a commit-pinned license claim for that template. Mutable branches/pages are dated observations unless an actual immutable revision is recorded.

## Testing
Cite the specific part and edition, never one invented series-wide edition:
- [29119-1:2022](https://www.iso.org/standard/81291.html): testing concepts; replaces 2013.
- [29119-2:2021](https://www.iso.org/standard/79428.html): test processes; replaces 2013.
- [29119-3:2021](https://www.iso.org/standard/79429.html): test documentation; replaces 2013.
- [29119-4:2021](https://www.iso.org/standard/79430.html): test techniques; replaces 2015.

All are published Edition 2. Select actual strategy/plan/case/execution/evidence information and techniques based on acceptance and risk. A document's reviewed knowledge is distinct from passing runtime acceptance; no paper-only test completion.

## Security
- Application security selected parts [27034-1:2011](https://www.iso.org/standard/44378.html), [27034-2:2015](https://www.iso.org/standard/55582.html), [27034-3:2018](https://www.iso.org/standard/55583.html) are published, respectively confirmed 2022/2021/2023. Part 1 has Corrigendum 1:2014 linked; Part 2's 2026 review is not evidence a new edition exists. This is selected applicability, not an exhaustive series register.
- [27001:2022](https://www.iso.org/standard/27001), published Edition 3, with [Amendment 1:2024](https://www.iso.org/standard/88435.html) when applicable: organizational ISMS obligations only when actually adopted/identified, never proof product/project certification.
- [NIST SP 800-218 SSDF 1.1](https://csrc.nist.gov/pubs/sp/800/218/final) is final, 2022-02-03. [SSDF 1.2 Rev.1 initial public draft](https://csrc.nist.gov/pubs/sp/800/218/r1/ipd), 2025-12-17, remains draft despite comment closure. Use risk-based secure-development recommendations, not blanket legal obligations.
- [ASVS stable 5.0.0 release-branch README](https://raw.githubusercontent.com/OWASP/ASVS/v5.0.0/README.md) establishes May 2025 stable guidance; pin version-qualified selected requirement IDs. The ref is a branch per upstream, not an asserted immutable tag. Master/latest previews are not baseline.
- [MASVS 2.1.0](https://github.com/OWASP/masvs/releases/tag/v2.1.0), published 2024-01-18, and [MASTG 2.0.0](https://github.com/OWASP/mastg/releases/tag/v2.0.0), published 2026-06-30, are stable nonprereleases observed. Select actual mobile control/test scope and record platform/build evidence, not a moving site or copied controls. These projects use CC BY-SA 4.0; no upstream bodies are vendored.

## Interface and platform references
[OpenAPI 3.2.1](https://spec.openapis.org/oas/v3.2.1.html), published 2026-09-10, and [AsyncAPI 3.1.0](https://www.asyncapi.com/docs/reference/specification/v3.1.0), published release 2026-01-31, are versioned Apache-2.0 references. Preserve actual project's interface version and tooling absent authorized migration. Formal contract facts stay in that owner; prose rationale/Postman cannot create a competing schema.

Use official Android component/signing/data-use and Apple entitlements/Keychain/privacy/store references linked in [mobile guidance](mobile.md). Store policies are living, channel/region/build-specific guidance. Record reviewed source/date/revision and app-specific interpretation, recheck at release. A link/label/manifest is not actual device verification or store approval; Android evidence does not cover iOS. No hard-coded perpetually current platform rules.

Android/Google published terms and Apple copyright/terms remain authoritative; the inspected platform pages do not establish blanket redistribution permission. Platform references are live guidance rather than immutable policy pins. No platform prose/code is vendored and no store, device or legal assessment is implied.

## Standards mapping record
For each actual applicability claim record source/exact edition or release, rationale, information owner, actual required review/approval/evidence, implementation status and review trigger in the owning project artifact. Provision identifiers are used only from legitimately available source text. Map observed implementation/verification separately from document approval. Missing obligations/interpretation/access blocks the affected assurance claim; safe independent work continues. Catalog related-standards references alone never make a standard applicable.

The before-code documentation order is local delivery policy owned by `skill://workflow-delivery/references/documentation-baseline.md`, not ISO-mandated waterfall or proof of conformity. Public metadata/abstracts support this guidance map, not clause-level assessment:

| Guidance source | Application information |
|---|---|
| ISO/IEC/IEEE 12207:2026 | Lifecycle roles and preparation/use/change of information throughout delivery; no required waterfall |
| ISO/IEC/IEEE 15289:2019 | Purpose/audience/content coverage and tailoring/combining information items, subject to the edition boundary above |
| ISO/IEC/IEEE 29148:2018 | Sourced, consistent, testable requirements, useful stories/use cases and acceptance |
| ISO/IEC/IEEE 42010:2022 | Stakeholder/concern-driven architecture descriptions, selected views and decision rationale; not a mandated design tool |
| ISO/IEC 25010:2023 and 25030:2019 | App-specific quality characteristics, measurable requirements and justified target/method basis |
| ISO/IEC/IEEE 29119-1:2022, -2:2021, -3:2021, -4:2021 | Concepts, processes, test documentation and selected techniques respectively; plans before code, results only after observation |

Record actual selected edition/access, applicability rationale, information owner, required review/evidence and limits in the existing project index/product/requirements owner and existing manifest `standards` lists where used. Catalog `related-standards` are candidate references, neither exhaustive obligations nor conformity mapping. Preserve manifest v1 and traceability contracts: pre-code links allocate requirements to design and planned verification sources, without invented implementation nodes, dates or passes. Access limits alone do not block voluntary alignment; unavailable interpretation of an actual binding obligation blocks its dependent commitment.
