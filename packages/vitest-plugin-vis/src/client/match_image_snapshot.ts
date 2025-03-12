import type { BrowserCommands } from '@vitest/browser/context'
import type { ImageSnapshotNextIndexCommand } from '../commands.ts'
import type { PrepareImageSnapshotComparisonCommand } from '../server/commands/prepare_image_snapshot_comparison.ts'
import { isBase64String } from '../shared/base64.ts'
import type { ToMatchImageSnapshotOptions } from '../shared/types.ts'
import { compareImageSnapshot } from './compare_image_snapshot.ts'
import { convertElementToCssSelector } from './selector.ts'
import { toTaskId } from './task_id.ts'
import type { CurrentTest } from './vitest_suite_proxy.ts'

export async function matchImageSnapshot(
	commands: BrowserCommands & PrepareImageSnapshotComparisonCommand & ImageSnapshotNextIndexCommand,
	test: CurrentTest & {},
	subject: any,
	options?: ToMatchImageSnapshotOptions<any>,
) {
	const isAutoSnapshot = !!test.meta.vis?.isAutoSnapshot
	const taskId = toTaskId(test)
	const info = await commands.prepareImageSnapshotComparison(
		taskId,
		parseImageSnapshotSubject(subject),
		isAutoSnapshot,
		options?.customizeSnapshotId ? await parseImageSnapshotOptions(commands, taskId, isAutoSnapshot, options) : options,
	)

	if (!info) return

	return compareImageSnapshot(commands, taskId, info, options)
}

function parseImageSnapshotSubject(subject: any) {
	if (subject instanceof Element) return convertElementToCssSelector(subject)
	if (subject?.['selector']) return subject['selector']
	if (isBase64String(subject)) return subject
	throw new Error(
		`'toMatchImageSnapshot()' expects the subject to be an element, locator, or image encoded in base64 string, but got: ${subject}`,
	)
}

async function parseImageSnapshotOptions(
	commands: ImageSnapshotNextIndexCommand,
	taskId: string,
	isAutoSnapshot: boolean,
	options: ToMatchImageSnapshotOptions<any>,
) {
	const index = await commands.imageSnapshotNextIndex(taskId)
	const { customizeSnapshotId, ...rest } = options
	const snapshotFileId = customizeSnapshotId!({ id: taskId, index, isAutoSnapshot })
	return { ...rest, snapshotFileId }
}
