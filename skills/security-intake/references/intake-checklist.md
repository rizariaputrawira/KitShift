# Intake checklist

Modified from NVIDIA SkillSpector skill-inspector. Copyright 2026 NVIDIA CORPORATION & AFFILIATES. See [SOURCES.md](../SOURCES.md) and the full [Apache-2.0 license](../LICENSE.skillspector). The checklist replaces upstream scan/download commands and score thresholds with source coverage and current permission boundaries.

## 1. Bound the source

Record supplied locator, repository/revision or package version, exact inspected bytes/text basis, intended consumer/host, claimed purpose, requested authority, and whether this is new adoption or a delta. A gallery listing, downloads, reputation, marketed skill count or familiar package name is not provenance or host compatibility. Inspect package manifest entrypoints, actual runtime imports, host/peer contracts, tool authority and dependencies. An extension importing a host SDK or spawning a process does not become a passive skill because of its filename.

For each material path record role, retrieved/inspected status and any missing/truncated portion. Include nested references and content hidden in encoded strings when safely readable without executing a decoder supplied by the target. Archives are inspected through a read-only member view, never extracted/executed by bundled tooling. Missing referenced binary/server code prevents a complete authority judgment. Establish license coverage from real pinned notices; an absent grant is not an inferred open-source license.

## 2. Inspect the authority-bearing surface

| Surface | Source questions | Controls to inspect |
|---|---|---|
| Instructions and references | Do triggers hijack unrelated requests, hide actions, override approvals, change model/provider policy, or turn retrieved text into durable policy? | Explicit consumer and invocation; current native authority remains controlling; narrow task boundary. |
| Manifests and runtime imports | What actually loads: Markdown, extension, CLI, SDK runner, server, hook, dependency? Does the host contract match the intended host? | Entry points, peer versions, dependency closure, loaded versus merely declared material. |
| Filesystem/environment | What paths can be read/written? Are home/config/memory/auth locations requested? Can selectors or symlinks escape declared scope? | Resource-scoped access, final path handling, actual denial/failure behavior. Do not inspect real credential locations. |
| Network and disclosure | What data would leave, for which destination and principal, at whose request? Are redirects, telemetry, logs or caches additional destinations? | Explicit purpose and consent, endpoint/identity binding, minimization, deterministic authorization. Do not contact destinations. |
| Execution and dependencies | Shell/subprocess, dynamic import/eval, downloaded or decoded code, unpinned installs? | Controllability of inputs, trusted source identity, privilege at execution, no implicit run/install approval. |
| Persistence/update | Startup/profile hooks, cron/agents, self-rewriting files, hidden state, queue or automatic updates? | Owner, exact writes, revocation/uninstall behavior, user control, immutable update identity. |
| MCP/tool delegation | Who defines names, schemas, descriptions, requests and responses? Which principal/credential reaches the final handler? | Connection/request correlation, capability narrowing, handler-side authorization and argument/action binding. |

A claimed read-only role, prompt warning, tool-name list or marketed sandbox is not an OS containment proof. Compare every sensitive behavior with necessity, documented scope, actual bounds and informed user control. Distinguish intended same-user capability from hidden privilege expansion. Already-supplied scanner messages must be checked against surrounding source, not automatically discarded or accepted by numerical severity.

## 3. Select companions by actual boundary

- Model/context/memory/tool authority: [AI and LLM](../../security-audit/references/ai-and-llm.md).
- Shared cost, queues, processes or quotas: [availability](../../security-audit/references/availability.md).
- Dependency, CI, signing, update or plugin identity: [supply chain](../../security-audit/references/supply-chain.md).

These are inspection branches, not executable scanners. Other relevant boundary classes remain eligible; absence of a companion does not justify silently excluding them.

## 4. Verdict and coverage precedence

- `unsafe`: source substantiates malicious/deceptive behavior, unauthorized secret/context disclosure, hidden persistence, approval bypass or unexplained harmful authority use. Preserve this verdict even when unrelated files are missing; additionally state incomplete coverage and do not claim a complete assessment.
- `analysis-incomplete`: decisive files, provenance, host contract or controls are unavailable and the reviewed evidence does not already substantiate unsafe behavior. Name the missing material and the decision it prevents. Never substitute `acceptable` or assume the missing binary is harmless.
- `caution`: decisive source is inspected; sensitive behavior is necessary, documented, bounded and controllable, but creates concrete adoption conditions or residual risk. State each condition and its evidence.
- `acceptable`: decisive material is inspected, real authority matches the bounded purpose, no unexplained sensitive behavior remains, and explicit coverage supports that limited conclusion. No safety certification or permission to install follows.

Keep intake verdict distinct from vulnerability decisions. Source observations may substantiate unsafe bundle instructions without runtime exploitation. For vulnerability candidates, follow the shared [evidence and finding decisions](../../docs-engineering/references/security.md#evidence-and-finding-decisions): retain a stable local identifier, attacker capability, invariant, real source/caller trace, preconditions, strongest controls, credible consequence, missing facts and scope. Confirmed requires complete evidence for the bounded source-visible consequence; needs-validation names the decisive missing facts; rejected retains disproof. Challenge the reasoning against actual strongest controls, directly or through permitted native delegation. Do not call controller challenge independent review; unavailable required independence is an explicit limit. Do not invent confidence scores, scanner results, worker identities or runtime exploit proof.

## 5. Report

Return source/revision and purpose; exact verdict and rationale; inspected paths and roles; unavailable/truncated/out-of-scope paths and consequences; real authority and strongest controls; source excerpts with secrets redacted; supplied scanner coverage (or none supplied); candidate identifiers, dispositions and unresolved gaps; and specific adoption conditions/missing evidence. State the evaluator/source/operation basis actually observed, without claiming exact loaded-file provenance or OS containment from a role name. Use the native role/result contract and requested output format, not a fixed custom schema. No target commands, install recommendation masquerading as approval, or arbitrary numeric risk score.
