import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import PageHero from "@/components/PageHero";
import { marketplaces, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with DesignJanala. Tell us about your brand, website, SaaS or app.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Bring the Idea. We'll Structure It.">
        <p>Reach out directly: no gatekeeping and no minimum project size. We reply within one business day.</p>
      </PageHero>
      <ContactSection />
      <section className="container-x grid gap-6 py-20 sm:grid-cols-2 lg:grid-cols-4 lg:py-28">
        {Object.entries(site.emails).map(([k, email]) => (
          <a key={k} href={`mailto:${email}`} className="card p-7 transition-colors hover:bg-mist">
            <p className="text-body">{k === "project" ? "New Projects" : k === "career" ? "Careers" : "Samples"}</p>
            <p className="mt-2 break-all text-lg font-semibold">{email}</p>
          </a>
        ))}
        <div className="card p-7">
          <p className="text-body">Also available on</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {marketplaces.map((m) => (
              <a key={m.name} href={m.href} target="_blank" rel="noopener noreferrer" className="pill border border-line bg-white hover:border-accent hover:text-accent">
                {m.name}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
