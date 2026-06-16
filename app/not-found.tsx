import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center text-center px-6 py-40">
      <span className="text-accent font-mono text-xs tracking-[0.5em] uppercase mb-6">Error 404</span>
      <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase mb-8">
        Lost the <span className="text-accent">Plot.</span>
      </h1>
      <p className="text-bone/50 text-lg max-w-md mb-12">
        This page never made it past the editor&apos;s desk. Head back to the anthology.
      </p>
      <Link
        href="/"
        className="px-10 py-4 bg-accent text-white font-bold text-sm tracking-widest uppercase hover:bg-accent/80 transition-all"
      >
        Return Home
      </Link>
    </main>
  );
}
