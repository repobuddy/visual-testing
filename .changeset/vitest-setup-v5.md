---
'vitest-plugin-vis': major
'storybook-addon-vis': major
---

Remove deprecated setup APIs and align with Vitest 4.

- **BREAKING:** `createVis` is no longer re-exported from `vitest-plugin-vis/setup`. Import it from `vitest-plugin-vis/setup-api` instead.
- **BREAKING:** Removed deprecated `vis.presets`, `vis.beforeAll`, and `vis.afterEach` helpers from the object returned by `createVis`. Use `vis.setup()` (and `autoSnapshotMatcher` where you need per-theme snapshots) instead.
- **BREAKING:** Config preset `none` is renamed to `custom`.
- **BREAKING:** Removed the `vitest-plugin-vis/presets/enable` entry point; use the `manual` or `auto` preset, or `custom` with your own `vitest.setup.ts`.
- **BREAKING:** Browser helpers now rely on Vitest 4’s `TestRunner.getCurrentTest` / `getCurrentSuite` (via `vitest` instead of `vitest/suite`). Requires Vitest 4+ in browser projects.
