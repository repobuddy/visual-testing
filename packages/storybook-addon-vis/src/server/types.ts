/**
 * The context the addon passes to a `snapshotRootDir` function.
 *
 * It has the same fields as the context `vis()` passes in Vitest.
 * Storybook does not run a browser provider, so `projectName`, `browserName`, and `providerName`
 * are the values declared on the `visProjects` entry, or `undefined` when the entry does not declare them.
 * `screenshotFailures` and `screenshotDirectory` are always `undefined`.
 */
export type StorybookVisSnapshotRootDirContext = {
	ci: boolean
	rootDir: string
	platform: string
	projectName?: string | undefined
	browserName?: string | undefined
	providerName?: string | undefined
	screenshotFailures?: boolean | undefined
	screenshotDirectory?: string | undefined
}

/**
 * Configuration options for visual testing suites in Storybook.
 *
 * Each entry describes one Vitest project (or browser instance) whose snapshots the Vis panel shows.
 * Its options resolve to the same folders as the same options given to `vis()` or `storybookVis()`.
 */
export type StorybookVisOptions = {
	visProjects: Array<{
		/**
		 * The snapshot folder relative to the root of the project. Same as `vis({ snapshotRootDir })`:
		 * - `undefined`: `__vis__/<platform>` in CI, `__vis__/local` otherwise.
		 * - a string: `<snapshotRootDir>/<platform>` in CI, `<snapshotRootDir>/local` otherwise.
		 * - a function: its return value, as is.
		 */
		snapshotRootDir?: string | ((context: StorybookVisSnapshotRootDirContext) => string) | undefined
		/**
		 * Same as `vis({ snapshotSubpath })`.
		 * `subpath` is the story file path relative to the project root, such as `src/button.stories.tsx`.
		 */
		snapshotSubpath?: ((options: { subpath: string }) => string) | undefined
		/**
		 * The Vitest project name, passed to a `snapshotRootDir` function as `projectName`.
		 */
		projectName?: string | undefined
		/**
		 * The browser name, passed to a `snapshotRootDir` function as `browserName`.
		 */
		browserName?: string | undefined
		/**
		 * The browser provider name, passed to a `snapshotRootDir` function as `providerName`.
		 */
		providerName?: string | undefined
		/**
		 * Match Vitest `vis({ shortenLongSnapshotPaths })`. When true, uses the same path rules as
		 * the `vitest-plugin-vis`: paths are shortened when their absolute path would exceed safe limits).
		 *
		 * @default false
		 */
		shortenLongSnapshotPaths?: boolean | undefined
	}>
}
