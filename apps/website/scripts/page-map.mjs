// @ts-check

// The page map of docs/proposals/website-organization.md (section 3) as data: one entry per moved page.
// `from` and `to` are page slugs without the base and without slashes at either end, for example
// `addon/install`. The site root is the empty string.
//
// The map is empty in stage 1 because no page has moved yet. Stage 2 fills it in, one entry per old URL.
// A page that splits into several pages gets one entry, pointing at the page that keeps most of its content.

/** @type {ReadonlyArray<{ from: string, to: string }>} */
export const PAGE_MAP = []
