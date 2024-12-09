import type { Locator } from '@vitest/browser/context'

export interface BrowserApi {
	saveScreenshot(filePath: string, selector: string): Promise<void>
}
