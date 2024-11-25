import type { MatchImageSnapshotOptions } from './expect.to_match_image_snapshot'

export function defineSnapshotParam(snapshot: MatchImageSnapshotOptions) {
	return { snapshot }
}
