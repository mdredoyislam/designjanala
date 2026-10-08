import type { CSSProperties } from "react";
import type { ToolIcon } from "@/lib/tool-icons";

/** A technology's brand mark in the current text colour; turns brand-coloured when a parent `.group` is hovered. */
export default function ToolLogo({ tool, className = "h-5 w-5" }: { tool: ToolIcon; className?: string }) {
  const style = tool.color ? ({ "--brand": tool.color } as CSSProperties) : undefined;
  if (tool.path) {
    return (
      <svg viewBox="0 0 24 24" className={`shrink-0 fill-current transition-colors duration-300 group-hover:text-[var(--brand,currentColor)] ${className}`} style={style} aria-hidden="true">
        <path d={tool.path} />
      </svg>
    );
  }
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-[5px] border border-current/30 font-mono text-[9px] leading-none font-bold tracking-tight ${className}`}
      aria-hidden="true"
    >
      {tool.monogram}
    </span>
  );
}
