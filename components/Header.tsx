import { getData } from "@/lib/content";
import HeaderNav from "@/components/HeaderNav";

interface NavLink {
  label: string;
  url: string;
}

/** Server component: reads header content, then hands off to the client
 * component that needs interactivity (active-route detection, theme toggle). */
export default function Header() {
  const header = getData("header");
  const navLinks = (header.navLinks as NavLink[]) ?? [];

  return (
    <div data-sb-object-id={header.__metadata.id}>
      <HeaderNav
        logo={header.logo as string}
        logoAlt={header.logoAlt as string}
        navLinks={navLinks}
        ctaLabel={header.ctaLabel as string}
        ctaUrl={header.ctaUrl as string}
      />
    </div>
    
  );
}
