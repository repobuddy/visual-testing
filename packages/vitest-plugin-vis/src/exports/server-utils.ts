export { getSnapshotRootDir } from '../server/snapshot_path.ts'
export {
	resolveLegacySnapshotFileRelativePath,
	resolveSnapshotSubpathWithinLimits,
} from '../server/snapshot_path_limits.ts'
export {
	BASELINE_DIR,
	CHANGED_REGIONS_SUFFIX,
	DIFF_DIR,
	REVIEW_IMAGE_SUFFIX,
	SNAPSHOT_ROOT_DIR,
} from '../shared/constants.ts'
export { trimCommonFolder } from '../shared/trim_common_folder.ts'
