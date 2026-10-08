import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

/**
 * A JSON document on disk. Reads once at start-up; every write replaces the file atomically
 * (write to a temp file, then rename) so a crash mid-write never leaves half a file behind.
 */
export class JsonFile<T> {
  constructor(
    private readonly path: string,
    private readonly fallback: () => T,
  ) {
    mkdirSync(dirname(path), { recursive: true });
  }

  read(): T {
    try {
      return JSON.parse(readFileSync(this.path, "utf8")) as T;
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== "ENOENT") console.error(`Could not read ${this.path}; starting empty.`, err);
      return this.fallback();
    }
  }

  write(data: T) {
    const tmp = `${this.path}.${process.pid}.tmp`;
    writeFileSync(tmp, JSON.stringify(data, null, 2));
    renameSync(tmp, this.path);
  }
}
