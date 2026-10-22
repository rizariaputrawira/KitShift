---
name: workflow-wizard
description: "[Matt Pocock] Create a reviewed interactive shell wizard for steps only a human can perform."
---

# Human-task wizard

Use for tedious manual actions the agent cannot perform itself (third-party dashboards, credential provisioning, CI secret setup, one-off cutover). First establish current/target state, necessary human steps, values captured, destinations and sensitivity from authorized repository evidence and current primary documentation. Never enumerate or read `.env` files, discover ambient credentials, or infer secret destinations such as repository CI settings. Do not delegate agent-performable steps to the human. Present ordered stages and outputs for review; explicit request authorizes only scoped creation, and material uncertainty or irreversible effects need resolution.

Map each stage to precise verified instructions and URL/source. Never invent changing UI paths. Mark uncertainty explicitly. Author a usable Bash script at the authorized location, with stage progress, explicit human confirmations, safe interruption/resume behavior, strict error handling and honest final status. Ask for secrets with hidden input; never echo, log, include in command arguments, or persist unless the user explicitly authorizes a specific destination. Never read or auto-upsert `.env`, write through symlinks, or infer ambient GitHub/CI secret destinations. Preview and obtain consent before writes, external commands, or irreversible actions. Explain every external command and gate it at runtime. Avoid secret temp files/history; disable xtrace. On failure stop safely and report completed/remaining stages without claiming rollback.
Use the local [shell wizard template](template.sh) as a design reference, not an assumed framework or executable dependency. Review its complete behavior and adapt it to native consent, secret and resumability requirements. Never run a generated wizard end-to-end; statically inspect for quoting, data flow, destinations, failure behavior and user prompts. Report exact path, prerequisites, uncertain manual steps, commands not run and how the human can resume.
