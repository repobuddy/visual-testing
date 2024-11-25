import type { BrowserCommand } from 'vitest/node'
import type { VisState } from '../../shared/vis_context'
import { serverVisContext } from '../vis_context'

export interface GetVisStateCommand {
	/**
	 * Get the vis context state.
	 */
	getVisState: () => Promise<VisState>
}

export const getVisState: BrowserCommand<[]> = async () => {
	console.info('getVisState', serverVisContext.state)
	return serverVisContext.state
}
