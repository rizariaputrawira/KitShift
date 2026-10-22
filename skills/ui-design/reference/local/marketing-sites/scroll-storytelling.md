# Purposeful scroll storytelling

Scroll-linked motion is an optional compositional technique, not a requirement for marketing pages. Consider it only when a real sequence, comparison, or spatial relationship becomes clearer through scrolling and the user has requested or accepted that treatment. Static content must remain understandable and usable.

## Select with purpose

Pinning can hold a relevant heading or context while associated content progresses. Scrubbing can tie a restrained visual transition to scroll position. A stack can communicate a real sequence of artifacts or stages. Each technique needs content that supports its relationship; do not add pins, reveals, stacks, parallax, horizontal scroll, or staged imagery merely to make a page feel animated. Never invent content or assets to populate the sequence.

Keep reading order and access to all content intact without motion. Avoid trapping or hijacking ordinary scrolling, obstructing navigation, hiding information behind progress, or using overflow clipping to cover an implementation defect. Ensure the page works with keyboard, touch, zoom, narrow viewports, and reduced-motion preferences. Reduced-motion behavior should present the content without depending on the scroll effect; do not automatically replace it with another animation.

## Implementation and proof boundary

Before implementation, inspect the actual project and confirm that the required motion library and plugins are already installed and permitted. GSAP/ScrollTrigger examples are techniques, not a dependency mandate. Do not add packages, remote assets, or services without authorization. Low-level construction, lifecycle cleanup, performance, and motion implementation belong to `skill://ui-web-motion/references/build.md`.

Test the implemented behavior in a real browser at relevant viewport sizes, including reduced-motion settings and the ordinary scroll path. Check pin spacing, content reachability, focus/navigation access, and whether the effect degrades to a coherent static presentation. Source inspection alone is not browser proof. If browser or device testing is unavailable, state that explicitly and do not claim the effect works or feels correct.
