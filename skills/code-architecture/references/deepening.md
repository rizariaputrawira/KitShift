# Deepening a module cluster

Load when a concrete candidate cluster and its dependencies are under consideration. Use the vocabulary in the parent skill.

## Classify dependencies

- **In-process:** pure computation or in-memory state. Consolidate coherent behavior and test it through the resulting interface; no adapter is needed.
- **Local-substitutable:** a local test substitute exists, such as an in-memory filesystem or test database. Use the established substitute for the integration behavior; keep the substitute internal rather than exposing a production port merely for tests.
- **Remote but owned:** another independently owned system/service is reached over a network. A port at the seam and production transport adapter plus controlled test adapter can consolidate caller logic, if there are two real implementations and the owning contract permits it.
- **True external:** third-party behavior outside the codebase's control. Isolate only the necessary external dependency behind an existing or justified interface and use a faithful controlled adapter in tests; avoid expanding the abstraction beyond behavior actually needed.

Categories guide evidence and testing, not mandatory architecture patterns. Preserve actual ownership, latency, failure, security and consistency behavior; do not flatten a real distributed contract into an in-memory fiction.

## Seam discipline and tests

A seam is justified by real variation, not by the wish to mock. Do not expose internal seams because tests use them. Prefer tests through the deep module's interface that assert observable behavior. Replace tests made obsolete by the new interface only when the relevant behavior is covered there; do not delete useful coverage on the strength of a planned redesign. Consider locality of errors and whether the proposed test traverses the actual caller chain implicated by the problem. A one-adapter seam is extra indirection unless another actual variation is demonstrated.

Report dependency category and assumptions, interface/seam placement, production/test adapters if any, behavior retained, and what verification the design makes possible. Design recommendations do not themselves authorize code changes or test execution.
