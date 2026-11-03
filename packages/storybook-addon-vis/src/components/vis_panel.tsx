import { ImageCompare, type ImageCompareMode } from '@just-web/react-image-compare'
import { RefreshIcon } from '@storybook/icons'
import React, { memo, useEffect, useState } from 'react'
import { AddonPanel, Button, Placeholder, ScrollArea } from 'storybook/internal/components'
import { styled } from 'storybook/theming'
import { SNAPSHOT_ROOT_DIR } from 'vitest-plugin-vis/client-api'
import type { ImageSnapshotResults } from '../shared/events.ts'

interface PanelProps {
	active: boolean
	getSnapshotResults: () => Promise<ImageSnapshotResults[]>
	onRefresh: () => void
}

export const VisPanel = memo(function VisPanel({ active, getSnapshotResults, onRefresh }: PanelProps) {
	const [snapshotResults, setSnapshotResults] = useState<ImageSnapshotResults[]>([])

	useEffect(() => {
		getSnapshotResults().then(setSnapshotResults)
	}, [getSnapshotResults])

	const groupedResults = snapshotResults.reduce(
		(acc, result) => {
			const suiteName = result.snapshotRootDir.slice(SNAPSHOT_ROOT_DIR.length + 1)
			const key = `(${suiteName}) ${result.fileName}`
			acc[key] = [...(acc[key] ?? []), result]
			return acc
		},
		{} as Record<string, ImageSnapshotResults[]>,
	)
	// A result alone (no baseline, no diff) is a snapshot that has no baseline yet, so there is nothing to review.
	const snapshots = Object.entries(groupedResults).filter(([, results]) =>
		results.some((result) => result.type !== 'result'),
	)
	return (
		<AddonPanel active={active}>
			{snapshots.length > 0 ? (
				<ScrollArea vertical>
					{snapshots.map(([key, results]) => {
						const baseline = results.find((result) => result.type === 'baseline')
						const result = results.find((result) => result.type === 'result')
						const diff = results.find((result) => result.type === 'diff')
						return (
							<div key={key}>
								{diff ? (
									<>
										<SnapshotRow failed>{key}</SnapshotRow>
										{baseline && result ? (
											<SnapshotCompare baseline={baseline} result={result} diff={diff} />
										) : (
											// No result to compare with (e.g. an old run): show each image as is.
											results.map((result) => (
												<img key={result.filePath} src={toDataUrl(result)} alt={result.fileName} />
											))
										)}
									</>
								) : (
									<>
										<SnapshotRow>
											<span>{key}</span>
											<Button
												aria-label="Reload snapshot"
												onClick={() => {
													onRefresh()
													getSnapshotResults().then(setSnapshotResults)
												}}
											>
												<RefreshIcon />
											</Button>
										</SnapshotRow>
										{baseline && <SnapshotImage image={baseline} />}
									</>
								)}
							</div>
						)
					})}
				</ScrollArea>
			) : (
				<Placeholder>There is no snapshots for this story</Placeholder>
			)}
		</AddonPanel>
	)
})

function toDataUrl(image: ImageSnapshotResults) {
	return `data:image/png;base64,${image.base64}`
}

function SnapshotImage({ image }: { image: ImageSnapshotResults }) {
	return <img src={toDataUrl(image)} alt={image.fileName} />
}

type CompareView = ImageCompareMode | 'diff'

const compareViews: Array<{ view: CompareView; label: string }> = [
	{ view: 'side-by-side', label: 'Side by side' },
	{ view: 'swipe', label: 'Swipe' },
	{ view: 'onion-skin', label: 'Onion skin' },
	{ view: 'diff', label: 'Diff' },
]

interface SnapshotCompareProps {
	baseline: ImageSnapshotResults
	result: ImageSnapshotResults
	diff: ImageSnapshotResults
}

/**
 * Compares the baseline and the result of a failed snapshot like GitHub's image diff,
 * plus the diff image that marks the changed pixels.
 */
function SnapshotCompare({ baseline, result, diff }: SnapshotCompareProps) {
	const [view, setView] = useState<CompareView>('side-by-side')
	// The compare mode stays mounted while the diff shows, so the swipe position and the opacity are kept.
	const [mode, setMode] = useState<ImageCompareMode>('side-by-side')
	return (
		<CompareContainer>
			<ViewSwitcher role="group" aria-label="Comparison view">
				{compareViews.map(({ view: v, label }) => (
					<Button
						key={v}
						size="small"
						variant="ghost"
						active={v === view}
						aria-pressed={v === view}
						onClick={() => {
							setView(v)
							if (v !== 'diff') setMode(v)
						}}
					>
						{label}
					</Button>
				))}
			</ViewSwitcher>
			<ImageCompare
				base={toDataUrl(baseline)}
				compare={toDataUrl(result)}
				baseLabel="Baseline"
				compareLabel="Result"
				mode={mode}
				showModeSwitcher={false}
				style={view === 'diff' ? { display: 'none' } : undefined}
			/>
			{view === 'diff' && <SnapshotImage image={diff} />}
		</CompareContainer>
	)
}

const CompareContainer = styled.div({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	gap: '0.5rem',
	padding: '0.5rem',
})

const ViewSwitcher = styled.div({
	display: 'flex',
	gap: '0.25rem',
})

const SnapshotRow = styled.div<{ failed?: boolean }>(
	({ theme, failed }: { theme: any; failed?: boolean | undefined }) => ({
		display: 'flex',
		alignItems: 'center',
		gap: '0.5rem',
		paddingBlock: '0.5rem',
		paddingInline: '0.2rem',
		backgroundColor: failed ? theme.background.negative : theme.background.positive,
		color: theme.barTextColor,
	}),
)
