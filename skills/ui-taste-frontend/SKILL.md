---
name: ui-taste-frontend
description: "[Taste Skill] Use selectively for landing pages, portfolios, and marketing redesigns needing distinctive, brief-led frontend design; not dashboards or native app UI."
---

# tasteskill: Anti-Slop Frontend Skill

> Landing pages, portfolios, and redesigns. Not dashboards, not data tables, not multi-step product UI.
> Every rule below is **contextual**. None of it fires automatically. First read the brief, then pull only what fits.

Modified adaptation of the expanded Taste Skill; exact baseline comparison, local changes, and remaining provenance limits are recorded in [SOURCES.md](SOURCES.md). Full MIT notices for the [expanded source](LICENSE.leonxlnx) and the [retained shorter-source comparison](LICENSE.taste) accompany this third-party guidance; it is not upstream policy.

## Scope and authority

Use this as a selective design reference within the current request. For general UI workflow and authority, follow [UI design guidance](../ui-design/SKILL.md); for relevant motion details use [web motion guidance](../ui-web-motion/SKILL.md), and mobile viewport/browser behavior uses [mobile web guidance](../ui-mobile-web/SKILL.md). A source review of this skill does not execute those workflows.

Preserve the actual framework, design system, dependencies, supplied content and working behavior. The brief, accessibility, project constraints and authorized scope outrank every aesthetic heuristic below. Read-only reviews remain read-only. Loading this skill does not authorize installing packages, initializing a project, generating images, contacting external services, persisting design records or changing native runtime/model/approval settings.

Use the available host interfaces. Ask only for materially unresolved choices, batch independent questions and honor the requested output format. No task needs a ceremonial design declaration, numeric dial report or style checklist to proceed.

---

## 0. BRIEF INFERENCE (Read the Room Before Anything Else)

Before touching code or choosing design heuristics, establish what the user wants from the actual brief, existing interface and supplied evidence. Do not infer permission for a redesign or content rewrite from an aesthetic description alone.

### 0.A Read these signals first
1. **Page kind** - landing (SaaS / consumer / agency / event), portfolio (dev / designer / creative studio), redesign (preserve vs overhaul), editorial / blog.
2. **Vibe words** the user used - "minimalist", "calm", "Linear-style", "Awwwards", "brutalist", "premium consumer", "Apple-y", "playful", "serious B2B", "editorial", "agency-y", "glassy", "dark tech".
3. **Reference signals** - URLs they linked, screenshots they pasted, products they named, brands they're competing with.
4. **Audience** - B2B procurement panel vs. design-conscious consumer vs. recruiter scanning a portfolio. The audience picks the aesthetic, not your taste.
5. **Brand assets that already exist** - logo, color, type, photography. For redesigns, these are starting material, not optional input (see Section 11).
6. **Quiet constraints** - accessibility-first audiences, public-sector, regulated industries, trust-first commerce, kids' products. These constraints OVERRIDE aesthetic preference.

### 0.B State the design interpretation when useful
If direction needs explanation, briefly state the page kind, audience, visual language and existing foundation. Follow the user's requested format; this is not a required prefix, extra approval round or reason to delay an otherwise clear task.

Example reads:
- *"Reading this as: B2B SaaS landing for technical buyers, with a Linear-style minimalist language, leaning toward Tailwind utilities + Geist + restrained motion."*
- *"Reading this as: solo designer portfolio for hiring managers, with an editorial / kinetic-type language, leaning toward native CSS + scroll-driven animation + custom typography."*
- *"Reading this as: redesign of a public-sector service site, with a trust-first language, leaning toward GOV.UK Frontend or USWDS."*

### 0.C Resolve material ambiguity
Use the native question interface only when competing interpretations materially affect the result, scope or consequences. Batch independent choices; sequence dependent ones. Reuse settled answers and choose routine details from the brief rather than forcing an arbitrary single-question limit.

If context supports a clear interpretation, proceed within authority without a redundant question.

### 0.D Anti-Default Discipline
Question unchosen category defaults such as repeated equal feature cards, unmotivated glow/glass effects or interchangeable hero templates. These are design heuristics, not authorship indicators or reasons to override a pinned brand, palette, composition or existing system.

---

## 1. THE THREE DIALS (Core Configuration)

The three dials are optional descriptive vocabulary for the current surface, not measured quality scores or mandatory configuration. Use them only when they clarify an actual layout, motion or density tradeoff.

* **`DESIGN_VARIANCE: 8`** - 1 = Perfect Symmetry, 10 = Artsy Chaos
* **`MOTION_INTENSITY: 6`** - 1 = Static, 10 = Cinematic / Physics
* **`VISUAL_DENSITY: 4`** - 1 = Art Gallery / Airy, 10 = Cockpit / Packed Data

**Illustrative baseline:** `8 / 6 / 4`, not an obligation. The brief and incumbent interface decide. Do not persist these values, create cross-project history or add motion merely to satisfy a number.

### 1.A Dial Inference (design read → dial values)
| Signal | VARIANCE | MOTION | DENSITY |
|---|---|---|---|
| "minimalist / clean / calm / editorial / Linear-style" | 5-6 | 3-4 | 2-3 |
| "premium consumer / Apple-y / luxury / brand" | 7-8 | 5-7 | 3-4 |
| "playful / wild / Dribbble / Awwwards / experimental / agency" | 9-10 | 8-10 | 3-4 |
| "landing page / portfolio / marketing site (default)" | 7-9 | 6-8 | 3-5 |
| "trust-first / public-sector / regulated / accessibility-critical" | 3-4 | 2-3 | 4-5 |
| "redesign - preserve" | match existing | match existing | match existing |
| "redesign - overhaul" | chosen direction | task-appropriate | task-appropriate |

