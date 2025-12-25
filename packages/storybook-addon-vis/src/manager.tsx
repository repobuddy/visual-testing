import React from 'react'
import { addons, types } from 'storybook/manager-api'
import { VisPanel } from './components/vis_panel.tsx'
import { NAME, VIS_PANEL_ID } from './shared/contants.ts'
import {
	IMAGE_SNAPSHOT_RESULTS_RESPONSE,
	requestImageSnapshotResults,
	type ImageSnapshotResults,
	type VisEvent,
} from './shared/events.ts'

// Register the addon
addons.register(NAME, (api) => {
	// Register the tool
	if ((globalThis as any).CONFIG_TYPE === 'DEVELOPMENT') {
		addons.add(VIS_PANEL_ID, {
			type: types.PANEL,
			title: 'Vis',
			match: ({ tabId, viewMode }) => !tabId && viewMode === 'story',
			render({ active }) {
				if (!active) return null
				const storyData = api.getCurrentStoryData()
				if (!storyData) return null
				api.emit(NAME, requestImageSnapshotResults(storyData))
				async function getSnapshotResults() {
					return new Promise<ImageSnapshotResults[]>((resolve) => {
						api.once(NAME, (event: VisEvent) => {
							if (event.name !== storyData.name) return
							if (event.importPath !== storyData.importPath) return
							if (event.type === IMAGE_SNAPSHOT_RESULTS_RESPONSE) {
								resolve(event.results)
							}
						})
					})
				}
				return (
					<VisPanel
						active={active}
						getSnapshotResults={getSnapshotResults}
						onRefresh={() => {
							if (storyData) api.emit(NAME, requestImageSnapshotResults(storyData))
						}}
					/>
				)
			},
		})
	}
})
