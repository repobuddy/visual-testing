import type { Meta } from '@storybook/react'
import { expect } from '@storybook/test'
import { cdp } from '../../../index.js'

export default {
	title: 'vitest/context',
	render: () => <>unit test</>,
} satisfies Meta

export const AccessCDP = {
	play() {
		expect(cdp()).toBeDefined()
	},
}
