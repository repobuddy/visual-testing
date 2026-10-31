/**
 * Pure URL builders for embedding Storybook. No Astro or DOM dependencies, so they can be unit-tested
 * and later extracted unchanged.
 */

export type StoryValue = string | number | boolean | null | undefined | StoryValue[] | { [key: string]: StoryValue }

/** Normalises a base path to start and end with exactly one `/`: `''` and `'/'` give `/`; `'x'` and `'/x//'` give `/x/`. */
export function normalizeBase(base: string | undefined): string {
	const trimmed = (base ?? '').replace(/^\/+|\/+$/g, '')
	return trimmed ? `/${trimmed}/` : '/'
}

export type StoryUrlOptions = {
	/** `import.meta.env.BASE_URL`. Any of `/x`, `/x/`, `x`, `''` is accepted. */
	base?: string
	/** Directory of the Storybook build, relative to `base`. Default `storybook`. */
	storybookPath?: string
}

function root(options: StoryUrlOptions) {
	const dir = (options.storybookPath ?? 'storybook').replace(/^\/+|\/+$/g, '')
	return `${normalizeBase(options.base)}${dir ? `${dir}/` : ''}`
}

const SAFE_STRING = /^[a-zA-Z0-9 _-]*$/

function encodeValue(value: StoryValue, path: string): string[] {
	if (value === undefined) return [`${path}:!undefined`]
	if (value === null) return [`${path}:!null`]
	if (typeof value === 'boolean') return [`${path}:!${value}`]
	if (typeof value === 'number') {
		if (!Number.isFinite(value)) throw new RangeError(`Cannot serialise non-finite number at "${path}"`)
		return [`${path}:${value}`]
	}
	if (typeof value === 'string') {
		// Storybook only accepts these characters in URL-provided strings and silently drops the rest.
		if (!SAFE_STRING.test(value)) {
			throw new RangeError(
				`Storybook URL params only accept letters, digits, space, "_" and "-"; got ${JSON.stringify(value)} at "${path}"`,
			)
		}
		return [`${path}:${value}`]
	}
	if (Array.isArray(value)) return value.flatMap((v, i) => encodeValue(v, `${path}[${i}]`))
	return Object.entries(value).flatMap(([k, v]) => encodeValue(v, `${path}.${k}`))
}

/**
 * Serialises an object into Storybook's `args=`/`globals=` format: `key:value;key2.nested:value`.
 * The result is NOT URL-encoded; `buildIframeUrl` does that through `URLSearchParams`.
 */
export function serializeStoryParam(input: Record<string, StoryValue>): string {
	return Object.entries(input)
		.flatMap(([key, value]) => {
			if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key)) throw new RangeError(`Invalid key "${key}"`)
			return encodeValue(value, key)
		})
		.join(';')
}

export type StoryIframeOptions = StoryUrlOptions & {
	id: string
	args?: Record<string, StoryValue>
	globals?: Record<string, StoryValue>
}

/** `<base>storybook/iframe.html?id=<id>&viewMode=story[&args=...][&globals=...]` */
export function buildIframeUrl({ id, args, globals, ...rest }: StoryIframeOptions): string {
	const params = new URLSearchParams({ id, viewMode: 'story' })
	if (args && Object.keys(args).length) params.set('args', serializeStoryParam(args))
	if (globals && Object.keys(globals).length) params.set('globals', serializeStoryParam(globals))
	return `${root(rest)}iframe.html?${params}`
}

/** `<base>storybook/?path=/story/<id>`: the full Storybook UI. */
export function buildStoryLinkUrl({ id, ...rest }: StoryUrlOptions & { id: string }): string {
	return `${root(rest)}?path=${encodeURIComponent(`/story/${id}`).replace(/%2F/g, '/')}`
}

/** Derives a readable title from a story id: `auto-snapshot--capture-subject-only` becomes `auto snapshot: capture subject only`. */
export function titleFromId(id: string): string {
	const [component = '', story] = id.split('--')
	const words = (s: string) => s.replace(/[-_/]+/g, ' ').trim()
	return story ? `${words(component)}: ${words(story)}` : words(component)
}
