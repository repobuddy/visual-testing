import { page } from '@vitest/browser/context'
import './augment.ts'
import { hasImageSnapshot } from './has_image_snapshot.ts'

page.extend({ hasImageSnapshot })
