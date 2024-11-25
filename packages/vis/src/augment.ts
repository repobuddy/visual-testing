///  <reference types="@vitest/browser/context" />

import type { HasImageSnapshotAction } from './client/@vitest/browser/page.has_image_snapshot'
import type { ImageSnapshotAction } from './client/@vitest/browser/page.image_snapshot'
import type { ImageSnapshotMatcher } from './client/expect.to_match_image_snapshot'
import type { CopyFileCommand } from './server/commands/copy_file'
import type { ExistDirCommand } from './server/commands/exist_dir'
import type { ExistFileCommand } from './server/commands/exist_file'
import type { GetSnapshotPlatformCommand } from './server/commands/get_snapshot_platform'
import type { IsCICommand } from './server/commands/is_ci'
import type { RmDirCommand } from './server/commands/rm_dir'

declare module '@vitest/browser/context' {
	interface BrowserPage extends ImageSnapshotAction, HasImageSnapshotAction {}
	interface BrowserCommands
		extends CopyFileCommand,
			ExistDirCommand,
			GetSnapshotPlatformCommand,
			RmDirCommand,
			IsCICommand,
			ExistFileCommand {}
}

declare global {
	namespace jest {
		// biome-ignore lint/correctness/noUnusedVariables: augmentation must have matching type params.
		interface Matchers<R, T> extends ImageSnapshotMatcher {}
	}
}
