import type { Plugin } from 'vite'

/* v8 ignore start */
export function vis() {
	return {
		name: 'vis',
		config() {
			return {
				test: {
					browser: {
						name: undefined as unknown as string,
					},
				},
			}
		},
	} satisfies Plugin
}
/* v8 ignore end */
