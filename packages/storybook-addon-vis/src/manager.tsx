import { addons, types } from 'storybook/internal/manager-api'
import { isSnapshotEnabled } from './client/storybook/tags.ts'
import { VisPanel } from './components/vis_panel.tsx'
import { NAME, VIS_PANEL_ID, type VisEvent } from './shared/contants.ts'

// Register the addon
addons.register(NAME, (api) => {
	const _isSnapshotStory = () => {
		const tags = api.getCurrentStoryData()?.tags
		return isSnapshotEnabled(tags)
	}

	api.on(NAME, ({ type, ...payload }: VisEvent) => {
		console.info('manager api.on', type, payload)
		if (type === 'responseImageSnapshotResults') {
			console.info('responseImageSnapshotResults', payload)
		}
	})

	// Register the tool
	addons.add(VIS_PANEL_ID, {
		type: types.PANEL,
		title: 'Vis Results',
		match: ({ tabId, viewMode }) => !tabId && viewMode === 'story',
		render({ active }) {
			if (!active) return null
			const storyData = api.getCurrentStoryData()
			console.info('manager emitting requestImageSnapshotResults', storyData)

			api.emit(NAME, { type: 'requestImageSnapshotResults', taskId: storyData.name })

			return <VisPanel active={active} />
		},
	})
})
