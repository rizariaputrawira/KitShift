---
name: workflow-questionnaire
description: "[Matt Pocock] Turn facts or decisions a user lacks into a written questionnaire for an informed recipient."
disable-model-invocation: true
---

# Questionnaire for someone else

Use this when the user lacks information another person can provide. Interview the user about the send, not answers only the recipient knows.

1. **Identify recipient and relationship.** Ask who will answer, their role/expertise, and relationship to the sender. Gather only context needed to set tone and orientation; do not infer their identity or expertise.
2. **Define what must come back.** Ask what facts, decisions, or next actions the sender needs from the recipient. Turn the stated gap into a concrete coverage checklist. Do not ask the user to answer the recipient's knowledge questions.
3. **Establish delivery details only as needed.** Ask about deadline, response effort, and how the answers will be used if not already clear. Avoid fabricating sender, purpose, or recipient context; use a neutral placeholder only when a missing detail can safely be filled by the sender later.
4. **Write the artifact.** Draft a focused discovery questionnaire in Markdown, with purpose, from/to, intended use, concise context, and answer instructions including that partial/uncertain answers are useful. Order single-idea questions by importance; group themes when there are more than a handful. Include answer space under each question, a brief rationale only when needed to avoid misreading, and an open-ended final question.
5. **Save only with authorized scope.** Use an explicitly authorized path or an established repository location the user has authorized. If no writable destination is authorized, return the complete questionnaire in the conversation and state it was not saved. Do not silently write in the current directory, invent a recipient, contact anyone, or publish/send the document.

Completion: every requested fact/decision is covered by a recipient-answerable question, the document explains how answers will be used, and the location or unsaved status is clear.

Provenance and notices: [SOURCES.md](SOURCES.md); complete notice [LICENSE.matt](LICENSE.matt).
