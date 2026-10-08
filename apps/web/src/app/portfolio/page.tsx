import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PortfolioGrid from "@/components/PortfolioGrid";
import { projects } from "@/data/site";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Brand identities, company profiles, proposals, newsletters, catalogs, resumes and stationery by DesignJanala.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero eyebrow="Work" title="Selected Work">
        <p>
          {projects.length} print and brand projects — from brand identities and business proposals to newsletters,
          catalogs and resumes.
        </p>
      </PageHero>
      <section className="container-x py-16 lg:py-24">
        <PortfolioGrid projects={projects} />
      </section>
    </>
  );
}