### 1.B Use-Case Presets
| Use case | VARIANCE | MOTION | DENSITY |
|---|---|---|---|
| Landing (SaaS, mainstream) | 7 | 6 | 4 |
| Landing (Agency / creative) | 9 | 8 | 3 |
| Landing (Premium consumer) | 7 | 6 | 3 |
| Portfolio (Designer / studio) | 8 | 7 | 3 |
| Portfolio (Developer) | 6 | 5 | 4 |
| Editorial / Blog | 6 | 4 | 3 |
| Public-sector service | 3 | 2 | 5 |
| Redesign - preserve | match | match | match |
| Redesign - overhaul | chosen direction | task-appropriate | task-appropriate |

### 1.C How the Dials Drive Output
When used, `DESIGN_VARIANCE`, `MOTION_INTENSITY` and `VISUAL_DENSITY` describe this task only. They do not override preservation, accessibility or verification requirements, select dependencies, or imply global runtime state.

---

## 2. BRIEF → DESIGN SYSTEM MAP

Start with the project's actual foundation. The map below supplies candidate systems when a foundation must be chosen within scope; it is not installation, migration or regulatory authority. Verify current package/API support against the actual framework and platform. Distinguish an official system from an aesthetic inspired by it.

### 2.A Candidate design systems
| Brief reads as… | Reach for | Why |
|---|---|---|
| Microsoft / enterprise SaaS / dashboards | `@fluentui/react-components` or `@fluentui/web-components` | Official Fluent components; verify accessibility in the composed interface |
| Google-ish UI, Material-flavored product | `@material/web` + Material 3 tokens | Official, theme-able via Material Theming |
| IBM-style B2B / enterprise analytics | `@carbon/react` + `@carbon/styles` | Official Carbon, mature data-density patterns |
| Shopify app surfaces | `polaris.js` web components / Polaris React | Check current Shopify surface and version requirements |
| Atlassian / Jira-style product | `@atlaskit/*` + `@atlaskit/tokens` | Official Atlassian DS |
| GitHub-style devtool / community page | `@primer/css` or `@primer/react-brand` | Official Primer; Brand variant for marketing |
| Public-sector UK service | `govuk-frontend` | Applicable service requirements determine adoption |
| US public-sector / trust-first | `uswds` | Applicable project requirements determine adoption |
| Fast local-business / agency MVP | Bootstrap 5.3 | Boring, fast, works |
| Modern accessible React foundation | `@radix-ui/themes` | Primitives + polished theme |
| Modern SaaS where you own the components | shadcn/ui | Consider when compatible with the actual stack and ownership needs |
| Tailwind-based modern SaaS / marketing | Installed Tailwind version and existing tokens | Reuse rather than silently upgrade or migrate |

**Honesty rule:** call a package official only when its source supports that identity. If an official implementation is actually required, verify its compatibility and current authority before introducing it. Do not replace the incumbent system or add packages merely because the visual brief resembles another product.

**System consistency:** reuse the incumbent component/token language. Resolve a genuinely necessary cross-system integration explicitly rather than mixing unrelated libraries by default.

### 2.B When the brief is an aesthetic, not a system
These aesthetics have no single official package. Implement them using the actual stack and available capabilities; do not add Tailwind or a component library merely to match the table. Label an approximation honestly when that distinction matters to the deliverable.

| Aesthetic | Honest implementation |
|---|---|
| Glassmorphism / "frosted glass" | `backdrop-filter`, layered borders, highlight overlays. Provide solid-fill fallback for `prefers-reduced-transparency`. |
| Bento (Apple-style tile grids) | CSS Grid with mixed cell sizes. No single library owns this. |
| Brutalism | Native CSS, monospace, raw borders. No library. |
| Editorial / magazine | Serif type, asymmetric grid, generous whitespace. No library. |
| Dark tech / hacker | Mono + accent neon, terminal motifs. No library. |
| Aurora / mesh gradients | SVG or layered radial gradients. No library. |
| Kinetic typography | Native CSS animations, scroll-driven animations, GSAP for hijacks. No library. |
| **Apple Liquid Glass** | Apple documents this for Apple platforms only. **There is no official `liquid-glass.css`.** Web implementations are approximations using `backdrop-filter` + layered borders + highlights. Label clearly as approximation. |

---

## 3. ARCHITECTURE & CONVENTIONS

Inspect the current project before choosing implementation details. Existing architecture and the requested change govern; examples below are conditional, not permission to install or migrate.

### 3.A Stack
* **Framework:** preserve the actual framework. Use React/Next.js conventions only in a compatible project. In an RSC-enabled framework, keep client-only state and browser APIs behind the appropriate client boundary; do not add `'use client'` to unrelated code or prescribe RSC to ordinary React/static sites.
* **Styling:** reuse installed CSS tooling, tokens and project conventions. If Tailwind is present, verify its actual version and plugin setup; do not upgrade v3 to v4 or introduce a second styling stack for taste.
* **Animation:** use the existing supported motion approach when the task needs animation. `motion/react` is a candidate import only when that package/version is installed and selected; a library's existence is not a reason to add animation.
* **Fonts:** preserve pinned/available fonts and verify licensing, loading, privacy and deployment constraints before adding a face. Use the framework's supported font facilities where appropriate, not an unconditional Next.js-specific recipe.

