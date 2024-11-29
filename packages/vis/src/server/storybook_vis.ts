import type { Plugin } from 'vitest/config'
import '../augment.js'
import type { VisOptions } from '../shared/types.js'
import { copyFile } from './commands/copy_file.js'
import { existDir } from './commands/exist_dir.js'
import { existFile } from './commands/exist_file.js'
import { getSnapshotPlatform } from './commands/get_snapshot_platform.js'
import { isCI } from './commands/is_ci.js'
import { rmDir } from './commands/rm_dir.js'
import { setupVisSuite } from './commands/setup_vis_suite.js'
import { visContext } from './vis_context.js'

export function storybookVis(options: VisOptions = {}) {
	visContext.setOptions(options)
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
							setupVisSuite,
						},
					},
				},
			}
		},
	} satisfies Plugin
}
