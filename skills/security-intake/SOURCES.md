# Sources and modifications

## Adapted source

Repository: https://github.com/NVIDIA/SkillSpector  
Immutable revision: `35270064e42230dbc566e4134c55b5d581355db3`  
Upstream attribution: Copyright 2026 NVIDIA CORPORATION & AFFILIATES.  
License: Apache-2.0; full unchanged repository notice is [LICENSE.skillspector](LICENSE.skillspector), including all terms and NVIDIA copyright/application text.

| Exact pinned upstream path | Local file | Substantive mechanism |
|---|---|---|
| [skills/skill-inspector/SKILL.md](https://github.com/NVIDIA/SkillSpector/blob/35270064e42230dbc566e4134c55b5d581355db3/skills/skill-inspector/SKILL.md) | `SKILL.md` | Untrusted-source intake; semantic purpose/permission comparison; source around scanner signals; score is not verdict; explicit incomplete evidence. |
| Same pinned `skills/skill-inspector/SKILL.md` | `references/intake-checklist.md` | Inventory instruction/script/dependency/MCP surfaces; trace actual sensitive access/transmission/execution/persistence; compare necessary bounded authority with user control. |
| [LICENSE](https://github.com/NVIDIA/SkillSpector/blob/35270064e42230dbc566e4134c55b5d581355db3/LICENSE) | `LICENSE.skillspector` | Exact full upstream Apache-2.0 license and attribution text, not a fabricated SPDX substitute. |

Both adapted procedure files prominently identify modification and NVIDIA attribution. Modified for OMP native permissions and passive source-only inspection: manual source review is default; only already-supplied scanner output is supplemental; exact verdicts are `acceptable`, `caution`, `unsafe`, `analysis-incomplete`; decisive gaps prohibit acceptable while substantiated unsafe behavior remains reportable. Added package manifest/runtime import/host contract/dependency inspection, actual coverage accounting, and cross-owner candidate lifecycle links.

Removed: clone/download, scanner commands, tool/dependency/runtime installation, scanner-first requirement, shell-tool aliases, numeric score thresholds, APPROVE/install-posture assertions, lower-confidence fallback rhetoric and report ornament prescriptions. Native OMP permissions/approval and existing read tools control actual actions; no upstream model/provider directive is adopted. Missing material is reported, not silently replaced or fetched by a target-inspecting reviewer.

## Notices and exclusions

The pinned repository root tree contains no file named `NOTICE`. Its [THIRD_PARTY_NOTICES.md](https://github.com/NVIDIA/SkillSpector/blob/35270064e42230dbc566e4134c55b5d581355db3/THIRD_PARTY_NOTICES.md) was inspected: notices cover scanner runtime dependencies (including typer, rich, httpx, PyYAML, pydantic, OpenAI/LangChain and YARA), none of which are redistributed in this adaptation. No scanner source, dependency, YARA rule, installer, CI action, executable or extension is copied. Thus those dependency notices are research-only, not this passive skill's redistributed components. The source SKILL contains no additional copyright/patent/trademark notice beyond the pertinent attribution preserved here and the full license.

The shared source-review guidance is original authored integration material, not copied NVIDIA runtime/scanner assets. Its current native OMP adaptation replaces the former custom reviewer-definition, fixed discovery/refutation and result-schema prerequisites with direct source inspection or permitted native delegation, evidence-grounded challenge and explicit independence limits. Role names and reports do not establish exact loaded-file provenance or OS containment. Linked audit companions are owned by `security-audit`; their source bodies/notices are not duplicated here. Intake verdict is not install approval, vulnerability absence or runtime assurance.
