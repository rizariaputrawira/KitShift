---
name: code-swift-development
description: "[Emil Kowalski] Write, review, or migrate Swift; diagnose concurrency errors, hangs, data races, retain cycles, or performance problems. Also use when explicitly requested as write-swift."
---

Modified adaptation; public metadata/routing and Swift guidance updated locally. See [SOURCES.md](SOURCES.md)
and the complete [MIT notice](LICENSE.emil).

# Write Swift

## Task and toolchain

Handle the current Swift request directly. Loading this skill does not require a greeting or an additional question before proceeding. If no actionable request is supplied, ask what Swift task the user wants help with.

Before choosing syntax or concurrency behavior, inspect the actual compiler (`swift --version` when available), active language mode, package tools version, target platforms/SDKs, deployment targets, and relevant feature flags and actor-isolation settings. Report unavailable evidence rather than assuming a toolchain.

Version labels below are retained upstream reference labels, not a current release inventory or a guarantee that every example compiles. Verify the features and APIs needed for the requested change against its actual toolchain and deployment constraints; retain a supported alternative when necessary. Proposal acceptance or implementation on a development branch does not establish availability in the project's compiler or SDK. Loading this skill does not authorize installing a toolchain, migrating a project, or changing build settings.

The through-line: **Swift is a progressive-disclosure language. Start with the simplest, most static, most single-threaded thing that works, and buy dynamism — concurrency, reference semantics, existentials, unsafe pointers — only where you can point at the reason.** Every rule below is an application of that.

Model this hierarchy of defaults. Move down a level only with a reason you can state:

| Need         | Reach for               | Move down only when                                        |
| ------------ | ----------------------- | ---------------------------------------------------------- |
| Data         | `struct` / `enum`       | you need identity, sharing, or inheritance                 |
| Abstraction  | concrete type           | you have repeated code across types                        |
| Polymorphism | `some P` (generic)      | you need heterogeneous storage → `any P`                   |
| Execution    | main actor, synchronous | profiling shows a hang → `async` → `@concurrent` → `actor` |
| Memory       | `Array`, `String`       | profiling shows the cost → `InlineArray`, `Span`           |
| Safety       | safe API                | C interop or a measured hot path → `Unsafe*`               |

---

## 1. Model data with value types

Value types are the default in Swift, not a special case.

- **Default to `struct` and `enum`. Use `class` only for identity, shared mutable state, inheritance, or resource lifetime.** A window, a database connection, an entity stored in a rendering engine — those have identity. A `Point`, a `Drink`, a `Material` does not.
- **`let` by default; `var` only when you mutate.** This is the same discipline as `some` before `any` and value before reference: start narrow, widen with cause.
- **A struct containing a mutable reference does not automatically have value semantics.** Copies share the object; forwarding computed properties alone does not prevent mutations leaking across copies. Use immutable referenced storage, implement copy-on-write before every mutation, or deliberately model and document the shared reference semantics.
- **Copy-on-write is how you get out-of-line storage _and_ value semantics.** Wrap a final class in a struct and check `isKnownUniquelyReferenced(&storage)` before mutating; copy first if it isn't. This is exactly how `Array`, `String`, and `Dictionary` work.
- **Enums are the tool for "a fixed set of things" and for mutually exclusive state.** Replacing a pile of optional stored properties (`isSharing`, `selectedRows`, `shareTarget`) with one `enum State` makes invalid combinations unrepresentable and makes state change atomic instead of a sequence of property writes you can forget to finish.
- **Composing value semantics preserves value semantics.** A struct whose stored properties themselves have value semantics can preserve independent copies. Merely declaring each property's type as a struct does not prove this if one of those structs wraps shared mutable references.

```swift
struct Material {                       // value semantics preserved
  var roughness: Double
  private var _texture: Texture         // a class

  var color: Color {
    get { _texture.color }
    set {
      if !isKnownUniquelyReferenced(&_texture) { _texture = Texture(copying: _texture) }
      _texture.color = newValue
    }
  }
}
```

**Noncopyable types** (`~Copyable`) express unique ownership: a file descriptor, a bank transfer, an open resource. Suppressing the copy turns "you must not run this twice" from an assertion into a compile error, and makes `deinit` on a struct meaningful. Mark the finishing method `consuming` so the compiler proves it's the last use. Parameter ownership becomes explicit: `borrowing` (read-only, the default), `consuming` (takes it away), `inout`/`mutating` (temporary write access).

---

## 2. Errors and optionals — make the failure paths visible

Swift error handling rests on three points: sources of error are marked so they can't surprise you; errors carry enough context to act on; and **recoverable errors are different from programmer mistakes**.

