import type { StoryObj } from '@storybook/react'
import { expect } from '@storybook/test'
import { hasImageSnapshot } from '../../index.ts'
import { UNI_PNG_BASE64, UNI_PNG_URL } from '../../testing.ts'

export default {
	title: 'expect matchers/toMatchImageSnapshot',
	render: () => <div data-testid="subject">unit</div>,
}

export const MatchingCanvasElement: StoryObj = {
	async play({ canvasElement }) {
		await expect(canvasElement).toMatchImageSnapshot()
	},
}

export const MatchingElement: StoryObj = {
	async play({ canvas }) {
		const element = canvas.getByTestId('subject')
		await expect(element).toMatchImageSnapshot()
	},
}

export const MatchingBase64Image: StoryObj = {
	async play() {
		await expect(UNI_PNG_BASE64).toMatchImageSnapshot()
	},
}

export const FailWithDifferentImage: StoryObj = {
	loaders: [async () => ({ hasImageSnapshot: await hasImageSnapshot() })],
	render(_, { loaded: { hasImageSnapshot } }) {
		return hasImageSnapshot ? (
			<img data-testid="subject" style={{ width: 128, height: 128 }} src={UNI_PNG_URL} />
		) : (
			<div data-testid="subject">unit</div>
		)
	},
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

export const FailInPercent: StoryObj = {
	loaders: [async () => ({ hasImageSnapshot: await hasImageSnapshot() })],
	render(_, { loaded: { hasImageSnapshot } }) {
		const text = hasImageSnapshot ? 'unit text' : 'unit test'
		return <div data-testid="subject">{text}</div>
	},
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
				failureThresholdType: 'percent',
			})
			.then(
				() => {
					throw new Error('Should not reach')
				},
				(error) => {
					expect(error.message).toMatch(/Expected image to match but was differ by \d+.\d+%./)
				},
			)
	},
}

export const FailWhenSmaller: StoryObj = {
	loaders: [
		async () => {
			return {
				hasImageSnapshot: await hasImageSnapshot({
					snapshotKey: 'smaller',
				}),
			}
		},
	],
	render(_, { loaded: { hasImageSnapshot } }) {
		const style = hasImageSnapshot ? { width: 64, height: 64 } : { width: 128, height: 128 }
		return <img data-testid="subject" style={style} src={UNI_PNG_URL} />
	},
	async play({ canvas, loaded: { hasImageSnapshot } }) {
		const subject = canvas.getByTestId('subject')
		if (!hasImageSnapshot) {
			await expect(subject).toMatchImageSnapshot({
				snapshotKey: 'smaller',
			})
			return
		}

		// This will only execute in test environment
		await expect(subject)
			.toMatchImageSnapshot({
				snapshotKey: 'smaller',
				expectToFail: true,
			})
			.then(
				() => {
					throw new Error('Should not reach')
				},
				(error) => {
					expect(error.message).toMatch(/^Snapshot .* mismatched/)
					expect(error.message).toMatch(/The image size changed from 128x128 to 64x64/)
				},
			)
	},
}

export const FailWhenLarger: StoryObj = {
	loaders: [
		async () => {
			return {
				hasImageSnapshot: await hasImageSnapshot({
					snapshotKey: 'larger',
				}),
			}
		},
	],
	render(_, { loaded: { hasImageSnapshot } }) {
		const style = hasImageSnapshot ? { width: 128, height: 128 } : { width: 64, height: 64 }
		return <img data-testid="subject" style={style} src={UNI_PNG_URL} />
	},
	async play({ canvas, loaded: { hasImageSnapshot } }) {
		const subject = canvas.getByTestId('subject')
		if (!hasImageSnapshot) {
			await expect(subject).toMatchImageSnapshot({
				snapshotKey: 'larger',
			})
			return
		}
		// This will only execute in test environment
		await expect(subject)
			.toMatchImageSnapshot({
				snapshotKey: 'larger',
				expectToFail: true,
			})
			.then(
				() => {
					throw new Error('Should not reach')
				},
				(error) => {
					expect(error.message).toMatch(/^Snapshot .* mismatched/)
					expect(error.message).toMatch(/The image size changed from 64x64 to 128x128/)
				},
			)
	},
}

