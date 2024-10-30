import { stat } from 'node:fs/promises'
import { dirname, join } from 'pathe'
import type { BrowserCommand } from 'vitest/node'

export const existDir: BrowserCommand<[path: string]> = async ({ testPath, provider }, path) => {
	if (provider.name === 'playwright') {
		return isDirExists(join(dirname(testPath), path))
	}

	throw new Error(`provider ${provider.name} is not supported`)
}

export function isDirExists(path: string): Promise<boolean> {
	return stat(path)
		.then((s) => s.isDirectory())
		.catch(() => false)
}
