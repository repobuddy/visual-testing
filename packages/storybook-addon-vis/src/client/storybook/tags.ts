export function isSnapshotEnabled(tags: string[]) {
	const noSnapshotIndex = tags.lastIndexOf('!snapshot')
	const snapshotIndex = tags.lastIndexOf('snapshot')

	if (noSnapshotIndex < 0 && snapshotIndex < 0) return undefined

	return noSnapshotIndex < snapshotIndex
}
