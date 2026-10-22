# Provenance evidence classes

Use this reference only from the [content-provenance-audit](../SKILL.md) procedure. It defines distinctions; it does not supply tools or authenticate an artifact.

| Evidence class | What an observation may support | What it does not establish | Report boundary |
|---|---|---|---|
| Stylistic fingerprints | A stated textual pattern or resemblance in the inspected sample | Who wrote it, whether AI was used, or a reliable attribution | Describe the concrete pattern and sample; do not infer author identity. |
| Statistical AI-text indicators | A method's probabilistic classification for the specific input | Reliable authorship, universal detector accuracy, or absence when negative | Name method/version, input scope, known limits and uncertainty; non-native language false positives and distribution shift matter. |
| Token watermarks | A compatible method may find evidence consistent with a particular token-watermark scheme | Universal AI origin, identity, or absence of watermark when a compatible verifier is unavailable | Scheme-specific only; say which verifier/input was used, or explicitly “not inspected.” |
| Image/audio watermarks | A compatible scheme-specific method may report a signal in a supported media input | Universal provenance or signal absence across transformations/formats | Record format, method and limits; visual/listening inspection is not raw signal verification. |
| C2PA manifests | Parsed manifest structure, signature validity, content binding and stated assertions may be separately observed | Truth of assertions, identity beyond the verification trust basis, or absent provenance from missing/unreadable manifests | Report each dimension separately: signature, binding, trust evaluation and assertion truth are not interchangeable. Without a compatible verifier, do not claim cryptographic validity. |
| Ordinary metadata | Values exposed by the actual format-aware inspection | Originality, truthful authorship or tamper evidence; fields are mutable | Name exact field and input. An extracted view may omit container metadata. |
| Invisible Unicode/formatting | Exact code points or formatting marks only when the method exposes them | Malice, deception, or an origin claim | Identify code point/position and context; multilingual text has legitimate uses. Do not normalize or strip. |

## Result vocabulary

- **Verified observation:** The reported field, byte/code point, or method output was directly observed in the stated inspected input. This describes the observation, not the truth of embedded claims.
- **Probabilistic indicator:** A method or pattern suggests a possibility but cannot establish it. Give the method, scope and uncertainty.
- **Not supported by this inspection:** The chosen method did not produce evidence for the stated claim. This is not evidence of absence.
- **Not inspected:** The relevant method, format layer or input was not examined.
- **Unknown:** Available information cannot determine the claim or its interpretation.

Always identify exact inputs and comparison basis. Extraction, conversion, rendering and copy/paste may lose metadata, raw bytes, code points or structure; report only the view actually inspected.
