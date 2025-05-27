import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { convert, ThemeProvider, themes } from 'storybook/internal/theming'
import type { ImageSnapshotResults } from '../shared/events.ts'
import { VisPanel } from './vis_panel.tsx'

// Mock base64 image data (1x1 pixel transparent PNG)
const mockBase64Image =
	'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='

// Mock base64 image data for diff (1x1 pixel red PNG)
const mockDiffBase64Image =
	'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='

const meta: Meta<typeof VisPanel> = {
	title: 'Components/VisPanel',
	tags: ['internal', '!test'],
	component: VisPanel,
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [
		(Story) => (
			<ThemeProvider theme={convert(themes.dark)}>
				<Story />
			</ThemeProvider>
		),
	],
	argTypes: {
		active: {
			control: 'boolean',
			description: 'Whether the panel is active',
		},
		snapshotResults: {
			control: 'object',
			description: 'Array of image snapshot results',
		},
		onRefresh: {
			description: 'Callback function when refresh button is clicked',
		},
	},
}

export default meta
type Story = StoryObj<typeof VisPanel>

// Mock snapshot results for successful tests
const successfulSnapshots: ImageSnapshotResults[] = [
	{
		filePath: '/path/to/snapshots/button-baseline.png',
		fileName: 'button-baseline.png',
		snapshotRootDir: '/path/to/snapshots',
		type: 'baseline',
		base64: mockBase64Image,
	},
	{
		filePath: '/path/to/snapshots/card-baseline.png',
		fileName: 'card-baseline.png',
		snapshotRootDir: '/path/to/snapshots',
		type: 'baseline',
		base64: mockBase64Image,
	},
]

// Mock snapshot results with failures (diff images)
const failedSnapshots: ImageSnapshotResults[] = [
	{
		filePath: '/path/to/snapshots/button-baseline.png',
		fileName: 'button-baseline.png',
		snapshotRootDir: '/path/to/snapshots',
		type: 'baseline',
		base64: mockBase64Image,
	},
	{
		filePath: '/path/to/snapshots/button-diff.png',
		fileName: 'button-diff.png',
		snapshotRootDir: '/path/to/snapshots',
		type: 'diff',
		base64: mockDiffBase64Image,
	},
	{
		filePath: '/path/to/snapshots/button-result.png',
		fileName: 'button-result.png',
		snapshotRootDir: '/path/to/snapshots',
		type: 'result',
		base64: mockBase64Image,
	},
]

// Mixed results with both successful and failed snapshots
const mixedSnapshots: ImageSnapshotResults[] = [
	...successfulSnapshots,
	...failedSnapshots,
	{
		filePath: '/path/to/snapshots/modal-baseline.png',
		fileName: 'modal-baseline.png',
		snapshotRootDir: '/path/to/snapshots/components',
		type: 'baseline',
		base64: mockBase64Image,
	},
]

export const EmptyState: Story = {
	args: {
		active: true,
		snapshotResults: [],
		onRefresh: fn(),
	},
}

export const SuccessfulSnapshots: Story = {
	args: {
		active: true,
		snapshotResults: successfulSnapshots,
		onRefresh: fn(),
	},
}

export const FailedSnapshots: Story = {
	args: {
		active: true,
		snapshotResults: failedSnapshots,
		onRefresh: fn(),
	},
}

export const MixedResults: Story = {
	args: {
		active: true,
		snapshotResults: mixedSnapshots,
		onRefresh: fn(),
	},
}

export const InactivePanel: Story = {
	args: {
		active: false,
		snapshotResults: successfulSnapshots,
		onRefresh: fn(),
	},
}

export const LargeDataset: Story = {
	args: {
		active: true,
		snapshotResults: Array.from({ length: 20 }, (_, i) => ({
			filePath: `/path/to/snapshots/component-${i}-baseline.png`,
			fileName: `component-${i}-baseline.png`,
			snapshotRootDir: `/path/to/snapshots/suite-${Math.floor(i / 5)}`,
			type: 'baseline' as const,
			base64: mockBase64Image,
		})),
		onRefresh: fn(),
	},
}