- **Recoverable → `throw`. Programmer mistake → `precondition`/`fatalError`.** A failed network call keeps the program running. An out-of-bounds index means the code is wrong and must halt before the bug becomes a security issue.
- **Enums with associated values make the best error types.** `case duplicateFriend(String)` beats `case duplicateFriend` — the context is the whole point.
- **`guard` for error conditions**, because it forces the exit path. `if let` for the ordinary unwrap.
- **Typed throws (`throws(MyError)`) are for internal functions, error-forwarding generic code, and constrained environments** where boxing `any Error` is too costly. For public API, untyped `throws` preserves your freedom to change the error type later. Note the unification: `throws` is `throws(any Error)`, and non-throwing is `throws(Never)` — which is what lets `map` abstract over both.
- **Force-unwrap only where you can state the invariant.** In Swift Testing, prefer `try #require(...)` for a failing test and optional unwrap. In application code, use `guard`/error handling for recoverable absence or a stated `precondition` for a programmer invariant; `#require` is not an application assertion API.

---

## 3. Concurrency: stay single-threaded until profiling says otherwise

Swift 6.2 introduced opt-in changes to nonisolated async execution. Compiler version alone does not establish the active behavior.

Start every app entirely on the main thread. Single-threaded code goes a long way, and most apps never need to leave it.

**The progression, in order. Do not skip steps.**

1. **Single-threaded on the main actor.** No concurrency at all. Fine for most apps.
2. **`async`/`await`** to hide latency (network, disk). Still no concurrency of your own — SDK APIs like `URLSession.data(from:)` offload on your behalf.
3. **`@concurrent`** to move _your_ expensive work off the main thread — only after Instruments shows a hang.
4. **`actor`** to move _state_ off the main actor — only when too much main-actor state is forcing tasks to hop back constantly.

**Inspect build settings before recommending changes.** Within an authorized migration or configuration change, evaluate **Approachable Concurrency** and, separately, **Default Actor Isolation** for each target. `MainActor` defaults can suit app/UI modules; general-purpose libraries need an isolation contract appropriate to their clients. If supported by the package toolchain, `swiftSettings: [.defaultIsolation(MainActor.self)]` selects a main-actor default. Do not enable these settings automatically, assume an Xcode template's defaults apply to an existing target, or conflate default actor isolation with nonisolated async execution.

### The rule that changed

**Distinguish actor-isolated functions from nonisolated async functions.** Actor-isolated functions execute on their specified actor. For nonisolated async functions, [SE-0461](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0461-async-function-isolation.md) gates caller-actor inheritance behind `NonisolatedNonsendingByDefault`; Swift 6.2 alone does not turn it on.

- **`@concurrent`** on an async function explicitly selects execution off the caller's actor on the generic executor. Use it for CPU-heavy work when supported; it is not a promise of a particular OS thread.
- **`nonisolated(nonsending)`** explicitly selects caller-actor execution when supported. With `NonisolatedNonsendingByDefault` enabled, this is also the default for nonisolated async functions; without it, their default is generic-executor execution.
- **Plain `nonisolated`** removes actor isolation from a declaration but does not by itself guarantee caller-actor execution for an async function. Without explicit annotations, inspect inferred isolation and active defaults rather than assuming where the function runs.

```swift
nonisolated struct PhotoProcessor {          // decoupled from the main actor
  @concurrent                                // executes off the caller's actor
  func process(_ data: Data) async -> ProcessedPhoto {
    async let sticker = extractSticker(data)  // two independent jobs, in parallel
    async let colors  = extractColors(data)
    return await ProcessedPhoto(sticker: sticker, colors: colors)
  }
}
```

- **Profile before you offload.** Use Instruments (Time Profiler, hangs). If the code can be made faster without concurrency, always do that first. Concurrency has real cost — task allocation, scheduling, and reasoning.
- **Don't spawn a task for trivial work.** A child task to read a `UserDefaults` value costs more than it saves.
- **One task per end-to-end operation.** Work that must happen in order goes in _one_ task; independent operations get separate tasks so the runtime can interleave them.
- **`await` is a suspension point, and it breaks atomicity.** State can change while you're suspended, and you may resume on a different thread. Re-check assumptions after every `await`. Never hold a lock across one. Never rely on thread-local storage across one.

### Actor reentrancy

Actors guarantee mutual exclusion, not transactions. Between two `await`s on the same actor, other work runs.

- **Mutate actor state in synchronous methods.** Synchronous code on an actor runs to completion uninterrupted — that's your transaction boundary.
- **Keep async actor methods thin**, composed of synchronous transactional operations, and leave the actor in a consistent state at every `await`.
- The classic bug: check cache → `await` download → write cache. Two tasks both miss, both download, the second clobbers the first. Re-check after the `await`, or dedupe the in-flight work.
- **Actors do not guarantee FIFO or strict priority order.** Executors can consider priority when selecting jobs. When operations must remain ordered across suspension points, await them sequentially in one task, or use an explicitly ordered producer and a single consumer; an actor or `AsyncStream` alone does not establish ordering among concurrent producers.

