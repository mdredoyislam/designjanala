import Image from "next/image";
import type { Project, SiteContent } from "@designjanala/shared";

export default function ProjectCard({
  project,
  categories,
  large = false,
  priority = false,
}: {
  project: Project;
  categories: SiteContent["categories"];
  large?: boolean;
  priority?: boolean;
}) {
  const labelFor = (slug: string) => categories.find((c) => c.slug === slug)?.label ?? slug;
  return (
    <article className="group">
      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-line bg-surface">
        <Image
          src={project.image}
          alt={`${project.title} — ${project.description}`}
          fill
          priority={priority}
          sizes={large ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {project.free && (
          <span className="absolute top-4 left-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-ink">Free</span>
        )}
      </div>
      <div className="mt-5">
        <h3 className={`font-display font-semibold tracking-tight ${large ? "text-2xl sm:text-3xl" : "text-xl"}`}>
          {project.title}
        </h3>
        <p className="mt-1.5 text-sm text-muted">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.categories.map((c) => (
            <span key={c} className="rounded-full border border-line px-3 py-1 text-xs text-ink/70">
              {labelFor(c)}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
