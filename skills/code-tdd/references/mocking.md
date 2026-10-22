# Necessary boundaries, not a mock architecture

Load before adding a double. Prefer real internal modules/components and existing fixture helpers. Mock only the unavailable, unsafe, nondeterministic or materially slow external operation needed for the test: a payment/network endpoint, external storage, clock/random source, or a filesystem boundary when real isolated fixtures are not appropriate.

## Choose the narrow boundary

1. List the real dependency's relevant behavior and side effects. Determine which ones the test depends on: for example, replacing a discovery operation must not also erase the persisted catalog that duplicate detection consumes.
2. Keep those dependent effects real. Replace the slow/unsafe operation beneath them, or use a controlled existing fixture implementation. Do not connect to a live endpoint or use real credentials to make a mock unnecessary.
3. Use the project's existing boundary/interface and native mocking facilities. Passing an existing dependency explicitly may be enough; do not introduce a new wrapper/factory/mock library merely because this reference ran.
4. Make the double specific to its contract. Relevant arguments, success/error branches and response structure must be faithful so a wrong call cannot accidentally receive the right response. Include documented fields that real consumers depend on; avoid a fabricated partial shape that masks integration failures.
5. Assert on the production component's observable result/effect. Interaction assertions are earned only when arguments, counts or ordering are themselves part of the external protocol/consumer contract.

## Signs to reconsider

A mock for your own class that replaces the very behavior being tested, setup larger than the behavior, or repeated breakage after harmless refactors indicates an over-shallow seam. Prefer an integration test with real owned components and one controlled external edge.

Use test utilities for cleanup/setup only tests need; production lifecycle methods belong only where production owns that lifecycle. Do not rewrite the application into an SDK layer purely for mocks. A domain-specific existing operation is usually easier to double accurately than a generic dispatcher; changing that production interface still requires an authorized real design need.
