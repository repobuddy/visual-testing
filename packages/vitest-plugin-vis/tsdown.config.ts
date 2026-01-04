import { defineConfig } from 'tsdown'

// const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))

export default defineConfig([
	{
		entry: [
			'src/index.ts',
			'src/config.ts',
			'src/client-api.ts',
			'src/presets/auto.ts',
			'src/presets/manual.ts',
			'src/presets/enable.ts',
			'src/server-utils.ts',
			'src/setup.ts',
			'src/testing.ts',
		],
		unbundle: true,
		tsconfig: 'tsconfig.esm.json',
		format: 'esm',
		sourcemap: true,
	},
])
