import { motion } from "motion/react";

import { createFadeUp } from "../lib/motion";

// Same entrance as the project details route so navigation feels consistent.
const pageVariants = createFadeUp({ y: 12, duration: 0.45 });

function NotFound() {
  return (
    <motion.main
      variants={pageVariants}
      initial="hidden"
      animate="show"
      className="flex min-h-screen items-center justify-center bg-background text-foreground"
    >
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          404
        </p>

        <h1 className="mt-4 text-4xl font-bold">
          Page Not Found
        </h1>

        <p className="mt-4 text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
      </div>
    </motion.main>
  );
}

export default NotFound;