import { basename, dirname, join, relative } from 'pathe'
import { expect } from 'vitest'
import { commands, page } from './@vitest/browser/context.js'
import './augment.js'
import { toMatchImageSnapshot } from './expect.to_match_image_snapshot.js'
import { state } from './state.js'
import { shouldTakeSnapshot } from './tags.js'
import type { VisOptions } from './types.js'

export function createVisConfig(options?: VisOptions) {
	expect.extend({ toMatchImageSnapshot })

	const h = {
		presets: {
			basic() {
				beforeAll(h.beforeAll)
				afterEach(h.afterEach.matchImageSnapshot)
			},
			theme(themes: Record<string, () => void | Promise<void>>) {
				beforeAll(h.beforeAll)
				afterEach(h.afterEach.matchPerTheme(themes))
			},
		},
		async beforeAll(suite: { file: { filepath: string }; name: string }) {
			state.name = suite.name
			state.testFilepath = suite.file.filepath
			state.testFilename = basename(state.testFilepath)
			state.projectDir = state.testFilepath.slice(0, -state.name.length)
			const snapshotPath = join(
				state.projectDir,
				options?.snapshotPath ?? `__snapshots__/${await commands.getSnapshotPlatform()}`,
			)
			const currentDir = dirname(state.testFilepath)
			state.baselineDir = relative(currentDir, join(snapshotPath, state.testFilename))
			state.resultDir = relative(currentDir, join(snapshotPath, '__results__', state.testFilename))
			state.diffDir = relative(currentDir, join(snapshotPath, '__diff_output__', state.testFilename))

			if (!state.snapshot[state.testFilepath]) {
				state.snapshot[state.testFilepath] = {}
				await commands.rmDir(state.resultDir)
				await commands.rmDir(state.diffDir)
			}
		},
		afterEach: {
			matchImageSnapshot: async (ctx: any) => {
				if (!shouldTakeSnapshot(ctx)) return
				const r = await page.imageSnapshot()
				expect(r).toMatchImageSnapshot()
			},
			matchPerTheme(themes: Record<string, () => Promise<void> | void>) {
				return async (ctx: any) => {
					if (!shouldTakeSnapshot(ctx)) return
					for (const themeId in themes) {
						await themes[themeId]()
						const r = await page.imageSnapshot({
							customizeSnapshotId: (id) => `${id}-${themeId}`,
						})
						await expect(r).toMatchImageSnapshot()
					}
				}
			},
		},
	}
	return h
}
