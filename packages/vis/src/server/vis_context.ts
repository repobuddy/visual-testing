import type { VisContext } from '../shared/vis_context'

export const serverVisConext: VisContext = {
	state: {
		projectDir: '',
	},
}

export function resetServerState() {
	serverVisConext.state = { projectDir: '' }
}
