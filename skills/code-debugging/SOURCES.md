# Sources and adaptation — diagnosing-bugs

## Immutable adopted sources

- **M** — `https://github.com/mattpocock/skills` at immutable revision `5beb35b040e3de97e54fa9e386d7e42d15c295c2`; MIT; notice `LICENSE.matt`.
- **S** — `https://github.com/obra/superpowers` at immutable revision `8ca22dba9a94f28898bbce59f2537ff4d87c747d`; MIT; notice `LICENSE.superpowers`.

The files below are authored adaptations, not upstream executable distributions. URLs resolve the exact inspected pin, not main/next. License files retain the full upstream MIT text; no scanner, dependency, script, installer, hook, engine or provider configuration is distributed. `SOURCES.md` itself is an original provenance synthesis for these local files.

|Exact pinned upstream path|Local repository-relative file|Substantive adopted mechanism|Included notice|
|---|---|---|---|
|[`skills/engineering/diagnosing-bugs/SKILL.md`](https://raw.githubusercontent.com/mattpocock/skills/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/diagnosing-bugs/SKILL.md)|`skills/code-debugging/SKILL.md`|Red-capable signal, economical boundary selection, causal minimization, falsifiable hypotheses/probes, performance measurement, root-cause correction and evidence-loop closure.|`LICENSE.matt`|
|[`skills/engineering/diagnosing-bugs/scripts/hitl-loop.template.sh`](https://raw.githubusercontent.com/mattpocock/skills/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/diagnosing-bugs/scripts/hitl-loop.template.sh)|Not imported; native evidence-loop equivalent retained in `skills/code-debugging/SKILL.md`.|HITL source inspected but not executed/imported; human observations can be recorded and fed into a discriminating probe without a foreign runner.|`LICENSE.matt`|
|[`LICENSE`](https://raw.githubusercontent.com/mattpocock/skills/5beb35b040e3de97e54fa9e386d7e42d15c295c2/LICENSE)|`skills/code-debugging/LICENSE.matt`|Full upstream notice, unmodified.|`LICENSE.matt`|
|[`skills/systematic-debugging/root-cause-tracing.md`](https://raw.githubusercontent.com/obra/superpowers/8ca22dba9a94f28898bbce59f2537ff4d87c747d/skills/systematic-debugging/root-cause-tracing.md)|`skills/code-debugging/references/root-cause-tracing.md`|Backward causal argument/state tracing through actual callers to the originating invariant, targeted state inspection.|`LICENSE.superpowers`|
|[`skills/systematic-debugging/condition-based-waiting.md`](https://raw.githubusercontent.com/obra/superpowers/8ca22dba9a94f28898bbce59f2537ff4d87c747d/skills/systematic-debugging/condition-based-waiting.md)|`skills/code-debugging/references/condition-based-waiting.md`|Fresh observable readiness predicates; bounded diagnostic waits; timing assertions only when elapsed time is contractual.|`LICENSE.superpowers`|
|[`LICENSE`](https://raw.githubusercontent.com/mattpocock/skills/5beb35b040e3de97e54fa9e386d7e42d15c295c2/LICENSE)|`skills/code-debugging/LICENSE.matt` (already present)|Full upstream notice, unmodified.|`LICENSE.matt`|
|[`LICENSE`](https://raw.githubusercontent.com/obra/superpowers/8ca22dba9a94f28898bbce59f2537ff4d87c747d/LICENSE)|`skills/code-debugging/LICENSE.superpowers` (already present)|Full upstream notice, unmodified.|`LICENSE.superpowers`|

Historical earlier candidate mapping and selective supplement retained as source-history evidence; they are not active inputs to the current pinned mapping above.
Earlier source-revision history is retained only as historical evidence and does not add a second active candidate mapping. `root-cause-tracing.md` and `condition-based-waiting.md` remain Superpowers-derived references owned locally; their provenance remains in existing records.
No upstream companions exist in the selected `diagnosing-bugs` directory besides its `scripts` directory; the `hitl-loop.template.sh` was read and its evidence-loop intent retained natively, with human observation, redaction and user-controlled authentication intact. It was not executed or imported. `agents/openai.yaml` is foreign harness metadata and was excluded.

## Local modifications and removed incompatibilities

Removed inspiration-only body, confirm-the-user reruns, upstream no-hypotheses-without-runtime ban, forced 3-5 hypotheses, fixed stress/retry rates, bisection/HITL executables, shell pipelines and blanket defense layers. No root-cause claims from plausible source alone, no invented performance metrics. Preserve original-path proof requirement for permanent fixes; source-only inquiry may return labeled hypotheses. Waiting uses project predicates/timeouts, not shipped 10ms/5s helpers.
## 2026-10-22 selective adoption

Pinned revision `5beb35b040e3de97e54fa9e386d7e42d15c295c2` replaces the earlier candidate for the current upstream skill mapping above; existing Superpowers references and earlier separately recorded 2024/2025 historical evidence remain unchanged. The HITL template was inspected as source, not executed or imported. Its usable concept—feed human observations into an evidence-driven probe—is retained only in native process terms; no upstream runner is shipped.

Architecture-triggered failure redesign points to `skill://code-architecture` without turning diagnosis into unsolicited redesign.

All procedures obey current higher-priority OMP/user permissions. Their instructions do not create a sandbox, model binding, execution authorization or approval API. References load only for their stated branch; shared owners are linked rather than cloned. Missing material source/evidence remains a gap, not a fabricated pass. These adaptations preserve the approved requested behavior rather than importing upstream engines.

## Evidence limits

Pinned text and full repository LICENSE were retrieved read-only for this adaptation. No target source was executed and no runtime, build, test, lint, format, native discovery or compatibility gate was run while drafting. Source provenance is not behavioral assurance. Historical baseline and later actual verification belong to the integration owner's evidence record.
