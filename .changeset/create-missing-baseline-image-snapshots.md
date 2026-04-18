---
'vitest-plugin-vis': minor
'storybook-addon-vis': minor
---

Add `createMissingBaseline` for image matchers so a missing baseline can be written without `-u` / `updateSnapshot: 'all'`, and support `vis.setup({ createMissingBaseline: true })` defaults for auto snapshots (overridable per test). Document Storybook Vitest browser limitations for `createMissingBaseline` and the `updateSnapshot` workaround.
