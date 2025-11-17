import type { ExtendedBrowserCommandContext } from './vis_server_context.types.ts'

export function getProjectName(context: ExtendedBrowserCommandContext) {
	const { runner } = context.project
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
