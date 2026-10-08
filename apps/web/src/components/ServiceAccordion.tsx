"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MockUI } from "@/components/MockUI";

type ServiceGroupProps = {
  slug: string;
  title: string;
  blurb: string;
  list: { slug: string; title: string }[];
};

export default function ServiceAccordion({ groups }: { groups: ServiceGroupProps[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="mt-12 divide-y divide-line border-y border-line">
      {groups.map((g, i) => {
        const isActive = active === i;
        
        return (
          <div 
            key={g.slug}
            className="group relative"
            onMouseEnter={() => setActive(i)}
          >
            {/* The Row Header (Always visible) */}
            <div className={`flex cursor-pointer items-center justify-between py-8 transition-colors lg:py-10 ${isActive ? "text-accent" : "hover:text-accent"}`}>
              <div className="flex items-center gap-6 sm:gap-12">
                <span className={`font-mono text-[11px] font-semibold ${isActive ? "text-accent" : "text-muted"}`}>0{i + 1}</span>
                <h3 className="h-display text-2xl sm:text-4xl lg:text-5xl">{g.title}</h3>
              </div>
              <motion.div 
                animate={{ rotate: isActive ? 45 : 0 }} 
                transition={{ duration: 0.3 }}
                className={`hidden h-12 w-12 items-center justify-center rounded-full border text-lg sm:flex ${isActive ? "border-accent text-accent" : "border-line"}`}
              >
                +
              </motion.div>
            </div>
            
            {/* Expanded Content */}
            <AnimatePresence initial={false}>
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-8 pb-10 lg:grid-cols-2 lg:items-start lg:gap-16 lg:pb-14">
                    {/* Left details */}
                    <div>
                      <p className="max-w-md text-body leading-relaxed">{g.blurb}</p>
                      <ul className="mt-8 flex flex-wrap gap-2">
                        {g.list.map((s) => (
                          <li key={s.slug}>
                            <Link href={`/services/${s.slug}`} className="tag transition-colors hover:border-accent hover:text-accent">
                              {s.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link href={`/services/${g.list[0]?.slug}`} className="btn-primary mt-10">
                        Explore service
                      </Link>
                    </div>

                    {/* Right Image/MockUI */}
                    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#2a2300] via-[#141414] to-[#0a0a0a] p-6 sm:p-10">
                      <div className="mx-auto max-w-sm rotate-[-4deg] rounded-2xl border-[6px] border-night bg-night shadow-2xl shadow-accent/20">
                        <MockUI variant={i % 4} className="h-52 rounded-lg border-0" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
