import type { BrowserCommandContext } from 'vitest/node'

export function getProjectName(context: { project: { vite: { config: { test?: { name: string } } } } }) {
	return context.project.vite.config.test?.name
}

export function getBrowserInstanceProjectName(context: BrowserCommandContext) {
	return context.project.config
}