### 3.B State
* In React, prefer local state for discrete component state; introduce global state only for a real shared-state need within scope.
* For continuous motion values, avoid unnecessary React renders. Use existing motion values, CSS or supported browser APIs as appropriate; make performance claims only from measurements, not from a blanket assertion that all state updates fail on mobile.

### 3.C Icons
Reuse the existing icon family and sizing/stroke conventions. Phosphor, HugeIcons, Radix, Tabler and Lucide are examples, not an allowlist. Appropriate authored SVG is valid. A missing glyph does not automatically justify a second dependency.

### 3.D Emoji Policy
Use the product's actual voice and semantic needs. Do not replace supplied text, symbols or emoji solely to enforce a style ban.

### 3.E Responsiveness & Layout Mechanics
Reuse project breakpoints and content widths. Choose Grid, Flexbox and viewport units for the actual layout. `dvh` follows the changing viewport; it is not a universal guarantee against browser-chrome layout shifts. For mobile viewport/scroll behavior, follow [mobile web guidance](../ui-mobile-web/SKILL.md) and verify the relevant browser states rather than imposing `100dvh` everywhere.

### 3.F Dependency Verification
Before using a dependency, inspect the actual manifest/lockfile and compatible API. If absent, prefer an existing capability when it meets the task. Introduce a package only when necessary, proportionate and authorized; resolve material cost, security or compatibility consequences before acting. A command in an appendix is reference material, not an instruction to execute it.

---

## 4. DESIGN ENGINEERING DIRECTIVES

Use these as brief-led design considerations, not fixed failure gates or evidence of AI authorship. Preserve supplied content, existing systems and authorized scope.

### 4.1 Typography
* Establish a readable display/body hierarchy from the actual type system and content. Tailwind examples such as `text-4xl md:text-6xl` or `max-w-[65ch]` are starting points only when that stack is present.
* Choose faces for the subject and audience. Sans, serif, Inter, system faces and expressive display type are all valid when they serve the brief; no font is rejected because another project used it.
* Candidate pairings include Geist/Geist Mono, Satoshi/JetBrains Mono, Cabinet Grotesk/Inter Tight and GT America/IBM Plex Mono. Verify availability and licensing before adding any face.
* Use emphasis deliberately, including mixed families when the approved system calls for them. Inspect real glyphs, line height, wrapping, zoom and overflow: italic descender clipping is a rendered-layout check, not a universal `leading-[1.1]` recipe.

### 4.2 Color Calibration
* Reuse actual brand and semantic tokens. A single accent can clarify hierarchy, but multiple accents, status colors and a warm/cool neutral mix can be appropriate when their roles are consistent.
* Purple, neon, cream/brass, pure black and pure white are not inherently defective. Choose their use from the brief, contrast and actual composition rather than a banned-hex list.
* Alternative palette studies can include cold metallic neutrals, forest green, black/tan, cobalt/cream, terracotta/slate, olive/brick/paper or monochrome with one accent. They are options, not a rotation schedule.
* Do not inspect or remember unrelated projects to force palette novelty. Verify contrast against actual backgrounds and in the states/themes the product supports.

### 4.3 Layout Diversification
Consider asymmetric splits, editorial stacks, grids or a centered composition according to content and visitor task. A dial value never forces a hero layout or a scroll-pinned section. Preserve an established layout during scoped refinement unless its change is authorized.

### 4.4 Materiality, Shadows, Cards
Use grouping, borders, space and elevation to communicate real relationships. Cards and nested groups are valid when useful; avoid adding containers with no task benefit. Keep radius/elevation roles coherent with the actual system rather than imposing one radius on every element.

### 4.5 Interactive UI States
* Exercise applicable loading, empty, error, focus, disabled and success transitions for the changed component. Do not invent backend behavior or add unrelated state machinery.
* Give controls clear action labels, hit targets, focus and useful feedback. Motion-based press effects are optional; preserve usability without them.
* **Text contrast:** use 4.5:1 for normal text, or 3:1 for large text at least **18pt regular or 14pt bold** (24 CSS px regular or approximately 18.67 CSS px bold). “18px+” alone is not the large-text threshold. Apply the criterion's actual state exceptions, and evaluate non-text controls/focus under their own applicable criteria. See [WCAG Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
* On photographic/transparent backgrounds, verify the actual visible contrast rather than assuming a scrim or outline suffices.
* Preserve meaningful and localized CTA labels. Fix clipping/overflow through suitable sizing and layout; do not silently shorten supplied copy to meet a word or one-line limit. Repeated CTAs can legitimately serve the same action at different points in a long page.

### 4.6 Data & Form Patterns
Use persistent accessible labels, connected helper/error text and a layout that suits the form. Do not use a placeholder as the only label. Preserve field names, validation, order and data handling unless their change is within scope.

### 4.7 Layout Discipline
* Make the first viewport's message, context and primary action clear at the relevant sizes. Do not impose a universal headline line-count, word-count, padding or viewport-fit cap; real content, text resizing and localization must remain usable.
* Use meaningful eyebrows, category labels, trust information or version status when supported by product truth. No count-based eyebrow ban overrides useful information.
* Preserve navigation labels/routes. Adapt wrapping, grouping and disclosure for the actual viewport and input mode without dropping required destinations.
* Let grids reflect real content. Avoid accidental empty cells or repetitive filler; deliberate repetition and open space are valid where they improve comprehension.
* Vary section rhythm when content benefits. Split headers, alternating image/text, repeated cards and consistent rows are not automatic failures. Do not add carousels, marquees or extra imagery merely to meet a diversity quota.
* Verify responsive behavior with actual content, keyboard access, zoom and relevant device widths instead of assuming one fixed breakpoint or class guarantees it.

