import { defineConfig } from "vite";

export default defineConfig({
  server: { host: "127.0.0.1" },
  preview: { host: "127.0.0.1" },
  build: {
    rollupOptions: { output: { esModule: true } },
    target: ["es2020", "edge88", "firefox78", "chrome87", "safari14"],
    lib: {
      entry: "./src/main.ts",
      name: "gbUrl",
      fileName: "gburl",
    },
  },
});
