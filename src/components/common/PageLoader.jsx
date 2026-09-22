import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { easeOut } from "../../lib/motion";
import { markPageReady } from "../../lib/pageLoad";

// How long the loader stays mounted. The choreography inside is:
// - name letters: ~0.06s start + (9 letters x 0.035s stagger) + 0.38s settle
// - role line: begins at 0.32s, settles by ~0.65s
// - progress line: 0.1s -> 0.7s
// The overlay hands over at 0.9s and fades for 0.3s (total ~1.2s on screen,
// ~0.9s of waiting). Kept short so it reads as a transition, not a wait.
const HOLD_MS = 900;
const HOLD_MS_REDUCED = 400;

// The name is split into characters so each one can rise into place.
const NAME_LETTERS = "SAI TEJA.".split("");

/**
 * Minimal initial loader: the name, the role and a thin progress line on the
 * site's own navy background. It runs once on the first page load, tells the
 * Hero and Navbar to start their entrance, then fades away.
 */
function PageLoader() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  // The name arrives letter by letter: each character rises 10px and sharpens
  // out of a soft blur (spec: opacity 0 -> 1, y 10px -> 0, blur subtle -> 0).
  // Stagger uses 0.045s so the nine letters land in ~0.4s; the static
  // fallback keeps only the fade for reduced motion.
  const nameContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.035,
        delayChildren: prefersReducedMotion ? 0 : 0.06,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 10,
      filter: prefersReducedMotion ? "blur(0px)" : "blur(5px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: prefersReducedMotion ? 0.25 : 0.38,
        ease: easeOut,
      },
    },
  };

  // The role line waits for the name to mostly settle, then fades upward.
  const roleVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.25 : 0.35,
        ease: easeOut,
        delay: prefersReducedMotion ? 0 : 0.32,
      },
    },
  };

  useEffect(() => {
    const hold = prefersReducedMotion ? HOLD_MS_REDUCED : HOLD_MS;

    const timer = window.setTimeout(() => {
      // The page is revealed at the same moment the overlay starts to leave,
      // so the loader dissolves into the Hero entrance instead of preceding it.
      markPageReady();
      setVisible(false);
    }, hold);

    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          role="status"
          aria-label="Loading portfolio"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: prefersReducedMotion ? 0 : -14,
            transition: {
              duration: prefersReducedMotion ? 0.2 : 0.3,
              ease: easeOut,
            },
          }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-background"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-soft"
          />

          <motion.div
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8, transition: { duration: 0.22, ease: easeOut } }}
            className="relative flex w-full max-w-sm flex-col items-center px-6 text-center"
          >
            <motion.p
              aria-label="Sai Teja"
              variants={nameContainer}
              initial="hidden"
              animate="show"
              className="text-sm font-bold tracking-[0.22em] text-foreground sm:text-base"
            >
              {NAME_LETTERS.map((letter, index) => (
                <motion.span
                  key={`${letter}-${index}`}
                  variants={letterVariants}
                  aria-hidden="true"
                  className={`inline-block ${letter === "." ? "text-gradient-primary" : ""}`}
                  style={{ whiteSpace: letter === " " ? "pre" : undefined }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.p>

            <motion.p
              variants={roleVariants}
              initial="hidden"
              animate="show"
              className="mt-2 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-muted-foreground sm:text-xs sm:tracking-[0.18em]"
            >
              Python Full Stack Developer
            </motion.p>

            <div className="mt-6 h-0.5 w-40 overflow-hidden rounded-full bg-border/70">
              <motion.div
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: prefersReducedMotion ? 0.3 : 0.6, ease: easeOut, delay: prefersReducedMotion ? 0 : 0.1 }}
                className="h-full w-full origin-left bg-gradient-primary"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PageLoader;
