import { SNAPSHOT_DIR } from './contants.js'
import { trimCommonFolder } from './trim_common_folder.js'
import type { VisOptions } from './types.js'

export function resolveSnapshotRootDir(options: VisOptions | undefined) {
	return options?.snapshotRootDir ?? SNAPSHOT_DIR
}

export function getSnapshotSubpath(suiteName: string, options: VisOptions) {
	const customizeSnapshotSubpath = options.customizeSnapshotSubpath ?? trimCommonFolder
	return customizeSnapshotSubpath(suiteName)
}
