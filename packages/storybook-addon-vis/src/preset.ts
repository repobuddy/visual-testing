import preview from './preview.ts'
import { storybookVis } from './vitest-plugin.ts'

export default {
	previewAnnotations(entry = []) {
		return [...entry, preview]
	},
}

export function viteFinal(config: any, options: any = {}) {
	config.plugins.push(storybookVis(options))
	return config
}
