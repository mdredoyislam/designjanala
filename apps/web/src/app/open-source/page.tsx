import type { Metadata } from "next";
import Link from "next/link";
import CodeWindow from "@/components/CodeWindow";
import Faq from "@/components/Faq";
import OpenSourceGrid from "@/components/OpenSourceGrid";
import PageHero, { HeroChips } from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { getContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getContent();
  return {
    title: "Open Source",
    description: `Free templates, design resources and classes from ${site.name}. Explore the collection and find your next starting point.`,
  };
}

export default async function OpenSourcePage() {
  const { marketplaces, openSource, openSourceFaqs, site } = await getContent();
  const slug = site.name.toLowerCase();
  const categories = Array.from(new Set(openSource.map((p) => p.category)));
  const creativeMarket = marketplaces.find((m) => m.name === "Creative Market")?.href ?? "/freebies";
  // "Visit GitHub" appears once site.github is set; until then the second button points to Creative Market.
  const secondary = site.github ? { label: "Visit GitHub", href: site.github } : { label: "Visit Creative Market", href: creativeMarket };
  const steps = [
    { tag: "Explore", title: "Start with the preview", body: "Check each resource's preview, format and description to make sure it fits what you want to make." },
    { tag: "Discuss", title: "Ask before you adapt", body: `Not sure a file fits? Email ${site.emails.sample} with what you're building and we'll point you to the right one.` },
    { tag: "Contribute", title: "Share what you made", body: "Built something with our resources? Send it to us or tag us. Feedback and fixes improve every next release." },
  ];

  return (
    <>
      <PageHero
        eyebrow="Open Source"
        title={
          <>
            Open Source.
            <br /> More Possibilities.
          </>
        }
        aside={
          <CodeWindow
            file={`~/${slug}/open-source.json`}
            code={`{
  "collection": "${site.name}",
  "projects": ${openSource.length},
  "categories": [
${categories.map((c) => `    "${c.toLowerCase()}"`).join(",\n")}
  ],
  "next": "build together"
}`}
            footer={
              <>
                <span className="text-accent-fg">↗ explore the source</span>
                <span>{site.name} / community</span>
              </>
            }
          />
        }
      >
        <p>
          Explore free templates, design resources and classes made by the {site.name} team. Open the files, learn from
          the classes, and find your next starting point.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#directory" className="btn-primary">
            Explore the projects
          </a>
          <a href={secondary.href} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            {secondary.label}
          </a>
        </div>
        <div className="mt-8">
          <HeroChips
            items={[
              { value: String(openSource.length), label: "featured projects" },
              { value: String(categories.length), label: "categories" },
              { value: "Free", label: "for the community" },
            ]}
          />
        </div>
      </PageHero>

      <section id="directory" className="scroll-mt-16 bg-night pb-20 text-white lg:pb-28">
        <div className="container-x border-t border-night-line pt-16 lg:pt-20">
          <SectionHeading
            eyebrow="Project directory"
            title={
              <>
                Open Resources.
                <br /> Ready to Explore.
              </>
            }
            aside={<p>Find a free template, browse a design collection or start a class. Every card takes you straight to the original source.</p>}
            dark
            className="mb-10"
          />
          <OpenSourceGrid openSource={openSource} />
          <p className="mt-6 max-w-2xl text-xs leading-relaxed text-white/40">
            Explore the open collection curated by {site.name}. Check each resource&rsquo;s licence, format and usage notes
            before using it in your project.
          </p>
        </div>
      </section>

      <section className="bg-night pb-20 text-white lg:pb-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Contribute"
            title={
              <>
                Small Contributions.
                <br /> Shared Progress.
              </>
            }
            dark
            className="mb-10"
          />
          <div className="grid gap-px overflow-hidden rounded-xl border border-night-line bg-night-line md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.tag} delay={i * 80} className="bg-night p-6 sm:p-8">
                <span className="font-mono text-[11px] tracking-wider text-accent-fg uppercase">
                  0{i + 1} / {s.tag}
                </span>
                <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Faq title="Questions Before You Build With Open Source" items={openSourceFaqs} />

      {/* CTA: dark card with code window */}
      <section className="container-x pb-20 lg:pb-28">
        <Reveal className="relative overflow-hidden rounded-2xl bg-night px-6 py-12 text-white sm:px-12 lg:py-16">
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-[600px] rounded-full bg-accent/25 blur-[100px]" aria-hidden="true" />
          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="h-section">Turn Open Resources Into Your Next Product</h2>
              <p className="mt-4 max-w-md text-white/70">
                Build on a strong starting point. {site.name} helps you adapt templates, design your brand and turn ideas
                into products built around your users.
              </p>
              <a
                href="#directory"
                className="mt-6 inline-flex items-center gap-3 rounded-md border border-night-line bg-night-2 py-1.5 pr-3 pl-1.5 text-sm"
              >
                <span className="rounded bg-white/10 px-2 py-1 font-mono text-[10px] tracking-wider text-white/70 uppercase">
                  Explore the collection
                </span>
                {openSource.length} open projects
              </a>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/contact" className="btn-primary">
                  Discuss your project
                </Link>
                <span className="font-mono text-[11px] tracking-wider text-white/50 uppercase">30-min call · No obligation</span>
              </div>
            </div>
            <div className="relative">
              <span className="absolute -top-8 right-0 rounded-md border border-night-line bg-night-2 px-3 py-1.5 font-mono text-[10px] text-white/60">
                ✦ Templates &amp; classes
              </span>
              <CodeWindow
                file={`~/${slug}/open-source.ts`}
                code={`const nextProduct = {
  startingPoint: "open source",
  brand: ["Identity", "Templates"],
  web: ["React", "Next.js"],
  team: "${site.name}",
};
// from a resource to your product`}
                cursor
              />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
