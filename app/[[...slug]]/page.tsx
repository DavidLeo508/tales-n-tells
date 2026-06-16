import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Sections } from "@/components/Sections";
import {
  getAllPages,
  getPageBySlug,
  slugFromSegments,
} from "@/lib/content";

interface Params {
  slug?: string[];
}

/** Pre-render every page document at build time. */
export function generateStaticParams(): Params[] {
  return getAllPages().map((page) => ({
    slug: page.slug === "home" ? [] : page.slug.split("/"),
  }));
}

export function generateMetadata({ params }: { params: Params }) {
  const page = getPageBySlug(slugFromSegments(params.slug));
  return { title: page?.title ?? "Tales 'N' Tells" };
}

export default function Page({ params }: { params: Params }) {
  const page = getPageBySlug(slugFromSegments(params.slug));
  if (!page) notFound();

  return (
    <>
      <Header />
      {/* The page object id anchors every relative `data-sb-field-path`
          rendered by the sections below. */}
      <main className="flex-grow" data-sb-object-id={page.__metadata.id}>
        <Sections sections={page.sections} />
      </main>
      <Footer />
    </>
  );
}
