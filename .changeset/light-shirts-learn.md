---
"storybook-addon-vis": patch
---

Remove extra `visAnnotations.beforeAll()`.
This is handled by `vitest-plugin-vis` and only need on `vitest.beforeAll`.
