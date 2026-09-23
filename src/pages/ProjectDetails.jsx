import { motion } from "motion/react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  CheckSquare,
  Code2,
  ExternalLink,
  FolderOpen,
  Wrench,
} from "lucide-react";

import Container from "../components/common/Container";
import Button from "../components/common/Button";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import BackToTop from "../components/common/BackToTop";
import ScrollProgress from "../components/common/ScrollProgress";
import { projects } from "../data/projects";
import {
  createFadeUp,
  createStagger,
  hoverLift,
  hoverLiftCard,
} from "../lib/motion";

// Matches the portfolio's reveal language so a route change feels like one
// continuous experience instead of a jump.
const pageVariants = createFadeUp({ y: 12, duration: 0.45 });
const contentStagger = createStagger(0.07);
const itemVariants = createFadeUp({ y: 12, duration: 0.45 });
const chipVariants = createFadeUp({ y: 8, duration: 0.35 });

const isExternalPlaceholder = "[ADD ";

function isPlaceholder(value) {
  return (
    !value ||
    (typeof value === "string" && value.startsWith(isExternalPlaceholder))
  );
}

function ProjectDetails() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <>
        <ScrollProgress />
        <Navbar />
        <motion.main
          variants={pageVariants}
          initial="hidden"
          animate="show"
          className="flex min-h-screen items-center justify-center bg-background text-foreground"
        >
          <Container>
            <div className="mx-auto max-w-xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Project
              </p>
              <h1 className="mt-4 text-4xl font-bold">Project not found</h1>
              <p className="mt-4 text-muted-foreground">
                The project you are looking for does not exist.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button as={Link} to="/" variant="secondary" size="sm">
                  <ArrowLeft size={14} />
                  Back to home
                </Button>
                <Button
                  as="a"
                  href="/#projects"
                  variant="secondary"
                  size="sm"
                  withArrow
                >
                  View projects
                </Button>
              </div>
            </div>
          </Container>
        </motion.main>
        <Footer />
        <BackToTop />
      </>
    );
  }

  const statusColor =
    project.status === "Currently Building"
      ? "bg-accent/15 text-accent border-accent/30"
      : "bg-primary/15 text-primary border-primary/30";

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <motion.main
        variants={pageVariants}
        initial="hidden"
        animate="show"
        className="bg-background pt-28 pb-20 text-foreground sm:pt-32 sm:pb-24"
      >
        <Container>
          <motion.div
            variants={contentStagger}
            initial="hidden"
            animate="show"
            className="mx-auto max-w-4xl"
          >
            <motion.div variants={itemVariants}>
              <Button as={Link} to="/#projects" variant="ghost" size="sm">
                <ArrowLeft size={14} />
                All projects
              </Button>
            </motion.div>

            <motion.article
              variants={itemVariants}
              whileHover={hoverLiftCard}
              className="group relative mt-6 flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors card-glow-hover"
            >
              <div className="relative overflow-hidden border-b border-border bg-surface aspect-video">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-60"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 45%, rgba(11, 17, 32, 0.7) 90%), linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(6,182,212,0.08) 100%)",
                  }}
                />

                {project.image && !isPlaceholder(project.image) ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    style={
                      project.imagePosition
                        ? { objectPosition: project.imagePosition }
                        : undefined
                    }
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="relative flex h-full w-full items-center justify-center text-border">
                    <FolderOpen size={72} strokeWidth={1.25} />
                  </div>
                )}
              </div>

              <div className="relative z-10 flex min-w-0 flex-1 flex-col p-6 sm:p-8">
                <motion.div variants={itemVariants}>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${statusColor}`}
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
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
                >
                  {project.title}
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7"
                >
                  {project.description}
                </motion.p>

                {project.technologies && project.technologies.length > 0 && (
                  <motion.div variants={itemVariants} className="mt-6">
                    <div className="mb-2.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      <Wrench size={12.5} className="text-primary" />
                      Tech stack
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((t) => (
                        <motion.span
                          key={t}
                          variants={chipVariants}
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
                  </motion.div>
                )}

                {project.features && project.features.length > 0 && (
                  <motion.div variants={itemVariants} className="mt-6">
                    <div className="mb-2.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      <CheckSquare size={12.5} className="text-primary" />
                      Features
                    </div>
                    <ul className="space-y-1.5">
                      {project.features.map((f) => (
                        <motion.li
                          key={f}
                          variants={itemVariants}
                          className="text-sm text-muted-foreground before:mr-2 before:font-bold before:text-gradient-primary before:content-['›']"
                        >
                          {f}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                <motion.div
                  variants={itemVariants}
                  className="mt-8 flex flex-wrap items-center gap-3"
                >
                  {!isPlaceholder(project.github) && (
                    <Button
                      as="a"
                      href={project.github}
                      variant="secondary"
                      size="sm"
                      external
                      withArrow
                    >
                      <Code2 size={14} />
                      View Source
                    </Button>
                  )}
                  {!isPlaceholder(project.liveDemo) && (
                    <Button
                      as="a"
                      href={project.liveDemo}
                      variant="secondary"
                      size="sm"
                      external
                      withArrow
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </Button>
                  )}
                </motion.div>
              </div>
            </motion.article>
          </motion.div>
        </Container>
      </motion.main>
      <Footer />
      <BackToTop />
    </>
  );
}

export default ProjectDetails;