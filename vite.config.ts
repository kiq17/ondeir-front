import { defineConfig as defineViteConfig, mergeConfig } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";


const viteConfig = defineViteConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
});

const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    setupFiles: ["./src/setupTests.ts"],
  },
});

export default mergeConfig(viteConfig, vitestConfig);
