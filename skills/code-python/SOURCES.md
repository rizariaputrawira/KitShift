# Sources & Provenance: code-python

## Origin
Authored for KitShift to provide safe Jupyter notebook cell manipulation and Python execution procedures for harnesses (such as Antigravity CLI) lacking in-process `notebook` and `python` tools.

## License
Original KitShift material owned or authorized for licensing by rizariaputrawira is licensed under the [MIT License](../../LICENSE), Copyright (c) 2026 rizariaputrawira. The linked notice contains the full grant and conditions; it does not relicense third-party material. Standalone redistributors must retain the accompanying MIT notice.

## Local correction — 2026-10-26

Corrected notebook selectors, inserted types, nbformat 4.5 cell IDs, empty/multiline sources, structural checks, and permission-preserving atomic replacement. Moved Antigravity CLI (`agy`) examples into `references/agy-usage.md`, using skill-relative executable resolution and actual Bash newline quoting. Native Oh My Pi (`omp`) usage stays in the entrypoint. Replaced full-schema/REPL-parity guarantees with the actual supported-structure boundary; removed the self-attribution picker prefix. Independently authored changes; no third-party code or notice changes.

Follow-up local correction: notebook mutations reject symlink paths before writing instead of replacing the link during atomic save; read/info retain link-following behavior. Added consumer-level regression coverage for all four mutation commands, preserved link identity and target bytes, and permitted symlink reads. Independently authored changes; no third-party code or notice changes.

## Portable execution procedure — 2026-11-04

Added a host-neutral execution sequence covering requested code/inputs, project interpreter/environment and working directory, authorized native or command execution, and observed results/errors versus unverified source or saved outputs. The agy companion links this shared owner instead of owning interpreter selection. Existing native mappings, metadata, notebook helper code and full license notice are unchanged. Independently authored guidance; no upstream notice or runtime control was imported.
