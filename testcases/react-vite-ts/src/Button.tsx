import type { ComponentProps } from 'react'
import './button.css'

/** Primary UI component for user interaction */
export const Button = ({
	primary,
	backgroundColor,
	size = 'medium',
	label,
	...props
}: {
	primary?: boolean | undefined
	backgroundColor?: string | undefined
	size?: 'small' | 'medium' | 'large' | undefined
	label: string
} & ComponentProps<'button'>) => {
	const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary'
	return (
		<button
			type="button"
			data-testid="subject"
			className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
			style={backgroundColor ? { backgroundColor } : undefined}
			{...props}
		>
			{label}
		</button>
	)
}
