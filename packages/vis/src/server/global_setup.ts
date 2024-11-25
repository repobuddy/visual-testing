import { removeArtifactDirs } from './snapshot_path'
import { serverVisContext } from './vis_context'

export async function setupVis(context: {
	config: {
		root: string
		snapshotOptions: {
			updateSnapshot: 'all' | 'new' | 'none'
		}
		testTimeout: number
		hookTimeout: number
	}
}) {
	console.debug('server.setupVis')
	serverVisContext.setup(context.config, serverVisContext.options)
	console.debug('server.setupVis.state', serverVisContext.state)
	await removeArtifactDirs(serverVisContext.state.snapshotRootDir)
	return function teardownVis() {
		// console.log('teardownVis', context)
	}
}
