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

/**
 * Left-join `A` with `B`: keys only in `A` are kept as-is, keys in both are
 * intersected, keys only in `B` are added.
 *
 * Defined locally instead of imported so this package does not depend on which
 * major of `type-plus` exposes a `Merge` alias.
 */
type Merge<A, B> = Omit<A, keyof B> & {
	[K in keyof B]: K extends keyof A ? A[K] & B[K] : B[K]
}

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
