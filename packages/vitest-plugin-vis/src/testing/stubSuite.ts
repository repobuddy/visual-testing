import { resolve } from 'pathe'
import { requiredDeep, type RecursivePartial } from 'type-plus'
import type { TestUserConfig } from 'vitest/node'
import type { ExtendedBrowserCommandContext } from '../server/vis_server_context.types.ts'
import { stubBrowserCommandContext } from './stubBrowserCommandContext.ts'
import { stubUserConfig } from './stubUserConfig.ts'

export function stubSuite(
	partialUserConfig: RecursivePartial<{ test?: { name?: TestUserConfig['name'] } }> = {},
	partialBrowserCommandContext: RecursivePartial<ExtendedBrowserCommandContext> = {},
) {
	const root = resolve(import.meta.dirname, '../..')
	const userConfig = stubUserConfig({
		root,
		...partialUserConfig,
	})
	const browserCommandContext = stubBrowserCommandContext(
		requiredDeep<RecursivePartial<ExtendedBrowserCommandContext>>(
			{
				project: {
					config: { root },
					runner: {
						config: {
							name: partialUserConfig.test?.name as string | undefined,
						},
					},
				},
			},
			partialBrowserCommandContext,
		),
	)
	return {
		userConfig,
		browserCommandContext,
	}
}
