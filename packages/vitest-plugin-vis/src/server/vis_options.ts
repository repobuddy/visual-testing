import type { VisOptions } from '../config/types.ts'
import { assertSnapshotKeyWithoutDash } from '../shared/asserts.ts'
import { getProjectName } from './project.ts'

const DEFAULT_PROJECT_NAME = '__default'

const visOptions: Record<string, VisOptions<any> | undefined> = {}

export function setVisOption(
	userConfig: { test?: { name?: string | undefined } | undefined },
	options: VisOptions<any> | undefined,
) {
	assertSnapshotKeyWithoutDash(options?.snapshotKey)

	const name = userConfig.test?.name
	const id = name ?? DEFAULT_PROJECT_NAME

	visOptions[id] = options
}

export function getVisOption(context: { project: { vite: { config: { test?: { name?: string | undefined } } } } }) {
	const id = getProjectName(context) ?? DEFAULT_PROJECT_NAME

	return visOptions[id] ?? {}
}
