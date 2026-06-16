import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PAGES_DIR = path.join(CONTENT_DIR, "pages");
const DATA_DIR = path.join(CONTENT_DIR, "data");

/** A generic content object. The `__metadata.id` is the file path Stackbit
 * uses as the object id, which we attach to the rendered root element via
 * `data-sb-object-id`. */
export interface ContentObject {
  [key: string]: unknown;
  __metadata: {
    id: string;
    modelName: string;
  };
}

export interface PageContent extends ContentObject {
  title: string;
  slug: string;
  sections: Section[];
}

export interface Section {
  type: string;
  [key: string]: unknown;
}

function readJson(filePath: string): Record<string, unknown> {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Record<string, unknown>;
}

function relativeId(filePath: string): string {
  return path.relative(process.cwd(), filePath).split(path.sep).join("/");
}

/** Read a singleton data file (header, footer) and attach Stackbit metadata. */
export function getData(name: "header" | "footer"): ContentObject {
  const filePath = path.join(DATA_DIR, `${name}.json`);
  const data = readJson(filePath);
  return {
    ...data,
    __metadata: { id: relativeId(filePath), modelName: name },
  };
}

/** Return every page document. */
export function getAllPages(): PageContent[] {
  return fs
    .readdirSync(PAGES_DIR)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const filePath = path.join(PAGES_DIR, file);
      const data = readJson(filePath);
      return {
        ...data,
        __metadata: { id: relativeId(filePath), modelName: "page" },
      } as PageContent;
    });
}

/** Normalise a route's slug segments into a content slug. The site root maps
 * to the `home` document. */
export function slugFromSegments(segments?: string[]): string {
  if (!segments || segments.length === 0) return "home";
  return segments.join("/");
}

export function getPageBySlug(slug: string): PageContent | undefined {
  return getAllPages().find((page) => page.slug === slug);
}
