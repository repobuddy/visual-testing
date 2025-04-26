import { stub } from 'type-plus'
import type { UserConfig } from 'vite'

export const stubUserConfig = stub.build<UserConfig & { configFile: string }>((stub) => ({
	...stub,
}))
