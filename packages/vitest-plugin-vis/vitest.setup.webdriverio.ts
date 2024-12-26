import 'vitest-browser-react'
import { createVisConfig, trimCommonFolder } from './src/index.ts'

createVisConfig({
	customizeSnapshotSubpath(subPath) {
		return `wb/${trimCommonFolder(subPath)}`
	},
}).presets.basic()
