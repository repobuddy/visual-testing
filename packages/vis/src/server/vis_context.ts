import { join } from 'pathe'
import type { VisOptions } from '../shared/types'
import type { VisContext } from '../shared/vis_context'
import { resolveSnapshotRootDir } from './snapshot_path'

export interface ServerVisContext extends VisContext {
	reset(): void
	setup(
		config: {
			root: string
			snapshotOptions: {
				updateSnapshot: 'all' | 'new' | 'none'
			}
			testTimeout: number
			hookTimeout: number
		},
		options: VisOptions,
	): void
}

function createVisContext() {
	const context: ServerVisContext = {
		state: {
			projectPath: '',
		},
		setup(config, options) {
			context.state.projectPath = config.root
			context.state.testTimeout = config.testTimeout
			context.state.hookTimeout = config.hookTimeout
			context.state.snapshotRootDir = resolveSnapshotRootDir(options)
			context.state.snapshotRootPath = join(context.state.projectPath, context.state.snapshotRootDir)
		},
		reset() {
			context.state = { projectPath: '' }
		},
	}
	return context
}

export const serverVisContext = createVisContext()
