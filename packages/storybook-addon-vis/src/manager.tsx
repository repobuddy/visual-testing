import React, { useEffect, useState } from 'react'
import { addons, types } from 'storybook/internal/manager-api'
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
				const [snapshotResults, setSnapshotResults] = useState<ImageSnapshotResults[]>([])

				const storyData = api.getCurrentStoryData()

				useEffect(() => {
					const disposes = [
						api.on(NAME, (event: VisEvent) => {
							if (event.name !== storyData.name) return
							if (event.importPath !== storyData.importPath) return

							if (event.type === IMAGE_SNAPSHOT_RESULTS_RESPONSE) {
								setSnapshotResults(event.results)
							}
						}),
						// api.on('UNIVERSAL_STORE:storybook/test', (event) => {
						// 	console.log('storybook/test', event)
						// }),
					]
					api.emit(NAME, requestImageSnapshotResults(storyData))
					return () =>
						disposes.forEach((dispose) => {
							dispose()
						})
				}, [storyData])

				if (!active) return null

				return (
					<VisPanel
						active={active}
						snapshotResults={snapshotResults}
						onRefresh={() => {
							api.emit(NAME, requestImageSnapshotResults(storyData))
						}}
					/>
				)
			},
		})
	}
})
