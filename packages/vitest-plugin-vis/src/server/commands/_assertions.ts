import { isAbsolute } from 'pathe'
import type { RequiredPick } from 'type-plus'
import type { ExtendedBrowserCommandContext } from '../vis_server_context.types.ts'

export function assertTestPathDefined(
	context: ExtendedBrowserCommandContext,
	commandName: string,
): asserts context is RequiredPick<ExtendedBrowserCommandContext, 'testPath'> {
	if (!context.testPath) {
		throw new Error(`'commands.${commandName}' requires testPath to be defined`)
	}
}

export function assertIsRelativePath(relativeFilePath: string, propName: string) {
	if (isAbsolute(relativeFilePath)) {
		throw new Error(`'${propName}' must be a relative path`)
	}
}
