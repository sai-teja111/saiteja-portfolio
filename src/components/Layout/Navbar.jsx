import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { navigationItems } from "../../data/navigation";
import { useActiveSection } from "../../hooks/useActiveSection";
import { easeOut, layoutSpring } from "../../lib/motion";
import { usePageReady } from "../../lib/pageLoad";

// The mobile panel fades open and its items follow with a small stagger.
// Nothing else in the navbar animates while scrolling.
const mobileMenuVariants = {
  hidden: { opacity: 0, y: -8 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: easeOut,
      staggerChildren: 0.04,
      delayChildren: 0.02,
    },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18, ease: easeOut } },
};

const mobileItemVariants = {
  hidden: { opacity: 0, y: -6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.24, ease: easeOut } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.12, ease: easeOut } },
};

function Navbar() {
  const { activeSection, handleNavigate } = useActiveSection();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // The navbar slides in together with the Hero, right as the loader leaves.
  const isPageReady = usePageReady();

  const onNavigate = (href) => {
    handleNavigate(href);
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{
        y: -20,
        opacity: 0,
      }}
      animate={isPageReady ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
      transition={{
        duration: 0.5,
        ease: easeOut,
      }}
      className="fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2"
    >
      <nav
        aria-label="Main navigation"
        className="group relative flex items-center justify-between overflow-hidden rounded-xl border border-border/80 px-4 py-3 transition-shadow duration-300 ease-out sm:px-5 backdrop-blur-xl bg-background/70 hover:shadow-[0_20px_50px_-15px_rgba(59,130,246,0.10),0_10px_25px_-10px_rgba(0,0,0,0.30)]"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(600px circle at var(--x,50%) var(--y,0%), rgba(59,130,246,0.06), transparent 40%)",
          }}
        />

        <button
          type="button"
          onClick={() => onNavigate("#home")}
          className="group relative z-10 shrink-0 whitespace-nowrap text-sm font-bold tracking-[0.16em] text-foreground transition-colors hover:text-gradient-primary"
        >
          <span className="transition-all group-hover:text-gradient-primary">
            SAI TEJA
          </span>
          <span className="text-gradient-primary">.</span>
        </button>

        <div className="hidden items-center gap-0.5 md:flex lg:gap-1">
          {navigationItems.map((item) => {
            const sectionId = item.href.substring(1);
            const isActive = activeSection === sectionId;

            return (
              <button
                key={item.href}
                type="button"
                onClick={() => onNavigate(item.href)}
                className={`relative whitespace-nowrap rounded-lg px-2 py-2 text-sm font-medium transition-colors duration-300 lg:px-3.5 ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-nav"
                    className="absolute inset-0 z-0 overflow-hidden rounded-lg border border-primary/30 bg-surface/80 backdrop-blur-sm"
                    transition={layoutSpring}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-primary opacity-10"
                    />
                  </motion.span>
                )}

                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label={
            mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={mobileMenuOpen}
          className="relative z-10 shrink-0 rounded-lg p-2 text-foreground transition-colors hover:bg-surface hover:text-primary md:hidden"
        >
          {mobileMenuOpen ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15, ease: easeOut }}
            >
              <X size={20} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15, ease: easeOut }}
            >
              <Menu size={20} />
            </motion.div>
          )}
        </button>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="relative mt-2 overflow-hidden rounded-xl border border-border p-2 shadow-2xl shadow-black/20 backdrop-blur-xl bg-background/85"
          >
            {navigationItems.map((item) => {
              const sectionId = item.href.substring(1);
              const isActive = activeSection === sectionId;

              return (
                <motion.button
                  key={item.href}
                  type="button"
                  onClick={() => onNavigate(item.href)}
                  variants={mobileItemVariants}
                  className={`relative w-full overflow-hidden rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? "border border-primary/25 text-primary bg-linear-to-r from-primary/10 via-primary/5 to-transparent"
                      : "text-muted-foreground hover:bg-surface hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-gradient-primary" />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