### 4.8 Image & Visual Asset Strategy
Choose media from the brief and actual content. Reuse suitable supplied assets first. Text-led, vector-led and image-led pages are all complete design approaches when they satisfy the task; no minimum image count is required.

Generate or fetch imagery only when the requested asset work and its network/data/cost effects are authorized. The presence of an image tool does not select it, and a generic asset need does not select an external service. Verify usable rights and actual output; do not add random stock photos to imitate product evidence.

Use real screenshots or functioning component previews for an existing product. An authorized synthetic prototype/reference image must be visibly identified as illustrative where viewers could mistake it for real behavior. A generated screenshot does not prove the product has those features.

Use customer logos/testimonials/metrics only with actual supporting evidence. A downloadable company logo proves neither a customer relationship nor permission for an endorsement claim. Plain text wordmarks and appropriate authored SVG are valid. Invented brands/marks are allowed only in an authorized, clearly labeled synthetic concept, never as fabricated customer proof.

If a required asset is unavailable, report the exact dependency and continue independent authorized work. Do not hide the gap in a TODO slot, replace it with misleading media or call the whole deliverable finished. Resolve a materially different asset or scope choice with the user.

### 4.9 Content Density
Keep reading order and the primary task legible. Concise headings and supporting text can help, but preserve supplied facts, specifications, required disclosures and technical meaning. Use readable lists/tables, grouping or an authorized disclosure pattern according to the content; do not replace them solely because they exceed a row count.

Review copy for concrete ambiguity, factual errors and audience fit. A visual change does not authorize rewriting every string that resembles a style heuristic. For requested editorial work use [writing authenticity guidance](../writing-authenticity/SKILL.md).

Metrics, prices and specifications require real evidence. In an authorized prototype, label synthetic values visibly where needed; a hidden HTML comment is not disclosure to a visitor. Preserve supported exact values even when they look unusually round or precise.

### 4.10 Quotes & Testimonials
Preserve actual quotation wording, punctuation, attribution and context. Adjust layout instead of silently cutting a quote to three lines. Excerpt only when authorized and without changing meaning; never invent a person, role or endorsement to improve the composition.

### 4.11 Theme Consistency
Maintain coherent semantic roles and contrast in the actual supported themes. Intentional section inversion, color blocking or a single-theme page is valid when it serves the brief/system. Do not add another theme or a toggle merely because this skill was loaded.

## 5. CONTEXT-AWARE PROACTIVITY

Use these only when the brief and actual component benefit. No dial value, tool availability or category label requires motion, glass or generated assets.

* **Glass/material:** use it for a real compositional purpose with legible contrast and a solid-fill fallback. Web approximations are not official Apple platform materials.
* **Continuous interactions:** use the existing motion/browser approach without unnecessary render work; retain keyboard/touch behavior and a reduced-motion alternative.
* **Motion:** tie animation to hierarchy, storytelling, feedback or state change. Do not add loops, physics, marquees or entry reveals just to satisfy a motion score. Preserve requested motion when feasible; report actual missing prerequisites rather than silently shrinking scope or inventing capability from a model label.
* **Choreography:** sticky stacks, horizontal pans and simple reveals are options, not a canonical solution for every page. Use native CSS where sufficient and introduce no animation dependency merely for a sketch.
* **Sketch applicability:** the React/GSAP/Motion snippets below illustrate API shapes and choreography, not universally tested drop-in components. Before adapting one, verify installed versions, changed content/resize behavior, lifecycle cleanup and reduced-motion/no-JavaScript readability. In particular, skipping a pan animation must not leave later content clipped offscreen, and reduced motion must preserve normal reading access. These sketches were not rendered or compiled as part of this source correction.

### 5.A Sticky-Stack - Illustrative React/GSAP Sketch

```tsx
"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

export function StickyStack({ cards }: { cards: React.ReactNode[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;
    const ctx = gsap.context(() => {
      const cardEls = gsap.utils.toArray<HTMLElement>(".stack-card");
      cardEls.forEach((card, i) => {
        if (i === cardEls.length - 1) return;
        ScrollTrigger.create({
          trigger: card,
          start: "top top",                              // pin at viewport top
          endTrigger: cardEls[cardEls.length - 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
        });
        gsap.to(card, {
          scale: 0.92,
          opacity: 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: cardEls[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <div ref={ref} className="relative">
      {cards.map((card, i) => (
        <div
          key={i}
          className="stack-card min-h-[100dvh] flex items-center justify-center"
        >
          {card}
        </div>
      ))}
    </div>
  );
}
```

Critical points: `start: "top top"`, `pin: true`, every card except the last is pinned, the scale/opacity transform is driven by the NEXT card's scroll trigger (so previous card shrinks as next one arrives).

### 5.B Horizontal-Pan - Illustrative React/GSAP Sketch

```tsx
"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

export function HorizontalPan({ children }: { children: React.ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !wrap.current || !track.current) return;
    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, track.current!.scrollWidth - wrap.current!.clientWidth);
      if (distance() === 0) return;
      gsap.set(wrap.current, { overflow: "hidden" });
      gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",                              // pin starts when section top hits viewport top
          end: () => `+=${distance()}`,                  // remeasure horizontal travel on refresh
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, wrap);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={wrap} tabIndex={0} aria-label="Scrollable content" className="relative overflow-x-auto">
      <div ref={track} className="flex h-[100dvh] items-center">
        {children}
      </div>
    </section>
  );
}
```

