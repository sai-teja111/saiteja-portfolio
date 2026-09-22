import { motion, useScroll } from "motion/react";

/**
 * A very thin progress bar pinned to the top of the viewport.
 *
 * The scroll position is a MotionValue that Motion writes straight to the
 * element's transform, so scrolling never re-renders a React component and
 * only a transform is animated (no layout, no width/left changes).
 */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-60 h-0.5"
    >
      <motion.div
        style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }}
        className="h-full w-full bg-gradient-primary"
      />
    </div>
  );
}

export default ScrollProgress;
