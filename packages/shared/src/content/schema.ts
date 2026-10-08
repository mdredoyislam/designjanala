import { z } from "zod";

/*
 * Website content model. The API validates every save against these schemas, the dashboard
 * renders its editors from them (via JSON Schema), and the website reads the result.
 *
 * Editor hints live in `.meta()`:
 *   title / description  label and help text
 *   widget               "textarea" | "image" | "date" | "paragraphs" (array of long strings)
 *   itemLabel            field shown as the heading of each item in a list
 *   optionsFrom          { section, value, label? }: a select filled from another section
 */

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const slug = (title = "Slug") =>
  z.string().regex(slugPattern, "Use lowercase letters, numbers and dashes, e.g. my-page.").meta({ title, description: "Used in the page URL." });
const text = (title: string, description?: string) => z.string().meta({ title, description });
const long = (title: string, description?: string) => z.string().meta({ title, description, widget: "textarea" });
const image = (title = "Image", description = "Upload an image or paste a path such as /images/team/photo.webp.") =>
  z.string().meta({ title, description, widget: "image" });
const strings = (title: string, item = "Item", description?: string) => z.array(z.string().meta({ title: item })).meta({ title, description });
const paragraphs = (title: string, description?: string) =>
  z.array(z.string().meta({ title: "Paragraph" })).meta({ title, description, widget: "paragraphs" });

/** A list whose items must have unique values for `key` (slugs used in URLs). */
const uniqueBy = <T extends z.ZodType<Record<string, unknown>>>(item: T, key: string) =>
  z.array(item).superRefine((items, ctx) => {
    const seen = new Set<unknown>();
    items.forEach((it, i) => {
      if (seen.has(it[key])) ctx.addIssue({ code: "custom", path: [i, key], message: `Duplicate ${key} "${String(it[key])}".` });
      seen.add(it[key]);
    });
  });

const titleBody = z.object({ title: text("Title"), body: long("Text") });
const faqList = z.array(z.object({ q: text("Question"), a: long("Answer") })).meta({ itemLabel: "q" });

export const siteSettingsSchema = z.object({
  name: text("Studio name"),
  tagline: text("Tagline"),
  location: text("Location"),
  url: z.url().meta({ title: "Website URL", description: "Used for SEO, the sitemap and social previews, e.g. https://designjanala.com." }),
  emails: z
    .object({
      project: z.email().meta({ title: "Project enquiries email" }),
      career: z.email().meta({ title: "Careers email" }),
      sample: z.email().meta({ title: "Templates & samples email" }),
    })
    .meta({ title: "Emails" }),
  github: text("GitHub URL", "Leave empty to hide the GitHub button on the Open Source page."),
});

