import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import { expect, fn, userEvent, waitFor, within } from 'storybook/test'
import { convert, ThemeProvider, themes } from 'storybook/theming'
import type { ImageSnapshotResults } from '../shared/events.ts'
import { VisPanel } from './vis_panel.tsx'

// Mock base64 image data (1x1 pixel transparent PNG)
const mockBase64Image =
	'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='

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

// Images for the VisPanel stories: a button that grew wider and taller between baseline and result.
// The diff is the pixelmatch output of the two.
const baselineImage =
	'iVBORw0KGgoAAAANSUhEUgAAAPAAAAB4CAYAAADMtn8nAAAB+0lEQVR4Ae3Boa0cBwAFwJenQ4tTg/EVZXzFLE5Ri1NDqI8mMrAUYtmKQfT2z8xvX758+TvApAaY1QCzGmBWA8xqgFkNMKsBZjXArAaY1QCzGmBWA8xqgFkNMKsBZjXArAaY1QCzGmBWA8xqgFkNMKsBZjXArAaY1QCzGmBWA8xqgFkNMKsBZjXArAaY1QCzGmBWA8xqgFkNMKsBZj3yQTxf7/CxXOeRu3vkxp6vd/i4nq93vrnOI3f0yA09X+/Avz1f73x1nUfupLmZ5+sd+J7n6507aYBZzY08X+/Ajzxf79xFA8xqgFnNTTxf78DPer7euYMGmNUAsxpgVgPMaoBZDTCrAWY9wi/584/fw6/59Pmv8N80wKwGmNUAsxpgVgPMaoBZDTCrAWY9wi/59PmvwP+lAWY1wKwGmNUAsxpgVgPMaoBZzU1c5xH4Wdd55A4aYFYDzGpu5DqPwI9c55G7aIBZzc1c5xH4nus8cieP3NB1Hvnq+XoHvrrOI3f0yI1d55Fvnq93+Fiu88jdPfJBXOcRuJsGmNUAsxpgVgPMaoBZDTCrAWY1wKwGmNUAsxpgVgPMaoBZDTCrAWY1wKwGmNUAsxpgVgPMaoBZDTCrAWY1wKwGmNUAsxpgVgPMaoBZDTCrAWY1wKwGmNUAsxpgVgPMaoBZDTDrH+qHMcDQpkecAAAAAElFTkSuQmCC'

const resultImage =
	'iVBORw0KGgoAAAANSUhEUgAAAPAAAAB4CAYAAADMtn8nAAAB9ElEQVR4Ae3BIbIcBQAFwMerVaM5A3oPFb2HGc2hRnOG2IyFiognFfKzr+ju3758+fJ3gEkNMKsBZjXArAaY1QCzGmBWA8xqgFkNMKsBZjXArAaY1QCzGmBWA8xqgFkNMKsBZjXArAaY1QCzGmBWA8xqgFkNMKsBZjXArAaY1QCzGmBWA8xqgFkNMKsBZjXArAaY1QCzGmBWA8x6ZNzzdQd+xHUeWfXIoOfrDvxXnq8731znkSWPDHm+7sDP9Hzd+eo6jyxoRjxfd+CjPF93FjTArGbA83UHPtrzdefdNcCsBpjVvLnn6w78Ks/XnXfWALMaYFYDzGqAWQ0wqwFmNcCsBpjVALMe4bv89efv4ef649Pn8O80wKwGmNUAsxpgVgPMaoBZDTCrAWY9wnf549PnwLtogFkNMKsBZjXArAaY1QCzGmBWA8xqgFnNm7vOI/CrXOeRd9YAsxpgVjPgOo/AR7vOI++uAWY1I67zCHyU6zyy4JEh13nkq+frDvwM13lkySODrvPIN8/XHfgR13lk1SPjrvMI/F81wKwGmNUAsxpgVgPMaoBZDTCrAWY1wKwGmNUAsxpgVgPMaoBZDTCrAWY1wKwGmNUAsxpgVgPMaoBZDTCrAWY1wKwGmNUAsxpgVgPMaoBZDTCrAWY1wKwGmPUPBxYxwAlH9qgAAAAASUVORK5CYII='

