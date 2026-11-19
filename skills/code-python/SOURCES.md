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

## Local analysis execution handoff — 2026-11-18

Added independently authored `references/local-analysis.md` and a conditional entrypoint pointer. The companion owns selected-environment execution, explicit Jupyter-independent script fallback, fresh-kernel notebook proof, prepared-input consumption and inspectable result/chart/report/reproduction artifacts; methods and interpretation remain with an enabled external `data-analysis` owner. The supplied Skillstash owner was inspected for compatibility only; no skill text or references were incorporated, no general license grant was inferred, and no checkout path becomes an installed dependency.

Research-only sources, retrieved 2026-11-18:

- [nbconvert notebook execution](https://nbconvert.readthedocs.io/en/stable/execute_api.html): explicit kernel/cwd, fresh execution, error propagation and retained widget state; the served stable page is not an installed-version pin.
- [Quarto execution](https://quarto.org/docs/projects/code-execution.html): notebook rendering and cached/frozen results do not establish fresh execution.
- [Plotly HTML export](https://plotly.com/python/interactive-html-export/): local self-contained versus external-asset exports; no plotting library or template is bundled.
- [Anthropic exploration](https://github.com/anthropics/knowledge-work-plugins/blob/e91a134584eb798bac7fb0379358006a2b63b965/data/skills/explore-data/SKILL.md) and [K-Dense EDA](https://github.com/K-Dense-AI/scientific-agent-skills/blob/ec59a29a03d5c40f73ab40878df04860bc00e876/skills/exploratory-data-analysis/SKILL.md): workflow comparison only, not copied or adapted expression, dependencies or verified runtime behavior.

Original additions remain under the existing KitShift MIT terms. No generic analysis engine, automatic installation, native tool alias or separate methodology owner was added.

## Bounded local-analysis assessment — 2026-11-18

Original synthetic inputs, setup, an independent artifact verifier and a source-loaded recipe are retained at repository path `tests/fixtures/local-analysis/`. Generated analysis/executor scripts, reports, notebook copies, source digests, traces and screenshots remain private disposable assessment artifacts, not a KitShift processing runtime.

- Three fresh source-loaded actors used the actual candidate role bodies and relevant canonical owners: omp for offline analysis, agy for notebook execution, and a read-only disabled-analysis-owner countercase. The first two read the explicitly supplied external methods owner in place; the countercase did not read it or execute/write anything. These were general-purpose QA actors, not native analyst dispatch. Their host-required verification guidance was also loaded.
- The independent controller passed **82 checks** against actual artifacts: matched first-ten-day totals 20.00/24.00 (+20%) rather than partial/full-month confusion; segment versus pooled rates and prior-weight standardization; six records versus three paired units and descriptive mean change 1; CSV/summary/chart geometry reconciliation; restricted-value checks; fresh notebook state and original hashes.
- The user's existing Python **3.12.15** environment supplied nbconvert **7.17.2**, nbclient **0.11.0**, nbformat **5.11.1** and ipykernel **7.4.0**. A private kernelspec bound that interpreter; supported execution produced total 24.00 and an actual separately assigned `ValueError: synthetic_notebook_failure` with worker exits 0/1. Downstream cached output remained absent and unexecuted; saved widget/private state was removed only from derived copies. No persistent notebook server or package installation was used. Kernel stderr warned about unencrypted TCP transport; no encryption or OS-confinement guarantee is claimed.
- Controller invocations of both saved generators into new roots reproduced five analytical artifact files, all summary groups and both notebook result/error states. Actual interpreter/cwd and executable notebook sources reconciled. All ten input fingerprints stayed unchanged.
- Initial HTML rendering exposed long-command overflow; a follow-up exposed an unbroken interpreter path. Both attempts remain evidence. The controller corrected only the disposable generator's wrapping/chart-scroll presentation, then generated new output. Final isolated offline-browser checks at **1100px** and **390px** showed no page overflow, readable native-size scrollable chart labels, matching visible tables, working keyboard chart scroll and CSV download, no execution of the escaped hostile label, no external requests and no console/page errors. A direct CSV navigation raised Playwright's download-start signal; an actual link/download check replaced that incorrect inspection action.
- On the user's explicit fallback request, the companion was clarified without changing methods ownership. Actual **`-I -S`** runs made all four notebook imports unavailable and still produced matching aggregate tables, summary groups and offline SVG/HTML. A reviewed portable notebook computation ran as a separate script, returned 24.00 and explicitly did not satisfy an executed-notebook requirement. Startup flags, restricted-value checks and unchanged inputs were verified. This exercises site-disabled execution, not physical package removal, every Jupyter service/permission failure, or a new native routing trial.
- Disposable omp/agy installations contained 59 skills and eight/nine agents. Initial omp **18.22.2** passive entrypoint/companion reads succeeded; agy native validation exited 0 with 59 skills, nine agents and only the three existing oversized-skill warnings. Inert MCP path fixtures were not executed; no connectivity/authentication claim follows.

Limits: no baseline actor comparison, generalized analytical accuracy, scale/performance measurement, native analyst selection/dispatch, production privacy or filesystem/network isolation was established. The final browser result includes controller artifact corrections rather than an unassisted actor pass. No live installation, user-setting change, commit or push was performed.

## Optional local Jupyter environment hint — 2026-11-19

At the user's request, recorded `~/apps/jupyter/.venv/bin/python` in the shared execution entrypoint as an optional workstation discovery hint, subordinate to the user- or project-selected environment and subject to availability/package checks. If the hint does not match, the user may optionally supply another Jupyter interpreter path for validation; no replacement path or reply is required. An absent or unsuitable candidate does not require installation or block independently authorized script work. This is independently authored local guidance; existing license notices and third-party source mappings are unchanged.

Verification: `/home/personal/apps/jupyter/.venv/bin/python` was executable and reported Python 3.12.15, nbclient 0.11.0, nbconvert 7.17.2, nbformat 5.11.1 and ipykernel 7.4.0. This metadata check did not execute a notebook or assess agent compliance. No live installation or environment changes.
