import { motion } from "motion/react";
import { Code2, Database, Server, Cloud } from "lucide-react";

import profileImage from "../../assets/profile.png";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import {
  createFadeUp,
  createStagger,
  fadeUpSection,
  hoverLiftCard,
  revealFromLeft,
  revealImage,
  viewportOnce,
} from "../../lib/motion";

const focusAreas = [
  {
    icon: Server,
    title: "Backend Development",
    technologies: "Python · FastAPI · REST APIs",
  },
  {
    icon: Code2,
    title: "Frontend Development",
    technologies: "React · JavaScript · Tailwind CSS",
  },
  {
    icon: Database,
    title: "Database & Data",
    technologies: "SQL · PostgreSQL · SQLModel",
  },
  {
    icon: Cloud,
    title: "Development & Cloud",
    technologies: "Git · Docker · AWS",
  },
];

// Heading language: label -> title -> rule (same order as SectionHeading);
// no explicit delays so the parent's staggerChildren runs the sequence.
const aboutHeadingStagger = createStagger(0.07);
const aboutLabelVariants = createFadeUp({ y: 10, duration: 0.4 });
const aboutTitleVariants = createFadeUp({ y: 18, duration: 0.5 });
const aboutRuleVariants = createFadeUp({ y: 8, duration: 0.55 });

// Focus area cards reveal in a small sequence, once.
const aboutCardsStagger = createStagger(0.08);
const cardVariants = createFadeUp({ y: 18, duration: 0.45 });

const decorVariants = createFadeUp({ y: 12, duration: 0.5 });
const decorVariantsSmall = createFadeUp({ y: 12, duration: 0.5 });

function About() {
  // Directional reveals only where the two columns sit side by side; on
  // smaller screens both fade upward so nothing moves sideways.
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  // The image itself always settles with scale 0.97 -> 1 (no dramatic move);
  // on desktop the column wrapper adds a small 20px side settle.
  const imageVariants = isDesktop ? revealFromLeft : revealImage;
  const contentVariants = fadeUpSection;

  return (
    <section
      id="about"
      className="scroll-mt-24 border-t border-border px-6 pt-4 pb-16 sm:px-8 lg:px-10 lg:pt-6 lg:pb-20"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={aboutHeadingStagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.div
            variants={aboutLabelVariants}
            className="mb-4 inline-flex items-center gap-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gradient-primary" />
            </span>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gradient-primary">
              About
            </p>
          </motion.div>

          <motion.h2
            variants={aboutTitleVariants} className="text-3xl font-bold tracking-tight text-foreground sm:text-[2.125rem] lg:text-[2.5rem]">
            Building across the{" "}
            <span className="text-gradient-primary">full stack.</span>
          </motion.h2>

          <motion.div
            variants={aboutRuleVariants}
            className="mt-6 h-px w-24 origin-left bg-gradient-primary"
          />
        </motion.div>

        <div className="mt-12 grid min-w-0 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="group relative mx-auto w-full min-w-0 max-w-sm"
          >
            <div
              aria-hidden="true"
              className="absolute -inset-4 -z-10 rounded-4xl opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 30%, rgba(59,130,246,0.25) 0%, rgba(6,182,212,0.12) 45%, transparent 70%)",
              }}
            />

            <motion.div
              variants={revealImage}
              className="relative overflow-hidden rounded-2xl border border-border bg-card card-glow-hover"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              >
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    padding: "1px",
                    background:
                      "linear-gradient(135deg, rgba(59,130,246,0.5) 0%, rgba(6,182,212,0.35) 100%)",
                    WebkitMask:
                      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
              </div>

              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-10 opacity-40"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(59,130,246,0.05) 0%, transparent 40%, rgba(11,17,32,0.25) 100%)",
                  }}
                />
                <img
                  src={profileImage}
                  alt="Saiteja Kandula"
                  className="aspect-4/5 w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]" loading="lazy" decoding="async"
                />
              </div>
            </motion.div>

            <motion.div
              aria-hidden="true"
              variants={decorVariants}
              className="absolute -bottom-3 -right-3 z-0 h-24 w-24 rounded-2xl border border-border bg-linear-to-br from-primary/25 via-primary/10 to-accent/15 backdrop-blur-sm"
            />
            <motion.div
              aria-hidden="true"
              variants={decorVariantsSmall}
              className="absolute -top-3 -left-3 z-0 h-16 w-16 rounded-xl -rotate-12 border border-border bg-linear-to-br from-accent/20 via-primary/10 to-transparent backdrop-blur-sm"
            />
          </motion.div>

          <motion.div
            variants={contentVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="min-w-0"
          >
            <motion.p variants={fadeUpSection} className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              I'm a{" "}
              <span className="font-medium text-foreground/90">
                Python Full Stack Developer
              </span>{" "}
              focused on building practical web applications and backend
              systems. I work with{" "}
              <span className="font-medium text-foreground/90">
                Python, FastAPI, React, SQL,
              </span>{" "}
              and modern development tools to build REST APIs, backend services,
              and responsive web interfaces.
            </motion.p>

            <motion.p variants={fadeUpSection} className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              My current focus is strengthening full-stack development through
              hands-on projects involving{" "}
              <span className="font-medium text-foreground/90">
                API design, databases, authentication, Docker,
              </span>{" "}
              and cloud technologies.
            </motion.p>

            <motion.div
              variants={aboutCardsStagger}
              className="mt-10 grid gap-3 sm:grid-cols-2"
            >
              {focusAreas.map((area) => {
                const Icon = area.icon;

                return (
                  <motion.div
                    key={area.title}
                    variants={cardVariants}
                    whileHover={hoverLiftCard}
                    className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-colors card-glow-hover"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-primary opacity-0 transition-opacity duration-400 group-hover:opacity-[0.06]"
                    />
                    <div className="relative z-10 flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-linear-to-br from-primary/20 via-primary/10 to-accent/10 text-primary">
                        <Icon size={19} />
                      </div>

                      <div>
                        <h3 className="font-semibold tracking-tight text-foreground">
                          {area.title}
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          {area.technologies}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
