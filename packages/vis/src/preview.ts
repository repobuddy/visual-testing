import type { ProjectAnnotations, Renderer } from 'storybook/internal/types'
import { commands } from './client/@vitest/browser/context'

const preview: ProjectAnnotations<Renderer> = {
	async beforeAll() {
		await commands.setupVisSuite()
	},
}

export default preview
