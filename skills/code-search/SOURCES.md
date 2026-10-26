# Sources & Provenance: code-search

## Origin
Authored for KitShift to provide fast code search and globbing capabilities for harnesses (such as Antigravity CLI) lacking in-process `grep` and `glob` native tools.

## License
MIT License. Part of KitShift portable coding-agent kit.

## Local correction — 2026-10-26

Corrected ripgrep failure propagation, dash-prefixed patterns, filename decoding, and shared dependency-free glob matching. Moved Antigravity CLI (`agy`) examples into `references/agy-usage.md` and kept native Oh My Pi (`omp`) use in the entrypoint. Documented installed-script resolution and fallback limits; removed unsupported AST/full-parity claims and the self-attribution picker prefix. Independently authored changes; no third-party code or notice changes.
