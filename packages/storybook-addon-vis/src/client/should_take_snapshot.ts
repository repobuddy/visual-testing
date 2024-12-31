import { getAutoSnapshotOptions, shouldTakeSnapshot as sts } from 'vitest-plugin-vis/client'
import { getCurrentTest } from 'vitest/suite'

/**
 * Determine should snapshot be taken.
 *
 * not story: false
 * no `snapshot` tag: false
 * disabled by `!snapshot` tag: false
 */
export function shouldTakeSnapshot() {
	return sts(getAutoSnapshotOptions(getCurrentTest()))
}
