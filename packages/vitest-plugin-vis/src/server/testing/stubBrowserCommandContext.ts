import '@vitest/browser-playwright'
import { stub } from 'type-plus'
import type { ExtendedBrowserCommandContext } from '../vis_server_context.types.ts'

export const stubBrowserCommandContext = stub.build<ExtendedBrowserCommandContext>({})

export function createStubPartialBrowserCommandContext({ root, testPath }: { root: string; testPath: string }) {
	return stub.build<ExtendedBrowserCommandContext>({
		project: {
			config: { root },
			runner: { config: { name: 'subject' } },
		} as any,
		provider: {},
		testPath,
	})
}
