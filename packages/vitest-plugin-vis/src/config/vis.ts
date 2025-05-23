import type { Plugin } from 'vite'
import { commands } from '../server/commands/extend.ts'
import { visContext } from '../server/vis_context.ts'
import { NAME } from '../shared/constants.ts'
import type { ComparisonMethod } from '../shared/types.ts'
import type { VisOptions } from './types.ts'

/**
 * Create a Vite plugin for visual testing.
 *
 * If options are not provided, the plugin will use the default options,
 * which enables the `auto` preset.
 */
export function vis<M extends ComparisonMethod = 'pixel'>(options: VisOptions<M> = { preset: 'auto' } as any) {
	return {
		name: NAME,
		config(userConfig) {
			const projectName = userConfig?.test?.name

			visContext.setOptions(projectName, options)
			const preset = options?.preset
			return {
				test: {
					browser: {
						name: undefined as unknown as string,
						commands,
					},
					setupFiles: preset && preset !== 'none' ? [`vitest-plugin-vis/presets/${preset}`] : [],
				},
			}
		},
	} satisfies Plugin
}
