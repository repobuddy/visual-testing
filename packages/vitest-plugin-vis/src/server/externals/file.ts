import { glob, type GlobOptionsWithFileTypesUnset } from 'glob'
import { mkdirp } from 'mkdirp'
import { readFile, stat, writeFile } from 'node:fs/promises'

export const file = {
	existFile(filePath: string) {
		return stat(filePath)
			.then((s) => s.isFile())
			.catch(() => false)
	},
	glob(pattern: string | string[], options?: GlobOptionsWithFileTypesUnset | undefined) {
		return glob(pattern, options)
	},
	mkdirp: mkdirp as (path: string) => Promise<string | undefined>,
	async tryReadFile(filePath: string | undefined): Promise<Buffer | undefined> {
		if (!filePath) return undefined

		return readFile(filePath).catch(() => undefined)
	},
	writeFile,
}
