import type { SnapshotTestMeta } from 'vitest-plugin-vis/client-api'
import type { BrowserCommands, BrowserPage } from 'vitest/browser'
import { toMatchImageSnapshot } from './page/to_match_image_snapshot.ts'

let browserContext: Awaited<typeof import('vitest/browser')>
let vitestSuite: Awaited<typeof import('vitest/suite')>

if ((globalThis as any).__vitest_browser__) {
	import('vitest/browser').then((m) => {
		m.page.extend({ toMatchImageSnapshot })
		browserContext = m
	})
	import('vitest/suite').then((m) => {
		vitestSuite = m
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
	vitestSuite?.getCurrentTest() as (ReturnType<typeof vitestSuite.getCurrentTest> & SnapshotTestMeta) | undefined
