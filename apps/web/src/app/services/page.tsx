import type { Metadata } from "next";
import Link from "next/link";
import CodeWindow from "@/components/CodeWindow";
import CountUp from "@/components/CountUp";
import { CtaPeach } from "@/components/Cta";
import Faq from "@/components/Faq";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ServiceAccordion from "@/components/ServiceAccordion";
import { TeamAvatar } from "@/components/TeamPhoto";
import Testimonials from "@/components/Testimonials";
import { industries, serviceCategories, services, servicesFaqs, servicesIn, site, team } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web, mobile & AI development services: AI automation, SaaS platforms, mobile apps, MVPs, UI/UX and brand design, and Webflow / Framer development.",
};

const heroStats = [
  { value: 1500, suffix: "+", label: "Projects shipped" },
  { value: services.length, suffix: "", label: "Core services" },
  { value: 350, suffix: "+", label: "Happy clients" },
  { value: 12, suffix: "", label: "Years in business" },
  { value: 0, suffix: "", label: "Hidden fees" },
];

const code = `const services = {
  ai: ["Agents", "LLM", "RAG"],
  build: ["SaaS", "Web", "MVP"],
  mobile: ["iOS", "Android"],
  design: ["UI/UX", "Brand"],
};`;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Design, Web, Mobile & AI Development Services"
        aside={<CodeWindow file={`~/${site.name.toLowerCase()}/services.ts`} code={code} footer={<><span>● build passing</span><span>4 groups</span></>} />}
        footer={
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-night-line bg-night-line sm:grid-cols-3 lg:grid-cols-5">
            {heroStats.map((s) => (
              <div key={s.label} className="flex items-center justify-between gap-3 bg-night px-5 py-4">
                <dt className="font-mono text-[10px] leading-tight tracking-[0.12em] text-white/50 uppercase">{s.label}</dt>
                <dd className="h-display text-2xl text-accent">
                  <CountUp value={s.value} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        }
      >
        <p>
          Behind every service we offer is a team that cares about the details you&rsquo;ll never see. We design, build,
          test and refine until the work is something we stand behind fully.
        </p>
        <Link href="/contact" className="btn-secondary mt-8">
          Start your project
        </Link>
      </PageHero>

      {/* Service groups */}
      <section className="container-x py-20 lg:py-28">
        <SectionHeading
          title="Every Service We Offer Held to One Standard"
          aside={<p>There&rsquo;s no premium tier and no shortcut version here, just one bar every service has to clear before it reaches you, whichever service you choose.</p>}
        />
        <div className="mt-12">
          {/* Use the interactive ServiceAccordion */}
          <ServiceAccordion 
            groups={serviceCategories.map((c) => ({
              slug: c.slug,
              title: c.title,
              blurb: c.blurb,
              image: c.image,
              list: servicesIn(c.slug).map(s => ({ slug: s.slug, title: s.title }))
            }))} 
          />
        </div>
      </section>

      {/* Industries */}
      <section className="bg-surface/60 py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading
            title="We Show Up Already Knowing the Rules"
            aside={<p>Every industry comes with its own rules, risks and expectations, and generic development misses them. We build with that context already understood.</p>}
          />
          <div className="mt-12 -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:px-0 lg:grid-cols-4">
            {industries.map((ind, i) => (
              <Reveal key={ind.title} delay={(i % 4) * 70} className="w-[70vw] shrink-0 snap-start sm:w-auto">
                <div className="flex h-28 items-center justify-center rounded-xl bg-card">
                  <span className="grid grid-cols-3 gap-1.5" aria-hidden="true">
                    {Array.from({ length: 6 }, (_, j) => (
                      <span key={j} className={`h-5 w-5 rounded ${j === i % 6 ? "bg-accent" : "bg-surface"}`} />
                    ))}
                  </span>
                </div>
                <h3 className="mt-4 font-semibold">{ind.title}</h3>
                <p className="mt-1.5 text-sm text-body">{ind.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* We join your team */}
      <section className="relative overflow-hidden bg-night py-20 text-white lg:py-28">
        <div className="bg-halftone pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="container-x relative">
          <SectionHeading title="We Don't Hand Off Work, We Join Yours" center />
          <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-end">
            <Reveal>
              <p className="h-display text-2xl normal-case leading-snug sm:text-3xl">
                A {site.name} designer or engineer joins your team as if they&rsquo;d always been there: same repo, same
                tools, same standups. No ramp-up period, no re-hiring cycle every quarter.
              </p>
              <Link href="/contact" className="btn-primary mt-8">
                Request an engineer
              </Link>
            </Reveal>
            <Reveal delay={120} className="card-dark overflow-hidden">
              <div className="flex items-center justify-between border-b border-night-line px-5 py-3 font-mono text-[11px] text-white/50">
                <span>{site.name.toLowerCase()} / available team</span>
                <span className="flex items-center gap-1.5 text-[#28c840]">
                  <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-[#28c840]" /> online
                </span>
              </div>
              <ul className="divide-y divide-night-line">
                {team.map((m) => (
                  <li key={m.name} className="flex items-center gap-4 px-5 py-3.5">
                    <TeamAvatar member={m} className="h-9 w-9" />
                    <span className="flex-1">
                      <span className="block text-sm font-medium">{m.role}</span>
                      <span className="block text-xs text-white/45">{m.focus.join(" · ")}</span>
                    </span>
                    <span className="rounded border border-night-line px-2 py-1 font-mono text-[10px] text-white/60 uppercase">Full-time</span>
                  </li>
                ))}
              </ul>
              <dl className="grid grid-cols-3 border-t border-night-line text-center">
                {[
                  ["24h", "Avg. reply time"],
                  ["0 wks", "Ramp-up"],
                  ["0", "Recruiter fees"],
                ].map(([v, l]) => (
                  <div key={l} className="px-3 py-4">
                    <dd className="h-display text-2xl text-accent">{v}</dd>
                    <dt className="mt-1 font-mono text-[10px] tracking-wider text-white/45 uppercase">{l}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <Faq title="Questions About Our Development Services" items={servicesFaqs} more={{ label: "Explore our technology stack", href: "/technology" }} />

      <Testimonials title="Proof, Not Promises" dark />

      <CtaPeach
        title="Bring the Idea. We'll Structure It."
        body="Reach out directly, no gatekeeping, no minimum project size. We'll ask the right questions and turn your idea into a real plan."
      />
    </>
  );
}
