import { expect } from 'vitest'
import './augment.ts'
import { toMatchImageSnapshot } from './to_match_image_snapshot.ts'

expect.extend({ toMatchImageSnapshot })
