import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview'
import { setProjectAnnotations } from '@storybook/react-vite'
import { vis, visAnnotations } from 'storybook-addon-vis/vitest-setup'
import { beforeAll } from 'vitest'
import * as projectAnnotations from './preview.ts'

// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
const annotations = setProjectAnnotations([a11yAddonAnnotations, visAnnotations, projectAnnotations])

beforeAll(annotations.beforeAll)

vis.setup()
