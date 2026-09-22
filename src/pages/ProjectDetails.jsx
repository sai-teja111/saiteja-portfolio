import { motion } from "motion/react";
import { useParams } from "react-router";

import { createFadeUp } from "../lib/motion";

// Matches the portfolio's reveal language so a route change feels like one
// continuous experience instead of a jump.
const pageVariants = createFadeUp({ y: 12, duration: 0.45 });

function ProjectDetails() {
  const { id } = useParams();

  return (
    <motion.main
      variants={pageVariants}
      initial="hidden"
      animate="show"
      className="flex min-h-screen items-center justify-center bg-background text-foreground"
    >
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Project
        </p>

        <h1 className="mt-4 text-4xl font-bold">
          {id}
        </h1>
      </div>
    </motion.main>
  );
}

export default ProjectDetails;