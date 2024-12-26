import './client/page/extend.ts'
export * from './client/trim_common_folder.ts'

export function createVisConfig(_options?: any) {
	return {
		presets: {
			basic() {},
		},
	}
}
