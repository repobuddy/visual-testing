export type VisContext = {
	customizeSnapshotSubpath?: (subPath: string) => string
	state: {
		snapshotRootDir?: string | undefined
		timeout?: number | undefined
		projectDir: string
		testTimeout?: number | undefined
		hookTimeout?: number | undefined
	}
}
