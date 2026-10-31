# Storybook embed components

Prototype of a Starlight plugin that embeds stories from a Storybook served on the same site.

## Usage

```mdx
import Story from '../../components/storybook/Story.astro'
import StoryLink from '../../components/storybook/StoryLink.astro'

<Story id="auto-snapshot--capture-subject-only" />
<Story id="..." height="50vh" args={{ label: 'Hello' }} link={false} />
Also see <StoryLink id="..." />.
```

## Props

`Story`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `id` | `string` | required | Storybook story id. |
| `title` | `string` | derived from `id` | Accessible iframe title. |
| `height` | `number \| string` | `300` | Number is px; string is any CSS length. |
| `args` | `Record<string, StoryValue>` | none | Serialised to `args=key:value;...`. |
| `globals` | `Record<string, StoryValue>` | none | Same format, as `globals=`. |
| `loading` | `'lazy' \| 'eager'` | `'lazy'` | Native iframe loading. |
| `link` | `boolean` | `true` | Show the "Open in Storybook" link under the iframe. |
| `storybookPath` | `string` | `'storybook'` | Storybook directory relative to the site base. |

`StoryLink`: `id` (required), `label` (default "Open in Storybook", or use the slot), `storybookPath`.

## URL building

`story-url.ts` is pure (no Astro, no DOM) and unit-tested in `story-url.spec.ts`. It normalises `BASE_URL` once
(`/x`, `/x/`, `x`, `''` all work), builds the iframe and full-UI URLs, and serialises args/globals.

Args/globals follow Storybook's URL format: strings may only contain letters, digits, space, `_` and `-`
(Storybook silently drops anything else), so the builder throws instead of emitting a URL that would be ignored.
Booleans become `!true`/`!false`, `null`/`undefined` become `!null`/`!undefined`, nested objects use `a.b:v`,
arrays use `a[0]:v`. Not supported: Storybook's `!date(...)`, `!hex(...)`, `!rgba(...)` shorthands.

## Theming

The iframe is a self-contained canvas: white background, hairline border from `--sl-color-hairline`, same in light and dark.
Storybook's `iframe.html` does not know about Starlight's `data-theme`, so the page frame follows Starlight but the
story content does not. Not solved: syncing the story's theme with Starlight's toggle. A possible approach is to post the
theme to the iframe or pass a `globals` value (for example `globals={{ theme: 'dark' }}`) when the Storybook defines a theme
global, but that needs a Storybook-side decorator and a client script; neither exists yet.
No browser render check has been done on this component.

## Extraction plan

Would become the package's public API: `Story.astro`, `StoryLink.astro`, the `story-url.ts` functions and `StoryValue`
type, and a Starlight plugin option for the Storybook path (today the `storybookPath` prop).

Depends on this site today:
- `import.meta.env.BASE_URL` (Astro supplies it; the plugin keeps this).
- Starlight CSS variables `--sl-color-hairline` and `--sl-text-sm` (the plugin would keep them with fallbacks).
- The Storybook being built to `<site>/storybook/` by `scripts/copy-storybook.mjs` and the turbo task; that stays in the site.
- Relative import paths in MDX; the plugin would export the components from the package.
