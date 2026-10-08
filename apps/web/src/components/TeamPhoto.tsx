import Image from "next/image";
import { team, type TeamMember } from "@/data/site";

/** Cut-out team portrait standing on a dark halftone backdrop (or the yellow accent) with a soft glow. */
export function TeamPhoto({
  member,
  sizes,
  tone = "dark",
  className = "",
  imageClassName = "",
}: {
  member: TeamMember;
  sizes: string;
  tone?: "dark" | "accent";
  className?: string;
  imageClassName?: string;
}) {
  const accent = tone === "accent";
  return (
    <div className={`relative overflow-hidden ${accent ? "bg-gradient-to-br from-accent via-[#ffdf40] to-[#fff1a8]" : "bg-night-2"} ${className}`}>
      {!accent && <div className="bg-halftone-center pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />}
      <div
        className={`pointer-events-none absolute -bottom-1/4 left-1/2 h-3/4 w-full -translate-x-1/2 rounded-full blur-3xl ${accent ? "bg-white/50" : "bg-accent/25"}`}
        aria-hidden="true"
      />
      {/* Inset from the top so heads never touch the frame. */}
      <div className="absolute inset-x-0 top-[7%] bottom-0">
        <Image
          src={member.photo}
          alt={`${member.name}, ${member.role}`}
          fill
          sizes={sizes}
          className={`object-contain object-bottom grayscale ${imageClassName}`}
        />
      </div>
    </div>
  );
}

/** Round head-and-shoulders avatar on the accent colour. */
export function TeamAvatar({ member, className = "h-10 w-10" }: { member: TeamMember; className?: string }) {
  return (
    <span className={`relative block shrink-0 overflow-hidden rounded-full bg-accent ${className}`}>
      {/* A box taller than the circle, anchored near the top, frames head and shoulders. */}
      <span className="absolute inset-x-0 top-[8%] -bottom-[110%]">
        <Image src={member.photo} alt={member.name} fill sizes="128px" className="object-cover object-top grayscale" />
      </span>
    </span>
  );
}

/** Both founders side by side with name tags: used where a section talks about "the team". */
export function Founders({ sizes, className = "" }: { sizes: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-night-2 ${className}`}>
      <div className="bg-halftone-center pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-1/3 left-1/2 h-3/4 w-[110%] -translate-x-1/2 rounded-full bg-accent/30 blur-3xl" aria-hidden="true" />
      <div className="absolute inset-x-[4%] bottom-0 flex h-[92%] items-end justify-center">
        {team.map((m) => (
          <div key={m.name} className="relative -mx-[2%] h-full flex-1">
            <Image src={m.photo} alt={`${m.name}, ${m.role}`} fill sizes={sizes} className="object-contain object-bottom grayscale" />
          </div>
        ))}
      </div>
      <div className="absolute inset-x-4 bottom-4 flex justify-between gap-3 sm:inset-x-6 sm:bottom-6">
        {team.map((m) => (
          <span key={m.name} className="rounded-md bg-night/80 px-3 py-2 backdrop-blur-sm">
            <span className="block text-sm font-semibold text-white">{m.name}</span>
            <span className="block font-mono text-[10px] tracking-wider text-accent uppercase">{m.role}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
