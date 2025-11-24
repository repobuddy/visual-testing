import { stub } from 'type-plus'
import type { BrowserCommandContext } from 'vitest/node'

export const stubBrowserCommandContext = stub.build<BrowserCommandContext>({})

export function createStubPartialBrowserCommandContext({ root, testPath }: { root: string; testPath: string }) {
	return stub.build<BrowserCommandContext>({
		project: {
			config: { root },
			vitest: { config: { name: 'subject' } },
		},
		provider: {},
		testPath,
	})
}
