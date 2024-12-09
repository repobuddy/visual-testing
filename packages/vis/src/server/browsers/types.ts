export interface BrowserApi {
	saveScreenshot(filePath: string, selector: string): Promise<void>
}
