import type { CSSProperties } from 'react'

type Plan = { name: string; price: string; accent: string; features: string[] }

const plans: Plan[] = [
	{ name: 'Starter', price: '$0', accent: '#0ea5e9', features: ['1 project', 'Linux baselines', 'Community support'] },
	{ name: 'Team', price: '$12', accent: '#6366f1', features: ['10 projects', 'Linux and Windows', 'Review images'] },
	{
		name: 'Enterprise',
		price: '$49',
		accent: '#f43f5e',
		features: ['Unlimited projects', 'Every platform', 'Priority support'],
	},
]

type PlanCardProps = {
	plan: Plan
	/** Overrides the button color. */
	buttonColor?: string | undefined
	/** Moves the badge left by this many pixels. */
	badgeShift?: number | undefined
	badge?: string | undefined
}

function PlanCard({ plan, buttonColor, badgeShift = 0, badge }: PlanCardProps) {
	const style = { '--accent': plan.accent, '--button': buttonColor } as CSSProperties
	return (
		<section className="plan" style={style} data-testid={`plan-${plan.name.toLowerCase()}`}>
			{badge && (
				<span className="badge" style={{ right: 20 + badgeShift }}>
					{badge}
				</span>
			)}
			<h2>{plan.name}</h2>
			<p className="price">{plan.price}</p>
			<ul>
				{plan.features.map((feature) => (
					<li key={feature}>{feature}</li>
				))}
			</ul>
			<button type="button">Choose {plan.name}</button>
		</section>
	)
}

/** Three plan cards. One column on a narrow viewport, three on a wide one. */
export function PlanGrid() {
	return (
		<main className="plans">
			{plans.map((plan) => (
				<PlanCard key={plan.name} plan={plan} badge={plan.name === 'Team' ? 'Popular' : undefined} />
			))}
		</main>
	)
}

/** The Team card on its own, 360px wide. */
export function TeamCard(props: Pick<PlanCardProps, 'buttonColor' | 'badgeShift'>) {
	return (
		<div className="single">
			<PlanCard plan={plans[1]!} badge="Popular" {...props} />
		</div>
	)
}
