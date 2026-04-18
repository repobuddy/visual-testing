import { basename, join, resolve } from 'pathe'
import { pick } from 'type-plus'
import type { ImageSnapshotKeyOptions } from '../client-api.ts'
import type { ImageSnapshotResult } from '../shared/commands.types.ts'
import { file } from './externals/file.ts'
import { absoluteSnapshotFilePath, getLegacySnapshotFilename } from './snapshot_path_limits.ts'
import { getSuite, getTaskSubpath } from './suite.ts'
import { getVisOption } from './vis_options.ts'
import type { ExtendedBrowserCommandContext } from './vis_server_context.types.ts'

export function createVisServerContext() {
	const context = {
		async getSnapshotResults(browserContext: ExtendedBrowserCommandContext, taskId: string) {
			const suiteInfo = await context.getSuiteInfo(browserContext, taskId)
			const base = resolve(suiteInfo.projectRoot, suiteInfo.baselineDir)

			const legacyPattern = join(base, `${suiteInfo.taskId}-*.png`)
			const baselines = await file.glob(legacyPattern)

			const resultPattern = join(resolve(suiteInfo.projectRoot, suiteInfo.resultDir), `${suiteInfo.taskId}-*.png`)
			const results = await file.glob(resultPattern)

			const diffPattern = join(resolve(suiteInfo.projectRoot, suiteInfo.diffDir), `${suiteInfo.taskId}-*.png`)
			const diffs = await file.glob(diffPattern)

			const r: ImageSnapshotResult[] = []
			await Promise.all(
				baselines.map(async (baselinePath) => {
					const filename = basename(baselinePath)
					const resultPath = results.find((p) => p.endsWith(filename))
					const diffPath = diffs.find((p) => p.endsWith(filename))

					const baselineBuffer = await file.tryReadFile(baselinePath)
					const resultBuffer = await file.tryReadFile(resultPath)
					const diffBuffer = await file.tryReadFile(diffPath)
					r.push({
						filename,
						baseline: baselineBuffer?.toString('base64'),
						result: resultBuffer?.toString('base64'),
						diff: diffBuffer?.toString('base64'),
					})
				}),
			)
			return r
		},
		async getSnapshotInfo(
			browserContext: ExtendedBrowserCommandContext,
			taskId: string,
			options?: ImageSnapshotKeyOptions,
		) {
			const suiteInfo = await context.getSuiteInfo(browserContext, taskId)
			const snapshotFilename = context.getSnapshotFilename(browserContext, suiteInfo, options?.snapshotKey)

			const { baselineDir, resultDir, diffDir, task } = suiteInfo

			task.count += 1
			const baselinePath = join(baselineDir, snapshotFilename)
			const resultPath = join(resultDir, snapshotFilename)
			const diffPath = join(diffDir, snapshotFilename)

			return {
				...pick(
					getVisOption(browserContext),
					'comparisonMethod',
					'diffOptions',
					'failureThreshold',
					'failureThresholdType',
					'timeout',
				),
				baselinePath,
				resultPath,
				diffPath,
			}
		},

		async getTaskCount(browserContext: ExtendedBrowserCommandContext, taskId: string) {
			return (await context.getSuiteInfo(browserContext, taskId)).task.count
		},
		async hasImageSnapshot(
			browserContext: ExtendedBrowserCommandContext,
			taskId: string,
			snapshotKey: string | undefined,
		) {
			const info = await context.getSuiteInfo(browserContext, taskId)
			const visOptions = getVisOption(browserContext)
			const legacyFilename = getLegacySnapshotFilename({
				taskId: info.taskId,
				explicitSnapshotKey: snapshotKey,
				defaultSnapshotKey: typeof visOptions.snapshotKey === 'string' ? visOptions.snapshotKey : undefined,
				taskCount: info.task.count,
			})
			const legacyAbs = absoluteSnapshotFilePath(info.projectRoot, info.baselineDir, legacyFilename)
			return file.existFile(legacyAbs)
		},
		getSnapshotFilename(
			browserContext: ExtendedBrowserCommandContext,
			info: { taskId: string; task: { count: number }; suiteId: string; baselineDir: string; projectRoot: string },
			snapshotKey: string | undefined,
		) {
			const visOptions = getVisOption(browserContext)
			return getLegacySnapshotFilename({
				taskId: info.taskId,
				explicitSnapshotKey: snapshotKey,
				defaultSnapshotKey: typeof visOptions.snapshotKey === 'string' ? visOptions.snapshotKey : undefined,
				taskCount: info.task.count,
			})
		},
		async getSuiteInfo(browserContext: ExtendedBrowserCommandContext, taskId: string) {
			const projectState = await getSuite(browserContext)
			const visOptions = getVisOption(browserContext)
			const moduleId = getTaskSubpath(projectState, browserContext.testPath, visOptions)
			const m = projectState.modules[moduleId]!
			const task = (m.tasks[taskId] = m.tasks[taskId] ?? { count: 1 })
			return {
				projectRoot: projectState.projectRoot,
				suiteId: moduleId,
				taskId,
				baselineDir: m.baselineDir,
				resultDir: m.resultDir,
				diffDir: m.diffDir,
				task,
			}
		},
	}
	return context
}
