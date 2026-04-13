import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview'
import { setProjectAnnotations } from '@storybook/react-vite'
import { vis, visAnnotations } from 'storybook-addon-vis/vitest-setup'
import { beforeAll } from 'vitest'
import * as projectAnnotations from './preview.tsx'

const annotations = setProjectAnnotations([a11yAddonAnnotations, visAnnotations, projectAnnotations])

beforeAll(annotations.beforeAll)

vis.setup({ auto: true })
