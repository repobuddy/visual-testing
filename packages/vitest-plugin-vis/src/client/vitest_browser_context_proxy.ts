import type { BrowserCommands, Platform } from '@vitest/browser/context'
import type { SerializedConfig } from 'vitest'

let ctx: Awaited<typeof import('@vitest/browser/context')>

if ((globalThis as any).__vitest_browser__) {
	import('@vitest/browser/context').then((m) => {
		ctx = m
	})
}

export const server = new Proxy<{
	/**
	 * Platform the Vitest server is running on.
	 * The same as calling `process.platform` on the server.
	 */
	platform: Platform
	/**
	 * Runtime version of the Vitest server.
	 * The same as calling `process.version` on the server.
	 */
	version: string
	/**
	 * Name of the browser provider.
	 */
	provider: string
	/**
	 * Name of the current browser.
	 */
	browser: string
	/**
	 * Available commands for the browser.
	 * @see {@link https://vitest.dev/guide/browser/commands}
	 */
	commands: BrowserCommands
	/**
	 * Serialized test config.
	 */
	config: SerializedConfig
}>({} as any, {
	get(target, prop) {
		return (target as any)[prop] ?? (ctx?.server as any)[prop]
	},
})
