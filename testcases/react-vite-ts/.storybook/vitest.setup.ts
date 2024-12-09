import { setProjectAnnotations } from '@storybook/react'
import { createVisConfig } from 'storybook-addon-vis/vitest-setup'
import { beforeAll } from 'vitest'
import * as projectAnnotations from './preview.js'

// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
const project = setProjectAnnotations([projectAnnotations])
beforeAll(project.beforeAll)

createVisConfig().presets.basic()
