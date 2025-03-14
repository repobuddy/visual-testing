import { defineProject } from 'vitest/config'

// https://vitejs.dev/config/
export default defineProject({
	test: {
		name: 'vpv:node',
		include: [
			'src/config/**/*.{spec,test,unit,accept,integrate,system,study,perf,stress}.ts',
			'src/server/**/*.{spec,test,unit,accept,integrate,system,study,perf,stress}.ts',
			'src/shared/**/*.{spec,test,unit,accept,integrate,system,study,perf,stress}.ts',
			'src/**/*.{spec,test,unit,accept,integrate,system,study,perf,stress}.node.ts',
		],
	},
})
