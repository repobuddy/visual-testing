---
"storybook-addon-vis": patch
"vitest-plugin-vis": patch
---

Change default timeout to 30s.
The initial timeout of 1s was set by Vitest.
It is causing tests to fail with `TimeoutError`,
even when getting `Locator` like `getByRole`.

This timeout will be removed in Vitest 3.

The underlying provider (`playwright`) does not have a default timeout.

Setting to 30s should be a good default for most cases.

It could still be too short for slow CI or when it is running scripts in parallel.
That was the case for `storybook-test-runner` but could be improved in Vitest browser mode.

If timeout is still an issue, we can further default it to 60s or even 120s.
