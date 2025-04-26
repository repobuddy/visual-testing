export interface BrowserApi {
	takeScreenshot(
		filePath: string,
		selector: string,
		options:
			| {
					timeout?: number | undefined
			  }
			| undefined,
	): Promise<Buffer>
	takePageScreenshot(filePath: string, options: { timeout?: number | undefined } | undefined): Promise<Buffer>
}
