import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { z } from "zod";
import { contentGroups, contentSectionSchemas, isContentSectionKey } from "@designjanala/shared";
import { SectionEditor } from "@/components/editor/SectionEditor";
import type { Schema } from "@/components/editor/schema";
import { getContent, getContentSections } from "@/lib/api";

const info = (key: string) => contentGroups.flatMap((g) => g.sections.map((s) => ({ ...s, group: g.label }))).find((s) => s.key === key);

export async function generateMetadata({ params }: PageProps<"/content/[section]">): Promise<Metadata> {
  const { section } = await params;
  return { title: info(section)?.label ?? "Content" };
}

export default async function SectionPage({ params }: PageProps<"/content/[section]">) {
  const { section } = await params;
  const meta = info(section);
  if (!isContentSectionKey(section) || !meta) notFound();

  const [content, sections] = await Promise.all([getContent(), getContentSections()]);
  const status = sections.find((s) => s.key === section);
  // The editor is generated from the same schema the API validates against.
  const schema = z.toJSONSchema(contentSectionSchemas[section], { io: "output", unrepresentable: "any" }) as Schema;

  return (
    <div>
      <nav className="font-mono text-[11px] tracking-[0.1em] text-muted uppercase" aria-label="Breadcrumb">
        <Link href="/content" className="hover:text-ink">
          Content
        </Link>{" "}
        / {meta.group}
      </nav>
      <h1 className="h-display mt-3 text-3xl sm:text-4xl">{meta.label}</h1>
      <p className="mt-2 mb-8 max-w-2xl text-body">{meta.description}</p>
      <SectionEditor
        key={section}
        sectionKey={section}
        schema={schema}
        initialValue={content[section]}
        customized={status?.customized ?? false}
        updatedAt={status?.updatedAt}
        content={content as unknown as Record<string, unknown>}
        webUrl={process.env.WEB_URL ?? "http://localhost:3000"}
      />
    </div>
  );
}
