import { motion } from "motion/react";
import {
  Code2,
  ExternalLink,
  FolderOpen,
  Wrench,
  CheckSquare,
} from "lucide-react";

import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import Button from "../common/Button";
import { projects } from "../../data/projects";
import {
  createSoftScaleIn,
  easeOut,
  fadeUpSubtle,
  hoverLift,
  hoverLiftCard,
  viewportOnceEarly,
} from "../../lib/motion";

const isExternalPlaceholder = "[ADD ";

// Placeholder artwork fades in gently behind the card content.
// No explicit delay: the parent card's delayChildren already sequences it.
const fallbackIconVariants = createSoftScaleIn({
  scale: 0.96,
  duration: 0.5,
});

function isPlaceholder(value) {
  return (
    !value ||
    (typeof value === "string" && value.startsWith(isExternalPlaceholder))
  );
}

function ProjectCard({ project, index }) {
  const statusColor =
    project.status === "Currently Building"
      ? "bg-accent/15 text-accent border-accent/30"
      : "bg-primary/15 text-primary border-primary/30";

  // Each card reveals when it enters the viewport; cards near the start of a
  // row follow each other with a small stagger (0ms / 70ms / 140ms cap),
  // and the content inside the card fades in right after it.
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: easeOut,
        delay: Math.min(index, 2) * 0.07,
        staggerChildren: 0.05,
        delayChildren: 0.08,
      },
    },
  };

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnceEarly}
      whileHover={hoverLiftCard}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors card-glow-hover"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(500px circle at var(--card-x,50%) var(--card-y,-10%), rgba(59,130,246,0.12), transparent 40%)",
        }}
      />

      <div className="relative overflow-hidden border-b border-border bg-surface aspect-video">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(180deg, transparent 45%, rgba(11, 17, 32, 0.7) 90%), linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(6,182,212,0.08) 100%)",
          }}
        />

        {project.image && !isPlaceholder(project.image) ? (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div className="relative flex h-full w-full items-center justify-center text-border">
            <motion.div variants={fallbackIconVariants}>
              <FolderOpen size={52} strokeWidth={1.1} />
            </motion.div>
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(59,130,246,0.12) 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            />
          </div>
        )}

        <div className="absolute left-4 top-4 z-10">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border backdrop-blur-md bg-background/40 px-2.5 py-1 text-xs font-medium ${statusColor}`}
          >
            <span
              className={`relative h-1.5 w-1.5 rounded-full ${
                project.status === "Currently Building"
                  ? "bg-accent"
                  : "bg-primary"
              }`}
            >
              {project.status === "Currently Building" && (
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-30" />
              )}
            </span>
            {project.status}
          </span>
        </div>

        <motion.div
          variants={fadeUpSubtle}
          className="absolute right-4 top-4 z-10 flex shrink-0 items-center gap-1.5"
        >
          {!isPlaceholder(project.github) && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground backdrop-blur-md bg-background/50 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Code2 size={15} />
            </a>
          )}

          {!isPlaceholder(project.liveDemo) && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground backdrop-blur-md bg-background/50 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <ExternalLink size={15} />
            </a>
          )}
        </motion.div>
      </div>

      <div className="relative z-10 flex min-w-0 flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="min-w-0 wrap-break-word text-lg font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
            {project.title}
          </h3>
        </div>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {project.description}
        </p>

        {project.features && project.features.length > 0 && (
          <div className="mt-5">
            <div className="mb-2.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              <CheckSquare size={12.5} className="text-primary" />
              Features
            </div>
            <ul className="space-y-1.5">
              {project.features.map((f) => (
                <motion.li
                  key={f}
                  variants={fadeUpSubtle}
                  className="text-sm text-muted-foreground before:mr-2 before:font-bold before:text-gradient-primary before:content-['›']"
                >
                  {f}
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {project.technologies && project.technologies.length > 0 && (
          <div className="mt-5">
            <div className="mb-2.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              <Wrench size={12.5} className="text-primary" />
              Tech
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((t) => (
                <motion.span
                  key={t}
                  variants={fadeUpSubtle}
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
          </div>
        )}

        <div className="mt-auto pt-6">
          {!isPlaceholder(project.github) ? (
            <Button
              as="a"
              href={project.github}
              variant="secondary"
              size="sm"
              external
              withArrow
            >
              View Source
            </Button>
          ) : (
            <span className="inline-block rounded-md text-sm text-muted-foreground/90">
              {project.github}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-24 border-t border-border py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          description="A snapshot of projects where I've applied Python, FastAPI, React, databases, and cloud tools to build practical full-stack applications."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Projects;
