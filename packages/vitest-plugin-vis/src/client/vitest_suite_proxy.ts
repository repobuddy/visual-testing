let vitestSuite: Awaited<typeof import('vitest/suite')>

if ((globalThis as any).__vitest_browser__) {
	import('vitest/suite').then((m) => {
		vitestSuite = m
	})
}

export const getCurrentTest = () => vitestSuite?.getCurrentTest()
export const getCurrentSuite = () => vitestSuite?.getCurrentSuite()
