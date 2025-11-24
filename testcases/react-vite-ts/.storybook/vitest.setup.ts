import { setProjectAnnotations } from '@storybook/react-vite'
import { vis, visAnnotations } from 'storybook-addon-vis/vitest-setup'
import * as projectAnnotations from './preview.js'

// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
setProjectAnnotations([visAnnotations, projectAnnotations])

vis.setup({ auto: true })