Critical points: `start: "top top"`, `pin: true`, a refresh-time travel measurement, and `scrub: 1`. The wrapper is clipped only while the animation is active; without scripting, with reduced motion, or with no overflow, native horizontal scrolling keeps the content reachable. Verify child sizing and keyboard/touch access in the actual composition.

### 5.C Scroll-Reveal Stagger - Illustrative React/Motion Sketch

For a requested entrance sequence in a compatible installed Motion project, `whileInView` can express the reveal without adding ScrollTrigger. Verify that real content remains accessible when motion is reduced or scripting fails.

```tsx
"use client";
import { motion, useReducedMotion } from "motion/react";

export function RevealStagger({ items }: { items: string[] }) {
  const reduce = useReducedMotion();
  return (
    <ul className="grid gap-6">
      {items.map((item, i) => (
        <motion.li
          key={item}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.6,
            delay: i * 0.06,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {item}
        </motion.li>
      ))}
    </ul>
  );
}
```

Use this for: feature lists, testimonial grids, logo walls, anything that just needs "enter on scroll." Save GSAP for actual pin/scrub work.

### 5.D Animation Engineering Checks

Avoid per-frame React state updates, unnecessary layout measurement and competing animation writers on the same properties. CSS timelines, IntersectionObserver, existing motion values and appropriately bounded event listeners are options; no browser API is categorically banned by taste.

Use layout transitions only for actual state changes. In React, verify the installed library's supported orchestration API and lifecycle cleanup; do not assume an old parameter or a component-tree restriction applies to every version. Follow [web motion guidance](../ui-web-motion/SKILL.md) for the relevant motion task.

## 6. PERFORMANCE & ACCESSIBILITY GUARDRAILS

### 6.A Animation Work
Prefer transform/opacity where they meet the effect, but choose from the real rendering costs rather than declaring every layout-affecting animation forbidden. Use `will-change` only when justified and profile relevant interactions on representative devices.

### 6.B Reduced Motion
Honor `prefers-reduced-motion` for every applicable animation, regardless of dial value. Disable or simplify nonessential spatial motion, loops, parallax and scroll-pinning while keeping all content and controls accessible. Test the actual reduced-motion layout; skipping an effect is not sufficient if CSS still clips or pins the content.

### 6.C Theme Applicability
Preserve the themes the product actually supports or the task requests. Do not create a second theme or toggle merely because a page is consumer-facing. Verify contrast, focus and states in the applicable themes.

