import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import { defineAutoSnapshotParam } from '#storybook-addon-vis'

export default {
	title: 'Auto Snapshot',
	tags: ['snapshot'],
} satisfies Meta

export const CaptureSubjectOnly: StoryObj = {
	render: () => (
		<div className="flex flex-col gap-2">
			<div data-testid="subject">subject</div>
			<div className="text-red-500">This will not be captured</div>
		</div>
	),
}

export const FullPage: StoryObj = {
	parameters: defineAutoSnapshotParam({ fullPage: true }),
	render: () => (
		<div style={{ width: '1500px', height: '1000px', display: 'flex', flexDirection: 'column' }}>
			<div style={{ flex: 1, backgroundColor: 'greenyellow' }}>The whole page is captured</div>
			<div style={{ flex: 1, backgroundColor: 'cornflowerblue', textAlign: 'right' }}>including the bottom right</div>
		</div>
	),
}
