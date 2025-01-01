---
"storybook-addon-vis": minor
---

Rewritten to use [`vitest-plugin-vis`](https://www.npmjs.com/package/vitest-plugin-vis),
which performs the snapshot on the server side.

The interface is greatly improved.
The `page.imageSnapshot()` is removed.
Now you can perform `expect(...).toMatchImageSnapshot()` on regular element and locator.

Please check the read me for the new API.
