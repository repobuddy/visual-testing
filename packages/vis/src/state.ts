export const state = {
	name: '',
	testFilepath: '',
	taskName: '',
	snapshot: {},
} as {
	id: string
	name: string
	testFilepath: string
	testFilename: string
	projectDir: string
	baselineDir: string
	resultDir: string
	diffDir: string
	taskName: string
	snapshot: Record<string, Record<string, { index: number }>>
}
