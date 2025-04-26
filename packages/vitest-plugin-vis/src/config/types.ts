import type {
	AutoSnapshotOptions,
	ComparisonMethod,
	ImageSnapshotCompareOptions,
	ImageSnapshotKeyOptions,
	ImageSnapshotTimeoutOptions,
	PixelComparisonOptions,
	PixelDiffOptions,
	SsimComparisonOptions,
	SsimDiffOptions,
} from '../shared/types.ts'

export type { ComparisonMethod, PixelComparisonOptions, PixelDiffOptions, SsimComparisonOptions, SsimDiffOptions }

export type VisOptions<M extends ComparisonMethod = 'pixel'> = ImageSnapshotTimeoutOptions &
	ImageSnapshotCompareOptions<M> &
	ImageSnapshotKeyOptions &
	AutoSnapshotOptions & {
		/**
		 * Loads the `test.setupFiles` of the specified preset.
		 */
		preset?: 'enable' | 'manual' | 'auto' | 'none' | undefined
		/**
		 * The snapshot folder relative to the root of the project.
		 *
		 * Default: `{projectRoot}/__vis__/{platform}`
		 */
		snapshotRootDir?:
			| string
			| ((context: {
					ci: boolean
					browserName?: string | undefined
					providerName: string
					platform: string
					screenshotFailures?: boolean | undefined
					screenshotDirectory?: string | undefined
			  }) => string)
			| undefined
		/**
		 * Customize the snapshot subpath.
		 *
		 * Typically, you place your test files either in a dedicated `tests` folder or in the `src` folder along with your source code.
		 * By default, the snapshot subpath is the test file path with that folder removed to reduces nesting of the snapshot folders.
		 *
		 * If you place your test files in multiple folders,
		 * such as in both `tests` and `src` folders,
		 * and they might have files with the same name and create conflicting snapshots,
		 * you can set this to customize the snapshot subpath.
		 *
		 * @param options - Options for customizing the snapshot subpath.
		 * @property subPath - The path of the test file to be used as the snapshot subpath.
		 *                     To retain the full path, simply return it.
		 * @returns The customized snapshot subpath.
		 */
		snapshotSubpath?: ((options: { subpath: string }) => string) | undefined
	}
