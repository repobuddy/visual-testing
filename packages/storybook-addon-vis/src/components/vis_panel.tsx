import { memo } from 'react'
import { AddonPanel } from 'storybook/internal/components'

interface PanelProps {
	active: boolean
}

export const VisPanel = memo(function Panel(props: PanelProps) {
	return (
		<AddonPanel {...props}>
			<div>Hello world</div>
		</AddonPanel>
	)
})
