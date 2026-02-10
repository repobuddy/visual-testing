import { resolve } from 'pathe'
import type { PreparePageImageSnapshotComparisonCommand } from '../../shared/commands.types.ts'
import type { StorybookViewport } from '../../shared/viewport.ts'
import { file } from '../externals/file.ts'
import { getProjectRoot } from '../project.ts'
import { takePageSnapshot } from '../snapshot.ts'
import { visServerContext } from '../vis_server_context.ts'
import type { ExtendedBrowserCommand, ExtendedBrowserCommandContext } from '../vis_server_context.types.ts'
import { assertTestPathDefined } from './_assertions.ts'

/** Fallback when addon does not pass viewportSize (e.g. serialization or timing). Aligned with Storybook MINIMAL_VIEWPORTS. */
const FALLBACK_VIEWPORT_SIZES: Record<string, { width: number; height: number }> = {
	mobile1: { width: 320, height: 568 },
	mobile2: { width: 414, height: 896 },
	tablet: { width: 834, height: 1112 },
	desktop: { width: 1280, height: 1024 },
}

function resolveViewportFallback(viewport: StorybookViewport | undefined): { width: number; height: number } | undefined {
	if (!viewport?.value || typeof viewport.value !== 'string') return undefined
	const size = FALLBACK_VIEWPORT_SIZES[viewport.value]
	if (!size) return undefined
	return viewport.isRotated ? { width: size.height, height: size.width } : size
}

function setPageViewportSize(
	page: ExtendedBrowserCommandContext['page'],
	size: { width: number; height: number },
): Promise<void> | undefined {
	if (!page || typeof (page as { setViewportSize?: (size: { width: number; height: number }) => Promise<void> }).setViewportSize !== 'function') {
		return undefined
	}
	return (page as { setViewportSize: (size: { width: number; height: number }) => Promise<void> }).setViewportSize(size)
}

export const preparePageImageSnapshotComparison: ExtendedBrowserCommand<
	Parameters<PreparePageImageSnapshotComparisonCommand['preparePageImageSnapshotComparison']>
> = async (context, taskId, options) => {
	assertTestPathDefined(context, 'preparePageImageSnapshotComparison')
	// vitest:browser passes in `null` when not defined
	if (!options) options = {}
	options.timeout = options.timeout ?? 30000

	const viewportSize = options.viewportSize ?? resolveViewportFallback(options.viewport)
	if (viewportSize) {
		const setViewport = setPageViewportSize(context.page, viewportSize)
		if (setViewport) {
			await setViewport
			// Allow layout/iframe to settle after resize before taking screenshot
			await new Promise((r) => setTimeout(r, 200))
		}
	}

	const projectRoot = getProjectRoot(context)
	const info = await visServerContext.getSnapshotInfo(context, taskId, options)
	const baselineBuffer = await file.tryReadFile(resolve(projectRoot, info.baselinePath))
	const resultBuffer = await takePageSnapshot(context, projectRoot, info.resultPath, options)
	return {
		...info,
		projectRoot,
		baseline: baselineBuffer?.toString('base64'),
		result: resultBuffer.toString('base64'),
	}
}
