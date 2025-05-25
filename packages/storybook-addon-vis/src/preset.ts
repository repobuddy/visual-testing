import type { Channel } from 'storybook/internal/channels'
import type { StorybookVisOptions } from './server/vis_options.ts'
import { NAME, type VisEvent } from './shared/contants.ts'

export const experimental_serverChannel = async (channel: Channel, _options: StorybookVisOptions) => {
	channel.on(NAME, ({ type, taskId }: VisEvent) => {
		console.info('channel.on', type, taskId)
		if (type === 'requestImageSnapshotResults') {
			channel.emit('responseImageSnapshotResults', {
				type: 'responseImageSnapshotResults',
				taskId,
				results: {
					key: 'auto',
				},
			})
		}
	})

	return channel
}
