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

        {menu && (
          <div
            id="services-menu"
            className="animate-fade-in absolute inset-x-0 top-full hidden border-b border-night-line bg-night lg:block"
          >
            <div className="container-x grid grid-cols-4 gap-8 py-10">
              {serviceCategories.map((c) => (
                <div key={c.slug}>
                  <p className="eyebrow">[ {c.title} ]</p>
                  <ul className="mt-4 space-y-1">
                    {servicesIn(c.slug).map((s) => (
                      <li key={s.slug}>
                        <Link href={`/services/${s.slug}`} className="group -mx-3 block rounded-lg px-3 py-2.5 transition-colors hover:bg-night-2">
                          <span className="flex items-center justify-between text-[15px] font-medium text-white">
                            {s.title}
                            <ArrowUpRight className="h-4 w-4 text-accent-fg opacity-0 transition-opacity group-hover:opacity-100" />
                          </span>
                          <span className="mt-0.5 block text-sm text-white/45">{s.tagline}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t border-night-line">
              <div className="container-x flex items-center justify-between py-4 text-sm">
                <span className="text-white/50">Not sure what you need? We&rsquo;ll help you scope it.</span>
                <Link href="/services" className="font-mono text-xs font-semibold tracking-[0.06em] text-accent-fg uppercase">
                  [ View all services ]
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

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
