import { useEffect, useState } from 'react'
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
	addons.add(VIS_PANEL_ID, {
		type: types.PANEL,
		title: 'Vis',
		match: ({ tabId, viewMode }) => !tabId && viewMode === 'story',
		render({ active }) {
			if (!active) return null
			const [snapshotResults, setSnapshotResults] = useState<ImageSnapshotResults[]>([])

			const storyData = api.getCurrentStoryData()

			useEffect(() => {
				const dispose = api.on(NAME, (event: VisEvent) => {
					if (event.name !== storyData.name) return
					if (event.importPath !== storyData.importPath) return

					if (event.type === IMAGE_SNAPSHOT_RESULTS_RESPONSE) {
						setSnapshotResults(event.results)
					}
				})
				api.emit(NAME, requestImageSnapshotResults(storyData))
				return dispose
			}, [storyData])
			return <VisPanel active={active} snapshotResults={snapshotResults} />
		},
	})
})
