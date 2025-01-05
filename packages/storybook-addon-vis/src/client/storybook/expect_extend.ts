import { expect } from '@storybook/test'
import { toMatchImageSnapshot } from '../expect/to_match_image_snapshot.ts'

expect.extend({ toMatchImageSnapshot })
