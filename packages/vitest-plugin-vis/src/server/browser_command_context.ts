import type { BrowserCommandContext } from 'vitest/node'
import type { PartialBrowserCommandContext } from './vis_context.types.ts'

export function getProjectName(context: { project: { vite: { config: { test?: { name?: string | undefined } } } } }) {
	return context.project.vite.config.test?.name
}

export function getBrowserInstanceProjectName(context: BrowserCommandContext) {
	return context.project.config
}
export function getProjectRoot(context: PartialBrowserCommandContext) {
	return context.project.config.root
}
export function getProjectId(context: PartialBrowserCommandContext) {
	return `${context.project.config.root}/${context.project.config.name}`
}
