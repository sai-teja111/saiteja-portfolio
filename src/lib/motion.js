// Shared motion language for the portfolio.
//
// Motion for React is used for entrance, scroll, stagger and route animation.
// Tailwind handles simple hover / focus transitions directly in each component.
//
// Rules of the language:
// - movement stays small (8px for inline items, 20px for section reveals)
// - one-shot reveals only (viewport: { once: true, amount: 0.15-0.25 })
// - a single smooth ease-out curve everywhere, no bouncing or rotation
// - only opacity and transform are animated, so nothing triggers layout work
// - a variant only carries `delay` when one is asked for, otherwise the delay
//   would override the parent's staggerChildren orchestration

/** Smooth ease-out curve (same family as the navbar entrance). */
export const easeOut = [0.22, 1, 0.36, 1];

/** Sections reveal once, slightly before they are fully in view. */
export const viewportOnce = { once: true, amount: 0.2 };

/** Sections that are taller than the viewport reveal a touch earlier. */
export const viewportOnceEarly = { once: true, amount: 0.15 };

/**
 * Orchestration-only parent variant. It never animates anything by itself,
 * it only staggers the reveal of its motion children.
 */
export function createStagger(staggerChildren = 0.08, delayChildren = 0) {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren, delayChildren },
    },
  };
}

/** Fades an element up by `y` pixels with the shared ease-out curve. */
export function createFadeUp({ y = 20, duration = 0.55, delay = 0 } = {}) {
  return {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      // `delay` is only emitted when it is non-zero: an explicit delay on a
      // child variant overrides the parent's staggerChildren orchestration.
      transition: { duration, ease: easeOut, ...(delay ? { delay } : {}) },
    },
  };
}

/** Fades an element in from the left / right (used on wide screens only). */
export function createRevealFromX(x = 0, { duration = 0.6, delay = 0 } = {}) {
  return {
    hidden: { opacity: 0, x },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration, ease: easeOut, ...(delay ? { delay } : {}) },
    },
  };
}

/**
 * Wide-screen side reveals. Kept to 20px so the About columns settle
 * instead of sliding dramatically; mobile uses fade-up instead.
 */
export const revealFromLeft = createRevealFromX(-20, { duration: 0.6 });
export const revealFromRight = createRevealFromX(20, { duration: 0.6 });

/** Fades and very slightly scales an element in (images, icons, details). */
export function createSoftScaleIn({ scale = 0.94, duration = 0.5, delay = 0 } = {}) {
  return {
    hidden: { opacity: 0, scale },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration, ease: easeOut, ...(delay ? { delay } : {}) },
    },
  };
}

/** Hairline rule that draws itself in from one end. */
export const ruleDrawIn = {
  hidden: { opacity: 0, scaleX: 0 },
  show: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.55, ease: easeOut },
  },
};

/** Standard section reveal: fade up 20px. */
export const fadeUpSection = createFadeUp();

/** Smallest movement, used for list rows, chips and badges: fade up 8px. */
export const fadeUpSubtle = createFadeUp({ y: 8, duration: 0.4 });

/** Images settle in place: fade with the smallest possible scale. */
export const revealImage = createSoftScaleIn({ scale: 0.97, duration: 0.6 });

/** Hover / tap presets for elements that are already animated by Motion. */
export const hoverTransition = { duration: 0.18, ease: easeOut };

export const hoverLift = { y: -2, transition: hoverTransition };
export const hoverLiftCard = { y: -4, transition: hoverTransition };
export const tapPress = { scale: 0.97, transition: { duration: 0.12, ease: easeOut } };

/** Shared layout transition for the sliding navbar indicator. */
export const layoutSpring = {
  type: "spring",
  stiffness: 420,
  damping: 34,
  mass: 0.8,
};