# Supply-chain, release and update boundaries

Load when dependency resolution, generated inputs, CI, artifacts, signing/promotion, plugins or updates hand lower-trust material to a trusted consumer. Follow identity from source to resolved input → build worker → artifact → test/signature/attestation → promotion → installed consumer.

## Core discipline

A floating dependency or known-vulnerable version alone is not a proved reachable boundary failure. Name who can influence resolution, which trusted job consumes it and the resulting unauthorized publication, shipped code, disclosure or privileged execution. A checksum from the artifact's same untrusted location is not an independent authenticity root. CI configuration is authorization code: establish trigger, checked-out source, effective principal/token, available authority and final publish/mutate operation. Do not assume hosted defaults outside available pinned source.

## Dependency and build inputs

Inspect public/private namespaces, resolver priority/fallback mirrors, source URLs, platform alternatives, lock/checksum use and first-install versus update behavior. Trace mutable branches/tags/submodules/downloaded tools, remote includes, CI actions and images into a real build consumer. For schemas, localization, generated clients, archives or other generated content compare input and generator ownership with shipped output integrity. Reproducible bytes alone do not authenticate a producer. Verify build-context/ignore rules do not ship actual private data or privileged configuration; redact secrets rather than copying them.

## CI and persisted trust mixing

Compare untrusted and protected events side by side: event fields, checkout ref, contribution source, approval/environment gate and narrowed token. Trace branch/message/issue/matrix/artifact fields into shell/template/path or privileged workflow inputs. Inspect caches/artifacts/workspaces restored by a stronger job: producer identity, namespace/key, digest binding and whether promotion re-resolves a mutable name. Excess permission is hardening unless a lower-trust input can reach a concrete privileged action.

## Release, signatures and updates

Walk backward from the released/installed digest. Check that tests, review, attestation, signature and publication bind the same immutable artifact through copies, repacks and architecture merges. Verify signer identity, repository/workflow/branch/environment/key role and consumer policy, not just successful signature syntax. Inspect expiry, rotation/revocation, partial release and missing-attestation failure behavior.

For updates bind authenticated payload to product, platform, channel, version, path, expiry and rollback state in the same authorized transaction. Inspect atomic install, failed download and recovery. For plugins/extensions inspect authenticity/capability checks before hooks or host execution; intended arbitrary same-user plugin installation does not itself prove a privilege boundary.

## Validation and unknown facts

Name the lower-trust writer, exact controllable source/cache/artifact/metadata, consuming authority, broken identity handoff and supported consequence. Current source must establish each prerequisite and strongest preventing control. Unknown branch protection, hosted runner, registry, signing policy or production promotion settings remain needs-validation with the exact owner-observed fact, never guessed defaults.

Reviewers do not run CI, install dependencies, query registries, publish, sign or alter releases. A separately authorized contained executor may use a named harmless fixture, dummy marker and local non-production artifact namespace if necessary. Distinguish source evidence from observed authorized runtime evidence and apply [separate authorization for runtime evidence](../../docs-engineering/references/security.md#separate-authorization-for-runtime-evidence), including demonstrated OS containment, no real credentials/home state, no external/shared network, read-only target/toolchain and confined writes with resource/time limits. Isolated loopback is allowed only if required by that authorized check; missing prerequisites leave runtime evidence unverified. For adoption of an external bundle, route to [security-intake](../../security-intake/SKILL.md) instead of treating a package listing as safety evidence.
