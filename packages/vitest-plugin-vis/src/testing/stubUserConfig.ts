import { stub } from 'type-plus'
import type { ViteUserConfig } from 'vitest/config'

export const stubUserConfig = stub.build<ViteUserConfig>((stub) => ({
	...stub,
}))
