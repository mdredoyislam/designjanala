"use client";

import { createContext, useContext, useId, useRef, useState, type ReactNode } from "react";
import { uploadImageAction } from "@/app/content/actions";
import { emptyValue, humanize, optionsFrom, pathKey, type Option, type Schema } from "./schema";

type Ctx = {
  /** Saved content of every section, for selects that reference other sections. */
  content: Record<string, unknown>;
  /** Validation messages keyed by dotted path ("3.title"). */
  errors: Record<string, string>;
  /** Base URL of the public website, for previewing images stored there. */
  webUrl: string;
};
export const EditorContext = createContext<Ctx>({ content: {}, errors: {}, webUrl: "" });

type FieldProps = {
  schema: Schema;
  value: unknown;
  onChange: (value: unknown) => void;
  path: (string | number)[];
  label?: string;
};

/** Renders the right control for a schema node, recursively. */
export function Field(props: FieldProps) {
  const { schema } = props;
  if (schema.type === "object") return <ObjectField {...props} />;
  if (schema.type === "array") {
    if (schema.optionsFrom) return <MultiSelectField {...props} />;
    if (schema.items?.type === "object") return <ObjectListField {...props} />;
    return <StringListField {...props} />;
  }
  if (schema.type === "boolean") return <BooleanField {...props} />;
  if (schema.type === "number" || schema.type === "integer") return <NumberField {...props} />;
  if (schema.widget === "image") return <ImageField {...props} />;
  if (schema.enum || schema.optionsFrom) return <SelectField {...props} />;
  return <TextField {...props} />;
}

function useError(path: (string | number)[]) {
  return useContext(EditorContext).errors[pathKey(path)];
}

/** True when any field at or below `path` has an error, so collapsed items can open themselves. */
function useHasErrorUnder(path: (string | number)[]) {
  const { errors } = useContext(EditorContext);
  const prefix = pathKey(path);
  return Object.keys(errors).some((k) => k === prefix || k.startsWith(`${prefix}.`));
}

function Label({ htmlFor, schema, label, children }: { htmlFor?: string; schema: Schema; label?: string; children?: ReactNode }) {
  return (
    <div className="mb-1.5 flex items-baseline justify-between gap-3">
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
        {schema.title ?? label}
      </label>
      {children}
    </div>
  );
}

function Help({ schema, error }: { schema: Schema; error?: string }) {
  if (error)
    return (
      <p role="alert" className="mt-1.5 text-xs text-[#ff8a8a]">
        {error}
      </p>
    );
  return schema.description ? <p className="mt-1.5 text-xs text-muted">{schema.description}</p> : null;
}

const invalid = (error?: string) => (error ? "border-[#ff6b6b]" : "");

function TextField({ schema, value, onChange, path, label }: FieldProps) {
  const id = useId();
  const error = useError(path);
  const text = typeof value === "string" ? value : "";
  const long = schema.widget === "textarea";
  return (
    <div>
      <Label htmlFor={id} schema={schema} label={label} />
      {long ? (
        <textarea id={id} value={text} onChange={(e) => onChange(e.target.value)} rows={3} className={`field min-h-[5.5rem] [field-sizing:content] ${invalid(error)}`} />
      ) : (
        <input id={id} type={schema.widget === "date" ? "date" : "text"} value={text} onChange={(e) => onChange(e.target.value)} className={`field ${invalid(error)}`} />
      )}
      <Help schema={schema} error={error} />
    </div>
  );
}

function NumberField({ schema, value, onChange, path, label }: FieldProps) {
  const id = useId();
  const error = useError(path);
  return (
    <div>
      <Label htmlFor={id} schema={schema} label={label} />
      <input
        id={id}
        type="number"
        step={schema.type === "integer" ? 1 : "any"}
        value={typeof value === "number" && Number.isFinite(value) ? value : ""}
        onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
        className={`field max-w-48 ${invalid(error)}`}
      />
      <Help schema={schema} error={error} />
    </div>
  );
}

function BooleanField({ schema, value, onChange, path, label }: FieldProps) {
  const error = useError(path);
  return (
    <div>
      <label className="inline-flex cursor-pointer items-center gap-2.5 text-sm font-medium">
        <input type="checkbox" checked={value === true} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />
        {schema.title ?? label}
      </label>
      <Help schema={schema} error={error} />
    </div>
  );
}

