---
'storybook-addon-vis': patch
---

Gate the auto-snapshot hooks on the Vitest browser global instead of a general test-environment check.

`beforeAll` and `beforeEach` guarded on `isRunningInTest()` from `@repobuddy/test`, which treats any
`HeadlessChrome` user agent as a test run. Browsing Storybook with a headless browser — driving it
with Playwright to debug a story, for example — therefore entered the snapshot setup path, where the
`vitest/browser` command proxy is empty, and failed with `commands.setupVisSuite is not a function`
so the preview never rendered.

Both hooks now check `__vitest_browser__`, the same signal the command proxy itself uses, so they
run exactly when the Vitest commands they depend on are present. This also covers a non-browser
Vitest run (jsdom or node), which passed the old guard and hit the same empty proxy.

`@repobuddy/test` is no longer a runtime dependency of this package.
