import type { Plugin } from 'vitest/config'
import './augment.js'
import { copyFile } from './server/commands/copy_file.js'
import { existDir } from './server/commands/exist_dir.js'
import { existFile } from './server/commands/exist_file.js'
import { getSnapshotPlatform } from './server/commands/get_snapshot_platform.js'
import { imageSnapshot } from './server/commands/image_snapshot.js'
import { isCI } from './server/commands/is_ci.js'
import { rmDir } from './server/commands/rm_dir.js'
import { serverVisConext } from './server/vis_context.js'
import type { VisOptions } from './shared/types.js'

export function storybookVis(options?: VisOptions) {
	serverVisConext.customizeSnapshotSubpath = options?.customizeSnapshotSubpath
	serverVisConext.state.snapshotRootDir = options?.snapshotRootDir
	serverVisConext.state.timeout = options?.timeout
	return {
		name: 'vitest:storybook-addon-vis',
		config() {
			return {
				test: {
					browser: {
						name: 'chromium',
						commands: {
							existDir,
							existFile,
							copyFile,
							rmDir,
							isCI,
							getSnapshotPlatform,
							imageSnapshot,
						},
					},
				},
			}
		},
	} satisfies Plugin
}
