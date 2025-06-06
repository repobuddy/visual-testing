/**
 * Configuration options for visual testing suites in Storybook.
 *
 * @param options.visProjects Array of visual testing project configurations
 * @param options.visProjects[].snapshotRootDir Root directory for storing snapshots. Can be a string path or a function that returns a path based on CI and platform context
 * @param options.visProjects[].snapshotSubpath Optional function to customize the snapshot subdirectory path
 */
export type StorybookVisOptions = {
	visProjects: Array<{
		snapshotRootDir:
			| string
			| ((context: {
					ci: boolean
					platform: string
			  }) => string)
			| undefined
		snapshotSubpath?: ((options: { subpath: string }) => string) | undefined
	}>
}

/**
 * Define options for Storybook Visual Testing addon.
 */
export function defineStorybookVisOptions(options: StorybookVisOptions) {
	return options
}
