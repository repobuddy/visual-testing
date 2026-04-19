import { defineConfig } from 'tsdown'

// const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))

export default defineConfig([
	{
		entry: [
			'src/index.ts',
			'src/exports/config.ts',
			'src/exports/client-api.ts',
			'src/exports/presets/auto.ts',
			'src/exports/presets/manual.ts',
			'src/exports/server-utils.ts',
			'src/exports/setup.ts',
			'src/exports/setup-api.ts',
			'src/exports/testing.ts',
			'src/exports/testing/node.ts',
		],
		unbundle: true,
		tsconfig: 'tsconfig.esm.json',
		format: 'esm',
		sourcemap: true,
	},
])
