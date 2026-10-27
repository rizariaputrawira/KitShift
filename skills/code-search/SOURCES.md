# Sources & Provenance: code-search

## Origin
Authored for KitShift to provide fast code search and globbing capabilities for harnesses (such as Antigravity CLI) lacking in-process `grep` and `glob` native tools.

## License
Original KitShift material owned or authorized for licensing by rizariaputrawira is licensed under the [MIT License](../../LICENSE), Copyright (c) 2026 rizariaputrawira. The linked notice contains the full grant and conditions; it does not relicense third-party material. Standalone redistributors must retain the accompanying MIT notice.

## Local correction — 2026-10-26

Corrected ripgrep failure propagation, dash-prefixed patterns, filename decoding, and shared dependency-free glob matching. Moved Antigravity CLI (`agy`) examples into `references/agy-usage.md` and kept native Oh My Pi (`omp`) use in the entrypoint. Documented installed-script resolution and fallback limits; removed unsupported AST/full-parity claims and the self-attribution picker prefix. Independently authored changes; no third-party code or notice changes.

Follow-up review corrections preselect ripgrep inputs with the existing shared glob matcher after ripgrep's hidden/ignore-aware file inventory, bound content-search argument batches, and preserve regex validation for empty selections. The Node fallback no longer searches synthetic lines created by splitting empty or newline-terminated files. Added consumer-level regressions for excluded content exceeding 10 MiB, ignore/path matching, multi-batch results, and actual blank-line behavior. These adaptations are independently authored; no third-party code or notice changes.
