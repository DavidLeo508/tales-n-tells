"use client";

import Link from "next/link";
import { SocialIcon, type SocialPlatform } from "@/components/SocialIcon";
import type { Section } from "@/lib/content";

/* eslint-disable @next/next/no-img-element */

interface CreatorLink {
  platform: SocialPlatform;
  url: string;
}
interface Creator {
  name: string;
  role: string;
  bio: string;
  image: string;
  imageHover?: string;
  links?: CreatorLink[];
}

function s(section: Section, key: string): string {
  return (section[key] as string) ?? "";
}

export default function CreatorsGrid({ section }: { section: Section }) {
  const creators = (section.creators as Creator[]) ?? [];

  return (
    <section className="px-6 pt-40 pb-24">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          {s(section, "eyebrow") && (
            <span
              data-sb-field-path=".eyebrow"
              className="text-accent font-mono text-xs tracking-[0.5em] uppercase mb-4 block"
            >
              {s(section, "eyebrow")}
            </span>
          )}
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.9] mb-6">
            <span data-sb-field-path=".title">{s(section, "title")}</span>{" "}
            <span data-sb-field-path=".titleAccent" className="text-accent">
              {s(section, "titleAccent")}
            </span>
          </h1>
          {s(section, "subtitle") && (
            <p data-sb-field-path=".subtitle" className="text-bone/60 text-lg leading-relaxed">
              {s(section, "subtitle")}
            </p>
          )}
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          data-sb-field-path=".creators"
        >
          {creators.map((creator, i) => (
            <div key={i} data-sb-field-path={`.${i}`} className="group flex flex-col">
              <div className="relative aspect-square overflow-hidden rounded-2xl mb-5 bg-bone/5">
                {/* Static / neutral expression — default state */}
                <img
                  src={creator.image}
                  alt={creator.name}
                  data-sb-field-path=".image#@src"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                    creator.imageHover ? "group-hover:opacity-0" : ""
                  }`}
                />
                {/* Smiling expression — revealed on hover */}
                {creator.imageHover && (
                  <img
                    src={creator.imageHover}
                    alt=""
                    aria-hidden
                    data-sb-field-path=".imageHover#@src"
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                )}
              </div>

              <h3 data-sb-field-path=".name" className="text-lg font-black italic tracking-tight uppercase">
                {creator.name}
              </h3>
              <p
                data-sb-field-path=".role"
                className="text-accent text-[10px] font-bold tracking-[0.25em] uppercase mb-2"
              >
                {creator.role}
              </p>
              <p data-sb-field-path=".bio" className="text-bone/50 text-sm leading-relaxed mb-5">
                {creator.bio}
              </p>

              {creator.links && creator.links.length > 0 && (
                <div className="flex gap-2 mt-auto" data-sb-field-path=".links">
                  {creator.links.map((link, j) => (
                    <Link
                      key={j}
                      href={link.url}
                      data-sb-field-path={`.${j}.url`}
                      aria-label={link.platform}
                      className="grid place-items-center w-8 h-8 rounded-full border border-bone/15 text-bone/60 hover:text-accent hover:border-accent/40 transition-colors"
                    >
                      <SocialIcon platform={link.platform} className="w-3.5 h-3.5" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
