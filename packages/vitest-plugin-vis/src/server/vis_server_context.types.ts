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
	subject: string | undefined
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
