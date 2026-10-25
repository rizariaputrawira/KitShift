# Shared availability and resource boundaries

Load when accepted lower-trust input can consume shared CPU, memory, disk, workers, connections, queues, quota or operator-owned spend, or stop/deadlock a shared service. This distinguishes availability security from ordinary performance and self-impact. Never validate by stressing a live/shared service.

## Core discipline and resource map

For each path record earliest accepted size/cardinality, work before authentication, attacker effort, service work/fan-out, persistent/retained state, shared pool, effective limit owner, cancellation/cleanup and recovery. Require input-to-cost or fatal-state reachability, a missing effective bound, and consequence for another user/shared resource/safety function/operator spend. A missing rate limit alone is hardening; inspect body/file/parser, queue/concurrency, deadline, gateway, database and per-tenant bounds first. Unknown deployed caps/topology are decisive missing facts, not assumed absent.

## Amplification

- Derive accepted recursion/depth/cardinality and algorithmic complexity for parsing, regex, evaluation, graph/template or sort/hash work. A theoretical expensive algorithm needs a reachable accepted input and shared impact; a measured growth curve cannot be invented from source.
- Trace decompression, sparse/aliased/nested/encoded expansion across every stage. Transfer-size limits may not bound expanded representation or aggregate copies.
- Follow query scans, joins, filters, pagination, expansion and downstream calls. Compare requested scope with intentionally authorized resource scope before labeling work abusive.

## Accumulation and cancellation

Inspect per-item and aggregate bounds for bodies, buffers, cache keys, labels, sessions, subscriptions and pending jobs. Follow cleanup on disconnect, timeout, cancellation and partial parse. Read file/socket/cursor/timer/subprocess ownership on every error path. Check whether supposedly canceled work still consumes a shared pool or paid call. Per-object caps can coexist with unbounded total state.

## Quota and scheduling

Locate costly parsing/crypto/decompression/calls before the earliest authentication/size gate. Verify quota keys cannot be reset/evaded by attacker-selected IP, route, tenant, task or key prefix; inspect retries, reconnects, distributed races and overflow. Determine who can hold workers/locks/pools/event-loop turns and whether deadlines/fairness protect unrelated users.

## Failure and recovery

Trace accepted input to fatal assertion/exit, unhandled error, lock cycle or infinite loop. Establish supervisor and worker isolation; a parser crash does not establish whole-service outage. Inspect synchronized/unbounded retries, poison records at queue/startup/migration heads and reset/restore paths that reintroduce the same failing state or ignore current limits.

## Evidence bar

State attacker cost, resource/service work, shared blast radius, persistence and recovery. Source confirmation requires complete source evidence for the claimed bounded consequence after challenge against strongest source-visible limits and isolation. Unknown scheduler/topology/quota/recovery behavior stays needs-validation. Do not claim measured latency, growth, retention or runtime outage without actual evidence.

If a separately authorized contained executor is available, a named small boundary fixture, bounded growth points or deterministic cancellation check may resolve a missing fact using strict resource/time limits and dummy/local calls. No stress, saturation, quota spend, live process or target execution by reviewers. Stop at the minimum effect and apply [separate authorization for runtime evidence](../../docs-engineering/references/security.md#separate-authorization-for-runtime-evidence), including demonstrated OS containment, no real credentials/home state, no external/shared network, read-only target/toolchain and confined writes. Isolated loopback is allowed only if required by that authorized check; missing prerequisites leave runtime evidence unverified.
