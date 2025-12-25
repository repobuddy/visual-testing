---
"storybook-addon-vis": patch
---

Move React logic to the panel component.
This avoids the `invalid hook call` error when using the panel with `@storybook/addon-docs` loaded in the same Storybook instance.
