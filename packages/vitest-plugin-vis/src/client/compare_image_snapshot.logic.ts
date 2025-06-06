import type { ToMatchImageSnapshotOptions } from '../shared/types.ts'

export function prettifyOptions(options: ToMatchImageSnapshotOptions<any> | undefined) {
	if (!options) return 'none'

	return [
		`failureThreshold: ${options.failureThreshold ?? 0} ${options.failureThresholdType ?? 'pixels'}`,
		options.timeout ? `timeout: ${options.timeout} ms` : '',
		`comparisonMethod: ${options.comparisonMethod ?? 'pixel'}`,
		options.diffOptions ? `diffOptions: ${JSON.stringify(options.diffOptions)}` : '',
	]
		.filter(Boolean)
		.join('\n                 ')
}
