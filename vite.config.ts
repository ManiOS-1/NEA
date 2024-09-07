import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

export default defineConfig({
  plugins: [remix(), tsconfigPaths()],
  server: {
    hmr: true, // Ensures Hot Module Replacement is enabled
  },
  build: {
    outDir: 'build', // Adjust this if you need a different directory
  },
});
