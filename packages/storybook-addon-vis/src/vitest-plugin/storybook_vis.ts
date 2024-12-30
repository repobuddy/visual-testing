import { vis } from 'vitest-plugin-vis/config'
import type { Plugin } from 'vitest/config'
import { copyFile } from '../server/commands/copy_file.ts'
import { existDir } from '../server/commands/exist_dir.ts'
import { existFile } from '../server/commands/exist_file.ts'
import { getSnapshotPlatform } from '../server/commands/get_snapshot_platform.ts'
import { imageSnapshot } from '../server/commands/image_snapshot.ts'
import { isCI } from '../server/commands/is_ci.ts'
import { matchImageSnapshot } from '../server/commands/match_image_snapshot.ts'
import { rmDir } from '../server/commands/rm_dir.ts'
import { setupVisSuite } from '../server/commands/setup_vis_suite.ts'
import { visContext } from '../server/vis_context.ts'
import { NAME } from '../shared/contants.ts'
import type { VisOptions } from '../shared/types.ts'

export function storybookVis(options: VisOptions = {}) {
	visContext.setOptions(options)
	const p = vis({ preset: 'none' })
	return {
		name: NAME,
		config() {
			return {
				test: {
					browser: {
						name: undefined as unknown as string,
						commands: {
							...p.config().test.browser.commands,
							existDir,
							existFile,
							copyFile,
							rmDir,
							isCI,
							getSnapshotPlatform,
							setupVisSuite,
							matchImageSnapshot,
							imageSnapshot,
						},
					},
				},
			}
		},
	} satisfies Plugin
}
