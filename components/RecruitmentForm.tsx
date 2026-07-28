"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

interface Role {
  label: string;
}

interface Props {
  roles: Role[];
  submitLabel: string;
  successTitle: string;
  successBody: string;
}

const FIELD =
  "w-full px-4 py-3 bg-bone/5 border border-bone/10 text-bone placeholder:text-bone/30 focus:outline-none focus:border-accent transition-colors";

const LABEL =
  "block text-xs font-bold tracking-[0.2em] uppercase mb-3 text-bone/60";

export default function RecruitmentForm({
  roles,
  submitLabel,
  successTitle,
  successBody,
}: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/meeypjqr", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      setSubmitted(true);
      form.reset();
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center min-h-[20rem]">
        <Sparkles className="w-16 h-16 text-accent mb-6" />

        <h3 className="text-2xl font-bold mb-4">
          {successTitle}
        </h3>

        <p className="text-bone/60">
          {successBody}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className={LABEL}>First Name</label>

          <input
            type="text"
            name="firstName"
            required
            className={FIELD}
            placeholder="Your first name"
          />
        </div>

        <div>
          <label className={LABEL}>Last Name</label>

          <input
            type="text"
            name="lastName"
            required
            className={FIELD}
            placeholder="Your last name"
          />
        </div>
      </div>

      <div>
        <label className={LABEL}>Email</label>

        <input
          type="email"
          name="email"
          required
          className={FIELD}
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className={LABEL}>Role</label>

        <select
          name="role"
          required
          className={FIELD}
          defaultValue=""
        >
          <option value="">Select a role...</option>

          {roles.map((role, i) => (
            <option key={i} value={role.label}>
              {role.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={LABEL}>Portfolio / Links</label>

        <input
          type="url"
          name="portfolio"
          className={FIELD}
          placeholder="https://yourportfolio.com"
        />
      </div>

      {error && (
        <p className="text-accent text-sm">
          Something went wrong. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 bg-accent text-white font-bold text-sm tracking-[0.2em] uppercase hover:bg-accent/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Submitting..." : submitLabel}
      </button>
    </form>
  );
}