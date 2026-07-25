export type SocialPlatform = "facebook" | "instagram" | "youtube" | "dribbble" | "x";

const PATHS: Record<SocialPlatform, React.ReactNode> = {
  facebook: (
    <path d="M14.5 8.5H16V5.6c-.26-.04-1.16-.1-2.2-.1-2.2 0-3.7 1.35-3.7 3.8v2.2H7.7v3.2h2.4V21h3.2v-6.3h2.4l.4-3.2h-2.8V9.6c0-.9.25-1.1 1.2-1.1Z" />
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.3" />
      <circle cx="16.2" cy="7.8" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  youtube: (
    <>
      <rect x="3.5" y="6" width="17" height="12" rx="3.5" />
      <path d="M10.3 9.6 14.6 12l-4.3 2.4Z" fill="currentColor" stroke="none" />
    </>
  ),
  dribbble: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M4.7 9.2c2.4.9 8 1.6 13.8.4M6.1 17.4c1.6-3.4 4-6.7 8.4-9.6M9 4.4c3 3.3 5.4 8.2 6 15" />
    </>
  ),
  x: <path d="M6 6l12 12M18 6 6 18" />,
};

/** Minimal, hand-drawn outline glyphs for the platforms creator profiles link
 * out to — kept dependency-free rather than pulled from an icon package. */
export function SocialIcon({ platform, className = "w-4 h-4" }: { platform: SocialPlatform; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {PATHS[platform]}
    </svg>
  );
}
