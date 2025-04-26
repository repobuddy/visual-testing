import ci from 'is-ci'
import { platform } from 'node:process'
import type { VisOptions } from '../config/types.ts'
import { SNAPSHOT_ROOT_DIR } from '../shared/constants.ts'
import { trimCommonFolder } from '../shared/trim_common_folder.ts'
import type { PartialBrowserCommandContext } from './vis_server_context.types.ts'

export function resolveSnapshotRootDir(browserCommandContext: PartialBrowserCommandContext, options: VisOptions) {
	if (!options.snapshotRootDir) return getSnapshotRootDir(SNAPSHOT_ROOT_DIR)
	const snapshotRootDir = options.snapshotRootDir
	if (typeof snapshotRootDir === 'string') return getSnapshotRootDir(snapshotRootDir)
	return snapshotRootDir({
		ci,
		browserName: browserCommandContext.provider.browserName,
		providerName: browserCommandContext.provider.name,
		platform,
		screenshotFailures: browserCommandContext.provider.options?.screenshotFailures,
		screenshotDirectory: browserCommandContext.provider.options?.screenshotDirectory,
	})
}

function getSnapshotRootDir(snapshotRootDir: string) {
	return `${snapshotRootDir}/${ci ? platform : 'local'}`
}

export function getSnapshotSubpath(suiteName: string, options: Pick<VisOptions, 'snapshotSubpath'>) {
	const customizeSnapshotSubpath = options.snapshotSubpath ?? (({ subpath }) => trimCommonFolder(subpath))
	return customizeSnapshotSubpath({ subpath: suiteName })
}
