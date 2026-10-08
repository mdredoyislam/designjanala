import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PortfolioGrid from "@/components/PortfolioGrid";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Brand identities, company profiles, proposals, newsletters, catalogs, resumes and stationery by DesignJanala.",
};

export default async function PortfolioPage() {
  const { projects, categories } = await getContent();

  return (
    <>
      <PageHero eyebrow="Work" title="Selected Work">
        <p>
          {projects.length} print and brand projects — from brand identities and business proposals to newsletters,
          catalogs and resumes.
        </p>
      </PageHero>
      <section className="container-x py-16 lg:py-24">
        <PortfolioGrid projects={projects} categories={categories} />
      </section>
    </>
  );
}
