import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
    jsxInject: `import { h, Fragment } from "/src/core/h.js";`,
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        // opcional: reescribir /api/users -> /users
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