---

## 4. Sendable and sharing data

`Sendable` marks a type safe to share across isolation domains. The compiler checks it at every task and actor boundary.

- **Structs and enums can be `Sendable` when their storage is.** Inference covers eligible non-public types not exposed with `@usableFromInline`, and frozen public structs/enums; public non-frozen types require an explicit conformance. Treat an exported `Sendable` conformance as an API promise.
- **Actors and `@MainActor` classes are implicitly `Sendable`**, because their state is isolated.
- **Choose model isolation from its owner and sharing needs.** A model confined to one domain can remain non-`Sendable`; a UI-owned model may appropriately be `@MainActor`. `nonisolated` removes actor isolation but does not make shared mutation safe or by itself permit transferring a non-`Sendable` instance.
- **You can still _send_ a non-`Sendable` object between domains** as long as the sender stops using it. Make all your mutations _before_ handing it off; touching it afterward is the error.
- Closures capture state too. Only mark a function type `@Sendable` if it genuinely crosses domains.
- **`@unchecked Sendable` is a promise the compiler can't check.** Reserve it for types with real internal synchronization (a `Mutex`, a lock). Same for `nonisolated(unsafe)` on a global — last resort, not a warning silencer.

**When you hit a data-race error, work down this list:**

1. **Don't share it.** Move the shared object into a local so each concurrent job gets its own instance. (This is the fix for the overwhelming majority of real errors.)
2. **Make it a `Sendable` value type**, so "sharing" is really copying.
3. **Isolate it to an actor** — the main actor, or your own.
4. Only then reach for `Mutex`/`Atomic` from the `Synchronization` module (store them in `let` properties), or `@unchecked Sendable`.

**Global and static variables are the most common source of errors.** In order of preference: make it a `let`; put it on `@MainActor`; wrap it in a `Mutex`; `nonisolated(unsafe)`. Note globals in Swift are initialized lazily _and_ atomically — unlike C.

**Bridging old callback APIs:** choose isolation from the callback's documented execution contract. Annotate owned delegate protocols with `@MainActor` only when that contract is appropriate. Use `MainActor.assumeIsolated { }` only when execution on the main actor is already guaranteed; it checks that assumption and can trap, rather than hopping to the actor. If the callback may run elsewhere, explicitly hop to the actor and respect sendability, ownership, ordering, and any synchronous-return requirements. `@preconcurrency` can defer isolation checking but does not establish correct execution or make an arbitrary callback safe. Use `@preconcurrency import` only as a bounded migration aid for a dependency whose annotations are not yet suitable, not as proof of safety.

---

## 5. Structured concurrency

Always prefer structured tasks.

Structured tasks (`async let`, task groups) cannot outlive their scope; the scope waits for their completion, and cancellation, priority, and task-local values propagate through the task tree. `Task { }` is unstructured but does inherit available priority, task-local values, and actor context. Unlike a child task, it has no automatic parent lifetime or cancellation relationship. `Task.detached` does not inherit that context.

- **`async let`** for a fixed, statically known number of concurrent children.
- **`withTaskGroup`** when the number is dynamic. Task groups conform to `AsyncSequence` — iterate results as they land. Use **`withDiscardingTaskGroup`** for nonthrowing children whose results are unused; completed children are cleaned up without retaining their results. Use **`withThrowingDiscardingTaskGroup`** for throwing children whose results are unused: a child failure automatically cancels the group and its siblings and is propagated out of the group. Cancellation remains cooperative, and the scope awaits its children before returning. See [SE-0381](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0381-task-group-discard-results.md).
- **`Task { }`** only when the work's lifetime doesn't fit a scope — reacting to a delegate callback, a button tap, a view appearing. It inherits actor isolation and priority; you must manage cancellation yourself.
- **`Task.detached`** almost never. It inherits nothing — not isolation, not priority, not task-locals. If you need a detached root, put a task group _inside_ it rather than detaching repeatedly.

**Cancellation is cooperative.** Cancelling records cancellation; work must respond to it. Check `Task.isCancelled` or `try Task.checkCancellation()` before expensive work and at useful boundaries in synchronous helpers. Reuse cancellation-aware async APIs where available. When bridging a suspended operation that otherwise cannot react, use `withTaskCancellationHandler` to cancel or unblock its underlying source. The handler can run immediately and concurrently with the operation, including before an already-cancelled operation starts; synchronize shared bridge state and ensure any continuation resumes exactly once.

**Bound your concurrency.** Don't fan out one child per item over an unbounded list. Start N children, then add a new one each time one finishes.

**Task-local values** (`@TaskLocal`) propagate context — a request ID, a trace span — down the task tree without threading a parameter through every signature. Make them optional so unbound reads have a sensible default.

