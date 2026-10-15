import { useState, type FocusEvent, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMagnetic } from "../../lib/useMagnetic";

const SERVICES = ["Website", "Ads", "AI Property Video", "Not sure yet"];
const CONTACT_EMAIL = "hello@trovana-hub.com";

type FormState = {
  name: string;
  email: string;
  service: string;
  details: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function FloatingField({
  id,
  label,
  value,
  error,
  onChange,
  onBlur,
  type = "text",
  textarea = false,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  type?: string;
  textarea?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;
  const sharedProps = {
    id,
    name: id,
    value,
    onChange: (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.currentTarget.value),
    onFocus: () => setFocused(true),
    onBlur: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFocused(false);
      onBlur();
      void e;
    },
    className:
      "peer w-full rounded-xl border border-warmgrey/30 bg-transparent px-4 pt-6 pb-2 text-stone outline-none transition-colors duration-300 focus:border-ember focus:shadow-[0_0_0_4px_rgba(255,106,43,0.15)]",
    "aria-invalid": Boolean(error),
  };

  return (
    <div>
      <div className="relative">
        {textarea ? (
          <textarea rows={4} {...sharedProps} />
        ) : (
          <input type={type} {...sharedProps} />
        )}
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-4 text-warmgrey transition-all duration-300"
          style={
            floated
              ? { top: "0.5rem", fontSize: "0.7rem", color: "#FF6A2B" }
              : { top: "1.1rem", fontSize: "1rem" }
          }
        >
          {label}
        </label>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-1 text-xs text-ember"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    service: SERVICES[3],
    details: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const magnetic = useMagnetic<HTMLButtonElement>(0.3);

  const validate = (field: keyof FormState, value: string): string | undefined => {
    if (field === "name" && !value.trim()) return "Please tell us your name.";
    if (field === "email") {
      if (!value.trim()) return "Please add your email.";
      if (!EMAIL_RE.test(value)) return "That email doesn't look right.";
    }
    if (field === "details" && !value.trim()) return "Tell us a little about the project.";
    return undefined;
  };

  const setField = (field: keyof FormState) => (value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const onBlurField = (field: keyof FormState) => () =>
    setErrors((e) => ({ ...e, [field]: validate(field, form[field]) }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const nextErrors: FormErrors = {
      name: validate("name", form.name),
      email: validate("email", form.email),
      details: validate("details", form.details),
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Couldn't send your message. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Couldn't send your message.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-charcoal px-5 py-28">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-display text-4xl font-semibold tracking-tight text-stone sm:text-5xl">
          Let's build <span className="font-accent italic text-ember">something.</span>
        </h2>
        <p className="mt-4 text-warmgrey">
          Or email us directly at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-ember underline underline-offset-4">
            {CONTACT_EMAIL}
          </a>
        </p>

        <div className="relative mt-10">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-4 rounded-3xl border border-warmgrey/20 bg-espresso/30 py-20 text-center"
              >
                <motion.svg
                  width="56"
                  height="56"
                  viewBox="0 0 56 56"
                  fill="none"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 14 }}
                >
                  <circle cx="28" cy="28" r="27" stroke="#FF6A2B" strokeWidth="2" />
                  <motion.path
                    d="M17 29l7 7 15-15"
                    stroke="#FF6A2B"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </motion.svg>
                <p className="font-display text-xl font-semibold text-stone">Message sent.</p>
                <p className="max-w-xs text-sm text-warmgrey">
                  We've received your message and will be in touch soon.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-sm font-medium text-ember underline underline-offset-4"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-5"
                noValidate
              >
                <FloatingField
                  id="name"
                  label="Name"
                  value={form.name}
                  error={errors.name}
                  onChange={setField("name")}
                  onBlur={onBlurField("name")}
                />
                <FloatingField
                  id="email"
                  label="Email"
                  type="email"
                  value={form.email}
                  error={errors.email}
                  onChange={setField("email")}
                  onBlur={onBlurField("email")}
                />

                <div className="relative">
                  <select
                    id="service"
                    value={form.service}
                    onChange={(e) => setField("service")(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-warmgrey/30 bg-charcoal px-4 pt-6 pb-2 text-stone outline-none transition-colors duration-300 focus:border-ember focus:shadow-[0_0_0_4px_rgba(255,106,43,0.15)]"
                  >
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <label
                    htmlFor="service"
                    className="pointer-events-none absolute left-4 top-2 text-[0.7rem] text-ember"
                  >
                    Service
                  </label>
                </div>

                <FloatingField
                  id="details"
                  label="Project details"
                  value={form.details}
                  error={errors.details}
                  onChange={setField("details")}
                  onBlur={onBlurField("details")}
                  textarea
                />

                <AnimatePresence>
                  {submitError && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="text-sm text-ember"
                    >
                      {submitError}
                    </motion.p>
                  )}
                </AnimatePresence>

                <button
                  ref={magnetic.ref}
                  onPointerMove={magnetic.onPointerMove}
                  onPointerLeave={magnetic.onPointerLeave}
                  data-cursor="Go"
                  type="submit"
                  disabled={submitting}
                  className="mt-2 rounded-full bg-ember px-8 py-4 text-sm font-semibold text-charcoal transition-transform duration-300 hover:shadow-[0_0_30px_rgba(255,106,43,0.5)] disabled:opacity-60"
                >
                  {submitting ? "Sending…" : "Send message"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
