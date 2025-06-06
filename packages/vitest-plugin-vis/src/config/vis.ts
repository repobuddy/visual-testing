import type { Plugin } from 'vite'
import { commands } from '../server/commands/commands.ts'
import { setVisOption } from '../server/vis_options.ts'
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
			setVisOption(userConfig, options)
			const preset = options?.preset
			return {
				test: {
					browser: {
						name: undefined as unknown as string,
						commands,
					},
					setupFiles: preset && preset !== 'none' && preset !== 'custom' ? [`vitest-plugin-vis/presets/${preset}`] : [],
				},
			}
		},
	} satisfies Plugin
}
