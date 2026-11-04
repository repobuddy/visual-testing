---
'vitest-plugin-vis': minor
'storybook-addon-vis': minor
---

Add a `mask` option to `toMatchImageSnapshot()` (both `expect(...)` and `page.`), `setAutoSnapshotOptions()` and `vis.setup({ auto })`. It takes selectors, locators or elements and paints them over before the snapshot is taken, so content that changes on every run does not fail the comparison. `maskColor` sets the color. It works with the Playwright and WebdriverIO providers.
