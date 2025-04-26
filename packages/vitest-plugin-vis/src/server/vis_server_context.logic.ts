import { join, resolve } from 'pathe'
import { pick } from 'type-plus'
import { file } from './externals/file.ts'
import { getSuite, getTaskSubpath } from './suite.ts'
import { getVisOption } from './vis_options.ts'
import type { PartialBrowserCommandContext } from './vis_server_context.types.ts'

export function createVisServerContext() {
	const context = {
		async getSnapshotInfo(
			browserContext: PartialBrowserCommandContext,
			name: string,
			isAutoSnapshot: boolean,
			options?: { snapshotFileId?: string | undefined },
		) {
			const suiteInfo = await context.getSuiteInfo(browserContext, name)
			const snapshotFilename = context.getSnapshotFilename(
				browserContext,
				suiteInfo,
				options?.snapshotFileId,
				isAutoSnapshot,
			)

			const { baselineDir, resultDir, diffDir, task } = suiteInfo

			task.count = task.count + 1
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
		async getTaskCount(browserContext: PartialBrowserCommandContext, taskId: string) {
			return (await context.getSuiteInfo(browserContext, taskId)).task.count
		},
		async hasImageSnapshot(
			browserContext: PartialBrowserCommandContext,
			taskId: string,
			snapshotFileId: string | undefined,
			isAutoSnapshot: boolean,
		) {
			const info = await context.getSuiteInfo(browserContext, taskId)

			return file.existFile(
				resolve(
					info.projectRoot,
					info.baselineDir,
					context.getSnapshotFilename(browserContext, info, snapshotFileId, isAutoSnapshot),
				),
			)
		},
		getSnapshotFilename(
			browserContext: PartialBrowserCommandContext,
			info: { taskId: string; task: { count: number } },
			snapshotFileId: string | undefined,
			isAutoSnapshot: boolean,
		) {
			if (snapshotFileId) return `${snapshotFileId}.png`
			const customizeSnapshotId =
				getVisOption(browserContext).customizeSnapshotId ?? (({ id, index }) => `${id}-${index}`)
			return `${customizeSnapshotId({
				id: info.taskId,
				index: info.task.count,
				isAutoSnapshot,
			})}.png`
		},
		async getSuiteInfo(browserContext: PartialBrowserCommandContext, taskId: string) {
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