### 6.D Core Web Vitals Targets
The [Web Vitals reference](https://web.dev/articles/vitals) gives “good” boundary targets of LCP ≤2.5s, INP ≤200ms and CLS ≤0.1, evaluated at the 75th percentile of page loads and segmented by mobile/desktop. These are targets, not observed results or automatic performance/compliance certification. Record actual tools, environment, scope and measurements when checked; otherwise say unmeasured. Lab results are not a substitute for field evidence, and a Lighthouse score alone does not establish INP.

Use suitable image/font loading and reserve layout space in the real framework. Run available authorized profiling/Lighthouse checks when relevant; absence of a particular tool is a verification limit, not permission to install it or fabricate a passing result.

### 6.E DOM and Asset Cost
Inspect actual paint, compositing, allocation and bundle costs before claiming an effect or library is too expensive. Avoid unnecessary filters, layers, subscriptions and offscreen work. Lazy loading depends on the content and critical path; no unmeasured speed/FPS claim follows from a CSS recipe.

### 6.F Layering
Reuse the existing layer/token system for sticky navigation, dialogs and overlays. Do not create a new constants file merely to satisfy this skill. Verify focus, pointer and scroll behavior at actual overlap boundaries.

## 7. DIAL DEFINITIONS

These are qualitative vocabulary, not engineering measurements or automatic feature requirements.

### DESIGN_VARIANCE (Level 1-10)
Lower values describe more regular alignment; middle values describe deliberate offsets and varied proportions; higher values describe stronger asymmetry. The actual content and reading order must still work on the relevant viewports. No number requires a masonry layout, large whitespace or a fixed mobile breakpoint.

### MOTION_INTENSITY (Level 1-10)
Lower values describe mostly static interaction; middle values describe restrained transitions; higher values describe more prominent choreography. All applicable motion honors user preferences and task scope. A number never forces a library, scroll hijack or background animation.

### VISUAL_DENSITY (Level 1-10)
Lower values describe more open grouping; middle values more information per region; higher values tighter grouping. Readability and the actual task decide. Monospace numbers, cards and dividers are choices, not mandatory consequences.

## 8. THEME PROTOCOL

Use this branch only for themes within the current interface/task. Preserve an intentional single-theme design; existing multi-theme systems retain their supported modes.

### 8.A Tokens
Reuse the actual semantic token/theme mechanism. Tailwind `dark:` variants and CSS variables are options only where compatible; do not impose a new framework or token layer.

### 8.B Color and Hierarchy
Check applicable contrast, state distinctions, focus and hierarchy in each supported theme. Retain pinned brand colors and meaningful semantic roles. Pure black/white, inverted sections and multiple accents are not automatically wrong.

### 8.C Mode Selection
Respect the product's existing user/system preference behavior. Add or change a theme toggle only within scope.

### 8.D Verification
Inspect the applicable themes and actual states through permitted rendered tools. Report uninspected themes and unavailable visual evidence rather than claiming a pass.

## 9. DESIGN REVIEW HEURISTICS

These prompts identify concrete content or interaction problems, not authorship signatures. No unsupported “most-tested,” production-frequency or model-quality ranking is asserted.

### 9.A Visual Effects
Question effects that obscure content, compete for attention or impair input/accessibility. Keep requested visual expression when it works; verify rather than banning a color, cursor or medium by category.

### 9.B Typography
Check actual hierarchy, wrapping, clipping, font loading and legibility. Preserve specified faces and scripts; no font proves generic or AI-authored work.

### 9.C Structure
Inspect whether repeated cards, grids, labels, lists or section patterns serve their content. Consistency and repetition can be useful; novelty alone is not a reason to replace them.

### 9.D Content and Data
Preserve real names, brand terms, measured values and supplied claims. Never replace them with more “organic” invented data. Authorized synthetic examples must be clear to the audience and must not imply real endorsement, availability or behavior.

### 9.E Assets and Components
Use actual available assets and compatible components. Verify external resources only within authority. Do not substitute random photography, fabricated screenshots or a new dependency for a missing requirement; follow Section 4.8's evidence and blocker boundaries.

### 9.F Labels and Decorative Detail
Keep version labels, pagination, section numbers, locale, captions, photo credits and status indicators when they carry real information or the brief requests them. Remove only authorized, demonstrably unhelpful clutter; do not invent timestamps, stock levels or provenance.

### 9.G Copy Fidelity
Preserve supplied punctuation, quotations, dates, units, attribution and meaning. Em/en dashes are valid typography, not failure conditions or authorship proof. Use the artifact's language and house style; editing beyond the requested visual scope requires authority.

## 10. REFERENCE VOCABULARY (Pattern Names the Agent Should Know)

This is a vocabulary of visual/interaction patterns, not a bundled component library. Use a pattern only when it serves the brief and platform. No unprovided implementation or future block catalog is promised; verify any selected technique in the actual project.

### Hero Paradigms
* **Asymmetric Split Hero** - Text on one side, asset on the other, generous white space.
* **Editorial Manifesto Hero** - Large type, no asset, almost-poster.
* **Video / Media Mask Hero** - Type cut out as mask over video background.
* **Kinetic-Type Hero** - Animated typography as the primary visual.
* **Curtain-Reveal Hero** - Hero parts on scroll like a curtain.
* **Scroll-Pinned Hero** - Hero stays pinned while content scrolls behind.

### Navigation & Menus
* **Mac OS Dock Magnification** - Edge nav, icons scale fluidly on hover.
* **Magnetic Button** - Pulls toward cursor.
* **Gooey Menu** - Sub-items detach like viscous liquid.
* **Dynamic Island** - Morphing pill for status / alerts.
* **Contextual Radial Menu** - Circular menu expanding at click point.
* **Floating Speed Dial** - FAB springing into curved secondary actions.
* **Mega Menu Reveal** - Full-screen dropdown, stagger-fade content.

### Layout & Grids
* **Bento Grid** - Asymmetric tile grouping (Apple Control Center).
* **Masonry Layout** - Staggered grid, no fixed row height.
* **Chroma Grid** - Borders / tiles with subtle animating gradients.
* **Split-Screen Scroll** - Two halves sliding in opposite directions.
* **Sticky-Stack Sections** - Sections that pin and stack on scroll.

### Cards & Containers
* **Parallax Tilt Card** - 3D tilt tracking mouse coordinates.
* **Spotlight Border Card** - Borders illuminate under cursor.
* **Glassmorphism Panel** - Frosted glass with inner refraction.
* **Holographic Foil Card** - Iridescent rainbow shift on hover.
* **Tinder Swipe Stack** - Physical card stack, swipe-away.
* **Morphing Modal** - Button expands into its own dialog.

### Scroll Animations
* **Sticky Scroll Stack** - Cards stick and physically stack.
* **Horizontal Scroll Hijack** - Vertical scroll → horizontal pan.
* **Locomotive / Sequence Scroll** - Video / 3D sequence tied to scrollbar.
* **Zoom Parallax** - Central background image zooming on scroll.
* **Scroll Progress Path** - SVG line drawing along scroll.
* **Liquid Swipe Transition** - Page transition like viscous liquid.

### Galleries & Media
* **Dome Gallery** - 3D panoramic gallery.
* **Coverflow Carousel** - 3D carousel with angled edges.
* **Drag-to-Pan Grid** - Boundless draggable canvas.
* **Accordion Image Slider** - Narrow strips expanding on hover.
* **Hover Image Trail** - Mouse leaves popping image trail.
* **Glitch Effect Image** - RGB-channel shift on hover.

### Typography & Text
* **Kinetic Marquee** - Endless text bands reversing on scroll.
* **Text Mask Reveal** - Massive type as transparent window to video.
* **Text Scramble Effect** - Matrix-style decoding on load / hover.
* **Circular Text Path** - Text curving along spinning circle.
* **Gradient Stroke Animation** - Outlined text with running gradient.
* **Kinetic Typography Grid** - Letters dodging the cursor.

### Micro-Interactions & Effects
* **Particle Explosion Button** - CTA shatters into particles on success.
* **Liquid Pull-to-Refresh** - Reload indicator like detaching droplets.
* **Skeleton Shimmer** - Shifting light reflection across placeholders.
* **Directional Hover-Aware Button** - Fill enters from cursor's exact side.
* **Ripple Click Effect** - Wave from click coordinates.
* **Animated SVG Line Drawing** - Vectors drawing themselves in real time.
* **Mesh Gradient Background** - Organic lava-lamp blobs.
* **Lens Blur Depth** - Background UI blurred to focus foreground action.

### Animation Library Choice
Use the project's supported approach. Motion can suit component/state transitions; GSAP/ScrollTrigger can suit a selected pinned sequence; Three.js/WebGL can suit requested canvas/3D work. They are options, not automatic dependencies. Different libraries may coexist when they do not compete for the same properties and their lifecycle/performance behavior is verified.


---

## 11. REDESIGN PROTOCOL

### 11.A Establish the Mode
Distinguish a new surface, a scoped refinement preserving the incumbent, and an explicitly requested visual overhaul. A missing design file does not make an existing interface greenfield. Ask only when this materially unresolved choice changes the work.

### 11.B Inspect Before Changing
Inspect existing brand tokens, page structure, content, signatures, accessibility, behavior and affected routes. Record observations in the requested response/artifact; do not create an audit document or design record merely to begin. For relevant SEO changes, preserve observed routes, metadata and structured data; no unsupported universal risk ranking is implied.

### 11.C Preservation
Preserve copy voice, actual values, navigation, identifiers, analytics events, forms, legal/consent content, brand assets and accessibility unless the request authorizes their bounded change. A redesign request is not blanket authority for unrelated content or backend changes. Resolve material consequences before dependent action without re-asking for an already authorized exact change.

### 11.D Choose the Proportionate Intervention
Use typography, spacing, hierarchy, color roles, grouping, responsive behavior and selected interactions according to the actual problem. Do not automatically desaturate a brand, increase motion or replace every block. Stop when the requested acceptance criteria are met and verified, not after a prescribed lever count.

### 11.E Evolution Versus Replacement
When the existing structure and behavior work, prefer a targeted correction. A structural defect warrants its necessary repair, not automatically a full redesign. An explicitly selected new brand world can replace the authorized visual system while preserving required content and function. No percentage of value, cost or risk is claimed without evidence.

## 12. AVAILABLE REFERENCE MATERIAL

Section 10 supplies pattern names; Section 5 contains conditional technical sketches, and the appendices contain package/doc lookup examples and a labeled material approximation. This package does not bundle a block/component library. Do not claim unavailable components exist, create a catalog to fill that gap, or promise future implementations as part of the current deliverable.

## 13. OUT OF SCOPE

This skill is not the workflow owner for dashboards/dense product UI, data tables, multi-step forms, code editors, native mobile or realtime collaboration.

Use the actual applicable UI/platform owner and incumbent stack for those tasks. Mention the mismatch only when useful; do not prescribe a new table/editor/component dependency merely to route the request. Apply this skill's selective guidance only to relevant marketing/portfolio surfaces.

## 14. FINAL VERIFICATION

Check what the requested change actually needs. Read-only critique returns findings and limits; an implementation request also requires proportionate functional and rendered evidence.

- **Authority and preservation:** the real stack, design system, supplied content, identifiers and out-of-scope behavior are preserved; any new dependency, asset generation or service use was within authority.
- **Product truth:** quotations, claims, logos, customer relationships and metrics have actual evidence; authorized synthetic material is visibly distinguished where necessary.
- **Rendered layout:** inspect actual content, wrapping/clipping, navigation, responsive behavior and applicable themes at relevant viewports.
- **Interaction/accessibility:** exercise changed controls and applicable loading/error/empty/focus states, keyboard/input paths, contrast and reduced-motion behavior.
- **Technical behavior:** verify relevant APIs, lifecycle cleanup and performance in the actual stack; treat example sketches as references, not proof.
- **Evidence:** distinguish measured results, stated targets, unrun checks, missing assets and unavailable methods. A plausible Core Web Vitals value or a ticked style quota is not observed verification.

Correct material failures within scope and verify the changed path. If a prerequisite prevents completion, state the exact remaining requirement and what evidence is missing; finish independent authorized work without hiding gaps or claiming the entire deliverable done. Do not add a fixed style/dial report when the user requested another format.

# APPENDICES - Real Source-Backed Reference Material

The appendices retain package-command examples, official documentation links and a labeled web-material sketch from the expanded local artifact. They are lookup material, not verified current APIs, legal adoption requirements, ready-to-run project setup or permission to execute installers. Check actual versions, licensing, platform support and user authority before use.

## Appendix A - Install Commands per Design System

```bash
# Material Web (Material 3)
npm install @material/web

# Fluent UI React (v9)
npm install @fluentui/react-components

# Fluent UI Web Components (framework-free)
npm install @fluentui/web-components @fluentui/tokens

# IBM Carbon
npm install @carbon/react @carbon/styles

# Radix Themes
npm install @radix-ui/themes

# shadcn/ui (open code, owned components)
npx shadcn@latest init
npx shadcn@latest add button card badge separator input

# Primer CSS (GitHub product/devtool UI)
npm install --save @primer/css

# Primer Brand (GitHub marketing UI)
npm install @primer/react-brand

# GOV.UK Frontend
npm install govuk-frontend

# USWDS (US Web Design System)
npm install uswds

# Atlassian Design System (Atlaskit)
yarn add @atlaskit/css-reset @atlaskit/tokens @atlaskit/button @atlaskit/badge @atlaskit/section-message @atlaskit/card

# Bootstrap 5.3
npm install bootstrap

# Shopify Polaris Web Components (Shopify apps only)
# Add this to your app HTML head:
#   <meta name="shopify-api-key" content="%SHOPIFY_API_KEY%" />
#   <script src="https://cdn.shopify.com/shopifycloud/polaris.js"></script>
```

## Appendix B - Canonical Sources (read these before reinventing)

### Material Web
- https://github.com/material-components/material-web
- https://material-web.dev/theming/material-theming/
- https://m3.material.io/develop/web

### Fluent UI
- https://fluent2.microsoft.design/get-started/develop
- https://fluent2.microsoft.design/components/web/react/
- https://github.com/microsoft/fluentui
- https://learn.microsoft.com/en-us/fluent-ui/web-components/

### Carbon
- https://carbondesignsystem.com/
- https://github.com/carbon-design-system/carbon
- https://carbondesignsystem.com/developing/react-tutorial/overview/
- https://carbondesignsystem.com/developing/web-components-tutorial/overview/

### Shopify Polaris
- https://shopify.dev/docs/api/app-home/web-components
- https://github.com/Shopify/polaris-react
- https://polaris-react.shopify.com/components

### Atlassian
- https://atlassian.design/get-started/develop
- https://atlassian.design/components/button/examples
- https://atlaskit.atlassian.com/packages/design-system/button/example/disabled
- https://atlassian.design/tokens/design-tokens

### Primer
- https://primer.style/
- https://github.com/primer/css
- https://github.com/primer/brand

### GOV.UK
- https://design-system.service.gov.uk/components/button/
- https://design-system.service.gov.uk/styles/layout/
- https://github.com/alphagov/govuk-frontend

### USWDS
- https://designsystem.digital.gov/documentation/developers/
- https://designsystem.digital.gov/components/button/
- https://designsystem.digital.gov/components/card/
- https://github.com/uswds/uswds

### Bootstrap
- https://getbootstrap.com/docs/5.3/layout/grid/
- https://getbootstrap.com/docs/5.3/components/card/

### Tailwind
- https://tailwindcss.com/docs/dark-mode
- https://tailwindcss.com/blog/tailwindcss-v4

### Radix
- https://www.radix-ui.com/themes/docs/components/theme
- https://www.radix-ui.com/themes/docs/components/card
- https://github.com/radix-ui/themes

### shadcn/ui
- https://ui.shadcn.com/docs
- https://ui.shadcn.com/docs/components/card
- https://github.com/shadcn-ui/ui

### Native CSS / W3C standards
- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter
- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-color-scheme
- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion
- https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout
- https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations
- https://drafts.csswg.org/scroll-animations-1/

### Apple Liquid Glass (Apple platforms only)
- https://developer.apple.com/design/human-interface-guidelines/materials
- https://developer.apple.com/documentation/TechnologyOverviews/liquid-glass
- https://developer.apple.com/documentation/TechnologyOverviews/adopting-liquid-glass
- https://developer.apple.com/documentation/SwiftUI/Material

---

## Appendix C - Apple Liquid Glass: Honest Web Approximation

Do **not** treat random CSS snippets as official Apple Liquid Glass.

### What is official
Apple documents Liquid Glass inside Apple's Human Interface Guidelines and Developer Documentation for **Apple platforms**. It is a dynamic material used across Apple platform UI. Apple's native implementation belongs to Apple platform APIs and system components, **not a public web CSS package**.

Relevant official docs:
- Apple Human Interface Guidelines → Materials
- Apple Developer Documentation → Liquid Glass
- Apple Developer Documentation → Adopting Liquid Glass
- SwiftUI → Material

### What is NOT official
There is no `liquid-glass.css` from Apple for normal websites.

A web approximation can use:
- `backdrop-filter`
- transparent backgrounds
- layered borders
- highlight overlays
- gradients
- motion
- strong contrast fallbacks

But that is **web glassmorphism / frosted-glass approximation**, not official Apple Liquid Glass. Label it as such in comments.

### Safer web approximation skeleton

```css
.liquid-glass-web-approx {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  border-radius: 999px;
  border: 1px solid rgb(255 255 255 / .32);
  background:
    linear-gradient(135deg, rgb(255 255 255 / .30), rgb(255 255 255 / .08)),
    rgb(255 255 255 / .12);
  backdrop-filter: blur(24px) saturate(180%) contrast(1.05);
  -webkit-backdrop-filter: blur(24px) saturate(180%) contrast(1.05);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / .48),
    inset 0 -1px 0 rgb(255 255 255 / .12),
    0 18px 60px rgb(0 0 0 / .18);
}

.liquid-glass-web-approx::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background:
    radial-gradient(circle at 20% 0%, rgb(255 255 255 / .55), transparent 34%),
    linear-gradient(90deg, rgb(255 255 255 / .18), transparent 42%, rgb(255 255 255 / .14));
  pointer-events: none;
}

.liquid-glass-web-approx::after {
  content: "";
  position: absolute;
  inset: 1px;
  border-radius: inherit;
  border: 1px solid rgb(255 255 255 / .14);
  pointer-events: none;
}

@media (prefers-color-scheme: dark) {
  .liquid-glass-web-approx {
    border-color: rgb(255 255 255 / .18);
    background:
      linear-gradient(135deg, rgb(255 255 255 / .16), rgb(255 255 255 / .04)),
      rgb(15 23 42 / .42);
    box-shadow:
      inset 0 1px 0 rgb(255 255 255 / .22),
      0 18px 60px rgb(0 0 0 / .42);
  }
}

@media (prefers-reduced-transparency: reduce) {
  .liquid-glass-web-approx {
    background: rgb(255 255 255 / .96);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}
```

**Important:** `prefers-reduced-transparency` has uneven browser support; test it. Always provide enough contrast even without blur.

---

**End of appendices.** The Apple Liquid Glass skeleton is a labeled web approximation, not an Apple-issued package or a tested guarantee of accessibility/performance. Use the relevant system's current official documentation and actual project evidence before adapting an example.
