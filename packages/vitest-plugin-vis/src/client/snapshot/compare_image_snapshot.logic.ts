import { isAbsolute, relative, resolve } from 'pathe'
import type { ToMatchImageSnapshotOptions } from '../../shared/types.ts'

export function prettifyOptions(options: ToMatchImageSnapshotOptions<any> | undefined) {
	if (!options) return 'none'

	return [
		`failureThreshold: ${options.failureThreshold ?? 0} ${options.failureThresholdType ?? 'pixels'}`,
		options.timeout ? `timeout: ${options.timeout} ms` : '',
		`comparisonMethod: ${options.comparisonMethod ?? 'pixel'}`,
		options.diffOptions ? `diffOptions: ${JSON.stringify(options.diffOptions)}` : '',
		options.createMissingBaseline ? 'createMissingBaseline: true' : '',
	]
		.filter(Boolean)
		.join('\n                ')
}

/**
 * Formats a snapshot path for display in a failure message.
 *
 * Paths within the project root are shown relative to it so that the failure output can be shared
 * verbatim without leaking the local absolute path, while remaining clickable in editors and terminals.
 * Paths outside the project root stay absolute, as a `../../..` chain is neither shorter nor clearer.
 */
export function formatSnapshotPath(projectRoot: string, path: string) {
	const absolutePath = resolve(projectRoot, path)
	const relativePath = relative(projectRoot, absolutePath)
	if (!relativePath || relativePath === '..' || relativePath.startsWith('../') || isAbsolute(relativePath)) {
		return absolutePath
	}
	return `./${relativePath}`
}
