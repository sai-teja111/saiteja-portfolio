import { Mail, Phone } from "lucide-react";

import { contact } from "../../data/contact";
import Container from "../common/Container";

function Footer() {
  return (
    <footer className="border-t border-border pt-10 pb-20 sm:pt-12 sm:pb-24">
      <Container>
        <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:items-start md:text-left">
          <div>
            <p className="text-sm font-bold tracking-[0.16em] text-foreground">
              SAI TEJA<span className="text-gradient-primary">.</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Python Full Stack Developer
            </p>
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Contact
            </p>
            <div className="mt-3 space-y-2.5">
              <a
                href={`tel:${contact.phone}`}
                className="inline-flex flex-wrap items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Phone size={15} aria-hidden="true" />
                <span className="font-medium text-foreground/80">Phone:</span>
                {contact.phone}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background md:justify-start"
              >
                <Mail size={15} aria-hidden="true" />
                <span className="font-medium text-foreground/80">Email:</span>
                <span className="break-all">{contact.email}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-1 border-t border-border pt-6 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
          <p>&copy; 2026 Sai Teja Kandula. All rights reserved.</p>
          <p>Built with React, Tailwind CSS &amp; Motion.</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
