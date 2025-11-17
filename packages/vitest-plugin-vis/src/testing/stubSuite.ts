import { resolve } from 'pathe'
import { requiredDeep, type RecursivePartial } from 'type-plus'
import type { BrowserCommandContext, TestUserConfig } from 'vitest/node'
import { stubBrowserCommandContext } from './stubBrowserCommandContext.ts'
import { stubUserConfig } from './stubUserConfig.ts'

export function stubSuite(
	partialUserConfig: RecursivePartial<{ test?: { name?: TestUserConfig['name'] } }> = {},
	partialBrowserCommandContext: RecursivePartial<BrowserCommandContext> = {},
) {
	const root = resolve(import.meta.dirname, '../..')
	const userConfig = stubUserConfig({
		root,
		...partialUserConfig,
	})
	const browserCommandContext = stubBrowserCommandContext(
		requiredDeep<RecursivePartial<BrowserCommandContext>>(
			{
				project: {
					config: { root },
					vitest: {
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
