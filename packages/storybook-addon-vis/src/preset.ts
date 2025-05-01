import type { Channel } from 'storybook/internal/channels'
import type { Options } from 'storybook/internal/types'
import { NAME, type VisEvent } from './shared/contants.ts'

export const experimental_serverChannel = async (channel: Channel, _options: Options) => {
	console.log('experimental_serverChannel triggered')
	channel.on(NAME, ({ type, storyId }: VisEvent) => {
		console.log('channel.on', type, storyId)
		if (type === 'requestImageSnapshotResults') {
			channel.emit('responseImageSnapshotResults', {
				type: 'responseImageSnapshotResults',
				storyId,
				results: {
					key: 'auto',
				},
			})
		}
	})

	return channel
}
