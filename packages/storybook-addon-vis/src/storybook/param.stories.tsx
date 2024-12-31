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

export const ParamAppliesToPlay: StoryObj = {
	parameters: defineSnapshotParam({
		failureThreshold: 70,
	}),
	loaders: [async () => ({ hasImageSnapshot: await hasImageSnapshot() })],
	render(_, { loaded: { hasImageSnapshot } }) {
		return <div data-testid="subject">{hasImageSnapshot ? 'unit text' : 'unit test'}</div>
	},
}
