# HTML architecture report

Load only when a visual report is requested or selected as useful. Keep repository facts evidence-linked and the report static and self-contained. Write only to an appropriate temporary location unless repository output was requested; follow current native file/browser capabilities rather than assuming shell openers or external tooling.

Each candidate card should give a short deepening title, recommendation confidence, dependency category, inspected paths, one-sentence friction and proposed change, expected locality/leverage/test benefits, and an accessible before/after schematic. Show current and proposed module/interface/seam relationships without presenting a guess as observed topology. Identify a relevant decision conflict only when actual friction warrants reopening it. End with the strongest candidate and reason.

Use semantic headings, sufficient contrast, readable text, and text labels/alt descriptions so diagrams are not the sole carrier of meaning. Prefer inline CSS/SVG or text diagrams; no CDN or external scripts, no unnecessary interaction, and no user data in remote assets. Escape untrusted source text and do not execute or embed source-derived scripts. Concise evidence is more valuable than decorative visual density. HTML is optional: if native constraints or value do not warrant it, report candidates inline.
