import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type Plugin } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// During SSR:
// 1. Node.js can't load .css files as ESM modules → return empty.
// 2. @react-hook/resize-observer calls `new window.ResizeObserver()` at module
//    load time (synchronously during React render), crashing the server.
//    We shim it with a no-op for SSR only; the real package runs in the browser.
// (Equivalent to what next-global-css / patchWebpackConfig does in Next.js for CSS)
function ssrCompat(): Plugin {
  return {
    name: "ssr-compat",
    enforce: "pre",
    resolveId(id, _importer, options) {
      const isSSR =
        (this as any).environment?.name === "ssr" || options?.ssr === true;
      if (!isSSR) return;
      if (/\.css(\?.*)?$/.test(id)) return "\0ssr-empty-css";
    },
    load(id) {
      if (id === "\0ssr-empty-css") return "export default {}";
    },
  };
}

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), ssrCompat()],
  ssr: {
    noExternal: [/^@rescui\/.*/, /^@jetbrains\/.*/],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".jsx", ".json", ".mjs"],
    alias: {
      "@react-hook/resize-observer": new URL(
        "./app/shims/resize-observer.js",
        import.meta.url,
      ).pathname,
    },
  },
  define: {
    global: "globalThis",
  },
});
