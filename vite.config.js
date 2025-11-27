// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    jsxFactory: "h",         // <div> -> h("div", ...)
    jsxFragment: "Fragment", // <>...</> -> Fragment(...)
    jsxInject: `import { h, Fragment } from "/src/core/h.js";`,
  },
});
