import ci from 'is-ci'
import type { VisOptions } from '../config/types.ts'
import { SNAPSHOT_ROOT_DIR } from '../shared/constants.ts'
import { trimCommonFolder } from '../shared/trim_common_folder.ts'
import type { PartialBrowserCommandContext } from './vis_context.types.ts'

export function resolveSnapshotRootDir(suite: PartialBrowserCommandContext, options: VisOptions) {
	if (!options.snapshotRootDir) return getSnapshotRootDir(SNAPSHOT_ROOT_DIR, options.platform!)
	const snapshotRootDir = options.snapshotRootDir
	if (typeof snapshotRootDir === 'string') return getSnapshotRootDir(snapshotRootDir, options.platform!)
	return snapshotRootDir({
		ci,
		browserName: suite.provider.browserName,
		providerName: suite.provider.name,
		platform: process.platform,
		screenshotFailures: suite.provider.options.screenshotFailures,
		screenshotDirectory: suite.provider.options.screenshotDirectory,
	})
}

function getSnapshotRootDir(snapshotRootDir: string, platform: string) {
	return `${snapshotRootDir}/${ci ? platform : 'local'}`
}
export function getSnapshotSubpath(suiteName: string, options: Pick<VisOptions, 'customizeSnapshotSubpath'>) {
	const customizeSnapshotSubpath = options.customizeSnapshotSubpath ?? trimCommonFolder
	return customizeSnapshotSubpath(suiteName)
}
