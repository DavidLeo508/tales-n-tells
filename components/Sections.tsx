import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { Icon } from "@/components/Icon";
import RecruitmentForm from "@/components/RecruitmentForm";
import NewsletterForm from "@/components/NewsletterForm";
import TalesGrid from "@/components/TalesGrid";
import type { Section } from "@/lib/content";

/* eslint-disable @next/next/no-img-element */

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}
interface Role {
  icon: string;
  label: string;
  description: string;
}

/** Render the ordered list of page sections. Field paths are relative — the
 * browser resolves the full path by walking up to the nearest ancestor that
 * carries `data-sb-object-id` (set on the page root in the route). */
export function Sections({ sections }: { sections: Section[] }) {
  return (
    <div data-sb-field-path="sections">
      {sections.map((section, index) => (
        <div key={index} data-sb-field-path={`.${index}`}>
          <SectionInner section={section} />
        </div>
      ))}
    </div>
  );
}

function SectionInner({ section }: { section: Section }) {
  switch (section.type) {
    case "hero":
      return <Hero section={section} />;
    case "wallpaperCta":
      return <WallpaperCta section={section} />;
    case "manifesto":
      return <Manifesto section={section} />;
    case "whereToBuy":
      return <WhereToBuy section={section} />;
    case "features":
      return <Features section={section} variant="dark-on-light" />;
    case "pageHeader":
      return <PageHeader section={section} />;
    case "prose":
      return <Prose section={section} />;
    case "pillars":
      return <Features section={section} variant="pillars" />;
    case "statement":
      return <Statement section={section} />;
    case "talesGrid":
      return <TalesGrid section={section} />;
    case "newsletter":
      return <Newsletter section={section} />;
    case "recruitment":
      return <Recruitment section={section} />;
    default:
      return null;
  }
}

function s(section: Section, key: string): string {
  return (section[key] as string) ?? "";
}

