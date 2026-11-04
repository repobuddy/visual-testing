import type { BrowserCommands } from 'vitest/browser'
import { assertSnapshotKeyWithoutDash } from '../../shared/asserts.ts'
import { isBase64String } from '../../shared/base64.ts'
import type {
	ImageSnapshotNextIndexCommand,
	PrepareImageSnapshotComparisonCommand,
} from '../../shared/commands.types.ts'
import type { ToMatchImageSnapshotOptions } from '../../shared/types.ts'
import { settleAnimations } from '../animations/settle_animations.ts'
import { convertElementToCssSelector } from '../external/browser/selector.ts'
import { normalizeMaskOptions } from '../mask.ts'
import { compareImageSnapshot } from '../snapshot/compare_image_snapshot.ts'

export async function matchImageSnapshotAction(
	commands: BrowserCommands & PrepareImageSnapshotComparisonCommand & ImageSnapshotNextIndexCommand,
	taskId: string,
	subject: any,
	rawOptions?: ToMatchImageSnapshotOptions<any>,
) {
	const options = normalizeMaskOptions(rawOptions)
	assertSnapshotKeyWithoutDash(options?.snapshotKey)

	settleAnimations(options)
	const info = await commands.prepareImageSnapshotComparison(taskId, parseImageSnapshotSubject(subject), options)

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
