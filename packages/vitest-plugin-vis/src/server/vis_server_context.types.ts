export type VisSuites = {
	[projectPath: string]: Promise<VisSuite>
}

export type VisSuite = {
	projectRoot: string
	testTimeout: number
	hookTimeout: number
	snapshotRootDir: string
	snapshotBaselineDir: string
	snapshotResultDir: string
	snapshotDiffDir: string
	snapshotRootPath: string
	subjectDataTestId: string | undefined
	modules: Record<
		string,
		{
			baselineDir: string
			resultDir: string
			diffDir: string
			tasks: Record<
				string,
				{
					count: number
				}
			>
		}
	>
}

export type PartialBrowserCommandContext = {
	project: {
		config: {
			name: string
			root: string
			snapshotOptions: {
				updateSnapshot: 'all' | 'new' | 'none'
			}
			testTimeout: number
			hookTimeout: number
		}
		vite: {
			config: {
				test?: {
					name?: string | undefined
				}
			}
		}
	}
	provider: {
		name: string
		browserName?: string | undefined
		options?: {
			headless?: boolean | undefined
			screenshotFailures?: boolean | undefined
			screenshotDirectory?: string | undefined
		}
	}
	testPath: string
}
