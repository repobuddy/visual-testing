---
"storybook-addon-vis": minor
"vitest-plugin-vis": major
---

Change the `customizeSnapshotId` to accept `context` object.

This is a breaking change.
Feature-wise, it is the same as before.
We will enable better customization by passing `viewport` to the `customizeSnapshotId` function in the future.
