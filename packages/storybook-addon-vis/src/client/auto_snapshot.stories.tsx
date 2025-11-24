import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

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
