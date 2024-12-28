import type { Plugin } from 'vite'
import { type ImageSnapshotCommand, imageSnapshot } from '../server/commands/image_snapshot.ts'
import { type MatchImageSnapshotCommand, matchImageSnapshot } from '../server/commands/match_image_snapshot.ts'
import { type SetupVisSuiteCommand, setupVisSuite } from '../server/commands/setup_vis_suite.ts'
import { visContext } from '../server/vis_context.ts'
import { NAME } from '../shared/constants.ts'
import type { VisOptions } from './types.ts'

declare module '@vitest/browser/context' {
	interface BrowserCommands extends SetupVisSuiteCommand, ImageSnapshotCommand, MatchImageSnapshotCommand {}
}

/**
 * Create a Vite plugin for visual testing.
 */
export function vis(options?: VisOptions) {
	visContext.setOptions(options)
	return {
		name: NAME,
		config() {
			return {
				test: {
					browser: {
						name: undefined as unknown as string,
						commands: {
							setupVisSuite,
							imageSnapshot,
							matchImageSnapshot,
						},
					},
				},
			}
		},
	} satisfies Plugin
}
