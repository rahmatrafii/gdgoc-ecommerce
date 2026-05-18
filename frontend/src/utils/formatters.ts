export function formatCurrency(value: number): string {
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		maximumFractionDigits: 0,
	}).format(value);
}

export function formatCompactNumber(value: number): string {
	return new Intl.NumberFormat('en', {
		notation: 'compact',
		maximumFractionDigits: 1,
	}).format(value);
}

export function clampRating(value: number): number {
	return Math.min(5, Math.max(1, Number(value.toFixed(1))));
}
