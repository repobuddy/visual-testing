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
					const taskGlob = `${name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-*.png`
					const baselineGlob = resolve(snapshotRootDir, BASELINE_DIR, snapshotSubpath, taskGlob)
					const diffGlob = resolve(snapshotRootDir, DIFF_DIR, snapshotSubpath, taskGlob)

					const baselineFiles = globSync(baselineGlob)
					const diffFiles = globSync(diffGlob)
					return [
						...baselineFiles.map((filePath) => ({
							filePath,
							fileName: basename(filePath),
							snapshotRootDir,
							type: 'baseline',
							base64: readFileSync(filePath, 'base64'),
						})),
						...diffFiles.map((filePath) => ({
							filePath,
							fileName: basename(filePath),
							snapshotRootDir,
							type: 'diff',
							base64: readFileSync(filePath, 'base64'),
						})),
					]
				})
		},
	}
}
