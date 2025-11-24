import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview'
import { setProjectAnnotations } from '@storybook/react-vite'
import { beforeAll } from 'vitest'
import * as projectAnnotations from './preview.tsx'

// `as any` is needed due to https://github.com/storybookjs/storybook/issues/33057
const annotations = setProjectAnnotations([a11yAddonAnnotations, projectAnnotations as any])

beforeAll(annotations.beforeAll)
