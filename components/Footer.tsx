import Link from "next/link";
import { getData } from "@/lib/content";

interface NavLink {
  label: string;
  url: string;
}

export default function Footer() {
  const footer = getData("footer");
  const socialLinks = (footer.socialLinks as NavLink[]) ?? [];

  return (
    <footer
      data-sb-object-id={footer.__metadata.id}
      className="py-20 bg-ink border-t border-bone/5 px-6 md:px-10"
    >
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-bone/30 text-[10px] tracking-[0.3em] uppercase">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={footer.logo as string}
          alt={(footer.logoAlt as string) ?? "Logo"}
          data-sb-field-path="logo#@src logoAlt#@alt"
          className="h-12 w-auto object-contain"
        />

        <div className="flex flex-wrap justify-center gap-8 md:gap-12" data-sb-field-path="socialLinks">
          {socialLinks.map((link, i) => (
            <Link
              key={i}
              href={link.url}
              data-sb-field-path={`.${i}.label`}
              className="hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="font-mono opacity-60" data-sb-field-path="copyright">
          {footer.copyright as string}
        </div>
      </div>
    </footer>
  );
}
