/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:5272/api", // URL del servidor .NET
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Ruta base de tu API en el servidor .NET
      },
    },
  },
  plugins: [
    vue({ template: { transformAssetUrls } }),
    quasar({
      sassVariables: "./quasar-variables.scss",
    }),
    // tsconfigPaths(),
  ],
  test: {
    // reporters: ["html"],
    globals: true,
    include: ["src/**/*.spec.ts"],
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "@/": new URL("./src/", import.meta.url).pathname,
    },
  },
});
