---
"storybook-addon-vis": patch
---

Revert importing `createVis` from `vitest-plugin-vis/client-api`.
`createVis` imports `vitest`, which cannot be imported in the client side.