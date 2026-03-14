import type { ComponentProps } from 'react'
import './button.css'
import { clsx } from 'clsx'

/** Primary UI component for user interaction */
export const Button = ({
	primary,
	size = 'medium',
	label,
	...props
}: {
	primary?: boolean | undefined
	size?: 'small' | 'medium' | 'large' | undefined
	label: string
} & ComponentProps<'button'>) => {
	return (
		<button
			type="button"
			className={clsx(
				'storybook-button',
				`storybook-button--${size}`,
				primary
					? 'storybook-button--primary dark:text-gray-300 dark:bg-blue-900'
					: 'storybook-button--secondary dark:text-gray-300 dark:bg-gray-800',
			)}
			{...props}
		>
			{label}
		</button>
	)
}
