import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Send } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

import { contact, whatsappUrl } from "../../data/contact";
import { createFadeUp, easeOut, viewportOnce } from "../../lib/motion";
import Button from "../common/Button";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";

// The contact block reveals in two stages: details first, form right after.
// Kept small (0ms / 120ms) so both panels feel simultaneous yet ordered.
const contactInfoVariants = createFadeUp({ y: 20, duration: 0.5 });
const contactFormVariants = createFadeUp({ y: 20, duration: 0.5, delay: 0.12 });

const initialFormData = {
  name: "",
  phone: "",
  email: "",
  reason: "",
  message: "",
};

const WEB3FORMS_ACCESS_KEY = "e9a54584-94d1-42bd-a050-ec3d739a69f9";

function Contact() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setSubmissionMessage("");
    setSubmissionStatus("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const nextErrors = Object.fromEntries(
      Object.entries(formData)
        .filter(([, value]) => !value.trim())
        .map(([name]) => [name, "This field is required."]),
    );

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmissionStatus("error");
      setSubmissionMessage("Please complete the required fields and try again.");
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus("");
    setSubmissionMessage("");

    try {
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: "New Contact Form Submission",
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        reason: formData.reason,
        message: formData.message,
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmissionStatus("success");
        setSubmissionMessage(
          "Thank you for reaching out. Your message has been sent successfully — I'll get back to you soon.",
        );
        setFormData(initialFormData);
        setErrors({});
      } else {
        throw new Error(result.message || "Submission failed. Please try again.");
      }
    } catch {
      setSubmissionStatus("error");
      setSubmissionMessage(
        "Something went wrong while sending your message. Please try again or reach me directly by email.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-border py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="Have a project or opportunity?"
          description="I'm open to discussing full-stack roles, Python backend work, and collaborations that involve building practical, well-engineered applications."
          align="center"
          titleClassName="text-[1.75rem] sm:text-[2.125rem] lg:text-[2.5rem]"
          descriptionClassName="text-sm leading-6 sm:text-base"
        />

        <div className="mt-14 grid min-w-0 items-start gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
          <motion.div
            variants={contactInfoVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 card-glow-hover sm:p-8"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.1) 0%, transparent 55%)",
              }}
            />

            <div className="relative z-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-linear-to-br from-primary/25 via-primary/12 to-accent/15 text-primary shadow-lg shadow-primary/10">
                <Mail size={21} />
              </div>

              <h3 className="mt-6 text-2xl font-bold tracking-tight text-foreground">
                <span className="text-gradient-primary">Let's connect.</span>
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Email is a great way to start a conversation about a project,
                role, or collaboration.
              </p>

              <div className="mt-7 space-y-3">
                <div className="rounded-xl border border-border bg-background/30 p-4">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    <Mail size={13} aria-hidden="true" />
                    Email
                  </p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="mt-1.5 block break-all text-sm font-medium text-primary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                  >
                    {contact.email}
                  </a>
                </div>

                <div className="rounded-xl border border-border bg-background/30 p-4">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    <SiWhatsapp size={13} aria-hidden="true" />
                    WhatsApp
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contact me on WhatsApp"
                    className="mt-1.5 block text-sm font-medium text-primary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button as="a" href={`mailto:${contact.email}`} withArrow>
                  Email Me
                </Button>

                <Button
                  as="a"
                  href={whatsappUrl}
                  variant="secondary"
                  external
                  aria-label="Contact me on WhatsApp"
                  title="Chat with me on WhatsApp"
                  className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <SiWhatsapp size={17} aria-hidden="true" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.form
            noValidate
            onSubmit={handleSubmit}
            variants={contactFormVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 card-glow-hover sm:p-8"
          >
            <div className="relative z-10">
              <div className="mb-6">
                <h3 className="text-xl font-bold tracking-tight text-foreground">
                  Contact form
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  All fields are required.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  label="Name"
                  name="name"
                  type="text"
                  value={formData.name}
                  error={errors.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
                <FormField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  error={errors.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                />
              </div>

              <div className="mt-5">
                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  error={errors.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>

              <div className="mt-5">
                <FormField
                  label="Reason for Contact"
                  name="reason"
                  type="text"
                  value={formData.reason}
                  error={errors.reason}
                  onChange={handleChange}
                />
              </div>

              <div className="mt-5">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={inputClassName(errors.message)}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1.5 text-xs text-red-400" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              {submissionMessage && (
                <motion.p
                  role="status"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: easeOut }}
                  className={`mt-5 text-sm leading-6 ${
                    submissionStatus === "success"
                      ? "text-primary"
                      : submissionStatus === "error"
                        ? "text-red-400"
                        : Object.keys(errors).some((key) => errors[key])
                          ? "text-red-400"
                          : "text-primary"
                  }`}
                >
                  {submissionMessage}
                </motion.p>
              )}

              <Button type="submit" className="mt-6" disabled={isSubmitting}>
                <Send size={17} />
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </motion.form>
        </div>
      </Container>
    </section>
  );
}

function FormField({ label, name, type, value, error, onChange, autoComplete }) {
  const errorId = `${name}-error`;

  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={inputClassName(error)}
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function inputClassName(hasError) {
  return `mt-2 w-full rounded-lg border bg-background/40 px-3.5 py-2.5 text-sm text-foreground outline-none transition-[background-color,border-color,box-shadow,color] duration-200 ease-out placeholder:text-muted-foreground focus:border-primary focus:bg-background/60 focus:ring-2 focus:ring-primary/20 ${
    hasError ? "border-red-400" : "border-border"
  }`;
}

export default Contact;
