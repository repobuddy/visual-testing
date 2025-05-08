import { resolve } from 'pathe'
import { requiredDeep, type RecursivePartial } from 'type-plus'
import type { UserConfig } from 'vite'
import type { BrowserCommandContext } from 'vitest/node'
import { stubBrowserCommandContext } from './stubBrowserCommandContext.ts'
import { stubUserConfig } from './stubUserConfig.ts'

export function stubSuite(
	partialUserConfig: RecursivePartial<UserConfig> = {},
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
					vite: {
						config: {
							test: {
								name: partialUserConfig.test?.name,
							},
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
