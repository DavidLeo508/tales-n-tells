"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "theme";

/** Sun/Moon toggle. Site default is dark ("night mode"); clicking flips the
 * whole palette to light ("day mode") by swapping the `data-theme` attribute
 * on <html>, which every color in globals.css / tailwind.config.ts reads
 * from. Preference is remembered in localStorage; the actual first-paint
 * application happens via the inline script in app/layout.tsx so there's no
 * flash of the wrong theme. */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [isLight, setIsLight] = useState(false);

  // Sync local state with whatever the no-flash script already applied.
  useEffect(() => {
    setIsLight(document.documentElement.getAttribute("data-theme") === "light");
  }, []);

  function toggle() {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.setAttribute("data-theme", next ? "light" : "dark");
    try {
      localStorage.setItem(STORAGE_KEY, next ? "light" : "dark");
    } catch {
      /* localStorage may be unavailable (private mode) — theme still applies for this visit */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? "Switch to night mode" : "Switch to day mode"}
      aria-pressed={isLight}
      className={`relative grid place-items-center w-9 h-9 rounded-full border border-bone/15 text-bone/70 hover:text-accent hover:border-accent/40 transition-colors ${className}`}
    >
      <Sun
        className={`w-4 h-4 absolute transition-all duration-300 ${
          isLight ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
        }`}
      />
      <Moon
        className={`w-4 h-4 absolute transition-all duration-300 ${
          isLight ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
        }`}
      />
    </button>
  );
}
