import { motion } from "motion/react";

import {
  createFadeUp,
  createStagger,
  ruleDrawIn,
  viewportOnce,
} from "../../lib/motion";

// The heading reveals itself: eyebrow, title, description, then the rule.
// Explicit delays are intentionally omitted so the parent's staggerChildren
// orchestrates the sequence instead of being overridden.
const headingStagger = createStagger(0.07);
const eyebrowVariants = createFadeUp({ y: 10, duration: 0.4 });
const titleVariants = createFadeUp({ y: 18, duration: 0.5 });
const descriptionVariants = createFadeUp({ y: 18, duration: 0.5 });
const ruleVariants = ruleDrawIn;

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  titleClassName = "",
  descriptionClassName = "",
}) {
  const alignClasses = align === "center" ? "mx-auto text-center" : "";

  return (
    <motion.div
      variants={headingStagger}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={`max-w-2xl ${alignClasses}`}
    >
      {eyebrow && (
        <motion.div
          variants={eyebrowVariants}
          className={`mb-4 inline-flex items-center gap-2 ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gradient-primary" />
          </span>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gradient-primary">
            {eyebrow}
          </p>
        </motion.div>
      )}

      <motion.h2
        variants={titleVariants}
        className={`text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] ${titleClassName}`}
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          variants={descriptionVariants}
          className={`mt-4 text-base leading-7 text-muted-foreground sm:text-lg ${descriptionClassName}`}
        >
          {description}
        </motion.p>
      )}

      <motion.div
        variants={ruleVariants}
        style={{
          transformOrigin: align === "center" ? "center center" : "left center",
        }}
        className={`mt-6 h-px w-24 bg-gradient-primary ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </motion.div>
  );
}

export default SectionHeading;
