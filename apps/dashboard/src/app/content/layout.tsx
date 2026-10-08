import { connection } from "next/server";
import { contentGroups } from "@designjanala/shared";
import { ContentNav } from "@/components/ContentNav";
import { getContentSections } from "@/lib/api";

export default async function ContentLayout({ children }: LayoutProps<"/content">) {
  await connection();
  const sections = await getContentSections();
  const edited = sections.filter((s) => s.customized).map((s) => s.key);
  const groups = contentGroups.map((g) => ({ label: g.label, sections: g.sections.map(({ key, label }) => ({ key, label })) }));
  return (
    <div className="grid gap-8 lg:grid-cols-[14rem_1fr] lg:gap-10">
      <aside className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto lg:pr-2">
        <details className="panel p-4 lg:hidden">
          <summary className="cursor-pointer text-sm font-medium">Sections</summary>
          <div className="mt-4">
            <ContentNav groups={groups} edited={edited} />
          </div>
        </details>
        <div className="hidden lg:block">
          <ContentNav groups={groups} edited={edited} />
        </div>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
