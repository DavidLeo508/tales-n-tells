import { defineStackbitConfig } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

/**
 * Netlify Visual Editor (Stackbit) configuration.
 *
 * Content lives as plain JSON under /content and is matched to the models
 * below by each file's `type` field. The page components in /components read
 * the very same files, so anything edited on the visual canvas maps 1:1 to a
 * field defined here. Field paths annotated in the JSX (`data-sb-field-path`)
 * resolve against these models.
 */

const sharedLinkField = {
  name: "navLink",
  type: "object" as const,
  fields: [
    { name: "label", type: "string" as const },
    { name: "url", type: "string" as const },
  ],
};

const featureItemModel = {
  name: "featureItem",
  type: "object" as const,
  labelField: "title",
  fields: [
    {
      name: "icon",
      type: "enum" as const,
      options: ["book-open", "sparkles", "zap", "heart", "palette", "type", "lightbulb"],
      default: "zap",
    },
    { name: "title", type: "string" as const },
    { name: "description", type: "text" as const },
  ],
};

const editionButtonModel = {
  name: "editionButton",
  type: "object" as const,
  labelField: "label",
  fields: [
    { name: "label", type: "string" as const, default: "GET DIGITAL" },
    { name: "url", type: "string" as const },
    {
      name: "variant",
      type: "enum" as const,
      options: ["digital", "print"],
      default: "digital",
    },
  ],
};

const editionModel = {
  name: "edition",
  type: "object" as const,
  labelField: "title",
  fields: [
    { name: "vol", type: "string" as const },
    { name: "title", type: "string" as const },
    {
      name: "tag",
      type: "enum" as const,
      options: ["NEW", "BEST SELLER", "COMING SOON", "LIMITED EDITION", "MINI"],
    },
    {
      name: "status",
      type: "enum" as const,
      options: ["available", "coming-soon", "limited"],
    },
    { name: "description", type: "text" as const },
    { name: "image", type: "image" as const },
    {
      name: "buttons",
      type: "list" as const,
      items: { type: "model" as const, models: ["editionButton"] },
    },
  ],
};

const roleModel = {
  name: "role",
  type: "object" as const,
  labelField: "label",
  fields: [
    {
      name: "icon",
      type: "enum" as const,
      options: ["type", "palette", "sparkles", "zap", "lightbulb"],
    },
    { name: "label", type: "string" as const },
    { name: "description", type: "text" as const },
  ],
};

// ---- Section models ---------------------------------------------------------

const heroSection = {
  name: "hero",
  type: "object" as const,
  label: "Hero",
  labelField: "title",
  fields: [
    { name: "eyebrow", type: "text" as const },
    { name: "title", type: "text" as const },
    { name: "titleAccent", type: "string" as const },
    { name: "backgroundImage", type: "image" as const },
  ],
};

const wallpaperCtaSection = {
  name: "wallpaperCta",
  type: "object" as const,
  label: "Wallpaper CTA",
  labelField: "title",
  fields: [
    { name: "eyebrow", type: "string" as const },
    { name: "title", type: "string" as const },
    { name: "titleAccent", type: "string" as const },
    { name: "body", type: "text" as const },
    { name: "buttonLabel", type: "string" as const },
    { name: "buttonUrl", type: "string" as const },
    { name: "imagePrimary", type: "image" as const },
    { name: "imageSecondary", type: "image" as const },
  ],
};

const manifestoSection = {
  name: "manifesto",
  type: "object" as const,
  label: "Manifesto",
  labelField: "title",
  fields: [
    { name: "eyebrow", type: "string" as const },
    { name: "title", type: "string" as const },
    { name: "titleAccent", type: "string" as const },
    { name: "paragraphs", type: "list" as const, items: { type: "text" as const } },
    { name: "quote", type: "text" as const },
    { name: "quoteAttribution", type: "string" as const },
  ],
};

const whereToBuySection = {
  name: "whereToBuy",
  type: "object" as const,
  label: "Where To Buy",
  labelField: "title",
  fields: [
    { name: "eyebrow", type: "string" as const },
    { name: "title", type: "string" as const },
    { name: "titleAccent", type: "string" as const },
    { name: "body", type: "text" as const },
    { name: "mapEmbedUrl", type: "string" as const },
    { name: "storeName", type: "string" as const },
    { name: "storeAddress", type: "string" as const },
    { name: "primaryButtonLabel", type: "string" as const },
    { name: "primaryButtonUrl", type: "string" as const },
    { name: "secondaryButtonLabel", type: "string" as const },
    { name: "secondaryButtonUrl", type: "string" as const },
    { name: "digitalTitle", type: "string" as const },
    { name: "digitalBody", type: "text" as const },
    { name: "digitalButtonLabel", type: "string" as const },
    { name: "digitalButtonUrl", type: "string" as const },
  ],
};

