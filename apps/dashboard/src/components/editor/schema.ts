/** The subset of JSON Schema (from zod's toJSONSchema) the editor understands, plus our `.meta()` hints. */
export type Schema = {
  type?: "object" | "array" | "string" | "number" | "integer" | "boolean";
  title?: string;
  description?: string;
  /** "textarea" | "image" | "date" | "paragraphs" */
  widget?: string;
  /** For lists of objects: the field used as each item's heading. */
  itemLabel?: string;
  properties?: Record<string, Schema>;
  items?: Schema;
  enum?: string[];
  default?: unknown;
  optionsFrom?: { section: string; value?: string; label?: string };
};

export type Option = { value: string; label: string };

/** A blank value of the right shape, for "Add item". */
export function emptyValue(schema: Schema): unknown {
  if (schema.default !== undefined) return structuredClone(schema.default);
  if (schema.enum?.length) return schema.enum[0];
  switch (schema.type) {
    case "object":
      return Object.fromEntries(Object.entries(schema.properties ?? {}).map(([k, s]) => [k, emptyValue(s)]));
    case "array":
      return [];
    case "number":
    case "integer":
      return 0;
    case "boolean":
      return false;
    default:
      return "";
  }
}

/** Options for a select that is filled from another section (e.g. a service's category). */
export function optionsFrom(source: Schema["optionsFrom"], content: Record<string, unknown>): Option[] {
  if (!source) return [];
  const list = content[source.section];
  if (!Array.isArray(list)) return [];
  return list.map((item) => {
    if (typeof item === "string") return { value: item, label: item };
    const record = item as Record<string, unknown>;
    const value = String(record[source.value ?? "slug"] ?? "");
    return { value, label: String(record[source.label ?? source.value ?? "slug"] ?? value) };
  });
}

/** Turn "camelCase" keys into labels when a schema has no title. */
export const humanize = (key: string) => key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (c) => c.toUpperCase());

export const pathKey = (path: (string | number)[]) => path.join(".");
