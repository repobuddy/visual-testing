export interface BrowserApi {
	takeScreenshot(
		projectRoot: string,
		relativeFilePath: string,
		selector: string,
		options:
			| {
					timeout?: number | undefined
			  }
			| undefined,
	): Promise<Buffer>
	takePageScreenshot(
		projectRoot: string,
		relativeFilePath: string,
		options:
			| {
					fullPage?: boolean | undefined
					timeout?: number | undefined
			  }
			| undefined,
	): Promise<Buffer>
}
