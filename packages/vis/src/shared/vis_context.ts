import type { VisOptions } from './types'

export type VisState = {
	snapshotRootDir?: string | undefined
	snapshotRootPath?: string | undefined
	timeout?: number | undefined
	projectPath: string
	testTimeout?: number | undefined
	hookTimeout?: number | undefined
	platform: string
}

export type VisContext = {
	options?: VisOptions
	state: VisState
	suite: Record<
		string,
		{
			baselineDir: string
			resultDir: string
			diffDir: string
			tasks: Record<string, { count: number }>
		}
	>
}
