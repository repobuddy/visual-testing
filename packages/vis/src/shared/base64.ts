export function isBase64String(value: unknown): value is string {
	return typeof value === 'string' && /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/.test(value)
}
