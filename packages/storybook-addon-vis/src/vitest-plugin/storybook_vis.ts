/**
 * Return type is `any` to support different Vitest and Vite versions.
 */
import type { ObjectPlus } from 'type-plus'
import { type ComparisonMethod, type VisOptions, vis } from 'vitest-plugin-vis/config'
import { NAME } from '../shared/constants.ts'

export function storybookVis<M extends ComparisonMethod>(
	options?: ObjectPlus.Omit<VisOptions<M>, 'preset'> | undefined,
): any {
	return {
		...vis({
			...options,
			preset: 'custom',
		}),
		name: NAME,
	}
}
