import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // These read from CSS variables (see app/globals.css) so that toggling
        // `data-theme` on <html> flips the entire palette at once, including
        // every Tailwind opacity-modifier usage (e.g. bone/10, ink/95, accent/50).
        ink: "rgb(var(--ink) / <alpha-value>)",
        "ink-soft": "rgb(var(--ink-soft) / <alpha-value>)",
        bone: "rgb(var(--bone) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        hero: "rgb(var(--accent) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
