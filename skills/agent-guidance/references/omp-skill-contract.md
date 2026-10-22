# Passive OMP skill contract

Load when packaging an OMP skill or authoring skill-selection guidance. This is an adaptation of upstream invocation/pointer ideas to the approved native OMP interface contract; upstream provider metadata and tool names are not portable permissions. Published contracts are interface reference, not proof about an installed or future OMP version.

## Package and trigger

Use a canonical skill directory with `SKILL.md`; supported discovery reads the one-level entrypoint metadata. Canonical frontmatter normally contains `name` and `description`; preserve justified documented exposure metadata. Tiny compatibility pointers may use `disable-model-invocation: true` after the exact runtime contract is verified. Name is the retained canonical identity. Description says when to load, not the steps, output schema or enforcement claims. Provenance/license belongs in `SOURCES.md` and actual notice files, not invented flags.

Use descriptions as picker labels: put a short, recognizable provenance prefix immediately before the functional trigger, e.g. `[ponytail] Find unnecessary complexity and recommend minimal changes.` Keep the source key preferably within 20–25 characters; never trade away the purpose or invocation trigger to fit it. Use only a compact subset of verified contributing sources when needed, and leave independently authored skills untagged. Keep exact source names, URLs, merge lineage, licenses and attribution in the existing `SOURCES.md`/provenance owner. Do not add source claims from filename resemblance or uncertain historical lineage.

Place conditional references/templates within that owner and link exact relative paths. Cross-skill shared guidance uses a conditional `skill://<name>/<relative-path>` pointer with the actual enabled owner and asset rather than copying its procedure. Namespace/collision handling depends on the actual OMP registry; do not create a second same-named managed variant or hard-code a package installation path.

## Real invocation and loading

Use the currently available native discovery/URI/task interfaces, confirmed for the installed version. Explicit plain-file loading is also a distinct authorized route: read the actual canonical `SKILL.md`, state its base directory, and resolve local references against it. A named skill or slash token alone is not evidence its body was read. Skill content does not retroactively activate runtime keywords, change model thinking, grant tools or serialize approval.

If an enabled suite is explicitly requested but convenience URI support is unavailable, a known canonical file may be loaded only under that explicit authorization; mark native discovery unverified. Deliberate disablement/filtering wins and does not trigger file-load fallback or automatic setup. Missing suite documentation does not block ordinary native OMP work; only explicitly requested unavailable suite-specific proof is blocked. Renewed explicit file-load authorization is different from automatic reactivation.

## Consumer/permission binding

State the actual consuming role and task result contract. Dispatch uses the available public task schema and permitted tools, not upstream Skill/Task aliases, model tiers or plugin engines. Read-only instructions limit behavior but are not OS containment; a name/tools list/model ID alone does not establish loaded definition provenance or sandboxing. No metadata field in this passive package enforces those properties.

Plan Mode/read-only actions return their result through an allowed channel without checkout writes or execution. Authoring a skill cannot change runtime config, approval state, services, hooks or credentials. For independently dispatched source inspection, the controller must establish the real role/definition basis and limits required by the consuming workflow.

## Independent compatibility layers

Separate package/inventory/link/notice checks, installed discovery/URI/custom-agent parsing, and actual tool-enabled behavior. Exact installed version and exercised layer accompany any compatibility claim. An upstream moving doc or prior version pass is not current acceptance. For an authorized upgrade assessment load `skill://docs-engineering/references/omp-compatibility.md`; do not update/install/downgrade OMP from this skill.

When exposure or invocation behavior matters, verify the installed version's discovery, hidden metadata, URI/slash reachability and naming contract through current native help/schema, version-pinned source or authorized passive checks. Hidden catalog exposure is not permission enforcement. Do not treat historical checks as current guarantees or assume a general alias field; use only supported metadata and existing justified pointers. Mandatory router skills and foreign-harness mechanics remain excluded. An unavailable interface leaves the corresponding claim unverified, never widens permissions or selects a same-named substitute as proof.
