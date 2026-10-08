import type { Metadata } from "next";
import BlogGrid from "@/components/BlogGrid";
import Faq from "@/components/Faq";
import Newsletter from "@/components/Newsletter";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { blogFaqs, posts, site, team } from "@/data/site";

export const metadata: Metadata = {
  title: "Blog",
  description: `Design and engineering insights from ${site.name}: product design, branding, development and practical AI.`,
};

export default function BlogPage() {
  const author = team[0];
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
        <Reveal className="mt-12 w-full max-w-xs">
          <div className="flex aspect-[4/5] items-end overflow-hidden rounded-xl bg-gradient-to-br from-accent via-[#ffdf40] to-[#fff1a8] p-6">
            <span className="h-display text-7xl text-accent-ink/90">{author.name.split(" ").map((w) => w[0]).join("")}</span>
          </div>
          <div className="mt-3 rounded-xl border border-line py-4 text-center">
            <p className="font-semibold">{author.name}</p>
            <p className="mt-0.5 font-mono text-[10px] tracking-wider text-muted uppercase">
              {author.role} · {posts.length} articles
            </p>
          </div>
        </Reveal>
      </section>

      <Newsletter />

      <Faq title="Questions About Our Design & Development Insights" items={blogFaqs} more={{ label: "Explore our services", href: "/services" }} />
    </>
  );
}
