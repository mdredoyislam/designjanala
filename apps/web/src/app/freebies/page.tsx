import type { Metadata } from "next";
import CodeWindow from "@/components/CodeWindow";
import { CtaCode } from "@/components/Cta";
import Faq from "@/components/Faq";
import FreebieGrid from "@/components/FreebieGrid";
import PageHero, { HeroChips } from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { categories, freebieFaqs, marketplaces, projects, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Freebies",
  description: `Free and premium design templates by ${site.name}: resumes, brand identities, proposals, newsletters and stationery.`,
};

const slug = site.name.toLowerCase();
const freeCount = projects.filter((p) => p.free).length;
const creativeMarket = marketplaces.find((m) => m.name === "Creative Market")!.href;

const steps = [
  { title: "Pick a template", body: "Browse the directory and filter by category. Free templates are listed first." },
  { title: "Request the files", body: `Click "Get template" and we'll email you the source files from ${site.emails.sample}.` },
  { title: "Make it yours", body: "Swap in your content, colours and logo. Need help? We can customise it for you." },
];

export default function FreebiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Freebies"
        title={
          <>
            Free Templates.
            <br /> More Possibilities.
          </>
        }
        aside={
          <CodeWindow
            file={`~/${slug}/freebies.json`}
            code={`{
  "collection": "${site.name}",
  "templates": ${projects.length},
  "free": ${freeCount},
  "categories": ["resume", "branding", "print"],
  "next": "make it yours"
}`}
            footer={
              <>
                <span className="text-accent">↗ explore the templates</span>
                <span>{site.name} / community</span>
              </>
            }
          />
        }
      >
        <p>
          Professionally designed resumes, brand identities, proposals and stationery by the {site.name} design team.
          Download a free template, or find the full collection on Creative Market.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#directory" className="btn-primary">
            Explore the templates
          </a>
          <a href={creativeMarket} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            Visit Creative Market
          </a>
        </div>
        <div className="mt-8">
          <HeroChips
            items={[
              { value: String(freeCount), label: "free templates" },
              { value: String(categories.length - 1), label: "categories" },
              { value: `${projects.length}`, label: "designs in total" },
            ]}
          />
        </div>
      </PageHero>

      <section id="directory" className="scroll-mt-16 bg-night pb-20 text-white lg:pb-28">
        <div className="container-x border-t border-night-line pt-16">
          <SectionHeading
            eyebrow="Template directory"
            title={
              <>
                Design Templates.
                <br /> Ready to Explore.
              </>
            }
            aside={<p>Find a resume, a brand identity kit or a business proposal. Every card shows the template and where to get it.</p>}
            dark
            className="mb-10"
          />
          <FreebieGrid projects={projects} />
          <p className="mt-8 text-xs text-white/40">
            Free templates are for personal and commercial use in your own projects. Please don&rsquo;t resell or redistribute the files.
          </p>
        </div>
      </section>

      <section className="bg-night pb-20 text-white lg:pb-28">
        <div className="container-x">
          <SectionHeading eyebrow="How it works" title={<>Small Steps.<br /> Big Results.</>} dark className="mb-10" />
          <div className="grid gap-px overflow-hidden rounded-xl border border-night-line bg-night-line md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 80} className="bg-night p-6 sm:p-8">
                <span className="font-mono text-[11px] tracking-wider text-accent uppercase">0{i + 1} / {s.title.split(" ")[0]}</span>
                <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-white/60">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Faq title="Questions Before You Use a Template" items={freebieFaqs} />

      <CtaCode
        title="Turn a Template Into Your Next Brand"
        body={`Start from a solid template and let ${site.name} tailor it into a complete identity, website or product.`}
        file={`~/${slug}/next-brand.ts`}
        code={`const nextBrand = {
  startingPoint: "template",
  logo: true,
  website: ["Next.js", "Webflow"],
  team: "${site.name}",
};
// from a template to your brand`}
        cta="Discuss your project"
      />
    </>
  );
}
