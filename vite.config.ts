/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./tests/setupTests.ts"],
    alias: [
      {
        find: "react-redux/es/exports",
        replacement: path.resolve(__dirname, "./node_modules/react-redux/lib/exports"),
      },
    ],
    coverage: {
      provider: "c8",
      reportsDirectory: "./tests/coverage",
    },
  },
});
