import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, Briefcase, Code2, Download, Sparkles } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

import { contact, whatsappUrl } from "../../data/contact";
import { useActiveSection } from "../../hooks/useActiveSection";
import {
  createFadeUp,
  createStagger,
  easeOut,
  hoverLift,
  tapPress,
} from "../../lib/motion";
import { usePageReady } from "../../lib/pageLoad";
import Button from "../common/Button";

function Hero() {
  const { handleNavigate } = useActiveSection();
  const prefersReducedMotion = useReducedMotion();
  // The entrance waits for the initial loader, so the stagger is the first
  // thing the visitor sees instead of something that already happened.
  const isPageReady = usePageReady();

  const tech = [
    "Python",
    "FastAPI",
    "React",
    "SQL",
    "PostgreSQL",
    "Docker",
    "AWS",
  ];

  // Staggered entrance, exactly 7 steps: badge, name, title, description,
  // tech badges, buttons, then the GitHub / LinkedIn / WhatsApp links.
  // Five direct steps plus two groups inside a transparent row wrapper, so
  // staggerChildren still delivers the sequence 1 -> 7.
  const heroContainer = createStagger(
    prefersReducedMotion ? 0 : 0.08,
    prefersReducedMotion ? 0 : 0.05,
  );
  const techContainer = createStagger(prefersReducedMotion ? 0 : 0.03);
  // Buttons + links row: a transparent orchestration-only wrapper so the two
  // groups stay side-by-side in one flex row while still staggering as the
  // final two steps of the hero entrance (step 6 buttons, step 7 links).
  const actionsRowContainer = createStagger(prefersReducedMotion ? 0 : 0.09);
  const heroItem = createFadeUp({
    y: 20,
    duration: prefersReducedMotion ? 0.2 : 0.5,
  });
  const heroLead = createFadeUp({
    y: 20,
    duration: prefersReducedMotion ? 0.22 : 0.6,
  });
  const techItem = createFadeUp({
    y: 12,
    duration: prefersReducedMotion ? 0.18 : 0.4,
  });

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 pb-12 sm:px-8 sm:pt-32 lg:px-10 lg:pt-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={
            isPageReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }
          }
          transition={{
            duration: prefersReducedMotion ? 0.3 : 1.2,
            ease: easeOut,
          }}
          className="absolute right-[5%] top-[18%] h-96 w-96 max-w-[40vw] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(59,130,246,0.22) 0%, rgba(59,130,246,0.08) 40%, transparent 70%)",
            filter: "blur(10px)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={
            isPageReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }
          }
          transition={{
            duration: prefersReducedMotion ? 0.3 : 1.4,
            ease: easeOut,
            delay: prefersReducedMotion ? 0 : 0.1,
          }}
          className="absolute left-[-5%] bottom-[-5%] h-80 w-80 max-w-[35vw] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(6,182,212,0.15) 0%, rgba(6,182,212,0.05) 40%, transparent 70%)",
            filter: "blur(10px)",
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isPageReady ? 1 : 0 }}
          transition={{
            duration: prefersReducedMotion ? 0.3 : 1.2,
            ease: easeOut,
            delay: prefersReducedMotion ? 0 : 0.2,
          }}
          className="absolute left-1/2 top-0 h-px w-[60%] -translate-x-1/2"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.25) 30%, rgba(6,182,212,0.2) 70%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-6xl z-10">
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate={isPageReady ? "show" : "hidden"}
          className="max-w-4xl"
        >
          <motion.div variants={heroItem} className="mb-7 flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gradient-primary" />
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-linear-to-r from-primary/15 via-primary/10 to-accent/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gradient-primary backdrop-blur-sm">
              <Sparkles size={12} />
              Available for opportunities
            </span>
          </motion.div>

          <motion.h1
            variants={heroLead}
            className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-[5.25rem] lg:leading-[1.02]"
          >
            <span className="block">Sai Teja</span>
            <span className="block text-gradient-primary">Kandula</span>
          </motion.h1>

          <motion.div variants={heroItem} className="mt-5">
            <h2 className="inline-flex items-baseline gap-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              <span className="bg-linear-to-r from-primary via-blue-400 to-accent bg-clip-text text-transparent">
                Python Full Stack Developer
              </span>
              <span className="h-2 w-2 rounded-full bg-gradient-primary align-middle" />
            </h2>
          </motion.div>

          <motion.p
            variants={heroItem}
            className="mt-7 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base"
          >
            Building modern web applications with{" "}
            <span className="font-medium text-foreground/90">
              Python, FastAPI, React, SQL,
            </span>{" "}
            and modern development tools. Focused on{" "}
            <span className="font-medium text-foreground/90">
              REST API development, backend services, databases, authentication,
            </span>{" "}
            responsive React interfaces, and practical full-stack applications.
          </motion.p>

          <motion.div
            variants={techContainer}
            className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-2"
          >
            {tech.map((t) => (
              <motion.span
                key={t}
                variants={techItem}
                whileHover={hoverLift}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg border border-border px-3.5 py-2 text-sm font-medium text-foreground/85 transition-colors hover:border-primary/40 hover:text-primary backdrop-blur-sm bg-card/40"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-primary opacity-0 transition-opacity duration-300 group-hover:opacity-[0.08]"
                />
                {t}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            variants={actionsRowContainer}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <motion.div
              variants={heroItem}
              className="flex flex-wrap items-center gap-3"
            >
              <Button
                type="button"
                onClick={() => handleNavigate("#projects")}
                withArrow
              >
                View Projects
              </Button>

              <Button as="a" href="/resume.pdf" variant="secondary" download>
                <Download size={17} />
                Download Resume
              </Button>
            </motion.div>

            <motion.div
              variants={heroItem}
              className="flex flex-wrap items-center gap-3"
            >
              <Button as="a" href={contact.github} variant="secondary" external>
                <Code2 size={17} />
                GitHub
              </Button>

              <Button as="a" href={contact.linkedin} variant="secondary" external>
                <Briefcase size={17} />
                LinkedIn
              </Button>

              <Button
                as="a"
                href={whatsappUrl}
                variant="secondary"
                external
                aria-label="Contact me on WhatsApp"
                title="Chat with me on WhatsApp"
                className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <SiWhatsapp size={17} aria-hidden="true" />
                WhatsApp
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.button
          type="button"
          onClick={() => handleNavigate("#about")}
          initial={{ opacity: 0, y: 16 }}
          animate={isPageReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{
            duration: prefersReducedMotion ? 0.2 : 0.5,
            ease: easeOut,
            delay: prefersReducedMotion ? 0 : 0.95,
          }}
          whileTap={tapPress}
          className="group mt-16 inline-flex items-center gap-3 text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
        >
          <span className="relative inline-flex items-center gap-2">
            <span className="h-px w-10 bg-linear-to-r from-transparent via-primary/60 to-primary transition-all duration-300 group-hover:w-16" />
            Scroll to explore
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/60 text-primary backdrop-blur-sm transition-transform duration-300 ease-out group-hover:translate-y-0.5">
            <ArrowDown size={16} />
          </span>
        </motion.button>
      </div>
    </section>
  );
}

export default Hero;
