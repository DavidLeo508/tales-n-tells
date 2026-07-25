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
const LABEL = "block text-xs font-bold tracking-[0.2em] uppercase mb-3 text-bone/60";

export default function RecruitmentForm({ roles, submitLabel, successTitle, successBody }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);
    const formData = new FormData(e.currentTarget);
    try {
      // POST to the static skeleton so Netlify's form handler processes it
      // (a POST to "/" would be intercepted by the Next.js SSR handler).
      await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });
      setSubmitted(true);
    } catch {
      setError(true);
    }
  }

  if (submitted) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center min-h-[20rem]">
        <Sparkles className="w-16 h-16 text-accent mb-6" />
        <h3 className="text-2xl font-bold mb-4">{successTitle}</h3>
        <p className="text-bone/60">{successBody}</p>
      </div>
    );
  }

  return (
 <form
  action="https://formspree.io/f/meeypjqr"
  method="POST"
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
        <input type="email" name="email" required className={FIELD} placeholder="your@email.com" />
      </div>

      <div>
        <label className={LABEL}>Role</label>
        <select name="role" required className={FIELD}>
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
        <input type="url" name="portfolio" className={FIELD} placeholder="https://yourportfolio.com" />
      </div>

      {error && (
        <p className="text-accent text-sm">Something went wrong. Please try again.</p>
      )}

      <button
        type="submit"
        className="w-full py-4 bg-accent text-white font-bold text-sm tracking-[0.2em] uppercase hover:bg-accent/80 transition-all"
      >
        {submitLabel}
      </button>
    </form>
  );
}
