import { defineWorkspace } from 'vitest/config'

export default defineWorkspace(
	[
		'vitest.config.playwright.ts',
		process.env.COVERAGE ? '' : 'vitest.config.webdriverio.ts',
		'vitest.config.node.ts',
	].filter(Boolean),
)
