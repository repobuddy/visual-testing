import { setProjectAnnotations } from '@storybook/react'
import { beforeAll } from 'vitest'
import { trimCommonFolder } from '../src/index.js'
import * as visPreview from '../src/preview.js'
import { createVisConfig } from '../src/vitest-setup.js'
import * as projectAnnotations from './preview.js'

// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
const project = setProjectAnnotations([projectAnnotations, visPreview])

beforeAll(project.beforeAll)

createVisConfig({
	customizeSnapshotSubpath(subPath) {
		return `wb/${trimCommonFolder(subPath)}`
	},
}).presets.basic()
