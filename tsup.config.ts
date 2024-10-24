import { defineConfig, type Options } from "tsup"

// The current browsers supported by Storybook v7
const BROWSER_TARGET: Options["target"] = [
  "chrome100",
  "safari15",
  "firefox91",
]
const NODE_TARGET: Options["target"] = ["node18"]

export default defineConfig(async (options) => {
  return [{
    entry: [
      "src/index.ts"
    ],
    dts: {
      resolve: true,
    },
    format: ["esm"],
    target: [...BROWSER_TARGET, ...NODE_TARGET],
    platform: "neutral",
    splitting: false,
    minify: !options.watch,
    treeshake: true,
    sourcemap: true,
    clean: !options.watch
  }]
})
