import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import EntryExperience, { type EntryContent } from "@/components/EntryExperience";
import { getData } from "@/lib/content";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-outfit",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Tales 'N' Tells",
  description:
    "An anthology that dares to explore the unconventional through flash-fictional comics. Short stories, big impact.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const entry = getData("entry") as unknown as EntryContent;
  return (
    <html lang="en" className={`${outfit.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans bg-ink text-bone min-h-screen flex flex-col">
        <EntryExperience entry={entry}>{children}</EntryExperience>
      </body>
    </html>
  );
}
