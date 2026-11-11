import { readFileSync } from 'node:fs'
import { platform } from 'node:process'
import { globSync } from 'glob'
import ci from 'is-ci'
import { basename, resolve } from 'pathe'
import {
	BASELINE_DIR,
	DIFF_DIR,
	getSnapshotSubpath,
	RESULT_DIR,
	REVIEW_IMAGE_SUFFIX,
	resolveSnapshotRootDirOption,
	resolveSnapshotSubpathWithinLimits,
	SNAPSHOT_ROOT_DIR,
} from 'vitest-plugin-vis/server-utils'
import type { ImageSnapshotResults } from '../shared/events.ts'
import type { StorybookVisOptions } from './types.ts'

export function createStorybookVisServer(options: StorybookVisOptions) {
	const visSuites = options.visProjects ?? [{}]
	return {
		options,
		async getImageSnapshotResults(name: string, importPath: string) {
			return visSuites
				.map((suite) => {
					const snapshotRootDir = resolveSnapshotRootDirOption(suite.snapshotRootDir, () => ({
						ci,
						rootDir: SNAPSHOT_ROOT_DIR,
						platform,
						projectName: suite.projectName,
						browserName: suite.browserName,
						providerName: suite.providerName,
						screenshotFailures: undefined,
						screenshotDirectory: undefined,
					}))
					const snapshotSubpathRaw = getSnapshotSubpath(importPath, suite)
					const snapshotBaselineRootAbs = resolve(snapshotRootDir, BASELINE_DIR)
					const snapshotSubpath = resolveSnapshotSubpathWithinLimits({
						snapshotBaselineRootAbs,
						rawSnapshotSubpath: snapshotSubpathRaw,
						shortenLongSnapshotPaths: suite.shortenLongSnapshotPaths === true,
					})
					return {
						snapshotRootDir,
						snapshotSubpath,
					}
				})
				.flatMap(({ snapshotRootDir, snapshotSubpath }) => {
					const taskId = name.replace(/[^a-z0-9]/gi, '-').toLowerCase()
					const taskGlob = `${taskId}-*.png`
					const baselineGlob = resolve(snapshotRootDir, BASELINE_DIR, snapshotSubpath, taskGlob)
					const resultGlob = resolve(snapshotRootDir, RESULT_DIR, snapshotSubpath, taskGlob)
					const diffGlob = resolve(snapshotRootDir, DIFF_DIR, snapshotSubpath, taskGlob)

					const taskIdRegex = new RegExp(`${taskId}-[^-]*.png$`)
					const isSnapshotFile = (filePath: string) =>
						taskIdRegex.test(filePath) && !filePath.endsWith(REVIEW_IMAGE_SUFFIX)
					const baselineFiles = globSync(baselineGlob).filter(isSnapshotFile)
					const resultFiles = globSync(resultGlob).filter(isSnapshotFile)
					const diffFiles = globSync(diffGlob).filter(isSnapshotFile)
					return [
						...baselineFiles.map((filePath) => mapFileToResult(filePath, snapshotRootDir, 'baseline')),
						...resultFiles.map((filePath) => mapFileToResult(filePath, snapshotRootDir, 'result')),
						...diffFiles.map((filePath) => mapFileToResult(filePath, snapshotRootDir, 'diff')),
					]
				})
		},
	}
}

function mapFileToResult(
	filePath: string,
	snapshotRootDir: string,
	type: ImageSnapshotResults['type'],
): ImageSnapshotResults {
	return {
		filePath,
		fileName: basename(filePath),
		snapshotRootDir,
		type,
		base64: readFileSync(filePath, 'base64'),
	}
}
