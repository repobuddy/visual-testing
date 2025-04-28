import { addons, types } from 'storybook/internal/manager-api'
import { isSnapshotEnabled } from './client/storybook/tags.ts'
import { VisPanel } from './components/vis_panel.tsx'
import { NAME, VIS_PANEL_ID } from './shared/contants.ts'

// Register the addon
addons.register(NAME, (api) => {
	const _isSnapshotStory = () => {
		const tags = api.getCurrentStoryData()?.tags
		return isSnapshotEnabled(tags)
	}

	// Register the tool
	addons.add(VIS_PANEL_ID, {
		type: types.PANEL,
		title: 'Vis Results',
		match: ({ tabId, viewMode }) => !tabId && viewMode === 'story',
		render({ active }) {
			if (!active) return null
			return <VisPanel active={active} />
		},
	})
})
