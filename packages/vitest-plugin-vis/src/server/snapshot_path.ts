import ci from 'is-ci'
import { platform } from 'node:process'
import type { VisOptions } from '../config/types.ts'
import { SNAPSHOT_ROOT_DIR } from '../shared/constants.ts'
import { trimCommonFolder } from '../shared/trim_common_folder.ts'
import type { ExtendedBrowserCommandContext } from './vis_server_context.types.ts'

export function resolveSnapshotRootDir(browserCommandContext: ExtendedBrowserCommandContext, options: VisOptions) {
	if (!options.snapshotRootDir) return getSnapshotRootDir(SNAPSHOT_ROOT_DIR)
	const snapshotRootDir = options.snapshotRootDir
	if (typeof snapshotRootDir === 'string') return getSnapshotRootDir(snapshotRootDir)
	const { config } = browserCommandContext.project.browser
	return snapshotRootDir({
		ci,
		browserName: config.browser.name,
		providerName: browserCommandContext.provider.name,
		platform,
		screenshotFailures: config.browser.screenshotFailures,
		screenshotDirectory: config.browser.screenshotDirectory,
	})
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

export function getSnapshotSubpath(suiteName: string, options: Pick<VisOptions, 'snapshotSubpath'>) {
	const snapshotSubpath = options.snapshotSubpath ?? (({ subpath }) => trimCommonFolder(subpath))
	return snapshotSubpath({ subpath: suiteName })
}
