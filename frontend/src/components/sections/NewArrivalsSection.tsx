import type { Category, FashionProduct } from '../../types/catalog';
import ProductCard from '../cards/ProductCard';
import Button from '../ui/Button';
import SectionHeading from '../ui/SectionHeading';

interface NewArrivalsSectionProps {
	products: FashionProduct[];
	categories: Category[];
	isLoading: boolean;
	error: string | null;
	searchValue: string;
	selectedCategoryID: string;
	stockOnly: boolean;
	onSearchChange: (value: string) => void;
	onCategoryChange: (value: string) => void;
	onStockOnlyChange: (value: boolean) => void;
	onResetFilters: () => void;
	onRetry: () => Promise<void>;
	onQuickAdd: (productID: string) => Promise<void> | void;
}

export default function NewArrivalsSection({
	products,
	categories,
	isLoading,
	error,
	searchValue,
	selectedCategoryID,
	stockOnly,
	onSearchChange,
	onCategoryChange,
	onStockOnlyChange,
	onResetFilters,
	onRetry,
	onQuickAdd,
}: NewArrivalsSectionProps) {
	const hasActiveFilters =
		searchValue.trim().length > 0 || selectedCategoryID !== '' || !stockOnly;

	return (
		<section
			id="new-arrivals"
			className="section-anchor py-20">
			<SectionHeading
				eyebrow="New Arrival Products"
				title="Premium Drops Selected for the Next Fashion Wave"
				description="Designed with polished visual hierarchy and quick shopping actions to maximize conversion while keeping the experience cinematic."
			/>

			<div className="mt-8 rounded-[22px] border border-white/15 bg-white/[0.03] p-4 shadow-[0_12px_40px_rgba(4,8,20,0.35)] backdrop-blur-xl sm:p-5">
				<div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[1.2fr_1fr_auto_auto] xl:items-center">
					<label
						htmlFor="new-arrivals-search"
						className="sr-only">
						Search products
					</label>
					<input
						id="new-arrivals-search"
						type="search"
						value={searchValue}
						onChange={(event) => onSearchChange(event.target.value)}
						placeholder="Search by product name"
						className="h-11 w-full rounded-xl border border-white/20 bg-black/25 px-4 text-sm text-white outline-none transition placeholder:text-slate-300/70 focus:border-cyan-100/70 focus:ring-2 focus:ring-cyan-100/35"
					/>

					<label
						htmlFor="new-arrivals-category"
						className="sr-only">
						Filter by category
					</label>
					<select
						id="new-arrivals-category"
						value={selectedCategoryID}
						onChange={(event) => onCategoryChange(event.target.value)}
						className="h-11 rounded-xl border border-white/20 bg-black/25 px-3 text-sm text-white outline-none transition focus:border-cyan-100/70 focus:ring-2 focus:ring-cyan-100/35">
						<option
							value=""
							className="bg-[#0b0f1c] text-white">
							All Categories
						</option>
						{categories.map((category) => (
							<option
								key={category.id}
								value={category.id}
								className="bg-[#0b0f1c] text-white">
								{category.name}
							</option>
						))}
					</select>

					<label className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/20 bg-black/20 px-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-100">
						<input
							type="checkbox"
							checked={stockOnly}
							onChange={(event) => onStockOnlyChange(event.target.checked)}
							className="h-4 w-4 rounded border-white/40"
						/>
						In Stock Only
					</label>

					<Button
						variant="ghost"
						onClick={onResetFilters}
						disabled={!hasActiveFilters}>
						Reset Filters
					</Button>
				</div>
			</div>

			{error ? (
				<div className="mt-8 rounded-[22px] border border-rose-300/35 bg-rose-500/10 p-5 text-sm text-rose-100">
					<p>{error}</p>
					<Button
						className="mt-4"
						variant="ghost"
						onClick={() => void onRetry()}>
						Retry Fetching Products
					</Button>
				</div>
			) : null}

			{isLoading ? (
				<div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
					{Array.from({ length: 8 }).map((_, index) => (
						<div
							key={`arrival-skeleton-${index}`}
							className="h-[450px] animate-pulse rounded-[22px] border border-white/10 bg-white/[0.04]"
						/>
					))}
				</div>
			) : (
				<>
					{products.length === 0 ? (
						<div className="mt-8 rounded-[22px] border border-amber-300/30 bg-amber-400/10 p-5 text-sm text-amber-100">
							{hasActiveFilters
								? 'Tidak ada produk yang cocok dengan filter saat ini. Coba reset filter atau kata kunci lain.'
								: 'Produk dari backend belum ada. Isi data produk dulu, lalu klik Retry.'}
							<Button
								className="mt-4"
								variant="ghost"
								onClick={() => void onRetry()}>
								Retry Fetching Products
							</Button>
						</div>
					) : null}

					<div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
						{products.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								onQuickAdd={onQuickAdd}
							/>
						))}
					</div>
				</>
			)}
		</section>
	);
}
