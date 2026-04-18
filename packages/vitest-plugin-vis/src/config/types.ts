import type {
	ComparisonMethod,
	FailureThresholdOptions,
	ImageSnapshotKeyOptions,
	ImageSnapshotSubjectOptions,
	ImageSnapshotTimeoutOptions,
	PixelComparisonOptions,
	PixelDiffOptions,
	SsimComparisonOptions,
	SsimDiffOptions,
} from '../shared/types.ts'

export type { ComparisonMethod, PixelComparisonOptions, PixelDiffOptions, SsimComparisonOptions, SsimDiffOptions }

export type VisOptions<M extends ComparisonMethod = 'pixel'> = (M extends 'ssim'
	? {
			comparisonMethod: M
			/**
			 * Custom options passed to 'ssim'
			 */
			diffOptions?: Partial<SsimDiffOptions> | undefined
		}
	: {
			comparisonMethod?: M | undefined
			/**
			 * Custom options passed to 'pixelmatch'
			 */
			diffOptions?: PixelDiffOptions | undefined
		}) &
	FailureThresholdOptions &
	ImageSnapshotTimeoutOptions &
	ImageSnapshotKeyOptions &
	ImageSnapshotSubjectOptions & {
		/**
		 * Loads the `test.setupFiles` of the specified preset.
		 *
		 * @default 'auto'
		 */
		preset?: 'manual' | 'auto' | 'custom' | undefined
		/**
		 * The snapshot folder relative to the root of the project.
		 *
		 * @default "({ ci, platform }) => `__vis__/${ci ? platform : 'local'}`"
		 */
		snapshotRootDir?:
			| string
			| ((context: {
					ci: boolean
					rootDir: string
					projectName?: string | undefined
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
		/**
		 * When `true`, after `snapshotRootDir` and `snapshotSubpath`, the server checks **absolute** paths
		 * to a representative snapshot file under `__baselines__` (minimal and typical-long `taskId-key.png`
		 * probes). If any would exceed Windows-safe limits (full path length at least 250, below classic
		 * `MAX_PATH` 260, or a final path component longer than 255), directory segments of the computed
		 * subpath are kept and the **final** filename component is shortened to
		 * `{firstToken}-{hash12}{ext}` (first token = basename before the first `.`, tersify-style). Legacy
		 * `taskId-key.png` names are unchanged; `snapshotRootDir` itself is not rewritten.
		 *
		 * @default false
		 */
		shortenLongSnapshotPaths?: boolean | undefined
	}
