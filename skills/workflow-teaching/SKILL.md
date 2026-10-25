---
name: workflow-teaching
description: "[Matt Pocock] Teach a user a topic through mission-grounded, multi-session lessons and persistent learning records."
disable-model-invocation: true
---

# Teaching Workspace
Teach in the user's current authorized workspace, across sessions, without assuming that a directory is dedicated or writable. First establish the intended learning topic and concrete reason for learning it. If the mission is unclear, ask a concise question before creating or changing workspace files. Do not alter global guidance, agent configuration, or other project settings to persist teaching preferences.

## Workspace contracts

The names below are defaults for a newly selected dedicated teaching workspace, not a migration mandate. In an existing repository, reuse its canonical mission, glossary, source, lesson and learning-record owners; for adopted documentation resolve their actual locations through [docs-engineering locations](../docs-engineering/references/locations.md). Do not create a competing glossary or relocate files implicitly. Use only artifacts relevant to the user's authorized teaching scope:

- `MISSION.md` records the user's reason, observable success, constraints, and explicit out-of-scope topics. Ask before changing an established mission; record an agreed change with a learning record.
- `RESOURCES.md` tracks trusted knowledge sources and useful communities, with a note on when each applies and explicit gaps. Prefer primary sources, recognized experts, peer-reviewed work, and well-moderated communities. Do not present model memory as researched fact.
- `GLOSSARY.md` is the workspace's canonical language. Add terms only after the user demonstrates understanding; define tightly, resolve ambiguity, and revise stale definitions. Use `GLOSSARY-MAP.md` to find the right glossary in multi-domain repositories when present.
- `lessons/` contains short, self-contained lessons tied to the mission. Use sequential `0001-<slug>.html` names, selecting the next unused number. Include a primary source, links to relevant workspace references and lessons, and an invitation to ask follow-up questions. Build on existing reusable assets where present; don't add a component merely for hypothetical reuse.
- `NOTES.md` may capture preferences only in an explicitly selected teaching workspace and when authorized; never persist them into global guidance or agent configuration.
- `learning-records/` stores decision-grade learning, not session logs. Create a `0001-<slug>.md` sequential record when the user demonstrates non-trivial understanding, discloses prior knowledge and its depth, corrects a misconception, or agrees to a mission shift. Coverage alone is not evidence of learning. Supersede contradicted learning records rather than erasing the learning history.

Consult the format companion files in this skill directory before creating their corresponding durable files: [MISSION-FORMAT.md](MISSION-FORMAT.md), [RESOURCES-FORMAT.md](RESOURCES-FORMAT.md), [GLOSSARY-FORMAT.md](GLOSSARY-FORMAT.md), and [LEARNING-RECORD-FORMAT.md](LEARNING-RECORD-FORMAT.md). Their formats are templates, not authority to write without user permission.

## Teaching sequence

1. **Orient:** establish topic, mission, constraints, and the user's requested learning outcome. Read existing mission, glossary/map, resources, prior records, lessons, and assets as relevant. Finish when known learning and unknowns are distinguished.
2. **Ground:** identify what knowledge or skill the outcome requires. If resources are missing or weak, locate trustworthy sources before teaching factual claims; annotate useful sources and expose gaps. For wisdom that requires real-world practice, offer relevant communities without overriding a user's preference not to join one.
3. **Choose the next lesson:** if the user named a topic, teach that. Otherwise use the mission and demonstrated prior learning to choose a next step that is challenging but attainable. Keep knowledge explanations easy to follow; use retrieval practice and tight feedback loops for skill acquisition. Use spacing and interleaving where they genuinely fit.
4. **Teach and practice:** make one short lesson with a tangible outcome, relevant examples, and an exercise or feedback loop where appropriate. Keep terminology consistent with the glossary. Do not claim mastery from exposure; respond to the user's work and correct misunderstandings clearly.
5. **Preserve learning:** update only authorized workspace artifacts. Record learning only when evidence meets the record criteria; add a glossary term only after demonstrated understanding. Report the lesson and durable changes with paths, and state what remains uncertain.

A lesson is complete when it serves the mission, teaches one bounded outcome, is grounded in trustworthy sources for factual claims, and provides an understandable next action or practice. If the user asks only for an explanation without a persistent workspace, teach in the conversation and do not manufacture workspace files.

Provenance and notices: [SOURCES.md](SOURCES.md); full notice [LICENSE.matt](LICENSE.matt).
