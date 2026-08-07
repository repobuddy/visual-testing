import type { BrowserCommands, BrowserPage } from 'vitest/browser'
import type { SnapshotTestMeta } from 'vitest-plugin-vis/client-api'
import { isVitestBrowser } from './is_vitest_browser.ts'
import { toMatchImageSnapshot } from './page/to_match_image_snapshot.ts'

let browserContext: Awaited<typeof import('vitest/browser')>
let vitest: Awaited<typeof import('vitest')>

if (isVitestBrowser()) {
	import('vitest/browser').then((m) => {
		m.page.extend({ toMatchImageSnapshot })
		browserContext = m
	})
	import('vitest').then((m) => {
		vitest = m
	})
}

export const page = new Proxy<BrowserPage>({} as any, {
	get(_target, prop) {
		const r = (browserContext?.page as any)?.[prop]
		if (prop === 'toMatchImageSnapshot' && r === undefined) {
			return () => {}
		}
		return r
	},
})

export const commands = new Proxy<BrowserCommands>({} as any, {
	get(_target, prop) {
		return (browserContext?.commands as any)?.[prop]
	},
})

export const getCurrentTest = () =>
	vitest?.TestRunner.getCurrentTest() as
		| (ReturnType<typeof vitest.TestRunner.getCurrentTest> & SnapshotTestMeta)
		| undefined
