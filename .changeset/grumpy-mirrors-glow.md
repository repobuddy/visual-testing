---
"vitest-plugin-vis": patch
---

Avoid setting `setupFiles` in `vitest.config.ts` to undefined,
as Vite v5 does not support it.
