import type { Post } from "@designjanala/shared";

/** Generated orange cover for a blog post: title on the left, a retro "screen" on the right. */
export default function PostCover({ post, index = 0, large = false }: { post: Post; index?: number; large?: boolean }) {
  const light = index % 3 === 1;
  return (
    <div
      className={`relative flex aspect-[16/9] overflow-hidden ${light ? "bg-white" : "bg-accent"} ${large ? "rounded-xl" : ""}`}
      aria-hidden="true"
    >
      <div className="relative z-10 flex w-1/2 items-center p-4 sm:p-5">
        <p className={`h-display leading-tight ${large ? "text-2xl sm:text-4xl" : "text-sm sm:text-base"} ${light ? "text-night" : "text-accent-ink"}`}>
          {post.title.split(":")[0]}
        </p>
      </div>
      <div className="bg-night relative w-1/2">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: "radial-gradient(circle, rgb(10 10 10 / 0.35) 1.2px, transparent 1.7px)",
            backgroundSize: "8px 8px",
          }}
        />
        <div className="absolute inset-x-[18%] top-[22%] bottom-[18%] rounded-md border-4 border-[#3a3a3a] bg-[#1d1d1d] p-2 shadow-xl">
          <div className="h-full rounded-sm bg-gradient-to-br from-accent/80 to-[#5c4a00] p-1.5">
            <p className="font-mono text-[8px] leading-tight text-white/90 uppercase sm:text-[9px]">{post.category}</p>
            <div className="mt-1.5 space-y-1">
              <div className="h-1 w-3/4 rounded bg-white/60" />
              <div className="h-1 w-1/2 rounded bg-white/40" />
            </div>
          </div>
        </div>
        <div className="absolute right-[12%] bottom-[8%] left-[12%] h-[8%] rounded-sm bg-[#3a3a3a]" />
      </div>
    </div>
  );
}
