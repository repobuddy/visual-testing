import { serverVisConext } from './server/vis_context'

export default function setupVis(context: {
	root: string
	snapshotOptions: {
		updateSnapshot: 'all' | 'new' | 'none'
	}
	testTimeout: number
	hookTimeout: number
}) {
	console.log('setupVis', context)
	serverVisConext.state.projectDir = context.root
	serverVisConext.state.testTimeout = context.testTimeout
	serverVisConext.state.hookTimeout = context.hookTimeout
	return function teardownVis() {
		// console.log('teardownVis', context)
	}
}
