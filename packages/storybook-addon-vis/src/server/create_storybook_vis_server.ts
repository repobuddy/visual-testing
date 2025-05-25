import { globSync } from 'glob'
import ci from 'is-ci'
import memoize from 'memoize'
import { platform } from 'node:process'
import { resolve } from 'pathe'
import { toTaskId } from 'vitest-plugin-vis/client-api'
import { trimCommonFolder } from 'vitest-plugin-vis/config'
import { BASELINE_DIR, DIFF_DIR, RESULT_DIR, SNAPSHOT_ROOT_DIR } from 'vitest-plugin-vis/server-api'
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
					const taskGlob = `${toTaskId({ name })}-*.png`
					const baselineGlob = resolve(snapshotRootDir, BASELINE_DIR, snapshotSubpath, taskGlob)
					const resultGlob = resolve(snapshotRootDir, RESULT_DIR, snapshotSubpath, taskGlob)
					const diffGlob = resolve(snapshotRootDir, DIFF_DIR, snapshotSubpath, taskGlob)

					const baselineFiles = globSync(baselineGlob)
					const resultFiles = globSync(resultGlob)
					const diffFiles = globSync(diffGlob)
					return {
						baselineGlob,
						resultGlob,
						diffGlob,
						baselineFiles,
						resultFiles,
						diffFiles,
					}
				})
		},
	}
}
