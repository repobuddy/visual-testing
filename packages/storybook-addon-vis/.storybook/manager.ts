import { brandTitle, tagBadges } from '@repobuddy/storybook/manager'
import { addons } from 'storybook/internal/manager-api'
import { themes } from 'storybook/internal/theming'

addons.setConfig({
	tagBadges,
	theme: {
		...themes.dark,
		brandTitle: brandTitle({
			title: 'storybook-addon-vis',
		}),
	},
})
