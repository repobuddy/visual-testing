import { describe, it } from 'vitest'
import { commands, createVitestProxy, whenVitestProxyReady } from './vitest_proxy.ts'

/**
 * Regression tests for #835.
 *
 * The vitest modules behind the proxies are loaded by a dynamic import. Nothing
 * used to await it, so a hook reading `commands.setupVisSuite` before the import
 * settled got `undefined` and failed with `setupVisSuite is not a function` —
 * in a run that genuinely is vitest browser mode.
 *
 * The timing cannot be observed on the module-level proxy (its import has long
 * settled by the time a test runs), so these drive `createVitestProxy` with
 * loaders that stay pending until the test resolves them.
 */
describe('while the dynamic import is still pending', () => {
	function deferred<T>() {
		let resolve!: (value: T) => void
		const promise = new Promise<T>((r) => {
			resolve = r
		})
		return { promise, resolve }
	}

	function fakeBrowserModule(calls: unknown[][]) {
		return {
			page: { extend() {} },
			commands: {
				async setupVisSuite(...args: unknown[]) {
					calls.push(args)
					return { subject: '[data-testid="subject"]' }
				},
			},
		} as any
	}

	function pendingProxy() {
		const browser = deferred<any>()
		const vitest = deferred<any>()
		const proxy = createVitestProxy({
			loadBrowser: () => browser.promise,
			loadVitest: () => vitest.promise,
		})
		return { proxy, browser, vitest }
	}

	it('a command is still a function, not undefined', ({ expect }) => {
		const { proxy } = pendingProxy()

		expect(typeof proxy.commands.setupVisSuite).toBe('function')
	})

	it('a command called before the import settles waits for it and delegates once', async ({ expect }) => {
		const calls: unknown[][] = []
		const { proxy, browser } = pendingProxy()

		const pending = proxy.commands.setupVisSuite()
		expect(calls).toEqual([])

		browser.resolve(fakeBrowserModule(calls))

		await expect(pending).resolves.toEqual({ subject: '[data-testid="subject"]' })
		expect(calls).toEqual([[]])
	})

	it('the command receives its arguments', async ({ expect }) => {
		const calls: unknown[][] = []
		const { proxy, browser } = pendingProxy()

		const pending = (proxy.commands as any).setupVisSuite('a', 1)
		browser.resolve(fakeBrowserModule(calls))
		await pending

		expect(calls).toEqual([['a', 1]])
	})

	it('`whenReady` does not resolve until both modules are loaded', async ({ expect }) => {
		let resolved = false
		const { proxy, browser, vitest } = pendingProxy()
		proxy.whenReady().then(() => {
			resolved = true
		})

		browser.resolve(fakeBrowserModule([]))
		await Promise.resolve()
		expect(resolved).toBe(false)

		vitest.resolve({ TestRunner: { getCurrentTest: () => undefined } })
		await proxy.whenReady()
		expect(resolved).toBe(true)
	})

	it('`getCurrentTest` reports the current test once vitest is loaded', async ({ expect }) => {
		const { proxy, browser, vitest } = pendingProxy()
		expect(proxy.getCurrentTest()).toBeUndefined()

		browser.resolve(fakeBrowserModule([]))
		vitest.resolve({ TestRunner: { getCurrentTest: () => ({ name: 'a test' }) } })
		await proxy.whenReady()

		expect(proxy.getCurrentTest()).toEqual({ name: 'a test' })
	})
})

describe('outside a vitest browser run', () => {
	it('commands stay empty so the addon guards decide (#829)', ({ expect }) => {
		const proxy = createVitestProxy(undefined)

		expect(proxy.commands.setupVisSuite).toBeUndefined()
	})
})

describe('in this vitest browser run', () => {
	it('the real commands are in place once `whenVitestProxyReady` resolves', async ({ expect }) => {
		await whenVitestProxyReady()

		expect(typeof commands.setupVisSuite).toBe('function')
	})
})
