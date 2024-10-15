import tailwindcss from "tailwindcss";
import postcss from "rollup-plugin-postcss";
import image from "@rollup/plugin-image";

import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import deleteFolder from "rollup-plugin-delete";

const packageJson = require("./package.json");
const tailwindConfig = require("./tailwind.config.js");

const config = [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: false,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: false,
      },
    ],
    plugins: [
      deleteFolder({ targets: "dist/*" }),
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
      postcss({
        extract: true,
        minimize: true,
        plugins: [tailwindcss(tailwindConfig)],
      }),
      image(),
    ],
    external: ["react", "react-dom"],
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/types.d.ts", format: "es" }],
    plugins: [dts.default()],
    external: [/\.css$/, /\.scss$/],
  },
];

export default config;
