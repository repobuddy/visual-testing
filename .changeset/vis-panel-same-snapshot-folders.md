---
'storybook-addon-vis': minor
'vitest-plugin-vis': minor
---

The Vis panel now reads the snapshot folders the tests write to: the same `snapshotRootDir` and `snapshotSubpath` in `visProjects` resolve to the same folders as in `vis()` or `storybookVis()` ([#1001](https://github.com/repobuddy/visual-testing/issues/1001)).

**Changed in `storybook-addon-vis`. Check your `visProjects` if you set these:**

- A string `snapshotRootDir` now gets `<platform>` (CI) or `local` added, as in the plugin. `'__vis__'` now reads `__vis__/local` on your machine, not `__vis__`. If you listed a full folder such as `'__vis__/linux'`, return it from a function to keep reading it: `snapshotRootDir: () => '__vis__/linux'`.
- A `snapshotSubpath` function now receives the story path without the leading `./` (`src/button.stories.tsx`, not `./src/button.stories.tsx`), the same value the plugin passes. Remove any `./` handling from it.
- A `snapshotRootDir` function now receives the same fields as in the plugin. `rootDir` is `'__vis__'`. `projectName`, `browserName`, and `providerName` come from new optional fields of the same names on the `visProjects` entry. `screenshotFailures` and `screenshotDirectory` are `undefined`.

The default config (`visProjects: [{}]`, or no `snapshotRootDir`) reads the same folders as before.

`vitest-plugin-vis/server-utils` now exports `resolveSnapshotRootDirOption()`, `getSnapshotSubpath()`, and the `SnapshotRootDirContext` type, which the addon uses. `getSnapshotSubpath()` removes a leading `./` from the path.