export const PassFailureThreshold: StoryObj = {
	loaders: [
		async () => {
			return {
				hasImageSnapshot: await hasImageSnapshot({
					snapshotKey: 'threshold',
				}),
			}
		},
	],
	render(_, { loaded: { hasImageSnapshot } }) {
		const text = hasImageSnapshot ? 'unit text' : 'unit test'
		return <div data-testid="subject">{text}</div>
	},
	async play({ canvas, loaded: { hasImageSnapshot } }) {
		const subject = canvas.getByTestId('subject')
		if (!hasImageSnapshot) {
			await expect(subject).toMatchImageSnapshot({
				snapshotKey: 'threshold',
			})
		}
		await expect(subject).toMatchImageSnapshot({
			snapshotKey: 'threshold',
			failureThreshold: 70,
		})
	},
}

export const FailFailureThreshold: StoryObj = {
	loaders: [
		async () => {
			return {
				hasImageSnapshot: await hasImageSnapshot({
					snapshotKey: 'threshold',
				}),
			}
		},
	],
	render(_, { loaded: { hasImageSnapshot } }) {
		const text = hasImageSnapshot ? 'unit text' : 'unit test'
		return <div data-testid="subject">{text}</div>
	},
	async play({ canvas, loaded: { hasImageSnapshot } }) {
		const subject = canvas.getByTestId('subject')
		if (!hasImageSnapshot) {
			await expect(subject).toMatchImageSnapshot({
				snapshotKey: 'threshold',
			})
			return
		}
		// This will only execute in test environment
		await expect(subject)
			.toMatchImageSnapshot({
				snapshotKey: 'threshold',

				expectToFail: true,
				failureThreshold: 20,
			})
			.then(
				() => {
					throw new Error('Should not reach')
				},
				(error) => {
					expect(error.message).toMatch(/Expected image to match within 20 pixels but was differ by \d+ pixels./)
				},
			)
	},
}

export const PassFailureThresholdPercent: StoryObj = {
	loaders: [
		async () => {
			return {
				hasImageSnapshot: await hasImageSnapshot({
					snapshotKey: 'threshold',
				}),
			}
		},
	],
	render(_, { loaded: { hasImageSnapshot } }) {
		const text = hasImageSnapshot ? 'unit text' : 'unit test'
		return <div data-testid="subject">{text}</div>
	},
	async play({ canvas, loaded: { hasImageSnapshot } }) {
		const subject = canvas.getByTestId('subject')
		if (!hasImageSnapshot) {
			await expect(subject).toMatchImageSnapshot({
				snapshotKey: 'threshold',
			})
		}
		await expect(subject).toMatchImageSnapshot({
			snapshotKey: 'threshold',

			failureThreshold: 1,
			failureThresholdType: 'percent',
		})
	},
}

export const FailFailureThresholdPercent: StoryObj = {
	loaders: [
		async () => ({
			hasImageSnapshot: await hasImageSnapshot({
				snapshotKey: 'threshold',
			}),
		}),
	],
	render(_, { loaded: { hasImageSnapshot } }) {
		const style = hasImageSnapshot ? { width: 128, height: 128 } : { width: 64, height: 64 }
		return <img data-testid="subject" style={style} src={UNI_PNG_URL} />
	},
	async play({ canvas, loaded: { hasImageSnapshot } }) {
		const subject = canvas.getByTestId('subject')
		if (!hasImageSnapshot) {
			await expect(subject).toMatchImageSnapshot({
				snapshotKey: 'threshold',
			})
			return
		}
		// This will only execute in test environment
		await expect(subject)
			.toMatchImageSnapshot({
				snapshotKey: 'threshold',

				expectToFail: true,
				failureThreshold: 0.1,
				failureThresholdType: 'percent',
			})
			.then(
				() => {
					throw new Error('Should not reach')
				},
				(error) => {
					expect(error.message).toMatch(/Expected image to match within 0.1% but was differ by \d+.\d+%./)
				},
			)
	},
}
