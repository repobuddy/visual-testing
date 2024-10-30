import { readdir } from 'node:fs/promises'
import { dirname, join } from 'pathe'
import type { BrowserCommand } from 'vitest/node'
import { isDirExists } from './exist_dir'

export const hasSnapshot: BrowserCommand<[baselineDir: string, snapshotId: string]> = async (
	{ testPath },
	baselineDir,
	snapshotId,
) => {
	const baseline = join(dirname(testPath), baselineDir)
	if (!(await isDirExists(baseline))) return false

	const files = await readdir(baseline)
	return files.some((file) => file.match(new RegExp(`^${snapshotId}-(\\d+)\\.png$`)))
}
