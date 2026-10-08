"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Overview" },
  { href: "/leads", label: "Leads" },
];

export function Nav() {
  const pathname = usePathname();
  return (
    <nav className="flex gap-1" aria-label="Dashboard">
      {links.map((l) => {
        const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-md px-3 py-2 font-mono text-xs font-medium tracking-[0.06em] uppercase transition-colors ${
              active ? "bg-accent text-accent-ink" : "text-white/70 hover:text-white"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
