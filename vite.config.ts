import { fileURLToPath, URL } from "node:url";
import glsl from "vite-plugin-glsl";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [glsl()],
  resolve: {
    alias: {
      "@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
      "@experience": fileURLToPath(
        new URL("./src/experience", import.meta.url),
      ),
      "@glsl": fileURLToPath(new URL("./src/glsl", import.meta.url)),
    },
  },
});
