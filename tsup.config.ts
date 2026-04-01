import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.ts"],
  format: ["cjs", "esm"],
  bundle: false,
  shims: true,
  minify: true,
  dts: true,
  sourcemap: false,
  clean: true,
  outDir: "dist",
});
