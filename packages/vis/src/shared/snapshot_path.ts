import { SNAPSHOT_DIR } from './contants'
import type { VisOptions } from './types'

export function resolveSnapshotRootDir(options: VisOptions | undefined) {
	return options?.snapshotRootDir ?? SNAPSHOT_DIR
}

export function getSnapshotSubpath(suiteName: string, options: VisOptions) {
	const customizeSnapshotSubpath = options.customizeSnapshotSubpath ?? defaultCustomizeSnapshotSubpath
	return customizeSnapshotSubpath(suiteName)
}

function defaultCustomizeSnapshotSubpath(suiteName: string) {
	const [suiteDir] = suiteName.split('/', 1)
	if (['tests', 'test', 'src', 'source', 'js', 'ts', 'lib'].includes(suiteDir))
		return suiteName.slice(suiteDir.length + 1)
	return suiteName
}
