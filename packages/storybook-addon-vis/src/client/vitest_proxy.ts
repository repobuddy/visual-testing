import type { BrowserCommands, BrowserPage } from 'vitest/browser'
import type { SnapshotTestMeta } from 'vitest-plugin-vis/client-api'
import { isVitestBrowser } from './is_vitest_browser.ts'
import { toMatchImageSnapshot } from './page/to_match_image_snapshot.ts'

type BrowserModule = Awaited<typeof import('vitest/browser')>
type VitestModule = Awaited<typeof import('vitest')>

/**
 * How the proxy gets hold of the vitest modules.
 *
 * They are loaded dynamically because this module is also reached from a plain
 * Storybook preview, where `vitest` and `vitest/browser` are not available.
 * Passing `undefined` stands for "not a vitest browser run": nothing is loaded
 * and the proxies stay empty.
 */
export type VitestProxyLoaders = {
	loadBrowser: () => Promise<BrowserModule>
	loadVitest: () => Promise<VitestModule>
}

/**
 * Build the `page` / `commands` / `getCurrentTest` proxies over `loaders`.
 *
 * Exported for tests: it is the only way to observe the window between module
 * load and the dynamic imports settling.
 */
export function createVitestProxy(loaders: VitestProxyLoaders | undefined) {
	let browserContext: BrowserModule | undefined
	let vitest: VitestModule | undefined

	const browserReady = loaders
		? loaders.loadBrowser().then((m) => {
				m.page.extend({ toMatchImageSnapshot })
				browserContext = m
			})
		: Promise.resolve()
	const vitestReady = loaders
		? loaders.loadVitest().then((m) => {
				vitest = m
			})
		: Promise.resolve()
	const ready = Promise.all([browserReady, vitestReady]).then(() => undefined)

	const page = new Proxy<BrowserPage>({} as any, {
		get(_target, prop) {
			const r = (browserContext?.page as any)?.[prop]
			if (prop === 'toMatchImageSnapshot' && r === undefined) {
				return () => {}
			}
			return r
		},
	})

	const commands = new Proxy<BrowserCommands>({} as any, {
		get(_target, prop) {
			// Outside a vitest browser run there is nothing to wait for: keep
			// yielding `undefined` so the addon guards stay in charge (#829).
			if (!loaders) return undefined
			if (browserContext) return (browserContext.commands as any)[prop]
			// The import has not settled yet (#835). Commands are async RPC calls,
			// so hand back a function that waits for the module instead of
			// `undefined`, which fails as `<command> is not a function`.
			return (...args: unknown[]) => browserReady.then(() => (browserContext!.commands as any)[prop](...args))
		},
	})

	const getCurrentTest = () =>
		vitest?.TestRunner.getCurrentTest() as
			| (ReturnType<VitestModule['TestRunner']['getCurrentTest']> & SnapshotTestMeta)
			| undefined

	/**
	 * Resolves once the vitest modules behind `page`, `commands`, and
	 * `getCurrentTest` are loaded.
	 *
	 * `page` and `getCurrentTest` are read synchronously, so hooks that depend on
	 * them must await this first (#835).
	 */
	const whenReady = () => ready

	return { page, commands, getCurrentTest, whenReady }
}

const proxy = createVitestProxy(
	isVitestBrowser() ? { loadBrowser: () => import('vitest/browser'), loadVitest: () => import('vitest') } : undefined,
)

export const page = proxy.page
export const commands = proxy.commands
export const getCurrentTest = proxy.getCurrentTest
export const whenVitestProxyReady = proxy.whenReady
