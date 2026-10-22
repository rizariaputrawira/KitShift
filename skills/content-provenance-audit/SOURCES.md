# Source and provenance record

## Independently authored OMP procedure

- **Source identity:** Local OMP capability `content-provenance-audit`; no external skill text, template, examples or implementation is incorporated.
- **Source pins and license:** Not applicable. Original locally authored expression; no third-party license is asserted or required for this content.
- **Actual use:** The canonical entrypoint is loaded for authorized, read-only artifact provenance inspection or comparison. It distinguishes evidence classes and inspection limits; it does not execute content, verify authorship or modify artifacts.
- **Local consumers:** `config/agent/AGENTS.md` conditional skill selection; `config/files.tsv` deployment; `SKILL-USAGE.md`, `docs/capability-inventory.md`, `docs/capabilities.md`, `config/SKILL-SOURCES.md` catalog and provenance.
- **Intentional divergence:** Distinct from external skill/dependency intake and code-security review because its evidence contract concerns claims about artifacts. No detector, parser, verifier, processor, dependency or executable is bundled or promised. Research sources informed boundaries only; no external expression or implementation is copied.

## Technical references used as research, not runtime dependencies

These sources support bounded conceptual distinctions only; they do not imply that a corresponding tool is installed or that the skill has performed the method.

- Liang et al., *GPT detectors are biased against non-native English writers* (2023), https://arxiv.org/abs/2304.02819v3 — detector limitations in the reported experiments, not universal accuracy claims.
- *Can AI-Generated Text be Reliably Detected?* (Findings of EMNLP 2023), https://aclanthology.org/2023.findings-emnlp.318/ — detector generalization limits.
- DetectGPT (2023), https://arxiv.org/abs/2301.11305v2 — a distinct statistical detection proposal, not reliable authorship proof.
- Kirchenbauer et al., text watermarking (2023), https://arxiv.org/abs/2301.10226v4 — token watermarking is distinct from stylistic/statistical detection.
- Google DeepMind, SynthID text/video overview, https://deepmind.google/blog/watermarking-ai-generated-text-and-video-with-synthid/ — vendor-specific scheme and limits, not a universal detector.
- C2PA Specification 2.4, https://spec.c2pa.org/specifications/specifications/2.4/specs/C2PA_Specification.html — manifests, signatures, bindings and assertions are distinct; no verifier is included.
- Unicode Technical Report #36, https://www.unicode.org/reports/tr36/tr36-9.html — security considerations, not a current property database or basis to treat all invisible characters as malicious.
- Microsoft Open XML custom properties, https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.customproperties.properties?view=openxml-3.0.1, and Adobe XMP overview, https://opensource.adobe.com/dc-acrobat-sdk-docs/library/overview/Overview_Metadata.html — metadata concepts; no OOXML/XMP parser is included.

**Reference provenance detail:** these citations are research-only inputs consumed by this local package, not payloads or runtime dependencies. Immutable/versioned identifiers are the arXiv versions shown above; the EMNLP Findings paper at its cited proceedings identifier; C2PA Specification 2.4; Unicode TR36 revision 9; and Microsoft Open XML API view 3.0.1. DeepMind's blog and Adobe's overview are cited by URL with no immutable revision established. No source license/notice text was inspected or copied for these technical references; license status is not asserted. No local third-party consumer exists beyond this reference-only procedure. No referenced verifier/parser/detector is bundled, called, or claimed available. These sources informed evidence-class boundaries only; local wording and taxonomy are independently written.
