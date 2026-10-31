// Copies the committed visual baselines the Showcase page displays into public/showcase/ so the
// site build serves them without a second committed copy. Fails the build when one is missing.
import { copyFile, mkdir, rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const repoRoot = new URL('../../../', import.meta.url)
const target = new URL('../public/showcase/', import.meta.url)

const addon = 'packages/storybook-addon-vis/__vis__/linux/__baselines__/client'
const plugin = 'packages/vitest-plugin-vis/__vis__/linux/__baselines__/client'
const themes = 'testcases/themes/__vis__/linux/__baselines__/component_snapshot.stories.tsx'

/** Published file name -> source path relative to the repo root. */
const showcaseImages = {
	'auto-capture-subject-only.png': `${addon}/auto_snapshot.stories.tsx/capture-subject-only-auto.png`,
	'theme-primary-light.png': `${themes}/primary-light.png`,
	'theme-primary-dark.png': `${themes}/primary-dark.png`,
	'theme-secondary-light.png': `${themes}/secondary-light.png`,
	'theme-secondary-dark.png': `${themes}/secondary-dark.png`,
	'threshold-baseline.png': `${addon}/expect/to_match_image_snapshot.stories.tsx/pass-failure-threshold-threshold.png`,
	'subject-locator.png': `${plugin}/expect/to_match_image_snapshot.spec.tsx/accepts-a-locator-1.png`,
	'subject-element.png': `${plugin}/expect/to_match_image_snapshot.spec.tsx/accepts-an-element-1.png`,
	'subject-base64.png': `${plugin}/expect/to_match_image_snapshot.spec.tsx/accepts-a-base64-image-1.png`,
}

await rm(target, { recursive: true, force: true })
await mkdir(fileURLToPath(target), { recursive: true })
for (const [name, source] of Object.entries(showcaseImages)) {
	await copyFile(fileURLToPath(new URL(source, repoRoot)), fileURLToPath(new URL(name, target)))
}
