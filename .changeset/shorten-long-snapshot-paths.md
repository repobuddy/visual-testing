---
'vitest-plugin-vis': minor
'storybook-addon-vis': minor
---

Add opt-in `shortenLongSnapshotPaths` to `vis()`: when enabled, if representative **absolute** snapshot paths under `__baselines__` (after `snapshotRootDir` and `snapshotSubpath`) would exceed Windows-safe limits (250 characters or a path segment over 255), keep subpath directories and shorten only the final component to `{firstToken}-{hash12}{ext}` (tersify-style prefix); legacy `taskId-key.png` names are unchanged. Fix `getVisOption` to merge `__default` plugin options with the active Vitest project. Storybook `visProjects` may set `shortenLongSnapshotPaths` for the Vis panel (same semantics as Vitest `vis()`). Export `resolveSnapshotSubpathWithinLimits` from `vitest-plugin-vis/server-utils`. `vitest-plugin-vis/testing` is browser-safe (fixtures only). `getVisOption` and `stubSuite` are available from `vitest-plugin-vis/testing/node` for Node/Vitest project tests.
