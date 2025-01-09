import type { ToMatchImageSnapshotOptions } from './expect/to_match_image_snapshot.types.ts'

export function prettifyOptions(options: ToMatchImageSnapshotOptions<any> | undefined) {
	if (!options) return 'none'

	return [
		`failureThreshold: ${options.failureThreshold ?? 0} ${options.failureThresholdType ?? 'pixels'}`,
		options.diffOptions ? `diffOptions: ${JSON.stringify(options.diffOptions)}` : '',
		options.timeout ? `timeout: ${options.timeout} ms` : '',
	]
		.filter(Boolean)
		.join(', ')
}
