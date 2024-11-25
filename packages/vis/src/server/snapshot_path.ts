import { join } from 'pathe'
import { rimraf } from 'rimraf'
import { DIFF_OUTPUT_DIR, RESULT_DIR, SNAPSHOT_DIR } from '../shared/contants'
import type { VisOptions } from '../shared/types'

export function resolveSnapshotRootDir(options: VisOptions | undefined) {
	return options?.snapshotRootDir ?? SNAPSHOT_DIR
}

export async function removeArtifactDirs(snapshotRootDir: string) {
	await Promise.allSettled([
		rimraf.rimraf(join(snapshotRootDir, RESULT_DIR)),
		rimraf.rimraf(join(snapshotRootDir, DIFF_OUTPUT_DIR)),
	])
}
