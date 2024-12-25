import type { Plugin } from 'vite'
import { visContext } from '../server/vis_context.ts'
import { NAME } from '../shared/constants.ts'
import type { VisOptions } from './types.ts'

/**
 * Create a Vite plugin for visual testing.
 */
export function vis(options?: VisOptions) {
	visContext.setOptions(options)
	return {
		name: NAME,
		config() {
			return {
				test: {
					browser: {
						name: undefined as unknown as string,
					},
				},
			}
		},
	} satisfies Plugin
}
