///  <reference types="@vitest/browser/context" />

import type { ImageSnapshotMatcher } from 'vitest-plugin-vis/client-api'

declare global {
	namespace jest {
		interface Matchers<R, T> extends ImageSnapshotMatcher {}
	}
}
