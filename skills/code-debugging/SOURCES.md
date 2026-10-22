# Sources and adaptation — diagnosing-bugs

## Immutable adopted sources

- **M** — `https://github.com/mattpocock/skills` at immutable revision `d81f3a183412e71a5b1e84ca21bc1a35eea03a60`; MIT; notice `LICENSE.matt`.
- **S** — `https://github.com/obra/superpowers` at immutable revision `8ca22dba9a94f28898bbce59f2537ff4d87c747d`; MIT; notice `LICENSE.superpowers`.

The files below are authored adaptations, not upstream executable distributions. URLs resolve the exact inspected pin, not main/next. License files retain the full upstream MIT text; no scanner, dependency, script, installer, hook, engine or provider configuration is distributed. `SOURCES.md` itself is an original provenance synthesis for these local files.

|Exact pinned upstream path|Local repository-relative file|Substantive adopted mechanism|Included notice|
|---|---|---|---|
|[`skills/engineering/diagnosing-bugs/SKILL.md`](https://raw.githubusercontent.com/mattpocock/skills/d81f3a183412e71a5b1e84ca21bc1a35eea03a60/skills/engineering/diagnosing-bugs/SKILL.md)|`config/agent/skills/code-debugging/SKILL.md`|Precise red-capable signal, minimization, falsifiable hypotheses, one-variable probes, measured performance and original-path regression proof.|`LICENSE.matt`|
|[`skills/systematic-debugging/root-cause-tracing.md`](https://raw.githubusercontent.com/obra/superpowers/8ca22dba9a94f28898bbce59f2537ff4d87c747d/skills/systematic-debugging/root-cause-tracing.md)|`config/agent/skills/code-debugging/references/root-cause-tracing.md`|Backward causal argument/state tracing through actual callers to the originating invariant, targeted state inspection.|`LICENSE.superpowers`|
|[`skills/systematic-debugging/condition-based-waiting.md`](https://raw.githubusercontent.com/obra/superpowers/8ca22dba9a94f28898bbce59f2537ff4d87c747d/skills/systematic-debugging/condition-based-waiting.md)|`config/agent/skills/code-debugging/references/condition-based-waiting.md`|Fresh observable readiness predicates; bounded diagnostic waits; timing assertions only when elapsed time is contractual.|`LICENSE.superpowers`|
|[`LICENSE`](https://raw.githubusercontent.com/mattpocock/skills/d81f3a183412e71a5b1e84ca21bc1a35eea03a60/LICENSE)|`config/agent/skills/code-debugging/LICENSE.matt`|Full upstream notice, unmodified retrieved text.|`LICENSE.matt`|
|[`LICENSE`](https://raw.githubusercontent.com/obra/superpowers/8ca22dba9a94f28898bbce59f2537ff4d87c747d/LICENSE)|`config/agent/skills/code-debugging/LICENSE.superpowers`|Full upstream notice, unmodified retrieved text.|`LICENSE.superpowers`|

Selective supplement: [`skills/engineering/diagnosing-bugs/SKILL.md` at
`49dd158d1076134a641b33efb035946536778336`](https://raw.githubusercontent.com/mattpocock/skills/49dd158d1076134a641b33efb035946536778336/skills/engineering/diagnosing-bugs/SKILL.md)
→ `config/agent/skills/code-debugging/SKILL.md`, Root correction and evidence:
verify an intentional forced-red mutation against pristine state before trusting
the failure. The complete baseline-to-candidate diff adds precisely this check.
Candidate LICENSE is byte-identical to `LICENSE.matt`; no other candidate
procedure or package refresh is adopted.

## Local modifications and removed incompatibilities

Removed inspiration-only body, confirm-the-user reruns, upstream no-hypotheses-without-runtime ban, forced 3-5 hypotheses, fixed stress/retry rates, bisection/HITL executables, shell pipelines and blanket defense layers. No root-cause claims from plausible source alone, no invented performance metrics. Preserve original-path proof requirement for permanent fixes; source-only inquiry may return labeled hypotheses. Waiting uses project predicates/timeouts, not shipped 10ms/5s helpers.

All procedures obey current higher-priority OMP/user permissions. Their instructions do not create a sandbox, model binding, execution authorization or approval API. References load only for their stated branch; shared owners are linked rather than cloned. Missing material source/evidence remains a gap, not a fabricated pass. These adaptations preserve the approved requested behavior rather than importing upstream engines.

## Evidence limits

Pinned text and full repository LICENSE were retrieved read-only for this adaptation. No target source was executed and no runtime, build, test, lint, format, native discovery or compatibility gate was run while drafting. Source provenance is not behavioral assurance. Historical baseline and later actual verification belong to the integration owner's evidence record.
