/**
 * Configuration options for visual testing suites in Storybook.
 *
 * @param options.visSuites Array of visual testing suite configurations
 * @param options.visSuites[].snapshotRootDir Root directory for storing snapshots. Can be a string path or a function that returns a path based on CI and platform context
 * @param options.visSuites[].snapshotSubpath Optional function to customize the snapshot subdirectory path
 */
export type StorybookVisOptions = {
	visSuites: Array<{
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
 *
 * @param options Configuration options for visual testing
 * @param options.visSuites Array of visual testing suite configurations
 * @param options.visSuites[].snapshotRootDir Root directory for storing snapshots. Can be a string path or a function that returns a path based on CI and platform context
 * @param options.visSuites[].snapshotSubpath Optional function to customize the snapshot subdirectory path
 * @returns The provided options object
 */
export function defineStorybookVisOptions(options: StorybookVisOptions) {
	return options
}
