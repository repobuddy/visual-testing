import { defineProject } from 'vitest/config'

// https://vitejs.dev/config/
export default defineProject({
	test: {
		name: 'sav:node',
		include: ['src/vitest-plugin/**/*.{spec,test,unit,accept,integrate,system,study,perf,stress}.ts'],
	},
})