**Bridging callbacks:** `withCheckedContinuation` / `withCheckedThrowingContinuation`. The contract is **resume exactly once on every path** — never resuming hangs the caller forever; resuming twice is a fatal error. For delegate APIs that fire later, store the continuation and nil it out when you resume. Verify compiler and API availability before choosing any newer continuation type; do not assume a proposal or version label establishes support.

**`AsyncSequence`:** iterate with `for await` / `for try await`. Adapt an existing handler- or delegate-based API with `AsyncStream` / `AsyncThrowingStream` — construct the source inside the closure, `yield` from the handler, and clean up in `onTermination`.

---

## 6. Concurrency in SwiftUI

- **Inspect the SDK's actual `View` isolation annotations and the project's defaults.** Modern SwiftUI SDKs isolate `View` to `@MainActor`, but older SDKs differed and declarations can explicitly be nonisolated. `@State` alone does not establish an arbitrary callback's execution contract. Remove redundant annotations only when the retained contract is equivalent for supported clients and toolchains.
- **Some SwiftUI APIs permit work outside the main actor.** Inspect each callback or protocol requirement's actual isolation and `@Sendable` signature; `@Sendable` constrains transferable captures, not a guaranteed thread or executor. Where a closure cannot access actor-isolated `self`, capture the needed safe value instead of the whole view.

```swift
.visualEffect { [pulse] effect, proxy in    // copy the Bool, don't capture self
  effect.blur(radius: pulse ? 2 : 0)
}
```

- **SwiftUI's action callbacks are synchronous on purpose.** Time-sensitive UI updates — starting an animation in response to a gesture or a scroll event — must happen on the same frame as the event. Put the `withAnimation` state change in the synchronous callback; open a `Task` only for the long-running work that follows.
- **Put a piece of state on the seam between UI and async work.** The view kicks off a task; the async layer does a synchronous mutation when it finishes; the UI reacts. That keeps view logic synchronous and makes the async logic testable without importing SwiftUI.

---

## 7. Protocols and generics

Don't start with a class. **Don't start with a protocol either.**

The workflow: **write concrete types → notice repeated code across them → factor the shared capability into a protocol → write generic code against it.** Overloads with near-identical bodies are the signal that it's time to generalize.

- **A protocol with no per-type customization is a wasted protocol.** If every conformance would use the same default implementation, write a constrained extension on an existing protocol instead. Elaborate protocol hierarchies ("type zoology") cost compile time and binary size and buy nothing.
- **Prefer has-a to is-a.** If only some of a protocol's operations make sense for your type, don't refine it — wrap it in a generic struct and expose exactly the API you mean. (`GeometricVector<Storage: SIMD>` rather than `GeometricVector: SIMD`.)
- **A protocol requirement is a customization point** — it's dynamically dispatched, and a conforming type's implementation wins everywhere. **A method only in an extension is statically dispatched**, so a conformer's version _shadows_ rather than overrides it, and code that only knows `any P` calls the extension's. If a type should be able to customize something, make it a requirement.
- **Composition over inheritance.** Class inheritance is monolithic (one superclass), intrusive (you inherit stored properties and initializer complexity), and leaves unwritten contracts about what may be overridden and when to call super. Compose small values instead.
- **A forced downcast is a code smell** — it usually means a type relationship was lost to a class hierarchy or an existential.

### `some` vs `any`

- **Write `some P` by default. Change to `any P` when you need to store arbitrary types.** Same discipline as `let` before `var`.
- `some P` — one fixed underlying type per scope. You keep every type relationship, including associated types, and the compiler can specialize.
- `any P` — type-erased box, dynamic type varies at runtime. Needed for heterogeneous collections, for optionality of the underlying type, and to hide the abstraction entirely. You pay for it: associated-type relationships are erased to their upper bounds, and calls are opaque to the optimizer.
- **An existential cannot consume an associated type whose identity has been erased.** A constrained existential can preserve a concrete associated type and allow corresponding calls. When a relationship must remain tied to one underlying type across several operations, pass the existential into a supported generic/`some P` helper; implicit opening preserves that type inside the call, subject to the compiler's opening restrictions.
- **Constrained existentials and opaque types** — `some Collection<Element>`, `any Collection<any Animal>` — let you hide `LazyFilterSequence<[Animal]>` while still exposing the element type. Declare primary associated types on your own protocols (`protocol Container<Item>`) for the type callers actually supply, not for implementation details like `Iterator`.
- **Same-type requirements in `where` clauses** are how you pin down relationships across protocols (`where Self.CropType.FeedType == Self`). Without them, "grow then harvest" doesn't typecheck, and wrong conformances compile.

---

## 8. API design — clarity at the point of use

Clarity at the point of use is the goal that outranks every other one here.

