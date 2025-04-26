import { hasImageSnapshotAction, type ImageSnapshotKeyOptions } from 'vitest-plugin-vis/client-api'
import { ctx } from './ctx.ts'
import { commands } from './vitest_proxy.ts'

/**
 * Check if the snapshot image exists.
 */
export function hasImageSnapshot(options?: ImageSnapshotKeyOptions | undefined) {
	const test = ctx.getCurrentTest()
	if (!test) return false

	return hasImageSnapshotAction(commands, test, options)
}
