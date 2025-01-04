import { stub } from 'type-plus'
import type { BrowserCommandContext } from 'vitest/node'

export const stubBrowserCommandContext = stub.build<BrowserCommandContext>({})
