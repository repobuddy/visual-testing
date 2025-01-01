import type { StoryContext } from 'storybook/internal/types'

type VisAnnotations = {
	beforeAll(): Promise<void>
	beforeEach(ctx: StoryContext): void
}

declare const visAnnotations: VisAnnotations

export default visAnnotations
