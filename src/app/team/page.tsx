import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Faq from "@/components/Faq";
import Reveal from "@/components/Reveal";
import { jobs, projects, site, stats, team, teamFaqs, teamPrinciples } from "@/data/site";

export const metadata: Metadata = {
  title: "Team",
  description: `Meet the ${site.name} team: the designers, developers and specialists who work on your project from kickoff to launch.`,
};

const initials = (name: string) => name.split(" ").map((w) => w[0]).join("");
const tints = ["from-accent to-[#f6a06b]", "from-[#2a2a2a] to-[#5a5a5a]", "from-[#b13e02] to-accent", "from-[#3a3530] to-[#8a7d6d]"];

/** Gradient portrait placeholder with initials. Swap for <Image> once team photos exist. */
function Portrait({ name, index, className = "" }: { name: string; index: number; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${tints[index % tints.length]} ${className}`}>
      <div
        className="absolute inset-0 opacity-25"
        style={{ backgroundImage: "radial-gradient(circle, rgb(255 255 255 / 0.6) 1px, transparent 1.4px)", backgroundSize: "10px 10px" }}
        aria-hidden="true"
      />
      <span className="h-display absolute inset-0 flex items-center justify-center text-8xl text-white/90">{initials(name)}</span>
    </div>
  );
}

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
  const collage = [projects[3], projects[17], projects[8], projects[19], projects[10]];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-night text-white">
        <div className="bg-halftone pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-x relative pt-16 sm:pt-20 lg:pt-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-8">
              <p className="eyebrow">[ Team ]</p>
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
            <Image src={projects[0].image} alt={projects[0].title} fill priority sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
          </Reveal>
        </div>
      </section>

      {/* Collage */}
      <section className="container-x py-16 lg:py-20">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {collage.map((p, i) => (
            <Reveal
              key={p.image}
              delay={i * 70}
              className={`relative overflow-hidden rounded-lg bg-surface ${
                i === 0 ? "col-span-2 row-span-2 aspect-[4/3] sm:aspect-auto" : "aspect-[4/3]"
              } ${i > 2 ? "hidden sm:block" : ""}`}
            >
              <Image src={p.image} alt={p.title} fill sizes="(min-width: 640px) 33vw, 50vw" className="object-cover" />
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
          <p className="eyebrow">[ Leadership ]</p>
          <h2 className="h-section mt-4">Meet the People Who Never Hand Your Project Off</h2>
        </Reveal>
        <div className="mt-12 divide-y divide-line border-y border-line">
          {leaders.map((m, i) => (
            <Reveal key={m.name} className="grid gap-8 py-10 lg:grid-cols-12 lg:items-center lg:py-12">
              <div className="lg:col-span-7">
                <h3 className="h-display text-3xl sm:text-4xl">{m.name}</h3>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  <span className="tag">{m.role}</span>
                  <span className="tag">{site.name}</span>
                </div>
                <p className="mt-5 max-w-lg text-body">{m.bio}</p>
                <dl className="mt-6 max-w-md divide-y divide-line border-y border-line">
                  {(leaderStats[i] ?? m.focus.map((f, j) => [`0${j + 1}`, f])).map(([v, l]) => (
                    <div key={l} className="flex items-baseline gap-4 py-2.5">
                      <dd className="h-display w-16 text-2xl text-accent">{v}</dd>
                      <dt className="font-mono text-[11px] tracking-wider text-muted uppercase">{l}</dt>
                    </div>
                  ))}
                </dl>
                <Link href="/contact" className="btn-primary mt-8">
                  Contact {m.name.split(" ")[0]}
                </Link>
              </div>
              <div className="lg:col-span-5">
                <div className="relative overflow-hidden rounded-xl">
                  <Portrait name={m.name} index={i} className="aspect-[4/3]" />
                  <div className="absolute inset-x-3 bottom-3 rounded-lg bg-night/80 p-4 text-white backdrop-blur">
                    <p className="font-mono text-[10px] tracking-wider text-white/50 uppercase">Ask me about</p>
                    <p className="mt-1 text-sm font-medium">{m.focus.join(" · ")}</p>
                  </div>
                </div>
              </div>
            </Reveal>
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
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={(i % 3) * 80} className="group relative overflow-hidden rounded-xl">
                <Portrait name={m.name} index={i} className="aspect-[4/5] transition-transform duration-700 group-hover:scale-[1.03]" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/90 to-transparent p-5 pt-16 text-center text-white">
                  <p className="font-semibold">{m.name}</p>
                  <p className="mt-0.5 font-mono text-[10px] tracking-wider text-white/60 uppercase">{m.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Principles: sticky statements stacking over a dimmed image */}
      <section className="relative bg-night text-white">
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={projects[8].image} alt="" fill sizes="100vw" className="object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-night via-night/70 to-night" />
        </div>
        <div className="container-x relative py-20 lg:py-28">
          <p className="eyebrow">[ How we choose ]</p>
          <div className="mt-10">
            {teamPrinciples.map((p, i) => (
              <div
                key={p}
                className="sticky mb-[30vh] max-w-3xl last:mb-0"
                style={{ top: `${110 + i * 12}px` }}
              >
                <p className="h-display rounded-xl bg-night/90 py-3 text-3xl leading-[1.15] backdrop-blur-sm sm:text-5xl">
                  <span className="text-accent">{p.split(",")[0]},</span>
                  {p.slice(p.indexOf(",") + 1)}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative border-t border-night-line">
          <div className="container-x grid grid-cols-2 sm:grid-cols-4">
            {["Ship it right", "Keep learning", "Work together", "Own the outcome"].map((v, i) => (
              <p key={v} className="flex items-center gap-2 py-5 font-mono text-[11px] tracking-wider text-white/60 uppercase">
                <span className="text-accent">0{i + 1}</span> {v}
              </p>
            ))}
          </div>
        </div>
      </section>

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
                  <span className="rounded bg-white px-2 py-1 font-mono text-[10px] tracking-wider text-muted uppercase">{j.type === "Internship" ? "Entry level" : "Mid level"}</span>
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
