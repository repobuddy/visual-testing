import type { Omit } from 'type-plus'
import { type ComparisonMethod, type VisOptions, vis } from 'vitest-plugin-vis/config'
import { NAME } from '../shared/contants.ts'

export function storybookVis<M extends ComparisonMethod>(options: Omit<VisOptions<M>, 'preset'> = {} as any) {
	return {
		...vis({
			...options,
			preset: 'none',
		}),
		name: NAME,
	}
}
