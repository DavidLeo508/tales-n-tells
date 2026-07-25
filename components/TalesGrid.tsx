"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Lock } from "lucide-react";
import type { Section } from "@/lib/content";
import CollectPrintModal from "@/components/CollectPrintModal";

/* eslint-disable @next/next/no-img-element */

interface PrintStore {
  name: string;
  address: string;
  whatsappUrl: string;
}

interface EditionButton {
  label: string;
  url: string;
  variant: "digital" | "print";
}
interface Edition {
  vol: string;
  title: string;
  tag: string;
  status: string;
  description: string;
  image: string;
  buttons?: EditionButton[];
}

function s(section: Section, key: string): string {
  return (section[key] as string) ?? "";
}

/** Per-variant styling. The two variants are visual opposites: `digital`
 * starts crimson and flips to ink on hover, `print` starts ink and flips to
 * crimson — including the font colour. */
const buttonVariants: Record<EditionButton["variant"], string> = {
  digital:
    "bg-accent text-white border border-accent hover:bg-ink hover:text-accent hover:border-ink",
  print:
    "bg-ink text-bone border border-bone/30 hover:bg-accent hover:text-white hover:border-accent",
};

/** Tales Grid — a filterable/sortable collection of book editions. The tag
 * toggles above the grid re-order the editions so that books matching the
 * selected tags float to the front (original order is preserved when nothing
 * is selected). Editing still works because each card keeps its *original*
 * content index in `data-sb-field-path`, independent of display order. */
export default function TalesGrid({ section }: { section: Section }) {
  const editions = (section.editions as Edition[]) ?? [];
  const printStores = (section.printStores as PrintStore[]) ?? [];


  // Unique tags, in first-seen order, used to build the sorter toggles.
  const tags = useMemo(() => {
    const seen: string[] = [];
    for (const e of editions) {
      if (e.tag && !seen.includes(e.tag)) seen.push(e.tag);
    }
    return seen;
  }, [editions]);

  const [selected, setSelected] = useState<string[]>([]);

  function toggle(tag: string) {
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  // Pair each edition with its original index so annotations stay correct,
  // then stable-sort matching tags to the front when a filter is active.
  const ordered = useMemo(() => {
    const indexed = editions.map((edition, index) => ({ edition, index }));
    if (selected.length === 0) return indexed;
    return [...indexed].sort((a, b) => {
      const am = selected.includes(a.edition.tag) ? 0 : 1;
      const bm = selected.includes(b.edition.tag) ? 0 : 1;
      if (am !== bm) return am - bm;
      return a.index - b.index;
    });
  }, [editions, selected]);

  return (
    <section className="px-12 pb-4">
      <div className="max-w-7xl mx-auto">
        {tags.length > 1 && (
          <div className="mb-12 n flex flex-wrap items-center gap-3">
            {s(section, "filterLabel") && (
              <span
                data-sb-field-path=".filterLabel"
                className="text-bone/40 text-[10px] font-bold tracking-[0.3em] uppercase mr-2"
              >
                {s(section, "filterLabel")}
              </span>
            )}
            {tags.map((tag) => {
              const active = selected.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggle(tag)}
                  aria-pressed={active}
                  className={`px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${
                    active
                      ? "bg-accent text-white border border-accent"
                      : "border border-bone/20 text-bone/60 hover:border-accent hover:text-accent"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        )}

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          data-sb-field-path=".editions"
        >
          {ordered.map(({ edition, index }) => {
            const locked = edition.status === "coming-soon";
            const buttons = edition.buttons ?? [];
            return (
              <div key={index} data-sb-field-path={`.${index}`} className="group relative">
                <div className="relative overflow-hidden bg-bone/5 border border-bone/10 hover:border-accent/50 transition-all duration-500 h-full flex flex-col">
                  <div className="relative aspect-[3/4] overflow-hidden bg-ink">
                    <img
                      src={edition.image}
                      alt={edition.title}
                      data-sb-field-path=".image#@src"
                      className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                    />
                    <div
                      data-sb-field-path=".tag"
                      className="absolute top-4 right-4 px-3 py-1 bg-accent text-white text-[10px] font-bold tracking-widest uppercase"
                    >
                      {edition.tag}
                    </div>
                  </div>
                  <div className="p-6 bg-gradient-to-b from-bone/5 to-ink flex flex-col flex-grow">
                    <span
                      data-sb-field-path=".vol"
                      className="text-accent font-mono text-[10px] tracking-[0.3em] uppercase block mb-2"
                    >
                      {edition.vol}
                    </span>
                    <h3
                      data-sb-field-path=".title"
                      className="text-lg font-black italic tracking-tight uppercase leading-tight mb-3"
                    >
                      {edition.title}
                    </h3>
                    <p
                      data-sb-field-path=".description"
                      className="text-bone/50 text-xs leading-relaxed mb-6"
                    >
                      {edition.description}
                    </p>

                    <div className="mt-auto">
                      {locked ? (
                        <span className="w-full px-4 py-3 bg-bone/10 text-bone/40 text-center font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2">
                          <Lock className="w-3 h-3" /> COMING SOON
                        </span>
                      ) : (
                        buttons.length > 0 && (
                          <div className="flex flex-col gap-3" data-sb-field-path=".buttons">
{buttons.map((button, j) => (
  button.variant === "print" ? (
    <CollectPrintModal
      key={j}
      stores={printStores}
      buttonLabel={button.label}
    />
  ) : (
    <Link
      key={j}
      href={button.url || "#"}
      data-sb-field-path={`.${j}`}
      className={`w-full px-4 py-3 text-center font-bold text-xs tracking-widest uppercase transition-all duration-300 ${
        buttonVariants[button.variant] ?? buttonVariants.digital
      }`}
    >
      <span data-sb-field-path=".label">{button.label}</span>
    </Link>
  )
))}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
