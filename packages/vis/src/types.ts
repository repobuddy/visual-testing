import type { CustomizeSnapshotIdOptions } from './client/@vitest/browser/types'
import type { MatchImageSnapshotOptions } from './client/expect.to_match_image_snapshot'

/**
 * The project parameters for the snapshot.
 *
 * These parameters are set per project in the `.storybook/preview.ts` file.
 */
export interface VisOptions extends MatchImageSnapshotOptions, CustomizeSnapshotIdOptions {
	/**
	 * The snapshot folder relative to the root of the project.
	 *
	 * Default: `__vis__`
	 */
	snapshotRootDir?: string | undefined

	/**
	 * Customize the snapshot subpath.
	 *
	 * The snapshot subpath is used along with `snapshotRootDir` to determine the folder of the snapshots:
	 *
	 * - baseline: `<snapshotRootDir>/<platform>/<snapshotSubpath>/<snapshotId>.png`
	 * - result: `<snapshotRootDir>/__results__/<snapshotSubpath>/<snapshotId>.png`
	 * - diff: `<snapshotRootDir>/__diff_output__/<snapshotSubpath>/<snapshotId>.png`
	 *
	 * Typically, you place your test files either in a dedicated `tests` folder or in the `src` folder along with your source code.
	 * By default, the snapshot subpath is the test file path with that folder removed.
	 * This reduces the nesting of the snapshot folders.
	 *
	 * If you place your test files in multiple folders,
	 * such as in both `tests` and `src` folders,
	 * and they might have files with the same name,
	 * and create conflicting snapshots,
	 * you can set this to customize the snapshot subpath.
	 */
	customizeSnapshotSubpath?: (subPath: string) => string
	/**
	 * Timeout for taking the snapshot.
	 *
	 * Default: 30000 ms
	 */
	timeout?: number | undefined
}
