import type { VisContext } from '../shared/vis_context'

export const clientVisConext: VisContext = {
	state: undefined,
}

export function resetClientState() {
	clientVisConext.state = undefined
}
