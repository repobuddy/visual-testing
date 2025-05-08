export function getProjectName(context: { project: { vite: { config: { test?: { name?: string | undefined } } } } }) {
	return context.project.vite.config.test?.name
}

export function getProjectRoot(context: { project: { config: { root: string } } }) {
	return context.project.config.root
}
