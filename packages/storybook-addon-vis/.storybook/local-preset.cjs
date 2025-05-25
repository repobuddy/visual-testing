/**
 * to load the built addon in this test Storybook
 */
function managerEntries(entry = []) {
	return [...entry, require.resolve('../dist/manager.js')]
}

module.exports = {
	managerEntries,
	...require('../dist/preset.cjs'),
}
