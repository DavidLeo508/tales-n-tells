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

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const page = getPageBySlug(slugFromSegments(slug));

  return {
    title: page?.title ?? "Tales 'N' Tells",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const page = getPageBySlug(slugFromSegments(slug));

  if (!page) notFound();

  return (
    <>
      <Header />
      <main className="flex-grow" data-sb-object-id={page.__metadata.id}>
        <Sections sections={page.sections} />
      </main>
      <Footer />
    </>
  );
}
