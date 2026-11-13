---
"storybook-addon-vis": minor
"vitest-plugin-vis": minor
---

Add the `storybook-addon-vis prune [--dry-run]` command. It runs the `vitest-plugin-vis prune` command of the `vitest-plugin-vis` the addon depends on, so addon users can run it with their package manager without `npx` or `pnpm dlx` fetching a different version.
