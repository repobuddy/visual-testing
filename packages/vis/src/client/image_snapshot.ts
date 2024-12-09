import { getCurrentTest } from 'vitest/suite'
import type { ImageSnapshot, ImageSnapshotOptions } from '../shared/types.ts'
import { commands } from './@vitest/browser/context.ts'

export function imageSnapshot(options?: ImageSnapshotOptions | undefined): Promise<ImageSnapshot> {
	const name = getCurrentTest()!.name
	return commands.imageSnapshot(name, options)
}
