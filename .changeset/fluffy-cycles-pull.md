---
"storybook-addon-vis": patch
---

Remove `viteFinal` setup in `/preset`.
You need to configure Vitest in `vitest.config.ts` for Vitest Browser Mode anyway.
So getting the config to `.storybook/main.ts` is actually worst.
