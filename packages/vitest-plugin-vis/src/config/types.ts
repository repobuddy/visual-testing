import type {
	AutoSnapshotOptions,
	ComparisonMethod,
	ImageSnapshotCompareOptions,
	ImageSnapshotIdOptions,
	ImageSnapshotTimeoutOptions,
} from '../shared/types.ts'

export type { ComparisonMethod }

export type VisOptions<M extends ComparisonMethod = 'pixel'> = ImageSnapshotTimeoutOptions &
	ImageSnapshotIdOptions &
	ImageSnapshotCompareOptions<M> &
	AutoSnapshotOptions & {
		/**
		 * Loads the `test.setupFiles` of the specified preset.
		 */
		preset?: 'manual' | 'auto' | 'none' | undefined
		/**
		 * The name of the subdirectory that the baseline snapshots get saved in.
		 *
		 * <snapshotRootDir>/<platform>/<snapshotSubpath>/<snapshotId>.png
		 *
		 * Default: undefined
		 */
		platform?: string | undefined
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
		 * - diff: `<snapshotRootDir>/__diffs__/<snapshotSubpath>/<snapshotId>.png`
		 *
		 * Typically, you place your test files either in a dedicated `tests` folder or in the `src` folder along with your source code.
		 * By default, the snapshot subpath is the test file path with that folder removed to reduces nesting of the snapshot folders.
		 *
		 * If you place your test files in multiple folders,
		 * such as in both `tests` and `src` folders,
		 * and they might have files with the same name and create conflicting snapshots,
		 * you can set this to customize the snapshot subpath.
		 *
		 * @param subPath - The path of the test file to be used as the snapshot sub path.
		 * If you want to keep the full path, you can simply return it.
		 */
		customizeSnapshotSubpath?: (subPath: string) => string
	}
