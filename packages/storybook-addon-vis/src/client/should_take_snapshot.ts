import { shouldTakeSnapshot as sts } from 'vitest-plugin-vis/client'

/**
 * Determine should snapshot be taken.
 *
 * not story: false
 * no `snapshot` tag: false
 * disabled by `!snapshot` tag: false
 */
export function shouldTakeSnapshot() {
	return sts()
}
