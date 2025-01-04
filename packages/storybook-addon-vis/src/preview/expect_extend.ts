import { expect } from '@storybook/test'
import '../client/storybook/augment.ts'
import { toMatchImageSnapshot } from '../client/expect/to_match_image_snapshot.ts'

expect.extend({ toMatchImageSnapshot })
