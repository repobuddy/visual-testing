import type { Meta, StoryObj } from '@storybook/react'
import { VisPanel } from './vis_panel.tsx'

export default {} satisfies Meta

type Story = StoryObj<typeof VisPanel>

export const Default: Story = {
	render: () => {
		return <VisPanel active={true} />
	},
}
