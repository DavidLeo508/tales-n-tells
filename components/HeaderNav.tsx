"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

interface NavLink {
  label: string;
  url: string;
}

interface Props {
  logo: string;
  logoAlt?: string;
  navLinks: NavLink[];
  ctaLabel?: string;
  ctaUrl?: string;
}

export default function HeaderNav({ logo, logoAlt, navLinks, ctaLabel, ctaUrl }: Props) {
  const pathname = usePathname();

  function isActive(url: string) {
    if (url === "/") return pathname === "/";
    return pathname === url || pathname?.startsWith(`${url}/`);
  }

  return (
<nav className="fixed top-0 left-0 w-full z-[100] py-5 px-6 md:px-10 bg-bone/80 dark:bg-ink/80 backdrop-blur-md border-b border-ink/5 dark:border-bone/5">
  <div className="max-w-screen-2xl mx-auto flex justify-between items-center">

    <Link href="/" className="flex items-center gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
<div className="relative h-8 w-40">
  {/* Dark mode logo */}
  <img
    src="/images/1000048852.png"
    alt={logoAlt ?? "Logo"}
    className="absolute left-0 top-0 h-8 w-auto object-contain logo-dark"
  />

  {/* Light mode logo */}
  <img
    src="/images/1000048853.png"
    alt={logoAlt ?? "Logo"}
    className="absolute left-0 top-0 h-8 w-auto object-contain logo-light"
  />
</div>
    </Link>

    <div className="hidden md:flex gap-10 items-center" data-sb-field-path="navLinks">
      {navLinks.map((item, i) => (
        <Link
          key={i}
          href={item.url}
          data-sb-field-path={`.${i}`}
          data-active={isActive(item.url)}
          className="nav-strike text-[10px] font-bold tracking-[0.25em] text-ink/60 dark:text-bone/60 hover:text-accent data-[active=true]:text-accent transition-colors py-2"
        >
          <span data-sb-field-path=".label">{item.label}</span>
        </Link>
      ))}

      <Link
        href={ctaUrl ?? "/tales"}
        data-sb-field-path="ctaLabel"
        className="px-6 py-2 bg-ink text-bone dark:bg-bone dark:text-ink text-[10px] font-bold tracking-[0.2em] hover:bg-accent hover:text-white transition-all ml-2"
      >
        {ctaLabel ?? "READ NOW"}
      </Link>

      <ThemeToggle className="ml-3" />
    </div>

        {/* Compact links for small screens */}
        <div className="flex md:hidden gap-4 items-center">
          <div className="flex gap-4 items-center" data-sb-field-path="navLinks">
            {navLinks.map((item, i) => (
              <Link
                key={i}
                href={item.url}
                data-sb-field-path={`.${i}.label`}
                data-active={isActive(item.url)}
                className="nav-strike text-[10px] font-bold tracking-[0.2em] text-bone/60 hover:text-accent data-[active=true]:text-accent transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
