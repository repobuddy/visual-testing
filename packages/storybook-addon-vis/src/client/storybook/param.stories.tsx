import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import { expect } from 'storybook/test'
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
		failureThreshold: 0.3,
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
	render: () => <div data-testid="subject">unit test</div>,
}

export const SetSubject: StoryObj = {
	parameters: defineAutoSnapshotParam({
		failureThreshold: 70,
		subject: '[data-testid="alt"]',
	}),
	loaders: [async () => ({ hasImageSnapshot: await hasImageSnapshot() })],
	render: (_, { loaded: { hasImageSnapshot } }) => (
		<div data-testid="alt">{hasImageSnapshot ? 'unit text' : 'unit test'}</div>
	),
}

function ScrollableLongContent() {
	return (
		<div style={{ padding: 16, maxWidth: 720, fontFamily: 'sans-serif' }}>
			<h2 style={{ marginTop: 0 }}>License</h2>
			<p>
				Permission is hereby granted, free of charge, to any person obtaining a copy of this
				software and associated documentation files (the "Software"), to deal in the Software
				without restriction, including without limitation the rights to use, copy, modify,
				merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
				permit persons to whom the Software is furnished to do so, subject to the following
				conditions:
			</p>
			<p>
				The above copyright notice and this permission notice shall be included in all copies
				or substantial portions of the Software.
			</p>
			<p>
				THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
				INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
				PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
				HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
				CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
				OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
			</p>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
				incididunt ut labore et dolore magna aliqua. Amet massa vitae tortor condimentum
				lacinia quis. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl. Sed lectus
				vestibulum mattis ullamcorper velit sed. Rutrum tellus pellentesque eu tincidunt
				tortor aliquam nulla. Vitae turpis massa sed elementum tempus egestas sed sed risus.
				Cursus vitae congue mauris rhoncus aenean vel elit scelerisque mauris. Id neque
				aliquam vestibulum morbi blandit cursus risus at. Vel eros donec ac odio tempor orci.
				Ac felis donec et odio pellentesque diam volutpat. Laoreet non curabitur gravida arcu
				ac tortor dignissim. Rhoncus urna neque viverra justo nec ultrices dui. Bibendum arcu
				vitae elementum curabitur vitae nunc sed velit dignissim. Sed risus pretium quam
				vulputate dignissim suspendisse in est. Curabitur gravida arcu ac tortor. Nam libero
				justo laoreet sit amet cursus sit amet. Arcu dui vivamus arcu felis bibendum ut
				tristique et egestas. Eros donec ac odio tempor orci dapibus ultrices. At erat
				pellentesque adipiscing commodo elit at. Dignissim cras tincidunt lobortis feugiat
				vivamus at augue.
			</p>
			<p>
				Amet commodo nulla facilisi nullam vehicula ipsum. Blandit libero volutpat sed cras.
				Quam lacus suspendisse faucibus interdum posuere. Aenean euismod elementum nisi quis
				eleifend. Orci nulla pellentesque dignissim enim sit amet venenatis. Diam vel quam
				elementum pulvinar etiam non quam lacus. Sit amet dictum sit amet justo donec enim
				diam vulputate. Tincidunt ornare massa eget egestas purus. Pulvinar neque laoreet
				suspendisse interdum consectetur libero id faucibus. Morbi tincidunt augue interdum
				velit. Nullam non nisi est sit amet.
			</p>
			<p>
				Aliquet enim tortor at auctor urna nunc id cursus metus. Leo urna molestie at
				elementum eu facilisis. Consectetur purus ut faucibus pulvinar elementum integer.
				Volutpat est velit egestas dui id ornare arcu odio. At consectetur lorem donec massa
				sapien. Condimentum vitae sapien pellentesque habitant. Pellentesque habitant morbi
				tristique senectus. Et molestie ac feugiat sed lectus vestibulum. Arcu risus quis
				varius quam quisque. Turpis massa tincidunt dui ut ornare lectus sit amet. Magna eget
				est lorem ipsum dolor sit. Suspendisse faucibus interdum posuere lorem ipsum. Nisi
				vitae suscipit tellus mauris a diam maecenas sed. Ipsum dolor sit amet consectetur
				adipiscing. Ultricies integer quis auctor elit sed. Scelerisque varius morbi enim nunc
				faucibus a. Tortor consequat id porta nibh venenatis cras. Consectetur adipiscing elit
				ut aliquam purus sit.
			</p>
		</div>
	)
}

/** Full-page capture via parameters with scrollable content; baseline validates fullPage option. */
export const FullPageScrollableContent: StoryObj = {
	parameters: defineAutoSnapshotParam({
		fullPage: true,
	}),
	globals: {
		viewport: {value: 'iphone6p', isRotated: false},
	  },
	render: () => (
		<ScrollableLongContent />
	),
}
