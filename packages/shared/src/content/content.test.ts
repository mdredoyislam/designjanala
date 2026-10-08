import { describe, expect, it } from "vitest";
import { contentGroups, contentSchema, contentSectionKeys, defaultContent, mergeContent } from ".";

describe("content", () => {
  it("defaults match the schema", () => {
    expect(contentSchema.safeParse(defaultContent).success).toBe(true);
  });

  it("every section appears exactly once in the dashboard groups", () => {
    const grouped = contentGroups.flatMap((g) => g.sections.map((s) => s.key)).sort();
    expect(grouped).toEqual([...contentSectionKeys].sort());
  });

  it("merges valid overrides and ignores invalid ones", () => {
    const merged = mergeContent({
      teamPrinciples: { value: ["Only this"], updatedAt: "2026-01-01T00:00:00Z" },
      stats: { value: [{ value: "not a number" }] as never, updatedAt: "2026-01-01T00:00:00Z" },
    });
    expect(merged.teamPrinciples).toEqual(["Only this"]);
    expect(merged.stats).toEqual(defaultContent.stats);
    expect(merged.services).toBe(defaultContent.services);
  });

  it("rejects duplicate slugs", () => {
    const [first] = defaultContent.services;
    const result = contentSchema.shape.services.safeParse([first, first]);
    expect(result.success).toBe(false);
  });
});
