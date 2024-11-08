import { basename, dirname, join, relative } from 'pathe'
import './augment.js'
import { commands } from './@vitest/browser/context.js'
import { toSnapshotId } from './@vitest/browser/image_snapshot.logic.js'
import { state } from './state.js'

export * from './@vitest/browser/context.js'
export * from './expect.to_match_image_snapshot.js'
export * from './tags.js'

/**
 * The project parameters for the snapshot.
 *
 * These parameters are set per project in the `.storybook/preview.ts` file.
 */
export type VisOptions = {
	/**
	 * The snapshot folder relative to the root of the project.
	 */
	snapshotPath: string
}

export async function configureSnapshotBeforeAll(
	suite: { file: { filepath: string }; name: string },
	options?: VisOptions,
) {
	state.name = suite.name
	state.testFilepath = suite.file.filepath
	state.testFilename = basename(state.testFilepath)
	state.projectDir = state.testFilepath.slice(0, -state.name.length)
	const snapshotPath = join(
		state.projectDir,
		options?.snapshotPath ?? `__snapshots__/${await commands.getSnapshotPlatform()}`,
	)
	const currentDir = dirname(state.testFilepath)
	state.baselineDir = relative(currentDir, join(snapshotPath, state.testFilename))
	state.resultDir = relative(currentDir, join(snapshotPath, '__results__', state.testFilename))
	state.diffDir = relative(currentDir, join(snapshotPath, '__diff_output__', state.testFilename))

	if (!state.snapshot[state.testFilepath]) {
		state.snapshot[state.testFilepath] = {}
		await commands.rmDir(state.resultDir)
		await commands.rmDir(state.diffDir)
	}
}
