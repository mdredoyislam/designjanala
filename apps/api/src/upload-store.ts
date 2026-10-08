import { randomBytes } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

/** Allowed image types, recognised by their first bytes rather than the browser-reported MIME type. SVG is excluded (it can carry scripts). */
const kinds = [
  { ext: "png", type: "image/png", test: (b: Uint8Array) => b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47 },
  { ext: "jpg", type: "image/jpeg", test: (b: Uint8Array) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  { ext: "gif", type: "image/gif", test: (b: Uint8Array) => String.fromCharCode(...b.slice(0, 4)) === "GIF8" },
  {
    ext: "webp",
    type: "image/webp",
    test: (b: Uint8Array) => String.fromCharCode(...b.slice(0, 4)) === "RIFF" && String.fromCharCode(...b.slice(8, 12)) === "WEBP",
  },
  { ext: "avif", type: "image/avif", test: (b: Uint8Array) => String.fromCharCode(...b.slice(4, 12)) === "ftypavif" },
] as const;

export const detectImage = (bytes: Uint8Array) => kinds.find((k) => k.test(bytes));
export const contentTypeFor = (name: string) => kinds.find((k) => name.endsWith(`.${k.ext}`))?.type;

/** Names we generate ourselves; anything else is rejected before touching the disk. */
export const isUploadName = (name: string) => /^[a-z0-9]+-[a-f0-9]{8}\.(png|jpg|gif|webp|avif)$/.test(name);

const newName = (ext: string) => `${Date.now().toString(36)}-${randomBytes(4).toString("hex")}.${ext}`;

export interface UploadStore {
  save(bytes: Uint8Array, ext: string): Promise<string>;
  read(name: string): Promise<Uint8Array | undefined>;
}

export class MemoryUploadStore implements UploadStore {
  private files = new Map<string, Uint8Array>();
  async save(bytes: Uint8Array, ext: string) {
    const name = newName(ext);
    this.files.set(name, bytes);
    return name;
  }
  async read(name: string) {
    return this.files.get(name);
  }
}

export class FileUploadStore implements UploadStore {
  constructor(private readonly dir: string) {
    mkdirSync(dir, { recursive: true });
  }
  async save(bytes: Uint8Array, ext: string) {
    const name = newName(ext);
    writeFileSync(join(this.dir, name), bytes);
    return name;
  }
  async read(name: string) {
    if (!isUploadName(name)) return undefined;
    try {
      return readFileSync(join(this.dir, name));
    } catch {
      return undefined;
    }
  }
}
