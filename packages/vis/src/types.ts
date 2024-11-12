import type { CustomizeSnapshotIdOptions } from './@vitest/browser/types'
import type { MatchImageSnapshotOptions } from './expect.to_match_image_snapshot'

/**
 * The project parameters for the snapshot.
 *
 * These parameters are set per project in the `.storybook/preview.ts` file.
 */
export interface VisOptions extends MatchImageSnapshotOptions, CustomizeSnapshotIdOptions {
	/**
	 * The snapshot folder relative to the root of the project.
	 *
	 * Default: `__vis__/<local | CI platform>`
	 */
	snapshotRootDir?: string | undefined

	/**
	 * Customize the snapshot subpath.
	 *
	 * The snapshot subpath is used along with `snapshotRootDir` to determine the folder of the snapshots:
	 *
	 * - baseline: `<snapshotRootDir>/<snapshotSubpath>/<snapshotId>.png`
	 * - result: `<snapshotRootDir>/<snapshotSubpath>/__results__/<snapshotId>.png`
	 * - diff: `<snapshotRootDir>/<snapshotSubpath>/__diff_output__/<snapshotId>.png`
	 *
	 * Typically, you place your test files in a `tests` folder or `src` folder along with your source code.
	 * By default, the snapshot subpath is the test file path with that folder removed.
	 * This reduces the nesting of the snapshot folders.
	 *
	 * If you have a non-typical setup, you can set this to customize the snapshot subpath.
	 */
	customizeSnapshotSubpath?: (testFilePath: string) => string
	/**
	 * Timeout for taking the snapshot.
	 *
	 * Default: 30000 ms
	 */
	timeout?: number | undefined
}
