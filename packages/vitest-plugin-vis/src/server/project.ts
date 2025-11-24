import type { BrowserCommandContext } from 'vitest/node'
export function getProjectName(context: BrowserCommandContext) {
	const { runner } = context.project as any
	const name = runner.config.name
	if (typeof name === 'string') {
		return name
	}
	// if (typeof name === 'object' && 'label' in name) {
	// 	return (name as { label: string }).label
	// }
	return undefined
}

export function getProjectRoot(context: { project: { config: { root: string } } }) {
	return context.project.config.root
}
