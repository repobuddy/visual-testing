import type { Pick } from 'type-plus'
import type { VisOptions } from '../config/types.ts'
import type { ImageSnapshotComparisonInfo, MatchImageSnapshotOptions } from './types.ts'

export interface PrepareImageSnapshotComparisonCommand {
	prepareImageSnapshotComparison: (
		taskId: string,
		subject: string,
		options?: MatchImageSnapshotOptions | undefined,
	) => Promise<ImageSnapshotComparisonInfo | undefined>
}

export interface PreparePageImageSnapshotComparisonCommand {
	preparePageImageSnapshotComparison: (
		taskId: string,
		options?: MatchImageSnapshotOptions | undefined,
	) => Promise<ImageSnapshotComparisonInfo | undefined>
}

export interface SetupVisSuiteCommand {
	/**
	 * Sets up the visual testing suite by cleaning up previous snapshot and diff output directories.
	 * When this command is run for the first time,
	 * it will remove the results and diffs directory of all suites.
	 *
	 * In subsequent runs, it will only remove the results and diffs directory of the current suite.
	 */
	setupVisSuite: () => Promise<
		Pick<
			VisOptions,
			| 'comparisonMethod'
			| 'diffOptions'
			| 'failureThreshold'
			| 'failureThresholdType'
			| 'snapshotKey'
			| 'subject'
			| 'timeout'
		>
	>
}

export interface LoadImageSnapshotResultsCommand {
	loadImageSnapshotResults(taskId: string): Promise<ImageSnapshotResult[]>
}

export interface ImageSnapshotResult {
	filename: string
	/**
	 * The base64 encoded image of the baseline snapshot.
	 */
	baseline?: string | undefined
	/**
	 * The base64 encoded image of the result snapshot.
	 */
	result?: string | undefined
	/**
	 * The base64 encoded image of the diff snapshot.
	 */
	diff?: string | undefined
}

export interface HasImageSnapshotCommand {
	hasImageSnapshot(taskId: string, snapshotKey: string | undefined): Promise<boolean>
}

export interface ImageSnapshotNextIndexCommand {
	/**
	 * Get the index of the snapshot image to be created.
	 */
	imageSnapshotNextIndex(taskId: string): Promise<number>
}
