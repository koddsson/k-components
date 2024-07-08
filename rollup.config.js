import { rollupPluginHTML as html } from "@web/rollup-plugin-html";
import esbuild from "rollup-plugin-esbuild";

export default {
  output: { dir: "dist" },
  plugins: [
    esbuild({ target: "es2022" }),
    html({ input: ["index.html", "docs/*.html"] }),
  ],
};
