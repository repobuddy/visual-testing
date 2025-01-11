/* v8 ignore start */
import ci from 'is-ci'
import { rimraf } from 'rimraf'

export const ctx = {
	rimraf,
	getSnapshotPlatform() {
		return ci ? process.platform : 'local'
	},
}
/* v8 ignore end */
