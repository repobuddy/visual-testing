export type VisEvent = ImageSnapshotResultsRequest | ImageSnapshotResultsResponse

export const IMAGE_SNAPSHOT_RESULTS_REQUEST = 'IMAGE_SNAPSHOT_RESULTS_REQUEST'
export const IMAGE_SNAPSHOT_RESULTS_RESPONSE = 'IMAGE_SNAPSHOT_RESULTS_RESPONSE'

export function requestImageSnapshotResults({ name, importPath }: { name: string; importPath: string }) {
	return {
		type: IMAGE_SNAPSHOT_RESULTS_REQUEST,
		name,
		importPath,
	}
}

export type ImageSnapshotResultsRequest = {
	type: typeof IMAGE_SNAPSHOT_RESULTS_REQUEST
	name: string
	importPath: string
}

export type ImageSnapshotResultsResponse = {
	type: typeof IMAGE_SNAPSHOT_RESULTS_RESPONSE
	name: string
	importPath: string
	results: ImageSnapshotResults[]
}

export type ImageSnapshotResults = {
	filePath: string
	fileName: string
	snapshotRootDir: string
	type: 'baseline' | 'diff' | 'result'
	base64: string
}
