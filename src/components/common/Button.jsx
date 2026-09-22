import { ArrowUpRight } from "lucide-react";

const variants = {
  primary:
    "relative overflow-hidden bg-gradient-primary text-primary-foreground shadow-md shadow-primary/20 hover:shadow-xl hover:shadow-primary/30",
  secondary:
    "relative overflow-hidden border border-border bg-card text-foreground hover:border-primary/40 hover:bg-surface hover:text-primary",
  ghost: "text-muted-foreground hover:bg-surface hover:text-foreground",
};

const sizes = {
  sm: "px-3.5 py-2 text-xs",
  md: "px-5 py-3 text-sm",
  lg: "px-6 py-3.5 text-base",
};

function Button({
  as: Component = "button",
  variant = "primary",
  size = "md",
  className = "",
  children,
  withArrow = false,
  external = false,
  ...props
}) {
  // Hover lift and tap press are plain Tailwind transitions: no Motion needed
  // for such simple interactions, and they stay smooth on every device.
  // The focus ring is drawn with a box-shadow so it survives the overflow clip.
  const baseClasses =
    "inline-flex items-center gap-2 rounded-lg font-semibold transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 group relative overflow-hidden";

  const content = (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {withArrow && <ArrowUpRight size={size === "sm" ? 14 : 17} />}
      </span>
    </>
  );

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  if (Component === "a") {
    return (
      <a
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}

export default Button;
