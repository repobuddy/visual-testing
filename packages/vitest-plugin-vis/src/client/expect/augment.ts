import type { ImageSnapshotMatcher } from './to_match_image_snapshot.types.ts'

declare global {
	namespace jest {
		interface Matchers<R, T> extends ImageSnapshotMatcher {}
	}
}