- **No type prefixes in Swift-only APIs.** Modules disambiguate. Keep prefixes only where the API mirrors an Objective-C one. But avoid very general names from specific frameworks — they read badly out of context and force manual disambiguation.
- **Drop leading `get`** from async alternatives and from anything that returns its result directly. `persistentPosts`, not `getPersistentPosts`.
- **Access control is documentation.** `private` restricts access to the enclosing declaration and its same-file extensions; `fileprivate` covers the defining file. `internal` covers the module and is the default; `package`, `public`, and `open` expose progressively different contracts. Be explicit at boundaries where isolation, sendability, subclassing, and API evolution matter.
- **Design the model so illegal states can't be spelled.** Private setters plus a validating mutating method; enums for closed sets; a strongly typed `UUID` instead of a `String`.
- **Property wrappers** factor out an _access policy_ (`@Argument`, `@Published`, defensive copying, lazy, thread-local) so the declaration site states the policy in one word. Combine with `@dynamicMemberLookup` on a key path to project through a wrapper (that's how `$binding.title` works).
- **Result builders** for declarative DSLs. **Macros** when the boilerplate is code the compiler could have written (§12).

---

## 9. Performance — measure, then choose

Low-level Swift performance is dominated by four costs. Know which one you're paying.

1. **Function calls** — argument copies, static vs dynamic dispatch, call-frame allocation, and blocked optimization.
2. **Memory layout** — inline vs out-of-line storage; dynamically sized types.
3. **Allocation** — global (free), stack (cheap: one subtraction), heap (expensive: search plus locking).
4. **Copies** — retains/releases and recursive struct copies.

**But do the algorithmic work first.** Every time you write a loop, try replacing it with a call to an algorithm. The largest wins are almost never micro-optimizations:

- **Know the complexity of what you call.** `Array.remove(at:)` is O(n); calling it in a loop is O(n²). `removeAll(where:)` is O(n) total. Building a `Data` by re-slicing per byte is O(n²); `popFirst()` is O(1).
- **Chained `map`/`flatMap`/`filter` allocate an array per stage.** Elegant ≠ fast. If a pipeline runs per-pixel or per-element in a hot loop, size the output once and write into it.
- **Then profile.** Instruments' Time Profiler and Allocations, run against a _test_ (secondary-click the test's run button → Profile) so you're measuring exactly the code you care about. `platform_memmove` dominating a flame graph means accidental copying; a million transient allocations means intermediate arrays; `swift_beginAccess` means runtime exclusivity checks; `swift_retain`/`swift_release` means reference-counting traffic.

**Concrete levers, roughly in order of what they buy:**

- **`final` on classes you don't intend to subclass** turns dynamic dispatch static and unlocks inlining. Whole-module optimization lets the compiler prove this for you in many cases — and enables generic specialization, which is where generics stop costing anything.
- **Struct storage is inline; class storage is out-of-line.** Small structs are free; a large struct with three reference-typed fields costs three retains _per copy_, versus one for a class. If you copy it a lot, use copy-on-write.
- **An `any P` existential has a 3-word inline buffer.** Values that fit live inline; larger ones get heap-allocated per copy. Same technique applies: give the large type indirect storage with copy-on-write and it fits in the buffer again.
- **Homogeneous `[MyModel]` beats `[any Model]`** — densely packed, type info passed once, specializable. `[any Model]` is the flexible-but-opaque option; take it when you need it.
- **Constraining a generic parameter to a class** (`T: AnyObject`) gives the compiler a known representation even without specialization.
- **`InlineArray<N, T>`** (Swift 6.2) for fixed-size storage: elements stored inline, size in the type via value generics, no heap allocation, no reference counting, no uniqueness or exclusivity checks. Wrong choice if it gets copied or shared.
- **`Span` / `RawSpan` / `OutputSpan`** (Swift 6.2) replace `withUnsafeBufferPointer` for direct access to contiguous storage. They're non-escapable, so the compiler ties their lifetime to the container — you get pointer performance with no lifetime bugs, and the retains/releases disappear.
- **Moving stored properties out of a nested class into the parent struct** removes runtime exclusivity checks.
- When supported by the actual toolchain and justified by measurement: `@inline(always)` (pair with `final` on methods) and `@specialized(where T == ...)` (SE-0460) to pre-specialize a generic for hot concrete types.
- Other APIs in the upstream's Swift 6.4-labelled notes include `borrow`/`mutate` accessors, `UniqueArray`/`UniqueBox`, and `Ref`/`MutableRef`. Verify actual syntax and availability before using or planning a dependency on them; the label is not a shipping guarantee.

**Async functions** keep their state on a per-task slab allocator rather than the C stack, and split into partial functions at each suspension point. The cost profile is similar to sync functions with slightly higher call overhead — which is another reason not to make something `async` that has nothing to await.

