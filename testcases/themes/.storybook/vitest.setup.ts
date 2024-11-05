import { type StoryContext, setProjectAnnotations } from '@storybook/react'
import { page } from 'storybook-addon-vis'
import {
	configureSnapshotBeforeAll,
	configureSnapshotBeforeEach,
	shouldTakeSnapshot,
	toMatchImageSnapshot,
} from 'storybook-addon-vis/vitest-setup'
import { afterEach, beforeAll, beforeEach, expect } from 'vitest'
import * as projectAnnotations from './preview'

expect.extend({ toMatchImageSnapshot })

// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
const project = setProjectAnnotations([projectAnnotations])

beforeAll(async (suite) => {
	project.beforeAll()
	await configureSnapshotBeforeAll(suite)
})

beforeEach((ctx) => {
	configureSnapshotBeforeEach(ctx)
})

afterEach<{ story?: StoryContext }>(async (ctx) => {
	if (!shouldTakeSnapshot(ctx)) return
	const r = await page.imageSnapshot({
		customizeSnapshotId: (id) => `${id}-dark`,
	})

	document.documentElement.classList.add('dark')
	await expect(r).toMatchImageSnapshot()

	document.documentElement.classList.remove('dark')
	const r2 = await page.imageSnapshot({
		customizeSnapshotId: (id) => `${id}-light`,
	})
	await expect(r2).toMatchImageSnapshot()
})
