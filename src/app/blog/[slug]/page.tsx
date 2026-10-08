import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaGlow } from "@/components/Cta";
import PostCover from "@/components/PostCover";
import Reveal from "@/components/Reveal";
import { posts, team } from "@/data/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = posts.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.excerpt, openGraph: { type: "article", publishedTime: p.date } } : {};
}

const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });

export default async function PostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const post = posts[index];
  const author = team[0];
  const related = posts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);
  const more = related.length ? related : posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-night text-white">
        <div className="bg-halftone pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="container-x relative py-14 lg:py-20">
          <Link href="/blog" className="font-mono text-[11px] tracking-wider text-white/60 uppercase hover:text-accent">
            ← Back to blog
          </Link>
          <Reveal className="mt-8 max-w-4xl">
            <span className="rounded bg-accent/15 px-2 py-1 font-mono text-[11px] tracking-wider text-accent uppercase">{post.category}</span>
            <h1 className="h-display mt-5 text-3xl sm:text-5xl">{post.title}</h1>
            <p className="mt-6 text-sm text-white/60">
              By {author.name} · <time dateTime={post.date}>{fmt(post.date)}</time>
            </p>
          </Reveal>
        </div>
      </section>

      <article className="container-x py-14 lg:py-20">
        <Reveal className="mx-auto max-w-4xl">
          <PostCover post={post} index={index} large />
        </Reveal>
        <div className="mx-auto mt-12 max-w-2xl">
          <p className="text-xl leading-relaxed font-medium text-ink">{post.excerpt}</p>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-body">
            {post.body.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
        </div>
      </article>

      <section className="bg-surface/60 py-16 lg:py-24">
        <div className="container-x">
          <p className="eyebrow">[ Keep reading ]</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {more.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group overflow-hidden rounded-xl bg-card">
                <PostCover post={p} index={posts.indexOf(p)} />
                <div className="p-5">
                  <p className="font-mono text-[10px] tracking-wider text-accent uppercase">{p.category}</p>
                  <h2 className="mt-2 font-medium leading-snug group-hover:text-accent">{p.title}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaGlow title="Want Help Applying This?" body="Book a strategy call and we'll look at how these ideas apply to your product." />
    </>
  );
}
