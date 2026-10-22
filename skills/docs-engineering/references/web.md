# Web and interface information

## HTTP contracts
OpenAPI owns HTTP operations, schemas, auth/security declarations, headers, errors and protocol facts at the project's existing version. Record contract source/version, consumers and compatibility boundary. Compare changed implementation/acceptance to operations and schemas; link rationale rather than recopying facts. Current researched reference is OpenAPI 3.2.1; a newer reference never authorizes migration. Native/generated contracts need no Markdown template or invented endpoints. Use project generators only if already available and authorized.

## Event contracts
AsyncAPI owns message/channel/operation/protocol-binding facts. Researched published reference is 3.1.0, not mutable latest. Preserve actual application perspective and producer/consumer direction; one receiver description does not establish an opposite sender or broker topology. Inspect delivery/idempotency/failure expectations at their owning requirements/design. Event/schema/channel/binding changes trigger compatibility and consumer verification, not assumed backward compatibility.

## Interface rationale and supporting tools
API-design rationale explains boundary, version/compatibility, auth, pagination/error choices and tradeoffs only where consequential. ICD owns cross-party responsibility not formal syntax. Postman is supporting/generated examples/tooling: identify contract source/generator, strip credentials, compare examples to contract, record execution separately. If no formal contract exists, investigate actual owner before deciding whether a collection is adequate; do not create competing authority or install generators.

## Web scope and verification
Select frontend/browser behavior, identity/session, browser storage, cross-origin data, accessibility, supported browsers, deployment and operations only where actual surfaces exist. API-only services do not require PRODUCT.md, DESIGN.md or visual composition. Record framework/runtime/browser support from evidence and link compatibility tests. Review exposed inputs, object/tenant authorization, token/session lifecycle, query/render/file boundaries, third-party integrations, availability and sensitive logging where relevant. ASVS v5.0.0 can inform selected checks pinned by version/control ID; no exhaustive assurance from a link. UI craft resolves applicable enabled guidance through [the UI owner pointer](../SKILL.md#conditional-references-and-existing-owners), not a fixed provider or artifact prerequisite.
