import { removeArtifactDirs, resolveSnapshotRootDir } from './server/snapshot_path'
import { serverVisConext } from './server/vis_context'

export default function setupVis(context: {
	root: string
	snapshotOptions: {
		updateSnapshot: 'all' | 'new' | 'none'
	}
	testTimeout: number
	hookTimeout: number
}) {
	serverVisConext.state.projectDir = context.root
	serverVisConext.state.testTimeout = context.testTimeout
	serverVisConext.state.hookTimeout = context.hookTimeout
	serverVisConext.state.snapshotRootDir = resolveSnapshotRootDir(context.root, serverVisConext.options)
	removeArtifactDirs(serverVisConext.state.snapshotRootDir)
	return function teardownVis() {
		// console.log('teardownVis', context)
	}
}
