import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { ArrowUpRight } from "@/components/icons";
import { art, site, socials } from "@/data/site";

export const metadata: Metadata = {
  title: "Career",
  description: "Join DesignJanala — full-time, internship and remote opportunities, plus online and offline design courses.",
};

const youtube = socials.find((s) => s.name === "YouTube")!.href;

const paths = [
  {
    kicker: "Online tutorial",
    title: "Learn from our video classes",
    body: "Class videos are available online, so you can learn graphic design at your own pace.",
    cta: "Go to online classroom",
    href: youtube,
    image: art("career-online"),
    alt: "Online video class with a lesson playlist",
  },
  {
    kicker: "Offline course",
    title: "Take admission in Dhaka",
    body: "Hands-on classes with our designers, from fundamentals to freelancing-ready portfolios.",
    cta: "Ask about admission",
    href: `mailto:${site.emails.career}?subject=Offline%20course%20admission`,
    image: art("career-offline"),
    alt: "Classroom whiteboard with a design lesson",
  },
  {
    kicker: "Join our team",
    title: "Confident? Drop your CV",
    body: "We hire designers and developers for the long term, and offer internships and remote roles.",
    cta: "Send your CV",
    href: `mailto:${site.emails.career}?subject=Job%20application`,
    image: art("career-cv"),
    alt: "A CV being sent",
  },
];

export default function CareerPage() {
  return (
    <>
      <PageHero eyebrow="Career" title="Build the Future of Design With Us">
        <p>
          We work on design and development projects for all types of organisations. If you&rsquo;re enthusiastic about
          design or development and ready to make an impact, we&rsquo;d love to hear from you.
        </p>
      </PageHero>
      <section className="container-x py-16 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-3">
          {paths.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <a
                href={p.href}
                target={p.href.startsWith("http") ? "_blank" : undefined}
                rel={p.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`group flex h-full min-h-[380px] flex-col justify-between rounded-2xl border p-8 transition-colors duration-500 sm:p-10 ${
                  i === 2 ? "border-accent bg-accent text-accent-ink hover:bg-accent-soft" : "border-transparent bg-surface hover:bg-mist"
                }`}
              >
                <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] opacity-70">{p.kicker}</span>
                <div className="relative my-8 aspect-[5/3] overflow-hidden rounded-xl">
                  <Image src={p.image} alt={p.alt} fill sizes="(min-width: 1024px) 30vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div>
                  <h2 className="h-display text-3xl">{p.title}</h2>
                  <p className="mt-4 text-sm leading-relaxed opacity-70">{p.body}</p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
                    {p.cta} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
