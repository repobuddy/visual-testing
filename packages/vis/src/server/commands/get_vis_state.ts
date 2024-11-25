import type { BrowserCommand } from 'vitest/node'
import type { VisState } from '../../shared/vis_context'
import { getVisContext } from '../vis_context'

export interface GetVisStateCommand {
	/**
	 * Get the vis context state.
	 */
	getVisState: () => Promise<VisState>
}

export const getVisState: BrowserCommand<[]> = async (context) => {
	const visContext = await getVisContext(context.project)
	return visContext.state
}
