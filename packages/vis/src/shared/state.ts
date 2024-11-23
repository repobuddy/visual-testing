import type { VisOptions } from './types'

export type State = {
	options: VisOptions
}

export function createState(options: VisOptions = {}): State {
	return {
		options,
	}
}
