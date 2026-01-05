import type { BrowserCommands } from 'vitest/browser'
import { assertSnapshotKeyWithoutDash } from '../../shared/asserts.ts'
import { isBase64String } from '../../shared/base64.ts'
import type {
	ImageSnapshotNextIndexCommand,
	PrepareImageSnapshotComparisonCommand,
} from '../../shared/commands.types.ts'
import type { ToMatchImageSnapshotOptions } from '../../shared/types.ts'
import { convertElementToCssSelector } from '../external/browser/selector.ts'
import { compareImageSnapshot } from '../snapshot/compare_image_snapshot.ts'

export async function matchImageSnapshotAction(
	commands: BrowserCommands & PrepareImageSnapshotComparisonCommand & ImageSnapshotNextIndexCommand,
	taskId: string,
	subject: any,
	options?: ToMatchImageSnapshotOptions<any>,
) {
	assertSnapshotKeyWithoutDash(options?.snapshotKey)

	if (options?.mask) {
		options.mask = options.mask.map((mask) => {
			if (mask instanceof Element) return convertElementToCssSelector(mask)
			if (typeof mask === 'string') return mask
			if ('selector' in mask) return mask.selector
			throw new Error(`The mask option expects an element, locator, or selector string, but got: ${mask}`)
		})
	}

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
