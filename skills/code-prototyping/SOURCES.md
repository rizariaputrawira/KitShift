# Sources and modifications

OMP-native passive adaptation, pinned source revision `5beb35b040e3de97e54fa9e386d7e42d15c295c2`.

| Pinned source | Local mapping | Adaptation |
|---|---|---|
| [mattpocock/skills@5beb35b040e3de97e54fa9e386d7e42d15c295c2: `skills/engineering/prototype/SKILL.md`](https://raw.githubusercontent.com/mattpocock/skills/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/prototype/SKILL.md) | `SKILL.md` | Question-led branch selection and throwaway boundary; explicit scope, native permissions and no implicit branch/commit/tracker/production actions. |
| [mattpocock/skills@5beb35b040e3de97e54fa9e386d7e42d15c295c2: `skills/engineering/prototype/LOGIC.md`](https://raw.githubusercontent.com/mattpocock/skills/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/prototype/LOGIC.md) | `LOGIC.md` | Hypothesis, liftable pure logic, self-contained HTML, domain-language state, free-play and repeatable walkthrough scenarios, evidence and cleanup boundaries. |
| [mattpocock/skills@5beb35b040e3de97e54fa9e386d7e42d15c295c2: `skills/engineering/prototype/UI.md`](https://raw.githubusercontent.com/mattpocock/skills/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/prototype/UI.md) | Canonical owner `../ui-prototyping/SKILL.md`; picker mechanics `../ui-prototyping/PICKER.md` | UI principles route to canonical UI-variation owner, avoiding duplicate procedure. |

## Companion coverage and exclusions

Both `LOGIC.md` and `UI.md` procedures are represented: logic is adapted locally and UI procedure belongs to `ui-prototyping`. UI picker mechanics remain in that owner's `PICKER.md`; no duplicate picker implementation is maintained here. Upstream agent metadata is excluded.

License: [upstream LICENSE](https://raw.githubusercontent.com/mattpocock/skills/5beb35b040e3de97e54fa9e386d7e42d15c295c2/LICENSE) reproduced unmodified as [LICENSE.matt](LICENSE.matt), MIT, Copyright (c) 2026 Matt Pocock.

Native exposure integration keeps this entrypoint model-invokable only for logic/state questions. The shared UI branch remains under explicit-only `ui-prototyping`; this owner cannot be used to auto-activate that hidden capability.
