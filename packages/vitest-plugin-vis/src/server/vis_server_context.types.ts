import type { Merge } from 'type-plus'
import type { BrowserCommandContext } from 'vitest/node'
import type { Awaitable } from '../shared/types.ts'

export type VisSuites = {
	[projectPath: string]: Promise<VisSuite>
}

export type VisSuite = {
	projectRoot: string
	testTimeout: number
	hookTimeout: number
	snapshotRootDir: string
	snapshotBaselineDir: string
	snapshotResultDir: string
	snapshotDiffDir: string
	snapshotRootPath: string
	subject: string | undefined
	modules: Record<
		string,
		{
			baselineDir: string
			resultDir: string
			diffDir: string
			tasks: Record<
				string,
				{
					count: number
				}
			>
		}
	>
}

export type ExtendedBrowserCommand<Payload extends unknown[] = [], ReturnValue = any> = (
	context: ExtendedBrowserCommandContext,
	...payload: Payload
) => Awaitable<ReturnValue>

export type ExtendedBrowserCommandContext = {
	page: BrowserCommandContext['page']
	browser: BrowserCommandContext['browser']
	iframe: BrowserCommandContext['iframe']
	testPath: NonNullable<BrowserCommandContext['testPath']>
	provider: BrowserCommandContext['provider']
	// project: BrowserCommandContext['project']
	project: Merge<
		BrowserCommandContext['project'],
		{
			browser: {
				config: {
					browser: {
						name: string
						screenshotFailures: boolean
						screenshotDirectory: string
					}
				}
			}
			config: BrowserCommandContext['project']['config']
			runner: {
				config: {
					name: string
				}
			}
		}
	>
}