**Actor hops can incur executor scheduling and sometimes a thread switch; they are not guaranteed OS context switches.** Batch related work where semantics allow: pass arrays into `loadArticles`/`updateUI` rather than needlessly crossing actor boundaries twice per iteration. Measure the actual cost.

---

## 10. ARC and object lifetime

- **An object's guaranteed lifetime ends at its last use, not at the closing brace.** Observed lifetimes are an emergent property of the optimizer and _will_ change. Code that depends on when a `deinit` runs is a latent bug.
- **Use `weak` for references that may legitimately disappear, and `unowned` only when a lifetime invariant guarantees validity.** Both can break cycles, but weak references also suit non-owning observers/delegates. If an operation requires the object to stay alive, establish a strong owner for that operation; neither silently skipping required work nor force-unwrapping a legitimately absent weak reference repairs missing ownership.
- **Better than `weak`: don't build the cycle.** Factor the shared data into a third type both sides reference, turning the cycle into a tree.
- **Next best: redesign the API** so the object is only reachable through a strong reference. `withExtendedLifetime` works but shifts correctness onto you and spreads through a codebase — treat it as a patch, not a design.
- **Keep `deinit` cleanup local.** Release owned resources there when appropriate, but do not rely on exact destruction timing for business operations, global metrics, or required user-visible effects. Give those operations an explicit completion/close path; `defer` can scope cleanup at a call site.
- Xcode's **Optimize Object Lifetimes** build setting shortens observed lifetimes toward the guaranteed minimum, and will surface exactly these bugs.

---

## 11. Testing — Swift Testing by default

Use **Swift Testing** for new tests. XCTest remains required for exactly three things: UI automation (`XCUIApplication`), performance metrics (`XCTMetric`), and tests that must be written in Objective-C or that catch Objective-C exceptions.

- **`@Test` on any function** — global, static, or instance; `async`, `throws`, and global-actor-isolated all work.
- **`#expect(...)` takes ordinary expressions.** No family of `XCTAssertEqual`-style functions to memorize — `#expect(a == b)`, `#expect(list.isEmpty)`, `#expect(!x.contains(y))` all capture and display subexpression values on failure.
- **`try #require(...)`** to stop the test on failure, and to unwrap an optional safely. This replaces `continueAfterFailure = false` and lets you choose per-expectation.
- **Suites are `struct`s.** A fresh instance is created per test function, so state can't leak between tests. Use `init` for setup; only use a `class`/`actor` when you need `deinit` for teardown. Nest suites to group.
- **Parameterize instead of copy-pasting or looping.** `@Test(arguments: [...])` runs each case independently, in parallel, individually re-runnable, with the failing argument named in the results. Two argument collections produce the full cross product — use `zip()` when you want matched pairs instead.
- **Traits carry intent:** `.enabled(if:)` / `.disabled("reason")` for conditions (never comment a test out — a disabled test still compiles), `.bug(url)` for tracking, `.tags(...)` to relate tests across files and targets, `.timeLimit`, `.serialized` when a test genuinely can't run in parallel. Use `@available` rather than a runtime `#available` check so the testing library knows.
- **`withKnownIssue { }`** for a test failing on something outside your control — it keeps compiling and running and tells you when the issue is fixed, unlike `.disabled`.
- **`confirmation`** for callbacks that fire N times; `withCheckedContinuation` for one-shot callbacks with no async overload.
- **Tests run in parallel by default, in randomized order.** That's a feature: it surfaces hidden inter-test dependencies. Refactor rather than reaching for `.serialized`.
- **Exit tests** — `#expect(processExitsWith: .failure) { ... }` — cover `precondition`/`fatalError` paths in an isolated child process. macOS, Linux, FreeBSD, Windows only.
- Migrating: both frameworks coexist in one target, so migrate incrementally and write new tests in Swift Testing today. **Test framework interoperability** (swift-testing ST-0021; check your Xcode version for availability) lets helpers that wrap `XCTFail` be called from Swift Testing tests and vice versa; set the mode to **complete** or **strict** (not **limited**, and never **none**) so cross-framework issues stay errors and point you at the `Issue.record` replacement.

---

## 12. Macros

Reach for a macro when you're writing code the compiler could derive — and only then.

- **Macros are type-checked before expansion.** Arguments are checked against the macro's declared signature, so misuse is a clean error at the call site, not a mess inside generated code.
- **Freestanding (`#foo`)** macros produce expressions or declarations. **Attached (`@Foo`)** macros use roles such as member, peer, accessor, member-attribute, and extension; extension macros can add conformances. [SE-0402](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0402-extension-macros.md) replaced the earlier conformance role. Roles compose — for example, `@Observable` uses member, member-attribute, and extension roles.
- **Test macros as pure syntax-tree transforms** with `assertMacroExpansion`. It's the fastest loop, and it's how you avoid bugs in code nobody reads. Set a breakpoint in `expansion` and `po` the syntax node to learn its shape.
- **Emit real diagnostics when the macro doesn't apply.** Throw an error, or use `context.addDiagnostic` for warnings and fix-its at a specific location. Never let a macro silently generate code that won't compile.
- Expanded code is ordinary Swift: inspectable ("Expand Macro"), debuggable, steppable.