const diffImage =
	'iVBORw0KGgoAAAANSUhEUgAAAPAAAAB4CAYAAADMtn8nAAACYUlEQVR4Ae3BQY7jRgAEwWSBD2D//5HNFzQNHQZYH8bLsWCvSsqIba11IalSkFQrSKoVJNUKkmoFSbWCpFpBUq0gqVaQVCtIqhUk1QqSagVJtYKkWkFSrSCpVpBUK0iqFSTVCpJqBUm1gqRaQVKtIKlWkFQrSKoVJNUKkmoFSbWCpFpBUq0gqVaQVCtIqhUk1QqSagVJtYKkWkFSrZ1yW8Id55zosxxjcMe1Fq12Cm0Jd5xzos91zsmXYwy+syV8udaiyU6RLeGOc06kX51z8nCMwT/ZEh6utWgQSmwJd5xzIn3nnJM7toQGQVKtUGBLuOOcE+l3zjm5Y0t4dUFSrSCpVnhxW8Id55xId51zcseW8MqCpFpBUq0gqVaQVCtIqhUk1QqSau3oKccY6DnnnOjfCZJq7ehHjjH4m+tCzzm2jV+dc6J7gqRaQVKtIKlWkFQrSKoVJNXa0XO2DelPCZJq7ehHzjmRXkWQVCtIqhUk1QqSagVJtcKbOMZAuusYg3cQJNUKkmqFN3KMgfQ7xxi8i/DirrWQ/pRrLV5ZeDPHGEjfOcbgney8oWMMHs45kR6OMXhHOwWutdgSfuoYgy/nnOizHGPwjGstXt3OhzjGQHo3ocS1FtL/5VqLBjtFrrV42BKk/8K1Fk12Cl1r8WVLkJ5xrUWrnXLXWkifKkiqFSTVCpJqBUm1gqRaQVKtIKlWkFQrSKoVJNUKkmoFSbWCpFpBUq0gqVaQVCtIqhUk1QqSagVJtYKkWkFSrSCpVpBUK0iqFSTVCpJqBUm1gqRaQVKtIKlWkFQrSKoVJNX6C0GYYRWtp3N0AAAAAElFTkSuQmCC'

// A failed snapshot: the baseline, result and diff images share the same file name in their own folders.
const failedSnapshots: ImageSnapshotResults[] = [
	{
		filePath: '/path/to/snapshots/__baselines__/button-1.png',
		fileName: 'button-1.png',
		snapshotRootDir: '/path/to/snapshots',
		type: 'baseline',
		base64: baselineImage,
	},
	{
		filePath: '/path/to/snapshots/__results__/button-1.png',
		fileName: 'button-1.png',
		snapshotRootDir: '/path/to/snapshots',
		type: 'result',
		base64: resultImage,
	},
	{
		filePath: '/path/to/snapshots/__diffs__/button-1.png',
		fileName: 'button-1.png',
		snapshotRootDir: '/path/to/snapshots',
		type: 'diff',
		base64: diffImage,
	},
]

// A failed snapshot from an old run, with no result image to compare with.
const failedSnapshotsWithoutResult = failedSnapshots.filter((snapshot) => snapshot.type !== 'result')

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
		getSnapshotResults: async () => [],
		onRefresh: fn(),
	},
}

export const SuccessfulSnapshots: Story = {
	args: {
		active: true,
		getSnapshotResults: async () => successfulSnapshots,
		onRefresh: fn(),
	},
}

/** Waits until the images in the panel have loaded and been placed. */
async function imagesReady(canvasElement: HTMLElement) {
	await waitFor(() => {
		const images = Array.from(canvasElement.querySelectorAll('img'))
		expect(images.length).toBeGreaterThan(0)
		for (const image of images) {
			expect(image.complete && image.naturalWidth > 0).toBe(true)
			expect(image.style.visibility).not.toBe('hidden')
		}
	})
}

