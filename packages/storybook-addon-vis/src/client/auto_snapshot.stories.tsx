import type { Meta, StoryObj } from '@storybook/react-vite'

export default {
	title: 'Auto Snapshot',
	tags: ['snapshot'],
} satisfies Meta

export const CaptureSubjectOnly: StoryObj = {
	render: () => (
		<div>
			<div data-testid="subject">subject</div>
			<div>Not subject</div>
		</div>
	),
}
