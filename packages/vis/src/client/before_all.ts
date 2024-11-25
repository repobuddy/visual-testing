import { commands } from '../@vitest/browser/context'
import { clientVisConext } from './vis_context'

export async function setupSuite(_suite: { file: { filepath: string }; name: string }) {
	if (!clientVisConext.state) {
		// console.log('setupSuite', 'getting state')
		clientVisConext.state = await commands.getVisState()
	}
	// console.log('setupSuite', clientVisConext.state)
	// // console.debug('setupSuite', suite.name)
	// testFilepath = suite.file.filepath
	// const projectDir = serverVisConext.state.projectPath
	// serverVisConext.state.snapshotRootDir
	// const snapshotPath = resolveSnapshotPath(options)
	// const snapshotFullPath = join(projectDir, snapshotPath)
	// currentDir = dirname(testFilepath)
	// const suiteDir = trimSuiteDir(suite.name, options)
	// baselineDir = relative(currentDir, join(snapshotFullPath, await getPlatform(), suiteDir))
	// resultDir = relative(currentDir, join(snapshotFullPath, '__results__', suiteDir))
	// diffDir = relative(currentDir, join(snapshotFullPath, '__diff_output__', suiteDir))

	// suiteOptions = options
	// snapshot = snapshot ?? {}
	// if (!snapshot[testFilepath]) {
	// 	snapshot[testFilepath] = Object.create(null)
	// 	await commands.rmDir(resultDir)
	// 	await commands.rmDir(diffDir)
	// }
}
