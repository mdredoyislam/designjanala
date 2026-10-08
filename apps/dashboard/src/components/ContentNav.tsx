"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ContentSectionKey } from "@designjanala/shared";

type Group = { label: string; sections: { key: ContentSectionKey; label: string }[] };

/** Section list beside the editor. A dot marks sections that differ from the original content. */
export function ContentNav({ groups, edited }: { groups: Group[]; edited: ContentSectionKey[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Content sections" className="space-y-6">
      <Link href="/content" className={`block text-sm ${pathname === "/content" ? "font-semibold text-accent" : "text-body hover:text-ink"}`}>
        All sections
      </Link>
      {groups.map((g) => (
        <div key={g.label}>
          <p className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase">{g.label}</p>
          <ul className="mt-2 space-y-0.5">
            {g.sections.map((s) => {
              const href = `/content/${s.key}`;
              const active = pathname === href;
              return (
                <li key={s.key}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                      active ? "bg-accent text-accent-ink" : "text-body hover:bg-surface hover:text-ink"
                    }`}
                  >
                    {s.label}
                    {edited.includes(s.key) && (
                      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${active ? "bg-accent-ink" : "bg-accent"}`} title="Edited" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
