<!-- Local correction: avoid unsupported visible-choice quotas and use current product-context ownership. -->
### Purpose and authority

Resolve one stable target, assess its design, and deliver an actionable critique in chat. Follow [Workflow and authority](../SKILL.md#workflow-and-authority): ordinary critique is read-only and needs no Impeccable setup or persisted state. A report does not authorize snapshot, configuration, installation, injection, or repair writes.

### Setup

1. Resolve the target to a concrete source path or URL. Prefer a source path when it and a temporary dev-server URL identify the same surface.
2. Identify the available evidence: source, supplied images, accessible rendered page, and applicable platform guidance. Use permitted native tools. Do not start servers, install dependencies, bootstrap the launcher, or run a detector merely to satisfy this reference when those side effects are unavailable or outside scope.
3. Read optional prior-run ignore guidance at `.impeccable/critique/ignore.md` without creating state. A native metadata/read tool is suitable only when it distinguishes absence from lookup/read failure. An empty glob or shell existence predicate does not establish absence. With an already available Python interpreter and permitted execution, this probe is an alternative:

   ```python
   import errno
   import os
   import stat
   import sys

   path = ".impeccable/critique/ignore.md"
   try:
       info = os.stat(path)
   except OSError as error:
       if error.errno != errno.ENOENT:
           raise
   else:
       if not stat.S_ISREG(info.st_mode):
           raise OSError(errno.EINVAL, "ignore guidance is not a regular file", path)
       with open(path, "rb") as guidance:
           sys.stdout.buffer.write(guidance.read())
   ```

   Execute in the project cwd using the interpreter's stdin. Only ENOENT (file or parent missing) is normal empty state. Surface permission denial, invalid path type, other lookup errors and read failures. If no suitable interface is available, report `ignore guidance unavailable: <reason>`. Do not install a runtime or call `critique-storage write` for discovery. Apply successfully read, applicable ignore guidance; do not turn foreign guidance into permission to suppress evidence required by the current request.

### Assessment method

Direct assessment with permitted native tools is valid. Optional delegation must be justified by the task and use the current native dispatch interface; it needs no extra skill-imposed approval, model selection, or turn ceiling. A role label or separate tool call does not by itself establish independent judgment.

For an unanchored design judgment, record Assessment A before reading detector findings. If independent assessments are useful and actually dispatched, give each a self-contained target/evidence contract, keep their findings separate until synthesis, and report the real role/source basis and evidence sharing. Otherwise report direct or sequential assessment plainly; there is no degraded/failure banner for using one context.

**Native targets (`ios` / `android` / `adaptive`):** use Assessment A with [ios.md](ios.md), [android.md](android.md), or both, and supplied or authorized device/simulator evidence. The web detector and overlay are not applicable. Starting a simulator, device run, installation, or build requires current authority; missing evidence is a report limitation, not permission to obtain it by any means.

### Assessment A: Design review

Read relevant source and inspect supplied or permitted rendered evidence. Evaluate:

- **Design specificity:** is composition, interaction and visual language grounded in this product, or interchangeable with an unrelated product?
- **Holistic design:** hierarchy, IA, emotional fit, discoverability, composition, typography, color, accessibility, states, copy and edge cases.
- **Cognitive load:** use [Cognitive Load Assessment](#cognitive-load-assessment); identify concrete recall demands, unclear choices and task interruptions rather than treating a visible-option count as a failure.
- **Emotional journey:** peaks, endings, friction, reassurance and high-stakes moments.
- **Nielsen heuristics:** use [Heuristics Scoring Guide](#heuristics-scoring-guide). Score applicable heuristics 0–4; use `n/a` with reasons rather than inventing evidence.

Collect a design-specificity verdict, heuristic table, cognitive/emotional findings, 2–3 strengths, 3–5 priority issues when warranted, relevant persona red flags, and smaller observations. Do not fabricate issues to fill counts.

### Assessment B: Optional web detector and browser evidence

Use this branch only for web targets when its execution and side effects are within the current task and available tools. It supplements, rather than gates, the critique. Source/manual review remains useful without it; state exactly what was not inspected.

For an already available, authorized bundled detector:

```bash
<skill-base-dir>/scripts/impeccable detect --json [target]
```

Pass markup files/directories, not CSS-only files. For URLs, use permitted browser evidence instead. Narrow large trees to the requested surface. Exit 0 means no reported findings; exit 2 means findings. Neither establishes complete design correctness. Reuse usable returned findings; report unavailable/failed scans without forcing an attempt, download or bootstrap.

Use native browser inspection when permitted and relevant. Existing tabs may be reused unless isolation is materially needed. Script injection and a local overlay helper are optional, mutating operations, not a prerequisite to visual review. If explicitly covered, use a local app URL, confirm mutable injection is supported, start `<skill-base-dir>/scripts/impeccable live-server --background` through the native service interface, record its stop method, and inject the returned local detector script using permitted browser capabilities. Do not weaken browser security or production CSP. Stop a critique-only helper before reporting unless the user requested otherwise. Claim a user-visible overlay only when injection and execution actually succeeded and it is still available.

### Deliver the critique

Synthesize the evidence rather than concatenating assessments. The report in chat is the primary deliverable, independent of storage. Adapt depth to the requested scope and use this structure:

1. **Method and evidence:** direct/sequential/delegated assessment, actual independence provenance where applicable, target, source/rendered evidence and material limitations.
2. **Design health:** table of the ten Nielsen heuristics, scores or `n/a`, concrete evidence, and total over the applicable maximum (four times the number scored). Never put `/40` over a partial set. Score heuristics 7 and 10 only when applicable to the surface; Persuade/Experience surfaces need not invent power-user or help systems.
3. **Design specificity:** authored or category-interchangeable, why, and detector counts/locations/false positives if a scan actually ran.
4. **Overall impression and strengths:** the biggest opportunity and what should be preserved.
5. **Priority issues:** ordered P0–P3 using [Issue Severity](#issue-severity-p0p3), each with the exact problem, user impact and concrete remedy.
6. **Persona red flags:** select relevant personas from [Persona-Based Design Testing](#persona-based-design-testing), using real supplied/project audience context for project-specific personas. Walk the primary task; do not invent audience facts.
7. **Minor observations and next actions:** actionable smaller issues and a proposed priority/scope grounded in the current request.
8. **Run notes:** ignore discovery, detector/browser/overlay status, independence limits and cleanup for operations actually attempted. Snapshot/trend status belongs here only when requested or applicable; `not requested` is a valid outcome.

Be direct and specific, explain impact, and distinguish source inference from observed rendered behavior. Do not claim that an automated clean scan proves accessibility or design quality.

### Optional snapshot and trend

Only persist when the current request or explicitly selected persistent workflow covers report storage, including temporary files and helper side effects. A request for critique alone does not. Trend reading is optional read-only history, not a reason to create a new snapshot.

For authorized canonical history:

1. Resolve the slug with `<skill-base-dir>/scripts/impeccable critique-storage slug "<resolved target>"`. Do not hand-write a slug. If it fails or the target is too vague, skip storage and continue reporting.
2. Write a temporary copy of the completed report body, excluding final run notes and later user decisions.
3. Pass accurate metadata and the body to:

   ```bash
   IMPECCABLE_CRITIQUE_META='{"target":"<user phrasing>","total_score":<n>,"max_score":<n>,"na_heuristics":"<comma-separated numbers, or empty>","p0_count":<n>,"p1_count":<n>}' \
     <skill-base-dir>/scripts/impeccable critique-storage write "<resolved target>" <body-file>
   ```

   The helper records the canonical archive path and, for a local source target, its assessed-content fingerprint. Report the actual written path; never fabricate a saved snapshot.
4. Remove the temporary body file after the attempt. Report cleanup/write failure without withholding the critique.
5. If requested, read `<skill-base-dir>/scripts/impeccable critique-storage trend "<resolved target>" 5`. Report scores with their denominators; varying applicable maxima are not like-for-like. An older entry lacking `max_score` uses the historical `/40` convention, which should be identified rather than presented as observed completeness. One entry is not a trend.

### Clarifying next actions

Ask only when a material next-action choice remains unresolved. Batch independent questions using the native question interface or chat; put the report before any question that suspends delivery. Tie concrete options to findings, preserve settled priorities and off-limits areas, and do not require an answer round solely because the report contains three issues. A report-only request can finish with recommendations.

When improvements are authorized, use the user's priority and scope, then impact, to order them. Relevant Impeccable command references may be suggested, but ordinary native UI work is equally valid and suggestions never grant write authority. Recommend a final polish pass only when it serves the requested changes. A later critique can compare evidence; do not promise the score will improve.

---

## Reference Material

The sections below were previously separate reference files (`cognitive-load.md`, `heuristics-scoring.md`, `personas.md`). They live inline now so the critique flow has all its deep context in one place.

### Cognitive Load Assessment

Cognitive load is the total mental effort required to use an interface. Overloaded users make mistakes, get frustrated, and leave. This reference helps identify and fix cognitive overload.

---

#### Three Types of Cognitive Load

##### Intrinsic Load: The Task Itself
Complexity inherent to what the user is trying to do. You can't eliminate this, but you can structure it.

**Manage it by**:
- Breaking complex tasks into discrete steps
- Providing scaffolding (templates, defaults, examples)
- Progressive disclosure: show what's needed now, hide the rest
- Grouping related decisions together

##### Extraneous Load: Bad Design
Mental effort caused by poor design choices. **Eliminate this ruthlessly.** It's pure waste.

**Common sources**:
- Confusing navigation that requires mental mapping
- Unclear labels that force users to guess meaning
- Visual clutter competing for attention
- Inconsistent patterns that prevent learning
- Unnecessary steps between user intent and result

##### Germane Load: Learning Effort
Mental effort spent building understanding. This is *good* cognitive load; it leads to mastery.

**Support it by**:
- Progressive disclosure that reveals complexity gradually
- Consistent patterns that reward learning
- Feedback that confirms correct understanding
- Onboarding that teaches through action, not walls of text

---

#### Cognitive Load Checklist

Evaluate the interface against these 8 items:

- [ ] **Single focus**: Can the user complete their primary task without distraction from competing elements?
- [ ] **Chunking**: Is information grouped meaningfully for the task and audience?
- [ ] **Grouping**: Are related items visually grouped together (proximity, borders, shared background)?
- [ ] **Visual hierarchy**: Is it immediately clear what's most important on the screen?
- [ ] **One thing at a time**: Can the user focus on a single decision before moving to the next?
- [ ] **Choices**: Can users distinguish and compare relevant options without unnecessary recall or hidden navigation?
- [ ] **Working memory**: Does the user need to remember information from a previous screen to act on the current one?
- [ ] **Progressive disclosure**: Is complexity revealed only when the user needs it?

Record the failed checks with task-specific evidence and user impact. The count alone is not a validated cognitive-load score or a severity threshold; visible information can reduce recall demands.

---

#### Working memory and visible choices

Working-memory research does not establish a universal maximum of four visible interface options. Familiar labeled choices can be scanned without memorizing the entire set; hiding them can increase recall and navigation costs.

Inspect what the task actually makes the user hold in mind: unfamiliar alternatives, values from another screen, unlabelled controls, dependencies and interruptions. Group or sequence choices when that demonstrably helps, while retaining useful navigation, filters and comparison context. For example:
- Give a primary action clear emphasis without hiding legitimate secondary actions by count.
- Use meaningful navigation categories rather than a fixed top-level or sidebar limit.
- Keep article links near the context they explain when that helps comprehension.
- Preserve portfolio filters and sorting when visitors need them to find relevant work.

---

#### Common Cognitive Load Violations

##### 1. The Wall of Options
**Problem**: Presenting 10+ choices at once with no hierarchy.
**Fix**: Group into categories, highlight recommended, use progressive disclosure.

##### 2. The Memory Bridge
**Problem**: User must remember info from step 1 to complete step 3.
**Fix**: Keep relevant context visible, or repeat it where it's needed.

##### 3. The Hidden Navigation
**Problem**: User must build a mental map of where things are.
**Fix**: Always show current location (breadcrumbs, active states, progress indicators).

##### 4. The Jargon Barrier
**Problem**: Technical or domain language forces translation effort.
**Fix**: Use plain language. If domain terms are unavoidable, define them inline.

##### 5. The Visual Noise Floor
**Problem**: Every element has the same visual weight; nothing stands out.
**Fix**: Establish clear hierarchy: one primary element, 2–3 secondary, everything else muted.

##### 6. The Inconsistent Pattern
**Problem**: Similar actions work differently in different places.
**Fix**: Standardize interaction patterns. Same type of action = same type of UI.

##### 7. The Multi-Task Demand
**Problem**: Interface requires processing multiple simultaneous inputs (reading + deciding + navigating).
**Fix**: Sequence the steps. Let the user do one thing at a time.

##### 8. The Context Switch
**Problem**: User must jump between screens/tabs/modals to gather info for a single decision.
**Fix**: Co-locate the information needed for each decision. Reduce back-and-forth.

---

### Heuristics Scoring Guide

Score each of Nielsen's 10 Usability Heuristics on a 0–4 scale. Be honest: a 4 means genuinely excellent, not "good enough."

#### Nielsen's 10 Heuristics

##### 1. Visibility of System Status

Keep users informed about what's happening through timely, appropriate feedback.

**Check for**:
- Loading indicators during async operations
- Confirmation of user actions (save, submit, delete)
- Progress indicators for multi-step processes
- Current location in navigation (breadcrumbs, active states)
- Form validation feedback (inline, not just on submit)

**Scoring**:
| Score | Criteria |
|-------|----------|
| 0 | No feedback; user is guessing what happened |
| 1 | Rare feedback; most actions produce no visible response |
| 2 | Partial; some states communicated, major gaps remain |
| 3 | Good; most operations give clear feedback, minor gaps |
| 4 | Excellent; every action confirms, progress is always visible |

##### 2. Match Between System and Real World

Speak the user's language. Follow real-world conventions. Information appears in natural, logical order.

**Check for**:
- Familiar terminology (no unexplained jargon)
- Logical information order matching user expectations
- Recognizable icons and metaphors
- Domain-appropriate language for the target audience
- Natural reading flow matching the content's language and writing direction

**Scoring**:
| Score | Criteria |
|-------|----------|
| 0 | Pure tech jargon, alien to users |
| 1 | Mostly confusing; requires domain expertise to navigate |
| 2 | Mixed; some plain language, some jargon leaks through |
| 3 | Mostly natural; occasional term needs context |
| 4 | Speaks the user's language fluently throughout |

##### 3. User Control and Freedom

Users need a clear "emergency exit" from unwanted states without extended dialogue.

**Check for**:
- Undo/redo functionality
- Cancel buttons on forms and modals
- Clear navigation back to safety (home, previous)
- Easy way to clear filters, search, selections
- Escape from long or multi-step processes

**Scoring**:
| Score | Criteria |
|-------|----------|
| 0 | Users get trapped; no way out without refreshing |
| 1 | Difficult exits; must find obscure paths to escape |
| 2 | Some exits; main flows have escape, edge cases don't |
| 3 | Good control; users can exit and undo most actions |
| 4 | Full control; undo, cancel, back, and escape everywhere |

##### 4. Consistency and Standards

Users shouldn't wonder whether different words, situations, or actions mean the same thing.

**Check for**:
- Consistent terminology throughout the interface
- Same actions produce same results everywhere
- Platform conventions followed (standard UI patterns)
- Visual consistency (colors, typography, spacing, components)
- Consistent interaction patterns (same gesture = same behavior)

**Scoring**:
| Score | Criteria |
|-------|----------|
| 0 | Inconsistent everywhere; feels like different products stitched together |
| 1 | Many inconsistencies; similar things look/behave differently |
| 2 | Partially consistent; main flows match, details diverge |
| 3 | Mostly consistent; occasional deviation, nothing confusing |
| 4 | Fully consistent; cohesive system, predictable behavior |

##### 5. Error Prevention

Better than good error messages is a design that prevents problems in the first place.

**Check for**:
- Confirmation before destructive actions (delete, overwrite)
- Constraints preventing invalid input (date pickers, dropdowns)
- Smart defaults that reduce errors
- Clear labels that prevent misunderstanding
- Autosave and draft recovery

**Scoring**:
| Score | Criteria |
|-------|----------|
| 0 | Errors easy to make; no guardrails anywhere |
| 1 | Few safeguards; some inputs validated, most aren't |
| 2 | Partial prevention; common errors caught, edge cases slip |
| 3 | Good prevention; most error paths blocked proactively |
| 4 | Excellent; errors nearly impossible through smart constraints |

##### 6. Recognition Rather Than Recall

Minimize memory load. Make objects, actions, and options visible or easily retrievable.

**Check for**:
- Visible options (not buried in hidden menus)
- Contextual help when needed (tooltips, inline hints)
- Recent items and history
- Autocomplete and suggestions
- Labels on icons (not icon-only navigation)

**Scoring**:
| Score | Criteria |
|-------|----------|
| 0 | Heavy memorization; users must remember paths and commands |
| 1 | Mostly recall; many hidden features, few visible cues |
| 2 | Some aids; main actions visible, secondary features hidden |
| 3 | Good recognition; most things discoverable, few memory demands |
| 4 | Everything discoverable; users never need to memorize |

##### 7. Flexibility and Efficiency of Use

Accelerators, invisible to novices, speed up expert interaction.

**Check for**:
- Keyboard shortcuts for common actions
- Customizable interface elements
- Recent items and favorites
- Bulk/batch actions
- Power user features that don't complicate the basics

**Scoring**:
| Score | Criteria |
|-------|----------|
| 0 | One rigid path; no shortcuts or alternatives |
| 1 | Limited flexibility; few alternatives to the main path |
| 2 | Some shortcuts; basic keyboard support, limited bulk actions |
| 3 | Good accelerators; keyboard nav, some customization |
| 4 | Highly flexible; multiple paths, power features, customizable |

##### 8. Aesthetic and Minimalist Design

Interfaces should not contain irrelevant or rarely needed information. Every element should serve a purpose.

**Check for**:
- Only necessary information visible at each step
- Clear visual hierarchy directing attention
- Purposeful use of color and emphasis
- No decorative clutter competing for attention
- Focused, uncluttered layouts

**Scoring**:
| Score | Criteria |
|-------|----------|
| 0 | Overwhelming; everything competes for attention equally |
| 1 | Cluttered; too much noise, hard to find what matters |
| 2 | Some clutter; main content clear, periphery noisy |
| 3 | Mostly clean; focused design, minor visual noise |
| 4 | Perfectly minimal; every element earns its pixel |

##### 9. Help Users Recognize, Diagnose, and Recover from Errors

Error messages should use plain language, precisely indicate the problem, and constructively suggest a solution.

**Check for**:
- Plain language error messages (no error codes for users)
- Specific problem identification ("Email is missing @" not "Invalid input")
- Actionable recovery suggestions
- Errors displayed near the source of the problem
- Non-blocking error handling (don't wipe the form)

**Scoring**:
| Score | Criteria |
|-------|----------|
| 0 | Cryptic errors; codes, jargon, or no message at all |
| 1 | Vague errors; "Something went wrong" with no guidance |
| 2 | Clear but unhelpful; names the problem but not the fix |
| 3 | Clear with suggestions; identifies problem and offers next steps |
| 4 | Perfect recovery; pinpoints issue, suggests fix, preserves user work |

##### 10. Help and Documentation

Even if the system is usable without docs, help should be easy to find, task-focused, and concise.

**Check for**:
- Searchable help or documentation
- Contextual help (tooltips, inline hints, guided tours)
- Task-focused organization (not feature-organized)
- Concise, scannable content
- Easy access without leaving current context

**Scoring**:
| Score | Criteria |
|-------|----------|
| 0 | No help available anywhere |
| 1 | Help exists but hard to find or irrelevant |
| 2 | Basic help; FAQ or docs exist, not contextual |
| 3 | Good documentation; searchable, mostly task-focused |
| 4 | Excellent contextual help; right info at the right moment |

---

#### Score Summary

**Total possible**: 40 points (10 heuristics × 4 max)

| Score Range | Rating | What It Means |
|-------------|--------|---------------|
| 36–40 | Excellent | Minor polish only; ship it |
| 28–35 | Good | Address weak areas, solid foundation |
| 20–27 | Acceptable | Significant improvements needed before users are happy |
| 12–19 | Poor | Major UX overhaul required; core experience broken |
| 0–11 | Critical | Redesign needed; unusable in current state |

When heuristics were scored `n/a`, the maximum is lower than 40; read the band off the percentage instead of the raw number (90%+ Excellent, 70%+ Good, 50%+ Acceptable, 30%+ Poor, below that Critical). 24/32 is 75%, so Good.

---

#### Issue Severity (P0–P3)

Tag each individual issue found during scoring with a priority level:

| Priority | Name | Description | Action |
|----------|------|-------------|--------|
| **P0** | Blocking | Prevents task completion entirely | Fix immediately; this is a showstopper |
| **P1** | Major | Causes significant difficulty or confusion | Fix before release |
| **P2** | Minor | Annoyance, but workaround exists | Fix in next pass |
| **P3** | Polish | Nice-to-fix, no real user impact | Fix if time permits |

**Tip**: If you're unsure between two levels, ask: "Would a user contact support about this?" If yes, it's at least P1.

---

### Persona-Based Design Testing

Test the interface through the eyes of 5 distinct user archetypes. Each persona exposes different failure modes that a single "design director" perspective would miss.

**How to use**: Select 2–3 personas most relevant to the interface being critiqued. Walk through the primary user action as each persona. Report specific red flags, not generic concerns.

---

#### 1. Impatient Power User: "Alex"

**Profile**: Expert with similar products. Expects efficiency, hates hand-holding. Will find shortcuts or leave.

**Behaviors**:
- Skips all onboarding and instructions
- Looks for keyboard shortcuts immediately
- Tries to bulk-select, batch-edit, and automate
- Gets frustrated by required steps that feel unnecessary
- Abandons if anything feels slow or patronizing

**Test Questions**:
- Can Alex complete the core task in under 60 seconds?
- Are there keyboard shortcuts for common actions?
- Can onboarding be skipped entirely?
- Do modals have keyboard dismiss (Esc)?
- Is there a "power user" path (shortcuts, bulk actions)?

**Red Flags** (report these specifically):
- Forced tutorials or unskippable onboarding
- No keyboard navigation for primary actions
- Slow animations that can't be skipped
- One-item-at-a-time workflows where batch would be natural
- Redundant confirmation steps for low-risk actions

---

#### 2. Confused First-Timer: "Jordan"

**Profile**: Never used this type of product. Needs guidance at every step. Will abandon rather than figure it out.

**Behaviors**:
- Reads all instructions carefully
- Hesitates before clicking anything unfamiliar
- Looks for help or support constantly
- Misunderstands jargon and abbreviations
- Takes the most literal interpretation of any label

**Test Questions**:
- Is the first action obviously clear within 5 seconds?
- Are all icons labeled with text?
- Is there contextual help at decision points?
- Does terminology assume prior knowledge?
- Is there a clear "back" or "undo" at every step?

**Red Flags** (report these specifically):
- Icon-only navigation with no labels
- Technical jargon without explanation
- No visible help option or guidance
- Ambiguous next steps after completing an action
- No confirmation that an action succeeded

---

#### 3. Accessibility-Dependent User: "Sam"

**Profile**: Uses screen reader (VoiceOver/NVDA), keyboard-only navigation. May have low vision, motor impairment, or cognitive differences.

**Behaviors**:
- Tabs through the interface linearly
- Relies on ARIA labels and heading structure
- Cannot see hover states or visual-only indicators
- Needs adequate contrast under the applicable text/non-text criteria, not one ratio for every element
- May use browser zoom up to 200%

**Test Questions**:
- Can the entire primary flow be completed keyboard-only?
- Are all interactive elements focusable with visible focus indicators?
- Do images have meaningful alt text?
- Does normal text meet 4.5:1 and large text (18pt regular or 14pt bold) meet 3:1, with the actual criterion's exceptions and separate non-text/focus checks?
- Does the screen reader announce state changes (loading, success, errors)?

**Red Flags** (report these specifically):
- Click-only interactions with no keyboard alternative
- Missing or invisible focus indicators
- Meaning conveyed by color alone (red = error, green = success)
- Unlabeled form fields or buttons
- Time-limited actions without extension option
- Custom components that break screen reader flow

---

#### 4. Deliberate Stress Tester: "Riley"

**Profile**: Methodical user who pushes interfaces beyond the happy path. Tests edge cases, tries unexpected inputs, and probes for gaps in the experience.

**Behaviors**:
- Tests edge cases intentionally (empty states, long strings, special characters)
- Submits forms with unexpected data (emoji, RTL text, very long values)
- Tries to break workflows by navigating backwards, refreshing mid-flow, or opening in multiple tabs
- Looks for inconsistencies between what the UI promises and what actually happens
- Documents problems methodically

**Test Questions**:
- What happens at the edges (0 items, 1000 items, very long text)?
- Do error states recover gracefully or leave the UI in a broken state?
- What happens on refresh mid-workflow? Is state preserved?
- Are there features that appear to work but produce broken results?
- How does the UI handle unexpected input (emoji, special chars, paste from Excel)?

**Red Flags** (report these specifically):
- Features that appear to work but silently fail or produce wrong results
- Error handling that exposes technical details or leaves UI in a broken state
- Empty states that show nothing useful ("No results" with no guidance)
- Workflows that lose user data on refresh or navigation
- Inconsistent behavior between similar interactions in different parts of the UI

---

#### 5. Distracted Mobile User: "Casey"

**Profile**: Using phone one-handed on the go. Frequently interrupted. Possibly on a slow connection.

**Behaviors**:
- Uses thumb only; prefers bottom-of-screen actions
- Gets interrupted mid-flow and returns later
- Switches between apps frequently
- Has limited attention span and low patience
- Types as little as possible, prefers taps and selections

**Test Questions**:
- Are primary actions in the thumb zone (bottom half of screen)?
- Is state preserved if the user leaves and returns?
- Does it work on slow connections (3G)?
- Can forms use autocomplete and smart defaults?
- Do targets meet the applicable platform size/spacing requirement (web CSS px, iOS pt or Android dp), rather than mixing those units?

**Red Flags** (report these specifically):
- Important actions positioned at the top of the screen (unreachable by thumb)
- No state persistence; progress lost on tab switch or interruption
- Large text inputs required where selection would work
- Heavy assets loading on every page (no lazy loading)
- Tiny tap targets or targets too close together

---

#### Selecting Personas

Choose personas based on the interface type:

| Interface Type | Primary Personas | Why |
|---------------|-----------------|-----|
| Landing page / marketing | Jordan, Riley, Casey | First impressions, trust, mobile |
| Dashboard / admin | Alex, Sam | Power users, accessibility |
| E-commerce / checkout | Casey, Riley, Jordan | Mobile, edge cases, clarity |
| Onboarding flow | Jordan, Casey | Confusion, interruption |
| Data-heavy / analytics | Alex, Sam | Efficiency, keyboard nav |
| Form-heavy / wizard | Jordan, Sam, Casey | Clarity, accessibility, mobile |

---

#### Project-Specific Personas

When supplied product/audience evidence or an existing PRODUCT.md provides real design context, derive additional personas only when they expose a material audience need not covered below. An already present legacy `## Design Context` section can also supply evidence; current init owns PRODUCT.md, not creation of an AGENTS.md section.

1. Read the target audience description
2. Identify the primary user archetype not covered by the 5 predefined personas
3. Create a persona following this template:

```
##### [Role]: "[Name]"

**Profile**: [2-3 key characteristics derived from Design Context]

**Behaviors**: [3-4 specific behaviors based on the described audience]

**Red Flags**: [3-4 things that would alienate this specific user type]
```

Only generate project-specific personas when real Design Context data is available. Don't invent audience details; use the 5 predefined personas when no context exists.
