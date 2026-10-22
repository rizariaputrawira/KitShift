# Sources and provenance

OMP-native adaptation of pinned Matt Pocock wizard guidance. `template.sh` is a locally rewritten helper reference informed by the pinned source; no upstream executable entrypoint, credential-write library, or task stages are retained.

| Pinned source | Local files | Adopted / divergence |
|---|---|---|
| [mattpocock/skills@5beb35b: `skills/engineering/wizard/SKILL.md`](https://raw.githubusercontent.com/mattpocock/skills/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/wizard/SKILL.md) | `SKILL.md`, `template.sh` | Scope human-only tasks, verify journeys, author and statically review an interactive script. Replaced foreign framework assumptions with explicit consent, secret safety, resumability and honest failure. |
| [mattpocock/skills@5beb35b: `skills/engineering/wizard/template.sh`](https://raw.githubusercontent.com/mattpocock/skills/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/wizard/template.sh) | `template.sh` | Rewritten stage/confirmation/hidden-input/URL helper design and generated-script safeguards. Secret input uses a fixed output variable, rejects shell tracing, clears a failed capture, and has an explicit clearing helper. The upstream template was inspected but not executed or imported wholesale. |

Exact MIT notice reproduced unchanged in `LICENSE.matt`. Template is inert until user-specific stages are authored and authorized; it does not grant command or external-write permission.
