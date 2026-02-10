import type { BrowserCommands } from 'vitest/browser'
import { assertSnapshotKeyWithoutDash } from '../../shared/asserts.ts'
import { isBase64String } from '../../shared/base64.ts'
import type { PrepareImageSnapshotComparisonCommand } from '../../shared/commands.types.ts'
import type { ToMatchImageSnapshotOptions } from '../../shared/types.ts'
import { convertElementToCssSelector } from '../external/browser/selector.ts'
import { compareImageSnapshot } from '../snapshot/compare_image_snapshot.ts'

export async function matchImageSnapshotAction(
	commands: BrowserCommands,
	taskId: string,
	subject: any,
	options?: ToMatchImageSnapshotOptions<any>,
) {
	assertSnapshotKeyWithoutDash(options?.snapshotKey)

	const withPrepare = commands as BrowserCommands & PrepareImageSnapshotComparisonCommand
	const info = await withPrepare.prepareImageSnapshotComparison(taskId, parseImageSnapshotSubject(subject), options)

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
