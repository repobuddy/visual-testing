import { defineConfig } from 'vitest/config'

// Node-only unit tests for the pure helpers; keeps the site independent of the repo's browser test projects.
export default defineConfig({
	test: { include: ['src/**/*.spec.ts'] },
})