---

## 13. Logging and debugging

- **`Logger` from `os`, not `print`.** Create one per subsystem and category. Messages are stored in an optimized form and only rendered when displayed, so logging is cheap enough to leave in.
- **Non-numeric interpolations are redacted by default.** Opt in per value with `privacy: .public` only for data that is genuinely not personal. Use `.private(mask: .hash)` when you need to correlate values without exposing them.
- **Levels control persistence and cost:** `debug` (never persisted, fastest — the message construction is optimized away entirely when not streaming), `info`, `notice` (default), `error`, `fault` (most persistent, slowest). Log at `error`/`fault` for the things you'll want in a bug report.
- **Log a correlation ID** (a task or request UUID) and you can filter a whole failure's history out of a device log archive without reproducing it. `log collect --device --start ...`, then filter by subsystem in Console.
- `format:` and `align:` are free — use them so logs are readable and column-selectable.
- LLDB understands Swift tasks: it steps through `await` across threads, `swift task info` shows priority and children, and named tasks show up in both the debugger and Instruments' Swift Concurrency template.

---

## 14. Unsafe code and interop

- **"Unsafe" means the API cannot fully validate its input, so violating its preconditions is undefined behavior** — not that it crashes. Safe APIs _do_ trap deliberately; a clean fatal error is the safe outcome.
- **Prefer `Span` over `Unsafe*Pointer`.** Since Swift 6.2 there is a safe, non-escaping, equally fast way to get at contiguous storage. Reserve raw pointers for C interop.
- If you must use pointers: keep the unsafe region as small as possible, use **buffer** pointers (address + count) rather than bare pointers so bounds are tracked, never let a pointer escape the closure that vends it, and run the **Address Sanitizer**.
- For authorized hardening of security-critical modules, evaluate **strict memory safety** with the actual toolchain and project constraints. Check support for any per-declaration `@diagnose` configuration rather than assuming a version label makes it available.
- **Interop is bidirectional and incremental.** C, Objective-C, and C++ integration depends on the toolchain, platform, and enabled interop mode. Verify support before using `@c`, `@implementation`, or imported C++ APIs. Adopt Swift one file at a time within the requested migration scope; don't rewrite.

---

## 15. Modern syntax you should be using

Agents routinely write the older, longer form of all of these.

**Treat this table as a feature lookup, not an automatic modernization checklist.** The version column records upstream labels that have not been comprehensively revalidated. ⚠ marks entries the source treated as forthcoming; neither that marker nor its absence establishes current release or deployment availability. Verify the relevant compiler, SDK, package version, feature flags, and target support before using a row. Keep existing supported code unless modernization is within the requested scope.

| Instead of                                                            | Write                                                                                                    | Upstream version label (verify) |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ----- |
| Nested ternaries; an immediately-called closure to initialize a `let` | `if`/`switch` **expressions**                                                                            | 5.9   |
| Overloads for 1, 2, 3… arguments                                      | **parameter packs** (`each T`), and `for` over a pack                                                    | 5.9   |
| `ObservableObject` + `@Published` on every property                   | **`@Observable`**                                                                                        | 5.9   |
| Polling an object for changes                                         | **`Observations { ... }`** — an `AsyncSequence` of transactional updates                                 | 6.2   |
| `NotificationCenter` with stringly-typed `userInfo`                   | concrete notification types (`MainActorMessage` / `AsyncMessage`)                                        | 6.2   |
| `Process` + pipes for scripting                                       | the **Subprocess** package (verify the selected package version and its streaming APIs)                    | 6.2+  |
| Hand-rolled string index math                                         | **Swift Regex** — literals for brevity, `RegexBuilder` for structure                                     | 5.7   |
| `[String]` of fixed size in a hot path                                | **`InlineArray<N, T>`**                                                                                  | 6.2   |
| `withUnsafeBufferPointer`                                             | **`.span`** / **`.bytes`** (`RawSpan`) / `OutputSpan`                                                    | 6.2   |
| Manual `Task.isCancelled` juggling to finish a write                  | `Task` **cancellation shield** (SE-0504)                                                                 | 6.4 ⚠ |
| Rebuilding a dictionary by hand to use the key                        | **`mapKeyedValues`**                                                                                     | 6.4 ⚠ |
| `@available(iOS ..., macOS ..., tvOS ..., watchOS ..., visionOS ...)` | **`@available(anyAppleOS ...)`**                                                                         | 6.4 ⚠ |
| `Rocket.SaturnV` when a type shadows a module                         | **module selector** `Rocket::SaturnV`                                                                    | 6.3   |
| Blanket "warnings as errors"                                          | **`@diagnose`** per declaration / warning group                                                          | 6.4 ⚠ |
| `@unchecked Sendable` because of a `weak var`                         | `weak let`; or state non-sendability with **`~Sendable`**                                                | 6.4 ⚠ |
| Manually parsing binary formats with pointers                         | **Swift Binary Parsing** (`ParserSpan`, overflow-checked parsing initializers)                           | 6.2   |
| Awkward test function names                                           | **raw identifiers**: `` @Test func `fruits have a tropical climate`() ``                                 | 6.0   |

