"use client";

import { useState, FormEvent } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="bg-charcoal-800 rounded-lg p-8 text-center">
        <p className="text-lg font-medium">Message sent</p>
        <p className="text-gray-400 mt-2">
          Thanks for getting in touch. I&apos;ll get back to you soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm text-gray-400 hover:text-white transition-colors underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full bg-charcoal-800 border border-white/10 rounded-lg px-4 py-3 text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full bg-charcoal-800 border border-white/10 rounded-lg px-4 py-3 text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          required
          className="w-full bg-charcoal-800 border border-white/10 rounded-lg px-4 py-3 text-sm text-gray-100 focus:outline-none focus:border-white/30 transition-colors"
        >
          <option value="">Select a subject</option>
          <option value="Print enquiry">Print enquiry</option>
          <option value="Licensing">Licensing</option>
          <option value="Commission">Commission</option>
          <option value="Collaboration">Collaboration</option>
          <option value="General">General enquiry</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full bg-charcoal-800 border border-white/10 rounded-lg px-4 py-3 text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors resize-none"
          placeholder="Tell me about your project or enquiry..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-white text-charcoal-900 font-medium py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>

      {status === "error" && (
        <p className="text-red-400 text-sm text-center">
          Something went wrong. Please try again or email directly.
        </p>
      )}
    </form>
  );
}
