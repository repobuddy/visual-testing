import 'vitest-browser-react'
import '@fontsource-variable/inter/wght.css'
import './src/showcase.css'
import { beforeEach } from 'vitest'

// The font is declared with `font-display: swap`.
// Load it before each test so no capture shows the fallback font.
beforeEach(async () => {
	await document.fonts.load('400 16px "Inter Variable"')
	await document.fonts.load('800 16px "Inter Variable"')
})
