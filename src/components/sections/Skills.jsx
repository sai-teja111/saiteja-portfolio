import { motion } from "motion/react";

import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import { skillCategories } from "../../data/skills";
import {
  createFadeUp,
  createStagger,
  fadeUpSubtle,
  hoverLift,
  hoverLiftCard,
  viewportOnceEarly,
} from "../../lib/motion";

// Category cards arrive one after another; their skill chips follow shortly.
// No explicit delays: staggerChildren / delayChildren run the sequence,
// so children inherit timing instead of overriding it.
const categoriesStagger = createStagger(0.09);
const skillsStagger = createStagger(0.03, 0.08);
const categoryVariants = createFadeUp({ y: 20, duration: 0.5 });

function SkillCard({ skill }) {
  const Icon = skill.icon;

  return (
    <motion.div
      variants={fadeUpSubtle}
      whileHover={hoverLift}
      className="group relative flex items-center gap-2.5 overflow-hidden rounded-lg border border-border px-3.5 py-2.5 transition-colors duration-300 bg-surface/60 hover:border-primary/40 hover:bg-surface"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-primary opacity-0 transition-opacity duration-350 group-hover:opacity-[0.07]"
      />
      <span className="relative z-10 flex h-4 w-4 shrink-0 items-center justify-center transition-transform duration-200 ease-out group-hover:scale-105">
        <Icon size={16} color={skill.color} aria-hidden="true" />
      </span>
      <span className="relative z-10 min-w-0 wrap-break-word text-sm font-medium text-foreground">
        {skill.name}
      </span>
    </motion.div>
  );
}

function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-24 border-t border-border py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <SectionHeading
          eyebrow="Skills"
          title="Technologies I work with"
          description="A focused stack for building practical full-stack applications — from backend APIs and databases to responsive frontends and cloud deployment."
        />

        <motion.div
          variants={categoriesStagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnceEarly}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={categoryVariants}
              whileHover={hoverLiftCard}
              className="group relative min-w-0 overflow-hidden rounded-2xl border border-border p-6 card-glow-hover bg-card"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(400px circle at var(--card-x,50%) var(--card-y,-20%), rgba(59,130,246,0.08), transparent 40%)",
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
                      "linear-gradient(135deg, rgba(59,130,246,0.4) 0%, rgba(6,182,212,0.3) 100%)",
                    WebkitMask:
                      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
              </div>

              <div className="relative z-10 flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-primary/15 to-accent/15">
                  <span className="h-2 w-2 rounded-full bg-gradient-primary" />
                </span>
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-gradient-primary">
                  {category.title}
                </h3>
              </div>

              <motion.div
                variants={skillsStagger}
                className="relative z-10 mt-5 flex flex-wrap gap-2"
              >
                {category.skills.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

export default Skills;
