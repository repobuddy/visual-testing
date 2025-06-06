import { brandTitle } from '@repobuddy/storybook/manager'
import { tagBadges } from '@repobuddy/storybook/storybook-addon-tag-badges'
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
