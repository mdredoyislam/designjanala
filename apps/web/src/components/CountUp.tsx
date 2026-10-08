"use client";

import { useEffect, useRef, useState } from "react";

/** Animates a number from 0 to `value` the first time it scrolls into view. */
export default function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  // Server-render the final value so the real number is in the HTML; animate from 0 on first view.
  const [n, setN] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const duration = 1600;
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref} aria-label={`${value}${suffix}`}>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}
