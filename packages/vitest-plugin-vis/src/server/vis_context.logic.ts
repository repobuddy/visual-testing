import { join, relative } from 'pathe'
import type { VisOptions } from '../config/types.ts'
import { getSnapshotSubpath } from './snapshot_path.ts'
import type { VisState } from './vis_context.types.ts'

export function getSuiteId(state: VisState, testPath: string, options: VisOptions) {
	return getSnapshotSubpath(relative(state.projectPath, testPath), options)
}

export function createSuite(state: VisState, testPath: string, options: VisOptions) {
	const suiteId = getSuiteId(state, testPath, options)
	return {
		suiteId,
		suite: {
			baselineDir: join(state.snapshotBaselineDir, suiteId),
			resultDir: join(state.snapshotResultDir, suiteId),
			diffDir: join(state.snapshotDiffDir, suiteId),
			tasks: {},
		},
	}
}
