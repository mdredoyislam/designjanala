import Image from "next/image";
import Link from "next/link";
import { site, socials } from "@/data/site";

type Col = { title: string; links: { label: string; href: string }[] };

const topRow: Col[] = [
  {
    title: "Industries",
    links: [
      { label: "SaaS & Startups", href: "/#industries" },
      { label: "Fintech", href: "/#industries" },
      { label: "Healthcare", href: "/#industries" },
      { label: "E-commerce", href: "/#industries" },
      { label: "Real Estate", href: "/#industries" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "UI/UX Design", href: "/services/ui-ux-design" },
      { label: "Web Development", href: "/services/web-design-development" },
      { label: "Mobile App Development", href: "/services/cross-platform-development" },
      { label: "Webflow / Framer Development", href: "/services/webflow-design-development" },
      { label: "MVP Development", href: "/services/mvp-development" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Process", href: "/#process" },
      { label: "Case Studies", href: "/portfolio" },
      { label: "Careers", href: "/team#careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const bottomRow: Col[] = [
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Technologies", href: "/technology" },
      { label: "Our Team", href: "/team" },
      { label: "Open Source", href: "/open-source" },
      { label: "Freebies", href: "/freebies" },
      { label: "Discuss Your Project", href: "/contact" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "MVP for Startups", href: "/services/mvp-development" },
      { label: "Product Redesign", href: "/services/product-redesign" },
      { label: "SaaS Development", href: "/services/saas-design" },
      { label: "AI Product Development", href: "/services/agentic-ai-solutions" },
      { label: "Brand Identity", href: "/services/brand-design" },
    ],
  },
  {
    title: "Technologies",
    links: [
      { label: "React / Next.js", href: "/technology" },
      { label: "Webflow", href: "/services/webflow-design-development" },
      { label: "Framer", href: "/services/webflow-design-development" },
      { label: "AI Development", href: "/services/custom-llm-solutions" },
      { label: "Flutter", href: "/services/cross-platform-development" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-night text-white">
      <div className="container-x pt-16 pb-8 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="flex flex-col justify-between gap-10 lg:col-span-5">
            <p className="max-w-sm text-lg leading-snug text-white/80">
              Your ideas deserve more than prototypes. Partner with {site.name} and bring scalable, reliable, and
              AI-enhanced products to life today.
            </p>
            <div>
              <Image src="/images/brand/logo-white.png" alt="DesignJanala" width={300} height={47} className="h-auto w-[240px] sm:w-[300px]" />
              <p className="mt-6 font-mono text-[11px] tracking-[0.14em] text-white/50 uppercase">[ Find us on ]</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-night-line bg-night-2 text-[11px] font-semibold text-white/80 transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink"
                  >
                    {s.short}
                  </a>
                ))}
              </div>
              <a href={`mailto:${site.emails.project}`} className="mt-5 inline-flex items-center gap-2 rounded-md border border-night-line px-3 py-2 text-sm text-white/80 hover:border-white/40">
                <span className="h-2 w-2 rounded-full bg-accent" /> {site.emails.project}
              </a>
            </div>
          </div>

          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-3 lg:col-span-7">
            {[...topRow, ...bottomRow].map((c) => (
              <div key={c.title}>
                <h3 className="font-mono text-[11px] tracking-[0.14em] text-white/50 uppercase">[ {c.title} ]</h3>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-white/80 transition-colors hover:text-accent">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-night-line pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()}, {site.name}. All rights reserved.</p>
          <p>{site.location}</p>
          <div className="flex gap-5">
            <Link href="/contact" className="hover:text-white">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-white">Terms and Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