function showView(name: string): Story['play'] {
	return async ({ canvasElement }) => {
		const canvas = within(canvasElement)
		const button = await canvas.findByRole('button', { name })
		await userEvent.click(button)
		await expect(button).toHaveAttribute('aria-pressed', 'true')
		await imagesReady(canvasElement)
	}
}

// Tags are set on each story, not here: Storybook reads them statically.
const failedStory: Story = {
	decorators: [
		(Story) => (
			<div data-testid="subject">
				<Story />
			</div>
		),
	],
	args: {
		active: true,
		getSnapshotResults: async () => failedSnapshots,
		onRefresh: fn(),
	},
}

export const FailedSnapshots: Story = {
	...failedStory,
	tags: ['test', 'snapshot'],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement)
		await expect(await canvas.findByRole('button', { name: 'Side by side' })).toHaveAttribute('aria-pressed', 'true')
		await expect(canvas.getByText('Baseline')).toBeVisible()
		await expect(canvas.getByText('Result')).toBeVisible()
		await imagesReady(canvasElement)
	},
}

export const FailedSnapshotSwipe: Story = {
	...failedStory,
	tags: ['test', 'snapshot'],
	play: showView('Swipe'),
}

export const FailedSnapshotOnionSkin: Story = {
	...failedStory,
	tags: ['test', 'snapshot'],
	play: showView('Onion skin'),
}

export const FailedSnapshotDiff: Story = {
	...failedStory,
	tags: ['test', 'snapshot'],
	play: async (context) => {
		await showView('Diff')!(context)
		const canvas = within(context.canvasElement)
		await expect(canvas.getByRole('img', { name: 'button-1.png' })).toBeVisible()
	},
}

export const FailedSnapshotWithoutResult: Story = {
	...failedStory,
	tags: ['test', 'snapshot'],
	args: {
		...failedStory.args,
		getSnapshotResults: async () => failedSnapshotsWithoutResult,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement)
		await waitFor(() => expect(canvas.getAllByRole('img')).toHaveLength(2))
		await expect(canvas.queryByRole('group', { name: 'Comparison view' })).toBeNull()
		await imagesReady(canvasElement)
	},
}

export const ResultWithoutBaseline: Story = {
	tags: ['test'],
	args: {
		active: true,
		getSnapshotResults: fn(async () => failedSnapshots.filter((snapshot) => snapshot.type === 'result')),
		onRefresh: fn(),
	},
	play: async ({ args, canvasElement }) => {
		await waitFor(() => expect(args.getSnapshotResults).toHaveBeenCalled())
		// Let the results land in state before checking that nothing is shown.
		await new Promise((resolve) => setTimeout(resolve, 50))
		const canvas = within(canvasElement)
		await expect(canvas.queryByRole('img')).toBeNull()
		await expect(canvas.getByText('There is no snapshots for this story')).toBeVisible()
	},
}

export const MixedResults: Story = {
	args: {
		active: true,
		getSnapshotResults: async () => mixedSnapshots,
		onRefresh: fn(),
	},
}

export const InactivePanel: Story = {
	args: {
		active: false,
		getSnapshotResults: async () => successfulSnapshots,
		onRefresh: fn(),
	},
}

export const LargeDataset: Story = {
	args: {
		active: true,
		getSnapshotResults: async () =>
			Array.from({ length: 20 }, (_, i) => ({
				filePath: `/path/to/snapshots/component-${i}-baseline.png`,
				fileName: `component-${i}-baseline.png`,
				snapshotRootDir: `/path/to/snapshots/suite-${Math.floor(i / 5)}`,
				type: 'baseline' as const,
				base64: mockBase64Image,
			})),
		onRefresh: fn(),
	},
}
