import type { ContentOverrides, ContentSectionKey, SiteContent } from "@designjanala/shared";
import { JsonFile } from "./json-file";

/** Persistence for website content edits. Only edited sections are stored; the rest use the defaults. */
export interface ContentStore {
  overrides(): Promise<ContentOverrides>;
  save<K extends ContentSectionKey>(key: K, value: SiteContent[K]): Promise<{ updatedAt: string }>;
  reset(key: ContentSectionKey): Promise<void>;
}

export class MemoryContentStore implements ContentStore {
  protected data: ContentOverrides;

  constructor(seed: ContentOverrides = {}) {
    this.data = seed;
  }

  protected persist() {}

  async overrides() {
    return this.data;
  }

  async save<K extends ContentSectionKey>(key: K, value: SiteContent[K]) {
    const updatedAt = new Date().toISOString();
    this.data = { ...this.data, [key]: { value, updatedAt } };
    this.persist();
    return { updatedAt };
  }

  async reset(key: ContentSectionKey) {
    const { [key]: _removed, ...rest } = this.data;
    this.data = rest;
    this.persist();
  }
}

export class FileContentStore extends MemoryContentStore {
  private readonly file: JsonFile<ContentOverrides>;

  constructor(path: string) {
    const file = new JsonFile<ContentOverrides>(path, () => ({}));
    super(file.read());
    this.file = file;
  }

  protected persist() {
    this.file.write(this.data);
  }
}
