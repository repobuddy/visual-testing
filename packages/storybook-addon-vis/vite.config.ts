import { defineConfig } from 'vite'

export default defineConfig({
	optimizeDeps: {
		include: ['storybook-addon-tag-badges/preview'],
	},
})
