import { motion } from "motion/react";
import { Briefcase, Clock } from "lucide-react";

import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import { experiences } from "../../data/experience";
import {
  createFadeUp,
  easeOut,
  hoverLift,
  hoverLiftCard,
  viewportOnceEarly,
} from "../../lib/motion";

// Timeline items fade up as they arrive, the dot settles in just after them
// and the technology chips follow with a very small stagger.
// The dot inherits the item's reveal (no separate viewport trigger).
const itemVariants = (index) => ({
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOut,
      delay: Math.min(index, 3) * 0.06,
      staggerChildren: 0.03,
      delayChildren: 0.08,
    },
  },
});

const dotVariants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: easeOut,
      delay: 0.12,
    },
  },
};

const techChipVariants = createFadeUp({ y: 8, duration: 0.35 });

function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-24 border-t border-border py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <SectionHeading
          eyebrow="Experience"
          title="Work & projects"
          description="Roles, projects, and hands-on work applying the full stack — from API design and databases to frontend interfaces."
        />

        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute left-4 top-2 hidden h-[calc(100%-1rem)] w-px md:left-1/2 md:block"
            style={{
              background:
                "linear-gradient(180deg, rgba(59,130,246,0.4) 0%, rgba(6,182,212,0.3) 50%, rgba(38,52,73,0.5) 100%)",
            }}
          />

          <ol className="space-y-10">
            {experiences.map((exp, idx) => {
              const isLeft = idx % 2 === 0;
              const statusColor =
                exp.status === "Currently Building"
                  ? "bg-accent/15 text-accent border-accent/30"
                  : "bg-primary/15 text-primary border-primary/30";

              return (
                <motion.li
                  key={exp.id}
                  variants={itemVariants(idx)}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnceEarly}
                  className="relative min-w-0 md:grid md:grid-cols-2 md:gap-12"
                >
                  <div
                    aria-hidden="true"
                    className="absolute left-4 top-6 z-10 hidden md:left-1/2 md:block"
                  >
                    <motion.div
                      variants={dotVariants}
                      className="relative -translate-x-1/2"
                    >
                      <div className="relative flex h-5 w-5 items-center justify-center">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-15" />
                        <span className="h-3 w-3 rounded-full bg-gradient-primary ring-4 ring-background" />
                      </div>
                    </motion.div>
                  </div>
                  <div
                    aria-hidden="true"
                    className="absolute left-4 top-6 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-card text-primary md:hidden"
                  >
                    <Briefcase size={14} />
                  </div>

                  <div
                    className={`min-w-0 pl-12 md:pl-0 ${
                      isLeft
                        ? "md:pr-10 md:text-right"
                        : "md:col-start-2 md:pl-10"
                    }`}
                  >
                    <motion.div
                      whileHover={hoverLiftCard}
                      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 text-left card-glow-hover"
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          background:
                            "radial-gradient(500px circle at var(--card-x,50%) var(--card-y,-10%), rgba(59,130,246,0.1), transparent 40%)",
                        }}
                      />

                      <div className="relative z-10">
                        <div
                          className={`flex flex-wrap items-center gap-3 ${
                            isLeft ? "md:justify-end" : ""
                          }`}
                        >
                          <h3 className="min-w-0 wrap-break-word text-lg font-semibold tracking-tight text-foreground">
                            {exp.role}
                          </h3>
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium backdrop-blur-sm bg-background/30 ${statusColor}`}
                          >
                            <span
                              className={`relative h-1.5 w-1.5 rounded-full ${
                                exp.status === "Currently Building"
                                  ? "bg-accent"
                                  : "bg-primary"
                              }`}
                            >
                              {exp.status === "Currently Building" && (
                                <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-30" />
                              )}
                            </span>
                            {exp.status}
                          </span>
                        </div>

                        <p
                          className={`mt-1 text-sm font-medium text-gradient-primary ${
                            isLeft ? "md:text-right" : ""
                          }`}
                        >
                          {exp.company}
                        </p>

                        <div
                          className={`mt-2 flex items-center gap-1.5 text-xs text-muted-foreground ${
                            isLeft ? "md:justify-end" : ""
                          }`}
                        >
                          <Clock size={13} className="text-primary" />
                          {exp.duration}
                        </div>

                        <p className="mt-4 text-sm leading-6 text-muted-foreground">
                          {exp.description}
                        </p>

                        {exp.responsibilities &&
                          exp.responsibilities.length > 0 && (
                            <ul className="mt-4 space-y-1.5">
                              {exp.responsibilities.map((r) => (
                                <li
                                  key={r}
                                  className="text-sm text-muted-foreground before:mr-2 before:font-bold before:text-gradient-primary before:content-['›']"
                                >
                                  {r}
                                </li>
                              ))}
                            </ul>
                          )}

                        {exp.technologies && exp.technologies.length > 0 && (
                          <div
                            className={`mt-5 flex flex-wrap gap-1.5 ${
                              isLeft ? "md:justify-end" : ""
                            }`}
                          >
                            {exp.technologies.map((t) => (
                              <motion.span
                                key={t}
                                variants={techChipVariants}
                                whileHover={hoverLift}
                                className="group relative max-w-full overflow-hidden wrap-break-word rounded-md border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors duration-300 bg-surface/80 hover:border-primary/40 hover:text-primary"
                              >
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute inset-0 bg-gradient-primary opacity-0 transition-opacity duration-300 group-hover:opacity-[0.12]"
                                />
                                {t}
                              </motion.span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}

export default Experience;