const featuresSection = {
  name: "features",
  type: "object" as const,
  label: "Features",
  labelField: "title",
  fields: [
    { name: "eyebrow", type: "string" as const },
    { name: "title", type: "string" as const },
    { name: "titleAccent", type: "string" as const },
    { name: "note", type: "text" as const },
    { name: "items", type: "list" as const, items: { type: "model" as const, models: ["featureItem"] } },
  ],
};

const pageHeaderSection = {
  name: "pageHeader",
  type: "object" as const,
  label: "Page Header",
  labelField: "title",
  fields: [
    { name: "eyebrow", type: "string" as const },
    { name: "title", type: "string" as const },
    { name: "subtitle", type: "text" as const },
  ],
};

const proseSection = {
  name: "prose",
  type: "object" as const,
  label: "Prose",
  labelField: "title",
  fields: [
    { name: "title", type: "string" as const },
    { name: "paragraphs", type: "list" as const, items: { type: "text" as const } },
  ],
};

const pillarsSection = {
  name: "pillars",
  type: "object" as const,
  label: "Pillars",
  labelField: "title",
  fields: [
    { name: "title", type: "string" as const },
    { name: "items", type: "list" as const, items: { type: "model" as const, models: ["featureItem"] } },
  ],
};

const statementSection = {
  name: "statement",
  type: "object" as const,
  label: "Statement",
  labelField: "title",
  fields: [
    { name: "title", type: "string" as const },
    { name: "titleAccent", type: "string" as const },
    { name: "body", type: "text" as const },
    { name: "buttonLabel", type: "string" as const },
    { name: "buttonUrl", type: "string" as const },
  ],
};

const talesGridSection = {
  name: "talesGrid",
  type: "object" as const,
  label: "Tales Grid",
  fields: [
    { name: "filterLabel", type: "string" as const },
    { name: "editions", type: "list" as const, items: { type: "model" as const, models: ["edition"] } },
  ],
};

const newsletterSection = {
  name: "newsletter",
  type: "object" as const,
  label: "Newsletter",
  labelField: "title",
  fields: [
    { name: "title", type: "string" as const },
    { name: "titleAccent", type: "string" as const },
    { name: "body", type: "text" as const },
    { name: "placeholder", type: "string" as const },
    { name: "buttonLabel", type: "string" as const },
  ],
};

const recruitmentSection = {
  name: "recruitment",
  type: "object" as const,
  label: "Recruitment",
  fields: [
    { name: "rolesTitle", type: "string" as const },
    { name: "roles", type: "list" as const, items: { type: "model" as const, models: ["role"] } },
    { name: "formTitle", type: "string" as const },
    { name: "submitLabel", type: "string" as const },
    { name: "successTitle", type: "string" as const },
    { name: "successBody", type: "text" as const },
  ],
};

const sectionModelNames = [
  "hero",
  "wallpaperCta",
  "manifesto",
  "whereToBuy",
  "features",
  "pageHeader",
  "prose",
  "pillars",
  "statement",
  "talesGrid",
  "newsletter",
  "recruitment",
];

const pageModel = {
  name: "page",
  type: "page" as const,
  urlPath: "/{slug}",
  filePath: "content/pages/{slug}.json",
  fields: [
    { name: "title", type: "string" as const, required: true },
    // `slug` must be a declared field so it appears in `document.fields` and
    // the siteMap below can resolve each page to its own URL. Without it every
    // page collapses to "/" and only the home page is reachable in the editor.
    { name: "slug", type: "string" as const, required: true },
    {
      name: "sections",
      type: "list" as const,
      items: { type: "model" as const, models: sectionModelNames },
    },
  ],
};

