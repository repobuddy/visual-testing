/**
 * Configuration options for visual testing suites in Storybook.
 *
 * @param options.visProjects Array of visual testing project configurations
 * @param options.visProjects[].snapshotRootDir Root directory for storing snapshots. Can be a string path or a function that returns a path based on CI and platform context
 * @param options.visProjects[].snapshotSubpath Optional function to customize the snapshot subdirectory path
 */
export type StorybookVisOptions = {
	visProjects: Array<{
		snapshotRootDir: string | ((context: { ci: boolean; platform: string }) => string) | undefined
		snapshotSubpath?: ((options: { subpath: string }) => string) | undefined
		/**
		 * Match Vitest `vis({ shortenLongSnapshotPaths })`. When true, the Vis panel applies the same rule as the
		 * Vitest server: if the **absolute** path to representative baseline files would exceed safe limits, only
		 * the final filename segment of the computed subpath is tersified.
		 *
		 * @default false
		 */
		shortenLongSnapshotPaths?: boolean | undefined
	}>
}
