import preview from './preview.ts'

export default {
	previewAnnotations(entry = []) {
		return [...entry, preview]
	},
}
