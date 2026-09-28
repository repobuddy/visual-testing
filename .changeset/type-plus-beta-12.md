---
'vitest-plugin-vis': patch
'storybook-addon-vis': patch
---

Update `type-plus` to `8.0.0-beta.12`.

`type-plus` 8.0.0-beta.12 no longer exports the distributive `Pick` and `Omit` from its root.
The public types now use `ObjectPlus.Pick` and `ObjectPlus.Omit`, which behave the same.
