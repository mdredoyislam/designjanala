"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { resetSection, saveSection, type SaveResult } from "@/app/content/actions";
import { formatDateTime } from "@/lib/format";
import { EditorContext, Field } from "./Field";
import { pathKey, type Schema } from "./schema";

type Props = {
  sectionKey: string;
  schema: Schema;
  initialValue: unknown;
  customized: boolean;
  updatedAt?: string;
  /** Saved content of all sections (for selects that reference other sections). */
  content: Record<string, unknown>;
  webUrl: string;
};

type Notice = { tone: "ok" | "warn" | "error"; text: string };

const websiteNotice = (done: string): Record<"updated" | "scheduled" | "failed", Notice> => ({
  updated: { tone: "ok", text: `${done} The website is showing the change now.` },
  scheduled: { tone: "ok", text: `${done} The website will show it within 5 minutes.` },
  failed: { tone: "warn", text: `${done} The website couldn't be refreshed, so it will show the change within 5 minutes.` },
});

export function SectionEditor({ sectionKey, schema, initialValue, customized: initialCustomized, updatedAt: initialUpdatedAt, content, webUrl }: Props) {
  const [value, setValue] = useState(initialValue);
  const [saved, setSaved] = useState(initialValue);
  const [customized, setCustomized] = useState(initialCustomized);
  const [updatedAt, setUpdatedAt] = useState(initialUpdatedAt);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState<Notice>();
  const [pending, startTransition] = useTransition();

  const dirty = useMemo(() => JSON.stringify(value) !== JSON.stringify(saved), [value, saved]);

  // Warn before closing the tab with unsaved edits.
  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  const apply = (result: SaveResult, done: string, after: (r: Extract<SaveResult, { ok: true }>) => void) => {
    if (!result.ok) {
      setErrors(Object.fromEntries((result.issues ?? []).map((i) => [pathKey(i.path), i.message])));
      setNotice({ tone: "error", text: result.error });
      return;
    }
    setErrors({});
    setValue(result.value);
    setSaved(result.value);
    after(result);
    setNotice(websiteNotice(done)[result.website]);
  };

  const save = () =>
    startTransition(async () => {
      apply(await saveSection(sectionKey, value), "Saved.", (r) => {
        setCustomized(true);
        setUpdatedAt(r.updatedAt);
      });
    });

  const reset = () => {
    if (!confirm("Reset this section to the original website content? Your edits to it will be lost.")) return;
    startTransition(async () => {
      apply(await resetSection(sectionKey), "Reset to the original content.", () => {
        setCustomized(false);
        setUpdatedAt(undefined);
      });
    });
  };

  const discard = () => {
    setValue(saved);
    setErrors({});
    setNotice(undefined);
  };

  const toneClass = { ok: "text-[#4ade80]", warn: "text-accent", error: "text-[#ff8a8a]" };

  return (
    <EditorContext.Provider value={{ content, errors, webUrl }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          save();
        }}
      >
        <div className="panel p-5 sm:p-6">
          <Field schema={schema} value={value} onChange={(v) => {
            setValue(v);
            if (notice?.tone !== "error") setNotice(undefined);
          }} path={[]} />
        </div>

        {/* Sticky action bar */}
        <div className="sticky bottom-0 z-10 -mx-4 mt-6 border-t border-line bg-background/95 px-4 py-4 backdrop-blur sm:mx-0 sm:rounded-xl sm:border sm:px-5">
          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" className="btn-primary" disabled={!dirty || pending}>
              {pending ? "Saving…" : "Save changes"}
            </button>
            <button type="button" className="btn-ghost" disabled={!dirty || pending} onClick={discard}>
              Discard
            </button>
            <p role="status" aria-live="polite" className={`text-sm ${notice ? toneClass[notice.tone] : "text-muted"}`}>
              {notice?.text ??
                (dirty
                  ? "You have unsaved changes."
                  : customized
                    ? `Edited${updatedAt ? ` ${formatDateTime(updatedAt)}` : ""}. The website shows this version.`
                    : "Showing the original website content.")}
            </p>
            {customized && (
              <button type="button" className="btn-danger ml-auto" disabled={pending} onClick={reset}>
                Reset to original
              </button>
            )}
          </div>
        </div>
      </form>
    </EditorContext.Provider>
  );
}
