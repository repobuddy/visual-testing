---
"storybook-addon-vis": minor
---

Export `visAnnotations` from the main package index and move `expect.extend({ toMatchImageSnapshot })` from a module-level side effect to lazy initialization inside `visAnnotations.beforeEach()`.

Previously, importing `storybook-addon-vis` or `storybook-addon-vis/vitest-setup` would immediately call `expect.extend` as a side effect. Now the extension is deferred until `visAnnotations.beforeEach()` runs, ensuring it only executes when `storybook/test` is initialized.
