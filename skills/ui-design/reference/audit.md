<!-- Local correction: keep optional detector execution and evidence-scoped scoring consistent with the native workflow. -->
Run systematic **technical** quality assessment and return the requested report. Follow [Workflow and authority](../SKILL.md#workflow-and-authority): audit is read-only unless the current request separately covers fixes or persistence. No mandatory setup, actors, helper state, detector attempt or launcher bootstrap.

Check measurable implementation evidence, not only aesthetics. Distinguish source inference from exercised behavior and record unmeasured dimensions instead of inventing scores.

Use [browser interaction guidance](../../ui-browser/SKILL.md) when a specific permitted check needs rendered, responsive or interactive evidence. Browser/server/device execution, dependency installation and helper runtime effects require current authority; unavailable or out-of-scope tooling is an evidence limit, not a failed audit. Source review can stand alone.

**Web only.** Native platforms (`ios` / `android` / `adaptive`) route to [audit.native.md](audit.native.md) instead; if the project is native, switch to it now.

## Diagnostic Scan

Assess the five dimensions below where applicable. Score only dimensions supported by sufficient evidence; use `n/a` with a reason for unassessed or inapplicable dimensions, and total over four times the number scored. These heuristic scores are not accessibility, performance or compliance certifications.

### 1. Accessibility (A11y)

**Check for**:
- **Contrast issues**: Apply the actual criterion: WCAG AA normal text needs 4.5:1; large text (18pt regular or 14pt bold) needs 3:1. AAA targets and non-text/focus criteria are separate; honor applicable exceptions.
- **Motion sensitivity**: `prefers-reduced-motion` needs an intentional alternative that preserves state change and hierarchy; flag a global `0.01ms` kill that destroys useful feedback, flashing above threshold, and motion that blocks focus, reading, or task completion
- **Missing ARIA**: Interactive elements without proper roles, labels, or states
- **Keyboard navigation**: Missing focus indicators, illogical tab order, keyboard traps
- **Semantic HTML**: Improper heading hierarchy, missing landmarks, divs instead of buttons
- **Alt text**: Missing or poor image descriptions
- **Form issues**: Inputs without labels, poor error messaging, missing required indicators

**Score 0-4**: 0=Primary tasks inaccessible, 1=Major labeling or keyboard barriers, 2=Partial (significant gaps), 3=Good (minor scoped findings), 4=No material accessibility findings in the inspected applicable scope. A score is not a WCAG conformance claim.

### 2. Performance

**Check for**:
- **Layout thrashing**: Reading/writing layout properties in loops
- **Expensive animations**: Casual layout-property animation, unbounded blur/filter/shadow effects, or effects that visibly drop frames
- **Missing optimization**: Images without lazy loading, unoptimized assets
- **will-change overuse**: `will-change` applied broadly or left on at rest (it is a targeted hint for known expensive animations, not a baseline requirement)
- **Bundle size**: Unnecessary imports, unused dependencies
- **Render performance**: Unnecessary re-renders, missing memoization

**Score 0-4**: 0=Severe issues (layout thrash, unoptimized everything), 1=Major problems (no lazy loading, expensive animations), 2=Partial (some optimization, gaps remain), 3=Good (mostly optimized, minor improvements possible), 4=Excellent (fast, lean, well-optimized)

### 3. Theming

**Check for**:
- **Hard-coded colors**: Colors not using design tokens
- **Broken supported themes**: Missing states or poor contrast in a theme the product actually supports; an intentional single-theme interface is not a defect
- **Inconsistent tokens**: Using wrong tokens, mixing token types
- **Theme switching issues**: Values that don't update on theme change

**Score 0-4**: 0=Systemic color-role failures, 1=Major inconsistency, 2=Partial (roles exist but drift), 3=Good (minor issues), 4=Coherent color roles and working supported themes

### 4. Responsive Design

**Check for**:
- **Fixed widths**: Hard-coded widths that break on mobile
- **Touch targets**: Check the relevant standard and actual input path. 44×44 CSS px is a useful usability target, not a universal WCAG AA threshold; WCAG 2.2 AA target-size checks use 24×24 CSS px or qualifying spacing/exceptions.
- **Broken touch interaction**: Custom sliders, drag surfaces, and scrollable control strips whose primary gesture fails under touch, that swallow page scroll or lose the drag to it, or that stay stuck after an interrupted gesture. Code tells: mouse-only handlers, no `touch-action` on a pointer-event drag surface, drag state that nothing clears on cancel, lost capture, or blur. Exercise the gesture when a browser tool can synthesize touch (a rendered viewport proves layout, not the gesture), then say what produced the evidence (emulated viewport, synthesized touch, which engine, physical device) and what stayed untested
- **Horizontal scroll**: Content overflow on narrow viewports
- **Text scaling**: Layouts that break when text size increases
- **Missing breakpoints**: No mobile/tablet variants

**Score 0-4**: 0=Desktop-only (breaks on mobile), 1=Major issues (some breakpoints, many failures), 2=Partial (works on mobile, rough edges), 3=Good (responsive, minor touch target or overflow issues), 4=Excellent (fluid, all viewports, proper touch targets, gestures work under touch)

### 5. Implementation Integrity (CRITICAL)

Inspect implementation integrity from source and available visual evidence. Reuse an existing detector result or run the bundled detector only when useful and its execution/launcher effects are covered; do not bootstrap it for the audit. Look for repeated implementation shortcuts, design-system drift, misleading or decorative content, and structure interchangeable with an unrelated product. Keep deterministic findings separate from visual judgment, reconcile false positives, and report unavailable detector evidence.

**Score 0-4**: 0=systemic drift, 1=major repeated failures, 2=several verified issues, 3=minor isolated issues, 4=coherent and intentional

## Generate Report

### Audit Health Score

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | ? | [most critical a11y issue or "--"] |
| 2 | Performance | ? | |
| 3 | Responsive Design | ? | |
| 4 | Theming | ? | |
| 5 | Implementation Integrity | ? | |
| **Total** | | **earned/applicable maximum** | **[Rating band or unassessed]** |

**Rating bands**: 18-20 Excellent (minor polish), 14-17 Good (address weak dimensions), 10-13 Acceptable (significant work needed), 6-9 Poor (major overhaul), 0-5 Critical (fundamental issues)

Apply those bands only to a complete `/20` assessment. For a partial assessment, report the actual denominator and use 90%+ Excellent, 70%+ Good, 50%+ Acceptable, 30%+ Poor, otherwise Critical. With no scored dimensions, report `unassessed`, not a percentage or pass.

### Implementation Integrity Verdict
**Start here.** Pass/fail: does the implementation express a coherent product-specific system? Cite verified evidence and detector findings.

### Executive Summary
- Audit Health Score: **earned/applicable maximum** ([rating band or unassessed])
- Total issues found (count by severity: P0/P1/P2/P3)
- Top 3-5 critical issues
- Recommended next steps

### Detailed Findings by Severity

Tag every issue with **P0-P3 severity**:
- **P0 Blocking**: Prevents task completion. Fix immediately
- **P1 Major**: Significant difficulty or WCAG AA violation. Fix before release
- **P2 Minor**: Annoyance, workaround exists. Fix in next pass
- **P3 Polish**: Nice-to-fix, no real user impact. Fix if time permits

For each issue, document:
- **[P?] Issue name**
- **Location**: Component, file, line
- **Category**: Accessibility / Performance / Theming / Responsive / Implementation Integrity
- **Impact**: How it affects users
- **WCAG/Standard**: Which standard it violates (if applicable)
- **Recommendation**: How to fix it
- **Suggested command**: Which command to use (prefer: $impeccable adapt, $impeccable animate, $impeccable audit, $impeccable bolder, $impeccable clarify, $impeccable colorize, $impeccable critique, $impeccable delight, $impeccable distill, $impeccable document, $impeccable harden, $impeccable layout, $impeccable onboard, $impeccable optimize, $impeccable overdrive, $impeccable polish, $impeccable quieter, $impeccable shape, $impeccable typeset)

### Patterns & Systemic Issues

Identify recurring problems that indicate systemic gaps rather than one-off mistakes:
- "Hard-coded colors appear in 15+ components, should use design tokens"
- "Touch targets repeatedly miss the applicable target-size or spacing requirement, making adjacent actions hard to select"

### Positive Findings

Note what's working well: good practices to maintain and replicate.

## Recommended Actions

List recommended commands in priority order (P0 first, then P1, then P2):

1. **[P?] `$command-name`**: Brief description (specific context from audit findings)
2. **[P?] `$command-name`**: Brief description (specific context)

**Rules**: Only recommend commands from: $impeccable adapt, $impeccable animate, $impeccable audit, $impeccable bolder, $impeccable clarify, $impeccable colorize, $impeccable critique, $impeccable delight, $impeccable distill, $impeccable document, $impeccable harden, $impeccable layout, $impeccable onboard, $impeccable optimize, $impeccable overdrive, $impeccable polish, $impeccable quieter, $impeccable shape, $impeccable typeset. Map findings to the most appropriate command. End with `$impeccable polish` as the final step if any fixes were recommended.

After presenting the summary, tell the user:

> You can ask me to run these one at a time, all at once, or in any order you prefer.
>
> Re-run `$impeccable audit` after fixes to see your score improve.

**IMPORTANT**: Be thorough but actionable. Too many P3 issues creates noise. Focus on what actually matters.

**NEVER**:
- Report issues without explaining impact (why does this matter?)
- Provide generic recommendations (be specific and actionable)
- Skip positive findings (celebrate what works)
- Forget to prioritize (everything can't be P0)
- Report false positives without verification