/* --- Hero ----------------------------------------------------------------- */
function Hero({ section }: { section: Section }) {
  return (
    <section className="relative min-h-[100vh] w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img
          src={s(section, "backgroundImage")}
          alt=""
          data-sb-field-path=".backgroundImage#@src"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink/80" />
      </div>

      <div className="relative z-10 text-center px-6">
        <h1 className="text-[12vw] md:text-[8vw] font-black italic tracking-tighter leading-[0.85] uppercase text-bone mb-10">
          <span data-sb-field-path=".title" className="whitespace-pre-line">
            {s(section, "title")}
          </span>{" "}
          <br />
          <span data-sb-field-path=".titleAccent" className="text-accent">
            {s(section, "titleAccent")}
          </span>
        </h1>
        <div className="flex flex-col items-center gap-6">
          <p
            data-sb-field-path=".eyebrow"
            className="text-bone/40 text-sm md:text-base uppercase tracking-[0.4em] font-light max-w-lg"
          >
            {s(section, "eyebrow")}
          </p>
          <div className="mt-8 text-accent/50 animate-bounce-slow">
            <ArrowDown className="w-8 h-8" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- Wallpaper CTA -------------------------------------------------------- */
function WallpaperCta({ section }: { section: Section }) {
  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-ink via-ink/95 to-ink overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span data-sb-field-path=".eyebrow" className="text-xs font-bold tracking-[0.5em] uppercase text-accent mb-4 block">
            {s(section, "eyebrow")}
          </span>
          <h2 className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase leading-[0.9] mb-6">
            <span data-sb-field-path=".title">{s(section, "title")}</span> <br />
            <span data-sb-field-path=".titleAccent" className="text-accent">
              {s(section, "titleAccent")}
            </span>
          </h2>
          <p data-sb-field-path=".body" className="text-bone/60 text-lg leading-relaxed mb-10 max-w-md">
            {s(section, "body")}
          </p>
          <Link
            href={s(section, "buttonUrl") || "#"}
            data-sb-field-path=".buttonLabel"
            className="inline-flex items-center gap-4 px-8 py-4 bg-accent text-white font-bold text-sm tracking-widest uppercase hover:bg-accent/90 transition-all w-fit"
          >
            {s(section, "buttonLabel")}
            <ArrowDown className="w-4 h-4 -rotate-90" />
          </Link>
        </div>

        <div className="relative h-96 flex items-center justify-center">
          <div className="relative z-20 w-32 h-64 bg-black rounded-3xl border-8 border-bone/20 shadow-2xl overflow-hidden -rotate-12 hover:rotate-0 transition-transform duration-500">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-b-2xl z-30" />
            <img
              src={s(section, "imagePrimary")}
              alt="Wallpaper preview"
              data-sb-field-path=".imagePrimary#@src"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute z-10 w-64 h-40 bg-black rounded-lg border-8 border-bone/20 shadow-2xl rotate-6 hover:-rotate-3 transition-transform duration-500 ml-12">
            <img
              src={s(section, "imageSecondary")}
              alt="Wallpaper preview"
              data-sb-field-path=".imageSecondary#@src"
              className="w-full h-full object-cover rounded-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- Manifesto ------------------------------------------------------------ */
function Manifesto({ section }: { section: Section }) {
  const paragraphs = (section.paragraphs as string[]) ?? [];
  return (
    <section className="py-40 px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-20" />
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
        <div className="lg:col-span-7">
          <span data-sb-field-path=".eyebrow" className="text-xs font-bold tracking-[0.5em] uppercase text-bone/40 mb-8 block">
            {s(section, "eyebrow")}
          </span>
          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-[0.9] mb-10">
            <span data-sb-field-path=".title">{s(section, "title")}</span> <br />
            <span data-sb-field-path=".titleAccent" className="text-accent">
              {s(section, "titleAccent")}
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-bone/60 leading-relaxed font-light" data-sb-field-path=".paragraphs">
            {paragraphs.map((p, i) => (
              <p key={i} data-sb-field-path={`.${i}`}>
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="comic-panel aspect-square p-8">
            <div className="h-full w-full border border-bone/5 flex flex-col items-center justify-center text-center p-10">
              <p data-sb-field-path=".quote" className="text-xl font-bold tracking-tight italic mb-8">
                &ldquo;{s(section, "quote")}&rdquo;
              </p>
              <div data-sb-field-path=".quoteAttribution" className="text-[10px] tracking-widest uppercase opacity-40">
                {s(section, "quoteAttribution")}
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 halftone opacity-40" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- Where To Buy --------------------------------------------------------- */
function WhereToBuy({ section }: { section: Section }) {
  return (
    <section className="py-40 px-6 relative bg-ink">
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-20">
          <span data-sb-field-path=".eyebrow" className="text-xs font-bold tracking-[0.5em] uppercase text-accent mb-4 block">
            {s(section, "eyebrow")}
          </span>
          <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.85] mb-6">
            <span data-sb-field-path=".title">{s(section, "title")}</span> <br />
            <span data-sb-field-path=".titleAccent" className="text-accent">
              {s(section, "titleAccent")}
            </span>
          </h2>
          <p data-sb-field-path=".body" className="text-bone/60 text-lg max-w-2xl leading-relaxed">
            {s(section, "body")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-8">
            <div className="w-full h-80 bg-bone/10 border border-bone/20 rounded-lg overflow-hidden">
              <iframe
                src={s(section, "mapEmbedUrl")}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="Store location"
              />
            </div>
            <div className="bg-bone/5 border border-bone/10 p-8 rounded-lg">
              <h3 data-sb-field-path=".storeName" className="text-xl font-bold mb-4 text-bone">
                {s(section, "storeName")}
              </h3>
              <p data-sb-field-path=".storeAddress" className="text-bone/70 text-sm mb-6">
                {s(section, "storeAddress")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={s(section, "primaryButtonUrl") || "#"}
                  data-sb-field-path=".primaryButtonLabel"
                  className="flex-1 px-6 py-3 bg-accent text-white font-bold text-sm tracking-widest uppercase hover:bg-accent/90 transition-all text-center"
                >
                  {s(section, "primaryButtonLabel")}
                </Link>
                <Link
                  href={s(section, "secondaryButtonUrl") || "#"}
                  data-sb-field-path=".secondaryButtonLabel"
                  className="flex-1 px-6 py-3 border border-accent text-accent font-bold text-sm tracking-widest uppercase hover:bg-accent/10 transition-all text-center"
                >
                  {s(section, "secondaryButtonLabel")}
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8 h-full justify-center">
            <div className="bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 p-12 rounded-lg flex flex-col items-center justify-center text-center min-h-96">
              <h3 data-sb-field-path=".digitalTitle" className="text-3xl font-black italic tracking-tighter uppercase mb-4 text-bone">
                {s(section, "digitalTitle")}
              </h3>
              <p data-sb-field-path=".digitalBody" className="text-bone/60 text-lg mb-10 max-w-sm leading-relaxed">
                {s(section, "digitalBody")}
              </p>
              <Link
                href={s(section, "digitalButtonUrl") || "#"}
                data-sb-field-path=".digitalButtonLabel"
                className="px-10 py-4 bg-accent text-white font-bold text-sm tracking-widest uppercase hover:bg-accent/90 transition-all"
              >
                {s(section, "digitalButtonLabel")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- Features / Pillars --------------------------------------------------- */
function Features({ section, variant }: { section: Section; variant: "dark-on-light" | "pillars" }) {
  const items = (section.items as FeatureItem[]) ?? [];
  const light = variant === "dark-on-light";
  return (
    <section className={`py-40 px-6 ${light ? "bg-bone text-ink" : "bg-ink text-bone"}`}>
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            {s(section, "eyebrow") && (
              <span data-sb-field-path=".eyebrow" className="text-accent font-mono text-xs tracking-[0.5em] uppercase mb-4 block">
                {s(section, "eyebrow")}
              </span>
            )}
            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.85]">
              <span data-sb-field-path=".title">{s(section, "title")}</span>{" "}
              {s(section, "titleAccent") && (
                <>
                  <br />
                  <span data-sb-field-path=".titleAccent" className="text-accent">
                    {s(section, "titleAccent")}
                  </span>
                </>
              )}
            </h2>
          </div>
          {s(section, "note") && (
            <p data-sb-field-path=".note" className={`uppercase tracking-widest text-[10px] font-bold max-w-xs text-right ${light ? "text-ink/60" : "text-bone/60"}`}>
              {s(section, "note")}
            </p>
          )}
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-3 ${light ? "gap-1" : "gap-12"}`} data-sb-field-path=".items">
          {items.map((item, i) => (
            <div
              key={i}
              data-sb-field-path={`.${i}`}
              className={
                light
                  ? "border border-ink/10 p-12 hover:bg-ink hover:text-white transition-all duration-500 group"
                  : "space-y-6"
              }
            >
              <div className="mb-6 text-accent">
                <Icon name={item.icon} className="w-8 h-8" />
              </div>
              <h3 data-sb-field-path=".title" className="text-2xl font-black italic tracking-tighter mb-4">
                {item.title}
              </h3>
              <p data-sb-field-path=".description" className={`text-sm font-light leading-relaxed ${light ? "opacity-60" : "text-bone/60"}`}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- Page Header ---------------------------------------------------------- */
function PageHeader({ section }: { section: Section }) {
  return (
    <section className="px-6 pt-40 pb-24">
      <div className="max-w-screen-xl mx-auto">
        <span data-sb-field-path=".eyebrow" className="text-accent font-mono text-xs tracking-[0.5em] uppercase mb-4 block">
          {s(section, "eyebrow")}
        </span>
        <h1 data-sb-field-path=".title" className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.85] mb-8">
          {s(section, "title")}
        </h1>
        <p data-sb-field-path=".subtitle" className="text-bone/60 text-lg max-w-2xl leading-relaxed">
          {s(section, "subtitle")}
        </p>
      </div>
    </section>
  );
}

/* --- Prose ---------------------------------------------------------------- */
function Prose({ section }: { section: Section }) {
  const paragraphs = (section.paragraphs as string[]) ?? [];
  return (
    <section className="px-6 py-24 border-t border-bone/5">
      <div className="max-w-3xl mx-auto">
        <h2 data-sb-field-path=".title" className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-12">
          {s(section, "title")}
        </h2>
        <div className="space-y-8 text-bone/70 leading-relaxed text-lg" data-sb-field-path=".paragraphs">
          {paragraphs.map((p, i) => (
            <p key={i} data-sb-field-path={`.${i}`}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- Statement ------------------------------------------------------------ */
function Statement({ section }: { section: Section }) {
  const label = s(section, "buttonLabel");
  return (
    <section className="px-6 py-40 border-t border-bone/5">
      <div className="max-w-screen-xl mx-auto text-center">
        <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-8">
          <span data-sb-field-path=".title">{s(section, "title")}</span> <br />
          <span data-sb-field-path=".titleAccent" className="text-accent">
            {s(section, "titleAccent")}
          </span>
        </h2>
        <p data-sb-field-path=".body" className="text-bone/50 text-lg mb-12 max-w-2xl mx-auto">
          {s(section, "body")}
        </p>
        {label && (
          <Link
            href={s(section, "buttonUrl") || "#"}
            data-sb-field-path=".buttonLabel"
            className="inline-block px-12 py-5 bg-accent text-white font-bold text-lg tracking-widest uppercase hover:bg-accent/80 transition-all"
          >
            {label}
          </Link>
        )}
      </div>
    </section>
  );
}

/* --- Tales Grid ----------------------------------------------------------- */
// `TalesGrid` lives in its own client component (tag sorter + interactive
// buttons) — see components/TalesGrid.tsx.

/* --- Newsletter ----------------------------------------------------------- */
function Newsletter({ section }: { section: Section }) {
  return (
    <section className="px-6 py-40 border-t border-bone/5">
      <div className="max-w-screen-xl mx-auto text-center">
        <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-8">
          <span data-sb-field-path=".title">{s(section, "title")}</span> <br />
          <span data-sb-field-path=".titleAccent" className="text-accent">
            {s(section, "titleAccent")}
          </span>
        </h2>
        <p data-sb-field-path=".body" className="text-bone/50 text-lg mb-12 max-w-2xl mx-auto">
          {s(section, "body")}
        </p>
        <NewsletterForm placeholder={s(section, "placeholder")} buttonLabel={s(section, "buttonLabel")} />
      </div>
    </section>
  );
}

/* --- Recruitment ---------------------------------------------------------- */
function Recruitment({ section }: { section: Section }) {
  const roles = (section.roles as Role[]) ?? [];
  return (
    <section className="px-6 relative">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h2 data-sb-field-path=".rolesTitle" className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase mb-12">
            {s(section, "rolesTitle")}
          </h2>
          <div className="space-y-6" data-sb-field-path=".roles">
            {roles.map((role, i) => (
              <div
                key={i}
                data-sb-field-path={`.${i}`}
                className="group p-6 border border-bone/10 hover:border-accent/50 hover:bg-accent/5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="text-accent group-hover:scale-110 transition-transform">
                    <Icon name={role.icon} className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 data-sb-field-path=".label" className="text-xl font-bold tracking-tight mb-2">
                      {role.label}
                    </h3>
                    <p data-sb-field-path=".description" className="text-bone/40 text-sm">
                      {role.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="comic-panel p-8 md:p-12">
          <h2 data-sb-field-path=".formTitle" className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase mb-12">
            {s(section, "formTitle")}
          </h2>
          <RecruitmentForm
            roles={roles.map((r) => ({ label: r.label }))}
            submitLabel={s(section, "submitLabel") || "Submit"}
            successTitle={s(section, "successTitle")}
            successBody={s(section, "successBody")}
          />
        </div>
      </div>
    </section>
  );
}
