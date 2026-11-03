import React from 'react'

/**
 * `react/jsx-runtime` built on `React.createElement`.
 *
 * The Storybook manager provides React (18) as a global, but not `react/jsx-runtime`.
 * Without this, Storybook would bundle the project's own `react/jsx-runtime` into the manager,
 * and elements made by React 19's runtime do not render in React 18.
 * `tsdown.config.ts` points the manager bundle's `react/jsx-runtime` imports here.
 */
export const Fragment = React.Fragment

export function jsx(type: React.ElementType, props: Record<string, unknown> | null, key?: React.Key) {
	const { children, ...rest } = props ?? {}
	const config = key === undefined ? rest : { ...rest, key }
	return children === undefined
		? React.createElement(type, config)
		: React.createElement(type, config, children as React.ReactNode)
}

/** Same as `jsx`, but `children` is a static array, which needs no keys. */
export function jsxs(type: React.ElementType, props: Record<string, unknown> | null, key?: React.Key) {
	const { children, ...rest } = props ?? {}
	const config = key === undefined ? rest : { ...rest, key }
	return React.createElement(type, config, ...(children as React.ReactNode[]))
}
