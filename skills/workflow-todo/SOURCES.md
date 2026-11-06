# Sources & Provenance: workflow-todo

## Origin
Independently authored for KitShift to provide cross-harness task board and todo tracking parity for harnesses (such as Antigravity CLI) lacking a native in-process `todo` tool.

## License
Original KitShift material owned or authorized for licensing by rizariaputrawira is licensed under the [MIT License](../../LICENSE), Copyright (c) 2026 rizariaputrawira. The linked notice contains the full grant and conditions; it does not relicense third-party material. Standalone redistributors must retain the accompanying MIT notice.

## Local correction — 2026-10-26

Rejected malformed/unreadable existing stores instead of silently replacing them. Moved Antigravity CLI (`agy`) command examples into `references/agy-usage.md`; native Oh My Pi (`omp`) usage stays conditional and uses the current tool schema, not CLI subcommands. Examples resolve the installed script from the skill directory while preserving workspace cwd. Removed the self-attribution picker prefix and unsupported full-parity claims. Independently authored changes; no third-party code or notice changes.

Follow-up local correction: `update`/`remove` validate complete positive safe integer IDs before store access, and missing `--evidence` values fail without dropping existing evidence or changing task state. Added consumer-level regression coverage for unchanged store bytes and absent-store preservation. Independently authored changes; no third-party code or notice changes.

## Portable tracking procedure — 2026-11-04

Added a host-neutral operational sequence for complete task/acceptance inventory, preservation of existing state, permitted tracking surfaces, dependent blockers, inspected completion evidence and outstanding-work reporting. An explicit conversational list is the fallback when no board is available; persistence and helper installation are not implicit. Existing native/agy mappings, metadata, helper code and full license notice are unchanged. Independently authored guidance; no keyword, orchestration engine or runtime control was imported.
