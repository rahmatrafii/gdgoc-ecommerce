import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Search, SlidersHorizontal } from 'lucide-react';
import Navbar from '../components/sections/Navbar';
import FooterSection from '../components/sections/FooterSection';
import ProductCard from '../components/cards/ProductCard';
import { fetchCategoryById } from '../services/categoryService';
import { useProducts } from '../hooks/useProducts';
import { useAuth } from '../hooks/useAuth';
import { addItemToCart } from '../services/cartService';
import { ApiRequestError } from '../services/apiClient';
import { requiredCategoryVisuals } from '../utils/mockData';
import type { Category, ProductQuery } from '../types/catalog';

type BannerTone = 'success' | 'error';

interface BannerState {
	message: string;
	tone: BannerTone;
}

export default function CategoryPage() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();

	const [category, setCategory] = useState<Category | null>(null);
	const [categoryLoading, setCategoryLoading] = useState<boolean>(true);
	const [categoryError, setCategoryError] = useState<string | null>(null);

	const [searchValue, setSearchValue] = useState<string>('');
	const [stockOnly, setStockOnly] = useState<boolean>(true);
	const [banner, setBanner] = useState<BannerState | null>(null);

	// Fetch Category Details
	useEffect(() => {
		if (!id) {
			setCategoryError('Category ID is missing.');
			setCategoryLoading(false);
			return;
		}

		async function loadCategory() {
			try {
				setCategoryLoading(true);
				const data = await fetchCategoryById(id!);
				setCategory(data);
				setCategoryError(null);
			} catch (err) {
				setCategoryError(
					err instanceof Error ? err.message : 'Failed to load category.'
				);
			} finally {
				setCategoryLoading(false);
			}
		}

		void loadCategory();
	}, [id]);

	// Prepare Product Query
	const productQuery = useMemo<ProductQuery>(() => {
		return {
			page: 1,
			per_page: 48,
			category: id,
			in_stock: stockOnly ? true : undefined,
			q: searchValue.trim() || undefined,
		};
	}, [id, searchValue, stockOnly]);

	// Fetch Products in Category
	const {
		products,
		isLoading: productsLoading,
		error: productsError,
		refresh: refreshProducts,
	} = useProducts(productQuery);

	// Find category visual image matching the category name
	const categoryImage = useMemo(() => {
		if (!category) {
			return 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80';
		}
		const visual = requiredCategoryVisuals.find(
			(v) => v.name.trim().toLowerCase() === category.name.trim().toLowerCase()
		);
		return (
			visual?.image ||
			'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80'
		);
	}, [category]);

	// Auto-dismiss banner
	useEffect(() => {
		if (!banner) {
			return;
		}

		const timeoutID = window.setTimeout(() => {
			setBanner(null);
		}, 3200);

		return () => {
			window.clearTimeout(timeoutID);
		};
	}, [banner]);

	// Quick Add to Cart Handler
	async function handleQuickAdd(productID: string) {
		if (!isAuthenticated) {
			navigate('/login');
			return;
		}

		try {
			await addItemToCart(productID, 1);
			setBanner({
				message: 'Item added to cart successfully.',
				tone: 'success',
			});
		} catch (err) {
			if (err instanceof ApiRequestError && err.status === 401) {
				setBanner({
					message: 'Please sign in first to add products to cart.',
					tone: 'error',
				});
				return;
			}

			setBanner({
				message: 'Unable to add item to cart right now. Please try again.',
				tone: 'error',
			});
		}
	}

	return (
		<div className="luxury-background min-h-screen text-white">
			<Navbar />

			<main className="mx-auto w-full max-w-[1240px] px-4 pb-24 pt-8 sm:px-6 lg:px-10">
				{/* Back Navigation */}
				<div className="mb-6">
					<Link
						to="/"
						className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
					>
						<ArrowLeft size={16} />
						<span>Back to Home</span>
					</Link>
				</div>

				{/* Category Banner */}
				{categoryLoading ? (
					<div className="h-60 animate-pulse rounded-[22px] border border-white/10 bg-white/[0.04]" />
				) : categoryError ? (
					<div className="rounded-[22px] border border-rose-300/35 bg-rose-500/10 p-6 text-center text-rose-100">
						<p>{categoryError}</p>
					</div>
				) : category ? (
					<div className="relative overflow-hidden rounded-[22px] border border-white/15 bg-slate-900/40 shadow-2xl">
						<img
							src={categoryImage}
							alt={category.name}
							className="h-64 w-full object-cover opacity-35"
						/>
						<div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
						<div className="absolute inset-y-0 left-0 flex flex-col justify-center p-8 md:p-12">
							<span className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">
								Category Collection
							</span>
							<h1 className="editorial-heading mt-2 text-4xl font-bold text-white md:text-5xl">
								{category.name}
							</h1>
							<p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
								{category.description || 'Premium curated collection crafted for modern luxury aesthetics.'}
							</p>
						</div>
					</div>
				) : null}

				{/* Filters & Product Grid */}
				<div className="mt-12">
					<div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
						<div className="flex items-center gap-2">
							<SlidersHorizontal size={18} className="text-cyan-200" />
							<h2 className="text-lg font-semibold tracking-wider">FILTER PRODUCTS</h2>
						</div>

						<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
							{/* Search input */}
							<div className="relative">
								<input
									type="text"
									placeholder="Search in category..."
									value={searchValue}
									onChange={(e) => setSearchValue(e.target.value)}
									className="w-full rounded-full border border-white/15 bg-white/5 py-2 pl-10 pr-4 text-sm text-white placeholder-slate-400 outline-none transition focus:border-cyan-200/55 sm:w-64"
								/>
								<Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
							</div>

							{/* In Stock Filter */}
							<label className="flex cursor-pointer items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-200 select-none hover:bg-white/8">
								<input
									type="checkbox"
									checked={stockOnly}
									onChange={(e) => setStockOnly(e.target.checked)}
									className="accent-cyan-300"
								/>
								<span>In Stock Only</span>
							</label>
						</div>
					</div>

					{/* Products list */}
					{productsError ? (
						<div className="mt-8 rounded-[22px] border border-rose-300/35 bg-rose-500/10 p-5 text-sm text-rose-100">
							<p>{productsError}</p>
							<button
								type="button"
								onClick={() => void refreshProducts()}
								className="mt-4 rounded-xl border border-white/20 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white/15"
							>
								Retry Fetching Products
							</button>
						</div>
					) : null}

					{productsLoading ? (
						<div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
							{Array.from({ length: 8 }).map((_, index) => (
								<div
									key={`product-skeleton-${index}`}
									className="h-96 animate-pulse rounded-[22px] border border-white/10 bg-white/[0.04]"
								/>
							))}
						</div>
					) : products.length === 0 ? (
						<div className="mt-16 text-center">
							<p className="text-lg text-slate-400">No products found in this category.</p>
							<button
								type="button"
								onClick={() => {
									setSearchValue('');
									setStockOnly(false);
								}}
								className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200 transition hover:text-cyan-100"
							>
								Clear filters
							</button>
						</div>
					) : (
						<div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
							{products.map((product) => (
								<ProductCard
									key={product.id}
									product={product}
									onQuickAdd={handleQuickAdd}
								/>
							))}
						</div>
					)}
				</div>
			</main>

			<FooterSection />

			{banner ? (
				<div
					className={`fixed right-4 top-24 z-50 rounded-2xl border px-4 py-3 text-sm backdrop-blur-xl transition ${
						banner.tone === 'success'
							? 'border-emerald-200/45 bg-emerald-500/18 text-emerald-100'
							: 'border-rose-200/45 bg-rose-500/18 text-rose-100'
					}`}
				>
					{banner.message}
				</div>
			) : null}
		</div>
	);
}
