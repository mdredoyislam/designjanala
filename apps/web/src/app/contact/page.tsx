import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import PageHero from "@/components/PageHero";
import { ArrowUpRight } from "@/components/icons";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with DesignJanala. Tell us about your brand, website, SaaS or app.",
};

export default async function ContactPage() {
  const { marketplaces, site } = await getContent();

  return (
    <>
      <PageHero eyebrow="Contact" title="Bring the Idea. We'll Structure It.">
        <p>Reach out directly: no gatekeeping and no minimum project size. We reply within one business day.</p>
      </PageHero>
      <ContactSection />
      <section className="container-x grid gap-6 py-20 sm:grid-cols-2 lg:grid-cols-4 lg:py-28">
        {Object.entries(site.emails).map(([k, email]) => (
          <a key={k} href={`mailto:${email}`} className="card corners group relative flex flex-col p-7 transition-colors hover:bg-mist">
            <p className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">{k === "project" ? "New Projects" : k === "career" ? "Careers" : "Samples"}</p>
            {/* Sized so a whole address fits one line; long custom addresses still wrap instead of overflowing. */}
            <p className="mt-3 text-[15px] font-semibold [overflow-wrap:anywhere] xl:text-base">{email}</p>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-8 font-mono text-[11px] font-semibold tracking-[0.08em] text-accent-fg uppercase">
              Write to us <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:rotate-45" />
            </span>
          </a>
        ))}
        <div className="card p-7">
          <p className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">Also available on</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {marketplaces.map((m) => (
              <a key={m.name} href={m.href} target="_blank" rel="noopener noreferrer" className="pill border border-line bg-card hover:border-accent hover:text-accent-fg">
                {m.name}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