Also worth knowing: **Swift Regex parsers compose with Foundation's real parsers** (`.date(...)`, `.currency(...)`) — never hand-roll date or number parsing inside a regex. Make the locale explicit rather than inheriting the system's. And use `NegativeLookahead` or `Local` (atomic groups) to stop a pattern backtracking across a whole input.

---

## 16. Migrating an existing codebase to Swift 6

The order matters, and mixing steps is how migrations stall.

1. **Build with the new compiler first.** Source compatibility means this should just work, in Swift 5 mode.
2. **Per target, enable complete concurrency checking** (Swift 5 mode + all Swift 6 warnings). Start with the **UI/app layer**, not the frameworks below it — much of it is already main-actor-annotated by the SDK, so the fix rate is high.
3. **Fix the warnings, cheapest first.** Expect hundreds of warnings from a handful of root causes: `var` globals that should be `let`, free functions that belong on `@MainActor`, one public struct that needs `: Sendable`. A single line can clear dozens.
4. **Flip the target to the Swift 6 language mode** to lock the work in.
5. **Move to the next target and repeat.**
6. **Refactor afterwards, separately.** Never combine a significant refactor with enabling data-race safety — you'll have to back out both.

Within an authorized migration, evaluate **Approachable Concurrency** and default actor isolation per target instead of requiring either setting before work can begin. Preserve the project's agreed checking and compatibility requirements; confirm available migration tooling against the actual Xcode/toolchain rather than assuming it will apply every change automatically.

---

## Quick Reference

| Need                               | Reach for                       | Not                                       |
| ---------------------------------- | ------------------------------- | ----------------------------------------- |
| A data type                        | `struct` / `enum`               | `class` without identity or sharing       |
| Shared mutable state               | `actor`, or `@MainActor` class  | `class` + a lock you must remember        |
| Move work off the main thread      | `@concurrent func … async`      | `Task.detached`, `DispatchQueue.global()` |
| A library API's isolation          | its documented client/state contract | an automatic `MainActor`/`nonisolated` choice |
| Fixed number of parallel jobs      | `async let`                     | N unstructured `Task`s                    |
| Dynamic number of parallel jobs    | `withTaskGroup` (bounded)       | one task per element, unbounded           |
| Children that return nothing       | `withDiscardingTaskGroup`       | `withTaskGroup` you never drain           |
| Work tied to a UI event            | `Task { }` inside the callback  | making the callback `async`               |
| Fixing a data race                 | stop sharing the object         | `@unchecked Sendable`                     |
| A shared model class               | non-`Sendable`, or `@MainActor` | `Sendable` + manual locking               |
| Blocking primitive across `await`  | nothing — restructure           | `DispatchSemaphore`, `NSCondition`        |
| Polymorphism                       | `some P`                        | `any P` unless you need storage           |
| Heterogeneous collection           | `[any P]`                       | a class hierarchy                         |
| Shared behavior, no customization  | constrained `extension`         | a new protocol                            |
| A customization point              | protocol **requirement**        | a method only in an extension             |
| Breaking a reference cycle         | restructure to a tree           | `weak` + `withExtendedLifetime`           |
| Removing matching elements         | `removeAll(where:)` — O(n)      | `remove(at:)` in a loop — O(n²)           |
| Direct access to contiguous memory | `.span`                         | `withUnsafeBufferPointer`                 |
| Fixed-size buffer in a hot path    | `InlineArray<N, T>`             | `Array`                                   |
| A new test                         | `@Test` + `#expect`             | `XCTestCase` + `XCTAssertEqual`           |
| The same test over many inputs     | `@Test(arguments:)`             | a `for` loop, or copy-paste               |
| Halting a test on failure          | `try #require`                  | `continueAfterFailure = false`            |
| A temporarily broken test          | `withKnownIssue`                | `.disabled`, or commenting it out         |
| Diagnostics in shipping code       | `Logger` + a correlation ID     | `print`                                   |
| Deciding to optimize               | Instruments on a profiled test  | intuition                                 |

