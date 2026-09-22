import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUp } from "lucide-react";

import { easeOut, hoverLift, tapPress } from "../../lib/motion";

// Roughly one screen of scrolling before the button appears.
const REVEAL_AFTER = 600;

/**
 * Small floating button that returns to the top of the page.
 *
 * The scroll listener is passive and throttled with requestAnimationFrame,
 * and it only updates state when the button has to appear or disappear, so
 * scrolling never re-renders anything.
 */
function BackToTop() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setVisible(window.scrollY > REVEAL_AFTER);
    };

    const onScroll = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={handleClick}
          aria-label="Back to top"
          title="Back to top"
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{
            opacity: 0,
            y: 12,
            scale: 0.96,
            transition: { duration: 0.18, ease: easeOut },
          }}
          transition={{ duration: 0.3, ease: easeOut }}
          whileHover={hoverLift}
          whileTap={tapPress}
          className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/85 text-primary shadow-lg shadow-black/25 backdrop-blur-md transition-colors duration-300 hover:border-primary/50 hover:bg-surface hover:text-accent focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-8 sm:right-8"
        >
          <ArrowUp size={18} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default BackToTop;
