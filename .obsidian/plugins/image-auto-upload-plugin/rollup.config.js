import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";

export default {
  input: "main.ts",
  output: {
    dir: ".",
    sourcemap: "inline",
    format: "cjs",
    exports: "default",
  },
  external: ["obsidian"],
  plugins: [typescript(), nodeResolve({ browser: false }), commonjs(), json()],
};
