import { SNAPSHOT_DIR } from './contants'
import type { VisOptions } from './types'

export function resolveSnapshotRootDir(options: VisOptions | undefined) {
	return options?.snapshotRootDir ?? SNAPSHOT_DIR
}
