import { useEffect } from 'react'
import { addons, types } from 'storybook/internal/manager-api'
import { VisPanel } from './components/vis_panel.tsx'
import { NAME, VIS_PANEL_ID } from './shared/contants.ts'
import { IMAGE_SNAPSHOT_RESULTS_RESPONSE, requestImageSnapshotResults, type VisEvent } from './shared/events.ts'

// Register the addon
addons.register(NAME, (api) => {
	// Register the tool
	addons.add(VIS_PANEL_ID, {
		type: types.PANEL,
		title: 'Vis Results',
		match: ({ tabId, viewMode }) => !tabId && viewMode === 'story',
		render({ active }) {
			if (!active) return null
			const storyData = api.getCurrentStoryData()

			useEffect(() => {
				const dispose = api.on(NAME, (event: VisEvent) => {
					if (event.name !== storyData.name) return
					if (event.importPath !== storyData.importPath) return

					if (event.type === IMAGE_SNAPSHOT_RESULTS_RESPONSE) {
						console.info(IMAGE_SNAPSHOT_RESULTS_RESPONSE, event.name, event.importPath, event.results)
					}
				})
				api.emit(NAME, requestImageSnapshotResults(storyData))
				return dispose
			}, [storyData])
			return <VisPanel active={active} />
		},
	})
})
