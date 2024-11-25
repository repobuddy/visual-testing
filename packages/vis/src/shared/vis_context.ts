import type { VisOptions } from './types'

export type VisState = {
	snapshotRootDir?: string | undefined
	snapshotRootPath?: string | undefined
	timeout?: number | undefined
	projectPath: string
	testTimeout?: number | undefined
	hookTimeout?: number | undefined
}

export type VisContext = {
	options?: VisOptions
	state: VisState
}
