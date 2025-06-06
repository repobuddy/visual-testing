export function isSnapshotEnabled(tags: string[]) {
	return tags.lastIndexOf('!snapshot') < tags.lastIndexOf('snapshot')
}
