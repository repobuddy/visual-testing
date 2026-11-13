/**
 * Top folders that {@link trimCommonFolder} removes from the start of a test file path.
 */
export const COMMON_FOLDERS: readonly string[] = ['tests', 'test', 'src', 'source', 'js', 'ts', 'lib']

/**
 * Trim off common folder such as `src` or `tests` from the test file path.
 * This is used to generate the default snapshot sub-path.
 */
export function trimCommonFolder(suiteName: string) {
	suiteName = suiteName.replaceAll('..', '__')
	const suiteDir = suiteName.split('/', 1)[0]!
	if (COMMON_FOLDERS.includes(suiteDir)) return suiteName.slice(suiteDir.length + 1)
	return suiteName
}
