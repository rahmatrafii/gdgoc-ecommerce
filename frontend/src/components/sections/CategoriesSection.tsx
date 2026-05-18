import type { Category } from '../../types/catalog';
import {
	requiredCategoryVisuals,
	type CategoryVisual,
} from '../../utils/mockData';
import CategoryCard from '../cards/CategoryCard';
import SectionHeading from '../ui/SectionHeading';

interface CategoriesSectionProps {
	categories: Category[];
	isLoading: boolean;
	error?: string | null;
	onRetry?: () => Promise<void>;
}

function normalizeName(value: string): string {
	return value.trim().toLowerCase();
}

function composeCategoryCards(
	categories: Category[],
): Array<{ card: CategoryVisual; source: string }> {
	const byName = new Map(
		categories.map((category) => [normalizeName(category.name), category]),
	);

	const curatedCards = requiredCategoryVisuals.map((item) => {
		const match = byName.get(normalizeName(item.name));

		return {
			card: {
				...item,
				description: match?.description || item.description,
			},
			source: match ? 'From API' : 'Curated',
		};
	});

	const extraCards = categories
		.filter(
			(category) =>
				!requiredCategoryVisuals.some(
					(required) =>
						normalizeName(required.name) === normalizeName(category.name),
				),
		)
		.slice(0, 2)
		.map((category) => ({
			card: {
				name: category.name,
				description: category.description || 'Premium category collection.',
				image:
					'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80',
			},
			source: 'From API',
		}));

	return [...curatedCards, ...extraCards];
}

export default function CategoriesSection({
	categories,
	isLoading,
	error,
	onRetry,
}: CategoriesSectionProps) {
	const cards = composeCategoryCards(categories);

	return (
		<section
			id="categories"
			className="section-anchor py-20">
			<SectionHeading
				eyebrow="Featured Categories"
				title="Fashion Categories Crafted for Bold Expression"
				description="Explore curated collections spanning streetwear, sneakers, timepieces, and statement accessories built for modern luxury aesthetics."
			/>

			{error ? (
				<div className="mt-8 rounded-[22px] border border-rose-300/35 bg-rose-500/10 p-5 text-sm text-rose-100">
					<p>{error}</p>
					{onRetry ? (
						<button
							type="button"
							onClick={() => void onRetry()}
							className="mt-4 rounded-xl border border-white/20 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white/15">
							Retry Fetching Categories
						</button>
					) : null}
				</div>
			) : null}

			{isLoading ? (
				<div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
					{Array.from({ length: 6 }).map((_, index) => (
						<div
							key={`category-skeleton-${index}`}
							className="h-64 animate-pulse rounded-[22px] border border-white/10 bg-white/[0.04]"
						/>
					))}
				</div>
			) : (
				<div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
					{cards.map((entry, index) => (
						<CategoryCard
							key={`${entry.card.name}-${index}`}
							category={entry.card}
							sourceLabel={entry.source}
						/>
					))}
				</div>
			)}
		</section>
	);
}
