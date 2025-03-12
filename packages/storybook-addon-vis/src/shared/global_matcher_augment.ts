///  <reference types="@vitest/browser/context" />

import type { ImageSnapshotMatcher } from 'vitest-plugin-vis/client-api'

declare global {
	namespace jest {
		// biome-ignore lint/correctness/noUnusedVariables: augmentation must have matching type params.
		interface Matchers<R, T> extends ImageSnapshotMatcher {}
	}
}
