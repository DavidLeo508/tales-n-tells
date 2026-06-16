import Link from "next/link";
import { getData } from "@/lib/content";

interface NavLink {
  label: string;
  url: string;
}

export default function Header() {
  const header = getData("header");
  const navLinks = (header.navLinks as NavLink[]) ?? [];

  return (
    <nav
      data-sb-object-id={header.__metadata.id}
      className="fixed top-0 left-0 w-full z-[100] py-5 px-6 md:px-10 bg-ink/80 backdrop-blur-md border-b border-bone/5"
    >
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={header.logo as string}
            alt={(header.logoAlt as string) ?? "Logo"}
            data-sb-field-path="logo#@src logoAlt#@alt"
            className="h-8 w-auto object-contain"
          />
        </Link>

        <div className="hidden md:flex gap-10 items-center" data-sb-field-path="navLinks">
          {navLinks.map((item, i) => (
            <Link
              key={i}
              href={item.url}
              data-sb-field-path={`.${i}`}
              className="text-[10px] font-bold tracking-[0.25em] text-bone/60 hover:text-accent transition-colors py-2"
            >
              <span data-sb-field-path=".label">{item.label}</span>
            </Link>
          ))}
          <Link
            href={(header.ctaUrl as string) ?? "/tales"}
            data-sb-field-path="ctaLabel"
            className="px-6 py-2 bg-bone text-ink text-[10px] font-bold tracking-[0.2em] hover:bg-accent hover:text-white transition-all ml-2"
          >
            {(header.ctaLabel as string) ?? "READ NOW"}
          </Link>
        </div>

        {/* Compact links for small screens */}
        <div className="flex md:hidden gap-5 items-center" data-sb-field-path="navLinks">
          {navLinks.map((item, i) => (
            <Link
              key={i}
              href={item.url}
              data-sb-field-path={`.${i}.label`}
              className="text-[10px] font-bold tracking-[0.2em] text-bone/60 hover:text-accent transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
