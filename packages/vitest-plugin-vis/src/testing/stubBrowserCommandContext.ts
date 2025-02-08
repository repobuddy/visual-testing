import { stub } from 'type-plus'
import type { BrowserCommandContext } from 'vitest/node'
import type { PartialBrowserCommandContext } from '../server/vis_context.types.ts'

export const stubBrowserCommandContext = stub.build<BrowserCommandContext>({})

export function createStubPartialBrowserCommandContext({ root, testPath }: { root: string; testPath: string }) {
	return stub.build<PartialBrowserCommandContext>({
		project: {
			config: {
				root,
			},
		},
		testPath,
	})
}
