---
'vitest-plugin-vis': minor
'storybook-addon-vis': minor
---

Fix `page.toMatchImageSnapshot({ fullPage: true })` so it captures the whole test page, including content below or to the right of the viewport.
It works with the `playwright` and `webdriverio` providers.

With `playwright`, `page.toMatchImageSnapshot()` now captures the test iframe instead of the Vitest runner page,
so the image has the size of the test viewport.
Existing page snapshot baselines may change size and need to be updated.

Add `fullPage` to auto snapshots.
Set it for all auto snapshots with `vis.setup({ fullPage: true })`,
for a test with `setAutoSnapshotOptions({ fullPage: true })`,
or for a story with `parameters: defineAutoSnapshotParam({ fullPage: true })`.
