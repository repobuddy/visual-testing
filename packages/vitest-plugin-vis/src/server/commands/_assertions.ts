import type { RequiredPick } from 'type-plus'
import type { BrowserCommandContext } from 'vitest/node'

export function assertTestPathDefined(
	context: BrowserCommandContext,
	commandName: string,
): asserts context is RequiredPick<BrowserCommandContext, 'testPath'> {
	if (!context.testPath) {
		throw new Error(`'commands.${commandName}' requires testPath to be defined`)
	}
}
