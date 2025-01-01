import { expect } from 'vitest'
import '../shared/augment.ts'
import { toMatchImageSnapshot } from '../client/expect/to_match_image_snapshot.ts'

expect.extend({ toMatchImageSnapshot })
