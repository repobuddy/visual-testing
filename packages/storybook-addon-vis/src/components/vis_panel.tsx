import { memo } from 'react'
import { AddonPanel, Placeholder } from 'storybook/internal/components'
import type { ImageSnapshotResults } from '../shared/events.ts'

interface PanelProps {
	active: boolean
	snapshotResults: ImageSnapshotResults[]
}

export const VisPanel = memo(function VisResultsPanel({ active, snapshotResults }: PanelProps) {
	return (
		<AddonPanel active={active}>
			{snapshotResults.length > 0 ? (
				<div>
					{snapshotResults.map((result) => (
						<div key={result.filePath}>
							<h3>{result.fileName}</h3>
							<img src={`data:image/png;base64,${result.base64}`} alt={result.fileName} />
						</div>
					))}
				</div>
			) : (
				<Placeholder>There is no snapshots for this story</Placeholder>
			)}
		</AddonPanel>
	)
})
