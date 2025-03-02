---
"storybook-addon-vis": patch
---

Workaround a Storybook 8.4 issue where the `preview.beforeEach` is called after test instead of before.
Because of that, the `setAutoSnapshotOptions()` called within test is not honored.
