import type { Omit } from 'type-plus'
import { type VisOptions, vis } from 'vitest-plugin-vis/config'
import { NAME } from '../shared/contants.ts'

export function storybookVis(options: Omit<VisOptions, 'preset'> = {}) {
	return {
		...vis({
			...options,
			preset: 'none',
		}),
		name: NAME,
	}
}
