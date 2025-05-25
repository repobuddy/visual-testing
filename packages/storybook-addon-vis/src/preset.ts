import type { Channel } from 'storybook/internal/channels'
import { createStorybookVisServer } from './server.ts'
import type { StorybookVisOptions } from './server/vis_options.ts'
import { NAME } from './shared/contants.ts'
import { IMAGE_SNAPSHOT_RESULTS_REQUEST, IMAGE_SNAPSHOT_RESULTS_RESPONSE, type VisEvent } from './shared/events.ts'

export const experimental_serverChannel = async (channel: Channel, options: StorybookVisOptions) => {
	const server = createStorybookVisServer(options)

	channel.on(NAME, async (event: VisEvent) => {
		if (event.type === IMAGE_SNAPSHOT_RESULTS_REQUEST) {
			const results = await server.getImageSnapshotResults(event.name, event.importPath)
			channel.emit(NAME, {
				type: IMAGE_SNAPSHOT_RESULTS_RESPONSE,
				name: event.name,
				importPath: event.importPath,
				results,
			})
		}
	})

	return channel
}
