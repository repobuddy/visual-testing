import type { Meta, StoryObj } from '@repobuddy/storybook/storybook-addon-tag-badges'
import React from 'react'

export default {
	title: '.storybook/main/defineStorybookVisOptions',
} satisfies Meta

export const BasicUsage: StoryObj = {
	render: () => (
		<pre>{`defineStorybookVisOptions({
	visProjects: [
		{
			snapshotRootDir: '__vis__/linux',
		},
		{
			snapshotRootDir: '__vis__/local',
		},
	],
})`}</pre>
	),
}
