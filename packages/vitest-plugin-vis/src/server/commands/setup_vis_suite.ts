import { setupSuite } from '../suite.ts'
import type { ExtendedBrowserCommand, ExtendedBrowserCommandContext } from '../vis_server_context.types.ts'
import { assertTestPathDefined } from './_assertions.ts'

export const setupVisSuite: ExtendedBrowserCommand<[]> = async (context): Promise<{ subject: string | undefined }> => {
	assertTestPathDefined(context, 'setupVisSuite')
	return setupSuite(context as unknown as ExtendedBrowserCommandContext)
}
