import { commands } from '@vitest/browser/context'
import type { AsyncExpectationResult } from '@vitest/expect'
import type { PixelmatchOptions } from 'pixelmatch'
import { isBase64String } from '../../shared/base64.ts'
import type { ImageSnapshotIdOptions } from '../../shared/types.ts'
import { ctx } from '../ctx.ts'
import { convertElementToCssSelector } from '../selector.ts'
import { toTaskId } from '../task_id.ts'
import { success } from './expectation_result.ts'

export interface ImageSnapshotMatcher {
	toMatchImageSnapshot(options?: ToMatchImageSnapshotOptions | undefined): Promise<void>
}

export interface ToMatchImageSnapshotOptions extends ImageSnapshotIdOptions {
	/**
	 * Custom options passed to 'pixelmatch'
	 */
	diffOptions?: PixelmatchOptions | undefined
	/**
	 * Failure threshold should measure in `pixel` or `percent`.
	 *
	 * Default is `pixel`.
	 */
	failureThresholdType?: 'pixel' | 'percent' | undefined
	/**
	 * Failure tolerance threshold.
	 *
	 * Default is `0`.
	 */
	failureThreshold?: number | undefined
	/**
	 * Timeout for taking the snapshot.
	 *
	 * Default: 30000
	 */
	timeout?: number | undefined
}

export function toMatchImageSnapshot(
	/**
	 * The element or locator to take the snapshot of,
	 * or the base64 value of the image to compare against.
	 */
	subject: any,
	options?: ToMatchImageSnapshotOptions | undefined,
): AsyncExpectationResult {
	const test = ctx.getCurrentTest()
	if (!test) return Promise.resolve(success)

	const s = parseSubject(subject)
	if (!s) {
		throw new Error(
			`'toMatchImageSnapshot()' expects the subject to be an element, locator, or image encoded in base64 string, but got: ${subject}`,
		)
	}

	const taskId = toTaskId(test)
	return toMatchImageSnapshotAsync(taskId, s, options).then(() => success)
}

async function toMatchImageSnapshotAsync(taskId: string, subject: string, options?: ToMatchImageSnapshotOptions) {
	if (options?.customizeSnapshotId) {
		const index = await commands.imageSnapshotNextIndex(taskId)
		const { customizeSnapshotId, ...rest } = options
		const snapshotFileId = customizeSnapshotId(taskId, index)
		return commands.matchImageSnapshot(taskId, subject, { ...rest, snapshotFileId })
	}

	return commands.matchImageSnapshot(taskId, subject, options)
}

function parseSubject(subject: any) {
	if (subject instanceof Element) return convertElementToCssSelector(subject)
	if (subject?.['selector']) return subject['selector']
	if (isBase64String(subject)) return subject
	return undefined
}
