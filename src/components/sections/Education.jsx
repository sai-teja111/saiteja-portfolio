import { motion } from "motion/react";
import { GraduationCap, Calendar } from "lucide-react";

import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import { education } from "../../data/experience";
import {
  createFadeUp,
  hoverLiftCard,
  viewportOnce,
} from "../../lib/motion";

// Education cards should follow one another (0ms / 80ms / 160ms cap);
// the icon settles in right after its card with no explicit delay.
const cardVariants = (index) =>
  createFadeUp({ y: 20, duration: 0.5, delay: Math.min(index, 3) * 0.08 });

const iconVariants = createFadeUp({ y: 8, duration: 0.4 });

function Education() {
  return (
    <section
      id="education"
      className="scroll-mt-24 border-t border-border py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <SectionHeading
          eyebrow="Education"
          title="Academic background"
          description="Foundations that support my approach to software development and systems thinking."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {education.map((edu, idx) => (
            <motion.div
              key={edu.id}
              variants={cardVariants(idx)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              whileHover={hoverLiftCard}
              className="group relative min-w-0 overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-7 card-glow-hover"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(500px circle at var(--card-x,20%) var(--card-y,-10%), rgba(59,130,246,0.1), transparent 40%)",
                }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              >
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    padding: "1px",
                    background:
                      "linear-gradient(135deg, rgba(59,130,246,0.45) 0%, rgba(6,182,212,0.3) 100%)",
                    WebkitMask:
                      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
              </div>

              <div className="relative z-10 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-linear-to-br from-primary/25 via-primary/12 to-accent/15 text-primary shadow-lg shadow-primary/10">
                  <motion.div variants={iconVariants}>
                    <GraduationCap size={22} />
                  </motion.div>
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                    {edu.degree}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-gradient-primary">
                    {edu.institution}
                  </p>

                  <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar size={13} className="text-primary" />
                    {edu.duration}
                  </div>

                  {edu.status && (
                    <p className="mt-2 text-xs font-medium text-primary">
                      {edu.status}
                    </p>
                  )}

                  {edu.details && (
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                      {edu.details}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Education;
