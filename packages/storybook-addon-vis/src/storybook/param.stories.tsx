import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/test'
import { defineSnapshotParam, hasImageSnapshot } from '../index.ts'

export default {
	title: 'param',
	tags: ['snapshot'],
} satisfies Meta

export const MeetFailureThreshold: StoryObj = {
	parameters: defineSnapshotParam({
		failureThreshold: 70,
	}),
	loaders: [async () => ({ hasImageSnapshot: await hasImageSnapshot() })],
	render: (_, { loaded: { hasImageSnapshot } }) => (
		<div data-testid="subject">{hasImageSnapshot ? 'unit text' : 'unit test'}</div>
	),
}

export const MeetFailureThresholdByPercentage: StoryObj = {
	parameters: defineSnapshotParam({
		failureThreshold: 0.02,
		failureThresholdType: 'percent',
	}),
	loaders: [async () => ({ hasImageSnapshot: await hasImageSnapshot() })],
	render: (_, { loaded: { hasImageSnapshot } }) => (
		<div data-testid="subject">{hasImageSnapshot ? 'unit text' : 'unit test'}</div>
	),
}

export const ParamNotApplyInPlay: StoryObj = {
	tags: ['!snapshot'],
	parameters: defineSnapshotParam({
		failureThreshold: 70,
	}),
	loaders: [async () => ({ hasImageSnapshot: await hasImageSnapshot() })],
	render: (_, { loaded: { hasImageSnapshot } }) => (
		<div data-testid="subject">{hasImageSnapshot ? 'unit text' : 'unit test'}</div>
	),
	play: async ({ canvas }) => {
		const subject = canvas.getByTestId('subject')
		await expect(subject).toMatchImageSnapshot()
	},
}
