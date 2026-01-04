---
"vitest-plugin-vis": minor
---

Fail test when no baseline image is found.
This behavior is closer to the Visual Regression Test from Vitest.

The difference is that the baseline image is not created automatically.
You need to create it manually by running the test with the `updateSnapshot` option set to `all`.

This prevents you from accidentally committing a new snapshot or passing the tests when you running the tests for the second time.

Closes [#516](https://github.com/repobuddy/visual-testing/issues/516)

Since this change can break existing tests (even though correctly), we will release it as a minor version.
