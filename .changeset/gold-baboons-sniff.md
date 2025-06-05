---
"vitest-plugin-vis": patch
---

Revert the change of adding `createVis` from `vitest-plugin-vis/setup` to `vitest-plugin-vis/client-api`.
`createVis` imports `vitest`, which cannot be imported in the client side.