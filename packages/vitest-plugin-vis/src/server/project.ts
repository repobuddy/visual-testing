export function getProjectName(context: {
	project: { vite: { config: { test?: { name?: { label: string } | string | undefined } } } }
}) {
	const name = context.project.vite.config.test?.name
	if (typeof name === 'string') {
		return name
	}
	if (typeof name === 'object' && 'label' in name) {
		return name.label
	}
	return undefined
}

export function getProjectRoot(context: { project: { config: { root: string } } }) {
	return context.project.config.root
}
