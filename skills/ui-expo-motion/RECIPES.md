# Expo Animation Recipes

Integration fragments for an existing React Native app, not a complete runnable application. Read the [task, compatibility, and verification boundaries](SKILL.md) first. Reuse actual components and tokens; provide their measured dimensions, state owners, callbacks, and accessibility behavior rather than copying unspecified project context.

---

## Inspect setup before using a fragment

These Reanimated 4/compatible Worklets and Gesture Handler builder examples require an inspected matching stack. Check the installed Expo SDK, architecture, dependency versions, Babel setup, gesture API, and supported native-stack options. Do not migrate a working core `Animated` path or install the entire example stack merely to use this file.

When an authorized implementation needs a missing package, use the project's supported Expo installation workflow for only that package and verify compatibility. Keyboard, haptic, navigation, and illustration dependencies are needed only for the corresponding feature. Setup and imports below are illustrative, not universal installation commands.

If the installed Gesture Handler requires `GestureHandlerRootView`, integrate it once with the app's existing providers; this Expo Router example assumes its `Stack` import:

```jsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack />
    </GestureHandlerRootView>
  );
}
```

Select only the imports needed by the matching fragment. These fallback curves are examples, not replacements for compatible project tokens:

```js
import { useState, useEffect, useMemo } from 'react';
import Animated, {
  useSharedValue, useAnimatedStyle, useAnimatedScrollHandler, useAnimatedReaction,
  withSpring, withTiming, cancelAnimation, useReducedMotion, ReduceMotion,
  interpolate, Extrapolation, Easing,
  FadeInDown, FadeOutDown, LinearTransition,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { scheduleOnRN } from 'react-native-worklets';
import * as Haptics from 'expo-haptics';

const EASE_OUT = Easing.bezier(0.23, 1, 0.32, 1);      // strong ease-out for UI
const EASE_IN_OUT = Easing.bezier(0.77, 0, 0.175, 1);  // on-screen movement
const EASE_SHEET = Easing.bezier(0.32, 0.72, 0, 1);    // iOS sheet curve
```

Integration conventions:

- Use supported `.get()`/`.set()` access where React Compiler compatibility calls for it; `.value` remains valid in other compatible configurations.
- `scheduleOnRN` below assumes compatible Reanimated 4/Worklets. Other installed majors may use different supported scheduling APIs. Cross-runtime delivery is asynchronous.
- Stabilize gesture identity where the installed builder API requires it, while keeping measured dimensions and callback dependencies current. Do not assume every SDK installs a particular Gesture Handler major.
- The builder examples use `onEnd(event, success)` and `onFinalize(event, success)` semantics. On another API generation, consult that installed version's documented lifecycle and cancellation fields instead of applying a mechanical name substitution. [Gesture Handler documentation](https://docs.swmansion.com/react-native-gesture-handler/) is the API entrypoint.
- Fragments use the actual reduced-motion choice as `reduced` or supported `ReduceMotion.System`. Ensure the app observes preference changes as required; a startup-only hook result is not a live subscription.

---

## Two worklets you'll need everywhere

Projection and resistance are optional tools for a specific gesture, not universal platform physics. Use the real gesture's units and measured positive dimensions; tune against the existing component and target devices.

```js
// Where the finger would come to rest if it kept decelerating.
// Illustrative exponential-decay projection: velocity is pixels/second.
function project(velocity, decelerationRate = 0.998) {
  'worklet';
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

// The further past the edge, the less the element follows.
function rubberband(overshoot, dimension, constant = 0.55) {
  'worklet';
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}
```

---

## Press feedback

An optional press-scale treatment for a component whose design calls for it. Use the existing component's own feedback when suitable. Successful activation stays on `onPress`; `onPressIn`/`onPressOut` only control feedback. This example skips scale/transition under reduced motion and supplies immediate opacity feedback instead.

