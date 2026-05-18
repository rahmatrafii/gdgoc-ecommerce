import { useEffect, useMemo, useState } from 'react';
import BestSellerSection from '../components/sections/BestSellerSection';
import CategoriesSection from '../components/sections/CategoriesSection';
import FooterSection from '../components/sections/FooterSection';
import HeroSection from '../components/sections/HeroSection';
import LimitedEditionSection from '../components/sections/LimitedEditionSection';
import LookbookSection from '../components/sections/LookbookSection';
import MobileExperienceSection from '../components/sections/MobileExperienceSection';
import Navbar from '../components/sections/Navbar';
import NewArrivalsSection from '../components/sections/NewArrivalsSection';
import NewsletterSection from '../components/sections/NewsletterSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import WhyChooseUsSection from '../components/sections/WhyChooseUsSection';
import { useCategories } from '../hooks/useCategories';
import { useProducts } from '../hooks/useProducts';
import { ApiRequestError } from '../services/apiClient';
import { addItemToCart } from '../services/cartService';
import type { ProductQuery } from '../types/catalog';

type BannerTone = 'success' | 'error';

interface BannerState {
	message: string;
	tone: BannerTone;
}

export default function LandingPage() {
	const {
		categories,
		isLoading: categoriesLoading,
		error: categoriesError,
		refresh: refreshCategories,
	} = useCategories();
	const [searchValue, setSearchValue] = useState<string>('');
	const [selectedCategoryID, setSelectedCategoryID] = useState<string>('');
	const [stockOnly, setStockOnly] = useState<boolean>(true);

	const productQuery = useMemo<ProductQuery>(() => {
		return {
			page: 1,
			per_page: 24,
			category: selectedCategoryID || undefined,
			in_stock: stockOnly ? true : undefined,
			q: searchValue.trim() || undefined,
		};
	}, [searchValue, selectedCategoryID, stockOnly]);

	const {
		products,
		newArrivals,
		bestSellers,
		isLoading: productsLoading,
		error: productsError,
		refresh: refreshProducts,
	} = useProducts(productQuery);

	const [banner, setBanner] = useState<BannerState | null>(null);

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

	const heroProducts = useMemo(() => {
		if (products.length > 0) {
			return products.slice(0, 3);
		}

		return bestSellers.slice(0, 3);
	}, [products, bestSellers]);

	const arrivalProducts = useMemo(() => {
		if (newArrivals.length > 0) {
			return newArrivals;
		}

		return products.slice(0, 8);
	}, [newArrivals, products]);

	const bestSellerProducts = useMemo(() => {
		if (bestSellers.length > 0) {
			return bestSellers;
		}

		return products.slice(0, 10);
	}, [bestSellers, products]);

	async function handleQuickAdd(productID: string) {
		try {
			await addItemToCart(productID, 1);
			setBanner({
				message: 'Item added to cart successfully.',
				tone: 'success',
			});
		} catch (error) {
			if (error instanceof ApiRequestError && error.status === 401) {
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

	function resetFilters() {
		setSearchValue('');
		setSelectedCategoryID('');
		setStockOnly(true);
	}

	function focusNewArrivalsSearch() {
		document
			.querySelector('#new-arrivals')
			?.scrollIntoView({ behavior: 'smooth' });

		window.setTimeout(() => {
			const searchInput = document.getElementById('new-arrivals-search');
			if (searchInput instanceof HTMLInputElement) {
				searchInput.focus();
			}
		}, 220);
	}

	function openCartShortcut() {
		document
			.querySelector('#new-arrivals')
			?.scrollIntoView({ behavior: 'smooth' });

		if (typeof window === 'undefined') {
			return;
		}

		const rawGuestItems = window.localStorage.getItem('guest_cart_items');
		let guestItems: unknown[] = [];

		try {
			guestItems = rawGuestItems
				? (JSON.parse(rawGuestItems) as unknown[])
				: [];
		} catch (parseError) {
			void parseError;
			window.localStorage.removeItem('guest_cart_items');
		}

		if (guestItems.length > 0) {
			setBanner({
				message: `Guest cart currently has ${guestItems.length} item(s).`,
				tone: 'success',
			});
			return;
		}

		setBanner({
			message: 'Use Quick Add on products to start filling your cart.',
			tone: 'success',
		});
	}

	function handleLimitedDropAction() {
		setSearchValue('limited');
		setStockOnly(true);
		document
			.querySelector('#new-arrivals')
			?.scrollIntoView({ behavior: 'smooth' });
	}

	return (
		<div className="luxury-background min-h-screen text-white">
			<Navbar
				onSearchClick={focusNewArrivalsSearch}
				onCartClick={openCartShortcut}
			/>

			<main className="mx-auto w-full max-w-[1240px] px-4 pb-24 sm:px-6 lg:px-10">
				<HeroSection heroProducts={heroProducts} />
				<CategoriesSection
					categories={categories}
					isLoading={categoriesLoading}
					error={categoriesError}
					onRetry={refreshCategories}
				/>
				<NewArrivalsSection
					products={arrivalProducts}
					categories={categories}
					isLoading={productsLoading}
					error={productsError}
					searchValue={searchValue}
					selectedCategoryID={selectedCategoryID}
					stockOnly={stockOnly}
					onSearchChange={setSearchValue}
					onCategoryChange={setSelectedCategoryID}
					onStockOnlyChange={setStockOnly}
					onResetFilters={resetFilters}
					onRetry={refreshProducts}
					onQuickAdd={handleQuickAdd}
				/>
				<LimitedEditionSection onShopLimitedDrop={handleLimitedDropAction} />
				<BestSellerSection
					products={bestSellerProducts}
					onQuickAdd={handleQuickAdd}
				/>
				<WhyChooseUsSection />
				<LookbookSection />
				<TestimonialsSection />
				<NewsletterSection />
				<MobileExperienceSection />
			</main>

			<FooterSection />

			{banner ? (
				<div
					className={`fixed right-4 top-24 z-50 rounded-2xl border px-4 py-3 text-sm backdrop-blur-xl transition ${
						banner.tone === 'success'
							? 'border-emerald-200/45 bg-emerald-500/18 text-emerald-100'
							: 'border-rose-200/45 bg-rose-500/18 text-rose-100'
					}`}>
					{banner.message}
				</div>
			) : null}
		</div>
	);
}