const sections = {
  // Settings
  site: siteSettingsSchema,
  nav: z.array(z.object({ label: text("Label"), href: text("Link", "A path such as /services or a full URL.") })).meta({ itemLabel: "label" }),
  marketplaces: z.array(z.object({ name: text("Name"), href: text("Profile URL") })).meta({ itemLabel: "name" }),
  socials: z
    .array(z.object({ name: text("Network"), short: text("Short label", "Two letters shown in the footer, e.g. In."), href: text("Profile URL") }))
    .meta({ itemLabel: "name" }),

  // Home & About
  clients: strings("Clients", "Client", "Shown in the home page logo strip, after the marketplaces."),
  stats: z
    .array(z.object({ value: z.number().int().min(0).meta({ title: "Number" }), suffix: text("Suffix", "e.g. +"), label: text("Label") }))
    .meta({ itemLabel: "label" }),
  aiInProcess: strings("AI in our process", "Point"),
  whyUs: z.array(titleBody).meta({ itemLabel: "title" }),
  expectations: z.array(titleBody).meta({ itemLabel: "title" }),
  industries: z.array(titleBody).meta({ itemLabel: "title" }),
  comparison: z
    .array(
      z.object({
        label: text("Row"),
        us: text("DesignJanala"),
        freelancers: text("Freelancers"),
        agencies: text("Traditional agencies"),
      }),
    )
    .meta({ itemLabel: "label" }),
  process: z.array(titleBody).meta({ itemLabel: "title" }),
  values: z.array(titleBody).meta({ itemLabel: "title" }),
  testimonials: z.array(z.object({ quote: long("Quote"), name: text("Name"), role: text("Role / company") })).meta({ itemLabel: "name" }),

  // Services
  serviceCategories: uniqueBy(
    z.object({ slug: slug("Key"), title: text("Title"), blurb: long("Short description"), image: image("Illustration") }),
    "slug",
  ).meta({ itemLabel: "title" }),
  services: uniqueBy(
    z.object({
      slug: slug(),
      category: z.string().meta({ title: "Category", optionsFrom: { section: "serviceCategories", value: "slug", label: "title" } }),
      title: text("Title"),
      tagline: text("Menu tagline", "Short line under the title in the Services menu."),
      short: long("Summary"),
      body: paragraphs("Overview"),
      deliverables: strings("What you get", "Deliverable"),
    }),
    "slug",
  ).meta({ itemLabel: "title" }),

  // Technology
  techStack: z
    .array(z.object({ category: text("Category"), body: long("Description"), items: strings("Tools", "Tool") }))
    .meta({ itemLabel: "category" }),
  stackPrinciples: z.array(titleBody).meta({ itemLabel: "title" }),

  // Portfolio
  categories: uniqueBy(z.object({ slug: slug("Key"), label: text("Label") }), "slug").meta({ itemLabel: "label" }),
  projects: z
    .array(
      z.object({
        title: text("Title"),
        description: text("Description"),
        image: image(),
        categories: z.array(z.string()).meta({ title: "Categories", optionsFrom: { section: "categories", value: "slug", label: "label" } }),
        free: z.boolean().default(false).meta({ title: "Free download" }),
      }),
    )
    .meta({ itemLabel: "title" }),

  // Team & careers
  team: z
    .array(
      z.object({
        name: text("Name"),
        role: text("Role"),
        bio: long("Bio"),
        focus: strings("Focus areas", "Focus"),
        photo: image("Photo", "A cut-out portrait with a transparent background works best (PNG or WebP)."),
      }),
    )
    .meta({ itemLabel: "name" }),
  teamPrinciples: strings("Culture principles", "Principle", "Shown on the Team page culture slider (four work best)."),
  jobs: z
    .array(z.object({ title: text("Title"), type: text("Type", "e.g. Full-time"), location: text("Location"), team: text("Team"), body: long("Description") }))
    .meta({ itemLabel: "title" }),

  // Blog
  postCategories: strings("Blog categories", "Category"),
  posts: uniqueBy(
    z.object({
      slug: slug(),
      title: text("Title"),
      category: z.string().meta({ title: "Category", optionsFrom: { section: "postCategories" } }),
      author: z
        .string()
        .default("")
        .meta({ title: "Author", description: "Leave empty to credit the first team member.", optionsFrom: { section: "team", value: "name" } }),
      date: z.iso.date("Use the format YYYY-MM-DD.").meta({ title: "Publish date", widget: "date" }),
      excerpt: long("Excerpt"),
      body: paragraphs("Article"),
    }),
    "slug",
  ).meta({ itemLabel: "title" }),

  // Open source
  openSource: uniqueBy(
    z.object({
      slug: slug("Key"),
      category: z.enum(["Templates", "Design Resources", "Learning"]).meta({ title: "Category" }),
      title: text("Title"),
      body: long("Description"),
      format: text("Format chip", "e.g. Print, Video"),
      href: text("Link"),
      cta: text("Button label"),
      secondary: z
        .object({ label: text("Label"), href: text("Link") })
        .default({ label: "", href: "" })
        .meta({ title: "Secondary link", description: "Optional. Shown under the featured card." }),
      image: image("Preview image", "Optional.").default(""),
    }),
    "slug",
  ).meta({ itemLabel: "title" }),

  // FAQs
  faqs: faqList,
  servicesFaqs: faqList,
  teamFaqs: faqList,
  blogFaqs: faqList,
  freebieFaqs: faqList,
  openSourceFaqs: faqList,
};

export const contentSchema = z.object(sections);
export type SiteContent = z.infer<typeof contentSchema>;
export type ContentSectionKey = keyof SiteContent;

