import { expect } from 'vitest'
import { toMatchImageSnapshot } from './to_match_image_snapshot.ts'
import type { ImageSnapshotMatcher } from './to_match_image_snapshot.types.ts'

declare global {
	namespace jest {
		// biome-ignore lint/correctness/noUnusedVariables: augmentation must have matching type params.
		interface Matchers<R, T> extends ImageSnapshotMatcher {}
	}
}

expect.extend({ toMatchImageSnapshot })
