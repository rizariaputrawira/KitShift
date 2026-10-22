# Worst-Case Catalog

Clearly labeled synthetic candidate inputs, grouped by rendered value. They are not real identities, production measurements, or guaranteed defects. Use only cases applicable to the inspected contract; keep baseline and named independent variations, and label loading/error/fault cases separately from accepted records.

Use reserved documentation/test domains for email/URL examples, and controlled local assets for image/link behavior. Reserved names reduce identity collisions; they do not guarantee that no network request or delivery can occur. Do not send messages or trigger real backend effects from fixtures. [RFC 2606](https://www.rfc-editor.org/rfc/rfc2606) names the reserved domains.

The notes describe possible checks, not fixes to apply or evidence that a case broke. Preserve valid existing naming, formatting, layout, and date policies.

---

## People and names

| Synthetic value | Candidate check / possible consequence |
| --- | --- |
| `Aleksandra Wiśniewska-Kowalczyk` | Long, hyphenated, diacritics; wraps to two lines, and the hyphen is a line-break point |
| `Christopher Alexander Montgomery III` | Suffix and long-name policy; `CI` may be correct or incorrect according to the app's initials contract |
| `Konstantin Oberhauser-Wettstein` | Long and compound; overflows single-line rows |
| `Jo` | Short mononym; inspect alignment and the documented initials policy (`J` is not inherently wrong) |
| `J` | One letter; single-character initials, very short click target if the name is the link |
| `Ólafur Darri Ólafsson` | Leading accented capital; uppercase/sort logic, initials `ÓÓ` |
| `Đặng Thị Ngọc Hân` | Stacked Vietnamese diacritics; clipped by tight `line-height` + `overflow: hidden` |
| `王秀英` | CJK, no spaces; "first + last word" initials logic finds one word, and CJK breaks anywhere |
| `نور الهدى عبد الرحمن` | RTL content, punctuation, icon ordering, and the product's direction/isolation policy |
| `Seán O'Brien-Ó Súilleabháin` | Apostrophe and accents; escaping, initials, search |
| `María José de la Cruz y Fernández` | Lowercase particles; initials `Md` or `MF`, sorting by "last name" |
| `dana` | Lowercase name; preserve the app's intentional display/initials policy rather than forcing capitalization |
| `🦊 Fox` | Emoji first; `.charAt(0)` returns half a surrogate pair (`�`) |
| `👩🏽‍💻 Priya` | ZWJ emoji sequence; `.length` is 7+, slicing breaks it into pieces |
| `  Sam   Lee ` | Leading, trailing, and repeated spaces; initials from empty words, odd gaps |
| *(missing)* | Missing-name fallback only where the record contract permits it; otherwise label rejection/fault coverage |

## Emails, URLs, identifiers

Strings without spaces can stress line breaking, truncation, and available width; punctuation, browser rules, and existing CSS can still provide break opportunities.

| Synthetic value | Candidate check / possible consequence |
| --- | --- |
| `bartholomew.fitzgerald@northwind-industries-holdings.example.com` | Long reserved-domain address; inspect wrapping/truncation and sibling controls |
| `a@b.test` | Short synthetic address, not a claim about the shortest possible accepted email |
| `first.last+billing-notifications@example.com` | Plus-addressing, accepted syntax, and full-value recovery |
| `ops@sub.department.region.example.test` | Multiple hostname labels and domain extraction; this is not a multi-part public-suffix test |
| `https://example.com/workspaces/acme/projects/q3-launch/docs/9f8e7d6c5b4a?tab=comments&filter=unresolved` | Long URL; overflow, and end-truncation hides the part that differs |
| `9f8e7d6c-5b4a-4c3d-8e2f-1a0b9c8d7e6f` | UUID; monospace width, middle-truncation candidate |
| `Q3 Board Deck — FINAL (revised) v12 [approved by legal].pdf` | File name; end-truncation hides the version and extension, brackets and dashes in paths |
| `IMG_20250914_183022_HDR_portrait_edited_edited.HEIC` | Camera file name; unbreakable, uppercase extension |
| `@a` / `@thisisaverylongusernamethatisallowed` | Handle extremes |

For public-suffix-specific parsing, use an authorized offline parser/test fixture that covers its actual suffix rules; do not infer those rules from a multi-label `.test` address or contact an unrelated live domain.

## Labels, titles, and copy from data

| Synthetic value | Candidate check / possible consequence |
| --- | --- |
| `Senior Product Design Engineer, Platform Infrastructure` | Long job title; wraps to three lines in a secondary slot |
| `Invitation expired 12 days ago` | Long status badge; badge wraps or squeezes the name column |
| `Benachrichtigungseinstellungen` | German compound; measure its actual width with the product's font/container rather than assuming a fixed character count proves overflow |
| `Paramètres de confidentialité et de sécurité` | A localized expansion candidate; not a universal translation-length percentage |
| Twelve tags on one item: `design`, `frontend`, `q3`, `urgent`, `needs-review`, … | Inspect wrapping, available space, and the app's chosen overflow/disclosure policy |
| A tag named `customer-feedback-from-enterprise-onboarding` | One tag wider than its container |
| `Untitled` / empty string / `   ` | Title missing; collapsed heading, zero-height row |
| `<script>alert(1)</script>` / `&amp;` / `**bold**` | In a plain-text contract these must remain inert literal content. For explicitly supported rich text, test the existing approved parser/sanitizer contract separately; do not execute the sample or enable HTML to “fix” literal display |
| `Line one` + newline + `Line two` | Newline in a single-line field; doubles row height or is silently dropped |
| A 2,000-character pasted description | Use only if accepted by the relevant path, or label a rejection test; inspect previews, full-value recovery, and editor growth |

## Numbers and money

| Synthetic value | Candidate check / possible consequence |
| --- | --- |
| `0` | Zero states: "0 members", empty progress bar, division by zero in percentages |
| `1` | Plurals: "1 members", "1 days ago" |
| `1284` | Product/locale-specific grouping and available width; an ungrouped display is not automatically incorrect |
| `1000000` | Width of the count badge; consider compact form `1M` where precision doesn't matter |
| `12345678.9` as currency | `$12,345,678.90`; overflows totals columns |
| `-42.5` | Negative sign, red color logic, parentheses in accounting formats |
| `0.1 + 0.2` | `0.30000000000000004` rendered raw |
| `142%` / `-3%` | Progress bars and meters past their bounds |
| `null` / `undefined` / `NaN` | Use only where the actual optional/derived-state contract allows it, or as explicit fault coverage. JSON does not transmit `undefined`/`NaN` as those values; do not call them valid API records without evidence |
| `1.284` in `de-DE` vs `1,284` in `en-US` | Inspect locale-sensitive formatting and interpretation rather than assuming one separator policy |
| A value that changes live (`99` → `100`) | Check whether width/figure changes actually impair the layout before prescribing tabular figures |

## Collections

| Synthetic state | Candidate check / possible consequence |
| --- | --- |
| 0 items | The empty state, and whether one exists at all |
| 1 item | Inspect the intended single-item layout and pagination/count copy; one card is not inherently broken |
| Exactly page size, and page size + 1 | Off-by-one in "Showing 40 of 40", pagination that shows an empty page 2 |
| 1,000+ items, where the contract allows them | Measure representative scrolling, rendering, fetching, updates, and memory before diagnosing a bottleneck or choosing pagination/virtualization |
| One item 10× the size of the others | Masonry and grid rows stretching to the tallest item |
| Items with identical names | Lists where the name is the only distinguishing field |

## Time

| Synthetic value | Candidate check / possible consequence |
| --- | --- |
| Now | Product/locale-specific wording such as “just now” or “0 seconds ago”; either may be intentional |
| 12 days ago, 11 months ago, 3 years ago | Test the actual relative/absolute-date policy and boundary behavior, not an invented universal cutoff |
| A future date | "in 3 days" vs "-3 days ago" |
| `1970-01-01` | A legitimate epoch date unless the actual data contract uses it as a missing-value sentinel; do not hide valid dates |
| `2025-12-31T23:30:00-08:00` | Shows as a different day in UTC and the user's timezone |
| Very long duration (`1,284 hours`) | Duration formatting that never rolls up to days |

Reuse the app's supported date/i18n layer, including `Intl.RelativeTimeFormat` and `Intl.DateTimeFormat` where appropriate. State the locale, timezone, and actual reference time used; do not silently change product wording or thresholds.

## Images and media

| Synthetic asset/state | Candidate check / possible consequence |
| --- | --- |
| Controlled local avatar URL that returns 404 | Missing-image behavior without contacting a real account or external service |
| No avatar at all | The fallback itself: initials, color, size parity with real avatars |
| 4000×200 panorama as avatar or cover | Distortion without `object-fit: cover` |
| 200×4000 tall image | Same, other axis; can also blow out a card's height |
| Transparent PNG logo, dark logo on dark mode | Invisible on the background |
| Slow-loading image | Layout shift without fixed dimensions or `aspect-ratio` |

## States

| Authorized test state | Candidate check / possible consequence |
| --- | --- |
| Loading | Skeletons that don't match final layout, spinners that shift content |
| Error from the API | No error state, or a raw error message (`TypeError: Cannot read properties of undefined`) |
| Partial data | Some optional fields filled, others not, in the same list; misaligned rows |
| Applicable statuses in one list | Only enum values actually accepted for that surface; do not add `suspended` or another state merely because it appears in an example |
| No permission | Disabled actions; does the row still lay out the same? |
| The current user in the list | "You" labels, actions that shouldn't apply to yourself |

## Environment

Use the environments relevant to the actual product and case. Change one at a time for diagnosis where useful; named combined cases need a reason. Viewport emulation alone is not physical-touch, screen-reader, or real-device proof.

| Test condition | Candidate check / possible consequence |
| --- | --- |
| Container at 320px, when relevant | Exercise actual overflow/accessibility conditions; this is not a universal supported-width requirement |
| Narrow sidebar placement | Components designed full-width, reused in a 280px column |
| 2560px wide | Lines too long to read, content stranded on one side |
| Browser zoom 200% / large text setting | Fixed heights that clip growing text |
| Dark mode | Hardcoded colors, invisible borders and logos |
| `dir="rtl"` | Icons, chevrons, padding, and the order of trailing actions |
| Touch device | Hover-only actions (the ••• that appears on hover) are unreachable |