export const contentSectionKeys = Object.keys(sections) as ContentSectionKey[];
export const contentSectionSchemas: { [K in ContentSectionKey]: (typeof sections)[K] } = sections;

export const isContentSectionKey = (key: string): key is ContentSectionKey => Object.hasOwn(sections, key);

/** How the dashboard groups and names the sections. */
export const contentGroups: { label: string; sections: { key: ContentSectionKey; label: string; description: string }[] }[] = [
  {
    label: "Settings",
    sections: [
      { key: "site", label: "Studio details", description: "Name, tagline, location, website URL and contact emails." },
      { key: "nav", label: "Main menu", description: "Links in the header navigation." },
      { key: "socials", label: "Social links", description: "Social profiles shown in the footer." },
      { key: "marketplaces", label: "Marketplaces", description: "Upwork, Fiverr and template marketplace profiles." },
    ],
  },
  {
    label: "Home & About",
    sections: [
      { key: "stats", label: "Key numbers", description: "Projects, clients, years and team size." },
      { key: "clients", label: "Clients", description: "Client names in the home page logo strip and \"We worked with them\"." },
      { key: "aiInProcess", label: "AI in our process", description: "Checklist in the \"AI isn't an add-on\" section." },
      { key: "whyUs", label: "Why choose us", description: "Three cards under \"Because Serious Products Need the Right Team\"." },
      { key: "process", label: "Development journey", description: "Process steps on the home, About and service pages." },
      { key: "industries", label: "Industries", description: "Industries on the radar and services page." },
      { key: "comparison", label: "Comparison table", description: "\"Where Others Stop, We Continue\"." },
      { key: "expectations", label: "What to expect", description: "Promise grid on the home page." },
      { key: "values", label: "What makes us different", description: "About page values." },
      { key: "testimonials", label: "Testimonials", description: "Client quotes." },
    ],
  },
  {
    label: "Services & Technology",
    sections: [
      { key: "serviceCategories", label: "Service groups", description: "The four service groups and their illustrations." },
      { key: "services", label: "Services", description: "Every service page: summary, overview and deliverables." },
      { key: "techStack", label: "Tech stack", description: "Technology categories and tools." },
      { key: "stackPrinciples", label: "Stack principles", description: "How we choose technology (Technology page)." },
    ],
  },
  {
    label: "Work",
    sections: [
      { key: "projects", label: "Portfolio & freebies", description: "Portfolio items; mark free templates as free downloads." },
      { key: "categories", label: "Portfolio categories", description: "Filters on the portfolio and freebies pages." },
      { key: "openSource", label: "Open source", description: "Resources on the Open Source page." },
    ],
  },
  {
    label: "Team & Careers",
    sections: [
      { key: "team", label: "Team members", description: "Names, roles, bios and photos." },
      { key: "teamPrinciples", label: "Culture", description: "\"Given the choice, we…\" principles." },
      { key: "jobs", label: "Open roles", description: "Jobs listed on the Team page." },
    ],
  },
  {
    label: "Blog",
    sections: [
      { key: "posts", label: "Articles", description: "Blog posts." },
      { key: "postCategories", label: "Blog categories", description: "Categories used to filter articles." },
    ],
  },
  {
    label: "FAQs",
    sections: [
      { key: "faqs", label: "Home FAQ", description: "Questions on the home and contact pages." },
      { key: "servicesFaqs", label: "Services FAQ", description: "Questions on the services pages." },
      { key: "teamFaqs", label: "Team FAQ", description: "Questions on the Team page." },
      { key: "blogFaqs", label: "Blog FAQ", description: "Questions on the blog." },
      { key: "freebieFaqs", label: "Freebies FAQ", description: "Questions on the freebies page." },
      { key: "openSourceFaqs", label: "Open source FAQ", description: "Questions on the Open Source page." },
    ],
  },
];

/** Stored edits: only sections that were changed from the defaults. */
export type ContentOverrides = Partial<{ [K in ContentSectionKey]: { value: SiteContent[K]; updatedAt: string } }>;

/** What `GET /content/admin` returns to the dashboard. */
export type ContentSectionStatus = { key: ContentSectionKey; customized: boolean; updatedAt?: string };
