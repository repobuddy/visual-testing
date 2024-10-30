import { commands } from './@vitest/browser/context'
import { state } from './state'

export async function hasSnapshot() {
	if (isRunningInStorybook()) return true

	return commands.hasSnapshot(state.baselineDir, state.id)
}

function isRunningInStorybook() {
	// state is set during vitest.
	return !state.baselineDir
}
