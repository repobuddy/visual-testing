import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/test'
import { commands, page, server } from './index.js'
import { UNI_PNG_URL } from './testing/constants'

export default {
	title: 'expect.toMatchImageSnapshot',
} satisfies Meta

export const Success: StoryObj = {
	render() {
		return <img style={{ width: 128, height: 128 }} src={UNI_PNG_URL} />
	},
	async play() {
		expect(page.imageSnapshot()).toMatchImageSnapshot()
	},
}

export const Failed: StoryObj = {
	tags: ['!test'],
	render() {
		return (
			<>
				<img style={{ width: 128, height: 128 }} src={UNI_PNG_URL} />
				<img style={{ width: 128, height: 128 }} src={UNI_PNG_URL} />
			</>
		)
	},
	async play() {
		expect(page.imageSnapshot())
			.toMatchImageSnapshot()
			.then(
				() => {
					throw new Error('Should not reach')
				},
				(error) => expect(error.message).toMatch(/Expected image to match but was differ by \d+ pixels./),
			)
	},
}

export const Element: StoryObj = {
	render() {
		return <img style={{ width: 128, height: 128 }} src={UNI_PNG_URL} />
	},
	async play({ canvas }) {
		const image = await canvas.getByRole('img')
		expect(page.imageSnapshot({ element: image })).toMatchImageSnapshot()
	},
}

export const DifferentSize: StoryObj = {
	tags: ['!test'],
	loaders: [
		async () => {
			return { updateSnapshot: server.config.snapshotOptions.updateSnapshot }
		},
	],
	render(_, { loaded: { updateSnapshot } }) {
		const style = updateSnapshot === 'all' ? { width: 128, height: 128 } : { width: 256, height: 256 }
		return <img style={style} src={UNI_PNG_URL} />
	},
	async play({ canvas }) {
		const image = await canvas.getByRole('img')
		expect(page.imageSnapshot({ element: image }))
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
	render: () => <div data-testid="subject">unit test</div>,
	// render: () => <div data-testid="subject">unit text</div>,
	async play({ canvas }) {
		const subject = canvas.getByTestId('subject')
		expect(page.imageSnapshot({ element: subject })).toMatchImageSnapshot({
			failureThreshold: 70,
		})
	},
}

export const FailureThreshold: StoryObj = {
	tags: ['!test'],
	render: () => <div data-testid="subject">unit test</div>,
	// render: () => <div data-testid="subject">unit text</div>,
	async play({ canvas }) {
		const subject = canvas.getByTestId('subject')
		expect(page.imageSnapshot({ element: subject }))
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
	tags: ['!test'],
	// render: () => <div data-testid="subject">unit test</div>,
	render: () => <div data-testid="subject">unit text</div>,
	async play({ canvas }) {
		const subject = canvas.getByTestId('subject')
		expect(page.imageSnapshot({ element: subject }))
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
	render: () => <div data-testid="subject">unit test</div>,
	// render: () => <div data-testid="subject">unit text</div>,
	async play({ canvas }) {
		const subject = canvas.getByTestId('subject')
		expect(page.imageSnapshot({ element: subject })).toMatchImageSnapshot({
			failureThreshold: 0.3,
			failureThresholdType: 'percent',
		})
	},
}

export const ExactFailureThresholdByPercentage: StoryObj = {
	tags: ['!test'],
	// render: () => <div data-testid="subject">unit test</div>,
	render: () => <div data-testid="subject">unit text</div>,
	async play({ canvas }) {
		const subject = canvas.getByTestId('subject')
		expect(page.imageSnapshot({ element: subject }))
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
