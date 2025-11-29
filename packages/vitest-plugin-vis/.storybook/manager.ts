import { brandTitle } from '@repobuddy/storybook/manager'
import { tagBadges } from '@repobuddy/storybook/storybook-addon-tag-badges'
import { addons } from 'storybook/manager-api'
import { themes } from 'storybook/theming'

addons.setConfig({
	tagBadges,
	theme: {
		...themes.dark,
		brandTitle: brandTitle({
			title: 'vitest-plugin-vis',
		}),
	},
})
