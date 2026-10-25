# Passive skill contract

Load when packaging a skill or authoring skill-selection guidance. Keep reusable procedures independent of a particular harness, agent, provider or model; integration-specific setup belongs to the selected host's integration documentation. Upstream metadata and tool names are not portable permissions. Published contracts are reference material, not proof about an installed or future host version.

## Package and trigger

Use a canonical skill directory containing `SKILL.md`, with directory/name agreement. Confirm the selected host's package roots, discovery depth and metadata parsing; do not assume nested packages are discovered recursively. Keep `name` and `description` in frontmatter and preserve existing justified exposure metadata, including `disable-model-invocation: true` for explicit-only skills where that field is used. Name is the retained canonical identity. Description says when to load, not the steps, output schema or enforcement claims. Provenance/license belongs in `SOURCES.md` and actual notice files, not invented flags. An explicit-only invocation preference must remain explicit even where the host does not enforce its metadata.

Use descriptions as picker labels: put a short, recognizable provenance prefix immediately before the functional trigger, e.g. `[ponytail] Find unnecessary complexity and recommend minimal changes.` Keep the source key preferably within 20–25 characters; never trade away the purpose or invocation trigger to fit it. Use only a compact subset of verified contributing sources when needed, and leave independently authored skills untagged. Keep exact source names, URLs, merge lineage, licenses and attribution in the existing `SOURCES.md`/provenance owner. Do not add source claims from filename resemblance or uncertain historical lineage.

Place conditional references/templates within their owner and link exact relative file paths. Cross-skill guidance links to the canonical owner's `SKILL.md` or exact companion, resolved relative to the containing file, rather than copying its procedure or requiring a private URI scheme. Use the selected host's supported discovery/loading interface when available; a relative link is a source locator, not authorization to bypass disablement. Namespace/collision handling depends on the host; do not create a second same-named managed variant or hard-code an installation path.

## Real invocation and loading

Use currently available discovery/loading/delegation interfaces, confirmed for the selected host and version. Authorized plain-file loading is also a distinct route: read the actual canonical `SKILL.md`, establish its base directory, and resolve its relative references against the containing file. A named skill, link or slash token alone is not evidence its body was read. Skill content does not activate runtime keywords, change model thinking, grant tools or serialize approval.

Where supported, verify URI reads and slash-command invocation as distinct paths. Forms such as `skill://<name>` and `/skill:<name>` are optional conveniences, not portable prerequisites or evidence of successful loading.

If an enabled skill is explicitly requested but its convenience loader is unavailable, a known canonical file may be read under that authorization; mark native discovery unverified. Deliberate disablement/filtering wins and does not trigger file-load fallback or automatic setup. Missing suite documentation does not block ordinary authorized work; only explicitly requested unavailable suite-specific proof is blocked. Renewed explicit file-load authorization is different from automatic reactivation.

## Consumer/permission binding

State the actual consuming role and result contract. Delegate only through available supported interfaces and permitted tools, not upstream tool aliases, model tiers or plugin engines. Do not infer native role, tool or model registration from foreign provider metadata or bundled prompt files; verify the runtime's actual registration contract. If delegation is unavailable, perform authorized work directly rather than requiring another agent. Read-only instructions limit behavior but are not OS containment; a name/tools list/model ID alone does not establish loaded definition provenance or sandboxing. No metadata field in this passive package enforces those properties.

Under planning-only or read-only restrictions, return results through an allowed channel without unauthorized checkout writes or execution. Follow the selected host's actual modes and approval mechanisms; do not assume a named mode exists or creates authority. Authoring a skill cannot change runtime config, approval state, services, hooks or credentials. For independently dispatched source inspection, establish the real role/definition basis and limits required by that workflow.

## Independent compatibility layers

Separate package/inventory/link/notice checks, installed discovery/loader/agent-definition parsing, and actual tool-enabled behavior. Exact host/version and exercised layer accompany any compatibility claim. An upstream moving document or prior-version pass is not current acceptance. For an authorized compatibility or upgrade assessment read [harness compatibility](../../docs-engineering/references/harness-compatibility.md); do not update/install/downgrade a host from this skill.

When exposure or invocation behavior matters, verify the selected version's discovery, metadata handling, supported invocation paths and naming contract through current help/schemas, version-pinned source or authorized passive checks. Hidden catalog exposure is not permission enforcement. Do not treat historical checks as current guarantees or assume a general alias field; use only supported metadata and existing justified pointers. Mandatory routers and foreign-host mechanics remain excluded. An unavailable interface leaves the corresponding claim unverified, never widens permissions or selects a same-named substitute as proof.
