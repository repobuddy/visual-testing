///  <reference types="@vitest/browser/context" />

import type { ImageSnapshotMatcher } from './client/expect.to_match_image_snapshot'

declare global {
	namespace jest {
		// biome-ignore lint/correctness/noUnusedVariables: augmentation must have matching type params.
		interface Matchers<R, T> extends ImageSnapshotMatcher {}
	}
}
