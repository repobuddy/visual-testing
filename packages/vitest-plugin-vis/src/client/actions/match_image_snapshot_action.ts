import type { BrowserCommands } from '@vitest/browser/context'
import type { ImageSnapshotNextIndexCommand } from '../../commands.ts'
import type { PrepareImageSnapshotComparisonCommand } from '../../server/commands/prepare_image_snapshot_comparison.ts'
import { assertSnapshotKeyWithoutDash } from '../../shared/asserts.ts'
import { isBase64String } from '../../shared/base64.ts'
import type { ToMatchImageSnapshotOptions } from '../../shared/types.ts'
import { compareImageSnapshot } from '../compare_image_snapshot.ts'
import { convertElementToCssSelector } from '../selector.ts'

export async function matchImageSnapshotAction(
	commands: BrowserCommands & PrepareImageSnapshotComparisonCommand & ImageSnapshotNextIndexCommand,
	taskId: string,
	subject: any,
	options?: ToMatchImageSnapshotOptions<any>,
) {
	assertSnapshotKeyWithoutDash(options?.snapshotKey)

	const info = await commands.prepareImageSnapshotComparison(taskId, parseImageSnapshotSubject(subject), options)

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
