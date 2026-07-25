"use client";

import { useState } from "react";

interface Props {
  placeholder: string;
  buttonLabel: string;
}

export default function NewsletterForm({
  placeholder,
  buttonLabel,
}: Props) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setSubmitted(true);
      setEmail("");
    } catch (error) {
      console.error("Newsletter submission error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-4 justify-center"
    >
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder={placeholder}
        className="px-6 py-4 bg-bone/10 border border-bone/20 text-bone placeholder:text-bone/40 focus:outline-none focus:border-accent transition-colors"
      />

      <button
        type="submit"
        disabled={loading}
        data-sb-field-path=".buttonLabel"
        className="px-8 py-4 bg-accent text-white font-bold tracking-widest uppercase hover:bg-accent/80 transition-all disabled:opacity-50"
      >
        {loading ? "SUBSCRIBING..." : buttonLabel}
      </button>
    </form>
  );
}