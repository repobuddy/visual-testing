import { defineCollection } from 'astro:content'
import { docsSchema } from '@astrojs/starlight/schema'
import { docsWithChangelogsLoader } from './loaders/changelog.ts'

export const collections = {
	docs: defineCollection({ loader: docsWithChangelogsLoader(), schema: docsSchema() }),
}
