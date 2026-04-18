export { getSnapshotRootDir } from './server/snapshot_path.ts'
export {
	resolveLegacySnapshotFileRelativePath,
	resolveSnapshotSubpathWithinLimits,
} from './server/snapshot_path_limits.ts'
export { BASELINE_DIR, DIFF_DIR, SNAPSHOT_ROOT_DIR } from './shared/constants.ts'
export { trimCommonFolder } from './shared/trim_common_folder.ts'
