import { type State, createState } from '../shared/state'
import type { VisOptions } from '../shared/types'

export const state: State = {
	options: {},
}

export function initializeServerState(options: VisOptions) {
	state.options = options
}

export function resetServerState() {
	state.options = {}
}
