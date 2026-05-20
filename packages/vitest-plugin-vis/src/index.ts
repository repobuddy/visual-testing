// `vitest-plugin-vis` provides code that can be used in test files.
import type { ImageSnapshotMatcher } from './client/expect/to_match_image_snapshot.types.ts'
import type { HasImageSnapshotAction } from './client/page/has_image_snapshot.ts'
import type { ToMatchImageSnapshotAction } from './client/page/to_match_image_snapshot.ts'

declare global {
	namespace jest {
		interface Matchers<R, T> extends ImageSnapshotMatcher {}
	}
}

declare module '@vitest/browser/context' {
	interface BrowserPage extends HasImageSnapshotAction, ToMatchImageSnapshotAction {}
}

export * from './auto_snapshots/auto_snapshot_options.ts'
export type * from './shared/types.ts'