const headerModel = {
  name: "header",
  type: "data" as const,
  singleInstance: true,
  filePath: "content/data/header.json",
  fields: [
    { name: "logo", type: "image" as const },
    { name: "logoAlt", type: "string" as const },
    { name: "navLinks", type: "list" as const, items: { type: "model" as const, models: ["navLink"] } },
    { name: "ctaLabel", type: "string" as const },
    { name: "ctaUrl", type: "string" as const },
  ],
};

const footerModel = {
  name: "footer",
  type: "data" as const,
  singleInstance: true,
  filePath: "content/data/footer.json",
  fields: [
    { name: "logo", type: "image" as const },
    { name: "logoAlt", type: "string" as const },
    { name: "socialLinks", type: "list" as const, items: { type: "model" as const, models: ["navLink"] } },
    { name: "copyright", type: "string" as const },
  ],
};

const entryModel = {
  name: "entry",
  type: "data" as const,
  label: "Entry Experience",
  description:
    "The intro that plays before the site: a landing screen with the logo and Experience button, a photosensitivity warning, then the transition video. Editing happens here; toggle it off to send visitors straight to the site.",
  singleInstance: true,
  filePath: "content/data/entry.json",
  fields: [
    {
      name: "enabled",
      type: "boolean" as const,
      label: "Show entry experience",
      description:
        "Turn the whole intro on or off. When off, visitors land directly on the site with no gate, warning or video.",
      default: true,
    },
    {
      name: "eyebrow",
      type: "string" as const,
      label: "Tagline",
      description: "Small line of text above the logo on the landing screen.",
    },
    {
      name: "logo",
      type: "image" as const,
      description: "Logo shown on the landing screen.",
    },
    { name: "logoAlt", type: "string" as const, label: "Logo alt text" },
    {
      name: "buttonLabel",
      type: "string" as const,
      label: "Enter button label",
      description: "Text on the button visitors click to start the intro.",
    },
    {
      name: "enterCue",
      type: "string" as const,
      label: "Scroll cue text",
      description: "Small hint shown beneath the button (e.g. \"ENTER\").",
    },
    {
      name: "warningTitle",
      type: "string" as const,
      label: "Warning heading",
      description: "Heading of the photosensitivity warning screen.",
    },
    {
      name: "warningBody",
      type: "text" as const,
      label: "Warning message",
      description: "Body text of the photosensitivity warning screen.",
    },
    {
      name: "warningDuration",
      type: "number" as const,
      label: "Warning duration (ms)",
      description:
        "How long the photosensitivity warning stays on screen before the video plays, in milliseconds.",
      default: 1500,
    },
    {
      name: "video",
      type: "string" as const,
      label: "Transition video",
      description:
        "Path to the transition video that plays after the warning, relative to the site root (e.g. /videos/transition.mp4). Upload the file into public/videos and reference it here.",
    },
  ],
};

export default defineStackbitConfig({
  stackbitVersion: "~0.7.0",
  ssgName: "nextjs",
  nodeVersion: "20",
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["content"],
      models: [
        pageModel,
        headerModel,
        footerModel,
        entryModel,
        sharedLinkField,
        featureItemModel,
        editionButtonModel,
        editionModel,
        roleModel,
        heroSection,
        wallpaperCtaSection,
        manifestoSection,
        whereToBuySection,
        featuresSection,
        pageHeaderSection,
        proseSection,
        pillarsSection,
        statementSection,
        talesGridSection,
        newsletterSection,
        recruitmentSection,
      ],
      assetsConfig: {
        referenceType: "static",
        staticDir: "public",
        uploadDir: "images",
        publicPath: "/",
      },
    }),
  ],
  // Map page documents to site URLs. The home page lives in home.json but is
  // served from the site root.
  siteMap: ({ documents, models }) => {
    const pageModelNames = models.filter((m) => m.type === "page").map((m) => m.name);
    return documents
      .filter((doc) => pageModelNames.includes(doc.modelName))
      .map((document) => {
        // Prefer the declared slug field; fall back to the document id (the
        // file path, e.g. content/pages/tales.json) so a page always resolves
        // to its own URL even if the field is missing.
        const fieldSlug = (document.fields?.slug as { value?: string } | undefined)?.value;
        const idSlug = document.id?.split("/").pop()?.replace(/\.json$/, "");
        const slug = fieldSlug || idSlug;
        const urlPath = !slug || slug === "home" ? "/" : `/${slug}`;
        return {
          stableId: document.id,
          urlPath,
          document,
          isHomePage: urlPath === "/",
        };
      });
  },
});
