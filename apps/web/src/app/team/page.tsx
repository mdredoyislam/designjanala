import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Faq from "@/components/Faq";
import Reveal from "@/components/Reveal";
import CultureSlider from "@/components/CultureSlider";
import { Founders, TeamPhoto } from "@/components/TeamPhoto";
import { art, jobs, projects, serviceCategories, site, stats, team, teamFaqs, teamPrinciples } from "@/data/site";

export const metadata: Metadata = {
  title: "Team",
  description: `Meet the ${site.name} team: the designers, developers and specialists who work on your project from kickoff to launch.`,
};

export default function TeamPage() {
  const leaders = team.slice(0, 2);
  // Only the founder gets studio-wide numbers; everyone else is described by focus area.
  const leaderStats = [
    [
      [String(stats[2].value), "Years leading the studio"],
      [`${stats[0].value}+`, "Projects delivered"],
      [`${stats[1].value}+`, "Clients served"],
    ],
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-night text-white">
        <div className="bg-halftone pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-x relative pt-16 sm:pt-20 lg:pt-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-8">
              <p className="eyebrow lowercase">[ team ]</p>
              <h1 className="h-hero mt-5">
                Fewer Hands, Tighter Builds,
                <br className="hidden sm:block" /> and Better Results
              </h1>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">
                  Let&rsquo;s talk
                </Link>
                <Link href="#leaders" className="btn-secondary">
                  Meet the leads
                </Link>
              </div>
            </Reveal>
            <Reveal delay={100} as="dl" className="space-y-3 lg:col-span-4 lg:justify-self-end">
              {[
                [String(team.length), "Core team members"],
                [`${stats[0].value}+`, "Projects delivered"],
                [`${stats[2].value}`, "Years in business"],
              ].map(([v, l]) => (
                <div key={l} className="flex items-baseline gap-4 border-b border-night-line pb-3 last:border-0">
                  <dd className="h-display w-24 text-3xl">{v}</dd>
                  <dt className="font-mono text-[11px] tracking-wider text-white/55 uppercase">{l}</dt>
                </div>
              ))}
            </Reveal>
          </div>

          {/* Wide image band */}
          <Reveal className="relative mt-14 aspect-[16/7] overflow-hidden rounded-t-xl sm:aspect-[16/6]">
            <Image src={art("studio")} alt="Design canvas, code editor and mobile app on one shared workspace" fill preload sizes="100vw" className="object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
          </Reveal>
        </div>
      </section>

      {/* Collage: the founders plus what they build */}
      <section className="container-x py-16 lg:py-20">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Reveal className="col-span-2 row-span-2 aspect-[4/3] overflow-hidden rounded-lg sm:aspect-auto">
            <Founders sizes="(min-width: 640px) 25vw, 50vw" className="h-full w-full" />
          </Reveal>
          {serviceCategories.map((c, i) => (
            <Reveal key={c.slug} delay={(i + 1) * 70} className={`relative aspect-[4/3] overflow-hidden rounded-lg bg-surface ${i > 1 ? "hidden sm:block" : ""}`}>
              <Image src={c.image} alt={c.title} fill sizes="(min-width: 640px) 25vw, 50vw" className="object-cover" />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 flex items-center justify-center gap-3">
          <Image src="/images/brand/logo.png" alt={site.name} width={150} height={24} className="h-auto w-[150px]" />
          <span className="font-mono text-[11px] tracking-wider text-muted uppercase">· {site.location}</span>
        </Reveal>
      </section>

      {/* Leads */}
      <section id="leaders" className="container-x scroll-mt-20 pb-20 lg:pb-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow lowercase text-accent">[ the leaderboard ]</p>
          <h2 className="h-section mt-4">Meet the People Who Never Hand Your Project Off</h2>
        </Reveal>
        <div className="mt-16 relative">
          {leaders.map((m, i) => (
            <div 
              key={m.name} 
              className="sticky rounded-[2rem] bg-night-2 p-8 lg:p-12 mb-12 shadow-2xl border border-white/5"
              style={{ top: `${100 + (i * 40)}px` }}
            >
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7 flex flex-col items-start">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-accent font-mono text-sm">0{i + 1}</span>
                    <div>
                      <h3 className="h-display text-3xl sm:text-4xl text-white">{m.name}</h3>
                      <p className="font-mono text-[11px] tracking-wider text-accent uppercase mt-1">{m.role}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="rounded-full bg-white/5 px-3 py-1 font-mono text-[10px] tracking-wider text-white/60 uppercase">Based in {site.location}</span>
                  </div>
                  <p className="max-w-lg text-body text-white/70 leading-relaxed">{m.bio}</p>
                  
                  <div className="mt-8 grid grid-cols-3 gap-6 border-t border-white/10 pt-8 w-full max-w-md">
                    {(leaderStats[i] ?? m.focus.map((f, j) => [`0${j + 1}`, f])).map(([v, l]) => (
                      <div key={l}>
                        <p className="text-3xl font-medium text-accent">{v}</p>
                        <p className="font-mono text-[10px] tracking-wider text-white/50 uppercase mt-2">{l}</p>
                      </div>
                    ))}
                  </div>
                  
                  <Link href="/contact" className="btn-primary mt-10 rounded-full">
                    Read full profile
                  </Link>
                </div>
                
                <div className="lg:col-span-5 h-full">
                  <TeamPhoto member={m} sizes="(min-width: 1024px) 40vw, 90vw" className="h-full min-h-[400px] rounded-2xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Everyone */}
      <section className="bg-surface/60 py-20 lg:py-28">
        <div className="container-x">
          <Reveal className="max-w-xl">
            <h2 className="h-section">Every Person You&rsquo;ll Actually Work With</h2>
            <p className="mt-4 text-sm leading-relaxed text-body">
              These are the only people who will ever touch your project. No hand-offs, no hidden subcontractors, and you
              talk to them directly.
            </p>
          </Reveal>
          <div className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={(i % 3) * 80} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/5] bg-surface">
                  <TeamPhoto
                    member={m}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    className="h-full w-full"
                    imageClassName="transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{m.name}</h3>
                  <p className="text-body text-sm mt-1">{m.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Slider */}
      <CultureSlider principles={teamPrinciples} />

      {/* Careers */}
      <section id="careers" className="container-x scroll-mt-20 py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
            <p className="eyebrow">[ Careers ]</p>
            <h2 className="h-section mt-4">We&rsquo;re Not Hiring Headcount, We&rsquo;re Hiring Hands That Build</h2>
            <p className="lead mt-5">
              Before {site.name} commits to anyone, we ask what gap they fill and how their work will show up in what we
              ship for clients.
            </p>
            <a href={`mailto:${site.emails.career}?subject=Job%20application`} className="btn-primary mt-8">
              Send your CV
            </a>
          </Reveal>
          <div className="space-y-4 lg:col-span-7">
            {jobs.map((j, i) => (
              <Reveal key={j.title} delay={i * 70} className="card p-6 sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-[10px] tracking-wider text-muted uppercase">
                    {j.type} · {j.location}
                  </span>
                  <span className="rounded bg-card px-2 py-1 font-mono text-[10px] tracking-wider text-muted uppercase">{j.type === "Internship" ? "Entry level" : "Mid level"}</span>
                </div>
                <p className="mt-5 font-mono text-[10px] tracking-wider text-accent uppercase">{j.team}</p>
                <h3 className="mt-1 text-xl font-semibold">{j.title}</h3>
                <p className="mt-2 text-sm text-body">{j.body}</p>
                <a href={`mailto:${site.emails.career}?subject=${encodeURIComponent(`Application: ${j.title}`)}`} className="btn-dark mt-5">
                  Apply
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA with image collage on the sides */}
      <section className="relative overflow-hidden bg-surface py-20 lg:py-28">
        <div className="bg-dots pointer-events-none absolute inset-0" aria-hidden="true" />
        {[
          { p: projects[12], cls: "left-[3%] top-10 w-40 -rotate-6" },
          { p: projects[20], cls: "left-[10%] bottom-8 w-32 rotate-3" },
          { p: projects[25], cls: "right-[3%] top-12 w-36 rotate-6" },
          { p: projects[30], cls: "right-[11%] bottom-10 w-40 -rotate-3" },
        ].map(({ p, cls }) => (
          <div key={p.image} className={`absolute hidden aspect-[4/3] overflow-hidden rounded-lg shadow-lg lg:block ${cls}`} aria-hidden="true">
            <Image src={p.image} alt="" fill sizes="160px" className="object-cover" />
          </div>
        ))}
        <Reveal className="container-x relative text-center">
          <p className="eyebrow">[ Join us ]</p>
          <p className="mx-auto mt-4 max-w-md text-sm text-body">
            Want to grow by doing real work for real clients? We also run online and offline design courses.
          </p>
          <h2 className="h-section mx-auto mt-4 max-w-2xl">Check What Roles Are Open and See If You&rsquo;re the Best Fit</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="#careers" className="btn-primary">
              Open roles
            </Link>
            <Link href="/career" className="btn-dark">
              Courses
            </Link>
          </div>
        </Reveal>
      </section>

      <Faq title="Questions About Working With Our Development Team" items={teamFaqs} more={{ label: "Explore our services", href: "/services" }} />
    </>
  );
}