function SelectField({ schema, value, onChange, path, label }: FieldProps) {
  const id = useId();
  const error = useError(path);
  const { content } = useContext(EditorContext);
  const options: Option[] = schema.enum ? schema.enum.map((v) => ({ value: v, label: v })) : optionsFrom(schema.optionsFrom, content);
  const current = typeof value === "string" ? value : "";
  // Keep a value that no longer exists in the source list visible, so it isn't silently changed.
  const missing = current && !options.some((o) => o.value === current);
  return (
    <div>
      <Label htmlFor={id} schema={schema} label={label} />
      <select id={id} value={current} onChange={(e) => onChange(e.target.value)} className={`field ${invalid(error)}`}>
        {!schema.enum && <option value="">—</option>}
        {missing && <option value={current}>{current} (not found)</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <Help schema={schema} error={error} />
    </div>
  );
}

function MultiSelectField({ schema, value, onChange, path, label }: FieldProps) {
  const error = useError(path);
  const { content } = useContext(EditorContext);
  const selected = Array.isArray(value) ? (value as string[]) : [];
  const options = optionsFrom(schema.optionsFrom, content);
  const toggle = (v: string) => onChange(selected.includes(v) ? selected.filter((s) => s !== v) : [...selected, v]);
  return (
    <fieldset>
      <legend className="mb-1.5 text-sm font-medium">{schema.title ?? label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = selected.includes(o.value);
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(o.value)}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${on ? "border-accent bg-accent text-accent-ink" : "border-line text-body hover:border-white/40"}`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
      <Help schema={schema} error={error} />
    </fieldset>
  );
}

function ObjectField({ schema, value, onChange, path, label, bare = false }: FieldProps & { bare?: boolean }) {
  const record = (value && typeof value === "object" ? value : {}) as Record<string, unknown>;
  const fields = Object.entries(schema.properties ?? {});
  const body = (
    <div className="grid gap-5">
      {fields.map(([key, child]) => (
        <Field key={key} schema={child} label={humanize(key)} value={record[key]} path={[...path, key]} onChange={(v) => onChange({ ...record, [key]: v })} />
      ))}
    </div>
  );
  // The section's own top-level object and list items have no frame; nested objects (e.g. "Emails") get one.
  if (bare || path.length === 0) return body;
  return (
    <fieldset className="rounded-lg border border-line p-4">
      <legend className="px-1.5 text-sm font-medium">{schema.title ?? label}</legend>
      {schema.description && <p className="mb-4 text-xs text-muted">{schema.description}</p>}
      {body}
    </fieldset>
  );
}

/** Which list items are expanded, by index; remapped when items move, so the right ones stay open. */
const remap = (open: Set<number>, to: (i: number) => number | null) =>
  new Set([...open].map(to).filter((i): i is number => i !== null));

function move<T>(list: T[], from: number, to: number) {
  const copy = [...list];
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}

function RowButtons({ index, count, onMove, onDuplicate, onRemove, label }: { index: number; count: number; onMove: (to: number) => void; onDuplicate?: () => void; onRemove: () => void; label: string }) {
  const btn = "flex h-7 w-7 items-center justify-center rounded text-muted hover:bg-mist hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent";
  return (
    <div className="flex shrink-0 items-center gap-0.5">
      <button type="button" className={btn} disabled={index === 0} onClick={() => onMove(index - 1)} aria-label={`Move ${label} up`} title="Move up">
        ↑
      </button>
      <button type="button" className={btn} disabled={index === count - 1} onClick={() => onMove(index + 1)} aria-label={`Move ${label} down`} title="Move down">
        ↓
      </button>
      {onDuplicate && (
        <button type="button" className={btn} onClick={onDuplicate} aria-label={`Duplicate ${label}`} title="Duplicate">
          ⧉
        </button>
      )}
      <button type="button" className={`${btn} hover:text-[#ff8a8a]`} onClick={onRemove} aria-label={`Remove ${label}`} title="Remove">
        ✕
      </button>
    </div>
  );
}

function ObjectListField({ schema, value, onChange, path, label }: FieldProps) {
  const items = Array.isArray(value) ? value : [];
  const itemSchema = schema.items ?? {};
  const [open, setOpen] = useState<Set<number>>(new Set());
  const [query, setQuery] = useState("");
  const labelKey = schema.itemLabel;
  const error = useError(path);
  const heading = (item: unknown, i: number) => {
    const text = labelKey ? (item as Record<string, unknown>)?.[labelKey] : undefined;
    return typeof text === "string" && text.trim() ? text : `Item ${i + 1}`;
  };
  const toggle = (i: number) => setOpen((s) => new Set(s.has(i) ? [...s].filter((k) => k !== i) : [...s, i]));

  const add = () => {
    setOpen((s) => new Set([...s, items.length]));
    onChange([...items, emptyValue(itemSchema)]);
  };
  const q = query.trim().toLowerCase();
  const visible = items.map((item, i) => ({ item, i })).filter(({ item }) => !q || JSON.stringify(item).toLowerCase().includes(q));

  return (
    <div>
      {path.length > 0 && <Label schema={schema} label={label} />}
      {items.length > 8 && (
        <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`Search ${items.length} items…`} className="field mb-3 max-w-sm" />
      )}
      <ol className="space-y-2">
        {visible.map(({ item, i }) => (
          <ObjectListItem
            key={i}
            index={i}
            count={items.length}
            heading={heading(item, i)}
            open={open.has(i)}
            onToggle={() => toggle(i)}
            schema={itemSchema}
            value={item}
            path={[...path, i]}
            onChange={(v) => onChange(items.map((it, j) => (j === i ? v : it)))}
            onMove={(to) => {
              setOpen((s) => remap(s, (j) => (j === i ? to : j === to ? i : j)));
              onChange(move(items, i, to));
            }}
            onDuplicate={() => {
              setOpen((s) => new Set([...remap(s, (j) => (j > i ? j + 1 : j)), i + 1]));
              onChange([...items.slice(0, i + 1), structuredClone(item), ...items.slice(i + 1)]);
            }}
            onRemove={() => {
              if (!confirm(`Remove "${heading(item, i)}"? You can still discard your changes before saving.`)) return;
              setOpen((s) => remap(s, (j) => (j === i ? null : j > i ? j - 1 : j)));
              onChange(items.filter((_, j) => j !== i));
            }}
          />
        ))}
      </ol>
      {q && visible.length === 0 && <p className="py-4 text-sm text-muted">Nothing matches “{query}”.</p>}
      <button type="button" onClick={add} className="btn-ghost mt-3">
        + Add {itemSchema.title?.toLowerCase() ?? "item"}
      </button>
      <Help schema={path.length > 0 ? schema : {}} error={error} />
    </div>
  );
}

function ObjectListItem({
  index,
  count,
  heading,
  open,
  onToggle,
  onMove,
  onDuplicate,
  onRemove,
  ...field
}: FieldProps & {
  index: number;
  count: number;
  heading: string;
  open: boolean;
  onToggle: () => void;
  onMove: (to: number) => void;
  onDuplicate: () => void;
  onRemove: () => void;
}) {
  const hasError = useHasErrorUnder(field.path);
  const expanded = open || hasError;
  return (
    <li className={`rounded-lg border bg-card ${hasError ? "border-[#ff6b6b]/60" : "border-line"}`}>
      <div className="flex items-center gap-2 py-1.5 pr-2 pl-3">
        <button type="button" onClick={onToggle} aria-expanded={expanded} className="flex min-w-0 flex-1 items-center gap-3 py-1 text-left">
          <span className="w-6 shrink-0 font-mono text-[11px] text-muted">{String(index + 1).padStart(2, "0")}</span>
          <span className="truncate text-sm font-medium">{heading}</span>
          {hasError && <span className="shrink-0 text-xs text-[#ff8a8a]">needs attention</span>}
          <svg className={`ml-auto h-4 w-4 shrink-0 text-muted transition-transform ${expanded ? "rotate-180" : ""}`} viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <RowButtons index={index} count={count} label={heading} onMove={onMove} onDuplicate={onDuplicate} onRemove={onRemove} />
      </div>
      {expanded && (
        <div className="border-t border-line p-4">
          <ObjectField {...field} bare />
        </div>
      )}
    </li>
  );
}

function StringListField({ schema, value, onChange, path, label }: FieldProps) {
  const items = Array.isArray(value) ? (value as string[]) : [];
  const { errors } = useContext(EditorContext);
  const long = schema.widget === "paragraphs";
  const itemName = schema.items?.title?.toLowerCase() ?? "item";
  return (
    <div>
      {path.length > 0 && <Label schema={schema} label={label} />}
      {path.length === 0 && schema.description && <p className="mb-4 text-sm text-muted">{schema.description}</p>}
      <ol className="space-y-2">
        {items.map((text, i) => {
          const error = errors[pathKey([...path, i])];
          return (
            <li key={i} className="flex items-start gap-2">
              <span className="w-6 shrink-0 pt-2.5 font-mono text-[11px] text-muted">{String(i + 1).padStart(2, "0")}</span>
              <div className="min-w-0 flex-1">
                {long ? (
                  <textarea
                    value={text}
                    onChange={(e) => onChange(items.map((t, j) => (j === i ? e.target.value : t)))}
                    rows={3}
                    aria-label={`${itemName} ${i + 1}`}
                    className={`field min-h-[5.5rem] [field-sizing:content] ${invalid(error)}`}
                  />
                ) : (
                  <input
                    value={text}
                    onChange={(e) => onChange(items.map((t, j) => (j === i ? e.target.value : t)))}
                    aria-label={`${itemName} ${i + 1}`}
                    className={`field ${invalid(error)}`}
                  />
                )}
                {error && <p className="mt-1 text-xs text-[#ff8a8a]">{error}</p>}
              </div>
              <div className="pt-1">
                <RowButtons
                  index={i}
                  count={items.length}
                  label={`${itemName} ${i + 1}`}
                  onMove={(to) => onChange(move(items, i, to))}
                  onRemove={() => onChange(items.filter((_, j) => j !== i))}
                />
              </div>
            </li>
          );
        })}
      </ol>
      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className="btn-ghost mt-3"
      >
        + Add {itemName}
      </button>
      {path.length > 0 && <Help schema={schema} />}
    </div>
  );
}

function ImageField({ schema, value, onChange, path, label }: FieldProps) {
  const id = useId();
  const error = useError(path);
  const { webUrl } = useContext(EditorContext);
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>();
  const src = typeof value === "string" ? value : "";
  // Uploads are served by the API (proxied at /uploads here); other paths live on the website.
  const preview = !src ? "" : src.startsWith("/uploads/") || /^https?:\/\//.test(src) ? src : `${webUrl}${src.startsWith("/") ? "" : "/"}${src}`;

  const upload = async (file: File) => {
    setUploading(true);
    setUploadError(undefined);
    const form = new FormData();
    form.append("file", file);
    const result = await uploadImageAction(form).catch(() => ({ error: "Upload failed. Is the image under 5 MB?" }));
    setUploading(false);
    if ("url" in result) onChange(result.url);
    else setUploadError(result.error);
  };

  return (
    <div>
      <Label htmlFor={id} schema={schema} label={label} />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex h-24 w-32 shrink-0 items-center justify-center overflow-hidden rounded-md border border-line bg-[repeating-conic-gradient(#1c1c1c_0_25%,#141414_0_50%)] bg-[length:16px_16px]">
          {preview ? (
            // Plain <img>: previews come from other origins (the website) and must not go through this app's image optimizer.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="" className="h-full w-full object-contain" />
          ) : (
            <span className="text-xs text-muted">No image</span>
          )}
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <input id={id} value={src} onChange={(e) => onChange(e.target.value)} placeholder="/images/…" className={`field font-mono text-xs ${invalid(error)}`} />
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" className="btn-ghost" disabled={uploading} onClick={() => fileInput.current?.click()}>
              {uploading ? "Uploading…" : "Upload image"}
            </button>
            {src && (
              <button type="button" className="text-xs text-muted hover:text-ink" onClick={() => onChange("")}>
                Clear
              </button>
            )}
            <input
              ref={fileInput}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                e.target.value = "";
                if (file) upload(file);
              }}
            />
          </div>
          {uploadError && <p className="text-xs text-[#ff8a8a]">{uploadError}</p>}
        </div>
      </div>
      <Help schema={schema} error={error} />
    </div>
  );
}
