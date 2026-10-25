# AI, LLM and agent boundaries

Load when untrusted content reaches a model/context/memory that influences a trust-sensitive action or disclosure. The path is content → consuming principal/session → execution identity/capability → final handler/resource/output. Ordinary access, transport and injection checks still apply.

## Core discipline

Prompt injection text alone is not a confirmed vulnerability. Establish a deterministic boundary failure: cross-principal context/disclosure, requester-and-resource authorization failure, unrequested action under a victim's valid authority, or an unsafe downstream sink. Model output, memory, tool metadata and MCP responses are untrusted input. A guardrail prompt and a valid output schema do not establish authorization, isolation or action binding. Source proof of a missing deterministic check is not proof a particular model obeyed injected text at runtime; decisive model/provider facts remain needs-validation.

Draw four source maps: execution identities, capabilities, writable context/memory sources, and output destinations. Work backward from side-effecting handlers and durable memory reads. For every candidate identify attacker, affected principal, effective identity, resource, exact action/authority and supported consequence.

## Context, retrieval and durable memory

- **Indirect retrieval injection:** locate the attacker-controlled write, retrieval authorization/scope, consuming principal, and enabled capability. Check isolation and binding to the actual intentional request separately.
- **Cross-session/tenant bleed:** inspect query filters and every cache/history/embedding key. Tenant metadata on stored records does not enforce retrieval scope; check alternate and batch queries.
- **Memory poisoning:** read every writer, merge/update/delete owner, provenance retention and later consumer. Check whether low-trust observations become durable policy, preferences or facts in another task/principal. User-owned memory for that user's intentionally authorized actions is not itself cross-boundary harm.
- **Role/provenance confusion:** compare structured prompt roles and serialization with caller-controlled role fields/string concatenation. Forged labels matter when they change a deterministic trust decision or reach a meaningful capability, not merely because text resembles a system message.

## Tools, approval and dispatch

- **Arguments to sinks:** follow decoded model/tool fields to SQL/shell/file/URL/privileged APIs. Shape validation is parsing, not safe paths, destinations, queries or resource authorization.
- **Confused deputy:** establish effective credential and handler-side requester/tenant/resource authorization. A broad service credential with enforced per-user scope is not a defect; show an action the attacker cannot perform normally.
- **Action binding:** independently verify intentional request/approval and bind it to normalized tool name, complete arguments, principal, target, amount, expiry and batch membership. Valid generic authority does not prove the victim intended an attacker-induced action. Compare final handler object with approved object after retries, queueing and resumption; avoid duplicate or mutated side effects.
- **Schema/handler disagreement:** inspect aliases, extra/duplicate fields, coercion, nested free-form data, canonicalization and defaults. Compare the normalized validated object with the object actually consumed at the final handler.
- **Delegated loops:** trace per-request budget, per-action authorization, cancellation and idempotency to shared quotas/spend or durable state. No quota-burning test is authorized by this reference.

## MCP and sub-agent identity

Inspect principal, tenant, credential audience and narrowed capabilities passed to delegates; returned results stay untrusted. Establish authenticated connection, tool/server namespace, outstanding request correlation and credential binding. Model-selected aliases or peer-supplied tool descriptions/schema cannot grant policy authority. Reconnects and name collisions must not let one peer satisfy another peer's request. Unknown external server/routing identity remains a precise needs-validation fact.

## Output and validation

Follow model output into HTML/Markdown/template/URL/command rendering and context into disclosure. Confirm sink encoding and destination policy; unknown renderer behavior is not invented. Generic instruction disclosure without a protected data/capability boundary is not automatically a finding.

Read queued/retry/resume/batch/delegated paths and apply the strongest gate after final arguments and before each side effect. Memory/retrieval claims cite both writable source and reachable cross-principal consumer. Action-binding claims cite the intentional request or lack of it and the consumed action. A source-confirmed decision needs complete source evidence for the bounded impact after challenge against strongest controls; a model-behavior-dependent exploit remains needs-validation unless separately authorized observed executor evidence resolves it. Reviewers do not execute prompts, fetch MCP endpoints or inspect credentials. Apply [evidence and finding decisions](../../docs-engineering/references/security.md#evidence-and-finding-decisions); any runtime check must satisfy [separate authorization for runtime evidence](../../docs-engineering/references/security.md#separate-authorization-for-runtime-evidence).
