///  <reference types="@vitest/browser/context" />

import type { HasImageSnapshotAction } from './@vitest/browser/page.has_image_snapshot'
import type { ImageSnapshotAction } from './@vitest/browser/page.image_snapshot'
import type { ImageSnapshotMatcher } from './expect.to_match_image_snapshot'
import type { CopyFileCommand } from './server/commands/copy_file'
import type { ExistDirCommand } from './server/commands/exist_dir'
import type { ExistFileCommand } from './server/commands/exist_file'
import type { GetSnapshotPlatformCommand } from './server/commands/get_snapshot_platform'
import type { GetVisStateCommand } from './server/commands/get_vis_state'
import type { ImageSnapshotCommand } from './server/commands/image_snapshot'
import type { IsCICommand } from './server/commands/is_ci'
import type { RmDirCommand } from './server/commands/rm_dir'

declare module '@vitest/browser/context' {
	interface BrowserPage extends ImageSnapshotAction, HasImageSnapshotAction {}
	interface BrowserCommands
		extends CopyFileCommand,
			ExistDirCommand,
			GetSnapshotPlatformCommand,
			RmDirCommand,
			ImageSnapshotCommand,
			GetVisStateCommand,
			IsCICommand,
			ExistFileCommand {}
}

declare global {
	namespace jest {
		// biome-ignore lint/correctness/noUnusedVariables: augmentation must have matching type params.
		interface Matchers<R, T> extends ImageSnapshotMatcher {}
	}
}
