function SocialLink({ href, icon: Icon, label, external = true }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-border bg-card text-muted-foreground transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary hover:shadow-[0_0_0_1px_rgba(59,130,246,0.15),0_10px_25px_-10px_rgba(59,130,246,0.35),0_8px_18px_-8px_rgba(6,182,212,0.15)] active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-primary opacity-0 transition-opacity duration-300 group-hover:opacity-10"
      />
      {Icon && (
        <span className="relative z-10 transition-transform duration-200 ease-out group-hover:scale-105">
          <Icon size={19} />
        </span>
      )}
    </a>
  );
}

export default SocialLink;
