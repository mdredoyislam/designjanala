import Image from "next/image";
import Link from "next/link";
import Comparison from "@/components/Comparison";
import CountUp from "@/components/CountUp";
import { CtaGlow } from "@/components/Cta";
import Faq from "@/components/Faq";
import Marquee from "@/components/Marquee";
import { MockUI } from "@/components/MockUI";
import Process from "@/components/Process";
import Radar from "@/components/Radar";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ServiceCategories from "@/components/ServiceCategories";
import TechStack from "@/components/TechStack";
import Testimonials from "@/components/Testimonials";
import { Check } from "@/components/icons";
import { aiInProcess, expectations, industries, marketplaces, projects, site, stats, whyUs } from "@/data/site";

const trusted = [...marketplaces.map((m) => m.name), "Once Upon A Bazaar", "PAN USA", "California Auto Parts"];
const clientNames = ["Once Upon A Bazaar", "PAN USA", "California Auto Parts", "Upwork", "Fiverr"];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-night text-white">
        <div className="bg-halftone pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-x relative pt-16 pb-14 sm:pt-24 lg:pt-28 lg:pb-20">
          <Reveal className="flex flex-col items-center text-center">
            <p className="eyebrow">[ AI-Powered Product Studio ]</p>
            {/* Three lines from sm up; the size scales with the viewport so the longest line fits the container. */}
            <h1 className="h-display mt-5 text-[2.75rem] leading-[0.98] sm:text-[clamp(3rem,8vw,6.5rem)]">
              Building AI-Powered
              <br className="hidden sm:block" /> Products That
              <br className="hidden sm:block" /> People Love
            </h1>
            <Link href="/contact" className="btn-secondary mt-8">
              Start Your Project
            </Link>
          </Reveal>
          <Reveal delay={120} className="mt-16 grid gap-8 border-t border-night-line pt-8 sm:grid-cols-2 lg:mt-24">
            <div>
              <p className="text-white/80">We design &amp; develop AI-powered products for</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Startups", "Scale-ups", "Enterprise"].map((t) => (
                  <span key={t} className="rounded bg-white px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wider text-night uppercase">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <p className="max-w-md text-white/60 sm:justify-self-end">
              We combine twelve years of design craft with strong engineering and practical AI to develop reliable
              products that people enjoy using every day.
            </p>
          </Reveal>
        </div>

        {/* Client logos */}
        <div className="relative border-t border-night-line py-6">
          <Marquee duration={40} className="[mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
            {trusted.map((name) => (
              <span key={name} className="mx-8 flex items-center gap-2 font-display text-lg font-semibold whitespace-nowrap text-white/45 sm:mx-12">
                <span className="h-2 w-2 rotate-45 bg-accent" />
                {name}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* AI isn't an add-on */}
      <section className="container-x py-20 lg:py-28">
        <Reveal>
          <p className="h-display max-w-5xl text-2xl leading-[1.2] sm:text-3xl lg:text-[2.6rem]">
            <span className="text-accent">AI isn&rsquo;t an add-on for us.</span> It&rsquo;s built into how {site.name} designs
            and engineers software, shaping decisions, workflows, and the way products come to life.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <Reveal className="card grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
            <div>
              <h3 className="text-lg font-semibold">AI inside our process</h3>
              <p className="mt-2 text-sm text-body">From research to QA, AI tools speed up the busywork so our team can focus on judgement.</p>
              <ul className="mt-5 space-y-2.5">
                {aiInProcess.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-body">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <MockUI variant={0} className="self-end rounded-b-lg border-b" />
          </Reveal>
          <Reveal delay={100} className="card grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">Modern, Proven Technology Stack</h3>
              <p className="mt-2 text-sm text-body">
                Mature, well-supported tools from design to AI, so your product is easy to maintain and scale.
              </p>
              <Link href="/technology" className="btn-dark mt-6 self-start sm:mt-auto">
                Explore our stack
              </Link>
            </div>
            <MockUI variant={1} className="self-end rounded-b-lg border-b" />
          </Reveal>
        </div>
      </section>

      {/* Why choose us */}
      <section className="container-x pb-20 lg:pb-28">
        <SectionHeading
          title="Because Serious Products Need the Right Team"
          aside={<p>Our AI-driven process helps teams ship faster without sacrificing quality, with every decision guided by experienced designers and engineers.</p>}
        />
        <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-5">
          {whyUs.map((w, i) => (
            <Reveal key={w.title} delay={i * 100} className="text-center">
              <div className="card flex h-44 items-center justify-center overflow-hidden px-6">
                <MockUI variant={[1, 3, 0][i]} className="h-36 w-full max-w-[240px] translate-y-6" />
              </div>
              <h3 className="mt-6 text-lg font-semibold">{w.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm text-body">{w.body}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14 flex flex-col items-center text-center">
          <span className="h-display text-4xl text-accent">350+</span>
          <p className="mt-1 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">Happy clients across 12 years</p>
        </Reveal>
      </section>

      {/* Full-cycle statement */}
      <section className="relative overflow-hidden bg-night py-24 text-center text-white lg:py-32">
        <div className="pointer-events-none absolute -bottom-48 left-1/2 h-[420px] w-[1000px] -translate-x-1/2 rounded-[50%] bg-accent/40 blur-[120px]" aria-hidden="true" />
        <div className="bg-halftone-center pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <Reveal className="container-x relative">
          <Image src="/images/brand/favicon.png" alt="" width={48} height={48} className="mx-auto h-12 w-12 rounded-lg" />
          <p className="mt-3 font-mono text-[11px] tracking-[0.14em] text-white/50 uppercase">{site.tagline}</p>
          <h2 className="h-section mx-auto mt-8 max-w-5xl">
            Full-cycle product design &amp; development services for founders &amp; teams building websites and
            applications that must perform, scale smoothly, and serve real users.
          </h2>
          <Link href="/contact" className="btn-secondary mt-10">
            Let&rsquo;s plan your project
          </Link>
        </Reveal>
      </section>

      {/* Services */}
      <section className="container-x py-20 lg:py-28">
        <SectionHeading title="AI-Powered Development Services We Offer" className="mb-12" />
        <ServiceCategories />
      </section>

      {/* About */}
      <section className="container-x pb-20 lg:pb-28">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className="h-section">A Team Focused on Building What Matters</h2>
            <p className="lead mt-5 max-w-lg">
              We are a design and development team using AI to build scalable software. Founded in Dhaka, we have spent
              twelve years crafting brands, interfaces and products for clients worldwide.
            </p>
            <Link href="/contact" className="btn-primary mt-8">
              Fix your product
            </Link>
            <p className="mt-10 text-sm text-muted">We worked with them</p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {clientNames.map((c) => (
                <span key={c} className="font-display text-base font-semibold text-ink/60">
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface">
            <Image src={projects[0].image} alt={projects[0].title} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </Reveal>
        </div>
        <dl className="mt-10 grid gap-5 sm:grid-cols-3">
          {stats.slice(0, 3).map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="card px-6 py-7 text-center">
              <dd className="h-display text-4xl text-accent sm:text-5xl">
                <CountUp value={s.value} suffix={s.suffix || "+"} />
              </dd>
              <dt className="mt-2 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">{s.label}</dt>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Process */}
      <section id="process" className="scroll-mt-20 bg-surface/60 py-20 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface lg:aspect-[4/5]">
            <Image src={projects[2].image} alt={projects[2].title} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </Reveal>
          <div>
            <SectionHeading title={`The ${site.name} Development Journey`} className="mb-8" />
            <Process />
          </div>
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="relative scroll-mt-20 overflow-hidden bg-night py-20 text-white lg:py-28">
        <div className="bg-halftone-center pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="container-x relative">
          <SectionHeading title="Building Software for Diverse Industry Needs" center />
          <Reveal className="mt-4 text-center text-white/60">
            We provide custom design and development services for the industries below.
          </Reveal>
          <Reveal className="mt-10 hidden sm:block">
            <Radar />
          </Reveal>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:hidden">
            {industries.map((ind) => (
              <li key={ind.title} className="card-dark px-3 py-3 font-mono text-[11px] tracking-wider text-white/70 uppercase">
                {ind.title}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Comparison */}
      <section className="container-x py-20 lg:py-28">
        <SectionHeading eyebrow="Comparison" title="Where Others Stop, We Continue" center className="mb-12" />
        <Reveal>
          <Comparison />
        </Reveal>
      </section>

      {/* Tech stack */}
      <section className="border-t border-line py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Technology" title="Engineered with Modern Tech Stacks" center className="mb-10" />
          <Reveal>
            <TechStack />
          </Reveal>
          <div className="mt-12 text-center">
            <Link href="/technology" className="btn-dark">
              See the full stack
            </Link>
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="container-x py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">[ Our Promise ]</p>
            <h2 className="h-section mt-4">What to Expect from Us</h2>
            <p className="lead mt-5 max-w-md">
              We provide product design and development services for small startups and large enterprises to help them
              build scalable, reliable and user-friendly products.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-line sm:grid-cols-3 lg:col-span-7">
            {expectations.map((e, i) => (
              <Reveal key={e.title} delay={(i % 3) * 80} className="flex flex-col items-center bg-white px-4 py-8 text-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface text-accent">
                  <Check className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-sm font-semibold sm:text-[15px]">{e.title}</h3>
                <p className="mt-1.5 hidden text-xs leading-relaxed text-body sm:block">{e.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <Faq />

      <CtaGlow
        title="It's Time to Bring Your Idea Alive"
        body="Connect with us to start your project, with full transparency, no hidden fees, and expert support."
      />
    </>
  );
}
