import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/test'
import { commands, hasSnapshot, page } from './index.js'
import { UNI_PNG_URL } from './testing/constants'

export default {
	title: 'expect.toMatchImageSnapshot',
} satisfies Meta

export const Success: StoryObj = {
	render() {
		return <img style={{ width: 128, height: 128 }} src={UNI_PNG_URL} />
	},
	async play() {
		await expect(page.imageSnapshot()).toMatchImageSnapshot()
	},
}

export const Element: StoryObj = {
	render() {
		return <img style={{ width: 128, height: 128 }} src={UNI_PNG_URL} />
	},
	async play({ canvas }) {
		const image = await canvas.getByRole('img')
		await expect(page.imageSnapshot({ element: image })).toMatchImageSnapshot()
	},
}

export const DifferentSize: StoryObj = {
	loaders: [async () => ((await hasSnapshot()) ? { width: 256, height: 256 } : { width: 128, height: 128 })],
	render(_, { loaded: { width, height } }) {
		return <img style={{ width, height }} src={UNI_PNG_URL} />
	},
	async play({ canvas }) {
		const image = await canvas.getByRole('img')
		await expect(page.imageSnapshot({ element: image }))
			.toMatchImageSnapshot()
			.then(
				() => {
					throw new Error('Should not reach')
				},
				(error) => expect(error.message).toMatch(/Expected image to match but was differ by \d+ pixels./),
			)
	},
}

export const MeetFailureThreshold: StoryObj = {
	loaders: [async () => ((await hasSnapshot()) ? { text: 'unit test' } : { text: 'unit text' })],
	render: (_, { loaded: { text } }) => <div data-testid="subject">{text}</div>,
	async play({ canvas }) {
		const subject = canvas.getByTestId('subject')
		await expect(page.imageSnapshot({ element: subject })).toMatchImageSnapshot({
			failureThreshold: 70,
		})
	},
}

export const FailureThreshold: StoryObj = {
	loaders: [async () => ((await hasSnapshot()) ? { text: 'unit test' } : { text: 'unit text' })],
	render: (_, { loaded: { text } }) => <div data-testid="subject">{text}</div>,
	async play({ canvas }) {
		const subject = canvas.getByTestId('subject')
		await expect(page.imageSnapshot({ element: subject }))
			.toMatchImageSnapshot({
				failureThreshold: 10,
			})
			.then(
				() => {
					throw new Error('Should not reach')
				},
				(error) =>
					expect(error.message).toMatch(/Expected image to match within 10 pixels but was differ by \d+ pixels./),
			)
	},
}

export const FailureThresholdByPercentage: StoryObj = {
	loaders: [async () => ((await hasSnapshot()) ? { text: 'unit test' } : { text: 'unit text' })],
	render: (_, { loaded: { text } }) => <div data-testid="subject">{text}</div>,
	async play({ canvas }) {
		const subject = canvas.getByTestId('subject')
		await expect(page.imageSnapshot({ element: subject }))
			.toMatchImageSnapshot({
				failureThreshold: 0.1,
				failureThresholdType: 'percent',
			})
			.then(
				() => {
					throw new Error('Should not reach')
				},
				(error) => expect(error.message).toMatch(/Expected image to match within 0.1% but was differ by \d+\.\d+%/),
			)
	},
}

export const MeetFailureThresholdByPercentage: StoryObj = {
	loaders: [async () => ((await hasSnapshot()) ? { text: 'unit test' } : { text: 'unit text' })],
	render: (_, { loaded: { text } }) => <div data-testid="subject">{text}</div>,
	async play({ canvas }) {
		const subject = canvas.getByTestId('subject')
		await expect(page.imageSnapshot({ element: subject })).toMatchImageSnapshot({
			failureThreshold: 0.3,
			failureThresholdType: 'percent',
		})
	},
}

export const ExactFailureThresholdByPercentage: StoryObj = {
	loaders: [async () => ((await hasSnapshot()) ? { text: 'unit test' } : { text: 'unit text' })],
	render: (_, { loaded: { text } }) => <div data-testid="subject">{text}</div>,
	async play({ canvas }) {
		const subject = canvas.getByTestId('subject')
		await expect(page.imageSnapshot({ element: subject }))
			.toMatchImageSnapshot({
				failureThresholdType: 'percent',
			})
			.then(
				() => {
					throw new Error('Should not reach')
				},
				async (error) => {
					expect(error.message).toMatch(/Expected image to match but was differ by \d+\.\d+%/)
					expect(error.message).toMatch(
						`Expected:   '../__snapshots__/${await commands.getSnapshotPlatform()}/expect.to_match_image_snapshot.stories.tsx/exact-failure-threshold-by-percentage-1.png'`,
					)
					expect(error.message).toMatch(
						`Actual:     '../__snapshots__/${await commands.getSnapshotPlatform()}/__results__/expect.to_match_image_snapshot.stories.tsx/exact-failure-threshold-by-percentage-1.png'`,
					)
					expect(error.message).toMatch(
						`Difference: '../__snapshots__/${await commands.getSnapshotPlatform()}/__diff_output__/expect.to_match_image_snapshot.stories.tsx/exact-failure-threshold-by-percentage-1.png'`,
					)
				},
			)
	},
}
