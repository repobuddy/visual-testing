export function assertSnapshotKeyWithoutDash(snapshotKey: string | undefined) {
	if (snapshotKey?.includes('-')) {
		throw new Error('Snapshot key cannot contain dash')
	}
}
