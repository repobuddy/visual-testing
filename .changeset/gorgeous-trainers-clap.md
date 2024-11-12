---
"storybook-addon-vis": minor
---

Change default snapshot folder back to `<project root>/__vis__`.
They are now stored in folder structure mimic the test/story file.

This makes it much easier to review the snapshot results.

Also, it avoids the `EISDIR` error when running the tests and running the storybook at the same time.

The `snapshotDir` option is renamed to `snapshotRootDir`.

A `customizeSnapshotSubpath` is added to allow customizing the snapshot sub path.
