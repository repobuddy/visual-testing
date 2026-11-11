import { platform } from 'node:process'
import ci from 'is-ci'
import type { VisOptions } from '../config/types.ts'
import { SNAPSHOT_ROOT_DIR } from '../shared/constants.ts'
import { trimCommonFolder } from '../shared/trim_common_folder.ts'
import type { ExtendedBrowserCommandContext } from './vis_server_context.types.ts'

/**
 * The context the plugin passes to a `snapshotRootDir` function.
 */
export type SnapshotRootDirContext = Parameters<Extract<VisOptions['snapshotRootDir'], (...args: any[]) => any>>[0]

export function resolveSnapshotRootDir(browserCommandContext: ExtendedBrowserCommandContext, options: VisOptions) {
	return resolveSnapshotRootDirOption(options.snapshotRootDir, () => {
		const { config } = browserCommandContext.project.browser
		return {
			ci,
			rootDir: SNAPSHOT_ROOT_DIR,
			projectName: browserCommandContext.project.name,
			browserName: config.browser.name,
			providerName: browserCommandContext.provider.name,
			platform,
			screenshotFailures: config.browser.screenshotFailures,
			screenshotDirectory: config.browser.screenshotDirectory,
		}
	})
}

/**
 * Resolves the `snapshotRootDir` option the same way the plugin does:
 * - `undefined`: `__vis__/<platform>` in CI, `__vis__/local` otherwise.
 * - a string: `<snapshotRootDir>/<platform>` in CI, `<snapshotRootDir>/local` otherwise.
 * - a function: its return value, as is.
 *
 * @param snapshotRootDir - The `snapshotRootDir` option.
 * @param getContext - Creates the context passed to a `snapshotRootDir` function.
 * Called only when `snapshotRootDir` is a function.
 */
export function resolveSnapshotRootDirOption<C>(
	snapshotRootDir: string | ((context: C) => string) | undefined,
	getContext: () => C,
) {
	if (!snapshotRootDir) return getSnapshotRootDir()
	if (typeof snapshotRootDir === 'string') return getSnapshotRootDir(snapshotRootDir)
	return snapshotRootDir(getContext())
}

/**
 * Gets the root directory for storing snapshots.
 *
 * @param snapshotRootDir - Base directory for snapshots. Defaults to `__vis__`.
 * @returns The full snapshot root directory path, which includes a platform-specific subdirectory:
 * - When running in CI: `<snapshotRootDir>/<platform>` (e.g. `__vis__/linux`)
 * - When running locally: `<snapshotRootDir>/local`
 */
export function getSnapshotRootDir(snapshotRootDir = SNAPSHOT_ROOT_DIR) {
	return `${snapshotRootDir}/${ci ? platform : 'local'}`
}

/**
 * Gets the snapshot subpath of a test or story file.
 *
 * @param filePath - Path of the file relative to the project root, such as `src/button.spec.ts`.
 * A leading `./` (as in a Storybook import path) is removed before `snapshotSubpath` receives it.
 */
export function getSnapshotSubpath(filePath: string, options: Pick<VisOptions, 'snapshotSubpath'>) {
	const snapshotSubpath = options.snapshotSubpath ?? (({ subpath }) => trimCommonFolder(subpath))
	return snapshotSubpath({ subpath: filePath.startsWith('./') ? filePath.slice(2) : filePath })
}
