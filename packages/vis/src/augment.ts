///  <reference types="@vitest/browser/context" />

import type { ImageSnapshot, ImageSnapshotOptions, MatchImageSnapshotOptions } from './@vitest/browser/types'

declare module '@vitest/browser/context' {
	interface BrowserPage {
		imageSnapshot(this: BrowserPage, options?: ImageSnapshotOptions): Promise<ImageSnapshot>
	}
	interface BrowserCommands {
		existDir: (path: string) => Promise<boolean>
		copyFile: (src: string, dest: string) => Promise<void>
		rmDir: (path: string) => Promise<void>
		isCI: () => Promise<boolean>
		/**
		 * Get the platform id of the snapshot `{platform}[-ci]`.
		 *
		 * This is useful to control where the snapshot is stored.
		 */
		getSnapshotPlatform: () => Promise<string>
		/**
		 * Check if there are any snapshot baselines for the specified snapshotId.
		 */
		hasSnapshot: (baselineDir: string, snapshotId: string) => Promise<boolean>
	}
}

declare global {
	namespace jest {
		// biome-ignore lint/correctness/noUnusedVariables: augmentation must have matching type params.
		interface Matchers<R, T> {
			toMatchImageSnapshot(options?: MatchImageSnapshotOptions): Promise<void>
		}
	}
}
