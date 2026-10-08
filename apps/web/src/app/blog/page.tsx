import type { Metadata } from "next";
import BlogGrid from "@/components/BlogGrid";
import Faq from "@/components/Faq";
import Newsletter from "@/components/Newsletter";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { TeamPhoto } from "@/components/TeamPhoto";
import { blogFaqs, site, team } from "@/data/site";

export const metadata: Metadata = {
  title: "Blog",
  description: `Design and engineering insights from ${site.name}: product design, branding, development and practical AI.`,
};

export default function BlogPage() {
  return (
    <>
      <PageHero eyebrow="Insights" title="Design & Engineering Insights and Product Thinking">
        <p>Deep dives into product design, branding, AI-driven development, scalability and modern engineering practice.</p>
      </PageHero>

      <section className="bg-night pb-20 text-white lg:pb-28">
        <div className="container-x border-t border-night-line pt-12">
          <BlogGrid />
        </div>
      </section>

      <section className="container-x py-20 lg:py-28">
        <SectionHeading
          title="The People Behind Our Insights"
          aside={<p>Perspectives on product design, development and practical AI from the team doing the work.</p>}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:max-w-2xl">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 80}>
              <TeamPhoto member={m} tone="accent" sizes="(min-width: 640px) 320px, 90vw" className="aspect-[4/5] rounded-xl" />
              <div className="mt-3 rounded-xl border border-line py-4 text-center">
                <p className="font-semibold">{m.name}</p>
                <p className="mt-0.5 font-mono text-[10px] tracking-wider text-muted uppercase">
                  {m.role} · {site.name}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Newsletter />

      <Faq title="Questions About Our Design & Development Insights" items={blogFaqs} more={{ label: "Explore our services", href: "/services" }} />
    </>
  );
}
