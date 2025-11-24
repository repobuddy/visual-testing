import { dirname } from 'node:path'
import type { StorybookVisOptions } from '../server/types.ts'

/**
 * Defines the Storybook Visual Testing addon configuration.
 *
 * When called without options, returns the package directory name as a string.
 * When called with options, returns an object containing both the package name and the provided options.
 *
 * @returns When called without options, returns the package directory path as a string.
 *
 * @example
 * ```ts
 * // Without options - returns just the package name
 * const addonName = defineStorybookVis()
 * // Returns: string (package directory path)
 * ```
 *
 * @example
 * ```ts
 * // With options - returns object with name and options
 * const addonConfig = defineStorybookVis({
 *   visProjects: [
 *     {
 *       snapshotRootDir: '__vis__/linux',
 *     },
 *   ],
 * })
 * // Returns: { name: string, options: StorybookVisOptions }
 * ```
 */
export function defineStorybookVis(): string
/**
 * Defines the Storybook Visual Testing addon configuration with options.
 *
 * @param options - Configuration options for visual testing suites in Storybook.
 * @param options.visProjects - Array of visual testing project configurations.
 * @param options.visProjects[].snapshotRootDir - Root directory for storing snapshots. Can be a string path or a function that returns a path based on CI and platform context.
 * @param options.visProjects[].snapshotSubpath - Optional function to customize the snapshot subdirectory path.
 *
 * @returns An object containing the package name and the provided options.
 *
 * @example
 * ```ts
 * // In .storybook/main.ts
 * import { defineStorybookVis } from 'storybook-addon-vis/node'
 *
 * export default {
 *   addons: [
 *     defineStorybookVis({
 *       visProjects: [
 *         {
 *           snapshotRootDir: '__vis__/linux',
 *         },
 *         {
 *           snapshotRootDir: '__vis__/local',
 *         },
 *       ],
 *     }),
 *   ],
 * }
 * ```
 */
export function defineStorybookVis(options: StorybookVisOptions): { name: string; options: StorybookVisOptions }
export function defineStorybookVis(options?: StorybookVisOptions | undefined) {
	const name = dirname(import.meta.resolve('storybook-addon-vis', 'package.json'))
	return !options ? name : { name, options }
}
