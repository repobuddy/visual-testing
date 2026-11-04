---
'vitest-plugin-vis': minor
'storybook-addon-vis': minor
---

Add an `animations` option (`'disabled' | 'allow'`, default `'allow'`) to `toMatchImageSnapshot()`, `page.toMatchImageSnapshot()`, `setAutoSnapshotOptions()` and `vis.setup()`. With `'disabled'`, finite CSS animations and transitions are finished and infinite ones are cancelled before the snapshot, so animated components give stable images with both the Playwright and WebdriverIO providers.
