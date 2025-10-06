import type { UserConfig } from 'vitest/node'
import type { VisOptions } from '../config/types.ts'
import { assertSnapshotKeyWithoutDash } from '../shared/asserts.ts'
import { getProjectName } from './project.ts'

const DEFAULT_PROJECT_NAME = '__default'

const visOptions: Record<string, VisOptions<any> | undefined> = {}

export function setVisOption(
	userConfig: { test?: { name?: UserConfig['name'] | undefined } | undefined },
	options: VisOptions<any> | undefined,
) {
	assertSnapshotKeyWithoutDash(options?.snapshotKey)

	const name = userConfig.test?.name
	const id = typeof name === 'string' ? name : typeof name === 'object' ? name?.label : DEFAULT_PROJECT_NAME

	visOptions[id] = options
}

export function getVisOption(context: { project: { vite: { config: { test?: { name?: UserConfig['name'] } } } } }) {
	const id = getProjectName(context) ?? DEFAULT_PROJECT_NAME

	return visOptions[id] ?? {}
}
