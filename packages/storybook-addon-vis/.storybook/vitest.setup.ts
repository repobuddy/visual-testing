import { setProjectAnnotations } from '@storybook/react-vite'
import { vis, visAnnotations } from '../src/vitest-setup.ts'
import * as projectAnnotations from './preview.ts'

// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
setProjectAnnotations([visAnnotations, projectAnnotations])

vis.setup()
