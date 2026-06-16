"use client";

import { useState } from "react";

interface Props {
  placeholder: string;
  buttonLabel: string;
}

export default function NewsletterForm({ placeholder, buttonLabel }: Props) {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });
    } finally {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <p className="text-accent text-lg font-bold tracking-widest uppercase">
        You&apos;re on the list.
      </p>
    );
  }

  return (
    <form
      name="newsletter"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-4 justify-center"
    >
      <input type="hidden" name="form-name" value="newsletter" />
      <p className="hidden">
        <label>
          Don&apos;t fill this out: <input name="bot-field" />
        </label>
      </p>
      <input
        type="email"
        name="email"
        required
        placeholder={placeholder}
        className="px-6 py-4 bg-bone/10 border border-bone/20 text-bone placeholder:text-bone/40 focus:outline-none focus:border-accent transition-colors"
      />
      <button
        type="submit"
        data-sb-field-path=".buttonLabel"
        className="px-8 py-4 bg-accent text-white font-bold tracking-widest uppercase hover:bg-accent/80 transition-all"
      >
        {buttonLabel}
      </button>
    </form>
  );
}
