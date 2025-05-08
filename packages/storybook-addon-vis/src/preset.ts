import type { Channel } from 'storybook/internal/channels'
import type { Options } from 'storybook/internal/types'
import { NAME, type VisEvent } from './shared/contants.ts'

export const experimental_serverChannel = async (channel: Channel, _options: Options) => {
	console.info('experimental_serverChannel triggered')
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
