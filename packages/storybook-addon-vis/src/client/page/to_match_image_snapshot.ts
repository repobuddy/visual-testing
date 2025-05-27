import {
	type ComparisonMethod,
	type ToMatchPageImageSnapshotOptions,
	matchPageImageSnapshotAction,
	toTaskId,
} from 'vitest-plugin-vis/client-api'
import { commands, getCurrentTest } from '../vitest_proxy.ts'

export function toMatchImageSnapshot<M extends ComparisonMethod = 'pixel'>(
	options?: ToMatchPageImageSnapshotOptions<M> | undefined,
) {
	const test = getCurrentTest()

	/* v8 ignore start: stub as success when not in a test (e.g. in a story) */
	if (!test) return Promise.resolve()
	/* v8 ignore end */

	return matchPageImageSnapshotAction(commands, toTaskId(test), options)
}
