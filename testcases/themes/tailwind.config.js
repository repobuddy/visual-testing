const { join } = require('node:path')

/** @type {import('tailwindcss').Config} */
export default {
	content: [join(__dirname, './src/**/*.tsx')],
	darkMode: 'class',
	theme: {
		extend: {},
	},
	plugins: [],
}
