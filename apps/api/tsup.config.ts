import { defineConfig } from "tsup";

// Bundle everything (including the TypeScript-only @designjanala/shared) into one file,
// so dist/server.js runs with plain `node` and no node_modules.
export default defineConfig({
  entry: ["src/server.ts"],
  format: ["esm"],
  target: "node20",
  platform: "node",
  clean: true,
  noExternal: [/.*/],
});
