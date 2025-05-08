export const NAME = 'storybook-addon-vis'
export const VIS_PANEL_ID = `${NAME}/vis_panel`

export type VisEvent = ImageSnapshotResultsRequest | ImageSnapshotResultsResponse

export type ImageSnapshotResultsRequest = {
	type: 'requestImageSnapshotResults'
	taskId: string
	taskPath: string
}

export type ImageSnapshotResultsResponse = {
	type: 'responseImageSnapshotResults'
	taskId: string
	results: {
		key: string
		baseline?: string | undefined
		diff?: string | undefined
		result?: string | undefined
	}
}
