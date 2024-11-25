import type { Plugin } from 'vitest/config'
import './augment.js'
import { copyFile } from './server/commands/copy_file.js'
import { existDir } from './server/commands/exist_dir.js'
import { existFile } from './server/commands/exist_file.js'
import { getSnapshotPlatform } from './server/commands/get_snapshot_platform.js'
import { isCI } from './server/commands/is_ci.js'
import { rmDir } from './server/commands/rm_dir.js'

export type * from './shared/types.js'

export function storybookVis() {
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
						},
					},
				},
			}
		},
	} satisfies Plugin
}
