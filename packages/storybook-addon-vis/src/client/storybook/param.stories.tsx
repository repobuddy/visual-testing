import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/test'
import { defineAutoSnapshotParam, hasImageSnapshot } from '../../index.ts'

export default {
	title: 'utils/defineAutoSnapshotParam',
	tags: ['snapshot'],
} satisfies Meta

export const SetFailureThreshold: StoryObj = {
	parameters: defineAutoSnapshotParam({
		failureThreshold: 70,
	}),
	loaders: [async () => ({ hasImageSnapshot: await hasImageSnapshot() })],
	render: (_, { loaded: { hasImageSnapshot } }) => (
		<div data-testid="subject">{hasImageSnapshot ? 'unit text' : 'unit test'}</div>
	),
}

export const SetFailureThresholdByPercentage: StoryObj = {
	parameters: defineAutoSnapshotParam({
		failureThreshold: 0.02,
		failureThresholdType: 'percent',
	}),
	loaders: [async () => ({ hasImageSnapshot: await hasImageSnapshot() })],
	render: (_, { loaded: { hasImageSnapshot } }) => (
		<div data-testid="subject">{hasImageSnapshot ? 'unit text' : 'unit test'}</div>
	),
}

export const DoesNotApplyToSnapshotInPlay: StoryObj = {
	tags: ['!snapshot'],
	parameters: defineAutoSnapshotParam({
		failureThreshold: 1,
	}),
	loaders: [async () => ({ hasImageSnapshot: await hasImageSnapshot() })],
	render: (_, { loaded: { hasImageSnapshot } }) => (
		<div data-testid="subject">{hasImageSnapshot ? 'unit text' : 'unit test'}</div>
	),
	play: async ({ canvas }) => {
		const subject = canvas.getByTestId('subject')
		await expect(subject).toMatchImageSnapshot({
			failureThreshold: 70,
		})
	},
}

export const UseSsim: StoryObj = {
	parameters: defineAutoSnapshotParam({
		comparisonMethod: 'ssim',
		diffOptions: { ssim: 'bezkrovny' },
	}),
	loaders: [async () => ({ hasImageSnapshot: await hasImageSnapshot() })],
	render: (_, { loaded: { hasImageSnapshot } }) => (
		<div data-testid="subject">{hasImageSnapshot ? 'unit text' : 'unit test'}</div>
	),
	async play({ canvas, loaded: { hasImageSnapshot } }) {
		const subject = canvas.getByTestId('subject')
		if (!hasImageSnapshot) {
			await expect(subject).toMatchImageSnapshot()
			return
		}

		// This will only execute in test environment
		await expect(subject)
			.toMatchImageSnapshot({
				expectToFail: true,
			})
			.then(
				() => {
					throw new Error('Should not reach')
				},
				(error) => {
					expect(error.message).toMatch(/Expected image to match but was differ by \d+ pixels./)
				},
			)
	},
}
