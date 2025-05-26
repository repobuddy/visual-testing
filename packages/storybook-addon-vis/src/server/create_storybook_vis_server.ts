import { globSync } from 'glob'
import ci from 'is-ci'
import memoize from 'memoize'
import { readFileSync } from 'node:fs'
import { platform } from 'node:process'
import { basename, resolve } from 'pathe'
import { BASELINE_DIR, DIFF_DIR, SNAPSHOT_ROOT_DIR, trimCommonFolder } from 'vitest-plugin-vis/server-utils'
import type { StorybookVisOptions } from './vis_options.ts'

export function createStorybookVisServer(options: StorybookVisOptions) {
	const visSuites = options.visSuites ?? [{ snapshotRootDir: SNAPSHOT_ROOT_DIR }]
	return {
		options,
		async getImageSnapshotResults(name: string, importPath: string) {
			return visSuites
				.map((suite) => {
					const snapshotRootDir =
						(typeof suite.snapshotRootDir === 'function'
							? memoize(suite.snapshotRootDir)({
									ci,
									platform,
								})
							: suite.snapshotRootDir) ?? SNAPSHOT_ROOT_DIR
					const snapshotSubpathFn =
						typeof suite.snapshotSubpath === 'function'
							? memoize(suite.snapshotSubpath)
							: memoize(({ subpath }: { subpath: string }) =>
									trimCommonFolder(subpath.startsWith('./') ? subpath.slice(2) : subpath),
								)
					const snapshotSubpath = snapshotSubpathFn({ subpath: importPath })
					return {
						snapshotRootDir,
						snapshotSubpath,
					}
				})
				.flatMap(({ snapshotRootDir, snapshotSubpath }) => {
					const taskId = name.replace(/[^a-z0-9]/gi, '-').toLowerCase()
					const taskGlob = `${taskId}-*.png`
					const baselineGlob = resolve(snapshotRootDir, BASELINE_DIR, snapshotSubpath, taskGlob)
					const diffGlob = resolve(snapshotRootDir, DIFF_DIR, snapshotSubpath, taskGlob)

					const taskIdRegex = new RegExp(`${taskId}-[^-]*.png$`)
					const baselineFiles = globSync(baselineGlob).filter((filePath) => taskIdRegex.test(filePath))
					const diffFiles = globSync(diffGlob).filter((filePath) => taskIdRegex.test(filePath))
					return [
						...baselineFiles.map((filePath) => mapFileToResult(filePath, snapshotRootDir, 'baseline')),
						...diffFiles.map((filePath) => mapFileToResult(filePath, snapshotRootDir, 'diff')),
					]
				})
		},
	}
}

function mapFileToResult(filePath: string, snapshotRootDir: string, type: 'baseline' | 'diff') {
	return {
		filePath,
		fileName: basename(filePath),
		snapshotRootDir,
		type,
		base64: readFileSync(filePath, 'base64'),
	}
}