```jsx
import Animated from 'react-native-reanimated';
import { Pressable, StyleSheet } from 'react-native';

function PressableScale({ onPress, children }) {
  const [pressed, setPressed] = useState(false);
  const reduced = useReducedMotion(); // verify preference-update behavior for the installed version
  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      hitSlop={12}
      pressRetentionOffset={16}
    >
      <Animated.View style={[
        styles.box,
        pressed && (reduced ? styles.pressedWithoutMotion : styles.pressed),
        reduced && styles.noMotion,
      ]}>{children}</Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    transform: [{ scale: 1 }],
    transitionProperty: 'transform',
    transitionDuration: '120ms',
    transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
  },
  pressed: { transform: [{ scale: 0.97 }] },
  pressedWithoutMotion: { opacity: 0.8 },
  noMotion: { transitionDuration: '0ms' },
});
```

Discrete press-feedback state is different from per-frame motion state. Preserve the real control's disabled/accessibility/keyboard behavior. Choose hit regions from measured bounds and platform guidance; `hitSlop` cannot extend beyond parent bounds or resolve overlapping siblings by itself. The fallback scale and timing are not mandates for every pressable.

---

## Bottom sheet you can drag to dismiss

First inspect existing sheet primitives and supported native presentation. A destination may suit `formSheet`; an in-screen surface may need a gesture component. The fragment below shows the latter's motion lifecycle, not complete sheet semantics, focus management, or navigation. `HEIGHT` must be the current measured dismissal distance, and `onClose` must be owned by the real mounted component.

```jsx
const translateY = useSharedValue(0);
const context = useSharedValue(0);

const pan = useMemo(() => Gesture.Pan()
  .activeOffsetY([-10, 10])   // activation intent; coordinate other recognizers separately
  .onStart(() => {
    cancelAnimation(translateY);
    context.set(translateY.get());   // start from the current on-screen value, not from 0
  })
  .onUpdate((e) => {
    const next = context.get() + e.translationY;
    // downward is free; upward past the top resists
    translateY.set(next >= 0 ? next : rubberband(next, HEIGHT));
  })
  .onEnd((e, success) => {
    if (!success) return;
    const projected = translateY.get() + project(e.velocityY);
    if (projected > HEIGHT * 0.4) {
      translateY.set(withSpring(HEIGHT, {
        duration: 300, dampingRatio: 1, velocity: e.velocityY,
        overshootClamping: true, reduceMotion: ReduceMotion.System,
      }, (finished) => { if (finished) scheduleOnRN(onClose); }));
    } else {
      translateY.set(withSpring(0, {
        duration: 300, dampingRatio: 0.8, velocity: e.velocityY,
        reduceMotion: ReduceMotion.System,
      }));
    }
  })
  .onFinalize((_e, success) => {
    if (!success) {
      cancelAnimation(translateY);
      translateY.set(withSpring(0, {
        duration: 300, dampingRatio: 1, reduceMotion: ReduceMotion.System,
      }));
    }
  }), [onClose, HEIGHT, translateY, context]);

useEffect(() => () => cancelAnimation(translateY), [translateY]);

const sheetStyle = useAnimatedStyle(() => ({ transform: [{ translateY: translateY.get() }] }));
```

The four details that separate this from a bad drag:

- **Cancel before capturing current state.** A newly activated drag must interrupt the previous animation, including any still-pending completion callback.
- **Choose a deliberate commit rule.** Distance and signed velocity can both matter; the projection coefficient and travel fraction here are examples, not a universal flick threshold.
- **Pass compatible velocity units to the spring.** Exercise reversal and interrupted settling on the actual surface rather than promising seamless handoff from source alone.
- **`overshootClamping` on dismissal** — otherwise the sheet springs past the bottom of the screen and flashes a gap.

Failed/cancelled gestures settle without calling `onClose`; unmount cancels outstanding motion. The real state owner must also reject stale queued RN callbacks and duplicate commits, preserve an accessible dismissal alternative, and coordinate nested scrolling and other pointers. Those component responsibilities are not supplied by a motion fragment.

