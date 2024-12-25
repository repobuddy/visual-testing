import type { VisOptions } from '../config/types.ts'
import { SNAPSHOT_ROOT_DIR } from '../shared/constants.ts'

function createVisContext() {
	let visOptions: VisOptions

	return {
		setOptions(options?: VisOptions) {
			visOptions = {
				snapshotRootDir: SNAPSHOT_ROOT_DIR,
				...options,
			}
		},
		/** for testing only */
		getOptions() {
			return visOptions
		},
	}
}

export const visContext = createVisContext()
