import ci from 'is-ci'
import { join } from 'pathe'
import type { VisOptions } from '../shared/types'
import type { VisContext } from '../shared/vis_context'
import { removeArtifactDirs, resolveSnapshotRootDir } from './snapshot_path'

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
			platform: getSnapshotPlatform(),
		},
		suite: {},
		setup(config, options) {
			context.state.projectPath = config.root
			context.state.testTimeout = config.testTimeout
			context.state.hookTimeout = config.hookTimeout
			context.state.snapshotRootDir = resolveSnapshotRootDir(options)
			context.state.snapshotRootPath = join(context.state.projectPath, context.state.snapshotRootDir)
		},
		reset() {
			context.state = { projectPath: '', platform: context.state.platform }
		},
	}
	return context
}

export const serverVisContext = createVisContext()

let initializingVisContext: Promise<VisContext> | undefined

export async function getVisContext(context: {
	config: {
		root: string
		snapshotOptions: {
			updateSnapshot: 'all' | 'new' | 'none'
		}
		testTimeout: number
		hookTimeout: number
	}
}) {
	return initializingVisContext ?? (initializingVisContext = initializeVisContext(context))
}

async function initializeVisContext(context: {
	config: {
		root: string
		snapshotOptions: {
			updateSnapshot: 'all' | 'new' | 'none'
		}
		testTimeout: number
		hookTimeout: number
	}
}) {
	serverVisContext.setup(context.config, serverVisContext.options)
	await removeArtifactDirs(serverVisContext.state.snapshotRootDir)
	return serverVisContext
}

function getSnapshotPlatform() {
	return ci ? process.platform : 'local'
}
