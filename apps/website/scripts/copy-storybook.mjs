// Copies the addon's built Storybook into the site output so it is served at <base>/storybook/.
import { cp, rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const source = fileURLToPath(new URL('../../../packages/storybook-addon-vis/storybook-static', import.meta.url))
const target = fileURLToPath(new URL('../dist/storybook', import.meta.url))

await rm(target, { recursive: true, force: true })
await cp(source, target, { recursive: true })
