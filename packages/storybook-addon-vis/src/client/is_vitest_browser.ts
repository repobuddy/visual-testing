/**
 * Whether the code is running inside a Vitest browser-mode run.
 *
 * This is the signal the addon actually depends on: `commands` and `page` in
 * `vitest_proxy.ts` are only populated when `__vitest_browser__` is set, so any
 * broader "am I under test" check (such as one matching a `HeadlessChrome` user
 * agent) lets a plain headless browser reach the snapshot setup and fail on the
 * empty proxy with `commands.setupVisSuite is not a function`.
 */
export function isVitestBrowser() {
	return !!(globalThis as any).__vitest_browser__
}
