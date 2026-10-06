import type { Metadata } from "next";
import Image from "next/image";
import ContactSection from "@/components/ContactSection";
import PageHero from "@/components/PageHero";
import Process from "@/components/Process";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import { projects, site, team, values } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us",
  description: "Meet DesignJanala — a brand, UI/UX and development team based in Dhaka, Bangladesh.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Us" title="A Team Focused on Building What Matters">
        <p>
          {site.name} started as a graphic design studio in Dhaka and has grown into an AI-powered product design and
          development partner for brands worldwide. More than a decade of design craft now powers the AI systems, SaaS
          platforms, apps and websites we build.
        </p>
      </PageHero>

      <section className="container-x pt-16 lg:pt-20">
        <div className="grid gap-4 sm:grid-cols-3">
          {[projects[2], projects[0], projects[6]].map((p, i) => (
            <Reveal key={p.image} delay={i * 100} className={`relative aspect-[4/5] overflow-hidden rounded-xl bg-surface ${i === 1 ? "sm:translate-y-12" : ""}`}>
              <Image src={p.image} alt={p.title} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x py-24 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="h-section">What Makes Us Different</h2>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-8 first:pt-0">
                <span className="font-mono text-sm text-accent tabular-nums">{String(i + 1).padStart(3, "0")}</span>
                <div>
                  <h3 className="h-display text-2xl">{v.title}</h3>
                  <p className="mt-2 text-lg text-body">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x pb-24 lg:pb-36">
        <Stats />
      </section>

      <section className="bg-night py-24 text-white lg:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Process" title={`The ${site.name} Development Journey`} className="mb-12" dark />
          <Process dark />
        </div>
      </section>

      <section className="container-x py-24 lg:py-36">
        <Reveal>
          <h2 className="h-section max-w-3xl">Built by Specialists. Connected by One Goal.</h2>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 80} className="card p-8">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-xl font-bold text-night">
                {m.name.split(" ").map((w) => w[0]).join("")}
              </span>
              <h3 className="h-display mt-16 text-2xl">{m.name}</h3>
              <p className="mt-1 text-body">{m.role}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Testimonials />

      <ContactSection />
    </>
  );
}
