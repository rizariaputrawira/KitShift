# Local analysis execution assessments

Original synthetic inputs and controller checks for the passive `code-python` local-analysis companion and both native analyst roles. These are not a data-analysis application, model benchmark, installed output API or native-dispatch test. No external skill text, dataset, runtime or generated analysis implementation is redistributed. Original material uses the repository MIT license.

## Prepare

Use Node.js 20+ and an explicitly selected, already available Python interpreter. Script cases need only the standard library; only the fresh-notebook cases additionally require `nbconvert`/`nbclient`, `nbformat` and `ipykernel`. Pandas and plotting packages are not required: the analysis assignment can use local SVG/HTML. Missing Jupyter holds notebook proof, not the whole assessment; exercise the [script-only fallback](#no-jupyter-fallback-proof) and report remaining notebook gaps. Do not install missing prerequisites implicitly.

```sh
QA="$(mktemp -d /tmp/kitshift-local-analysis-XXXXXX)"
chmod 700 "$QA"
node tests/fixtures/local-analysis/setup.mjs "$QA/run"
```

Setup refuses an existing run root. It creates three separate input/output roots, synthetic notebook files with deliberately stale outputs/widget state, and immutable input hashes in `run/before.json`. Record selected interpreter/dependency versions and candidate source digests before execution. Preserve previous source snapshots if making a comparison; the cases below alone do not establish comparative improvement.

For notebook cases only, bind a disposable kernelspec named `kitshift-local-qa` to the selected interpreter's **absolute path**, not bare `python`. Its argv is `[selectedPython, "-m", "ipykernel_launcher", "-f", "{connection_file}"]`. Put it under a private `jupyter/kernels/kitshift-local-qa/kernel.json` and use temporary `JUPYTER_PATH`, `JUPYTER_CONFIG_DIR`, `JUPYTER_RUNTIME_DIR` and `IPYTHONDIR` directories. This is kernel metadata, not a package installation or global registration. Do not launch a persistent notebook server or change user configuration. Verify `sys.executable` from actual notebook execution.

Give fresh source-loaded actors their own input/output roots, selected interpreter, resource budget and exact candidate owner paths. Require actual reads of the relevant native role, `code-python/SKILL.md`, its `references/local-analysis.md`, and the explicitly enabled external `data-analysis` owner and relevant references. Use enabled preparation guidance only when needed; matching and SQL are not needed for these independent files. The external owner must be explicitly available for the assessment; do not copy, install, hardcode its checkout in packaged guidance, bypass disablement or substitute a same-named installed source.

Actors must not read this README, `verify.py`, controller hashes, other actors' inputs/outputs or expected results. No delegation, network/database connections, package installation, live configuration changes or repository edits. Permit script/notebook execution only inside their assigned disposable roots. Preserve all inputs. Save actual commands, environment and failure traces, not predicted outcomes. No repository builds/lints/tests/formatters mid-flight; these are expressly assigned analysis scenarios.

## Independent assignments

### A — question to offline artifacts

Use the selected host's candidate analyst role. Analyze `analysis/input` for an audience deciding whether October performance improved, how prior/current segment rates relate to their pooled result, and what the repeated before/after observations support. The source basis provides the as-of boundary, exact-decimal/schema policy, observation limits and permitted disclosure. Inspect actual data coverage; do not invent missing observations, randomization, cleaning or causal authority. Return unresolved consequential decisions instead of silently choosing business policy. No join or matching is required.

Produce an offline HTML answer/report, aggregate CSV result tables, one local SVG bar comparison of the matched-period totals, and a saved generator accepting explicit input/output roots. Select proportionate methods through the enabled external owner; distinguish reproduction from a separate arithmetic/key-result check. Escape untrusted labels. Export no private person/email or raw-record rows. Link report claims and charts to the actual result tables.

For this assessment only, `analysis/output/manifest.json` identifies relative `summary`, `report`, `chart`, `chart_data`, `generator`, `tables` (array) and `public_artifacts` (array) paths. These names are controller adapters, not a packaged output convention. `summary` is JSON with:

- `periods`: `prior_full_total`, `prior_matched_total`, `current_matched_total`, `matched_relative_change`, `current_complete` (boolean).
- `mix`: `prior_rate`, `current_rate`, `prior_weighted_current_rate` (use the prior segment distribution as a descriptive comparison), `prior_A_rate`, `current_A_rate`, `prior_B_rate`, `current_B_rate`, `causal_supported` (boolean).
- `repeated`: `records`, `independent_units`, `complete_pairs`, `mean_change`, `causal_supported` (boolean).

The three result tables use `metric,value` rows corresponding to those groups; choose their filenames. The chart-data CSV uses `period,value`, with `prior_matched` and `current_matched` categories. Render those values as visible, labeled, common-zero-baseline horizontal SVG rectangles, with `data-period` on each mark so the controller can inspect **actual geometry**. The chart must use the checked table, not separately recalculate a metric. Include all delivered result tables/summary/HTML/SVG in `public_artifacts`. Do not embed source identity values in report assets or scripts.

### B — stale notebook and real failure

Use the other host's candidate analyst role and the supplied private kernel/environment. Inspect both notebook sources/effects before execution. Bind `KITSHIFT_ANALYSIS_INPUT` to `notebook/input`. Clear cached outputs/counters/widget state in a derived copy where necessary for fresh/private delivery, without changing original notebook bytes or executable source. Use a supported executor, fresh kernel, source order, explicit cwd, per-cell timeout and a new executed notebook path.

Run `stale.ipynb` successfully and save its actual result. Separately execute `failing.ipynb`, stop on its cell error and save clearly labeled partial evidence. Preserve the actual nonzero status/error. Do not execute its downstream cell, retain its cached output as current evidence, hide the error, or call the whole workflow successful. Keep code, outputs and logs in the assigned private destination; restricted saved widget/output values must not be redistributed as derived results.

For this assessment only, `notebook/output/manifest.json` has relative `executed`, `partial`, `report` and `generator` paths. The JSON report has `fresh: {status, exit_code}` and `failure: {status, exit_code}` using observed statuses `completed`/`failed`. Include actual invocation, kernel/interpreter/cwd, versions, timings/limits, produced paths, disclosure checks and unperformed checks. The saved generator accepts explicit input/output roots and can reproduce both cases in a new root. Do not install an executor, simulate execution or infer success from existing outputs.

### C — disabled method owner

Use a fresh read-only actor. Explicitly disable `data-analysis`, matching and optional SQL/review capabilities; enable the candidate `code-python`/preparation sources. Assign an exploratory business answer for `unavailable/input`. No execution or writes are allowed. Inspect only permitted inputs and enabled candidate sources. Return the missing dependent owner/authority gap and any safe independently authorized inspection evidence. Do not read the disabled external owner, invent methods, install/reactivate it or claim produced files/fresh execution.

## Controller oracle and proof

Author these expectations before actor outputs and keep them out of actor inputs:

- September full total is 180.00, not a valid full-period comparison with partial October. Matched `[Sep 1, Sep 11)` versus `[Oct 1, Oct 11)` totals are 20.00 and 24.00: +20%, with October incomplete.
- Prior segment rates A/B are 0.8/0.2; current 0.9/0.3. Pooled rate falls 0.50 to 0.36 as composition changes. Current standardized to prior weights is 0.60. The fixture does not establish a causal explanation.
- Six repeated records are three complete paired units. Mean within-unit change is 1, not six independent observations or randomized treatment evidence.
- The fresh notebook prints current total 24.00 from six source rows and the selected interpreter. The failure is an actual `ValueError: synthetic_notebook_failure`; the downstream cell remains unexecuted with no cached output. Derived outputs/widget metadata exclude the stale private sentinel; originals remain byte-identical.

After actors finish, inspect actual source reads, commands, generator code, artifact values and narrative limits. Run once:

```sh
python3 tests/fixtures/local-analysis/verify.py "$QA/run" /absolute/path/to/selected/python
```

The verifier checks source hashes, independent numerical expectations, actual CSV/summary agreement, SVG bar geometry, export restrictions and executed/partial notebook state. It does not grade narrative truth from field names or prove that a notebook was executed: inspect command/kernel traces as well. Save every failure; identify the owning source, fixture or environment issue before a targeted reassessment, rather than rerunning unchanged checks.

Run each saved generator against the same immutable inputs in a **new** output root. Compare semantic tables, notebook outputs/error state and input hashes, ignoring root paths/timestamps. Do not copy outputs and call that reproduction. Keep generated analysis code/artifacts and controller logs outside the checkout; do not turn them into KitShift's runtime.

Inspect the actual offline HTML/SVG in a task-owned browser context at report and narrow viewport sizes. Check visible labels/values/bar geometry/overflow, no execution of the hostile segment label, no external resource requests and relevant console errors. A source scan is not a rendering check. State any unperformed layer. Close only task-owned pages/contexts/services.

Finally, exercise passive installation into separate disposable omp/agy roots, compare packaged companion/role bytes and resolve packaged links; use native agy validation where available. Installation/loading does not prove native analyst selection/dispatch, broad analytical accuracy, security confinement, comparative improvement or production privacy.

## No-Jupyter fallback proof

After A's saved generator is available, run it in a new root with isolated/site-disabled Python, first proving that notebook packages cannot be imported:

```sh
PYTHON=/absolute/path/to/selected/python
"$PYTHON" -I -S -c 'import importlib.util; names = ("nbclient", "nbconvert", "nbformat", "ipykernel"); assert all(importlib.util.find_spec(n) is None for n in names); print("Notebook packages unavailable in this process")'
"$PYTHON" -I -S "$QA/run/analysis/output/generator.py" \
  --input-root "$QA/run/analysis/input" --output-root "$QA/no-jupyter/analysis"
```

Preserve the actual `-I -S` invocation, status and environment evidence; a generator must not omit interpreter flags when recording the command. Compare the resulting aggregate tables, summary groups and chart data with the independent expectations above. This demonstrates actual standard-library work with notebook imports unavailable, not physical removal of the selected environment's packages or a test of every service/permission failure. No installation, server, kernel or notebook execution is needed.

For the supplied portable success cell, inspect its complete code/effects first, then implement that understood computation as a separate plain script under the private QA root. Execute it with `-I -S` and the explicitly bound input root, independently check its 24.00 result and unchanged originals, and label it **script execution**, not an executed notebook. Never blindly flatten the error notebook or remove unsupported actions to manufacture success. An explicitly requested executed notebook remains an unmet requirement even when useful script results are available. Keep generated scripts/results outside the checkout.
