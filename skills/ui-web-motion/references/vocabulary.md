# Animation vocabulary

Independently authored definitions of common technical terms, preserving the legacy glossary's full term coverage without reproducing its prose. Naming is report-only: no implementation or plan writes.

## Naming procedure

Read the described behavior and context, not just a keyword. Lead with the best matching term and its definition. If needed, give one or two alternatives and explain the distinction. Label an approximate match; do not invent a supposedly established term. Return only naming/disambiguation unless more was requested.

A popover growing from its trigger is **Origin-aware animation**, not necessarily **Pop in**: the former describes the origin, the latter an overshooting entrance. Two images fading in place use **Crossfade**; a changing shape may **Morph**; an identity moving between layouts is a **Shared element transition**. Resistance beyond a scroll/drag boundary is **Rubber-banding**.

## Entrances and exits

- **Fade in / Fade out**: Appearance or disappearance through opacity change.
- **Slide in**: An entrance involving translation from outside the destination.
- **Scale in**: An entrance that increases an element's scale to its settled size.
- **Pop in**: An entrance with a small overshoot before settling.
- **Reveal**: Progressive exposure of previously concealed content.
- **Enter / Exit**: Motion associated with an element joining or leaving a rendered state.

## Sequencing and timing

- **Keyframes**: Specified intermediate states along an animation timeline.
- **Interpolation / Tween**: Calculation of intermediate values between specified states.
- **Stagger**: Offset start times across a group of animated elements.
- **Orchestration**: Coordination of several motion sequences as one interaction.
- **Delay**: Waiting interval before a sequence begins.
- **Duration**: Time allocated to a sequence.
- **Fill mode**: Whether animation styling applies before or after its active interval.
- **Stepped animation**: Discrete rather than continuously interpolated visual changes.

## Movement and transforms

- **Translate**: Position change along one or more axes.
- **Scale**: Size transformation relative to an origin.
- **Rotate**: Angular transformation around an origin or axis.
- **Skew**: Shearing transformation that changes angles between axes.
- **3D tilt / Flip**: Orientation change in three dimensions, often exposing another face.
- **Perspective**: Projection controlling the apparent depth of three-dimensional transforms.
- **Transform origin**: Reference point around which a transformation operates.
- **Origin-aware animation**: Motion whose origin corresponds to its trigger or spatial source.

## State transitions

- **Crossfade**: One visual state loses opacity while another gains it in the same area.
- **Continuity transition**: A state change preserving a visible spatial/identity connection.
- **Morph**: Continuous transformation between shapes or forms.
- **Shared element transition**: One identifiable element connects its old and new positions/forms.
- **Layout animation**: Interpolated movement or resizing caused by a layout change.
- **Accordion / Collapse**: Expansion or contraction of a content region.
- **Direction-aware transition**: Transition direction reflects forward/backward movement or ordering.

## Scroll

- **Scroll reveal**: Appearance activated when content enters a scroll viewport region.
- **Scroll-driven animation**: Progress determined by scroll position rather than elapsed time alone.
- **Parallax**: Different apparent movement rates across visual depth layers.
- **Page transition**: Motion connecting navigation between pages or routes.
- **View transition**: A browser-supported visual connection between captured old/new view states.

## Feedback and interaction

- **Hover effect**: Visual response to a pointer hovering over a target.
- **Press / Tap feedback**: Visible acknowledgement of an activation, with or without movement.
- **Hold to confirm**: Confirmation requiring sustained activation, often with progress feedback.
- **Drag**: Direct manipulation following pointer or touch movement.
- **Drag to reorder**: Direct manipulation that changes item order.
- **Swipe to dismiss**: Directional gesture removing or closing a surface.
- **Rubber-banding**: Increasing resistance beyond a boundary followed by return toward it.
- **Shake / Wiggle**: Short alternating movement, sometimes used as error feedback.
- **Ripple**: Expanding visual feedback around an activation location.

## Easing

- **Easing**: Mapping of timeline progress to value progress.
- **Ease-out**: Faster initial progress followed by deceleration.
- **Ease-in**: Slow initial progress followed by acceleration.
- **Ease-in-out**: Acceleration followed by deceleration.
- **Linear**: Constant progress rate.
- **Cubic-bezier**: A parametric curve often used to describe easing.
- **Asymmetric easing**: Unequal acceleration/deceleration portions of a motion curve.

## Springs

- **Spring**: Motion governed by a spring-like dynamic system.
- **Stiffness / Tension**: Strength of the restoring force toward a target.
- **Damping**: Resistance that dissipates oscillation energy.
- **Mass**: Inertia parameter influencing response to force.
- **Bounce**: Overshoot and return around a settled target.
- **Perceptual duration**: Approximate time until motion appears settled to an observer.
- **Momentum**: Persistence of motion associated with velocity and inertia.
- **Velocity**: Rate and direction of position change.
- **Interruptible animation**: Motion able to respond to a new target before completion.

## Loops and ambient motion

- **Marquee**: Repeated scrolling presentation of content.
- **Loop**: Repetition of an animation sequence.
- **Alternate (yoyo)**: Alternating forward and backward playback.
- **Orbit**: Movement around a center or another element.
- **Pulse**: Repeated increase/decrease of a visual property.
- **Float**: Gentle drifting movement suggesting suspension.
- **Idle animation**: Motion occurring without current user interaction.

## Effects and detail

- **Blur**: Softening of image detail through filtering.
- **Clip-path**: Geometric boundary determining which parts of an element are visible.
- **Mask**: Visibility control through an image or alpha/luminance pattern, including soft edges.
- **Before / after slider**: A draggable boundary comparing two aligned visual states.
- **Line drawing**: Progressive display of a path or stroke.
- **Text morph**: Animated transformation between text states.
- **Skeleton / Shimmer**: Loading structure or moving highlight indicating pending content.
- **Number ticker**: Animated transition between numeric displays.
- **Tabular numbers**: Equal-width numeric glyphs that stabilize changing values.
- **Typewriter**: Sequential character appearance resembling typed input.

## Performance

- **Frame rate (FPS)**: Number of displayed frames per second.
- **Jank**: Perceptible irregularity in visual update timing.
- **Dropped frame**: A missed rendering/presentation deadline.
- **Compositing**: Combining rendered layers into a final frame.
- **will-change**: Browser hint about an anticipated property change; not a guarantee of promotion.
- **Layout thrashing**: Repeated forced layout, commonly from interleaved DOM reads and writes.

## Principles

- **Purposeful animation**: Motion justified by a user or communication need.
- **Anticipation**: Preparatory movement preceding a main action.
- **Follow-through**: Continued settling movement after the main action.
- **Squash & stretch**: Shape deformation suggesting flexibility or weight.
- **Perceived performance**: How responsive a system seems, distinct from measured execution time.
- **Frequency of use**: How often an interaction is encountered, informing motion restraint.
- **Spatial consistency**: Preservation of coherent spatial relationships across states.
- **Hardware acceleration**: Rendering work performed with hardware support; property choice alone does not guarantee it.
- **Reduced motion**: User preference accommodated through less movement or no-motion alternatives.
