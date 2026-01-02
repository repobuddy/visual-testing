import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
	test: {
		projects: ['./vitest.config.a.ts', './vitest.config.b.ts'],
	},
})
