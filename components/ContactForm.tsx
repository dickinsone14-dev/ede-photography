"use client";

import { useState, FormEvent, useCallback } from "react";

interface FieldErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validate(field: string, value: string): string | undefined {
  switch (field) {
    case "name":
      if (!value.trim()) return "Please enter your name";
      if (value.trim().length < 2) return "Name must be at least 2 characters";
      return undefined;
    case "email":
      if (!value.trim()) return "Please enter your email address";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
        return "Please enter a valid email address";
      return undefined;
    case "subject":
      if (!value) return "Please select a subject";
      return undefined;
    case "message":
      if (!value.trim()) return "Please enter a message";
      if (value.trim().length < 10)
        return "Message must be at least 10 characters";
      return undefined;
    default:
      return undefined;
  }
}

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const handleBlur = useCallback(
    (field: string, value: string) => {
      setTouched((prev) => new Set(prev).add(field));
      const error = validate(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    },
    []
  );

  const handleChange = useCallback(
    (field: string, value: string) => {
      if (touched.has(field)) {
        const error = validate(field, value);
        setErrors((prev) => ({ ...prev, [field]: error }));
      }
    },
    [touched]
  );

  const isFormValid = useCallback(
    (form: HTMLFormElement): boolean => {
      const data = new FormData(form);
      const newErrors: FieldErrors = {};
      let valid = true;

      for (const field of ["name", "email", "subject", "message"]) {
        const error = validate(field, (data.get(field) as string) || "");
        if (error) {
          newErrors[field as keyof FieldErrors] = error;
          valid = false;
        }
      }

      setErrors(newErrors);
      setTouched(new Set(["name", "email", "subject", "message"]));
      return valid;
    },
    []
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    if (!isFormValid(form)) return;

    setStatus("sending");
    const data = new FormData(form);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_URL!, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("sent");
        form.reset();
        setErrors({});
        setTouched(new Set());
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="alert" className="bg-brand-surface rounded-lg p-8 text-center">
        <p className="text-lg font-medium text-brand-text">Message sent</p>
        <p className="text-brand-text-light mt-2">
          Thanks for getting in touch. I&apos;ll get back to you soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm text-brand-teal hover:text-brand-teal-hover transition-colors underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputClass = (field: keyof FieldErrors) =>
    `w-full bg-neutral-900 border rounded-lg px-4 py-3 text-sm text-brand-text placeholder-brand-text-faint focus:outline-none focus:ring-2 transition-colors ${
      touched.has(field) && errors[field]
        ? "border-red-500/60 focus:ring-red-500/30 focus:border-red-500"
        : "border-brand-border focus:ring-brand-accent/30 focus:border-brand-accent"
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-brand-text mb-2">
          Name <span className="text-brand-text-faint">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className={inputClass("name")}
          placeholder="Your name"
          onBlur={(e) => handleBlur("name", e.target.value)}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        {touched.has("name") && errors.name && (
          <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-brand-text mb-2">
          Email <span className="text-brand-text-faint">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className={inputClass("email")}
          placeholder="your@email.com"
          onBlur={(e) => handleBlur("email", e.target.value)}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        {touched.has("email") && errors.email && (
          <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-brand-text mb-2">
          Subject <span className="text-brand-text-faint">*</span>
        </label>
        <select
          id="subject"
          name="subject"
          className={inputClass("subject")}
          onBlur={(e) => handleBlur("subject", e.target.value)}
          onChange={(e) => handleChange("subject", e.target.value)}
          defaultValue=""
        >
          <option value="">Select a subject</option>
          <option value="Print enquiry">Print enquiry</option>
          <option value="Licensing">Licensing</option>
          <option value="Commission">Commission</option>
          <option value="Collaboration">Collaboration</option>
          <option value="General">General enquiry</option>
        </select>
        {touched.has("subject") && errors.subject && (
          <p className="mt-1.5 text-xs text-red-400">{errors.subject}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-brand-text mb-2">
          Message <span className="text-brand-text-faint">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className={`${inputClass("message")} resize-none`}
          placeholder="Tell me about your project or enquiry..."
          onBlur={(e) => handleBlur("message", e.target.value)}
          onChange={(e) => handleChange("message", e.target.value)}
        />
        {touched.has("message") && errors.message && (
          <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-brand-accent text-white font-medium py-3 px-6 rounded-lg hover:bg-brand-accent-hover hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>

      {status === "error" && (
        <p role="alert" className="text-red-500 text-sm text-center">
          Something went wrong. Please try again or email directly.
        </p>
      )}
    </form>
  );
}