The backdrop can derive from the same value; verify its actual rendering cost:

```jsx
const backdropStyle = useAnimatedStyle(() => ({
  opacity: interpolate(translateY.get(), [0, HEIGHT], [1, 0], Extrapolation.CLAMP),
}));
```

---

## Swipe to delete a row

For swipe-to-reveal, inspect the installed [`ReanimatedSwipeable`](https://docs.swmansion.com/react-native-gesture-handler/docs/components/reanimated_swipeable/) or the app's existing primitive first. The custom fragment below illustrates a distinct swipe-to-commit interaction. It requires current measured `WIDTH`, a chosen threshold, and a real `onDelete` owner that enforces the requested confirmation/undo policy and rejects stale or duplicate commits.

```jsx
const x = useSharedValue(0);
const context = useSharedValue(0);

const pan = useMemo(() => Gesture.Pan()
  .activeOffsetX([-10, 10])   // must declare the axis, or it fights the vertical scroll
  .onStart(() => {
    cancelAnimation(x);
    context.set(x.get());
  })
  .onUpdate((e) => { x.set(Math.min(0, context.get() + e.translationX)); })
  .onEnd((e, success) => {
    if (!success) return;
    const projected = x.get() + project(e.velocityX);
    if (projected < -SWIPE_THRESHOLD) {
      x.set(withTiming(-WIDTH, {
        duration: 200, easing: EASE_OUT, reduceMotion: ReduceMotion.System,
      }, (f) => {
        if (f) scheduleOnRN(onDelete, id);
      }));
    } else {
      x.set(withSpring(0, {
        duration: 300, dampingRatio: 1, velocity: e.velocityX,
        reduceMotion: ReduceMotion.System,
      }));
    }
  })
  .onFinalize((_e, success) => {
    if (!success) {
      cancelAnimation(x);
      x.set(withSpring(0, {
        duration: 300, dampingRatio: 1, reduceMotion: ReduceMotion.System,
      }));
    }
  }), [onDelete, id, WIDTH, SWIPE_THRESHOLD, x, context]);

useEffect(() => () => cancelAnimation(x), [x]);
```

Closing the gap belongs to the existing list, not the departing row. Supply its real data, renderer, stable keys, and reduced-motion choice:

```jsx
const ROW_CLOSE = LinearTransition.duration(200);   // module scope — builders rebuilt in render cost every re-render

<Animated.FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={keyExtractor}
  itemLayoutAnimation={reduced ? undefined : ROW_CLOSE}
/>
```

Axis activation offsets are one part of scroll/gesture coordination, not proof of exclusivity. Configure failure/activation and simultaneous recognizers for the actual container. Test vertical scrolling, cancellation, interrupted exit, reduced motion, and an accessible non-swipe delete path; a cancelled swipe must not delete.

---

## Collapsing header on scroll

```jsx
const scrollY = useSharedValue(0);
const onScroll = useAnimatedScrollHandler((e) => { scrollY.set(e.contentOffset.y); });

const titleStyle = useAnimatedStyle(() => reduced ? {
  opacity: 1,
  transform: [{ translateY: 0 }],
} : {
  opacity: interpolate(scrollY.get(), [0, 60], [1, 0], Extrapolation.CLAMP),
  transform: [{ translateY: interpolate(scrollY.get(), [0, 60], [0, -12], Extrapolation.CLAMP) }],
});

<Animated.ScrollView onScroll={reduced ? undefined : onScroll} scrollEventThrottle={16}>
  <Animated.View style={titleStyle}>{header}</Animated.View>
  {children}
</Animated.ScrollView>
```

Prefer a suitable supported native header option when it matches the design. A transform-based treatment can avoid layout work, but dynamic text and container sizing still need verification. If an actual layout change is required, measure its cost rather than declaring it guaranteed to stutter.

Clamp when extrapolation would leave the intended visual range; verify the target behavior rather than claiming that every unclamped opacity produces a particular rendered artifact. Under reduced motion, keep the title/state readable without scroll-linked translation, using the actual preference in the animated style or choosing a static header.

---

## List entrances

```jsx
// The Reanimated docs recommend building layout animations outside components,
// or in useMemo — an inline chain in JSX rebuilds the builder on every render.
// A per-index delay can't live at module scope, so the row memoizes its own:
function Row({ children, index, reduced }) {
  const entering = useMemo(
    () => reduced ? undefined : FadeInDown.duration(250).delay(index * 40),
    [index, reduced],
  );
  return <Animated.View entering={entering}>{children}</Animated.View>;
}
```

The delay and duration are illustrative. Use this wrapper only for a justified, bounded entrance and pass the actual row content and reduced-motion choice. Keep controls, focus, and data available independently of decorative motion.

For virtualized/recycled rows, inspect identity and mount/reuse behavior before adding `entering`; do not assume every virtualizer behaves identically. A once-only container entrance or supported reflow may fit better. Verify recycled content, repeated updates, and reduced motion rather than forcing a universal recipe.

---

## Keyboard-synced UI

Inspect the existing keyboard avoidance/animation mechanism first. If an authorized feature needs `react-native-keyboard-controller`, verify its installed version, provider, architecture, and native-build requirements against the [Expo keyboard guide](https://docs.expo.dev/guides/keyboard-handling/); do not install it automatically for unrelated motion.

```jsx
import { KeyboardProvider } from 'react-native-keyboard-controller';

// Integrate with existing root providers only when required by the installed controller.
<KeyboardProvider>
  <Stack />
</KeyboardProvider>
```

```jsx
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';

const { height } = useReanimatedKeyboardAnimation();   // 0 → -keyboardHeight, on the UI thread
const footerStyle = useAnimatedStyle(() => ({ transform: [{ translateY: height.get() }] }));
```

Use actual keyboard geometry when precise following is required, but preserve a suitable existing mechanism for simpler avoidance. Check the installed controller's value API/sign and native behavior; do not claim all event-driven keyboard implementations visibly lag. Verify focus, safe areas, interactive dismissal, and dynamic content on the target platform.

---

## Tab / segmented indicator

Re-measure as layout, orientation, font scale, or labels change; do not treat a one-time measurement as permanent.

```jsx
const [layouts, setLayouts] = useState({});   // measured with onLayout, not per frame
const x = useSharedValue(0);
const w = useSharedValue(0);

useEffect(() => {
  const l = layouts[active];
  if (!l) return;
  x.set(withTiming(l.x, { duration: 250, easing: EASE_IN_OUT, reduceMotion: ReduceMotion.System }));
  w.set(withTiming(l.width, { duration: 250, easing: EASE_IN_OUT, reduceMotion: ReduceMotion.System }));
}, [active, layouts]);

const pillStyle = useAnimatedStyle(() => ({
  transform: [{ translateX: x.get() }],
  width: w.get(),
}));
```

The indicator must be decorative and noninteractive; preserve the actual tabs' accessibility, selection, focus, and hit regions. An absolutely positioned childless pill can limit layout effects, but width is not cost-free. Measure the actual shape/rendering tradeoff. Reuse compatible timing, and request any selection haptic at the semantic user action—not automatically for programmatic state changes.

---

## Screen transitions (Expo Router)

Prefer the existing supported native stack and app conventions. These options are version/platform-dependent examples, not a reason to replace deliberate navigation behavior. This fragment applies reduced motion at both the parent and the custom child override:

```jsx
const settingsOptions = {
  animation: reduced ? 'none' : 'slide_from_right',
  animationMatchesGesture: !reduced,
};

<Stack screenOptions={{ animation: reduced ? 'none' : 'default' }}>
  <Stack.Screen name="settings" options={settingsOptions} />
  <Stack.Screen name="compose" options={{ presentation: 'modal' }} />
  <Stack.Screen name="filter" options={{
    presentation: 'formSheet',
    sheetAllowedDetents: 'fitToContents',
    sheetGrabberVisible: true,
  }} />
</Stack>
```

| Navigation | Option |
| --- | --- |
| Deeper into a hierarchy | `animation: 'default'` — the platform push, unmodified |
| A self-contained task the user can abandon | `presentation: 'modal'` |
| A short interruption: picker, filter, share | `presentation: 'formSheet'` with detents |
| Between tabs | Existing compatible platform/product convention |
| Reduced motion | Useful gentle or zero-motion behavior; this example uses `animation: 'none'` |

Check `animationMatchesGesture` and related options against the installed native stack and platform. Preserve intended interactive back behavior; do not require an unsupported option on every custom animation.

For `formSheet`, consult the installed version's [Expo modal documentation](https://docs.expo.dev/router/advanced/modals/#form-sheet-presentation). Detent limits, grabbers, headers/nested navigation, and `fitToContents` sizing differ across platforms and versions. Inspect measured content and safe areas; do not treat a particular SDK's restrictions as timeless or assume the presentation is automatically correct.

---

## Toast

```jsx
// Module scope — layout-animation builders live outside the component.
const TOAST_ENTER = FadeInDown.duration(300).easing(EASE_OUT);
const TOAST_EXIT = FadeOutDown.duration(250).easing(EASE_OUT);

<Animated.View
  entering={reduced ? undefined : TOAST_ENTER}
  exiting={reduced ? undefined : TOAST_EXIT}
  style={{ position: 'absolute', bottom: insets.bottom + 16, left: 16, right: 16 }}
/>
```

- Reuse compatible toast timing; the values here are fallbacks, not a cap or a mandatory exit/entry ratio.
- Keep entry/exit and interrupted updates coherent with the actual surface.
- Account for the component's containing layout and safe-area handling without blindly double-padding.
- Keep state and announcements useful under reduced/no motion; an empty styled view is not a complete accessible toast.

For stacking/reflow, use the existing component's supported mechanism and measure representative content. Do not assume a list-specific `itemLayoutAnimation` prop applies to every toast container.

---

## At most one arming cue per interaction

This fragment illustrates one cadence, not every slider/detent policy. The existing controller must call `beginThresholdFeedback` for each genuine new interaction and `endThresholdFeedback` on all completion/cancellation paths. `pullDistance` and `REFRESH_THRESHOLD` come from that controller; this is feedback, not a refresh action handler.

```jsx
const armed = useSharedValue(false);
const gestureActive = useSharedValue(false);
const feedbackSent = useSharedValue(false);

function beginThresholdFeedback() {
  'worklet';
  feedbackSent.set(false);
  gestureActive.set(true);
}

function endThresholdFeedback() {
  'worklet';
  gestureActive.set(false);
  armed.set(false);
}

function shouldEmitArmingCue(isArmed, wasArmed, alreadySent) {
  'worklet';
  return wasArmed !== null && isArmed && !wasArmed && !alreadySent;
}

useAnimatedReaction(
  () => gestureActive.get() && pullDistance.get() > REFRESH_THRESHOLD,
  (isArmed, wasArmed) => {
    armed.set(isArmed);
    if (shouldEmitArmingCue(isArmed, wasArmed, feedbackSent.get())) {
      feedbackSent.set(true);
      scheduleOnRN(Haptics.impactAsync, Haptics.ImpactFeedbackStyle.Light);
    }
  }
);
```

Initialization produces no haptic; inactive/cancelled interactions cannot arm. The first rising crossing during an active interaction can emit once, later jitter cannot emit again, and a new interaction resets the latch. Keep the arming state visible independently of haptics. RN/native delivery can be delayed or unavailable; if feedback must be suppressed after queued cancellation, the real RN feedback owner must check current interaction validity before issuing the platform call. Other cadence requirements need their own explicit policy rather than per-frame scheduling.
