// Imports

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { resolve } from "path";

// Code

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: "src/chrome-extension/manifest.json", dest: "." },
        { src: "src/chrome-extension/public/16.png", dest: "./public" },
        { src: "src/chrome-extension/public/32.png", dest: "./public" },
        { src: "src/chrome-extension/public/48.png", dest: "./public" },
        { src: "src/chrome-extension/public/128.png", dest: "./public" },
        { src: "src/chrome-extension/contentCSS/", dest: "." },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    open: "/popup-local.html",
  },
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "popup.html"),
        options: resolve(__dirname, "options.html"),
        background: resolve(__dirname, "src/background.ts"),
        praccTeamContentScript: resolve(
          __dirname,
          "src/contentScripts/praccTeam.ts"
        ),
        praccMainContentScript: resolve(
          __dirname,
          "src/contentScripts/praccMain.ts"
        ),
        praccSearchContentScript: resolve(
          __dirname,
          "src/contentScripts/praccSearch.ts"
        ),
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});
