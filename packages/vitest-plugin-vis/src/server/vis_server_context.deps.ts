/* v8 ignore start */
import ci from 'is-ci'
import { rimraf } from 'rimraf'

export const deps = {
	rimraf,
	getSnapshotPlatform() {
		return ci ? process.platform : 'local'
	},
}
/* v8 ignore end */
