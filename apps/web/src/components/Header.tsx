"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { SiteContent } from "@designjanala/shared";
import { ArrowDown, ArrowUpRight } from "./icons";

/** Dark header that sits over every page's dark hero. "Service" opens a mega menu. */
export default function Header({ content }: { content: Pick<SiteContent, "nav" | "serviceCategories" | "services"> }) {
  const { nav, serviceCategories } = content;
  const servicesIn = (category: string) => content.services.filter((s) => s.category === category);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [activeCat, setActiveCat] = useState<string>();
  const category = serviceCategories.find((c) => c.slug === activeCat) ?? serviceCategories[0];
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation.
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
    setMenu(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    if (!menu) return;
    const onDown = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenu(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const linkClass = (active: boolean) =>
    `rounded px-3 py-2 font-mono text-xs font-medium uppercase tracking-[0.06em] transition-colors ${
      active ? "text-accent-fg" : "text-white/75 hover:text-white"
    }`;

  return (
    <>
      <header
        ref={menuRef}
        className={`theme-dark sticky top-0 z-50 border-b text-white transition-colors duration-300 ${
          scrolled || open || menu ? "border-night-line bg-night/90 backdrop-blur-xl" : "border-transparent bg-night"
        }`}
      >
        <div className="container-x relative flex h-[68px] items-center justify-between gap-6">
          <Link href="/" aria-label="DesignJanala home" className="shrink-0">
            <Image src="/images/brand/logo-white.png" alt="DesignJanala" width={160} height={25} priority />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {nav.map((item) =>
              item.href === "/services" ? (
                <button
                  key={item.href}
                  type="button"
                  aria-expanded={menu}
                  aria-controls="services-menu"
                  onClick={() => setMenu((v) => !v)}
                  className={`flex items-center gap-1 ${linkClass(isActive(item.href) || menu)}`}
                >
                  {item.label}
                  <ArrowDown className={`h-3 w-3 transition-transform ${menu ? "rotate-180" : ""}`} />
                </button>
              ) : (
                <Link key={item.href} href={item.href} className={linkClass(isActive(item.href))}>
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/contact" className="btn-primary hidden sm:inline-flex">
              Fix Your Product
            </Link>
            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-md border border-night-line lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className={`absolute h-[1.5px] w-5 bg-white transition-transform ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
              <span className={`absolute h-[1.5px] w-5 bg-white transition-transform ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
            </button>
          </div>
        </div>
        <span className="scroll-progress pointer-events-none absolute inset-x-0 -bottom-px h-0.5 bg-accent" aria-hidden="true" />

        {menu && (
          // Floating panel the width of the page container, so it lines up with the logo and the CTA.
          <div id="services-menu" className="animate-fade-in container-x absolute inset-x-0 top-full hidden pt-3 lg:block">
            <div className="relative overflow-hidden rounded-2xl border border-night-line bg-night shadow-[0_40px_80px_-20px_rgb(0_0_0/0.8)]">
              <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" aria-hidden="true" />
              <div className="bg-halftone pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
              <div className="relative grid grid-cols-12 gap-8 p-6 xl:p-8">
                {/* Service groups: hovering or focusing one switches the panel. */}
                <ul className="col-span-3 space-y-1 border-r border-night-line pr-6" role="list">
                  {serviceCategories.map((c, i) => {
                    const on = c.slug === category?.slug;
                    return (
                      <li key={c.slug}>
                        <Link
                          href={`/services#${c.slug}`}
                          onMouseEnter={() => setActiveCat(c.slug)}
                          onFocus={() => setActiveCat(c.slug)}
                          className={`group relative flex items-center gap-4 rounded-lg px-4 py-3.5 transition-colors ${on ? "bg-night-2" : "hover:bg-night-2/60"}`}
                        >
                          <span className={`absolute inset-y-3 left-0 w-0.5 rounded-full transition-colors ${on ? "bg-accent" : "bg-transparent"}`} />
                          <span className={`font-mono text-[11px] ${on ? "text-accent-fg" : "text-white/35"}`}>0{i + 1}</span>
                          <span className="min-w-0 flex-1">
                            <span className={`block text-[15px] font-medium ${on ? "text-white" : "text-white/70"}`}>{c.title}</span>
                            <span className="block font-mono text-[10px] tracking-wider text-white/35 uppercase">{servicesIn(c.slug).length} services</span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {/* Services in the active group */}
                {category && (
                  <div className="col-span-5">
                    <p className="eyebrow">[ {category.title} ]</p>
                    <ul className="mt-4 grid grid-cols-2 gap-2" role="list">
                      {servicesIn(category.slug).map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${s.slug}`}
                            className="group flex h-full flex-col rounded-lg border border-night-line p-4 transition-colors hover:border-accent/60 hover:bg-night-2"
                          >
                            <span className="flex items-start justify-between gap-3 text-[15px] leading-snug font-medium text-white">
                              {s.title}
                              <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-white/30 transition-colors group-hover:text-accent-fg" />
                            </span>
                            <span className="mt-1.5 text-sm text-white/50">{s.tagline}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Feature card for the active group */}
                {category && (
                  <Link
                    href={servicesIn(category.slug)[0] ? `/services/${servicesIn(category.slug)[0].slug}` : "/services"}
                    className="group col-span-4 flex flex-col overflow-hidden rounded-xl border border-night-line bg-night-2"
                  >
                    <span className="relative block aspect-[16/10] overflow-hidden">
                      <Image
                        key={category.image}
                        src={category.image}
                        alt=""
                        fill
                        sizes="400px"
                        className="animate-fade-in object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </span>
                    <span className="flex flex-1 flex-col p-5">
                      <span className="text-sm leading-relaxed text-white/65">{category.blurb}</span>
                      <span className="mt-4 inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.06em] text-accent-fg uppercase">
                        Explore {category.title} <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:rotate-45" />
                      </span>
                    </span>
                  </Link>
                )}
              </div>
              <div className="relative border-t border-night-line bg-night-2/60">
                <div className="flex items-center justify-between px-6 py-4 text-sm xl:px-8">
                  <span className="text-white/50">
                    Not sure what you need?{" "}
                    <Link href="/contact" className="text-white underline decoration-accent/50 underline-offset-4 hover:decoration-accent">
                      Tell us about your product
                    </Link>{" "}
                    and we&rsquo;ll help you scope it.
                  </span>
                  <Link href="/services" className="font-mono text-xs font-semibold tracking-[0.06em] text-accent-fg uppercase">
                    [ View all services ]
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Dims the page under the services menu; clicking it closes the menu. */}
      {menu && <div className="animate-fade-in fixed inset-0 top-[68px] z-40 hidden bg-black/60 lg:block" onClick={() => setMenu(false)} aria-hidden="true" />}

      {/* Rendered outside <header>: its backdrop-filter would otherwise become the containing block for this fixed panel. */}
      {open && (
        <div className="fixed inset-x-0 top-[68px] bottom-0 z-40 overflow-y-auto bg-night text-white lg:hidden">
          <nav className="container-x flex flex-col pt-4 pb-10" aria-label="Mobile">
            <details className="group border-b border-night-line [&_summary::-webkit-details-marker]:hidden">
              <summary className="h-display flex cursor-pointer list-none items-center justify-between py-5 text-2xl">
                Services
                <ArrowDown className="h-5 w-5 transition-transform group-open:rotate-180" />
              </summary>
              <div className="grid gap-6 pb-6">
                {serviceCategories.map((c) => (
                  <div key={c.slug}>
                    <p className="eyebrow">[ {c.title} ]</p>
                    <div className="mt-2 grid">
                      {servicesIn(c.slug).map((s) => (
                        <Link key={s.slug} href={`/services/${s.slug}`} className="py-1.5 text-white/70">
                          {s.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </details>
            {[...nav.filter((n) => n.href !== "/services"), { label: "About", href: "/about" }, { label: "Contact", href: "/contact" }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="h-display flex items-center justify-between border-b border-night-line py-5 text-2xl"
              >
                {item.label}
                <ArrowUpRight className="h-5 w-5" />
              </Link>
            ))}
            <Link href="/contact" className="btn-primary mt-8 self-start">
              Fix Your Product
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
